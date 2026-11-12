import { Navigate, type RouteObject } from "react-router";

const landingRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"/auth/sign-in"} replace />,
  },
];

export default landingRoutes;
