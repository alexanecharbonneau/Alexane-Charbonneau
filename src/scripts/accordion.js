/**
 * accordion.js — Projets/Onglets/Layout (State=Closed/Open)
 *
 * Chaque .accordion-item bascule indépendamment (pas d'exclusivité entre
 * sections : hypothèse par défaut d'un accordéon standard, aucune
 * spécification contraire trouvée dans le fichier Figma).
 *
 * Le clic sur l'en-tête (.accordion-item__header) ouvre/ferme la section ET
 * défile jusqu'à son ancrage à l'ouverture (scroll-margin-top compense le
 * header fixe, voir case-study.css) — le même ancrage que celui utilisé par
 * la nav latérale (section-nav.js), pour un comportement identique peu
 * importe le point d'entrée. Les liens texte "Fermer l'onglet" ont été
 * retirés à la demande d'Alexane : la fermeture se fait en recliquant
 * l'en-tête ou via la nav latérale, qui sert désormais d'ancrage unique.
 *
 * Un évènement custom "accordion:toggle" est émis à chaque bascule pour que
 * section-nav.js puisse réagir (afficher/masquer la nav) sans dépendance
 * directe entre les deux fichiers.
 *
 * HOOK ANIMATION FUTURE : l'ouverture/fermeture est actuellement un simple
 * display:none/flex (voir case-study.css). Un branchement GSAP (hauteur
 * animée via gsap.to + overflow, ou un fade/slide sur .accordion-item__body)
 * pourrait remplacer ce toggle sans changer la structure JS ci-dessous.
 */
(function () {
  'use strict';

  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var header = item.querySelector('.accordion-item__header');
    if (!header) return;

    header.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      if (isOpen) {
        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      document.dispatchEvent(new CustomEvent('accordion:toggle', { detail: { item: item } }));
    });
  });

  // ---- Bouton "Fermer tous les onglets" en fin de chaque section ----
  // Inséré AVANT le dernier divider (masqué) pour ne pas le réactiver.
  // Au clic : referme tous les onglets ouverts puis remonte en haut de page.
  // Uniquement à la fin de la DERNIÈRE section de chaque projet.
  var __items = document.querySelectorAll('.accordion-item');
  var __lastBody = __items.length ? __items[__items.length - 1].querySelector('.accordion-item__body') : null;
  [__lastBody].filter(Boolean).forEach(function (body) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    // Forcé en ligne : pleine largeur + aligné à droite, quel que soit le CSS/cache.
    btn.style.cssText = 'display:flex;width:100%;justify-content:flex-end;';
    btn.setAttribute('data-cursor-hover', '');
    btn.innerHTML = '<span class="back-to-top__arrow" aria-hidden="true"></span>Fermer tous les onglets';
    btn.addEventListener('click', function () {
      document.querySelectorAll('.accordion-item.is-open').forEach(function (it) {
        it.classList.remove('is-open');
      });
      document.dispatchEvent(new CustomEvent('accordion:toggle', { detail: {} }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    var dividers = body.querySelectorAll(':scope > .accordion-item__divider');
    var lastDivider = dividers[dividers.length - 1];
    if (lastDivider) { body.insertBefore(btn, lastDivider); }
    else { body.appendChild(btn); }
  });

  // ---- Carrousel/Annexes : navigation simple entre plusieurs planches ----
  document.querySelectorAll('.annexe-carousel').forEach(function (carousel) {
    var frames = carousel.querySelectorAll('.annexe-carousel__frame');
    if (frames.length < 2) return;
    var index = 0;
    frames.forEach(function (f, i) { f.style.display = i === 0 ? 'flex' : 'none'; });
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    function show(i) {
      frames[index].style.display = 'none';
      index = (i + frames.length) % frames.length;
      frames[index].style.display = 'flex';
    }
    if (prev) prev.addEventListener('click', function () { show(index - 1); });
    if (next) next.addEventListener('click', function () { show(index + 1); });
  });
})();
