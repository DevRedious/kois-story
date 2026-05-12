import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const adminRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectRoot = path.join(adminRoot, "..");
const roots = [
	path.join(projectRoot, "ADMIN"),
	path.join(projectRoot, "VISITORS"),
	path.join(projectRoot, "docs"),
	projectRoot,
];
const ignoredDirs = new Set(["node_modules", ".git"]);
const htmlFiles = [];

function walk(dir) {
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) {
			if (!ignoredDirs.has(ent.name)) walk(p);
		} else if (ent.name.endsWith(".html")) {
			htmlFiles.push(p);
		}
	}
}

for (const root of roots) {
	if (fs.existsSync(root)) walk(root);
}

const missing = [];
for (const filePath of htmlFiles) {
	const s = fs.readFileSync(filePath, "utf8");
	if (/<head[\s>]/i.test(s) && !/<meta\s+name=["']viewport["']/i.test(s)) {
		missing.push(filePath);
	}
}

if (missing.length) {
	console.log(missing.join("\n"));
	process.exitCode = 1;
} else {
	console.log("OK all html have viewport");
}
