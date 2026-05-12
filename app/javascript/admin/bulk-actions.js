document.addEventListener("turbo:load", () => {
	document.querySelectorAll("[data-bulk-form]").forEach((form) => {
		if (form.dataset.bound === "true") return;
		form.dataset.bound = "true";

		const formId = form.id;
		const master = document.querySelector(`[data-bulk-toggle='${formId}']`);
		const items = () =>
			document.querySelectorAll(`[data-bulk-item][form='${formId}']`);
		const action = form.querySelector("[data-bulk-action]");
		const submit = form.querySelector("[data-bulk-submit]");

		const refresh = () => {
			const checkboxes = Array.from(items());
			const checked = checkboxes.filter((item) => item.checked);
			if (master) {
				master.checked =
					checked.length > 0 && checked.length === checkboxes.length;
				master.indeterminate =
					checked.length > 0 && checked.length < checkboxes.length;
			}
			if (submit) submit.disabled = checked.length === 0 || !action?.value;
		};

		master?.addEventListener("change", () => {
			items().forEach((item) => {
				item.checked = master.checked;
			});
			refresh();
		});

		items().forEach((item) => {
			item.addEventListener("change", refresh);
		});

		action?.addEventListener("change", refresh);
		refresh();
	});
});
