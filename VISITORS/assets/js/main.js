/**
 * Koi's Story - Main JavaScript
 * Fonctionnalités interactives pour l'espace visiteur
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // HEADER SCROLL EFFECT
  // ==========================================
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const mobileMenuBtn = document.querySelector('.header-mobile-btn');
  const mobileNav = document.getElementById('headerNav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle('is-open');
      const isOpen = mobileNav.classList.contains('is-open');
      mobileMenuBtn.textContent = isOpen ? '✕' : '☰';
    });

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileNav.classList.remove('is-open');
        mobileMenuBtn.textContent = '☰';
      }
    });

    // Fermer le menu en cliquant sur un lien
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        mobileMenuBtn.textContent = '☰';
      });
    });
  }

  // ==========================================
  // SMOOTH SCROLL POUR LES ANCRES
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // GALERIE PRODUIT
  // ==========================================
  const galleryMain = document.querySelector('.gallery-main img');
  const galleryThumbs = document.querySelectorAll('.gallery-thumb');
  const galleryPrev = document.querySelector('.gallery-nav.prev');
  const galleryNext = document.querySelector('.gallery-nav.next');
  
  if (galleryMain && galleryThumbs.length > 0) {
    let currentIndex = 0;
    const images = Array.from(galleryThumbs).map(thumb => thumb.querySelector('img').src);
    
    // Clique sur les miniatures
    galleryThumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        currentIndex = index;
        updateGallery();
      });
    });
    
    // Boutons précédent/suivant
    if (galleryPrev) {
      galleryPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery();
      });
    }
    
    if (galleryNext) {
      galleryNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery();
      });
    }
    
    function updateGallery() {
      galleryMain.style.opacity = '0.5';
      setTimeout(() => {
        galleryMain.src = images[currentIndex];
        galleryMain.style.opacity = '1';
      }, 150);
      
      galleryThumbs.forEach((t, i) => {
        t.classList.toggle('active', i === currentIndex);
      });
    }
    
    // Navigation clavier
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') galleryPrev?.click();
      if (e.key === 'ArrowRight') galleryNext?.click();
    });
  }

  // ==========================================
  // FILTRES CATALOGUE
  // ==========================================
  const filterSelects = document.querySelectorAll('.filter-select');
  const konishiToggle = document.querySelector('.filter-toggle input[type="checkbox"]');
  const koiCards = document.querySelectorAll('.koi-card');
  const resultsCount = document.querySelector('.results-count strong');
  
  function filterCatalogue() {
    const konishiOnly = konishiToggle?.checked || false;
    
    let visibleCount = 0;
    
    koiCards.forEach(card => {
      const hasKonishi = card.querySelector('.koi-card-badge--konishi') !== null;
      
      let isVisible = true;
      
      // Filtre Konishi
      if (konishiOnly && !hasKonishi) isVisible = false;
      
      if (isVisible) {
        card.style.display = '';
        card.style.animation = 'fadeIn 0.4s ease';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    if (resultsCount) {
      resultsCount.textContent = visibleCount;
    }
  }
  
  // Event listeners sur les filtres
  filterSelects.forEach(select => {
    select.addEventListener('change', filterCatalogue);
  });
  
  if (konishiToggle) {
    konishiToggle.addEventListener('change', filterCatalogue);
  }

  // ==========================================
  // BOUTON "CHARGER PLUS"
  // ==========================================
  const loadMoreBtn = document.querySelector('.load-more-btn');
  const catalogueGrid = document.querySelector('.catalogue-grid');
  
  if (loadMoreBtn && catalogueGrid) {
    loadMoreBtn.addEventListener('click', function() {
      const originalText = this.textContent;
      this.textContent = 'Chargement...';
      this.disabled = true;
      
      setTimeout(() => {
        const existingCards = catalogueGrid.querySelectorAll('.koi-card');
        const cardsToClone = Math.min(3, existingCards.length);
        
        for (let i = 0; i < cardsToClone; i++) {
          const clone = existingCards[i].cloneNode(true);
          clone.style.animation = 'fadeInUp 0.5s ease';
          clone.style.animationDelay = `${i * 0.1}s`;
          catalogueGrid.appendChild(clone);
        }
        
        this.textContent = originalText;
        this.disabled = false;
        
        if (resultsCount) {
          const newCount = catalogueGrid.querySelectorAll('.koi-card').length;
          resultsCount.textContent = newCount;
        }
        
        if (catalogueGrid.querySelectorAll('.koi-card').length >= 12) {
          this.style.display = 'none';
        }
      }, 800);
    });
  }

  // ==========================================
  // FORMULAIRE DE CONTACT
  // ==========================================
  const contactForm = document.querySelector('.contact-form-wrapper form') || 
                      document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.form-submit, button[type="submit"]');
      const originalText = submitBtn?.textContent || 'Envoyer';
      
      // Validation basique
      const requiredFields = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#D62828';
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
      }
      
      // Simulation d'envoi
      if (submitBtn) {
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
      }
      
      setTimeout(() => {
        showNotification('Message envoyé avec succès ! Nous vous répondrons rapidement.', 'success');
        this.reset();
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }, 1500);
    });
    
    // Reset error on input
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', function() {
        this.style.borderColor = '';
      });
    });
  }

  // ==========================================
  // WHATSAPP CTA
  // ==========================================
  const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
  
  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href.startsWith('#')) {
        e.preventDefault();
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    });
  });

  // ==========================================
  // NOTIFICATIONS
  // ==========================================
  function showNotification(message, type = 'success') {
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // ==========================================
  // ANIMATIONS AU SCROLL
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.koi-card, .stat, .faq-item, .breeder').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ==========================================
  // STYLES DYNAMIQUES
  // ==========================================
  if (!document.getElementById('dynamic-styles')) {
    const styles = document.createElement('style');
    styles.id = 'dynamic-styles';
    styles.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      }
      
      .notification.success {
        background: #d4f0e0;
        color: #1a6e3e;
        border: 1px solid #2D9E5A;
      }
      
      .notification.error {
        background: #fde8e8;
        color: #D62828;
        border: 1px solid #D62828;
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .notification.fade-out {
        animation: fadeOut 0.3s ease forwards;
      }
      
      @keyframes fadeOut {
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .gallery-main img {
        transition: opacity 0.15s ease;
      }
    `;
    document.head.appendChild(styles);
  }

  console.log('🐟 Koi\'s Story - JavaScript chargé et fonctionnel !');
});
