/**
 * Koi's Story — Koi Form
 * Logique spécifique à koi-form.html
 * Requires: notifications.js
 */

document.addEventListener("turbo:load", () => {
	const uploadZone = document.querySelector(".upload-zone");
	const fileInput = document.getElementById("koi-images");
	const preview = document.getElementById("img-preview");
	if (!fileInput || fileInput.dataset.bound === "true") return;
	fileInput.dataset.bound = "true";

	const syncFiles = (files) => {
		const dataTransfer = new DataTransfer();
		files.forEach((file) => {
			dataTransfer.items.add(file);
		});
		fileInput.files = dataTransfer.files;
	};

	const renderPreviews = () => {
		if (!preview) return;
		preview
			.querySelectorAll(".img-thumb--new")
			.forEach((node) => {
				node.remove();
			});
		Array.from(fileInput.files).forEach((file, index) => {
			if (!file.type.startsWith("image/")) return;
			const reader = new FileReader();
			reader.onload = (event) => {
				const div = document.createElement("div");
				div.className = "img-thumb img-thumb--new";
				div.dataset.fileIndex = String(index);
				div.innerHTML = `<img src="${event.target.result}" alt="Preview ${index + 1}">
          <button type="button" class="img-remove" aria-label="Supprimer cette image">✕</button>`;
				preview.appendChild(div);
			};
			reader.readAsDataURL(file);
		});
	};

	// ── ZONE DE CLIC → déclenche le file input ────────────────────
	if (uploadZone) {
		uploadZone.addEventListener("click", (e) => {
			if (!e.target.closest(".img-remove")) fileInput.click();
		});

		// ── PRÉVISUALISATION DES IMAGES ────────────────────────────
		fileInput.addEventListener("change", renderPreviews);
	}

	// ── SUPPRESSION D'UNE IMAGE (délégation) ─────────────────────
	if (preview) {
		preview.addEventListener("click", (e) => {
			const btn = e.target.closest(".img-remove");
			if (!btn) return;
			const thumb = btn.closest(".img-thumb--new");
			if (!thumb) {
				btn.closest(".img-thumb")?.remove();
				return;
			}

			const indexToRemove = Number(thumb.dataset.fileIndex);
			const remainingFiles = Array.from(fileInput.files).filter(
				(_, index) => index !== indexToRemove,
			);
			syncFiles(remainingFiles);
			renderPreviews();
		});
	}
});
