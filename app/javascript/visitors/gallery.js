/**
 * gallery.js  Koi's Story V3
 * Product gallery slider + lightbox, compatible with Turbo.
 */
(() => {
	document.addEventListener("turbo:load", () => {
		const track = document.getElementById("gallery-track");
		const main = document.getElementById("gallery-main");
		const thumbs = Array.from(document.querySelectorAll(".gallery-thumb"));
		if (!track || !main || thumbs.length === 0) return;

		const slides = Array.from(track.querySelectorAll("img"));
		const prevBtn = document.querySelector(".gallery-nav.prev");
		const nextBtn = document.querySelector(".gallery-nav.next");
		let current = 0;

		const overlay = document.createElement("div");
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

		const overlayImg = document.createElement("img");
		overlayImg.style.cssText = [
			"max-width:90vw",
			"max-height:90vh",
			"object-fit:contain",
			"border-radius:8px",
			"box-shadow:0 8px 40px rgba(0,0,0,0.6)",
			"cursor:default",
		].join(";");

		const closeBtn = document.createElement("button");
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
		].join(";");

		overlay.appendChild(overlayImg);
		overlay.appendChild(closeBtn);
		document.body.appendChild(overlay);

		const goTo = (index) => {
			current = (index + slides.length) % slides.length;
			track.style.transform = `translateX(-${current * 100}%)`;
			thumbs.forEach((thumb, thumbIndex) => {
				thumb.classList.toggle("active", thumbIndex === current);
			});
		};

		const openLightbox = () => {
			overlayImg.src = slides[current].src;
			overlayImg.alt = slides[current].alt || "";
			overlay.style.display = "flex";
			document.body.style.overflow = "hidden";
			closeBtn.focus();
		};

		const closeLightbox = () => {
			overlay.style.display = "none";
			overlayImg.src = "";
			document.body.style.overflow = "";
		};

		prevBtn?.addEventListener("click", () => goTo(current - 1));
		nextBtn?.addEventListener("click", () => goTo(current + 1));

		thumbs.forEach((thumb, index) => {
			thumb.addEventListener("click", () => goTo(index));
		});

		main.addEventListener("click", (event) => {
			if (event.target.closest(".gallery-nav")) return;
			openLightbox();
		});

		overlay.addEventListener("click", (event) => {
			if (event.target === overlay) closeLightbox();
		});
		closeBtn.addEventListener("click", closeLightbox);

		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape") closeLightbox();
			if (overlay.style.display !== "flex") return;
			if (event.key === "ArrowLeft") {
				goTo(current - 1);
				overlayImg.src = slides[current].src;
			}
			if (event.key === "ArrowRight") {
				goTo(current + 1);
				overlayImg.src = slides[current].src;
			}
		});

		goTo(0);
	});
})();
