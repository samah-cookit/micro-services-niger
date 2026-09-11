import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { LandingPage } from '../pages/public/LandingPage';
import { PlaceholderPage } from '../pages/PlaceholderPage';

import { RequestCategoryPage } from '../pages/requester/RequestCategoryPage';
import { RequestDetailsPage } from '../pages/requester/RequestDetailsPage';
import { MatchesPage } from '../pages/requester/MatchesPage';
import { ProviderProfilePage } from '../pages/requester/ProviderProfilePage';
import { ConversationPage } from '../pages/requester/ConversationPage';
import { ConfirmationPage } from '../pages/requester/ConfirmationPage';
import { TrackingPage } from '../pages/requester/TrackingPage';
import { ReviewPage } from '../pages/requester/ReviewPage';
import { HistoryPage } from '../pages/requester/HistoryPage';

// Le parcours demandeur (Étape 2) est maintenant construit de bout en bout.
// Prestataire et admin restent en PlaceholderPage — ce sera l'Étape 3 et 4.
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <PlaceholderPage title="Connexion téléphone" /> },

      // Demandeur — parcours complet
      { path: '/request', element: <RequestCategoryPage /> },
      { path: '/request/new', element: <RequestDetailsPage /> },
      { path: '/matches', element: <MatchesPage /> },
      { path: '/providers/:id', element: <ProviderProfilePage /> },
      { path: '/providers/:id/contact', element: <ConversationPage /> },
      { path: '/request/confirm', element: <ConfirmationPage /> },
      { path: '/tracking', element: <TrackingPage /> },
      { path: '/review', element: <ReviewPage /> },
      { path: '/messages', element: <PlaceholderPage title="Messages" /> },
      { path: '/history', element: <HistoryPage /> },
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
