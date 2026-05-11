import { bindFooterIndicator } from "visitors/footer-indicator";
import { bindHeaderNav } from "visitors/header-nav";
import { bindMobileMenu } from "visitors/header-mobile-menu";
import {
	applyScrolledState,
	createLifecycle,
	findHeroTrigger,
} from "visitors/header-utils";

let lifecycle;

const getHeaderElements = () => ({
	header: document.getElementById("site-header"),
	hero: findHeroTrigger(),
	filterBar: document.querySelector(".filter-bar"),
	filterInner: document.querySelector(".filter-bar__inner"),
	logo: document.getElementById("site-logo"),
	partner: document.querySelector(".site-partner"),
	nav: document.getElementById("header-nav"),
	navIndicator: document.getElementById("nav-indicator"),
	burger: document.getElementById("burger"),
	backdrop: document.getElementById("nav-backdrop"),
	footerLinks: document.getElementById("footer-links"),
	footerIndicator: document.getElementById("footer-indicator"),
});

const bindScrollState = (elements) => {
	if (elements.hero) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					applyScrolledState(elements, !entry.isIntersecting);
				});
			},
			{ threshold: 0.1 },
		);

		observer.observe(elements.hero);
		lifecycle.cleanup(() => observer.disconnect());
		return;
	}

	const syncScrollState = () => {
		applyScrolledState(elements, window.scrollY > 80);
	};

	syncScrollState();
	lifecycle.listen(window, "scroll", syncScrollState, { passive: true });
};

document.addEventListener("turbo:load", () => {
	lifecycle?.destroy();
	lifecycle = createLifecycle();

	const elements = getHeaderElements();
	if (!elements.header) return;

	bindHeaderNav({
		nav: elements.nav,
		navIndicator: elements.navIndicator,
		lifecycle,
	});
	bindMobileMenu({
		burger: elements.burger,
		nav: elements.nav,
		backdrop: elements.backdrop,
		lifecycle,
	});
	bindFooterIndicator({
		footerLinks: elements.footerLinks,
		footerIndicator: elements.footerIndicator,
		lifecycle,
	});
	bindScrollState(elements);
});

document.addEventListener("turbo:before-cache", () => {
	lifecycle?.destroy();
	lifecycle = undefined;
});
