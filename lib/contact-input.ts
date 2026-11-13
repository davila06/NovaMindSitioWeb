const credentialAssignments = [
  /\b(?:password|contrase(?:ña|na)|clave(?:\s+bancaria)?|pin|c[oó]digo(?:\s+(?:mfa|de\s+verificaci[oó]n|de\s+seguridad))?)\s*[:=]\s*\S+/i,
  /\b(?:pin|mfa\s+code|cvc|cvv)\s*[:=]?\s*\d{3,8}\b/i,
];

function containsCardNumber(value: string) {
  const candidates = value.matchAll(/\b(?:\d[ -]?){12,18}\d\b/g);
  for (const [candidate] of candidates) {
    const digits = candidate.replace(/\D/g, "");
    let sum = 0;
    let double = false;
    for (let index = digits.length - 1; index >= 0; index -= 1) {
      let digit = Number(digits[index]);
      if (double) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      double = !double;
    }
    if (sum % 10 === 0) return true;
  }
  return false;
}

export function containsCredentialLikeText(value: string) {
  return (
    credentialAssignments.some((pattern) => pattern.test(value)) ||
    containsCardNumber(value)
  );
}
