/**
 * header.js — Koi's Story V3
 * Transition header transparent → sombre au scroll via IntersectionObserver.
 * Ajoute/enlève `.site-header--scrolled` sur #site-header.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('site-header');
    if (!header) return;

    // On cherche le premier élément hero ou un repère de scroll
    var hero = document.getElementById('hero') ||
               document.querySelector('.hero') ||
               document.querySelector('[data-scroll-trigger]');

    if (hero) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            header.classList.remove('site-header--scrolled');
          } else {
            header.classList.add('site-header--scrolled');
          }
        });
      }, { threshold: 0.1 });

      io.observe(hero);
    } else {
      // Fallback scroll classique si pas de hero
      window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
          header.classList.add('site-header--scrolled');
        } else {
          header.classList.remove('site-header--scrolled');
        }
      }, { passive: true });
    }
  });
})();
