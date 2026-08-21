import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const PORT = 3100;
const BASE_URL = `http://localhost:${PORT}`;

let serverProcess;

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status) return;
    } catch {
      // server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`Server at ${url} did not start within ${timeoutMs}ms`);
}

before(async () => {
  serverProcess = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: process.cwd(),
    stdio: "ignore",
    shell: true,
  });
  await waitForServer(BASE_URL);
});

after(() => {
  serverProcess.kill();
});

const routes = [
  "/",
  "/about/",
  "/work/",
  "/work/marinduque/",
  "/work/baguio/",
  "/work/mariglem/",
  "/work/grad-pic/",
  "/work/ojt/",
  "/work/school-activity/",
];

for (const route of routes) {
  test(`GET ${route} returns 200`, async () => {
    const res = await fetch(`${BASE_URL}${route}`);
    assert.equal(res.status, 200);
  });
}
