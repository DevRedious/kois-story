export const createLifecycle = () => {
	const controller = new AbortController();
	const cleanups = [];

	return {
		signal: controller.signal,
		listen(target, type, handler, options = {}) {
			if (!target?.addEventListener) return;
			target.addEventListener(type, handler, {
				...options,
				signal: controller.signal,
			});
		},
		cleanup(callback) {
			if (typeof callback === "function") cleanups.push(callback);
		},
		destroy() {
			controller.abort();
			cleanups.splice(0).forEach((callback) => callback());
		},
	};
};

export const moveIndicator = (container, indicator, element) => {
	if (!container || !indicator || !element) return;

	const containerRect = container.getBoundingClientRect();
	const elementRect = element.getBoundingClientRect();
	indicator.style.left = `${elementRect.left - containerRect.left}px`;
	indicator.style.width = `${elementRect.width}px`;
	indicator.style.opacity = "1";
};

export const findHeroTrigger = () =>
	document.getElementById("hero") ||
	document.querySelector(".hero") ||
	document.querySelector("[data-scroll-trigger]");

export const applyScrolledState = (
	{ header, logo, partner, filterBar, filterInner },
	isScrolled,
) => {
	header.classList.toggle("site-header--scrolled", isScrolled);
	logo?.classList.toggle("site-logo--hidden", isScrolled);
	partner?.classList.toggle("site-partner--shifted", isScrolled);

	if (!filterBar) return;
	header.classList.toggle("site-header--on-filter", isScrolled);
	if (filterInner) filterInner.style.paddingRight = "";
};
