import { moveIndicator } from "visitors/header-utils";

export const bindFooterIndicator = ({
	footerLinks,
	footerIndicator,
	lifecycle,
}) => {
	if (!footerLinks || !footerIndicator) return;

	const items = footerLinks.querySelectorAll(
		":scope > a, :scope > .footer__legal-menu > .footer__legal-toggle",
	);

	items.forEach((item) => {
		lifecycle.listen(item, "mouseenter", () =>
			moveIndicator(footerLinks, footerIndicator, item),
		);
		lifecycle.listen(item, "focus", () =>
			moveIndicator(footerLinks, footerIndicator, item),
		);
	});

	lifecycle.listen(footerLinks, "mouseleave", () => {
		footerIndicator.style.opacity = "0";
	});
};
