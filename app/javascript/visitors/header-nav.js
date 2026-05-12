import { moveIndicator } from "visitors/header-utils";

const LEGACY_NAV_INDICATOR_KEY = "koisStoryNavIndicator";
const ACTIVE_NAV_SELECTOR =
	"ul > li > a.active, ul > li > .dropdown-toggle.active";

const linkMatchesCurrentPath = (href, currentPath, currentPage) => {
	if (!href || href === "#" || href.startsWith("http")) return false;

	return (
		href === currentPath ||
		(currentPath === "/" && href === "/") ||
		(currentPath.startsWith("/kois/") && href === "/kois") ||
		(Boolean(currentPage) && href.endsWith(`/${currentPage}`))
	);
};

const getIndicatorTarget = (link) => {
	if (!link) return undefined;
	if (link.closest(".dropdown")) {
		return link.closest(".has-dropdown")?.querySelector(".dropdown-toggle");
	}
	return link.closest("li")?.querySelector("a, .dropdown-toggle") || link;
};

const clearActiveLinks = (nav) => {
	nav.querySelectorAll(ACTIVE_NAV_SELECTOR).forEach((link) => {
		link.classList.remove("active");
	});
};

const markCurrentActiveLink = (nav, currentPath, currentPage) => {
	clearActiveLinks(nav);
	nav.querySelectorAll("a[href]").forEach((link) => {
		const href = link.getAttribute("href");
		if (!linkMatchesCurrentPath(href, currentPath, currentPage)) return;
		getIndicatorTarget(link)?.classList.add("active");
	});

	return nav.querySelector(ACTIVE_NAV_SELECTOR);
};

export const bindHeaderNav = ({ nav, navIndicator, lifecycle }) => {
	if (!nav) return;

	const list = nav.querySelector("ul");
	const currentPath = window.location.pathname;
	const currentPage = currentPath.split("/").filter(Boolean).pop() || "";

	window.sessionStorage.removeItem(LEGACY_NAV_INDICATOR_KEY);
	markCurrentActiveLink(nav, currentPath, currentPage);

	const isLocalNavigation = (link, event) => {
		if (
			event.defaultPrevented ||
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		) {
			return false;
		}

		const href = link.getAttribute("href");
		if (!href || href === "#" || href.startsWith("http")) return false;
		const url = new URL(href, window.location.href);
		return url.origin === window.location.origin;
	};

	const setActiveTarget = (target) => {
		if (!target) return;
		clearActiveLinks(nav);
		target.classList.add("active");
	};

	const positionIndicator = (target, withMotion = false) => {
		if (!navIndicator || !target) return;
		nav.classList.add("header__nav--indicator-ready");
		if (withMotion) {
			moveIndicator(nav, navIndicator, target);
			return;
		}

		navIndicator.style.transition = "none";
		moveIndicator(nav, navIndicator, target);
		window.requestAnimationFrame(() => {
			navIndicator.style.transition = "";
		});
	};

	const syncHeaderIndicator = () => {
		if (!navIndicator) return;
		if (window.innerWidth <= 1279) {
			nav.classList.remove("header__nav--indicator-ready");
			navIndicator.style.opacity = "0";
			return;
		}
		const activeLink = nav.querySelector(ACTIVE_NAV_SELECTOR);
		if (activeLink) {
			positionIndicator(activeLink);
		} else {
			nav.classList.remove("header__nav--indicator-ready");
			navIndicator.style.opacity = "0";
		}
	};

	syncHeaderIndicator();

	list?.querySelectorAll("a[href]").forEach((link) => {
		lifecycle.listen(link, "click", (event) => {
			if (!navIndicator || window.innerWidth <= 1279) return;
			if (!isLocalNavigation(link, event)) return;
			const target = getIndicatorTarget(link);
			setActiveTarget(target);
			positionIndicator(target, true);
		});
	});
	lifecycle.listen(window, "resize", syncHeaderIndicator);
	lifecycle.listen(document, "visibilitychange", () => {
		if (document.visibilityState === "visible") syncHeaderIndicator();
	});
};
