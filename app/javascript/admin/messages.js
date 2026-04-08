/**
 * Koi's Story — Messages
 * Filtre du tableau des messages.
 */

document.addEventListener("turbo:load", () => {
	const table = document.querySelector(".panel--messages tbody");
	const searchInput = document.getElementById("msg-search");
	const filters = document.querySelectorAll("[data-filter-status]");
	if (!table || table.dataset.bound === "true") return;
	table.dataset.bound = "true";

	const state = { status: "", query: "" };

	const applyFilters = () => {
		table.querySelectorAll(".msg-row").forEach((row) => {
			const matchesStatus =
				!state.status || row.dataset.status === state.status;
			const haystack = row.dataset.search || "";
			const matchesQuery = !state.query || haystack.includes(state.query);
			row.style.display = matchesStatus && matchesQuery ? "" : "none";
		});
	};

	searchInput?.addEventListener("input", () => {
		state.query = searchInput.value.trim().toLowerCase();
		applyFilters();
	});

	filters.forEach((filter) => {
		filter.addEventListener("click", () => {
			state.status = filter.dataset.filterStatus || "";
			filters.forEach((button) => {
				button.classList.toggle("is-active", button === filter);
			});
			applyFilters();
		});
	});
});
