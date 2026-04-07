import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const adminRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const visitorsRoot = path.join(adminRoot, "..", "VISITORS");

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
	s = s.replace(/<button([^>]*?)>/gi, (full, attrs) => {
		if (/\btype\s*=/i.test(attrs)) return full;
		return `<button type="button"${attrs}>`;
	});
	if (s !== before) fs.writeFileSync(filePath, s);
}

walkHtml(adminRoot);
if (fs.existsSync(visitorsRoot)) walkHtml(visitorsRoot);
console.log("done");
