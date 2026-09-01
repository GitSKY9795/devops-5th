import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const forbiddenMarkers = ["BREAK_LINT"];

async function listJavaScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return listJavaScriptFiles(entryPath);
      }
      return entry.name.endsWith(".js") ? [entryPath] : [];
    })
  );

  return files.flat();
}

const files = await listJavaScriptFiles(path.join(root, "src"));
const failures = [];

for (const file of files) {
  const content = await readFile(file, "utf8");

  for (const marker of forbiddenMarkers) {
    if (content.includes(marker)) {
      failures.push(`${path.relative(root, file)} contains ${marker}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Lint failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Lint passed for ${files.length} JavaScript files.`);
