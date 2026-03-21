/**
 * Applique le thème sauvegardé avant le premier rendu (évite le flash).
 * Charger en <head> sans defer/async. Valeur par défaut : system.
 */
(() => {
	var saved = localStorage.getItem("admin-theme") || "system";
	if (saved === "system") {
		document.documentElement.removeAttribute("data-theme");
	} else {
		document.documentElement.setAttribute("data-theme", saved);
	}
})();
