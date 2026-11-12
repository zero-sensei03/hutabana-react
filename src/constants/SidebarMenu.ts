import {
  BookOpen,
  Building,
  Calendar,
  ChartLine,
  Clock,
  Cog,
  Grid2x2,
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
    title: "Dashboard",
    menu: [
      {
        icon: Grid2x2,
        name: "Dashboard",
        key: "dashboard",
        url: "/education-academic/academic",
      },
    ],
  },
  {
    title: "Menu",
    menu: [
      {
        icon: UserGroup,
        name: "Students",
        key: "students",
        url: "/education-academic/academic/students",
      },
      {
        icon: UsersCollaboration,
        name: "Educators",
        key: "educators",
        url: "/education-academic/academic/educators",
      },
      {
        icon: Building,
        name: "Classes",
        key: "classes",
        url: "/education-academic/academic/classes",
      },
      {
        icon: BookOpen,
        name: "Subjects",
        key: "subjects",
        url: "/education-academic/academic/subjects",
      },
      {
        icon: Calendar,
        name: "Academic Year",
        key: "academic-year",
        url: "/education-academic/academic/academic-year",
      },
      {
        icon: Clock,
        name: "Class Schedules",
        key: "class-schedules",
        url: "/education-academic/academic/class-schedules",
      },
      {
        icon: ChartLine,
        name: "Grade & Reports",
        key: "grade-reports",
        url: "/education-academic/academic/grade-reports",
      },
      {
        icon: Cog,
        name: "Settings",
        key: "settings",
        url: "/education-academic/academic/settings",
      },
    ],
  },
];
