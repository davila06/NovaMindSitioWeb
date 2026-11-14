import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const lhciCli = require.resolve("@lhci/cli/src/cli.js");
const maxAttempts = 3;

export async function warmLhciServer(url) {
  const response = await fetch(url, {
    redirect: "error",
    signal: AbortSignal.timeout(90000),
  });
  await response.arrayBuffer();
  if (response.status !== 200) {
    throw new Error(`Lighthouse preview warmup failed: HTTP ${response.status}`);
  }
}

export async function runLhciWithRetry(runAttempt, onRetry = () => {}) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const result = await runAttempt();
    if (
      result.status === 0 ||
      !result.output.includes("NO_NAVSTART") ||
      attempt === maxAttempts
    ) {
      return result;
    }

    onRetry(attempt);
  }

  throw new Error("Lighthouse retry loop exited unexpectedly");
}

export async function collectLhciUrlsWithRetry(urls, collectUrl, onRetry) {
  let hasStarted = false;

  for (const url of urls) {
    const result = await runLhciWithRetry(
      () => {
        const additive = hasStarted;
        hasStarted = true;
        return collectUrl(url, additive);
      },
      (attempt) => onRetry?.(url, attempt),
    );
    if (result.status !== 0) return result;
  }

  return { status: 0, output: "" };
}

function runLhci(args) {
  return new Promise((resolveResult) => {
    const child = spawn(process.execPath, [lhciCli, ...args], {
      stdio: ["inherit", "pipe", "pipe"],
    });
    let output = "";

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      output += chunk;
      process.stdout.write(chunk);
    });

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk) => {
      output += chunk;
      process.stderr.write(chunk);
    });

    child.on("error", (error) => {
      process.stderr.write(`${error.message}\n`);
      resolveResult({ status: 1, output: `${output}\n${error.message}` });
    });
    child.on("close", (status) => {
      resolveResult({ status: status ?? 1, output });
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  if (args[0] === "serve") {
    const { preview } = await import("vite");
    const server = await preview();
    try {
      const url = server.resolvedUrls?.local[0];
      if (!url) throw new Error("No local Lighthouse preview URL is available.");
      await warmLhciServer(url);
      console.log("Lighthouse preview HTTP ready");
    } catch (error) {
      await server.close();
      throw error;
    }
    return;
  }

  if (args[0] !== "collect") {
    throw new Error("This runner supports the collect and serve commands only.");
  }

  const configArg = args.find((arg) => arg.startsWith("--config="));
  const configPath = resolve(
    configArg ? configArg.slice("--config=".length) : "lighthouserc.json",
  );
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  const urls = config.ci?.collect?.url;
  if (!Array.isArray(urls) || urls.some((url) => typeof url !== "string")) {
    throw new Error(`No URL list found in ${configPath}.`);
  }

  const collectOptions = args
    .slice(1)
    .filter((arg) => !arg.startsWith("--url=") && arg !== "--additive");
  const result = await collectLhciUrlsWithRetry(
    urls,
    (url, additive) => {
      const collectArgs = [
        "collect",
        ...collectOptions,
        `--url=${url}`,
      ];
      if (additive) collectArgs.push("--additive");
      return runLhci(collectArgs);
    },
    (url, attempt) => {
      console.warn(
        `Lighthouse returned NO_NAVSTART for ${url}. Retrying that URL only (${attempt + 1}/${maxAttempts}).`,
      );
    },
  );
  process.exitCode = result.status;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
