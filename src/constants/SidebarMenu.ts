import {
  Activity,
  BookOpen,
  Building,
  Calendar,
  CalendarDays,
  ChartLine,
  Clock,
  GraduationCap,
  Grid2x2,
  LayoutGrid,
  UserGroup,
  UsersCollaboration,
  type LucideIcon,
} from "lucide-react";

export type sidebarMenuType = {
  icon: LucideIcon;
  name: string;
  key: string;
  url: string | null;
  children?: sidebarMenuType[];
};

export type sidebarType = {
  title: string;
  menu: sidebarMenuType[];
};

export const AcademicSidebarMenu: sidebarType[] = [
  {
    title: "Overview",
    menu: [
      {
        icon: Grid2x2,
        name: "Dashboard",
        key: "overview",
        url: "/education-academic/academic",
      },
      {
        icon: CalendarDays,
        name: "Academic Calendar",
        key: "schedule-event",
        url: "/education-academic/academic/schedule-event",
      },
    ],
  },
  {
    title: "Master Data",
    menu: [
      {
        icon: UserGroup,
        name: "Students / Participants",
        key: "students-participants",
        url: "/education-academic/academic/students",
      },
      {
        icon: UsersCollaboration,
        name: "Teachers / Instructors",
        key: "teachers-instructors",
        url: "/education-academic/academic/teachers",
      },
      {
        icon: Building,
        name: "Classes / Groups",
        key: "classes-groups",
        url: "/education-academic/academic/classes",
      },
      {
        icon: BookOpen,
        name: "Subjects / Programs",
        key: "subjects-programs",
        url: "/education-academic/academic/subjects",
      },
      {
        icon: Calendar,
        name: "Academic Periods",
        key: "academic-periods",
        url: "/education-academic/academic/periods",
      },
    ],
  },
  {
    title: "Academic Operations",
    menu: [
      {
        icon: Clock,
        name: "Class Scheduling",
        key: "class-scheduling",
        url: "/education-academic/academic/schedules",
      },
      {
        icon: UserGroup,
        name: "Class Enrollment",
        key: "class-enrollment",
        url: "/education-academic/academic/enrollments",
      },
      {
        icon: UsersCollaboration,
        name: "Teaching Assignments",
        key: "teaching-assignments",
        url: "/education-academic/academic/teaching-assignments",
      },
      {
        icon: Activity,
        name: "Academic Activities",
        key: "academic-activities",
        url: "/education-academic/academic/activities",
      },
    ],
  },
  {
    title: "Evaluation & Progress",
    menu: [
      {
        icon: ChartLine,
        name: "Academic Progress",
        key: "academic-progress",
        url: "/education-academic/academic/progress",
      },
      {
        icon: GraduationCap,
        name: "Graduation / Completion",
        key: "graduation-completion",
        url: "/education-academic/academic/completion",
      },
    ],
  },
  {
    title: "Reports",
    menu: [
      {
        icon: ChartLine,
        name: "Academic Reports",
        key: "academic-reports",
        url: "/education-academic/academic/reports",
      },
    ],
  },
];

export const DashboardWorkspaceSidebarMenu: sidebarType[] = [
  {
    title: "Workspace",
    menu: [
      {
        icon: Grid2x2,
        name: "Dashboard",
        key: "dashboard-workspace-overview",
        url: "/education-academic/dashboard-and-workspace",
      },
      {
        icon: LayoutGrid,
        name: "Launcher catalog",
        key: "dashboard-workspace-launchers",
        url: "/portal",
      },
    ],
  },
];
