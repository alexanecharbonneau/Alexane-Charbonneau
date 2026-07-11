// @ts-check
import { defineConfig } from 'astro/config';

// Site statique, interactivité minimale : pas d'intégration framework.
// Les rares comportements (accordéon, curseur, nav latérale) sont de petits
// scripts vanilla chargés par page (voir src/scripts/).
export default defineConfig({
  site: 'https://alexanecharbonneau.com',
  build: {
    format: 'directory',
  },
});
