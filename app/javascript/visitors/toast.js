/**
 * toast.js — Koi's Story
 * Auto-dismiss flash toasts with close button support.
 */
(() => {
	const DISMISS_DELAY = 4000;

	const dismissToast = (toast) => {
		toast.classList.add("toast--leaving");
		toast.addEventListener("animationend", () => toast.remove(), { once: true });
	};

	document.addEventListener("turbo:load", () => {
		document.querySelectorAll("[data-toast]").forEach((toast) => {
			const closeBtn = toast.querySelector("[data-toast-close]");
			const timer = setTimeout(() => dismissToast(toast), DISMISS_DELAY);

			closeBtn?.addEventListener("click", () => {
				clearTimeout(timer);
				dismissToast(toast);
			});
		});
	});
})();
