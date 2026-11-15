import { expect, test } from "@playwright/test";
import { homeSupportPlans } from "../../data/service-plans";
import { contactInterests } from "../../data/site";
import { products } from "../../data/products";

test("home presenta la arquitectura empresarial y conserva las rutas existentes", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Solo esenciales", exact: true }).click();

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Tecnología e IA para resolver problemas reales de operación.",
  );
  const navigation = page.getByRole("navigation", {
    name: "Navegación principal",
  });
  for (const [label, href] of [
    ["Soluciones", "/soluciones"],
    ["Servicios", "/servicios"],
    ["Productos", "/productos"],
    ["Casos", "/casos"],
    ["Recursos", "/blog"],
    ["Empresa", "/sobre-nosotros"],
  ]) {
    await expect(navigation.getByRole("link", { name: label, exact: true })).toHaveAttribute(
      "href",
      href,
    );
  }
  await expect(
    page.getByRole("banner").getByRole("link", {
      name: "Hablar con un especialista",
      exact: true,
    }),
  ).toHaveAttribute("href", "/contacto");

  const headings = await page.locator("main h2").allTextContents();
  const orderedSections = [
    "Problemas que podemos ayudarte a resolver",
    "Áreas de solución",
    "Servicios de Nova Assist",
    "Cómo trabajamos",
    "Productos destacados",
    "Ecosistema tecnológico",
    "Seguridad y confianza",
    "Insights",
  ];
  const positions = orderedSections.map((heading) =>
    headings.findIndex((value) => value.includes(heading)),
  );
  expect(positions.every((position) => position >= 0)).toBe(true);
  expect(positions).toEqual([...positions].sort((a, b) => a - b));

  const featuredProducts = page.locator("#productos-destacados a[href^='/productos/']");
  await expect(featuredProducts).toHaveCount(3);
  const featuredHrefs = await featuredProducts.evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).getAttribute("href")),
  );
  expect(featuredHrefs).toEqual([
    "/productos/voicebot",
    "/productos/planillascr",
    "/productos/ccerp",
  ]);
  await expect(
    page.getByRole("main").getByRole("link", { name: "Soporte para hogares" }),
  ).toHaveAttribute("href", "/nova-assist");
  await expect(
    page.getByRole("main").getByRole("link", { name: "Conocer PawTrack", exact: true }),
  ).toHaveAttribute("href", "/productos/pawtrack");
});

test("los hubs nuevos reutilizan contenido y slugs de productos existentes", async ({
  page,
}) => {
  await page.goto("/soluciones");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explorar servicios" }),
  ).toHaveAttribute("href", "/servicios");

  await page.goto("/productos");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  for (const product of products) {
    await expect(
      page.getByRole("link", {
        name: `Explorar ${product.name}`,
        exact: true,
      }),
    ).toHaveAttribute("href", `/productos/${product.slug}`);
  }
  await expect(
    page.getByRole("link", { name: "Explorar NovaClick", exact: true }),
  ).toHaveAttribute("href", "/productos/novaclick");
});

test("mega menú empresarial funciona con teclado y devuelve el foco al cerrarse", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Solo esenciales", exact: true })
    .click();

  const trigger = page.getByRole("button", {
    name: /opciones de Soluciones/,
  });
  await trigger.focus();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("link", { name: /^Todas las soluciones/ }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("navegación móvil cabe en 320px y mantiene hogares y comunidad accesibles", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Solo esenciales", exact: true })
    .click();
  await page.getByRole("button", { name: "Abrir menú" }).click();

  const navigation = page.getByRole("navigation", {
    name: "Navegación móvil",
  });
  await expect(navigation.getByRole("link", { name: "Productos", exact: true })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Para hogares", exact: true })).toHaveAttribute(
    "href",
    "/nova-assist",
  );
  await expect(navigation.getByRole("link", { name: "PawTrack CR" })).toHaveAttribute(
    "href",
    "/productos/pawtrack",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);

  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Menú de navegación móvil" }),
  ).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
});

test("Nova Assist analytics respeta consentimiento y registra el selector sin datos personales", async ({ page }) => {
  await page.route("https://www.googletagmanager.com/**", route => route.fulfill({ contentType: "application/javascript", body: "" }));
  await page.goto("/nova-assist");
  await page.getByRole("button", { name: "Solo esenciales", exact: true }).click();
  await page.evaluate(() => {
    const calls: unknown[][] = [];
    Object.assign(window, { __novaEvents: calls, gtag: (...args: unknown[]) => calls.push(args) });
  });
  const choice = page.getByRole("button", { name: "Resolver un problema" });
  await choice.click();
  expect(await page.evaluate(() => (window as unknown as { __novaEvents: unknown[][] }).__novaEvents.length)).toBe(0);
  await page.getByRole("button", { name: "Preferencias de cookies" }).click();
  await page.getByRole("button", { name: "Aceptar todas", exact: true }).click();
  await page.evaluate(() => {
    const calls: unknown[][] = [];
    Object.assign(window, { __novaEvents: calls, gtag: (...args: unknown[]) => calls.push(args) });
  });
  await page.getByRole("button", { name: "Sí, necesito más tareas" }).click();
  const calls = await page.evaluate(() => (window as unknown as { __novaEvents: unknown[][] }).__novaEvents);
  expect(calls.filter(call => call[1] === "service_recommended")).toHaveLength(1);
  expect(JSON.stringify(calls)).not.toContain("@");
});

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
  await page.route(
    "https://challenges.cloudflare.com/turnstile/**",
    (route) =>
      route.fulfill({
        contentType: "application/javascript",
        body: `window.turnstile = {
          render: (_container, options) => {
            queueMicrotask(() => options.callback("e2e-test-token"));
            return "e2e-test-widget";
          },
          remove: () => {}
        };`,
      }),
  );
  await page.goto(`/contacto?plan=${encodeURIComponent(planId)}`);
  await page
    .getByRole("button", { name: "Solo esenciales", exact: true })
    .click();
  const form = page.getByRole("form", { name: "Solicitud comercial" });
  await expect(
    form.getByRole("button", { name: /persona u hogar/i }),
  ).toHaveAttribute("aria-pressed", "true");
  await form.getByRole("button", { name: /siguiente/i }).click();
  await form.getByRole("button", { name: /siguiente/i }).click();
  await expect(form.getByLabel("Nombre", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await form.getByLabel("Nombre", { exact: true }).fill("Audit User");
  await form
    .getByLabel("Correo electrónico", { exact: true })
    .fill("audit@example.com");
  await form.getByRole("button", { name: /siguiente/i }).click();
  await expect(
    form.getByLabel("Interés principal", { exact: true }),
  ).toHaveValue(contactInterests[1]);
  await form.getByRole("button", { name: /siguiente/i }).click();
  await form
    .getByLabel("Mensaje", { exact: true })
    .fill("Necesito soporte para mi equipo de uso personal.");
  await form.getByRole("button", { name: "Correo electrónico", exact: true }).click();
  await form.getByRole("checkbox").check();
  await page.screenshot({
    path: `test-results/contact-${testInfo.project.name}.png`,
  });
  await form.getByRole("button", { name: /enviar solicitud/i }).click();
  await expect(
    page.getByText("Solicitud recibida", { exact: true }),
  ).toBeVisible();
  expect(payload.plan).toBe(planId);
  expect(payload.marketSegment).toBe("b2c");
  expect(payload.preferredContactMethod).toBe("email");
  expect(payload.consentPrivacy).toBe(true);
  expect(
    await page.evaluate(() => localStorage.getItem("nm-contact-draft")),
  ).toBeNull();
});

test("Nova Assist recomienda la modalidad correcta y conserva la selección", async ({
  page,
}) => {
  await page.goto("/nova-assist");
  await page
    .getByRole("button", { name: "Solo esenciales", exact: true })
    .click();

  const selector = page.locator("#selector");
  await expect(selector.locator("[data-interactive='true']")).toBeVisible();
  const recommendation = selector.locator("[aria-live='polite']");
  const problemButton = selector.getByRole("button", {
    name: "Resolver un problema",
  });
  await problemButton.click();
  await expect(problemButton).toHaveAttribute("aria-pressed", "true");
  await expect(
    recommendation.getByRole("heading", { name: "Visita Express" }),
  ).toBeVisible();
  await expect(recommendation).toContainText(
    "1 incidente principal · hasta 60 minutos",
  );

  await selector
    .getByRole("button", { name: "Sí, necesito más tareas" })
    .click();
  await expect(
    recommendation.getByRole("heading", { name: "Visita Premium" }),
  ).toBeVisible();
  await recommendation.getByRole("link", { name: "Solicitar ayuda" }).click();
  await expect(page).toHaveURL(
    /\/nova-assist\/solicitar\?service=visita-premium$/,
  );
  await expect(page.getByText("Servicio seleccionado")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

for (const [path, name] of [
  ["/nova-assist", "Resolver un problema"],
  ["/nova-assist/solicitar", "Sí, ya soy cliente"],
]) {
  test(`control en ${path} espera hidratación y responde a la primera interacción`, async ({ page }) => {
    let releaseScripts!: () => void;
    const scriptsReady = new Promise<void>((resolve) => { releaseScripts = resolve; });
    await page.route("**/*", async (route) => {
      if (route.request().resourceType() === "script") await scriptsReady;
      await route.continue();
    });
    try {
      await page.goto(path, { waitUntil: "commit" });
      const choice = page.getByRole("button", { name });
      await expect(choice).toBeDisabled();
      releaseScripts();
      await choice.click();
      await expect(choice).toHaveAttribute("aria-pressed", "true");
    } finally {
      releaseScripts();
      await page.unrouteAll({ behavior: "wait" });
    }
  });
}

test("Nova Assist publica alcance y exclusiones en servicios residenciales y empresariales", async ({
  page,
}) => {
  const servicePages = [
    { slug: "visita-express", name: "Visita Express", detail: "1 incidente principal" },
    { slug: "visita-premium", name: "Visita Premium", detail: "Respaldo básico" },
    { slug: "plan-familia", name: "Plan Familia", detail: "Hasta 5 dispositivos" },
    { slug: "total-home", name: "Total Home", detail: "Hasta 8 dispositivos" },
  ];

  for (const service of servicePages) {
    await page.goto(`/nova-assist/${service.slug}`);
    await expect(page.getByRole("heading", { level: 1, name: service.name })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Qué incluye" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Qué no incluye" })).toBeVisible();
    await expect(page.locator("main")).toContainText(service.detail);
    await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`/nova-assist/${service.slug}$`),
    );
    await expect(
      page.getByRole("link", { name: new RegExp(`Solicitar ${service.name}`) }),
    ).toHaveAttribute("href", `/nova-assist/solicitar?service=${service.slug}`);
  }
});

test("IT OnDemand conserva su enlace y dirige a la experiencia empresarial", async ({ page }) => {
  await page.goto("/nova-assist/it-ondemand");
  await expect(page).toHaveURL(/\/nova-assist\/empresas\/it-ondemand$/);
  await expect(page.getByRole("heading", { name: "IT OnDemand", level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: "Solicitar soporte IT" })).toHaveAttribute("href", "/nova-assist/empresas/solicitar?service=it-ondemand");
});

test("Business permite encontrar y comparar servicios sin desbordamiento", async ({ page }) => {
  await page.goto("/nova-assist");
  await page.getByRole("link", { name: "Para mi empresa" }).click();
  await expect(page.getByRole("heading", { name: /tecnología que acompaña/i })).toBeVisible();
  await page.getByRole("button", { name: "Necesitamos gestionar la tecnología preventivamente" }).click();
  await expect(page.getByRole("heading", { name: "Business Pro", level: 3 }).first()).toBeVisible();
  await page.getByRole("link", { name: "Comparar Business y Business Pro" }).click();
  await expect(page.getByRole("heading", { name: "Business o Business Pro" })).toBeVisible();
  for (const slug of ["it-ondemand", "business", "business-pro", "microsoft-365", "azure-cloud", "cybersecurity", "backup-continuity", "business-networks", "power-platform", "ai-copilot", "technology-projects", "it-health-check"]) {
    await page.goto(`/nova-assist/empresas/${slug}`);
    await expect(page.getByRole("heading", { name: "Qué incluye" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Qué no incluye" })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/nova-assist/empresas/${slug}$`));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("Health Check entrega contexto a contacto protegido sin enviarlo antes de confirmar", async ({ page }) => {
  let payload: Record<string, unknown> | undefined;
  await page.route("**/api/contact", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 200, json: { ok: true, channel: "protected" } });
  });
  await page.route("https://challenges.cloudflare.com/turnstile/**", (route) => route.fulfill({
    contentType: "application/javascript",
    body: `window.turnstile = {render: (_container, options) => { queueMicrotask(() => options.callback("e2e-test-token")); return "widget"; }, remove: () => {}};`,
  }));
  await page.goto("/nova-assist/empresas/health-check");
  await page.getByLabel("Industria").selectOption({ label: "Comercio" });
  await page.getByRole("button", { name: "Continuar a contacto" }).click();
  expect(payload).toBeUndefined();
  const form = page.getByRole("form", { name: "Solicitud empresarial" });
  await form.getByLabel("Nombre").fill("Audit User");
  await form.getByLabel("Correo de trabajo").fill("audit@example.com");
  await form.getByLabel("Empresa").fill("Empresa Ejemplo");
  await form.getByRole("button", { name: /siguiente/i }).click();
  await expect(form.getByLabel("Interés principal")).toHaveValue("IT Health Check");
  await form.getByRole("button", { name: /siguiente/i }).click();
  await expect(form.getByLabel("Mensaje")).toHaveValue(/Industria: Comercio/);
  await form.getByRole("button", { name: /^Correo electrónico$/ }).click();
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Enviar solicitud" }).click();
  await expect.poll(() => payload?.plan).toBe("nova-assist-business-it-health-check");
  expect(payload?.message).toContain("Industria: Comercio");
  expect(payload?.consentPrivacy).toBe(true);
});

test("Nova Assist permite enviar una solicitud confirmada sin duplicar el envío", async ({
  page,
}) => {
  let submitCount = 0;
  let payload: Record<string, unknown> = {};
  await page.route("**/api/contact", async (route) => {
    submitCount += 1;
    payload = route.request().postDataJSON();
    await new Promise((resolve) => setTimeout(resolve, 300));
    await route.fulfill({
      status: 200,
      json: {
        ok: true,
        channel: "cloudflare",
        requestId: "nova-assist-e2e",
        deliveryId: "nova-assist-e2e",
      },
    });
  });
  await page.route(
    "https://challenges.cloudflare.com/turnstile/**",
    (route) =>
      route.fulfill({
        contentType: "application/javascript",
        body: `window.turnstile = {
          render: (_container, options) => {
            queueMicrotask(() => options.callback("e2e-test-token"));
            return "e2e-test-widget";
          },
          remove: () => {}
        };`,
      }),
  );
  await page.goto("/nova-assist/solicitar?service=visita-express");
  await page.getByRole("button", { name: "Solo esenciales", exact: true }).click();
  const form = page.getByRole("form", { name: "Solicitud de ayuda de Nova Assist" });
  await form.getByRole("button", { name: "Sí, ya soy cliente" }).click();
  await form.getByRole("button", { name: /siguiente/i }).click();
  await form.getByLabel("Tipo de dispositivo").selectOption("Computadora Windows");
  await form.getByRole("button", { name: /siguiente/i }).click();
  await form.getByLabel("Descripción del problema").fill(
    "La computadora no inicia desde esta mañana.",
  );
  await form.getByLabel("Urgencia de la solicitud").selectOption("alta");
  await form.getByLabel("Preferencia de atención").selectOption("visit");
  await form.getByRole("button", { name: /siguiente/i }).click();
  await form.getByLabel("Nombre").fill("Audit User");
  await form.getByLabel("Correo electrónico").fill("audit@example.com");
  await form.getByRole("button", { name: /^Correo electrónico$/ }).click();
  await form.getByRole("checkbox").check();
  const submit = form.getByRole("button", { name: "Enviar solicitud" });
  await submit.dblclick();

  await expect(page.getByRole("heading", { name: "Recibimos tu solicitud." })).toBeVisible();
  expect(submitCount).toBe(1);
  expect(payload).toMatchObject({
    interest: "Visita Express",
    plan: "nova-assist-visita-express",
    consentPrivacy: true,
  });
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
