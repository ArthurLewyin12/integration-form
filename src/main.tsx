import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

// import de l'arbre de routes généré par TanStack Router
import { routeTree } from "./routeTree.gen";

// Création du router
const router = createRouter({ routeTree });

// Création du client Query
const queryClient = new QueryClient();

// Type safety pour TanStack Router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface HistoryState {
    from?: string;
  }
}

// Montage de l'app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      {/* QueryClientProvider enveloppe toute l'app */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
