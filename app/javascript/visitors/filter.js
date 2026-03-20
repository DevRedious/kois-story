/**
 * filter.js  Koi's Story V3
 * Filtrage des .koi-card sur la page kois.html.
 * Écoute les selects (variété, âge, prix) et le toggle Konishi.
 * Cache les cards ne correspondant pas. Met à jour le compteur.
 */
(() => {
	document.addEventListener("turbo:load", () => {
		var selectVariety = document.getElementById("filter-variety");
		var selectAge = document.getElementById("filter-age");
		var selectPrice = document.getElementById("filter-price");
		var konishiToggle = document.getElementById("filter-konishi");
		var resetBtn = document.getElementById("filter-reset");
		var countEl = document.getElementById("filter-count");

		if (!selectVariety && !selectAge && !selectPrice && !konishiToggle) return;

		function getCards() {
			return (
				document.querySelectorAll(".koi-card[data-variety]") ||
				document.querySelectorAll(".koi-card")
			);
		}

		function applyFilters() {
			var variety = selectVariety ? selectVariety.value.toLowerCase() : "";
			var age = selectAge ? selectAge.value.toLowerCase() : "";
			var priceMax = selectPrice ? parseInt(selectPrice.value, 10) || 0 : 0;
			var konishiOnly = konishiToggle ? konishiToggle.checked : false;

			var cards = getCards();
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

			if (countEl) {
				countEl.textContent = visible + (visible > 1 ? " koïs" : " koï");
			}
		}

		// Listeners
		[selectVariety, selectAge, selectPrice].forEach((el) => {
			if (el) el.addEventListener("change", applyFilters);
		});
		if (konishiToggle) konishiToggle.addEventListener("change", applyFilters);

		if (resetBtn) {
			resetBtn.addEventListener("click", () => {
				if (selectVariety) selectVariety.value = "";
				if (selectAge) selectAge.value = "";
				if (selectPrice) selectPrice.value = "";
				if (konishiToggle) konishiToggle.checked = false;
				applyFilters();
			});
		}

		// Initialisation
		applyFilters();
	});
})();
