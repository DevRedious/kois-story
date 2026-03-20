/**
 * Koi's Story — Messages
 * Filtre, ouverture modale lecture, marquer comme lu — messages.html
 * Requires: notifications.js, modal.js
 */

document.addEventListener("turbo:load", () => {
	// ── FILTRE ─────────────────────────────────────────────────────
	const filter = document.getElementById("msg-filter");
	if (filter) {
		filter.addEventListener("change", function () {
			const v = this.value;
			document.querySelectorAll("tbody .msg-row").forEach((r) => {
				r.style.display = !v || r.dataset.read === v ? "" : "none";
			});
		});
	}

	// ── OUVRIR MODAL MESSAGE ───────────────────────────────────────
	document.addEventListener("click", (e) => {
		const btn = e.target.closest("[data-open-msg]");
		if (!btn) return;
		e.preventDefault();
		const row = btn.closest("tr");
		if (!row) return;

		const sender = row.dataset.sender || "";
		const email = row.dataset.email || "";
		const date = row.dataset.date || "";
		const body = row.dataset.body || "";

		const titleEl = document.getElementById("modal-message-title");
		const senderEl = document.getElementById("modal-msg-sender");
		const emailEl = document.getElementById("modal-msg-email");
		const dateEl = document.getElementById("modal-msg-date");
		const bodyEl = document.getElementById("modal-msg-body");
		const replyEl = document.getElementById("modal-msg-reply");

		if (titleEl) titleEl.textContent = `Message de ${sender}`;
		if (senderEl) senderEl.textContent = sender;
		if (emailEl) {
			emailEl.textContent = email;
			emailEl.href = `mailto:${email}`;
		}
		if (dateEl) dateEl.textContent = date;
		if (bodyEl) bodyEl.textContent = body;
		if (replyEl) replyEl.href = `mailto:${email}`;

		if (row.classList.contains("unread")) markRowRead(row);
		window.AdminModal?.open("modal-message");
	});

	// ── TOUT MARQUER LU ────────────────────────────────────────────
	const markAllBtn = document.getElementById("mark-all-read");
	if (markAllBtn) {
		markAllBtn.addEventListener("click", () => {
			const unread = document.querySelectorAll(".msg-row.unread");
			if (!unread.length) {
				showNotification("Aucun message non lu", "info");
				return;
			}
			unread.forEach(markRowRead);
			showNotification(
				`${unread.length} message(s) marqué(s) comme lu(s)`,
				"success",
			);
		});
	}

	// ── HELPERS ────────────────────────────────────────────────────
	function markRowRead(row) {
		row.classList.remove("unread");
		row.dataset.read = "read";

		const badge = row.querySelector(".badge-nonlu");
		if (badge) {
			badge.className = "badge badge-lu";
			badge.textContent = "Lu";
		}

		const btn = row.querySelector("[data-open-msg]");
		if (btn) btn.className = "btn btn--outline btn--sm";

		const counter = document.getElementById("msg-count");
		if (counter) {
			const n = Math.max(0, parseInt(counter.textContent, 10) - 1);
			counter.textContent = n > 0 ? n : "";
			if (n <= 0) counter.style.display = "none";
		}

		const topbarCount = document.querySelector(".topbar-count");
		if (topbarCount) {
			const match = topbarCount.textContent.match(/\d+/);
			if (match) {
				const n = Math.max(0, parseInt(match[0], 10) - 1);
				topbarCount.textContent = n > 0 ? `${n} non lus` : "";
			}
		}
	}
});
