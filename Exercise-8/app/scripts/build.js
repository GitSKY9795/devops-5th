import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const sourcePath = path.join(root, "src", "calculator.js");
const distDirectory = path.join(root, "dist");
const source = await readFile(sourcePath, "utf8");

if (source.includes("BREAK_BUILD")) {
  throw new Error("Build failed because src/calculator.js contains BREAK_BUILD");
}

await mkdir(distDirectory, { recursive: true });
await writeFile(
  path.join(distDirectory, "calculator.bundle.js"),
  `// Built by the On-Call Assistant demo.\n${source}`,
  "utf8"
);

console.log("Build completed: dist/calculator.bundle.js");
