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

/** Ordre : motifs les plus spécifiques d’abord. */
const replacements = [
	[/ style="color:#e74c3c;"/g, ' class="stat-value--danger"'],
	[/ style="color:#e67e22;"/g, ' class="stat-value--warning"'],
	[/ style="color:#27ae60;"/g, ' class="stat-value--success"'],
	[
		/<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">/g,
		'<div class="panel-toolbar--wrap-center">',
	],
	[
		/<div style="display:flex;gap:20px;flex-wrap:wrap;">/g,
		'<div class="accounting-panels-row">',
	],
	[
		/<div class="panel" style="flex:1;min-width:280px;">/g,
		'<div class="panel accounting-panel">',
	],
	[
		/<div class="panel-body" style="padding:0;">/g,
		'<div class="panel-body panel-body--flush">',
	],
	[
		/<table style="width:100%;border-collapse:collapse;">/g,
		'<table class="admin-data-table">',
	],
	[
		/<tr style="background:#f8f9fa;font-size:0\.8rem;color:#6c757d;text-transform:uppercase;">/g,
		"<tr>",
	],
	[
		/<tr style="background:#f8f9fa;font-size:0\.78rem;color:#6c757d;text-transform:uppercase;">/g,
		"<tr>",
	],
	[/<tr style="color:#bbb;">/g, '<tr class="row-muted">'],
	[
		/ style="padding:5px 10px;border:1px solid #dee2e6;border-radius:6px;font-size:0\.85rem;"/g,
		' class="u-toolbar-control--tight"',
	],
	[
		/ style="padding:5px 10px;border:1px solid #dee2e6;border-radius:6px;font-size:0\.85rem;width:180px;"/g,
		' class="u-toolbar-input-tight"',
	],
	[
		/placeholder="Rechercher un client\.\.\." style="padding:6px 12px;border:1px solid #dee2e6;border-radius:6px;font-size:0\.85rem;width:220px;"/g,
		'placeholder="Rechercher un client..." class="u-search-clients"',
	],
	[
		/<div class="form-group" id="due-date-group" style="display:none;">/g,
		'<div class="form-group is-hidden" id="due-date-group">',
	],
	[/<div style="margin-top:10px;">/g, '<div class="form-actions-spaced">'],
	[
		/<div class="dormant-banner" style="font-size:0\.95rem;line-height:1\.6;">/g,
		'<div class="dormant-banner dormant-banner--relaxed">',
	],
	[
		/<div class="stats-grid" style="opacity:0\.5;">/g,
		'<div class="stats-grid dormant-faded">',
	],
	[
		/<div class="panel" style="opacity:0\.5;pointer-events:none;">/g,
		'<div class="panel dormant-faded--no-pointer">',
	],
	[
		/disabled style="padding:6px 12px;border:1px solid #dee2e6;border-radius:6px;font-size:0\.85rem;width:200px;background:#f5f5f5;cursor:not-allowed;"/g,
		'disabled class="input-dormant"',
	],
	[
		/disabled placeholder="Ex : Nouveaux arrivages printemps 2026" style="background:#f5f5f5;cursor:not-allowed;"/g,
		'disabled placeholder="Ex : Nouveaux arrivages printemps 2026" class="input-dormant--full"',
	],
	[
		/disabled placeholder="Rédigez le contenu de votre newsletter ici\.\.\." style="background:#f5f5f5;cursor:not-allowed;resize:vertical;"><\/textarea>/g,
		'disabled placeholder="Rédigez le contenu de votre newsletter ici..." class="textarea-dormant"></textarea>',
	],
	[
		/<button type="button" class="btn btn--primary" disabled style="cursor:not-allowed;">/g,
		'<button type="button" class="btn btn--primary btn-dormant" disabled>',
	],
	[
		/<p style="font-style:italic;color:#999;font-size:0\.85rem;text-align:center;margin-top:10px;">/g,
		'<p class="footnote-muted-italic">',
	],
	[
		/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;"><div style="width:36px;height:36px;border-radius:50%;background:#d4e8f0;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0\.85rem;color:#1a6080;">/g,
		'<td><div class="client-list-avatar client-list-avatar--teal">',
	],
	[
		/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;"><div style="width:36px;height:36px;border-radius:50%;background:#e8e0f0;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0\.85rem;color:#4a235a;">/g,
		'<td><div class="client-list-avatar client-list-avatar--violet">',
	],
	[
		/<td style="padding:10px 16px;"><div style="width:36px;height:36px;border-radius:50%;background:#fde8e8;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0\.85rem;color:#8b1a1a;">/g,
		'<td><div class="client-list-avatar client-list-avatar--rose">',
	],
	[
		/<th style="padding:10px 16px;text-align:left;border-bottom:1px solid #dee2e6;width:44px;"><\/th>/g,
		'<th class="th-avatar"></th>',
	],
	[
		/<th style="padding:10px 16px;text-align:right;border-bottom:1px solid #dee2e6;">/g,
		'<th class="th-right">',
	],
	[
		/<th style="padding:10px 16px;text-align:center;border-bottom:1px solid #dee2e6;">/g,
		'<th class="th-center">',
	],
	[
		/<th style="padding:10px 16px;text-align:left;border-bottom:1px solid #dee2e6;">/g,
		"<th>",
	],
	[
		/<th style="padding:8px 14px;text-align:right;border-bottom:1px solid #dee2e6;">/g,
		'<th class="th-right">',
	],
	[
		/<th style="padding:8px 14px;text-align:left;border-bottom:1px solid #dee2e6;">/g,
		"<th>",
	],
	[
		/<td style="padding:8px 14px;border-bottom:1px solid #f5f5f5;font-weight:600;">/g,
		'<td class="td-strong">',
	],
	[
		/<td style="padding:8px 14px;border-bottom:1px solid #f5f5f5;text-align:right;">/g,
		'<td class="td-right">',
	],
	[
		/<td style="padding:8px 14px;border-bottom:1px solid #f5f5f5;font-size:0\.82rem;">/g,
		'<td class="accounting-td-date">',
	],
	[
		/<td style="padding:8px 14px;border-bottom:1px solid #f5f5f5;"><span/g,
		"<td><span",
	],
	[/<td style="padding:8px 14px;border-bottom:1px solid #f5f5f5;">/g, "<td>"],
	[/<td style="padding:8px 14px;font-weight:600;">/g, '<td class="td-strong">'],
	[/<td style="padding:8px 14px;text-align:right;">/g, '<td class="td-right">'],
	[
		/<td style="padding:8px 14px;font-size:0\.82rem;">/g,
		'<td class="accounting-td-date">',
	],
	[/<td style="padding:8px 14px;"><span/g, "<td><span"],
	[/<td style="padding:8px 14px;">/g, "<td>"],
	[
		/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;text-align:center;color:#e74c3c;font-weight:700;">/g,
		'<td class="td-stock-alert">',
	],
	[
		/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;text-align:center;" class="td-actions"/g,
		'<td class="td-center td-actions"',
	],
	[
		/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;text-align:right;font-weight:600;">/g,
		'<td class="td-right-strong">',
	],
	[
		/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;text-align:center;">/g,
		'<td class="td-center">',
	],
	[
		/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;font-weight:600;">/g,
		'<td class="td-strong">',
	],
	[
		/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;color:#aaa;" title=/g,
		'<td class="td-placeholder" title=',
	],
	[
		/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;color:#e74c3c;font-weight:600;">/g,
		'<td class="td-due-alert">',
	],
	[
		/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;color:#aaa;">/g,
		'<td class="td-placeholder">',
	],
	[
		/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;"><span/g,
		"<td><span",
	],
	[/<td style="padding:10px 16px;border-bottom:1px solid #f5f5f5;">/g, "<td>"],
	[
		/<td style="padding:10px 16px;text-align:center;" class="td-actions"/g,
		'<td class="td-center td-actions"',
	],
	[
		/<td style="padding:10px 16px;text-align:right;font-weight:600;">/g,
		'<td class="td-right-strong">',
	],
	[
		/<td style="padding:10px 16px;text-align:center;">/g,
		'<td class="td-center">',
	],
	[
		/<td style="padding:10px 16px;font-weight:600;">/g,
		'<td class="td-strong">',
	],
	[
		/<td style="padding:10px 16px;color:#aaa;" title=/g,
		'<td class="td-placeholder" title=',
	],
	[
		/<td style="padding:10px 16px;color:#aaa;">/g,
		'<td class="td-placeholder">',
	],
	[
		/<td style="padding:10px 16px;color:#e67e22;font-weight:600;">/g,
		'<td class="td-due-warn">',
	],
	[/<td style="padding:10px 16px;"><span/g, "<td><span"],
	[/<td style="padding:10px 16px;">/g, "<td>"],
];

for (const file of walkHtmlFiles(root)) {
	let s = fs.readFileSync(file, "utf8");
	const before = s;
	for (const [re, rep] of replacements) {
		s = s.replace(re, rep);
	}
	if (s !== before) fs.writeFileSync(file, s);
}

const accPath = path.join(root, "pages", "accounting.html");
if (fs.existsSync(accPath)) {
	let t = fs.readFileSync(accPath, "utf8");
	t = t.replace(
		/<table class="admin-data-table">/g,
		'<table class="admin-data-table admin-data-table--compact">',
	);
	fs.writeFileSync(accPath, t);
}
