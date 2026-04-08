/**
 * Koi's Story — Payments
 * Filtres du tableau des paiements.
 */

document.addEventListener("turbo:load", () => {
	const filter = document.getElementById("pay-status-filter");
	const table = document.querySelector(".panel table tbody");
	if (
		!filter ||
		!table ||
		table.dataset.clientFilters !== "true" ||
		table.dataset.paymentsBound === "true"
	)
		return;
	table.dataset.paymentsBound = "true";

	filter.addEventListener("change", () => {
		const value = filter.value;
		table.querySelectorAll("tr[data-payment-status]").forEach((row) => {
			row.style.display =
				!value || row.dataset.paymentStatus === value ? "" : "none";
		});
	});
});
