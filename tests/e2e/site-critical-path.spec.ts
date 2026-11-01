import { expect, test } from "@playwright/test";
import { homeSupportPlans } from "../../data/service-plans";
import { contactInterests } from "../../data/site";

test("home, navegación y viewport estable", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(
    page.getByRole("dialog", { name: "Aviso de cookies" }),
  ).toHaveCount(1);
  await page
    .getByRole("button", { name: "Solo esenciales", exact: true })
    .click();
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(() =>
      page
        .getByRole("img", { name: "NovaMind Global", exact: true })
        .evaluate(
          (image) =>
            (image as HTMLImageElement).complete &&
            (image as HTMLImageElement).naturalWidth > 0,
        ),
    )
    .toBe(true);
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
  });
  const menu = page.getByRole("button", { name: "Abrir menu" });
  const mobileMenu = await menu.isVisible();
  if (mobileMenu) await menu.click();
  const navigation = page.getByRole("navigation", {
    name: mobileMenu ? "Navegación móvil" : "Navegación principal",
    exact: true,
  });
  await navigation.getByRole("link", { name: "Contacto", exact: true }).click();
  await expect(page).toHaveURL(/\/contacto$/);
  await expect(
    page.getByRole("form", { name: "Solicitud comercial" }),
  ).toBeVisible();
});

test("cookies: rechazo, aceptación y revocación persistentes", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Solo esenciales", exact: true })
    .click();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("nm-cookie-consent")!).analytics,
    ),
  ).toBe(false);
  await page.getByRole("button", { name: "Preferencias de cookies" }).click();
  await page
    .getByRole("button", { name: "Aceptar todas", exact: true })
    .click();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("nm-cookie-consent")!).analytics,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Preferencias de cookies" }).click();
  await page
    .getByRole("button", { name: "Solo esenciales", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Preferencias de cookies" }),
  ).toBeVisible();
  await expect(
    page.locator(
      'script[src*="googletagmanager.com"],script[src*="clarity.ms"]',
    ),
  ).toHaveCount(0);
});

test("formulario valida cada paso y conserva el plan sin enviar email real", async ({
  page,
}, testInfo) => {
  const planId = new URL(
    homeSupportPlans[0].ctaHref,
    "https://novamind.example",
  ).searchParams.get("plan")!;
  let payload: Record<string, unknown> = {};
  await page.route("**/api/contact", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      json: {
        ok: true,
        channel: "cloudflare",
        requestId: "e2e-local",
        deliveryId: "e2e-local",
      },
    });
  });
  await page.goto(`/contacto?plan=${encodeURIComponent(planId)}`);
  await page
    .getByRole("button", { name: "Solo esenciales", exact: true })
    .click();
  const form = page.getByRole("form", { name: "Solicitud comercial" });
  await form.getByRole("button", { name: /siguiente/i }).click();
  await expect(form.getByLabel("Nombre", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await form.getByLabel("Nombre", { exact: true }).fill("Audit User");
  await form
    .getByLabel("Correo empresarial", { exact: true })
    .fill("audit@example.com");
  await form.getByRole("button", { name: /siguiente/i }).click();
  await expect(
    form.getByLabel("Interés principal", { exact: true }),
  ).toHaveValue(contactInterests[1]);
  await form.getByRole("button", { name: /siguiente/i }).click();
  await form
    .getByLabel("Mensaje", { exact: true })
    .fill("Solicitud de prueba local sin envio real de correo.");
  await form.getByRole("checkbox").check();
  await page.screenshot({
    path: `test-results/contact-${testInfo.project.name}.png`,
  });
  await form.getByRole("button", { name: /enviar solicitud/i }).click();
  await expect(
    page.getByText("Solicitud recibida", { exact: true }),
  ).toBeVisible();
  expect(payload.plan).toBe(planId);
  expect(payload.consentPrivacy).toBe(true);
  expect(
    await page.evaluate(() => localStorage.getItem("nm-contact-draft")),
  ).toBeNull();
});

test("PawTrack dirige al producto externo y no a una demo comercial", async ({
  page,
}) => {
  await page.goto("/productos/pawtrack");
  await expect(
    page.getByRole("link", { name: "Acceder a PawTrack CR", exact: true }),
  ).toHaveAttribute("href", "https://app.pawtrackcr.com/login");
  await expect(
    page.getByRole("link", { name: "Conocer PawTrack CR", exact: true }),
  ).toHaveAttribute("href", "https://pawtrackcr.com");
  await expect(
    page.locator("main").getByText("Quiero una demo", { exact: true }),
  ).toHaveCount(0);
});

test("Workers: liveness, readiness y opcionales de contacto reales", async ({
  request,
}) => {
  expect((await request.get("/api/health")).status()).toBe(200);
  expect((await request.get("/api/health?check=ready")).status()).toBe(200);
  const response = await request.post("/api/contact", {
    data: {
      name: "Audit User",
      email: "audit@example.com",
      interest: "Consultoria",
      message: "Prueba local que no envia correo.",
      consentPrivacy: true,
      website: "honeypot",
      leadVolume: "",
      urgency: "",
      implementationHorizon: "",
    },
  });
  expect(response.status()).toBe(200);
  expect((await response.json()).channel).toBe("protected");
  expect(
    (
      await request.post("/api/contact", {
        headers: { Origin: "https://attacker.example" },
        data: {},
      })
    ).status(),
  ).toBe(403);
});
