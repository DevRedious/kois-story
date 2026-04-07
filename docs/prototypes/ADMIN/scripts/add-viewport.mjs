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

function walkHtml(dir) {
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) walkHtml(p);
		else if (ent.name.endsWith(".html")) patchFile(p);
	}
}

function patchFile(filePath) {
	let s = fs.readFileSync(filePath, "utf8");
	const before = s;
	if (!/<head[\s>]/i.test(s)) return;
	if (/<meta\s+name=["']viewport["']/i.test(s)) return;

	s = s.replace(
		/<meta\s+charset=["'][^"']+["']\s*>\r?\n/i,
		(meta) =>
			`${meta}  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n`,
	);
	if (s !== before) fs.writeFileSync(filePath, s);
}

for (const root of roots) {
	if (fs.existsSync(root)) walkHtml(root);
}

console.log("done");
