/**
 * Koi's Story — Messages List
 * Filtre du tableau des messages — messages.html
 */

document.addEventListener("DOMContentLoaded", () => {
	const filter = document.getElementById("msg-filter");
	if (!filter) return;

	filter.addEventListener("change", function () {
		const v = this.value;
		document.querySelectorAll("tbody .msg-row").forEach((r) => {
			r.style.display = !v || r.dataset.read === v ? "" : "none";
		});
	});
});
