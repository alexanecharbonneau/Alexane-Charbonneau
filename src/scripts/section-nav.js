/**
 * section-nav.js — Navigation latérale entre sections (études de cas)
 *
 * Génère dynamiquement une barre par .accordion-item (titre lu depuis
 * .accordion-item__title) dans #section-nav.
 *
 * - La nav n'est visible que lorsqu'au moins une section est ouverte
 *   (.section-nav.is-visible) — masquée par défaut et dès que toutes les
 *   sections sont refermées.
 * - Clic sur une barre = bascule la section ciblée (ouvre si fermée, ferme
 *   si déjà ouverte) et défile jusqu'à son ancrage si elle vient de
 *   s'ouvrir — le même ancrage que celui utilisé par le clic sur l'en-tête
 *   lui-même (voir accordion.js, scroll-margin-top dans case-study.css).
 * - La barre correspondant à la section actuellement consultée (ouverte ET
 *   dans le viewport) passe en vert Pomme via IntersectionObserver.
 *
 * Coordination avec accordion.js via l'évènement custom "accordion:toggle"
 * (émis à chaque clic sur un en-tête) pour garder la visibilité de la nav
 * synchronisée peu importe le point d'entrée (en-tête ou nav elle-même).
 *
 * Composant hors-Figma — voir commentaire dans case-study.css pour la
 * justification de la direction artistique reprise.
 */
(function () {
  'use strict';

  var accordion = document.querySelector('.accordion');
  var navContainer = document.getElementById('section-nav');
  if (!accordion || !navContainer) return;

  var items = Array.prototype.slice.call(accordion.querySelectorAll('.accordion-item'));
  if (!items.length) return;

  var entries = [];

  items.forEach(function (item) {
    var titleEl = item.querySelector('.accordion-item__title');
    var header = item.querySelector('.accordion-item__header');
    if (!titleEl || !header) return;

    var label = titleEl.textContent.trim();

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'section-nav__item';
    btn.setAttribute('data-cursor-hover', '');
    btn.setAttribute('aria-label', 'Aller à la section ' + label);
    btn.innerHTML =
      '<span class="section-nav__label">' + label + '</span>' +
      '<span class="section-nav__bar"></span>';

    btn.addEventListener('click', function () {
      var willOpen = !item.classList.contains('is-open');
      item.classList.toggle('is-open');
      if (willOpen) {
        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      updateVisibility();
    });

    navContainer.appendChild(btn);
    entries.push({ item: item, header: header, btn: btn });
  });

  if (!entries.length) return;

  function setActive(btn) {
    entries.forEach(function (e) { e.btn.classList.remove('is-active'); });
    btn.classList.add('is-active');
  }

  function updateVisibility() {
    var anyOpen = entries.some(function (e) { return e.item.classList.contains('is-open'); });
    navContainer.classList.toggle('is-visible', anyOpen);
  }

  // Réagit aux ouvertures/fermetures déclenchées depuis les en-têtes eux-mêmes.
  document.addEventListener('accordion:toggle', updateVisibility);

  // État initial : nav masquée tant qu'aucune section n'est ouverte.
  updateVisibility();

  if ('IntersectionObserver' in window) {
    // NOTE : -95px correspond à --header-height (85px) + une marge de 10px.
    // Si --header-height change dans tokens.css, ajuster cette valeur aussi
    // (rootMargin n'accepte pas les variables CSS). On observe l'item
    // entier (pas juste l'en-tête) pour rester actif tant que son contenu
    // ouvert défile dans le viewport.
    var observer = new IntersectionObserver(function (observed) {
      observed.forEach(function (obs) {
        if (!obs.isIntersecting) return;
        var match = entries.find(function (e) { return e.item === obs.target; });
        // "Onglet consulté" = section active ET ouverte uniquement.
        if (match && match.item.classList.contains('is-open')) {
          setActive(match.btn);
        }
      });
    }, {
      rootMargin: '-95px 0px -70% 0px',
      threshold: 0
    });

    entries.forEach(function (e) { observer.observe(e.item); });
  }
})();
