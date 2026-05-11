import { moveIndicator } from "visitors/header-utils";

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
	const syncHeaderIndicator = () => {
		if (!navIndicator) return;
		if (window.innerWidth <= 1279) {
			nav.classList.remove("header__nav--indicator-ready");
			navIndicator.style.opacity = "0";
			return;
		}
		if (activeLink) {
			nav.classList.add("header__nav--indicator-ready");
			moveIndicator(nav, navIndicator, activeLink);
		} else {
			nav.classList.remove("header__nav--indicator-ready");
			navIndicator.style.opacity = "0";
		}
	};

	syncHeaderIndicator();

	list?.querySelectorAll(":scope > li").forEach((item) => {
		const hoverTarget =
			item.querySelector(".dropdown-toggle") ?? item.querySelector("a") ?? item;
		lifecycle.listen(item, "mouseenter", () => {
			if (window.innerWidth > 1279) moveIndicator(nav, navIndicator, hoverTarget);
		});
	});

	lifecycle.listen(list, "mouseleave", () => {
		if (activeLink) moveIndicator(nav, navIndicator, activeLink);
		else if (navIndicator) navIndicator.style.opacity = "0";
	});
	lifecycle.listen(window, "resize", syncHeaderIndicator);
	lifecycle.listen(document, "visibilitychange", () => {
		if (document.visibilityState === "visible") syncHeaderIndicator();
	});
};
