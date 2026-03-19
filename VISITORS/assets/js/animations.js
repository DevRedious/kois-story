/**
 * animations.js — Koi's Story
 * Triggers .is-visible on [data-animate] elements when they enter the viewport.
 * Compatible with Turbo (Rails Hotwire) via the turbo:load event.
 */

const animObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('is-visible');
    animObserver.unobserve(entry.target);
  }
}, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

const initAnimations = () => {
  document.querySelectorAll('[data-animate]').forEach((el) => {
    if (!el.classList.contains('is-visible')) animObserver.observe(el);
  });
};

document.addEventListener('DOMContentLoaded', initAnimations);
document.addEventListener('turbo:load', initAnimations);
