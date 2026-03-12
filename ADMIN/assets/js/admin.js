/**
 * Koi's Story - Admin JavaScript
 * Fonctionnalités interactives pour l'espace administration
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // SIDEBAR MOBILE TOGGLE
  // ==========================================
  const menuBurger = document.querySelector('.menu-burger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');
  
  if (menuBurger && sidebar) {
    menuBurger.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
      
      // Change l'icône du bouton
      const isOpen = sidebar.classList.contains('open');
      const svg = this.querySelector('svg');
      if (svg) {
        if (isOpen) {
          // Icône X
          svg.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
        } else {
          // Icône menu
          svg.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
        }
      }
    });
  }
  
  // Fermer la sidebar en cliquant sur l'overlay
  if (overlay) {
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      this.classList.remove('active');
      
      // Reset icône bouton
      if (menuBurger) {
        const svg = menuBurger.querySelector('svg');
        if (svg) {
          svg.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
        }
      }
    });
  }
  
  // Fermer la sidebar en cliquant sur un lien (mobile)
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        
        // Reset icône bouton
        if (menuBurger) {
          const svg = menuBurger.querySelector('svg');
          if (svg) {
            svg.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
          }
        }
      }
    });
  });

  // ==========================================
  // DÉCONNEXION
  // ==========================================
  const logoutBtn = document.querySelector('.btn-outline');
  if (logoutBtn && logoutBtn.textContent.includes('Déconnexion')) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        showNotification('Déconnexion réussie', 'success');
        // Redirection vers la page de connexion (simulation)
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      }
    });
  }

  // ==========================================
  // ACTIONS SUR LES KOÏS
  // ==========================================
  
  // Bouton "Nouveau koï"
  const newKoiBtns = document.querySelectorAll('.btn-primary');
  newKoiBtns.forEach(btn => {
    if (btn.textContent.includes('Nouveau koï') || btn.textContent.includes('＋')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Redirection vers le formulaire d\'ajout...', 'info');
        // Simulation - à remplacer par vraie navigation
        setTimeout(() => {
          window.location.href = 'kois.html';
        }, 500);
      });
    }
  });
  
  // Boutons d'action sur les lignes (Éditer, Supprimer, Voir)
  const actionBtns = document.querySelectorAll('.btn');
  actionBtns.forEach(btn => {
    const text = btn.textContent.trim();
    
    if (text === 'Éditer') {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showNotification('Ouverture du formulaire d\'édition...', 'info');
      });
    }
    
    if (text === 'Supprimer') {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('Êtes-vous sûr de vouloir supprimer ce koï ?')) {
          showNotification('Koï supprimé avec succès', 'success');
          // Animation de suppression
          const row = this.closest('tr');
          if (row) {
            row.style.transition = 'opacity 0.3s ease';
            row.style.opacity = '0';
            setTimeout(() => row.remove(), 300);
          }
        }
      });
    }
    
    if (text === 'Voir') {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showNotification('Ouverture de la fiche produit...', 'info');
      });
    }
  });

  // ==========================================
  // RECHERCHE
  // ==========================================
  const searchInputs = document.querySelectorAll('.filter-search, input[type="search"]');
  searchInputs.forEach(input => {
    input.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      const rows = document.querySelectorAll('tbody tr');
      
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // FILTRES
  // ==========================================
  const filterSelects = document.querySelectorAll('.filter-select');
  filterSelects.forEach(select => {
    select.addEventListener('change', function() {
      showNotification('Filtre appliqué : ' + this.value, 'info');
      // Simulation de filtrage
    });
  });

  // ==========================================
  // MESSAGES - MARQUER COMME LU
  // ==========================================
  const messageRows = document.querySelectorAll('.msg-row');
  messageRows.forEach(row => {
    row.addEventListener('click', function() {
      if (this.classList.contains('unread')) {
        this.classList.remove('unread');
        const badge = document.querySelector('.nav-badge');
        if (badge) {
          const count = parseInt(badge.textContent) - 1;
          badge.textContent = count > 0 ? count : '';
          if (count <= 0) badge.style.display = 'none';
        }
        showNotification('Message marqué comme lu', 'success');
      }
    });
  });

  // ==========================================
  // CONFIRMATION AVANT QUITTER SI MODIFICATIONS
  // ==========================================
  let formModified = false;
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('change', () => formModified = true);
    form.addEventListener('submit', () => formModified = false);
  });
  
  window.addEventListener('beforeunload', function(e) {
    if (formModified) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  // ==========================================
  // NOTIFICATIONS
  // ==========================================
  function showNotification(message, type = 'success') {
    document.querySelectorAll('.admin-notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; font-size: 16px; margin-left: 8px;">✕</button>
    `;
    
    // Styles
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      z-index: 9999;
      display: flex;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease;
    `;
    
    if (type === 'success') {
      notification.style.background = '#d4f0e0';
      notification.style.color = '#1a6e3e';
      notification.style.border = '1px solid #2D9E5A';
    } else if (type === 'error') {
      notification.style.background = '#fde8e8';
      notification.style.color = '#D62828';
      notification.style.border = '1px solid #D62828';
    } else {
      notification.style.background = '#e8f4fd';
      notification.style.color = '#003049';
      notification.style.border = '1px solid #003049';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // ==========================================
  // STYLES DYNAMIQUES
  // ==========================================
  if (!document.getElementById('admin-dynamic-styles')) {
    const styles = document.createElement('style');
    styles.id = 'admin-dynamic-styles';
    styles.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
      
      .nav-item {
        transition: all 0.15s ease;
      }
      
      .btn {
        transition: all 0.15s ease;
      }
      
      tr {
        transition: background-color 0.15s ease;
      }
    `;
    document.head.appendChild(styles);
  }

  console.log('🐟 Koi\'s Story Admin - JavaScript chargé !');
});

// Fonction globale pour toggleSidebar (utilisée par onclick inline)
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');
  
  if (sidebar) {
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
  }
}
