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
		overlay.className = "gallery-overlay";
		overlay.setAttribute("role", "dialog");
		overlay.setAttribute("aria-modal", "true");
		overlay.setAttribute("aria-label", "Photo en plein écran");

		const overlayImg = document.createElement("img");
		overlayImg.className = "gallery-overlay__img";

		const closeBtn = document.createElement("button");
		closeBtn.textContent = "✕";
		closeBtn.className = "gallery-overlay__close";
		closeBtn.setAttribute("aria-label", "Fermer");

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
			overlay.classList.add("gallery-overlay--open");
			document.body.style.overflow = "hidden";
			closeBtn.focus();
		};

		const closeLightbox = () => {
			overlay.classList.remove("gallery-overlay--open");
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

		overlay.addEventListener("keydown", (event) => {
			if (event.key === "Tab") {
				event.preventDefault();
				closeBtn.focus();
			}
		});

		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape") closeLightbox();
			if (!overlay.classList.contains("gallery-overlay--open")) return;
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
