/**
 * Koi's Story — Messages
 * Filtre du tableau des messages.
 */

document.addEventListener("turbo:load", () => {
	const filter = document.getElementById("msg-filter");
	if (!filter) return;

	filter.addEventListener("change", function () {
		const value = this.value;
		document.querySelectorAll("tbody .msg-row").forEach((row) => {
			row.style.display = !value || row.dataset.read === value ? "" : "none";
		});
	});
});
