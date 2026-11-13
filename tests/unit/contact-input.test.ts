import { describe, expect, it } from "vitest";
import { containsCredentialLikeText } from "@/lib/contact-input";

describe("contact input credential guard", () => {
  it("detects explicit passwords, PINs, MFA codes and card numbers", () => {
    for (const value of [
      "contraseña: ejemplo-secreto",
      "PIN = 1234",
      "PIN 1234",
      "MFA code 987654",
      "tarjeta 4111 1111 1111 1111",
      "4111 1111 1111 1111",
    ]) {
      expect(containsCredentialLikeText(value)).toBe(true);
    }
  });

  it("allows ordinary issue descriptions", () => {
    for (const value of [
      "La computadora muestra un error al conectarse al Wi-Fi.",
      "Olvidé mi contraseña y necesito recuperarla.",
      "La contraseña es importante para proteger el equipo.",
      "Necesito configurar una tarjeta de crédito en la aplicación.",
      "No recuerdo el PIN del dispositivo.",
      "El número de caso es 1234567890123456.",
    ]) {
      expect(containsCredentialLikeText(value)).toBe(false);
    }
  });
});
