import { moveIndicator, setIndicatorFrame } from "visitors/header-utils";

const NAV_INDICATOR_KEY = "koisStoryNavIndicator";

const linkMatchesCurrentPath = (href, currentPath, currentPage) => {
	if (!href || href === "#" || href.startsWith("http")) return false;

	return (
		href === currentPath ||
		(currentPath === "/" && href === "/") ||
		(currentPath.startsWith("/kois/") && href === "/kois") ||
		(Boolean(currentPage) && href.endsWith(`/${currentPage}`))
	);
};

export const bindHeaderNav = ({ nav, navIndicator, lifecycle }) => {
	if (!nav) return;

	const list = nav.querySelector("ul");
	const currentPath = window.location.pathname;
	const currentPage = currentPath.split("/").filter(Boolean).pop() || "";

	nav.querySelectorAll("a[href]").forEach((link) => {
		if (link.closest(".dropdown")) return;
		const href = link.getAttribute("href");
		if (linkMatchesCurrentPath(href, currentPath, currentPage)) {
			link.classList.add("active");
		}
	});

	const activeLink = nav.querySelector(
		"ul > li > a.active, ul > li > .dropdown-toggle.active",
	);

	const consumeSavedIndicator = () => {
		const raw = window.sessionStorage.getItem(NAV_INDICATOR_KEY);
		window.sessionStorage.removeItem(NAV_INDICATOR_KEY);
		if (!raw) return undefined;

		try {
			const parsed = JSON.parse(raw);
			if (!Number.isFinite(parsed.x) || !Number.isFinite(parsed.width)) {
				return undefined;
			}
			return parsed;
		} catch {
			return undefined;
		}
	};

	const saveCurrentIndicator = () => {
		if (!navIndicator || window.innerWidth <= 1279) return;
		const navRect = nav.getBoundingClientRect();
		const indicatorRect = navIndicator.getBoundingClientRect();
		if (!indicatorRect.width) return;

		window.sessionStorage.setItem(
			NAV_INDICATOR_KEY,
			JSON.stringify({
				x: indicatorRect.left - navRect.left,
				width: indicatorRect.width,
			}),
		);
	};

	const syncHeaderIndicator = () => {
		if (!navIndicator) return;
		if (window.innerWidth <= 1279) {
			nav.classList.remove("header__nav--indicator-ready");
			navIndicator.style.opacity = "0";
			return;
		}
		if (activeLink) {
			nav.classList.add("header__nav--indicator-ready");
			const saved = consumeSavedIndicator();
			if (saved) {
				navIndicator.style.transition = "none";
				setIndicatorFrame(navIndicator, saved.x, saved.width);
				window.requestAnimationFrame(() => {
					navIndicator.style.transition = "";
					window.requestAnimationFrame(() =>
						moveIndicator(nav, navIndicator, activeLink),
					);
				});
			} else {
				moveIndicator(nav, navIndicator, activeLink);
			}
		} else {
			nav.classList.remove("header__nav--indicator-ready");
			navIndicator.style.opacity = "0";
		}
	};

	syncHeaderIndicator();

	list?.querySelectorAll("a[href]").forEach((link) => {
		lifecycle.listen(link, "click", saveCurrentIndicator);
	});
	lifecycle.listen(window, "resize", syncHeaderIndicator);
	lifecycle.listen(document, "visibilitychange", () => {
		if (document.visibilityState === "visible") syncHeaderIndicator();
	});
};
