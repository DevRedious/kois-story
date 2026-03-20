/**
 * Koi's Story — Admin Global
 * Comportements partagés par toutes les pages admin.
 * Requires: notifications.js (chargé avant ce fichier)
 */

document.addEventListener("turbo:load", () => {
	// ── THEME SWITCHER (light / dark / system, défaut: system) ──────
	var themeSelect = document.querySelector(".theme-switcher select");
	if (themeSelect) {
		const current = localStorage.getItem("admin-theme") || "system";
		themeSelect.value = current;
		themeSelect.addEventListener("change", function () {
			var v = this.value;
			localStorage.setItem("admin-theme", v);
			if (v === "system") {
				document.documentElement.removeAttribute("data-theme");
			} else {
				document.documentElement.setAttribute("data-theme", v);
			}
		});
	}

	// ── SIDEBAR MOBILE TOGGLE ─────────────────────────────────────
	const menuBurger = document.querySelector(".menu-burger");
	const sidebar = document.querySelector(".sidebar");
	const overlay = document.querySelector(".overlay");

	if (menuBurger) {
		menuBurger.addEventListener("click", function () {
			sidebar?.classList.toggle("open");
			overlay?.classList.toggle("active");
			const svg = this.querySelector("svg");
			if (svg?.classList.contains("burger-icon")) {
				const isOpen = sidebar?.classList.contains("open");
				svg.innerHTML = isOpen
					? '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
					: '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
			}
		});
	}

	overlay?.addEventListener("click", function () {
		sidebar?.classList.remove("open");
		this.classList.remove("active");
	});

	// ── DÉCONNEXION ───────────────────────────────────────────────
	document.addEventListener("click", (e) => {
		if (e.target.closest(".logout-btn")) {
			e.preventDefault();
			if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
				showNotification("Déconnexion réussie", "success");
				setTimeout(() => {
					window.location.href = "login.html";
				}, 1000);
			}
		}
	});

	// ── SUPPRIMER (modal confirm) ─────────────────────────────────
	let pendingDeleteRow = null;

	document.addEventListener("click", (e) => {
		const btn = e.target.closest("[data-delete-label]");
		if (!btn) return;
		e.preventDefault();
		pendingDeleteRow = btn.closest("tr");
		const label = btn.dataset.deleteLabel || "cet élément";
		const itemEl = document.getElementById("confirm-item-label");
		if (itemEl) itemEl.textContent = label;
		window.AdminModal?.open("modal-confirm");
	});

	document.addEventListener("click", (e) => {
		if (!e.target.closest("#btn-confirm-delete")) return;
		window.AdminModal?.closeAll();
		if (pendingDeleteRow) {
			pendingDeleteRow.style.transition = "opacity 0.3s ease";
			pendingDeleteRow.style.opacity = "0";
			setTimeout(() => {
				pendingDeleteRow?.remove();
				pendingDeleteRow = null;
			}, 300);
		}
		showNotification("Élément supprimé", "success");
	});

	// ── RECHERCHE ─────────────────────────────────────────────────
	document.addEventListener("input", (e) => {
		const input = e.target.closest('.filter-search, input[type="search"]');
		if (!input) return;
		const query = input.value.toLowerCase();
		document.querySelectorAll("tbody tr").forEach((row) => {
			row.style.display = row.textContent.toLowerCase().includes(query)
				? ""
				: "none";
		});
	});

	// ── FILTRES ───────────────────────────────────────────────────
	document.addEventListener("change", (e) => {
		const select = e.target.closest(".filter-select");
		if (!select) return;
		showNotification(`Filtre appliqué : ${select.value}`, "info");
	});

	// ── GUARD FORMULAIRE NON SAUVEGARDÉ ──────────────────────────
	let formModified = false;
	document.querySelectorAll("form").forEach((form) => {
		form.addEventListener("change", () => {
			formModified = true;
		});
		form.addEventListener("submit", () => {
			formModified = false;
		});
	});
	window.addEventListener("beforeunload", (e) => {
		if (formModified) {
			e.preventDefault();
			e.returnValue = "";
		}
	});

	console.log("🐟 Koi's Story Admin — chargé");
});
