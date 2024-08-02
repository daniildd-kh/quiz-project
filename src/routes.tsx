import DeckElementPage from './pages/deck-element-page/deck-element-page.tsx';
import DecksListPage from './pages/decks-list-page/decks-list-page.tsx';
import ErrorPage from './pages/error-page/error-page.tsx';
import App from './app/App.tsx';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthorizationPage from './pages/authorization-page/authorization-page.tsx';
import HomePage from './pages/home-page/home-page.tsx';
import { OnlyAuthRoute, OnlyUnAuthRoute } from './hoc/protected-route.tsx';
import ProfilePage from './pages/profile-page/profite-page.tsx';

export const routes = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'profile',
        element: <OnlyAuthRoute component={<ProfilePage />} />,
      },
      {
        path: 'your-decks',
        element: <OnlyAuthRoute component={<DecksListPage />} />,
      },
      {
        path: 'decks/:deckId',
        element: <OnlyAuthRoute component={<DeckElementPage />} />,
      },
    ],
  },
  {
    path: 'authorization',
    element: <OnlyUnAuthRoute component={<AuthorizationPage />} />,
  },
  {
    path: 'login',
    element: <Navigate to="/authorization" replace />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
]);
