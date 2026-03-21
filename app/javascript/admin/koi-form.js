/**
 * Koi's Story — Koi Form
 * Logique spécifique à koi-form.html
 * Requires: notifications.js
 */

document.addEventListener("turbo:load", () => {
	const uploadZone = document.querySelector(".upload-zone");
	const fileInput = document.getElementById("koi-images");
	const preview = document.getElementById("img-preview");

	// ── ZONE DE CLIC → déclenche le file input ────────────────────
	if (uploadZone && fileInput) {
		uploadZone.addEventListener("click", (e) => {
			if (!e.target.closest(".img-remove")) fileInput.click();
		});

		// ── PRÉVISUALISATION DES IMAGES ────────────────────────────
		fileInput.addEventListener("change", function () {
			if (!preview) return;
			preview
				.querySelectorAll(".img-thumb--new")
				.forEach((node) => {
					node.remove();
				});
			Array.from(this.files).forEach((file, i) => {
				if (!file.type.startsWith("image/")) return;
				const reader = new FileReader();
				reader.onload = (e) => {
					const div = document.createElement("div");
					div.className = "img-thumb img-thumb--new";
					div.innerHTML = `<img src="${e.target.result}" alt="Preview ${i + 1}">
            <button type="button" class="img-remove" aria-label="Supprimer cette image">✕</button>`;
					preview.appendChild(div);
				};
				reader.readAsDataURL(file);
			});
		});
	}

	// ── SUPPRESSION D'UNE IMAGE (délégation) ─────────────────────
	if (preview) {
		preview.addEventListener("click", (e) => {
			const btn = e.target.closest(".img-remove");
			if (btn) btn.closest(".img-thumb").remove();
		});
	}
});
