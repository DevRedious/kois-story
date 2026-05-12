document.addEventListener("turbo:load", () => {
	const form = document.querySelector("[data-contact-form]");
	if (!form || form.dataset.bound === "true") return;
	form.dataset.bound = "true";

	form.addEventListener("submit", (event) => {
		const submitButton = form.querySelector(
			'input[type="submit"], button[type="submit"]',
		);
		if (!submitButton || !form.reportValidity()) return;

		if (submitButton.dataset.submitting === "true") {
			event.preventDefault();
			return;
		}

		submitButton.dataset.submitting = "true";
		submitButton.dataset.originalValue =
			submitButton.value || submitButton.textContent || "";
		if (submitButton.tagName === "INPUT") {
			submitButton.value =
				submitButton.dataset.loadingLabel || "Envoi en cours...";
		} else {
			submitButton.textContent =
				submitButton.dataset.loadingLabel || "Envoi en cours...";
		}
		submitButton.disabled = true;
		form.classList.add("contact-form--submitting");
	});
});
