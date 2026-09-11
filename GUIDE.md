# Guide pratique

Ce guide suppose que tu connais un peu React mais pas encore Vite.
Chaque commande est exacte — copie-colle-les dans un terminal.

## 1. Prérequis

Il te faut Node.js version 18 ou plus récente (ce projet a été construit
avec Node 22).

## 2. Installer Node.js

- **Windows / macOS** : télécharge l'installeur LTS sur https://nodejs.org
- **macOS avec Homebrew** : `brew install node`
- **Linux (Ubuntu/Debian)** : `sudo apt install nodejs npm`

## 3. Vérifier que Node est installé

```bash
node -v
npm -v
```

Tu dois voir deux numéros de version s'afficher (par ex. `v22.22.2` et
`10.9.7`). Si tu as une erreur "command not found", Node n'est pas
correctement installé — reviens à l'étape 2.

## 4. Récupérer le projet

Si tu as reçu le projet en dossier/zip, place-toi dedans :

```bash
cd service-proximite-niger
```

(Le dossier existe déjà — pas besoin de relancer `npm create vite`.)

## 5. Installer les dépendances

```bash
npm install
```

Ce que tu dois observer : une barre de progression, puis une ligne du
type `added XXX packages`. Ça crée un dossier `node_modules/` (ne le
modifie jamais à la main).

**Si ça ne marche pas** : vérifie ta connexion internet, puis relance
`npm install`. Si l'erreur mentionne "permission denied", n'utilise pas
`sudo` — répare plutôt les permissions de ton dossier npm global.

## 6. Lancer le projet en développement

```bash
npm run dev
```

Ce que tu dois observer :

```
VITE vX.X.X  ready in XXX ms
➜  Local:   http://localhost:5173/
```

Ouvre cette adresse dans ton navigateur. Tu dois voir la page d'accueil
("De quoi avez-vous besoin ?").

**Si ça ne marche pas** : lis le message d'erreur affiché dans le
terminal — Vite indique généralement le fichier et la ligne en cause.
Arrête le serveur avec `Ctrl+C` et relance `npm run dev` après avoir
corrigé.

## 7. Structure des dossiers (rappel rapide)

Voir la section "Architecture" du README.md. En résumé :

- `src/pages/` → les écrans que voient les utilisateurs
- `src/components/` → les briques réutilisables (boutons, badges...)
- `src/i18n/locales/` → les textes traduits
- `src/styles/tokens.css` → toutes les couleurs et tailles du produit

## 8. Où modifier les couleurs

Ouvre `src/styles/tokens.css`. Chaque couleur est une variable, par
exemple `--color-brand: #263A5E;`. Modifie la valeur hexadécimale et
sauvegarde : le navigateur se met à jour automatiquement (pas besoin de
relancer `npm run dev`).

## 9. Où modifier le nom du produit

Trois endroits :
1. `index.html` → la balise `<title>`
2. `src/layouts/RootLayout.tsx` → le texte "PROJET À VENIR" dans l'en-tête
3. `src/i18n/locales/*/common.json` → si le nom apparaît dans des textes traduits

## 10. Où modifier le logo

Remplace `public/favicon.svg` par ton propre fichier (garde le même nom,
ou change la référence dans `index.html`). Pour un logo dans l'en-tête,
ajoute-le dans `src/layouts/RootLayout.tsx` à la place du texte.

## 11. Où modifier les traductions

Dans `src/i18n/locales/<langue>/common.json`. Chaque langue a son propre
fichier avec les mêmes clés. Modifie uniquement les valeurs (à droite des
`:`), jamais les clés (à gauche).

## 12. Où modifier les données DEMO

Dans `src/data/` (prestataires, catégories, avis...). Ce dossier sera
rempli au fur et à mesure de la construction des écrans.

## 13. Où modifier les pages

Dans `src/pages/`, organisé par rôle : `public/`, `requester/`,
`provider/`, `admin/`.

## 14. Comment ajouter une page

1. Crée un fichier dans `src/pages/<rôle>/MaPage.tsx`
2. Ajoute la route dans `src/routes/AppRouter.tsx` (copie une ligne
   existante et adapte le `path` et l'`element`)

## 15. Comment ajouter une langue

1. Crée un dossier `src/i18n/locales/<code>/common.json` (copie un fichier
   existant comme base et traduis chaque valeur)
2. Importe-le dans `src/i18n/index.ts` et ajoute-le à `resources` et
   `supportedLngs`
3. Ajoute la langue dans `src/i18n/languages.ts` (`SUPPORTED_LANGUAGES`)

## 16. Comment tester le RTL (arabe)

Lance le projet, ouvre le sélecteur de langue dans l'en-tête, choisis
"العربية". Toute la mise en page doit s'inverser automatiquement (le
`dir="rtl"` est posé sur `<html>` par `LanguageDirectionEffect.tsx`).

## 17. Comment tester le Dark Mode

Utilise le sélecteur de thème dans l'en-tête (icônes soleil/lune/écran).
"Système" suit le réglage de ton système d'exploitation.

## 18. Comment générer le build de production

```bash
npm run build
```

Ce que tu dois observer : `✓ built in XXXms` et un dossier `dist/` créé
à la racine du projet. C'est ce dossier qu'il faut déployer.

**Si ça ne marche pas** : le build inclut une vérification TypeScript
(`tsc -b`). Les erreurs affichées indiquent le fichier et la ligne
exacts à corriger.

## 19. Comment prévisualiser le build avant déploiement

```bash
npm run preview
```

## 20. Comment déployer

Ce projet produit un site statique (`dist/`). Il peut être déployé sur
n'importe quel hébergeur de fichiers statiques : Netlify, Vercel, GitHub
Pages, ou un simple serveur web. La procédure générale :

1. `npm run build`
2. Envoie le contenu du dossier `dist/` sur ton hébergeur
3. Configure l'hébergeur pour rediriger toutes les routes vers
   `index.html` (nécessaire car React Router gère le routing côté
   client) — sur Netlify par exemple, ajoute un fichier
   `public/_redirects` avec la ligne `/* /index.html 200`.
