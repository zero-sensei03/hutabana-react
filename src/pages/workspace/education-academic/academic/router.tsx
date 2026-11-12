import RolePermissionPage from "@/components/RolePermissionPage";
import { lazy } from "react";
import { type RouteObject } from "react-router";

const Dashboard = lazy(
  () => import("@/pages/workspace/education-academic/academic/dashboard"),
);

const EduAcademicRoute: RouteObject[] = [
  {
    path: "academic",
    children: [
      {
        index: true,
        element: (
          <RolePermissionPage
            categorypermission={["education-academic"]}
            permissionName={["academic"]}
          >
            <Dashboard />
          </RolePermissionPage>
        ),
      },
    ],
  },
];

export default EduAcademicRoute;
