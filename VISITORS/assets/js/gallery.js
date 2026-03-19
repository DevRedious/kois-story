/**
 * gallery.js — Koi's Story V3
 * Lightbox simple pour la galerie de la fiche produit.
 * Clic sur .koi-detail__thumb → affiche en grand dans un overlay.
 * Touche Escape ou clic overlay pour fermer.
 */
(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		// ── Construction de l'overlay ────────────────────────────────────
		var overlay = document.createElement("div");
		overlay.id = "gallery-overlay";
		overlay.setAttribute("role", "dialog");
		overlay.setAttribute("aria-modal", "true");
		overlay.setAttribute("aria-label", "Photo en plein écran");
		overlay.style.cssText = [
			"display:none",
			"position:fixed",
			"inset:0",
			"z-index:9000",
			"background:rgba(0,0,0,0.92)",
			"align-items:center",
			"justify-content:center",
			"cursor:zoom-out",
			"padding:var(--sp-8,2rem)",
		].join(";");

		var overlayImg = document.createElement("img");
		overlayImg.style.cssText = [
			"max-width:90vw",
			"max-height:90vh",
			"object-fit:contain",
			"border-radius:8px",
			"box-shadow:0 8px 40px rgba(0,0,0,0.6)",
			"cursor:default",
		].join(";");
		overlayImg.setAttribute("alt", "Photo koï agrandie");

		var closeBtn = document.createElement("button");
		closeBtn.textContent = "✕";
		closeBtn.setAttribute("aria-label", "Fermer");
		closeBtn.style.cssText = [
			"position:absolute",
			"top:1rem",
			"right:1rem",
			"background:rgba(255,255,255,0.12)",
			"color:#fff",
			"border:none",
			"border-radius:50%",
			"width:40px",
			"height:40px",
			"font-size:1.1rem",
			"cursor:pointer",
			"display:flex",
			"align-items:center",
			"justify-content:center",
			"transition:background 150ms ease",
		].join(";");

		overlay.appendChild(overlayImg);
		overlay.appendChild(closeBtn);
		document.body.appendChild(overlay);

		// ── Ouverture ────────────────────────────────────────────────────
		function openLightbox(src, alt) {
			overlayImg.src = src;
			overlayImg.alt = alt || "";
			overlay.style.display = "flex";
			document.body.style.overflow = "hidden";
			closeBtn.focus();
		}

		function closeLightbox() {
			overlay.style.display = "none";
			overlayImg.src = "";
			document.body.style.overflow = "";
		}

		// ── Événements ───────────────────────────────────────────────────
		overlay.addEventListener("click", function (e) {
			if (e.target === overlay) closeLightbox();
		});
		closeBtn.addEventListener("click", closeLightbox);
		overlayImg.addEventListener("click", function (e) {
			e.stopPropagation();
		});

		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape") closeLightbox();
		});

		// ── Attacher aux miniatures ──────────────────────────────────────
		function attachThumbs() {
			var thumbs = document.querySelectorAll(
				".koi-detail__thumb img, .gallery-cell img",
			);
			thumbs.forEach(function (img) {
				img.style.cursor = "zoom-in";
				img.addEventListener("click", function () {
					openLightbox(this.src, this.alt);
				});
			});
		}

		attachThumbs();
	});
})();
