/**
 * header.js  Koi's Story V3
 * Header scroll state, nav indicators, mobile menu, and footer hover indicator.
 */
(() => {
	const moveIndicator = (container, indicator, element) => {
		if (!container || !indicator || !element) return;

		const containerRect = container.getBoundingClientRect();
		const elementRect = element.getBoundingClientRect();
		indicator.style.left = `${elementRect.left - containerRect.left}px`;
		indicator.style.width = `${elementRect.width}px`;
		indicator.style.opacity = "1";
	};

	document.addEventListener("turbo:load", () => {
		const header = document.getElementById("site-header");
		if (!header) return;

		const hero =
			document.getElementById("hero") ||
			document.querySelector(".hero") ||
			document.querySelector("[data-scroll-trigger]");
		const filterBar = document.querySelector(".filter-bar");
		const filterInner = document.querySelector(".filter-bar__inner");
		const logo = document.getElementById("site-logo");
		const pill = header.querySelector(".header__pill");
		const nav = document.getElementById("header-nav");
		const navIndicator = document.getElementById("nav-indicator");
		const burger = document.getElementById("burger");
		const backdrop = document.getElementById("nav-backdrop");
		const footerLinks = document.getElementById("footer-links");
		const footerIndicator = document.getElementById("footer-indicator");

		const applyNavOffset = () => {
			if (!filterInner || !pill) return;
			const pillWidth = pill.offsetWidth;
			const spacing =
				parseInt(
					getComputedStyle(document.documentElement).getPropertyValue("--sp-8"),
					10,
				) || 32;
			filterInner.style.paddingRight = `${pillWidth + spacing * 2}px`;
		};

		const removeNavOffset = () => {
			if (!filterInner) return;
			filterInner.style.paddingRight = "";
		};

		const bindHeaderNav = () => {
			if (!nav) return;

			const list = nav.querySelector("ul");
			const currentPath = window.location.pathname;
			const currentPage = currentPath.split("/").filter(Boolean).pop() || "";

			nav.querySelectorAll("a[href]").forEach((link) => {
				if (link.closest(".dropdown")) return;
				const href = link.getAttribute("href");
				if (!href || href === "#" || href.startsWith("http")) return;

				const isCurrent =
					href === currentPath ||
					(currentPath === "/" && href === "/") ||
					(currentPath.startsWith("/kois/") && href === "/kois") ||
					(currentPage && href.endsWith(`/${currentPage}`));

				if (isCurrent) link.classList.add("active");
			});

			const activeLink = nav.querySelector("ul > li > a.active");
			if (navIndicator && activeLink) {
				moveIndicator(nav, navIndicator, activeLink);
			}

			list?.querySelectorAll(":scope > li").forEach((item) => {
				const hoverTarget =
					item.querySelector(".dropdown-toggle") ??
					item.querySelector("a") ??
					item;
				item.addEventListener("mouseenter", () =>
					moveIndicator(nav, navIndicator, hoverTarget),
				);
			});

			list?.addEventListener("mouseleave", () => {
				if (activeLink) moveIndicator(nav, navIndicator, activeLink);
				else if (navIndicator) navIndicator.style.opacity = "0";
			});
		};

		const bindMobileMenu = () => {
			if (!burger || !nav || !backdrop) return;

			const dropdownToggle = nav.querySelector(".dropdown-toggle");
			const dropdownMenu = nav.querySelector(".dropdown");

			const closeMenu = () => {
				nav.classList.remove("open");
				burger.classList.remove("open");
				burger.setAttribute("aria-expanded", "false");
				backdrop.classList.remove("visible");
				document.body.classList.remove("nav-open");
				dropdownMenu?.classList.remove("dropdown--open");
				dropdownToggle?.classList.remove("open");
				dropdownToggle?.setAttribute("aria-expanded", "false");
			};

			burger.addEventListener("click", () => {
				const isOpen = nav.classList.toggle("open");
				burger.classList.toggle("open", isOpen);
				burger.setAttribute("aria-expanded", String(isOpen));
				backdrop.classList.toggle("visible", isOpen);
				document.body.classList.toggle("nav-open", isOpen);
				if (!isOpen) {
					dropdownMenu?.classList.remove("dropdown--open");
					dropdownToggle?.classList.remove("open");
					dropdownToggle?.setAttribute("aria-expanded", "false");
				}
			});

			backdrop.addEventListener("click", closeMenu);
			document.addEventListener("keydown", (event) => {
				if (event.key === "Escape") closeMenu();
			});

			nav.querySelectorAll("a[href]").forEach((link) => {
				link.addEventListener("click", () => {
					if (window.innerWidth <= 900) closeMenu();
				});
			});

			dropdownToggle?.addEventListener("click", (event) => {
				if (window.innerWidth > 900) return;
				event.preventDefault();
				const isOpen = dropdownMenu?.classList.toggle("dropdown--open");
				dropdownToggle.classList.toggle("open", isOpen);
				dropdownToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
			});
		};

		const bindFooterIndicator = () => {
			if (!footerLinks || !footerIndicator) return;

			Array.from(
				footerLinks.querySelectorAll(
					":scope > a, :scope > .footer__legal-menu > .footer__legal-toggle",
				),
			).forEach((item) => {
				item.addEventListener("mouseenter", () =>
					moveIndicator(footerLinks, footerIndicator, item),
				);
				item.addEventListener("focus", () =>
					moveIndicator(footerLinks, footerIndicator, item),
				);
			});

			footerLinks.addEventListener("mouseleave", () => {
				footerIndicator.style.opacity = "0";
			});
		};

		bindHeaderNav();
		bindMobileMenu();
		bindFooterIndicator();

		if (hero) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							header.classList.remove("site-header--scrolled");
							if (filterBar) {
								header.classList.remove("site-header--on-filter");
								removeNavOffset();
								logo?.classList.remove("site-logo--hidden");
							}
						} else {
							header.classList.add("site-header--scrolled");
							if (filterBar) {
								header.classList.add("site-header--on-filter");
								applyNavOffset();
								logo?.classList.add("site-logo--hidden");
							}
						}
					});
				},
				{ threshold: 0.1 },
			);

			observer.observe(hero);
		}
	});
})();
