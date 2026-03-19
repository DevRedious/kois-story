/**
 * Koi's Story — Admin Modal System
 * Ouvrir, fermer, Escape, click overlay.
 * Expose window.AdminModal pour les autres fichiers JS.
 */

(function () {
	"use strict";

	var OPEN_CLASS = "modal-overlay--open";

	function openModal(id) {
		var overlay = document.getElementById(id);
		if (!overlay) return;
		overlay.classList.add(OPEN_CLASS);
		document.body.style.overflow = "hidden";
		var first = overlay.querySelector(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		if (first) setTimeout(function () { first.focus(); }, 50);
	}

	function closeModal(id) {
		var overlay = document.getElementById(id);
		if (!overlay) return;
		overlay.classList.remove(OPEN_CLASS);
		document.body.style.overflow = "";
	}

	function closeAll() {
		document.querySelectorAll(".modal-overlay." + OPEN_CLASS).forEach(function (o) {
			o.classList.remove(OPEN_CLASS);
		});
		document.body.style.overflow = "";
	}

	document.addEventListener("DOMContentLoaded", function () {
		// Fermer via [data-modal-close]
		document.addEventListener("click", function (e) {
			if (e.target.closest("[data-modal-close]")) closeAll();
		});

		// Fermer en cliquant directement sur l'overlay (pas sur .modal)
		document.addEventListener("click", function (e) {
			if (e.target.classList.contains("modal-overlay")) closeAll();
		});

		// Fermer avec Escape
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape") closeAll();
		});
	});

	window.AdminModal = { open: openModal, close: closeModal, closeAll: closeAll };
})();
