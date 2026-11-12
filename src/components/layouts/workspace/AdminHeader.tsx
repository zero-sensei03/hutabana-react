import { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  User,
  Users,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AdminHeaderProps = {
  onMenuClick?: () => void;
};

const searchItems = [
  {
    label: "Dashboard",
    description: "Overview and statistics",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Students",
    description: "Manage student records",
    href: "/admin/students",
    icon: GraduationCap,
  },
  {
    label: "Teachers",
    description: "Manage teachers",
    href: "/admin/teachers",
    icon: Users,
  },
  {
    label: "Courses",
    description: "Manage courses and subjects",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    label: "Attendance",
    description: "View attendance records",
    href: "/admin/attendance",
    icon: CalendarDays,
  },
  {
    label: "Payments",
    description: "Manage payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    label: "Settings",
    description: "Manage application settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

const notifications = [
  {
    id: 1,
    title: "New student registered",
    description: "A new student account has been created.",
    time: "5 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "Payment received",
    description: "A payment has been recorded successfully.",
    time: "20 minutes ago",
    unread: true,
  },
  {
    id: 3,
    title: "Attendance report ready",
    description: "Your latest attendance report is available.",
    time: "1 hour ago",
    unread: false,
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
  const { date, time, timeZone } = useCurrentDateTime();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [unreadIds, setUnreadIds] = useState<number[]>(
    notifications.filter((item) => item.unread).map((item) => item.id),
  );

  const filteredItems = searchItems.filter((item) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return (
      item.label.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  const navigateTo = (href: string) => {
    window.location.assign(href);
  };

  const markAllAsRead = () => {
    setUnreadIds([]);
  };

  const markAsRead = (id: number) => {
    setUnreadIds((current) => current.filter((itemId) => itemId !== id));
  };

  const unreadCount = unreadIds.length;

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
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/90 backdrop-blur-xl">
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
              aria-label="Notifications"
            >
              <Bell className="size-5" />

              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-destructive/80 text-[9px] font-semibold text-white ring-2 ring-background">
                  {unreadCount}
                </span>
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-85 max-w-[calc(100vw-2rem)] p-0"
            >
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    {unreadCount} unread notification
                    {unreadCount === 1 ? "" : "s"}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <Check className="mr-1 size-3.5" />
                  Mark all read
                </Button>
              </div>

              <DropdownMenuGroup>
                {notifications.map((notification) => {
                  const isUnread = unreadIds.includes(notification.id);

                  return (
                    <DropdownMenuItem
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className="items-start gap-3 whitespace-normal px-4 py-3"
                    >
                      <span
                        className={`mt-1.5 size-2 shrink-0 rounded-full ${
                          isUnread ? "bg-primary" : "bg-transparent"
                        }`}
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>

                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {notification.description}
                        </p>

                        <p className="mt-1.5 text-[10px] text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <button
                type="button"
                onClick={() => navigateTo("/admin/notifications")}
                className="w-full px-4 py-3 text-center text-xs font-medium text-primary transition-colors hover:bg-muted"
              >
                View all notifications
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Divider */}
          <div className="hidden h-8 w-px shrink-0 bg-border sm:block" />

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex min-w-0 shrink-0 items-center gap-2 rounded-lg p-1.5 text-left transition-colors hover:bg-muted">
              <Avatar className="size-9 rounded-lg">
                <AvatarImage src="" alt="Administrator" />

                <AvatarFallback className="rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                  AD
                </AvatarFallback>
              </Avatar>

              <div className="hidden min-w-0 flex-col items-start lg:flex">
                <span className="max-w-32 truncate text-sm font-semibold">
                  Administrator
                </span>

                <span className="text-xs text-muted-foreground">
                  Super Admin
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
                        AD
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        Administrator
                      </p>
                      <p className="truncate text-xs font-normal text-muted-foreground">
                        admin@example.com
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => navigateTo("/admin/profile")}
                  className="gap-2.5 py-2"
                >
                  <User className="size-4 text-muted-foreground" />
                  My profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigateTo("/admin/settings")}
                  className="gap-2.5 py-2"
                >
                  <Settings className="size-4 text-muted-foreground" />
                  Account settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigateTo("/admin/security")}
                  className="gap-2.5 py-2"
                >
                  <ShieldCheck className="size-4 text-muted-foreground" />
                  Security
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigateTo("/admin/activity")}
                  className="gap-2.5 py-2"
                >
                  <Activity className="size-4 text-muted-foreground" />
                  Activity log
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => navigateTo("/logout")}
                className="gap-2.5 py-2 text-destructive focus:text-destructive"
              >
                <LogOut className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
