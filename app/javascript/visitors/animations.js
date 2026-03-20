/**
 * animations.js  Koi's Story
 * Triggers .is-visible on [data-animate] elements when they enter the viewport.
 * Compatible with Turbo (Rails Hotwire) via the turbo:load event.
 */

const animObserver = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			entry.target.classList.add("is-visible");
			animObserver.unobserve(entry.target);
		}
	},
	{ threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);

const initAnimations = () => {
	document.querySelectorAll("[data-animate]").forEach((el) => {
		if (!el.classList.contains("is-visible")) animObserver.observe(el);
	});
};

document.addEventListener("turbo:load", initAnimations);

/* Floating CTA: hide when footer enters viewport */
const initFloatCta = () => {
	const cta = document.querySelector(".cta-wa-float");
	const footer = document.querySelector(".site-footer");
	if (!cta || !footer) return;

	const check = () => {
		cta.classList.toggle(
			"cta-wa-float--hidden",
			footer.getBoundingClientRect().top < window.innerHeight,
		);
	};

	window.addEventListener("scroll", check, { passive: true });
	check();
};

document.addEventListener("turbo:load", initFloatCta);

/* Video -> poster fade on ended */
const initVideoFade = () => {
	const video = document.querySelector(".hero__video");
	const poster = document.querySelector(".hero__poster");
	if (!video || !poster) return;
	video.addEventListener("ended", () => {
		video.classList.add("hero__video--fading");
		poster.classList.add("hero__poster--visible");
	});
};

document.addEventListener("turbo:load", initVideoFade);

/* Footer legal dropdown */
const initFooterDropdown = (id) => {
	const menu = document.getElementById(id);
	if (!menu) return;

	const toggle = menu.querySelector(".footer__legal-toggle");
	if (!toggle || menu.dataset.bound === "true") return;

	const closeMenu = () => {
		menu.classList.remove("open");
		toggle.setAttribute("aria-expanded", "false");
	};

	toggle.addEventListener("click", (event) => {
		event.preventDefault();
		const isOpen = menu.classList.toggle("open");
		toggle.setAttribute("aria-expanded", String(isOpen));
	});

	document.addEventListener("click", (event) => {
		if (!menu.contains(event.target)) closeMenu();
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") closeMenu();
	});

	menu.dataset.bound = "true";
};

const initFooterDropdowns = () => {
	initFooterDropdown("footer-legal");
	initFooterDropdown("footer-products");
};

document.addEventListener("turbo:load", initFooterDropdowns);
