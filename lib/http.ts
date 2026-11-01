export class ApiRequestError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function readJsonRequest(request: Request, maxBytes = 32768): Promise<unknown> {
  const origin = request.headers.get("origin");
  if ((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") throw new ApiRequestError(403, "Origen no permitido.");
  if (!(request.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) throw new ApiRequestError(415, "Se requiere application/json.");
  if (Number(request.headers.get("content-length") || 0) > maxBytes) throw new ApiRequestError(413, "Solicitud demasiado grande.");
  const reader = request.body?.getReader();
  if (!reader) throw new ApiRequestError(400, "Cuerpo JSON requerido.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw new ApiRequestError(413, "Solicitud demasiado grande."); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new ApiRequestError(400, "JSON invalido."); }
  } finally { reader.releaseLock(); }
}