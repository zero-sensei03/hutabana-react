import { create } from "zustand";

export type DemoWorkspace = "Staff" | "Student" | "Parent";

export interface DashboardAnnouncement {
  id: string;
  title: string;
  body: string;
  audience: DemoWorkspace[];
  date: string;
  read: boolean;
}

export interface DashboardNotification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
  href?: string;
  announcementId?: string;
}

export const dashboardDemoProfiles: Record<
  DemoWorkspace,
  { name: string; role: string }
> = {
  Staff: { name: "Alex Morgan", role: "Staff demo profile" },
  Student: { name: "Jordan Lee", role: "Student demo profile" },
  Parent: { name: "Taylor Lee", role: "Parent demo profile" },
};

interface DashboardWorkspaceState {
  workspace: DemoWorkspace;
  selectedDependent: string;
  favorites: string[];
  recentlyUsed: string[];
  announcements: DashboardAnnouncement[];
  notifications: DashboardNotification[];
  setWorkspace: (workspace: DemoWorkspace) => void;
  setSelectedDependent: (dependent: string) => void;
  toggleFavorite: (slug: string) => void;
  recordLauncherUse: (slug: string) => void;
  markAnnouncementRead: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const initialAnnouncements: DashboardAnnouncement[] = [
  {
    id: "announcement-001",
    title: "Welcome to the workspace demo",
    body: "This sample announcement demonstrates organization updates. It is prototype content and is not an official notice.",
    audience: ["Staff", "Student", "Parent"],
    date: "2026-11-12",
    read: false,
  },
  {
    id: "announcement-002",
    title: "Learning cycle schedule",
    body: "Sample schedule information is shown for this prototype. Check your organization for confirmed dates.",
    audience: ["Student", "Parent"],
    date: "2026-11-10",
    read: false,
  },
  {
    id: "announcement-003",
    title: "Staff planning reminder",
    body: "A demo reminder to review upcoming activities before the next planning session.",
    audience: ["Staff"],
    date: "2026-11-08",
    read: true,
  },
];

const initialNotifications: DashboardNotification[] = [
  {
    id: "notification-001",
    title: "Workspace demo is ready",
    body: "Choose a presentation context to preview the dashboard.",
    date: "2026-11-14",
    read: false,
  },
  {
    id: "notification-002",
    title: "New sample announcement",
    body: "Welcome to the workspace demo.",
    date: "2026-11-12",
    read: false,
    announcementId: "announcement-001",
  },
];

export const useDashboardWorkspaceStore = create<DashboardWorkspaceState>(
  (set) => ({
    workspace: "Staff",
    selectedDependent: "Avery Lee",
    favorites: ["academic"],
    recentlyUsed: ["academic", "dashboard-and-workspace"],
    announcements: initialAnnouncements,
    notifications: initialNotifications,
    setWorkspace: (workspace) => set({ workspace }),
    setSelectedDependent: (selectedDependent) => set({ selectedDependent }),
    toggleFavorite: (slug) =>
      set((state) => ({
        favorites: state.favorites.includes(slug)
          ? state.favorites.filter((favorite) => favorite !== slug)
          : [...state.favorites, slug],
      })),
    recordLauncherUse: (slug) =>
      set((state) => ({
        recentlyUsed: [
          slug,
          ...state.recentlyUsed.filter((item) => item !== slug),
        ].slice(0, 5),
      })),
    markAnnouncementRead: (id) =>
      set((state) => {
        return {
          announcements: state.announcements.map((item) =>
            item.id === id ? { ...item, read: true } : item,
          ),
          notifications: state.notifications.map((item) =>
            item.announcementId === id ? { ...item, read: true } : item,
          ),
        };
      }),
    markNotificationRead: (id) =>
      set((state) => {
        const notification = state.notifications.find((item) => item.id === id);
        return {
          notifications: state.notifications.map((item) =>
            item.id === id ? { ...item, read: true } : item,
          ),
          announcements: notification?.announcementId
            ? state.announcements.map((item) =>
                item.id === notification.announcementId
                  ? { ...item, read: true }
                  : item,
              )
            : state.announcements,
        };
      }),
    markAllNotificationsRead: () =>
      set((state) => ({
        notifications: state.notifications.map((item) => ({
          ...item,
          read: true,
        })),
        announcements: state.announcements.map((item) =>
          state.notifications.some(
            (notification) => notification.announcementId === item.id,
          )
            ? { ...item, read: true }
            : item,
        ),
      })),
  }),
);
