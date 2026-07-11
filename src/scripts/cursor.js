/**
 * cursor.js — Curseur custom "Vert Pomme"
 *
 * Crée un <div class="cursor"> suivant la souris en fixed, avec un état
 * distinct au survol des éléments interactifs (boutons, cartes, accordéon).
 *
 * Architecture pensée pour évoluer : les états sont gérés via des classes
 * CSS dédiées (.cursor--hover, .cursor--active, .cursor--idle) pour que
 * des animations plus élaborées (GSAP via CDN, etc.) puissent être
 * branchées plus tard sans réécrire cette logique.
 */
(function () {
  'use strict';

  // Pas de curseur custom sur les appareils tactiles
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursor);

  // Sélecteur des éléments interactifs déclenchant l'état hover du curseur.
  // Centralisé ici pour être facile à étendre (ex. ajouter un nouveau composant).
  const HOVER_SELECTOR = [
    'a',
    'button',
    '[data-cursor-hover]',
    '.accordion-item__header',
    '.card',
    '.carousel__control'
  ].join(', ');

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  function onPointerMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!cursor.classList.contains('cursor--visible')) {
      cursor.classList.add('cursor--visible');
    }
    if (!rafId) {
      rafId = requestAnimationFrame(render);
    }
  }

  function render() {
    // HOOK ANIMATION FUTURE : remplacer ce lerp simple par un easing/spring
    // (ex. GSAP quickTo) pour un mouvement plus élaboré.
    currentX = targetX;
    currentY = targetY;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    rafId = null;
  }

  document.addEventListener('pointermove', onPointerMove, { passive: true });

  document.addEventListener('pointerdown', () => {
    cursor.classList.add('cursor--active');
  });
  document.addEventListener('pointerup', () => {
    cursor.classList.remove('cursor--active');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor--visible');
  });

  // Délégation d'événements pour couvrir les éléments ajoutés dynamiquement
  // (ex. contenu d'accordéon qui s'ouvre).
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(HOVER_SELECTOR)) {
      cursor.classList.add('cursor--hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(HOVER_SELECTOR) && !e.relatedTarget?.closest(HOVER_SELECTOR)) {
      cursor.classList.remove('cursor--hover');
    }
  });
})();
