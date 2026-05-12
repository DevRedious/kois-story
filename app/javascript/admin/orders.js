/**
 * Koi's Story — Orders List
 * Filtres du tableau des commandes — orders.html
 */

document.addEventListener("turbo:load", () => {
	const statusFilter = document.getElementById("status-filter");
	const searchInput = document.getElementById("order-search");
	const table = document.getElementById("orders-table");

	if (
		!table ||
		table.dataset.clientFilters !== "true" ||
		table.dataset.bound === "true"
	)
		return;
	table.dataset.bound = "true";

	function applyFilters() {
		const st = statusFilter?.value ?? "";
		const q = searchInput?.value.toLowerCase() ?? "";
		table.querySelectorAll("tbody tr").forEach((r) => {
			const match =
				(!st || r.dataset.status === st) &&
				(!q || r.textContent.toLowerCase().includes(q));
			r.style.display = match ? "" : "none";
		});
	}

	statusFilter?.addEventListener("change", applyFilters);
	searchInput?.addEventListener("input", applyFilters);
});
