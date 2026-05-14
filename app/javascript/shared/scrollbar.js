(() => {
	let controller;
	let frame;
	let thumb;
	let dragging = false;
	let dragStartY = 0;
	let dragStartScroll = 0;

	const root = document.documentElement;

	const maxScroll = () =>
		Math.max(0, root.scrollHeight - window.innerHeight);

	const update = () => {
		frame = undefined;
		if (!thumb) return;

		const max = maxScroll();
		const active = max > 4;
		root.classList.toggle("ks-custom-scrollbar-ready", active);
		if (!active) return;

		const viewport = window.innerHeight;
		const height = Math.max(42, Math.round((viewport / root.scrollHeight) * viewport));
		const top = Math.round((window.scrollY / max) * (viewport - height));

		thumb.style.setProperty("--ks-scrollbar-height", `${height}px`);
		thumb.style.setProperty("--ks-scrollbar-top", `${top}px`);
	};

	const scheduleUpdate = () => {
		if (frame) return;
		frame = window.requestAnimationFrame(update);
	};

	const dragTo = (clientY) => {
		const max = maxScroll();
		const available = Math.max(1, window.innerHeight - thumb.offsetHeight);
		const delta = clientY - dragStartY;
		window.scrollTo(0, dragStartScroll + (delta / available) * max);
	};

	const stopDrag = () => {
		if (!dragging) return;
		dragging = false;
		root.classList.remove("ks-custom-scrollbar-dragging");
	};

	const startDrag = (event) => {
		if (event.button !== 0) return;
		event.preventDefault();
		dragging = true;
		dragStartY = event.clientY;
		dragStartScroll = window.scrollY;
		root.classList.add("ks-custom-scrollbar-dragging");
		thumb.setPointerCapture?.(event.pointerId);
	};

	const init = () => {
		cleanup();
		controller = new AbortController();
		root.classList.add("ks-custom-scrollbar");

		thumb = document.createElement("div");
		thumb.className = "ks-scrollbar-thumb";
		thumb.setAttribute("aria-hidden", "true");
		document.body.appendChild(thumb);

		const signal = controller.signal;
		window.addEventListener("scroll", scheduleUpdate, { passive: true, signal });
		window.addEventListener("resize", scheduleUpdate, { signal });
		thumb.addEventListener("pointerdown", startDrag, { signal });
		window.addEventListener(
			"pointermove",
			(event) => {
				if (dragging) dragTo(event.clientY);
			},
			{ signal },
		);
		window.addEventListener("pointerup", stopDrag, { signal });
		window.addEventListener("pointercancel", stopDrag, { signal });
		scheduleUpdate();
	};

	function cleanup() {
		controller?.abort();
		if (frame) window.cancelAnimationFrame(frame);
		frame = undefined;
		dragging = false;
		thumb?.remove();
		thumb = undefined;
		root.classList.remove(
			"ks-custom-scrollbar",
			"ks-custom-scrollbar-ready",
			"ks-custom-scrollbar-dragging",
		);
	}

	document.addEventListener("turbo:load", init);
	document.addEventListener("turbo:before-cache", cleanup);
})();
