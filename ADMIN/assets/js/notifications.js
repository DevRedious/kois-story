/**
 * Koi's Story — Admin Notifications
 * Toast system — doit être chargé avant admin.js
 */

if (!document.getElementById("admin-notification-styles")) {
	const style = document.createElement("style");
	style.id = "admin-notification-styles";
	style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(110%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0);    opacity: 1; }
      to   { transform: translateX(110%); opacity: 0; }
    }
    .admin-notification {
      position: fixed; top: 80px; right: 20px;
      padding: 12px 16px; border-radius: 8px;
      font-size: 0.9rem; font-weight: 500;
      z-index: 9999; display: flex; align-items: center; gap: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease;
    }
    .admin-notification.success { background: #d4f0e0; color: #1a6e3e; border: 1px solid #2D9E5A; }
    .admin-notification.error   { background: #fde8e8; color: #e60000; border: 1px solid #e60000; }
    .admin-notification.info    { background: #f5f5f2; color: #000000; border: 1px solid #630f0f; }
    .admin-notification-close {
      background: none; border: none; cursor: pointer;
      font-size: 16px; line-height: 1; padding: 0; margin-left: 4px;
    }
  `;
	document.head.appendChild(style);
}

function _showNotification(message, type = "success") {
	document.querySelectorAll(".admin-notification").forEach((n) => {
		n.remove();
	});

	const notification = document.createElement("div");
	notification.className = `admin-notification ${type}`;

	const closeBtn = document.createElement("button");
	closeBtn.className = "admin-notification-close";
	closeBtn.setAttribute("aria-label", "Fermer");
	closeBtn.textContent = "✕";
	closeBtn.addEventListener("click", () => notification.remove());

	notification.append(document.createTextNode(message), closeBtn);
	document.body.appendChild(notification);

	setTimeout(() => {
		notification.style.animation = "slideOutRight 0.3s ease forwards";
		setTimeout(() => notification.remove(), 300);
	}, 4000);
}
