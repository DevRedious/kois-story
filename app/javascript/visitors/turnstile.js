import { createLifecycle } from "visitors/header-utils";

let lifecycle;

const removeTurnstileWidget = (widget) => {
	const widgetId = widget.dataset.widgetId;
	if (window.turnstile && widgetId) {
		try {
			window.turnstile.remove(widgetId);
		} catch {
			// Turnstile may already have removed its iframe during a Turbo swap.
		}
	}
	delete widget.dataset.widgetId;
	delete widget.dataset.renderedSignature;
	widget.innerHTML = "";
};

const renderTurnstileWidgets = () => {
	if (!window.turnstile) return;

	document.querySelectorAll("[data-turnstile-widget]").forEach((widget) => {
		const shell = widget.closest("[data-turnstile-shell]");
		const width = shell?.clientWidth || widget.clientWidth || 300;
		const size = width < 300 ? "compact" : "flexible";
		const nextSignature = `${widget.dataset.sitekey}:${size}`;

		if (widget.dataset.renderedSignature === nextSignature) return;

		if (widget.dataset.widgetId) removeTurnstileWidget(widget);
		widget.dataset.widgetId = window.turnstile.render(widget, {
			sitekey: widget.dataset.sitekey,
			theme: widget.dataset.theme || "light",
			size,
		});
		widget.dataset.renderedSignature = nextSignature;
	});
};

const bindTurnstile = () => {
	lifecycle?.destroy();
	lifecycle = createLifecycle();
	const sync = () => window.requestAnimationFrame(renderTurnstileWidgets);
	sync();
	lifecycle.listen(window, "resize", sync);
};

document.addEventListener("turbo:load", bindTurnstile);
document.addEventListener("turbo:before-cache", () => {
	document.querySelectorAll("[data-turnstile-widget]").forEach((widget) => {
		removeTurnstileWidget(widget);
	});
	lifecycle?.destroy();
	lifecycle = undefined;
});
