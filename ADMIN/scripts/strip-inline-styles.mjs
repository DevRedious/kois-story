import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function walkHtmlFiles(dir, out = []) {
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) walkHtmlFiles(p, out);
		else if (ent.name.endsWith(".html")) out.push(p);
	}
	return out;
}

const replacements = [
	[/ alt="" style="height:26px;border-radius:50%;"/g, ' alt="" class="brand-logo-img"'],
	[
		/<div class="nav-section" style="margin-top:6px;">/g,
		'<div class="nav-section nav-section--spaced">',
	],
	[
		/<div class="nav-section" style="margin-top:8px;">/g,
		'<div class="nav-section nav-section--spaced-lg">',
	],
	[
		/<div style="display:flex;gap:8px;flex-wrap:wrap;">/g,
		'<div class="panel-toolbar">',
	],
	[/<div style="display:flex;gap:8px;">/g, '<div class="panel-toolbar panel-toolbar--nowrap">'],
	[
		/<div style="display:flex;gap:8px;align-items:center;">/g,
		'<div class="page-header-toolbar">',
	],
	[
		/ style="padding:6px 10px;border:1\.5px solid #d0d7de;border-radius:6px;font-size:0\.8rem;width:200px;"/g,
		' class="u-toolbar-control u-toolbar-search-wide"',
	],
	[
		/ style="padding:6px 10px;border:1\.5px solid #d0d7de;border-radius:6px;font-size:0\.8rem;width:180px;"/g,
		' class="u-toolbar-control u-toolbar-search"',
	],
	[
		/ style="padding:6px 10px;border:1\.5px solid #d0d7de;border-radius:6px;font-size:0\.8rem;"/g,
		' class="u-toolbar-control"',
	],
	[
		/ style="padding:6px 12px;border:1px solid #dee2e6;border-radius:6px;font-size:0\.85rem;"/g,
		' class="u-toolbar-select-wide"',
	],
	[
		/<a href="order-form\.html" style="color:var\(--noir\);font-weight:600;">/g,
		'<a href="order-form.html" class="link-order-ref">',
	],
	[
		/<span class="badge badge-konishi" style="font-size:0\.6rem;">/g,
		'<span class="badge badge-konishi badge--compact">',
	],
	[
		/<span class="badge badge-arrivage" style="font-size:0\.6rem;">/g,
		'<span class="badge badge-arrivage badge--compact">',
	],
	[
		/<span class="badge badge-vendu" style="font-size:0\.6rem;">/g,
		'<span class="badge badge-vendu badge--compact">',
	],
	[
		/<span style="font-size:0\.75rem;color:var\(--gris\);">/g,
		'<span class="amount-secondary">',
	],
	[/<td style="font-size:0\.8rem;color:var\(--gris\);">/g, '<td class="td-date-muted">'],
	[/<td style="font-size:0\.78rem;color:var\(--gris\);">/g, '<td class="td-ref-muted">'],
	[/<td style="color:var\(--gris\);">/g, '<td class="u-text-muted">'],
	[/<td style="font-size:0\.8rem;">/g, '<td class="td-fs-08">'],
	[
		/<td style="font-size:0\.8rem;color:var\(--rouge-vif\);">/g,
		'<td class="td-date-alert">',
	],
	[/<span style="color:var\(--gris\);font-size:0\.8rem;">/g, '<span class="order-line-qty">'],
	[/<div style="font-weight:600;">/g, '<div class="client-name-strong">'],
	[
		/<div style="font-size:0\.75rem;color:var\(--gris\);">/g,
		'<div class="client-location-muted">',
	],
	[/<td style="font-size:0\.82rem;">/g, '<td class="td-client-contact">'],
	[
		/<td style="text-align:center;font-weight:600;">/g,
		'<td class="td-count-center">',
	],
	[/<td style="text-align:center;">/g, '<td class="u-text-center">'],
	[
		/<div class="client-avatar" style="background:var\(--rouge-sombre\);color:var\(--blanc-pur\);">/g,
		'<div class="client-avatar client-avatar--brand">',
	],
	[
		/<div class="client-avatar" style="background:#e2d9f3;color:#4a235a;">/g,
		'<div class="client-avatar client-avatar--lavender">',
	],
	[
		/<div class="stats-grid" style="grid-template-columns:repeat\(4,1fr\);">/g,
		'<div class="stats-grid stats-grid--cols-4">',
	],
	[
		/<td style="white-space:nowrap;font-size:0\.82rem;">/g,
		'<td class="msg-datetime-cell">',
	],
	[/<span style="font-size:0\.78rem;">/g, '<span class="koi-meta-label">'],
	[/<h3 style="margin-top: 40px;">/g, '<h3 class="demo-title-spaced">'],
	[
		/<span class="badge badge-konishi" style="font-size:0\.8rem;padding:6px 14px;">/g,
		'<span class="badge badge-konishi badge-konishi-padded">',
	],
	[/<span class="badge" style="background:var\(--noir\);color:#fff;">/g, '<span class="badge badge-solid-dark">'],
	[
		/<div class="demo-group" style="gap:20px;">/g,
		'<div class="demo-group demo-group--gap-20">',
	],
	[
		/<div class="demo-group" style="gap:16px;align-items:baseline;">/g,
		'<div class="demo-group demo-group--gap-16-base">',
	],
];

for (const file of walkHtmlFiles(root)) {
	let s = fs.readFileSync(file, "utf8");
	const before = s;
	for (const [re, rep] of replacements) s = s.replace(re, rep);
	if (s !== before) fs.writeFileSync(file, s);
}
