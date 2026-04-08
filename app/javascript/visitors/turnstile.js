const renderTurnstileWidgets = () => {
	if (!window.turnstile) return;

	document.querySelectorAll("[data-turnstile-widget]").forEach((widget) => {
		const shell = widget.closest("[data-turnstile-shell]");
		const width = shell?.clientWidth || widget.clientWidth || 300;
		const size = width < 300 ? "compact" : "flexible";
		const nextSignature = `${widget.dataset.sitekey}:${size}`;

		if (widget.dataset.renderedSignature === nextSignature) return;

		widget.innerHTML = "";
		window.turnstile.render(widget, {
			sitekey: widget.dataset.sitekey,
			theme: widget.dataset.theme || "light",
			size,
		});
		widget.dataset.renderedSignature = nextSignature;
	});
};

const bindTurnstile = () => {
	if (document.body.dataset.turnstileBound === "true") {
		renderTurnstileWidgets();
		return;
	}
	document.body.dataset.turnstileBound = "true";

	const sync = () => window.requestAnimationFrame(renderTurnstileWidgets);
	sync();
	window.addEventListener("resize", sync);
};

document.addEventListener("turbo:load", bindTurnstile);
