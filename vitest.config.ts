import path from "path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  oxc: { jsx: { runtime: "automatic", importSource: "react" } },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup/vitest.setup.ts"],
    include: ["tests/unit/**/*.test.ts", "tests/unit/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage/unit",
      include: ["lib/**/*.ts", "app/api/**/*.ts"],
      exclude: ["lib/platform.cloudflare.ts"],
    },
  },
  resolve: {
    alias: {
      "@": path.dirname(fileURLToPath(import.meta.url)),
    },
  },
});
