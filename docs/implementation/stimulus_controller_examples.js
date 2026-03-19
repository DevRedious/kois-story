/**
 * ============================================================
 * STIMULUS CONTROLLERS — Koi's Story
 * Migration JS → Stimulus (Hotwire)
 *
 * Usage : app/javascript/controllers/
 * Chaque fichier = un controller Stimulus
 * ============================================================
 *
 * SETUP (config/importmap.rb) :
 * pin_all_from "app/javascript/controllers", under: "controllers"
 *
 * SETUP (app/javascript/controllers/index.js) :
 * import { application } from "controllers/application"
 * import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
 * eagerLoadControllersFrom("controllers", application)
 * ============================================================
 */

// ============================================================
// 1. HEADER CONTROLLER
// Migration de : VISITORS/assets/js/header.js
// Fichier : app/javascript/controllers/header_controller.js
//
// Usage HTML :
// <header data-controller="header" data-header-scroll-threshold-value="80">
//   <nav data-header-target="nav">...</nav>
//   <button data-action="click->header#toggleMenu">☰</button>
//   <div data-header-target="dropdown">...</div>
// </header>
// ============================================================

import { Controller } from "@hotwired/stimulus";

export class HeaderController extends Controller {
	static targets = ["nav", "dropdown", "burger"];
	static values = { scrollThreshold: { type: Number, default: 80 } };

	connect() {
		this.scrolled = false;
		this._setupScrollObserver();
	}

	disconnect() {
		if (this.observer) this.observer.disconnect();
	}

	toggleMenu() {
		const isOpen = this.dropdownTarget.classList.contains("nav-dropdown--open");
		this.dropdownTarget.classList.toggle("nav-dropdown--open", !isOpen);
		this.burgerTarget.setAttribute("aria-expanded", String(!isOpen));
	}

	closeMenu() {
		this.dropdownTarget.classList.remove("nav-dropdown--open");
		this.burgerTarget.setAttribute("aria-expanded", "false");
	}

	_setupScrollObserver() {
		const hero = document.querySelector(".hero");

		if (hero) {
			this.observer = new IntersectionObserver(
				([entry]) => this._handleScrollState(!entry.isIntersecting),
				{ threshold: 0.1 },
			);
			this.observer.observe(hero);
		} else {
			// Fallback : écouter le scroll directement
			this._scrollHandler = () => {
				this._handleScrollState(window.scrollY > this.scrollThresholdValue);
			};
			window.addEventListener("scroll", this._scrollHandler, { passive: true });
		}
	}

	_handleScrollState(isScrolled) {
		this.element.classList.toggle("site-header--scrolled", isScrolled);
	}
}

// ============================================================
// 2. FILTER CONTROLLER
// Migration de : VISITORS/assets/js/filter.js
// Fichier : app/javascript/controllers/filter_controller.js
//
// Usage HTML :
// <div data-controller="filter">
//   <select data-action="change->filter#apply" id="filter-variety">...</select>
//   <select data-action="change->filter#apply" id="filter-age">...</select>
//   <input data-action="change->filter#apply" id="filter-price" type="number">
//   <input data-action="change->filter#apply" id="filter-konishi" type="checkbox">
//   <button data-action="click->filter#reset">Réinitialiser</button>
//   <p data-filter-target="count">12 koïs disponibles</p>
//   <ul data-filter-target="list">
//     <li><article class="koi-card" data-variety="Kohaku" data-age="tosai" ...>
//   </ul>
// </div>
//
// NOTE : En Rails avec Turbo, préférer filtres server-side
// (form GET + controller scope) plutôt que JS côté client.
// Ce controller convient pour un filtrage instantané sans rechargement.
// ============================================================

export class FilterController extends Controller {
	static targets = ["list", "count"];

	connect() {
		this.apply();
	}

	apply() {
		const variety = this.element.querySelector("#filter-variety")?.value || "";
		const age = this.element.querySelector("#filter-age")?.value || "";
		const priceMax = this.element.querySelector("#filter-price")?.value || "";
		const konishi =
			this.element.querySelector("#filter-konishi")?.checked || false;

		const cards = this.listTarget.querySelectorAll(".koi-card");
		let visible = 0;

		cards.forEach((card) => {
			const matchVariety = !variety || card.dataset.variety === variety;
			const matchAge = !age || card.dataset.age === age;
			const matchPrice =
				!priceMax ||
				parseFloat(card.dataset.price || 0) <= parseFloat(priceMax);
			const matchKonishi = !konishi || card.dataset.konishi === "true";

			const show = matchVariety && matchAge && matchPrice && matchKonishi;
			card.closest("li").hidden = !show;
			if (show) visible++;
		});

		this._updateCount(visible);
	}

	reset() {
		this.element
			.querySelectorAll("select, input[type='number']")
			.forEach((el) => {
				el.value = "";
			});
		this.element.querySelectorAll("input[type='checkbox']").forEach((el) => {
			el.checked = false;
		});
		this.apply();
	}

	_updateCount(count) {
		if (!this.hasCountTarget) return;
		const label = count <= 1 ? "koï disponible" : "koïs disponibles";
		this.countTarget.textContent = `${count} ${label}`;
	}
}

// ============================================================
// 3. GALLERY CONTROLLER
// Migration de : VISITORS/assets/js/gallery.js
// Fichier : app/javascript/controllers/gallery_controller.js
//
// Usage HTML :
// <div data-controller="gallery">
//   <div class="koi-detail__thumbs" data-gallery-target="thumbs">
//     <img src="koi1.jpg" alt="Vue 1" data-action="click->gallery#open" data-src="koi1-full.jpg">
//     <img src="koi2.jpg" alt="Vue 2" data-action="click->gallery#open" data-src="koi2-full.jpg">
//   </div>
//   <div class="gallery-overlay" data-gallery-target="overlay" hidden
//        data-action="click->gallery#close">
//     <img data-gallery-target="fullImage" alt="">
//     <button class="gallery-overlay__close" data-action="click->gallery#close"
//             aria-label="Fermer">✕</button>
//   </div>
// </div>
// ============================================================

export class GalleryController extends Controller {
	static targets = ["overlay", "fullImage", "thumbs"];

	connect() {
		// Écouter la touche Escape pour fermer
		this._keyHandler = (e) => {
			if (e.key === "Escape") this.close();
		};
		document.addEventListener("keydown", this._keyHandler);
	}

	disconnect() {
		document.removeEventListener("keydown", this._keyHandler);
	}

	open(event) {
		const img = event.currentTarget;
		const src = img.dataset.src || img.src;
		const alt = img.alt;

		this.fullImageTarget.src = src;
		this.fullImageTarget.alt = alt;
		this.overlayTarget.hidden = false;
		this.overlayTarget.classList.add("gallery-overlay--open");

		document.body.style.overflow = "hidden";
		this._trapFocus(this.overlayTarget);
	}

	close() {
		this.overlayTarget.hidden = true;
		this.overlayTarget.classList.remove("gallery-overlay--open");
		document.body.style.overflow = "";
		this.fullImageTarget.src = "";
	}

	_trapFocus(container) {
		const focusable = container.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		first?.focus();

		container.addEventListener("keydown", (e) => {
			if (e.key !== "Tab") return;
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		});
	}
}

// ============================================================
// 4. SIDEBAR CONTROLLER (Admin)
// Migration de : ADMIN/assets/js/admin.js (partie sidebar)
// Fichier : app/javascript/controllers/sidebar_controller.js
//
// Usage HTML :
// <body data-controller="sidebar">
//   <aside class="sidebar" data-sidebar-target="sidebar" id="sidebar">
//     ...
//   </aside>
//   <div class="overlay" data-sidebar-target="overlay"
//        data-action="click->sidebar#close"></div>
//   <button class="menu-burger"
//           data-action="click->sidebar#toggle"
//           data-sidebar-target="burger">☰</button>
// </body>
// ============================================================

export class SidebarController extends Controller {
	static targets = ["sidebar", "overlay", "burger"];

	toggle() {
		const isOpen = this.sidebarTarget.classList.contains("open");
		this.sidebarTarget.classList.toggle("open", !isOpen);
		this.overlayTarget.classList.toggle("active", !isOpen);
		this.burgerTarget.setAttribute("aria-expanded", String(!isOpen));
	}

	close() {
		this.sidebarTarget.classList.remove("open");
		this.overlayTarget.classList.remove("active");
		this.burgerTarget.setAttribute("aria-expanded", "false");
	}
}

// ============================================================
// 5. ORDER FORM CONTROLLER (Admin)
// Migration de : ADMIN/assets/js/order-form.js
// Fichier : app/javascript/controllers/order_form_controller.js
//
// Usage HTML :
// <div data-controller="order-form">
//   <table>
//     <tbody data-order-form-target="lines" id="order-lines">
//       <!-- Lignes injectées dynamiquement -->
//     </tbody>
//   </table>
//   <button type="button" data-action="click->order-form#addLine">+ Ajouter</button>
//   <span data-order-form-target="total">0,00 €</span>
// </div>
// ============================================================

export class OrderFormController extends Controller {
	static targets = ["lines", "total"];
	static values = { nextIndex: { type: Number, default: 0 } };

	addLine() {
		const index = this.nextIndexValue;
		const tr = this._createRow(index);
		this.linesTarget.appendChild(tr);
		this.nextIndexValue = index + 1;
	}

	removeLine(event) {
		event.currentTarget.closest("tr").remove();
		this._updateTotal();
	}

	updateRow(event) {
		const row = event.currentTarget.closest("tr");
		const qty = parseFloat(row.querySelector(".line-qty")?.value || 0);
		const price = parseFloat(row.querySelector(".line-price")?.value || 0);
		const total = qty * price;

		row.querySelector(".line-total").textContent =
			`${total.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €`;

		this._updateTotal();
	}

	_createRow(index) {
		const tr = document.createElement("tr");
		tr.innerHTML = `
      <td>
        <select class="line-select form-select"
                name="order[order_items_attributes][${index}][koi_id]"
                data-action="change->order-form#updateRow">
          <option value="">Choisir un produit...</option>
        </select>
      </td>
      <td>
        <input type="number" class="line-qty form-input"
               name="order[order_items_attributes][${index}][quantity]"
               value="1" min="1"
               data-action="input->order-form#updateRow">
      </td>
      <td>
        <input type="number" class="line-price form-input"
               name="order[order_items_attributes][${index}][unit_price]"
               step="0.01" placeholder="0.00"
               data-action="input->order-form#updateRow">
      </td>
      <td class="line-total">0,00 €</td>
      <td>
        <button type="button"
                class="btn btn-sm btn-danger"
                data-action="click->order-form#removeLine"
                aria-label="Supprimer cette ligne">
          ✕
        </button>
      </td>
    `;
		return tr;
	}

	_updateTotal() {
		const rows = this.linesTarget.querySelectorAll("tr");
		const total = Array.from(rows).reduce((sum, row) => {
			const qty = parseFloat(row.querySelector(".line-qty")?.value || 0);
			const price = parseFloat(row.querySelector(".line-price")?.value || 0);
			return sum + qty * price;
		}, 0);

		this.totalTarget.textContent = `${total.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €`;
	}
}

// ============================================================
// 6. ANIMATION CONTROLLER
// Migration de : VISITORS/assets/js/animations.js
// Fichier : app/javascript/controllers/animation_controller.js
//
// Usage HTML :
// <section data-controller="animation">
//   <div data-animate data-delay="0">...</div>
//   <div data-animate data-delay="100">...</div>
//   <div data-animate data-delay="200">...</div>
// </section>
// ============================================================

export class AnimationController extends Controller {
	connect() {
		this.observer = new IntersectionObserver(
			(entries) => this._handleEntries(entries),
			{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
		);

		this.element.querySelectorAll("[data-animate]").forEach((el) => {
			this.observer.observe(el);
		});
	}

	disconnect() {
		if (this.observer) this.observer.disconnect();
	}

	_handleEntries(entries) {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			const delay = entry.target.dataset.delay || 0;
			setTimeout(
				() => {
					entry.target.classList.add("is-visible");
				},
				parseInt(delay, 10),
			);

			this.observer.unobserve(entry.target);
		});
	}
}

// ============================================================
// 7. TABLE CONTROLLER (Admin search + sort)
// Migration de : ADMIN/assets/js/admin.js (partie table)
// Fichier : app/javascript/controllers/table_controller.js
//
// Usage HTML :
// <div data-controller="table">
//   <input type="search" placeholder="Rechercher..."
//          data-action="input->table#filter"
//          data-table-target="search">
//   <table>
//     <tbody data-table-target="body">
//       <tr>...</tr>
//     </tbody>
//   </table>
// </div>
// ============================================================

export class TableController extends Controller {
	static targets = ["body", "search"];

	filter() {
		const query = this.searchTarget.value.toLowerCase().trim();
		const rows = this.bodyTarget.querySelectorAll("tr");

		rows.forEach((row) => {
			const text = row.textContent.toLowerCase();
			row.hidden = query.length > 0 && !text.includes(query);
		});
	}
}

// ============================================================
// ENREGISTREMENT DE TOUS LES CONTROLLERS
// Fichier : app/javascript/controllers/index.js
// ============================================================

/*
import { application }       from "controllers/application"
import { HeaderController }  from "controllers/header_controller"
import { FilterController }  from "controllers/filter_controller"
import { GalleryController } from "controllers/gallery_controller"
import { SidebarController } from "controllers/sidebar_controller"
import { OrderFormController } from "controllers/order_form_controller"
import { AnimationController } from "controllers/animation_controller"
import { TableController }   from "controllers/table_controller"

application.register("header",     HeaderController)
application.register("filter",     FilterController)
application.register("gallery",    GalleryController)
application.register("sidebar",    SidebarController)
application.register("order-form", OrderFormController)
application.register("animation",  AnimationController)
application.register("table",      TableController)
*/
