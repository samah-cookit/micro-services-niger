import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { LandingPage } from '../pages/public/LandingPage';
import { PlaceholderPage } from '../pages/PlaceholderPage';

// Les routes ci-dessous reflètent le parcours complet prévu (section 33 du brief).
// Seul "/" est aujourd'hui une vraie page ; le reste est volontairement en
// PlaceholderPage tant que les écrans correspondants ne sont pas construits —
// cela valide que le routing et la navigation par rôle fonctionnent avant
// d'investir dans 30 écrans (voir méthode de production, étape 0 → 1).
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <PlaceholderPage title="Connexion téléphone" /> },

      // Demandeur
      { path: '/request', element: <PlaceholderPage title="Rechercher un service" /> },
      { path: '/request/new', element: <PlaceholderPage title="Nouvelle demande" /> },
      { path: '/matches', element: <PlaceholderPage title="Résultats du matching" /> },
      { path: '/providers/:id', element: <PlaceholderPage title="Profil prestataire" /> },
      { path: '/messages', element: <PlaceholderPage title="Messages" /> },
      { path: '/tracking', element: <PlaceholderPage title="Suivi de la prestation" /> },
      { path: '/history', element: <PlaceholderPage title="Historique" /> },
      { path: '/profile', element: <PlaceholderPage title="Profil" /> },

      // Prestataire
      { path: '/provider', element: <PlaceholderPage title="Tableau de bord prestataire" /> },
      { path: '/provider/requests', element: <PlaceholderPage title="Demandes reçues" /> },
      { path: '/provider/jobs', element: <PlaceholderPage title="Prestations en cours" /> },
      { path: '/provider/stats', element: <PlaceholderPage title="Statistiques" /> },

      // Admin
      { path: '/admin', element: <PlaceholderPage title="Tableau de bord admin" /> },
      { path: '/admin/users', element: <PlaceholderPage title="Utilisateurs" /> },
      { path: '/admin/providers', element: <PlaceholderPage title="Prestataires" /> },
      { path: '/admin/analytics', element: <PlaceholderPage title="Analytics" /> },

      { path: '*', element: <PlaceholderPage title="Page introuvable" /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
