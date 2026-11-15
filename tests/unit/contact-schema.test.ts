import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/leads/contact-schema";

const validContact = {
  marketSegment: "b2c",
  preferredContactMethod: "email",
  name: "Ana Perez",
  email: "ana@example.com",
  interest: "Soporte tecnológico para hogares",
  message: "Necesito ayuda con mi computadora personal.",
  consentPrivacy: true,
};

describe("contact submission schema", () => {
  it("requires a company name for B2B leads", () => {
    expect(
      contactSchema.safeParse({
        ...validContact,
        marketSegment: "b2b",
      }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({
        ...validContact,
        marketSegment: "b2b",
        company: "Empresa Ejemplo",
      }).success,
    ).toBe(true);
  });

  it.each(["phone", "whatsapp"] as const)(
    "requires a valid phone number when the preferred method is %s",
    (preferredContactMethod) => {
      expect(
        contactSchema.safeParse({
          ...validContact,
          preferredContactMethod,
        }).success,
      ).toBe(false);
      expect(
        contactSchema.safeParse({
          ...validContact,
          preferredContactMethod,
          phone: "+506 8888-8888",
        }).success,
      ).toBe(true);
    },
  );
});
