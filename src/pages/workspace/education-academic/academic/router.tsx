import RolePermissionPage from "@/components/RolePermissionPage";
import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router";

const Dashboard = lazy(
  () => import("@/pages/workspace/education-academic/academic/dashboard"),
);

const ScheduleEvent = lazy(
  () => import("@/pages/workspace/education-academic/academic/schedule-event"),
);
const ScheduleEventCreate = lazy(
  () =>
    import("@/pages/workspace/education-academic/academic/schedule-event/create"),
);
const ScheduleEventDetail = lazy(
  () =>
    import("@/pages/workspace/education-academic/academic/schedule-event/detail"),
);

const Students = lazy(
  () => import("@/pages/workspace/education-academic/academic/students"),
);
const StudentsCreate = lazy(
  () => import("@/pages/workspace/education-academic/academic/students/create"),
);
const StudentsDetail = lazy(
  () => import("@/pages/workspace/education-academic/academic/students/detail"),
);


const AcademicEntityPage = lazy(
  () =>
    import("@/pages/workspace/education-academic/academic/AcademicEntityPage"),
);
const AcademicProgressPage = lazy(
  () =>
    import("@/pages/workspace/education-academic/academic/AcademicProgressPage"),
);
const AcademicReportsPage = lazy(
  () =>
    import("@/pages/workspace/education-academic/academic/AcademicReportsPage"),
);

const permitted = (children: React.ReactNode) => (
  <RolePermissionPage
    categorypermission={["education-academic"]}
    permissionName={["academic"]}
  >
    {children}
  </RolePermissionPage>
);
const EduAcademicRoute: RouteObject[] = [
  {
    path: "academic",
    children: [
      { index: true, element: permitted(<Dashboard />) },
      
      { path: "schedule-event", element: permitted(<ScheduleEvent />) },
      {
        path: "schedule-event/create",
        element: permitted(<ScheduleEventCreate />),
      },
      {
        path: "schedule-event/detail/:id",
        element: permitted(<ScheduleEventDetail />),
      },

      { path: "students", element: permitted(<Students />) },
      { path: "students/create", element: permitted(<StudentsCreate />) },
      { path: "students/detail/:id", element: permitted(<StudentsDetail />) },


      { path: "progress", element: permitted(<AcademicProgressPage />) },
      { path: "reports", element: permitted(<AcademicReportsPage />) },
      {
        path: "completion",
        element: permitted(
          <AcademicEntityPage collectionOverride="completions" />,
        ),
      },
      {
        path: "completion/new",
        element: permitted(
          <AcademicEntityPage collectionOverride="completions" />,
        ),
      },
      {
        path: "completion/:recordId",
        element: permitted(
          <AcademicEntityPage collectionOverride="completions" />,
        ),
      },
      {
        path: "completion/:recordId/edit",
        element: permitted(
          <AcademicEntityPage collectionOverride="completions" />,
        ),
      },
      {
        path: "educators",
        element: (
          <Navigate to="/education-academic/academic/teachers" replace />
        ),
      },
      {
        path: ":collection",
        children: [
          { index: true, element: permitted(<AcademicEntityPage />) },
          { path: "new", element: permitted(<AcademicEntityPage />) },
          { path: ":recordId", element: permitted(<AcademicEntityPage />) },
          {
            path: ":recordId/edit",
            element: permitted(<AcademicEntityPage />),
          },
        ],
      },
    ],
  },
];

export default EduAcademicRoute;
