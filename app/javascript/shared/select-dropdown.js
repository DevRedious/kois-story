(() => {
	let controller;
	let observer;
	let idSeed = 0;
	const selector = "select:not([multiple]):not([data-native-select])";

	const listen = (target, type, handler) => {
		target.addEventListener(type, handler, { signal: controller.signal });
	};
	const optionButtons = (menu) =>
		Array.from(menu.querySelectorAll(".ks-select__option:not(:disabled)"));
	const closeShell = (shell) => {
		const button = shell.querySelector(".ks-select__button");
		const menu = shell.querySelector(".ks-select__menu");
		shell.classList.remove("is-open");
		button?.setAttribute("aria-expanded", "false");
		if (menu) menu.hidden = true;
	};

	const closeAll = (except) => {
		document.querySelectorAll(".ks-select.is-open").forEach((shell) => {
			if (shell !== except) closeShell(shell);
		});
	};
	const shellClasses = (select) => {
		const classes = ["ks-select"];
		if (select.classList.contains("filter-select--desktop")) {
			classes.push("filter-select--desktop");
		}
		if (
			select.classList.contains("u-toolbar-select-wide") ||
			select.classList.contains("u-panel-select") ||
			select.classList.contains("product-select") ||
			select.classList.contains("order-tva-select") ||
			select.closest(".filter-bar")
		) {
			classes.push("ks-select--compact");
		}
		return classes.join(" ");
	};
	const selectLabel = (select) => {
		const label = select.labels?.[0]?.textContent?.trim();
		return label || select.getAttribute("aria-label") || "";
	};
	const sync = (select, shell, labelNode, menu) => {
		const selected = select.selectedOptions[0] || select.options[0];
		const selectedText = selected?.textContent?.trim() || "";
		labelNode.textContent = selectedText;
		shell.classList.toggle("has-value", Boolean(select.value));
		shell.classList.toggle("is-disabled", select.disabled);
		shell.querySelector(".ks-select__button").disabled = select.disabled;
		shell.querySelector(".ks-select__button").setAttribute(
			"aria-label",
			selectLabel(select) ? `${selectLabel(select)} : ${selectedText}` : selectedText,
		);
		menu.querySelectorAll(".ks-select__option").forEach((item) => {
			const selectedItem = Number(item.dataset.index) === select.selectedIndex;
			item.classList.toggle("is-selected", selectedItem);
			item.setAttribute("aria-selected", String(selectedItem));
		});
	};
	const focusNext = (menu, direction) => {
		const items = optionButtons(menu);
		const index = Math.max(0, items.indexOf(document.activeElement));
		const next = (index + direction + items.length) % items.length;
		items[next]?.focus();
	};
	const enhance = (select) => {
		if (select.dataset.selectEnhanced === "true" || select.size > 1) return;

		const shell = document.createElement("div");
		const menuId = `ks-select-menu-${++idSeed}`;
		shell.className = shellClasses(select);
		shell.dataset.selectFor = select.id || select.name || menuId;

		const button = document.createElement("button");
		button.type = "button";
		button.className = "ks-select__button";
		button.setAttribute("aria-haspopup", "listbox");
		button.setAttribute("aria-expanded", "false");
		button.setAttribute("aria-controls", menuId);

		const labelNode = document.createElement("span");
		labelNode.className = "ks-select__label";
		const icon = document.createElement("span");
		icon.className = "ks-select__icon";
		icon.setAttribute("aria-hidden", "true");
		button.append(labelNode, icon);

		const menu = document.createElement("div");
		menu.id = menuId;
		menu.className = "ks-select__menu";
		menu.setAttribute("role", "listbox");
		menu.hidden = true;

		Array.from(select.options).forEach((option, index) => {
			const item = document.createElement("button");
			item.type = "button";
			item.className = "ks-select__option";
			item.dataset.index = String(index);
			item.disabled = option.disabled;
			item.setAttribute("role", "option");
			item.textContent = option.textContent;
			listen(item, "click", () => {
				select.selectedIndex = index;
				select.dispatchEvent(new Event("input", { bubbles: true }));
				select.dispatchEvent(new Event("change", { bubbles: true }));
				sync(select, shell, labelNode, menu);
				closeShell(shell);
				button.focus();
			});
			menu.appendChild(item);
		});

		shell.append(button, menu);
		select.after(shell);
		select.dataset.selectEnhanced = "true";
		select.dataset.previousTabindex = select.getAttribute("tabindex") || "";
		select.tabIndex = -1;
		select.setAttribute("aria-hidden", "true");
		select.classList.add("select-native-hidden");

		listen(button, "click", () => {
			const wasOpen = shell.classList.contains("is-open");
			closeAll(shell);
			shell.classList.toggle("is-open", !wasOpen);
			button.setAttribute("aria-expanded", String(!wasOpen));
			menu.hidden = wasOpen;
			if (!wasOpen) {
				const selectedItem = menu.querySelector(".ks-select__option.is-selected");
				(selectedItem || optionButtons(menu)[0])?.focus();
			}
		});

		listen(button, "keydown", (event) => {
			if (!["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) return;
			event.preventDefault();
			button.click();
		});

		listen(menu, "keydown", (event) => {
			if (event.key === "Escape" || event.key === "Tab") {
				closeShell(shell);
				if (event.key === "Escape") button.focus();
				return;
			}
			if (event.key === "ArrowDown" || event.key === "ArrowUp") {
				event.preventDefault();
				focusNext(menu, event.key === "ArrowDown" ? 1 : -1);
			}
		});

		listen(select, "change", () => sync(select, shell, labelNode, menu));
		sync(select, shell, labelNode, menu);
	};
	const enhanceAll = (root = document) => {
		root.querySelectorAll?.(selector).forEach(enhance);
	};
	const cleanup = () => {
		observer?.disconnect();
		document.querySelectorAll(".ks-select").forEach((shell) => shell.remove());
		document.querySelectorAll("select[data-select-enhanced='true']").forEach((select) => {
			select.classList.remove("select-native-hidden");
			select.removeAttribute("aria-hidden");
			const previous = select.dataset.previousTabindex;
			if (previous) select.setAttribute("tabindex", previous);
			else select.removeAttribute("tabindex");
			delete select.dataset.previousTabindex;
			delete select.dataset.selectEnhanced;
		});
		controller?.abort();
	};

	const init = () => {
		cleanup();
		controller = new AbortController();
		enhanceAll();
		listen(document, "click", (event) => {
			if (!event.target.closest(".ks-select")) closeAll();
		});
		observer = new MutationObserver((records) => {
			records.forEach((record) => {
				record.addedNodes.forEach((node) => {
					if (node.nodeType !== Node.ELEMENT_NODE) return;
					if (node.matches?.(selector)) enhance(node);
					enhanceAll(node);
				});
			});
		});
		observer.observe(document.body, { childList: true, subtree: true });
	};

	document.addEventListener("turbo:load", init);
	document.addEventListener("turbo:before-cache", cleanup);
})();
