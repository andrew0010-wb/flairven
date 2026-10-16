const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = path.join(root, "dist");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

if (fs.existsSync(out)) {
  fs.rmSync(out, { recursive: true, force: true });
}
fs.mkdirSync(out, { recursive: true });

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
  fs.copyFileSync(path.join(root, entry.name), path.join(out, entry.name));
}

for (const dir of ["css", "js"]) {
  const src = path.join(root, dir);
  if (fs.existsSync(src)) {
    copyDir(src, path.join(out, dir));
  }
}

console.log("Build OK: archivos estáticos en dist/");
