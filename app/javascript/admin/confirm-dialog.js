(() => {
	let activeDialog;

	const template = () => {
		const overlay = document.createElement("div");
		overlay.className = "modal-overlay modal-overlay--open";
		overlay.dataset.adminConfirm = "true";
		overlay.innerHTML = `
      <div class="modal modal--sm" role="dialog" aria-modal="true" aria-labelledby="admin-confirm-title">
        <div class="modal-header">
          <h2 class="modal-title" id="admin-confirm-title">Confirmation</h2>
          <button type="button" class="modal-close" data-confirm-cancel aria-label="Fermer">×</button>
        </div>
        <div class="modal-body">
          <div class="modal-confirm-icon" aria-hidden="true">!</div>
          <p class="modal-confirm-text" data-confirm-message></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn--outline" data-confirm-cancel>Annuler</button>
          <button type="button" class="btn btn--danger" data-confirm-accept>Confirmer</button>
        </div>
      </div>`;
		return overlay;
	};

	const closeDialog = (dialog, result, resolve, previousFocus) => {
		dialog.remove();
		activeDialog = null;
		document.body.style.overflow = "";
		previousFocus?.focus?.();
		resolve(result);
	};

	const confirmDialog = (message) =>
		new Promise((resolve) => {
			activeDialog?.remove();
			const previousFocus = document.activeElement;
			const dialog = template();
			activeDialog = dialog;
			dialog.querySelector("[data-confirm-message]").textContent = message;
			document.body.appendChild(dialog);
			document.body.style.overflow = "hidden";
			dialog.querySelector("[data-confirm-cancel]")?.focus();

			const finish = (result) => closeDialog(dialog, result, resolve, previousFocus);

			dialog.addEventListener("click", (event) => {
				if (
					event.target === dialog ||
					event.target.closest("[data-confirm-cancel]")
				) {
					finish(false);
				}
				if (event.target.closest("[data-confirm-accept]")) finish(true);
			});

			dialog.addEventListener("keydown", (event) => {
				if (event.key === "Escape") finish(false);
			});
		});

	const install = () => {
		window.AdminConfirm = confirmDialog;
		window.Turbo?.setConfirmMethod?.(confirmDialog);
	};

	document.addEventListener("turbo:load", install);
	install();
})();
