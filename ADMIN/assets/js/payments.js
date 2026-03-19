/**
 * Koi's Story — Payments
 * Filtres et logique formulaire paiement — payments.html
 * Requires: notifications.js
 */

document.addEventListener("DOMContentLoaded", () => {
	// ── FILTRE STATUT ──────────────────────────────────────────────
	const statusFilter = document.getElementById("pay-status-filter");
	const paymentsTable = document.querySelector(".panel table tbody");
	if (statusFilter && paymentsTable) {
		statusFilter.addEventListener("change", () => {
			const v = statusFilter.value;
			paymentsTable.querySelectorAll("tr").forEach((r) => {
				const status = r.dataset.paymentStatus || "";
				const show = !v || v === "tous" || status === v;
				r.style.display = show ? "" : "none";
			});
		});
	}

	// ── DATE D'ÉCHÉANCE CONDITIONNELLE ────────────────────────────
	const payType = document.getElementById("pay-type");
	const dueDateGroup = document.getElementById("due-date-group");

	if (payType && dueDateGroup) {
		payType.addEventListener("change", () => {
			const show = this.value === "acompte" || this.value === "echelonne";
			dueDateGroup.style.display = show ? "block" : "none";
		});
	}

	// ── SOUMISSION FORMULAIRE ─────────────────────────────────────
	const form = document.querySelector("form");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			showNotification("Paiement enregistré avec succès", "success");
		});
	}
});
