# Portfolio — Alexane Charbonneau (Astro)

Portfolio recréé à partir des maquettes Figma. Stack : **Astro** + CSS (variables
mappées sur les tokens Figma). Interactivité minimale, vanilla JS (pas de framework).

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview  # prévisualise le build
```

## Structure

```
public/assets/        polices, SVG, PDF (servis en /assets/…)
src/
  styles/             tokens.css (variables Figma) · base · components · cursor · case-study
  layouts/Base.astro  <head>, polices, header/footer fixes, curseur custom
  components/         Header · Footer · Chip · BackLink · ProjectRow · CaseHero · ScallopDefs
  scripts/            cursor.js · accordion.js · section-nav.js (vanilla)
  pages/
    index.astro                            Accueil
    projets.astro                          Portfolio (liste)
    curriculum.astro                       CV
    projets/le-circuit-du-medicament.astro
    projets/murmur.astro
    projets/barbie-et-le-feminisme.astro
```

L'ancien site statique reste à la racine (`index.html`, `projets.html`, …) et dans
`css/`, `js/`, `assets/` — Astro les ignore. À supprimer quand tu veux.

## Tokens (source : variables + styles Figma)

Couleurs : Anthracite `#1E1E1E` · Pomme `#CDF84F` · Beige `#FCF7EF` ·
Beige moyen `#E9E2D7` · Beige foncé `#C1BAAF`.
Typo : **Inclusive Sans** (Google Fonts) + **PP Editorial Old Italic** (self-hosted).
H1 56 · H2 32 · Body 18 · Label 16 · Small 14.

## Corrections appliquées vs ancien code (alignement maquette)

- Accueil — corps : « Ma pratique relève d'un heureux mélange de design
  d'interaction et d'interface. »
- Projets — intro : « J'affectionne tout particulièrement ce qui est aussi
  agréable à utiliser qu'à regarder. C'est pile à cette jonction que se situe
  mon travail. »
- Flèche retour : libellé supprimé (flèche seule, comme la maquette).
- Token `--fs-text-body` : 20 → **18px** (valeur Figma `Text/Body`).
- **Numéro de section** (1, 2, 3…) ajouté à gauche des titres d'onglets
  (présent dans la maquette, absent de l'ancien code) — compteur CSS.
- CV — bouton « Télécharger mon CV complet » : aligné à **gauche** (maquette),
  plus à droite.
- Nouvelle page **Barbie & le féminisme ?** (manquait).
- MürMur — section **Évaluation** ajoutée (6 sections au total).

## Contenu — état

Tout le **texte** des études de cas est intégré, y compris le contenu extrait
des états « ouverts » Figma (frame `281:331`) : les 5 sections de **Barbie** et
la section **Évaluation** de **MürMur**.

## À fournir (images + photo)

Les images du fichier Figma n'ont pas pu être extraites automatiquement dans la
session (réseau bloqué côté sandbox). Elles sont représentées par des
placeholders `.img-box` dimensionnés au bon ratio. Pour les intégrer : exporte
les visuels depuis Figma et dépose-les dans `public/assets/img/barbie/`, puis
remplace chaque `<div class="img-box">…</div>` par `<img src="…" alt="…">`.

Images attendues (page Barbie) :

- Démarche : carte heuristique (≈374×281).
- Conception : 6 moodboards (grille 3×2), 7 tests de police manuscrite,
  l'affiche « vue d'ensemble » (4096×2517), 5 détails d'affiche, un bandeau
  ligne du temps (3324×308).
- Livrables : l'affiche finale grand format (portrait 3244×4096).

Photo de profil (Accueil) : placeholder gris en attendant
`public/assets/img/profil-alexane.jpg`.
