import RolePermissionPage from "@/components/RolePermissionPage";
import EduAcademicRoute from "@/pages/workspace/education-academic/academic/router";
import { lazy } from "react";
import { type RouteObject } from "react-router";

const WorkspaceLayout = lazy(() => import("@/components/layouts/workspace"));
const Portal = lazy(() => import("@/pages/portal"));

const PortalRouter: RouteObject[] = [
  {
    path: "/portal",
    children: [
      {
        index: true,
        element: <Portal />,
      },
    ],
  },
  {
    path: "/education-academic",
    element: (
      <RolePermissionPage categorypermission={["education-academic"]}>
        <WorkspaceLayout />
      </RolePermissionPage>
    ),
    children: [...EduAcademicRoute],
  },
];

export default PortalRouter;
