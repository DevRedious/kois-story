import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

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
	s = s.replace(/<svg([^>]*?)>/gi, (full, attrs) => {
		if (/aria-hidden\s*=/i.test(attrs)) return full;
		if (
			/\brole\s*=\s*["']img["']/i.test(attrs) &&
			/\baria-label\s*=/i.test(attrs)
		) {
			return full;
		}
		return `<svg aria-hidden="true"${attrs}>`;
	});
	if (s !== before) fs.writeFileSync(filePath, s);
}

walkHtml(root);
console.log("done");
