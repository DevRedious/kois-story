/**
 * Koi's Story — Admin Global
 * Comportements partagés par toutes les pages admin.
 * Requires: notifications.js (chargé avant ce fichier)
 */

document.addEventListener("turbo:load", () => {
	var themeSelect = document.querySelector(".theme-switcher select");
	if (themeSelect) {
		const current = localStorage.getItem("admin-theme") || "system";
		themeSelect.value = current;
		themeSelect.addEventListener("change", function () {
			var v = this.value;
			localStorage.setItem("admin-theme", v);
			if (v === "system") {
				document.documentElement.removeAttribute("data-theme");
			} else {
				document.documentElement.setAttribute("data-theme", v);
			}
		});
	}

	const menuBurger = document.querySelector(".menu-burger");
	const sidebar = document.querySelector(".sidebar");
	const overlay = document.querySelector(".overlay");

	if (menuBurger) {
		menuBurger.addEventListener("click", function () {
			sidebar?.classList.toggle("open");
			overlay?.classList.toggle("active");
			const svg = this.querySelector("svg");
			if (svg?.classList.contains("burger-icon")) {
				const isOpen = sidebar?.classList.contains("open");
				svg.innerHTML = isOpen
					? '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
					: '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
			}
		});
	}

	overlay?.addEventListener("click", function () {
		sidebar?.classList.remove("open");
		this.classList.remove("active");
	});

	document.addEventListener("click", (e) => {
		const logoutButton = e.target.closest(".logout-btn");
		if (!logoutButton) return;

		e.preventDefault();
		if (!confirm("Voulez-vous vraiment vous déconnecter ?")) return;

		const logoutForm = logoutButton.closest("form");
		if (logoutForm) {
			logoutForm.requestSubmit();
			return;
		}

		window.location.href = "/users/sign_in";
	});

	let formModified = false;
	document.querySelectorAll("form").forEach((form) => {
		form.addEventListener("change", () => {
			formModified = true;
		});
		form.addEventListener("submit", () => {
			formModified = false;
		});
	});
	window.addEventListener("beforeunload", (e) => {
		if (formModified) {
			e.preventDefault();
			e.returnValue = "";
		}
	});
});
