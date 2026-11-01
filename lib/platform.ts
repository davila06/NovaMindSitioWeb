export type RateLimiter = { limit(input: { key: string }): Promise<{ success: boolean }> };
export type EmailBinding = { send(message: { from: { email: string; name: string }; to: Array<{ email: string }>; subject: string; html: string; text: string; replyTo?: string }): Promise<{ messageId?: string }> };
export type PlatformBindings = {
  runtime: "node" | "cloudflare";
  rateLimiters?: Partial<Record<"contact" | "newsletter" | "monitor", RateLimiter>>;
  email?: EmailBinding;
};

export function getPlatformBindings(): PlatformBindings { return { runtime: "node" }; }