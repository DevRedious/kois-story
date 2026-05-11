/**
 * animations.js  Koi's Story
 * Triggers .is-visible on [data-animate] elements when they enter the viewport.
 * Compatible with Turbo (Rails Hotwire) via the turbo:load event.
 */

import { createLifecycle } from "visitors/header-utils";

let lifecycle;

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

const isInViewport = (el) => {
	const rect = el.getBoundingClientRect();
	return rect.top < window.innerHeight - 40 && rect.bottom > 0;
};

const initAnimations = () => {
	document.querySelectorAll("[data-animate]").forEach((el) => {
		if (el.classList.contains("is-visible")) return;
		if (isInViewport(el)) {
			el.classList.add("is-visible");
		} else {
			animObserver.observe(el);
		}
	});
};

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

	lifecycle.listen(window, "scroll", check, { passive: true });
	check();
};

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

	lifecycle.listen(toggle, "click", (event) => {
		event.preventDefault();
		const isOpen = menu.classList.toggle("open");
		toggle.setAttribute("aria-expanded", String(isOpen));
	});

	lifecycle.listen(document, "click", (event) => {
		if (!menu.contains(event.target)) closeMenu();
	});

	lifecycle.listen(document, "keydown", (event) => {
		if (event.key === "Escape") closeMenu();
	});

	menu.dataset.bound = "true";
};

const initFooterDropdowns = () => {
	initFooterDropdown("footer-legal");
	initFooterDropdown("footer-products");
};

document.addEventListener("turbo:load", () => {
	lifecycle?.destroy();
	lifecycle = createLifecycle();
	initAnimations();
	initFloatCta();
	initFooterDropdowns();
});

document.addEventListener("turbo:before-cache", () => {
	lifecycle?.destroy();
	lifecycle = undefined;
	animObserver.disconnect();
});
