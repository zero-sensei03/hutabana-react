import { useEffect, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Clock,
  GraduationCap,
  LayoutGrid,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Users,
  X,
  CheckCheck,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoutModal } from "@/components/modal/LogoutModal";
import { useLocation, useNavigate } from "react-router";
import { useModuleStore } from "@/stores/useModuleStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  dashboardDemoProfiles,
  useDashboardWorkspaceStore,
  type DemoWorkspace,
} from "@/pages/workspace/dashboard-workspace/dashboard-workspace-state";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "cn";
import { useLayoutStore } from "@/stores/useLayoutStore";

type AdminHeaderProps = {
  onMenuClick?: () => void;
};

const searchItems = [
  {
    label: "Dashboard & Workspace",
    description: "Organization overview and available launchers",
    href: "/education-academic/dashboard-and-workspace",
    icon: LayoutDashboard,
    moduleSlug: "dashboard-and-workspace",
  },
  {
    label: "Launcher catalog",
    description: "Browse configured and planned modules",
    href: "/portal",
    icon: LayoutGrid,
  },
  {
    label: "Academic Management",
    description: "Academic records, schedules, and activities",
    href: "/education-academic/academic",
    icon: GraduationCap,
    moduleSlug: "academic",
  },
  {
    label: "Students / Participants",
    description: "Browse Academic Management student records",
    href: "/education-academic/academic/students",
    icon: Users,
    moduleSlug: "academic",
  },
  {
    label: "Academic Calendar",
    description: "View scheduled academic events",
    href: "/education-academic/academic/calendar",
    icon: CalendarDays,
    moduleSlug: "academic",
  },
];

function useCurrentDateTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(now);

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  return { date, time, timeZone };
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { isCollapsed } = useLayoutStore();
  const { date, time, timeZone } = useCurrentDateTime();
  const navigate = useNavigate();
  const location = useLocation();
  const moduleInfo = useModuleStore((state) => state.moduleInfo);
  const workspace = useDashboardWorkspaceStore((state) => state.workspace);
  const setWorkspace = useDashboardWorkspaceStore(
    (state) => state.setWorkspace,
  );
  const notifications = useDashboardWorkspaceStore(
    (state) => state.notifications,
  );
  const markNotificationRead = useDashboardWorkspaceStore(
    (state) => state.markNotificationRead,
  );
  const markAllNotificationsRead = useDashboardWorkspaceStore(
    (state) => state.markAllNotificationsRead,
  );
  const profile = dashboardDemoProfiles[workspace];

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const enabledModules = new Set(
    (moduleInfo ?? []).flatMap((category) =>
      category.modules
        .filter((module) => module.is_active)
        .map((module) => module.slug),
    ),
  );
  const filteredItems = searchItems.filter((item) => {
    if (workspace !== "Staff" && item.moduleSlug === "academic") return false;
    if (item.moduleSlug && !enabledModules.has(item.moduleSlug)) return false;
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return (
      item.label.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  const navigateTo = (href: string) => {
    setSearchOpen(false);
    if (href.startsWith("/education-academic/")) {
      useDashboardWorkspaceStore
        .getState()
        .recordLauncherUse(
          href.includes("/academic") ? "academic" : "dashboard-and-workspace",
        );
    }
    navigate(href);
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const modifierPressed = isMac ? event.metaKey : event.ctrlKey;

      if (modifierPressed && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);

        window.setTimeout(() => {
          document.getElementById("admin-global-search")?.focus();
        }, 0);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/70 bg-white backdrop-blur-xl",
        {
          "md:ps-64": !isCollapsed,
          "md:ps-16": isCollapsed,
        },
      )}
    >
      <div className="flex h-18 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Mobile sidebar toggle */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu className="size-5" />
        </Button>

        {/* Date and time */}
        <div className="hidden min-w-0 flex-col gap-1 xl:flex">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold tabular-nums">
            <Clock className="size-3.5 text-primary" />

            <span>{time}</span>

            <span className="size-1.5 rounded-full bg-emerald-500" />

            <span
              className="text-xs font-normal text-muted-foreground"
              title={`Detected timezone: ${timeZone}`}
            >
              {timeZone}
            </span>
          </div>
        </div>

        {/* Global search */}
        <div className="relative ml-auto hidden w-full max-w-md md:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="admin-global-search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && filteredItems[0]) {
                  navigateTo(filteredItems[0].href);
                }

                if (event.key === "Escape") {
                  setSearchOpen(false);
                }
              }}
              placeholder="Search anything..."
              className="h-10 border-border/70 bg-muted/40 pl-9 pr-20 text-sm focus-visible:bg-background"
              autoComplete="off"
            />

            {searchQuery ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
                onClick={() => {
                  setSearchQuery("");
                  setSearchOpen(true);
                  document.getElementById("admin-global-search")?.focus();
                }}
                aria-label="Clear search"
              >
                <X className="size-4" />
              </Button>
            ) : (
              <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded border bg-background px-1.5 py-1 text-[10px] text-muted-foreground lg:inline-flex">
                <span>Ctrl</span>
                <span>K</span>
              </kbd>
            )}
          </div>

          {searchOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-40 cursor-default"
                aria-label="Close search results"
                onClick={() => setSearchOpen(false)}
              />

              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border bg-popover p-2 text-popover-foreground shadow-xl">
                <div className="flex items-center justify-between px-2 py-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    {searchQuery ? "Search results" : "Quick navigation"}
                  </p>

                  <span className="text-[10px] text-muted-foreground">
                    {filteredItems.length} items
                  </span>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={() => navigateTo(item.href)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted"
                        >
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Icon className="size-4 text-muted-foreground" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="truncate text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-3 py-8 text-center">
                      <Search className="mx-auto mb-2 size-5 text-muted-foreground" />
                      <p className="text-sm font-medium">No results found</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Try another search term.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-1 flex items-center gap-2 border-t px-3 pt-2 text-[10px] text-muted-foreground">
                  <span>Press Enter to open the first result</span>
                  <span className="ml-auto">Esc to close</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-muted"
              aria-label={`Notifications${notifications.some((item) => !item.read) ? `, ${notifications.filter((item) => !item.read).length} unread` : ""}`}
            >
              <Bell className="size-5" />
              {notifications.some((item) => !item.read) && (
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-85 max-w-[calc(100vw-2rem)] p-0"
            >
              <div className="border-b px-4 py-3">
                <p className="text-sm font-semibold">Notifications</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Demo notifications · changes reset on refresh.
                </p>
              </div>
              {notifications.length ? (
                <>
                  <div className="max-h-72 divide-y overflow-y-auto">
                    {notifications.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => {
                          markNotificationRead(item.id);
                          if (item.href) navigateTo(item.href);
                        }}
                        className="items-start gap-3 whitespace-normal px-4 py-3"
                      >
                        <span
                          className={`mt-1.5 size-2 shrink-0 rounded-full ${item.read ? "bg-muted" : "bg-primary"}`}
                        />
                        <span>
                          <span className="block text-sm font-medium">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {item.body}
                          </span>
                          <span className="mt-1 block text-[10px] text-muted-foreground">
                            {item.date}
                          </span>
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <div className="border-t p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={markAllNotificationsRead}
                    >
                      <CheckCheck />
                      Mark all as read
                    </Button>
                  </div>
                </>
              ) : (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                  You are all caught up.
                </p>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Divider */}
          <div className="hidden h-8 w-px shrink-0 bg-border sm:block" />

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex min-w-0 shrink-0 items-center gap-2 rounded-lg p-1.5 text-left transition-colors hover:bg-muted">
              <Avatar className="size-9 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                  {profile.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="hidden min-w-0 flex-col items-start lg:flex">
                <span className="max-w-32 truncate text-sm font-semibold">
                  {profile.name}
                </span>

                <span className="text-xs text-muted-foreground">
                  {workspace} demo workspace
                </span>
              </div>

              <ChevronDown className="hidden size-4 text-muted-foreground lg:block" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60 p-2">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-primary/10 font-semibold text-primary">
                        {profile.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {profile.name}
                      </p>
                      <p className="truncate text-xs font-normal text-muted-foreground">
                        {profile.role} · not an authenticated identity
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="px-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                  Switch demo presentation
                </DropdownMenuLabel>
                {(["Staff", "Student", "Parent"] as DemoWorkspace[]).map(
                  (item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => {
                        setWorkspace(item);
                        if (
                          location.pathname.startsWith(
                            "/education-academic/academic",
                          )
                        ) {
                          navigateTo(
                            "/education-academic/dashboard-and-workspace",
                          );
                        }
                      }}
                      className="gap-2.5 py-2"
                    >
                      <span
                        className={`size-2 rounded-full ${workspace === item ? "bg-primary" : "bg-muted-foreground/30"}`}
                      />
                      {item} Workspace{workspace === item ? " · current" : ""}
                    </DropdownMenuItem>
                  ),
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => setProfileOpen(true)}
                  className="gap-2.5 py-2"
                >
                  <Users className="size-4 text-muted-foreground" />
                  Demo profile overview
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigateTo("/portal")}
                  className="gap-2.5 py-2"
                >
                  <LayoutGrid className="size-4 text-muted-foreground" />
                  Launcher catalog
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setLogoutOpen(true)}
                className="gap-2.5 py-2 text-destructive focus:text-destructive"
              >
                <LogOut className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <LogoutModal
        isOpen={logoutOpen}
        onOpenChange={() => setLogoutOpen((current) => !current)}
      />
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{profile.name}</DialogTitle>
            <DialogDescription>{profile.role}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 rounded-lg border p-4 text-sm">
            <p>
              <span className="text-muted-foreground">Organization: </span>
              MeiFaLabs Demo Organization
            </p>
            <p>
              <span className="text-muted-foreground">Presentation: </span>
              {workspace} Workspace
            </p>
            <p className="text-xs text-muted-foreground">
              This local demo profile is not provided by authentication and does
              not describe actual account permissions.
            </p>
          </div>
          <Button variant="outline" onClick={() => setProfileOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default AdminHeader;
