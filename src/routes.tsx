import DeckElementPage from "./pages/deck-element-page/deck-element-page.tsx";
import DecksListPage from "./pages/decks-list-page/decks-list-page.tsx";
import ErrorPage from "./pages/error-page/error-page.tsx";
import App from "./app/App.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthorizationPage from "./pages/authorization-page/authorization-page.tsx";
import HomePage from "./pages/home-page/home-page.tsx";
import { OnlyAuthRoute, OnlyUnAuthRoute } from "./hoc/protected-route.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "your-decks",
        element: <OnlyAuthRoute component={<DecksListPage />} />,
      },
      {
        path: "flash-cards/:deckId",
        element: <OnlyAuthRoute component={<DeckElementPage />} />,
      },
    ],
  },
  {
    path: "authorization",
    element: <OnlyUnAuthRoute component={<AuthorizationPage />} />,
  },
  {
  path:"login",
  element:<Navigate to="/authorization" replace />}
]);
