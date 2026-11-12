import { lazy } from "react";
import { type RouteObject } from "react-router";

// const AuthLayout = lazy(() => import("@/components/layouts/auth"));
const Portal = lazy(() => import("@/pages/portal"));

const PortalRouter: RouteObject[] = [
  {
    path: "/portal",
    // element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Portal />,
      },
    ],
  },
];

export default PortalRouter;
