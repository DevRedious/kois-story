/**
 * Koi's Story — Admin Global
 * Comportements partagés par toutes les pages admin.
 * Requires: notifications.js (chargé avant ce fichier)
 */

document.addEventListener("DOMContentLoaded", () => {
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

	// ── ACTIONS TABLEAU (Éditer / Supprimer / Voir) ───────────────
	document.addEventListener("click", (e) => {
		const btn = e.target.closest(".btn");
		if (!btn) return;
		const text = btn.textContent.trim();

		if (text === "Éditer") {
			e.preventDefault();
			showNotification("Ouverture du formulaire d'édition…", "info");
		}

		if (text === "Supprimer") {
			e.preventDefault();
			if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
				showNotification("Élément supprimé", "success");
				const row = btn.closest("tr");
				if (row) {
					row.style.transition = "opacity 0.3s ease";
					row.style.opacity = "0";
					setTimeout(() => row.remove(), 300);
				}
			}
		}

		if (text === "Voir") {
			e.preventDefault();
			showNotification("Ouverture de la fiche…", "info");
		}
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

	// ── MESSAGES — MARQUER COMME LU ───────────────────────────────
	document.addEventListener("click", (e) => {
		const row = e.target.closest(".msg-row");
		if (!row || !row.classList.contains("unread")) return;
		row.classList.remove("unread");
		const badge = document.querySelector(".nav-badge");
		if (badge) {
			const count = parseInt(badge.textContent, 10) - 1;
			badge.textContent = count > 0 ? count : "";
			if (count <= 0) badge.style.display = "none";
		}
		showNotification("Message marqué comme lu", "success");
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
