import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";
import "./assets/css/main.css";

import PageLoading from "@/components/loading/PageLoading";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";
import AppInitializer from "./components/AppInitializer";
import { Toaster } from "@/components/ui/toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppInitializer>
        <Toaster />
        <Suspense fallback={<PageLoading />}>
          <RouterProvider router={router} />
        </Suspense>
      </AppInitializer>
    </QueryClientProvider>
  </StrictMode>,
);
