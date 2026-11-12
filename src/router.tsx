import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import landingRoutes from "./routes/landing";
import AuthRouter from "./routes/auth";
import PortalRouter from "./routes/portal";

const NFPage = lazy(() => import("@/pages/errors/PageNotFound"));

const router = createBrowserRouter([
  ...landingRoutes,
  ...AuthRouter,
  ...PortalRouter,
  {
    path: "*",
    element: <NFPage />,
  },
]);

export default router;
