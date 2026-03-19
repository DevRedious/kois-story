import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function walkHtml(dir, issues) {
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) walkHtml(p, issues);
		else if (ent.name.endsWith(".html")) checkFile(p, issues);
	}
}

function checkFile(filePath, issues) {
	const s = fs.readFileSync(filePath, "utf8");
	const re = /<svg([^>]*)>/gi;
	let m = re.exec(s);
	while (m !== null) {
		const attrs = m[1];
		if (!/aria-hidden\s*=/i.test(attrs)) {
			if (
				!/\brole\s*=\s*["']img["']/i.test(attrs) ||
				!/\baria-label\s*=/i.test(attrs)
			) {
				const line = s.slice(0, m.index).split("\n").length;
				issues.push(`${filePath}:${line}`);
			}
		}
		m = re.exec(s);
	}
}

const issues = [];
walkHtml(root, issues);
if (issues.length) {
	console.log(issues.join("\n"));
	process.exitCode = 1;
} else {
	console.log("OK: no unlabeled decorative SVG in ADMIN");
}
