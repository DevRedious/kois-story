/**
 * header.js — Koi's Story V3
 * Transition header transparent → sombre au scroll via IntersectionObserver.
 * Ajoute/enlève `.site-header--scrolled` sur #site-header.
 */
(() => {
	document.addEventListener("DOMContentLoaded", () => {
		var header = document.getElementById("site-header");
		if (!header) return;

		// On cherche le premier élément hero ou un repère de scroll
		var hero =
			document.getElementById("hero") ||
			document.querySelector(".hero") ||
			document.querySelector("[data-scroll-trigger]");

		var filterBar = document.querySelector(".filter-bar");
		var filterInner = document.querySelector(".filter-bar__inner");
		var logo = document.getElementById("site-logo");
		var pill = header.querySelector(".header__pill");

		function applyNavOffset() {
			if (!filterInner || !pill) return;
			var pillW = pill.offsetWidth;
			var sp8 =
				parseInt(
					getComputedStyle(document.documentElement).getPropertyValue("--sp-8"),
				) || 32;
			filterInner.style.paddingRight = pillW + sp8 * 2 + "px";
		}

		function removeNavOffset() {
			if (!filterInner) return;
			filterInner.style.paddingRight = "";
		}

		if (hero) {
			const io = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							header.classList.remove("site-header--scrolled");
							if (filterBar) {
								header.classList.remove("site-header--on-filter");
								removeNavOffset();
								if (logo) logo.classList.remove("site-logo--hidden");
							}
						} else {
							header.classList.add("site-header--scrolled");
							if (filterBar) {
								header.classList.add("site-header--on-filter");
								applyNavOffset();
								if (logo) logo.classList.add("site-logo--hidden");
							}
						}
					});
				},
				{ threshold: 0.1 },
			);

			io.observe(hero);
		} else {
			// Fallback scroll classique si pas de hero
			window.addEventListener(
				"scroll",
				() => {
					if (window.scrollY > 80) {
						header.classList.add("site-header--scrolled");
					} else {
						header.classList.remove("site-header--scrolled");
					}
				},
				{ passive: true },
			);
		}
	});
})();
