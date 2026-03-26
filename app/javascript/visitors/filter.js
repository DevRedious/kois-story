/**
 * filter.js  Koi's Story V3
 * Filtrage des .koi-card. Mobile: pill buttons + panels construits depuis selects.
 * Desktop: selects natifs. Les deux partagent les mêmes selects comme source d'état.
 */
(() => {
	document.addEventListener("turbo:load", () => {
		var selectVariety = document.getElementById("filter-variety");
		var selectAge = document.getElementById("filter-age");
		var selectPrice = document.getElementById("filter-price");
		var konishiToggle = document.getElementById("filter-konishi");
		var resetBtn = document.getElementById("filter-reset");
		var countEl = document.getElementById("filter-count");
		var filterBar = document.querySelector(".filter-bar");

		if (!selectVariety && !selectAge && !selectPrice) return;

		// ── Card filtering ────────────────────────────────────────────────────
		function applyFilters() {
			var variety = selectVariety ? selectVariety.value.toLowerCase() : "";
			var age = selectAge ? selectAge.value.toLowerCase() : "";
			var priceMax = selectPrice ? parseInt(selectPrice.value, 10) || 0 : 0;
			var konishiOnly = konishiToggle ? konishiToggle.checked : false;
			var cards = document.querySelectorAll(".koi-card[data-variety], .koi-card");
			var visible = 0;

			cards.forEach((card) => {
				var cardVariety = (card.dataset.variety || "").toLowerCase();
				var cardAge = (card.dataset.age || "").toLowerCase();
				var cardPrice = parseInt(card.dataset.price, 10) || 0;
				var cardKonishi =
					card.dataset.konishi === "true" ||
					card.querySelector(".badge--konishi") !== null;

				var show = true;
				if (variety && cardVariety && cardVariety !== variety) show = false;
				if (age && cardAge && cardAge !== age) show = false;
				if (priceMax > 0 && cardPrice > priceMax) show = false;
				if (konishiOnly && !cardKonishi) show = false;

				card.style.display = show ? "" : "none";
				if (show) visible++;
			});

			if (countEl) countEl.textContent = visible + (visible > 1 ? " koïs" : " koï");
		}

		[selectVariety, selectAge, selectPrice].forEach((el) => {
			if (el) el.addEventListener("change", applyFilters);
		});
		if (konishiToggle) konishiToggle.addEventListener("change", applyFilters);

		// ── Pill panels (mobile) ──────────────────────────────────────────────
		var pills = document.querySelectorAll(".filter-pill[data-select]");
		var builtPanels = {};

		function closePillPanels() {
			Object.values(builtPanels).forEach((p) => {
				p.hidden = true;
				p.setAttribute("aria-hidden", "true");
			});
			pills.forEach((p) => p.setAttribute("aria-expanded", "false"));
		}

		function onOptionSelect(select, pill, panel, btn) {
			select.value = btn.dataset.value;
			select.dispatchEvent(new Event("change"));

			var labelEl = pill.querySelector(".filter-pill__label");
			if (labelEl) {
				labelEl.textContent = btn.dataset.value
					? btn.textContent
					: labelEl.dataset.default || "";
			}
			pill.classList.toggle("filter-pill--active", btn.dataset.value !== "");
			panel.querySelectorAll(".filter-option").forEach((o) => {
				o.classList.toggle("filter-option--active", o === btn);
			});
			closePillPanels();
		}

		function buildPanel(select, pill) {
			var panel = document.createElement("div");
			panel.className = "filter-panel";
			panel.hidden = true;
			panel.setAttribute("aria-hidden", "true");

			Array.from(select.options).forEach((opt) => {
				var btn = document.createElement("button");
				btn.type = "button";
				btn.className = "filter-option" + (!opt.value ? " filter-option--active" : "");
				btn.dataset.value = opt.value;
				btn.textContent = opt.text;
				btn.addEventListener("click", () => onOptionSelect(select, pill, panel, btn));
				panel.appendChild(btn);
			});

			if (filterBar) filterBar.appendChild(panel);
			return panel;
		}

		pills.forEach((pill) => {
			var select = document.getElementById(pill.dataset.select);
			if (!select) return;
			var panel = buildPanel(select, pill);
			builtPanels[pill.dataset.select] = panel;

			pill.addEventListener("click", (e) => {
				e.stopPropagation();
				var isOpen = !panel.hidden;
				closePillPanels();
				if (!isOpen) {
					panel.hidden = false;
					panel.setAttribute("aria-hidden", "false");
					pill.setAttribute("aria-expanded", "true");
				}
			});
		});

		document.addEventListener("click", (e) => {
			if (filterBar && !filterBar.contains(e.target)) closePillPanels();
		});

		// ── Drag-to-scroll ────────────────────────────────────────────────────
		var filterInner = document.querySelector(".filter-bar__inner");
		if (filterInner) {
			var isDragging = false;
			var dragStartX = 0;
			var scrollStart = 0;

			filterInner.addEventListener("mousedown", (e) => {
				if (e.target.closest(".filter-pill, .filter-toggle, .filter-reset")) return;
				isDragging = true;
				dragStartX = e.pageX;
				scrollStart = filterInner.scrollLeft;
				filterInner.classList.add("filter-bar__inner--dragging");
				e.preventDefault();
			});

			document.addEventListener("mousemove", (e) => {
				if (!isDragging) return;
				filterInner.scrollLeft = scrollStart - (e.pageX - dragStartX);
			});

			document.addEventListener("mouseup", () => {
				if (!isDragging) return;
				isDragging = false;
				filterInner.classList.remove("filter-bar__inner--dragging");
			});
		}

		// ── Reset ─────────────────────────────────────────────────────────────
		if (resetBtn) {
			resetBtn.addEventListener("click", () => {
				if (selectVariety) selectVariety.value = "";
				if (selectAge) selectAge.value = "";
				if (selectPrice) selectPrice.value = "";
				if (konishiToggle) konishiToggle.checked = false;

				pills.forEach((pill) => {
					var labelEl = pill.querySelector(".filter-pill__label");
					if (labelEl) labelEl.textContent = labelEl.dataset.default || "";
					pill.classList.remove("filter-pill--active");
				});
				Object.values(builtPanels).forEach((panel) => {
					panel.querySelectorAll(".filter-option").forEach((o) => {
						o.classList.toggle("filter-option--active", !o.dataset.value);
					});
				});
				applyFilters();
			});
		}

		// ── Nike scroll: header blanc disparaît, filter bar monte (mobile) ────
		var header = document.querySelector(".site-header");
		var siteLogo = document.querySelector(".site-logo");
		var lastScrollY = window.scrollY;
		var scrollTicking = false;
		window.addEventListener("scroll", () => {
			if (window.innerWidth > 900 || scrollTicking) return;
			scrollTicking = true;
			window.requestAnimationFrame(() => {
				var currentY = window.scrollY;
				var goingDown = currentY > lastScrollY && currentY > 80;
				if (header) header.classList.toggle("site-header--scroll-hidden", goingDown);
				if (filterBar) filterBar.classList.toggle("filter-bar--at-top", goingDown);
				if (siteLogo) siteLogo.classList.toggle("site-logo--hidden", goingDown);
				lastScrollY = currentY;
				scrollTicking = false;
			});
		}, { passive: true });

		applyFilters();
	});
})();
