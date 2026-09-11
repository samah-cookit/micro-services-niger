# Projet à venir — plateforme nigérienne de services de proximité

> Le nom, le logo et les couleurs de marque ne sont pas encore définitifs.
> "Projet à venir" est un nom temporaire. Voir [GUIDE.md](./GUIDE.md) pour
> savoir où les remplacer.

## Présentation

Une plateforme numérique de mise en relation locale, pensée pour Niamey.
Elle connecte des **demandeurs** (personnes ayant besoin d'un service) et
des **prestataires** (plombiers, électriciens, couturières, tuteurs,
etc.) proches d'eux.

## Le problème

Au Niger, les compétences existent, mais elles sont difficiles à trouver :
dispersées, accessibles surtout par relations personnelles, difficiles à
comparer, à localiser et à contacter rapidement. Ce n'est pas un problème
d'offre — c'est un problème de mise en relation.

## La solution

Le produit transforme un besoin en résultat concret :

```
Besoin → Localisation → Matching → Contact → Négociation
→ Accord → Déplacement → Prestation → Évaluation
```

Ce n'est pas un simple annuaire : c'est une infrastructure de mise en
relation adaptée aux réalités locales (téléphone plutôt qu'email,
importance de WhatsApp, repères de quartier plutôt qu'adresses précises,
confiance interpersonnelle, économie informelle).

## Fonctionnalités principales

- Recherche et matching par catégorie de service, proximité, disponibilité,
  fiabilité et réputation
- Authentification par numéro de téléphone (OTP)
- Suivi en temps réel simulé d'une prestation (route, arrivée, terminé)
- Signaux de confiance (téléphone vérifié, profil confirmé, taux de réponse)
- Tableaux de bord dédiés : demandeur, prestataire, admin
- Support multilingue dès la conception : français, anglais, hausa, zarma,
  arabe (RTL)
- Thème clair, sombre et système

## Stack technique

| Domaine | Choix | Pourquoi |
|---|---|---|
| Build | Vite | Démarrage instantané, simple à apprendre |
| UI | React + TypeScript | Typage = moins de bugs sur un projet à beaucoup d'écrans/rôles |
| Routing | React Router | Standard, routes déclaratives par rôle |
| i18n | i18next / react-i18next | RTL, namespaces, détection de langue |
| Icônes | lucide-react | Une seule famille cohérente |
| Style | CSS Modules + design tokens (CSS variables) | Contrôle total du design, pas de dépendance à un framework utilitaire |
| Police | Manrope (auto-hébergée via @fontsource) | Pas d'appel réseau externe — important sur connexion faible |

Aucun backend pour cette version : données mock, état local, simulation
côté frontend. L'architecture est prévue pour brancher une vraie API plus
tard (voir `.env.example`).

## Architecture

```
src/
├── app/          # Providers racine (thème, i18n, App.tsx)
├── components/   # Composants réutilisables (ui/, layout/)
├── data/         # Données mock (prestataires, catégories, etc.)
├── features/     # Logique par domaine (auth, matching, tracking, ...)
├── hooks/        # Hooks partagés
├── i18n/         # Traductions et configuration i18next
├── layouts/      # Layouts (RootLayout, etc.)
├── pages/        # Écrans, organisés par rôle (public/requester/provider/admin)
├── routes/       # Déclaration du routing
├── styles/       # Design tokens et styles globaux
├── types/        # Types partagés
└── utils/        # Fonctions utilitaires
```

## Langues

| Langue | Statut |
|---|---|
| Français | Actif |
| English | Actif |
| العربية (RTL) | Actif |
| Hausa | Brouillon (non validé par un locuteur natif) |
| Zarma | Scaffoldé uniquement (non traduit, voir `src/i18n/locales/dje/NOTES.md`) |

## Installation et lancement

Voir [GUIDE.md](./GUIDE.md) pour des instructions détaillées pas à pas.

```bash
npm install
npm run dev      # développement
npm run build    # build de production
```

## Statut du projet

**Prototype de compétition / pré-produit.** Les fondations (design system,
thème, i18n, routing) sont en place. Le parcours demandeur complet est en
cours de construction — voir la roadmap ci-dessous.

## Roadmap

- [x] Étape 0 — Environnement et architecture de base
- [x] Étape 1 — Fondations (tokens, thèmes, i18n, routing, design system de départ)
- [ ] Étape 2 — Parcours demandeur complet (priorité)
- [ ] Étape 3 — Parcours prestataire
- [ ] Étape 4 — Dashboard admin
- [ ] Étape 5 — Finalisation de l'internationalisation (Hausa, Zarma)
- [ ] Étape 6 — Polish (accessibilité, responsive, microcopy, performance)
- [ ] Étape 7 — Revue finale type jury de compétition

## Ce que ce projet n'est pas

Il n'y a pas de backend réel, pas de matching IA réel, pas de paiement, pas
de vraies statistiques de marché. Toutes les données affichées sont
clairement marquées comme données de démonstration.
