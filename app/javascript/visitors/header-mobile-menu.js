export const bindMobileMenu = ({ burger, nav, backdrop, lifecycle }) => {
	if (!burger || !nav || !backdrop) return;

	const dropdownToggle = nav.querySelector(".dropdown-toggle");
	const dropdownMenu = nav.querySelector(".dropdown");

	const closeDropdown = () => {
		dropdownMenu?.classList.remove("dropdown--open");
		dropdownToggle?.classList.remove("open");
		dropdownToggle?.setAttribute("aria-expanded", "false");
	};

	const closeMenu = () => {
		nav.classList.remove("open");
		burger.classList.remove("open");
		burger.setAttribute("aria-expanded", "false");
		backdrop.classList.remove("visible");
		document.body.classList.remove("nav-open");
		closeDropdown();
	};

	lifecycle.listen(burger, "click", () => {
		const isOpen = nav.classList.toggle("open");
		burger.classList.toggle("open", isOpen);
		burger.setAttribute("aria-expanded", String(isOpen));
		backdrop.classList.toggle("visible", isOpen);
		document.body.classList.toggle("nav-open", isOpen);
		if (!isOpen) closeDropdown();
	});

	lifecycle.listen(backdrop, "click", closeMenu);
	lifecycle.listen(document, "keydown", (event) => {
		if (event.key === "Escape") closeMenu();
	});

	nav.querySelectorAll("a[href]").forEach((link) => {
		lifecycle.listen(link, "click", () => {
			if (window.innerWidth <= 900) closeMenu();
		});
	});

	lifecycle.listen(dropdownToggle, "click", (event) => {
		if (window.innerWidth > 1279) return;
		event.preventDefault();
		const isOpen = dropdownMenu?.classList.toggle("dropdown--open");
		dropdownToggle.classList.toggle("open", Boolean(isOpen));
		dropdownToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
	});

	lifecycle.cleanup(closeMenu);
};
