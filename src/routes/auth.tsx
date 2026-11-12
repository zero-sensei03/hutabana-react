import { lazy } from "react";
import { type RouteObject } from "react-router";

const AuthLayout = lazy(() => import("@/components/layouts/auth"));
const SignIn = lazy(() => import("@/pages/auth/sign-in"));
const SignUp = lazy(() => import("@/pages/auth/sign-up"));
const Forgot = lazy(() => import("@/pages/auth/forgot"));

const AuthRouter: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <Forgot />,
      },
    ],
  },
];

export default AuthRouter;
