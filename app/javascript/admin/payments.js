/**
 * Koi's Story — Payments
 * Filtres et logique formulaire paiement — payments.html
 * Requires: notifications.js
 */

document.addEventListener("turbo:load", () => {
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
			const show = payType.value === "acompte" || payType.value === "echelonne";
			dueDateGroup.classList.toggle("is-hidden", !show);
		});
	}

	// ── SOUMISSION FORMULAIRE (saisie manuelle) ───────────────────
	const form = document.querySelector("form");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			showNotification("Paiement enregistré avec succès", "success");
		});
	}

	// ── VOIR PAIEMENT (modal détail) ──────────────────────────────
	document.addEventListener("click", (e) => {
		const btn = e.target.closest("[data-open-payment]");
		if (!btn) return;
		e.preventDefault();
		const row = btn.closest("tr");
		if (!row) return;

		const setText = (id, val) => {
			const el = document.getElementById(id);
			if (el) el.textContent = val;
		};
		setText("modal-pay-client", row.dataset.client || "");
		setText("modal-pay-order", row.dataset.order || "");
		setText("modal-pay-amount", row.dataset.amount || "");
		setText("modal-pay-type", row.dataset.type || "");
		setText("modal-pay-status", row.dataset.statusLabel || "");
		setText("modal-pay-due", row.dataset.due || "—");

		window.AdminModal?.open("modal-payment-detail");
	});

	// ── ACTION PAIEMENT (Solder / Encaisser) ──────────────────────
	document.addEventListener("click", (e) => {
		const btn = e.target.closest("[data-open-payment-action]");
		if (!btn) return;
		e.preventDefault();
		const row = btn.closest("tr");
		if (!row) return;

		const action = btn.dataset.openPaymentAction || "encaisser";
		const titleEl = document.getElementById("modal-payment-action-title");
		if (titleEl)
			titleEl.textContent =
				action === "solder" ? "Solder le paiement" : "Encaisser un acompte";

		const actionClientEl = document.getElementById("modal-pay-action-client");
		if (actionClientEl) actionClientEl.textContent = row.dataset.client || "";
		const actionOrderEl = document.getElementById("modal-pay-action-order");
		if (actionOrderEl) actionOrderEl.textContent = row.dataset.order || "";
		const hiddenType = document.getElementById("pay-action-type");
		if (hiddenType) hiddenType.value = action;

		window.AdminModal?.open("modal-payment-action");
	});

	// ── CONFIRMER ACTION PAIEMENT ──────────────────────────────────
	const payActionForm = document.getElementById("form-pay-action");
	if (payActionForm) {
		payActionForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const action = document.getElementById("pay-action-type")?.value;
			const label = action === "solder" ? "soldé" : "encaissé";
			window.AdminModal?.closeAll();
			showNotification(`Paiement ${label} avec succès`, "success");
		});
	}
});
