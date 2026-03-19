/**
 * Koi's Story — Admin Modal System
 * Ouvrir, fermer, Escape, click overlay.
 * Expose window.AdminModal pour les autres fichiers JS.
 */

(() => {
	var OPEN_CLASS = "modal-overlay--open";

	function openModal(id) {
		var overlay = document.getElementById(id);
		if (!overlay) return;
		overlay.classList.add(OPEN_CLASS);
		document.body.style.overflow = "hidden";
		var first = overlay.querySelector(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		if (first)
			setTimeout(() => {
				first.focus();
			}, 50);
	}

	function closeModal(id) {
		var overlay = document.getElementById(id);
		if (!overlay) return;
		overlay.classList.remove(OPEN_CLASS);
		document.body.style.overflow = "";
	}

	function closeAll() {
		document.querySelectorAll(`.modal-overlay.${OPEN_CLASS}`).forEach((o) => {
			o.classList.remove(OPEN_CLASS);
		});
		document.body.style.overflow = "";
	}

	document.addEventListener("DOMContentLoaded", () => {
		// Fermer via [data-modal-close]
		document.addEventListener("click", (e) => {
			if (e.target.closest("[data-modal-close]")) closeAll();
		});

		// Fermer en cliquant directement sur l'overlay (pas sur .modal)
		document.addEventListener("click", (e) => {
			if (e.target.classList.contains("modal-overlay")) closeAll();
		});

		// Fermer avec Escape
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") closeAll();
		});
	});

	window.AdminModal = {
		open: openModal,
		close: closeModal,
		closeAll: closeAll,
	};
})();
