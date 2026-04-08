const fitTurnstile = () => {
	document.querySelectorAll("[data-turnstile-shell]").forEach((shell) => {
		const widget = shell.querySelector(".cf-turnstile");
		const frame = shell.querySelector("iframe");
		if (!widget || !frame) return;

		const availableWidth =
			shell.parentElement?.clientWidth || shell.clientWidth;
		const widgetWidth = frame.offsetWidth || widget.offsetWidth || 300;
		const scale =
			widgetWidth > availableWidth ? availableWidth / widgetWidth : 1;

		widget.style.transform = `scale(${scale})`;
		widget.style.transformOrigin = "left top";
		shell.style.height = `${Math.ceil((frame.offsetHeight || 65) * scale)}px`;
	});
};

const bindTurnstileFit = () => {
	if (document.body.dataset.turnstileBound === "true") return;
	document.body.dataset.turnstileBound = "true";

	const sync = () => window.requestAnimationFrame(fitTurnstile);
	sync();
	window.addEventListener("resize", sync);

	const observer = new MutationObserver(sync);
	observer.observe(document.body, { childList: true, subtree: true });
};

document.addEventListener("turbo:load", bindTurnstileFit);
