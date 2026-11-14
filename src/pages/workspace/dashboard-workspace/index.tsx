import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  CalendarClock,
  GraduationCap,
  LayoutGrid,
  Megaphone,
  Star,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModuleStore } from "@/stores/useModuleStore";
import { useAcademicStudents } from "@/pages/workspace/education-academic/academic/academic-students-state";
import {
  dashboardDemoProfiles,
  useDashboardWorkspaceStore,
  type DemoWorkspace,
} from "./dashboard-workspace-state";

const educationCategory = "education-academic";
const dashboardSlug = "dashboard-and-workspace";
const routeByModule: Record<string, string> = {
  [dashboardSlug]: "/education-academic/dashboard-and-workspace",
  academic: "/education-academic/academic",
};
const workspaces: DemoWorkspace[] = ["Staff", "Student", "Parent"];
const dependents = ["Avery Lee", "Casey Lee"];
const demoActivities = [
  {
    id: "activity-staff-001",
    title: "Workspace overview opened",
    detail: "Staff demo session",
    date: "2026-11-14",
    href: "/education-academic/dashboard-and-workspace",
  },
  {
    id: "activity-staff-002",
    title: "Academic Management reviewed",
    detail: "Launcher navigation example",
    date: "2026-11-13",
    href: "/education-academic/academic",
  },
];
const demoTasks = [
  {
    id: "task-001",
    title: "Review upcoming activities",
    owner: "Staff demo",
    href: "/education-academic/academic/calendar",
  },
  {
    id: "task-002",
    title: "Check active student records",
    owner: "Academic Management",
    href: "/education-academic/academic/students",
  },
];
const studentSchedule = [
  {
    id: "student-event-001",
    title: "Study skills seminar",
    detail: "Monday · 09:00 · Learning Studio",
    date: "2026-11-16",
  },
  {
    id: "student-event-002",
    title: "Creative writing lab",
    detail: "Thursday · 09:00 · Learning Studio",
    date: "2026-11-19",
  },
];
const parentSchedules: Record<string, typeof studentSchedule> = {
  "Avery Lee": studentSchedule,
  "Casey Lee": [
    {
      id: "parent-event-001",
      title: "Reading circle",
      detail: "Tuesday · 10:00 · Community Library",
      date: "2026-11-17",
    },
  ],
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function DashboardWorkspacePage() {
  const { data } = useAcademicStudents();
  const navigate = useNavigate();
  const moduleInfo = useModuleStore((state) => state.moduleInfo);
  const workspace = useDashboardWorkspaceStore((state) => state.workspace);
  const setWorkspace = useDashboardWorkspaceStore(
    (state) => state.setWorkspace,
  );
  const selectedDependent = useDashboardWorkspaceStore(
    (state) => state.selectedDependent,
  );
  const setSelectedDependent = useDashboardWorkspaceStore(
    (state) => state.setSelectedDependent,
  );
  const announcements = useDashboardWorkspaceStore(
    (state) => state.announcements,
  );
  const markAnnouncementRead = useDashboardWorkspaceStore(
    (state) => state.markAnnouncementRead,
  );
  const favorites = useDashboardWorkspaceStore((state) => state.favorites);
  const toggleFavorite = useDashboardWorkspaceStore(
    (state) => state.toggleFavorite,
  );
  const recordLauncherUse = useDashboardWorkspaceStore(
    (state) => state.recordLauncherUse,
  );
  const recentlyUsed = useDashboardWorkspaceStore(
    (state) => state.recentlyUsed,
  );
  const [search, setSearch] = useState("");
  const [announcementId, setAnnouncementId] = useState<string | null>(null);

  const category = moduleInfo?.find((item) => item.slug === educationCategory);
  const configuredModules =
    category?.modules.filter((module) => module.is_active) ?? [];
  const canViewAcademic = configuredModules.some(
    (module) => module.slug === "academic",
  );
  const availableLaunchers = configuredModules.filter((module) => {
    if (module.slug === dashboardSlug) return false;
    if (workspace === "Student") return module.slug === "lms-and-learning";
    if (workspace === "Parent")
      return module.slug === "parent-and-student-portal";
    return true;
  });
  const profile = dashboardDemoProfiles[workspace];
  const now = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone }).format(now);

  const academicEvents = canViewAcademic
    ? [...data["calendar-events"], ...data.activities]
        .filter((event) => event.date && event.date >= today)
        .sort((a, b) => String(a.date).localeCompare(String(b.date)))
        .slice(0, 4)
    : [];
  const summaries = canViewAcademic
    ? [
        {
          label: "Active students / participants",
          value: data.students.filter((item) => item.status === "Active")
            .length,
          icon: GraduationCap,
        },
        {
          label: "Active instructors",
          value: data.teachers.filter((item) => item.status === "Active")
            .length,
          icon: Users,
        },
        {
          label: "Active classes / groups",
          value: data.classes.filter((item) => item.status === "Active").length,
          icon: BookOpen,
        },
        {
          label: "Active academic periods",
          value: data.periods.filter((item) => item.status === "Active").length,
          icon: CalendarClock,
        },
      ]
    : [];
  const audienceAnnouncements = announcements.filter((item) =>
    item.audience.includes(workspace),
  );
  const visibleLaunchers = availableLaunchers.filter((module) =>
    `${module.module_name} ${module.description}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );
  const recentLaunchers = recentlyUsed.filter(
    (slug) =>
      routeByModule[slug] &&
      availableLaunchers.some((module) => module.slug === slug),
  );
  const favoriteLaunchers = favorites.filter(
    (slug) =>
      routeByModule[slug] &&
      availableLaunchers.some((module) => module.slug === slug),
  );
  const schedule =
    workspace === "Student"
      ? studentSchedule
      : workspace === "Parent"
        ? parentSchedules[selectedDependent]
        : [];
  const selectedAnnouncement = audienceAnnouncements.find(
    (item) => item.id === announcementId,
  );
  const contextualEvents =
    workspace === "Staff"
      ? academicEvents.map((event) => ({
          id: event.id,
          title: event.name ?? "Academic activity",
          detail: `${event.type ?? "Academic activity"}${event.location ? ` · ${event.location}` : ""}`,
          date: event.date ?? "",
          href: `/education-academic/academic/${data["calendar-events"].some((item) => item.id === event.id) ? "calendar-events" : "activities"}/${event.id}`,
          startTime: event.startTime,
        }))
      : schedule.map((event) => ({
          ...event,
          href: undefined,
          startTime: undefined,
        }));

  const openLauncher = (slug: string) => {
    const destination = routeByModule[slug];
    if (!destination) return;
    recordLauncherUse(slug);
    navigate(destination);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <header className="flex flex-col gap-5 rounded-2xl border bg-card p-5 sm:p-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <LayoutGrid className="size-4 text-primary" aria-hidden="true" />
            <span>MeiFaLabs Demo Organization</span>
            <span aria-hidden="true">/</span>
            <Badge variant="secondary">{workspace} Workspace · demo</Badge>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {workspace === "Staff"
              ? "Organization overview"
              : `Welcome, ${profile.name.split(" ")[0]}`}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {workspace === "Staff"
              ? "A shared operational view of available modules and organization activity."
              : workspace === "Student"
                ? "Your learning schedule, classes, and relevant updates."
                : "Schedules and updates for the selected demo dependent."}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Prototype only: workspace selection is not authenticated or
            authorized by a backend. Demo changes are in memory and reset on
            refresh.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="workspace-select">
            Switch demo workspace
          </label>
          <select
            id="workspace-select"
            value={workspace}
            onChange={(event) =>
              setWorkspace(event.target.value as DemoWorkspace)
            }
            className="h-10 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {workspaces.map((item) => (
              <option key={item} value={item}>
                {item} Workspace (demo)
              </option>
            ))}
          </select>
          <Button variant="outline" render={<Link to="/portal" />}>
            <LayoutGrid aria-hidden="true" />
            Browse launcher catalog
          </Button>
        </div>
      </header>

      {workspace === "Staff" && (
        <>
          {canViewAcademic ? (
            <section aria-labelledby="summary-heading" className="space-y-3">
              <div>
                <h2 id="summary-heading" className="text-lg font-semibold">
                  Operational overview
                </h2>
                <p className="text-sm text-muted-foreground">
                  Derived from the shared Academic Management demo records.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {summaries.map(({ label, value, icon: Icon }) => (
                  <Card key={label}>
                    <CardHeader className="flex-row items-center justify-between gap-3">
                      <div className="space-y-1">
                        <CardDescription>{label}</CardDescription>
                        <CardTitle className="text-2xl">{value}</CardTitle>
                      </div>
                      <div className="rounded-lg bg-primary/10 p-3 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Operational overview</CardTitle>
                <CardDescription>
                  Academic Management is not enabled in the current launcher
                  configuration.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                No academic counts are shown. Workspace selection does not
                enable module access.
              </CardContent>
            </Card>
          )}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pending actions</CardTitle>
                <CardDescription>
                  Illustrative staff checklist for this demo.
                </CardDescription>
              </CardHeader>
              <CardContent className="divide-y">
                {canViewAcademic ? (
                  demoTasks.map((task) => (
                    <Link
                      key={task.id}
                      to={task.href}
                      className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 hover:text-primary"
                    >
                      <span>
                        <span className="block text-sm font-medium">
                          {task.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {task.owner}
                        </span>
                      </span>
                      <ArrowRight className="size-4 shrink-0" />
                    </Link>
                  ))
                ) : (
                  <p className="py-3 text-sm text-muted-foreground">
                    No actionable tasks are available because no task source is
                    connected.
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
                <CardDescription>
                  Explicit demo activity records; not an audit log.
                </CardDescription>
              </CardHeader>
              <CardContent className="divide-y">
                {demoActivities
                  .filter(
                    (item) =>
                      item.id !== "activity-staff-002" || canViewAcademic,
                  )
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 hover:text-primary"
                    >
                      <Activity className="mt-0.5 size-4 shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">
                          {item.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.detail} · {formatDate(item.date)}
                        </span>
                      </span>
                      <ArrowRight className="size-4 shrink-0" />
                    </Link>
                  ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {workspace !== "Staff" && (
        <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>
                {workspace === "Student"
                  ? "My classes and schedule"
                  : "Dependent schedule"}
              </CardTitle>
              <CardDescription>
                {workspace === "Student"
                  ? "Sample learner records scoped to this demo profile."
                  : "Schedule is scoped to the selected demo dependent."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {workspace === "Parent" && (
                <div className="mb-4 space-y-2">
                  <label
                    htmlFor="dependent-select"
                    className="text-sm font-medium"
                  >
                    Select demo dependent
                  </label>
                  <select
                    id="dependent-select"
                    value={selectedDependent}
                    onChange={(event) =>
                      setSelectedDependent(event.target.value)
                    }
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  >
                    {dependents.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground">
                    These sample links do not represent verified family
                    relationships.
                  </p>
                </div>
              )}
              {schedule.length ? (
                <div className="divide-y">
                  {schedule.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {event.detail}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatDate(event.date)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No schedule entries are available for this demo profile.
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                {workspace === "Student"
                  ? "Enrolled learning"
                  : "Progress snapshot"}
              </CardTitle>
              <CardDescription>Demo-only learning information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">
                  {workspace === "Student"
                    ? "Study Skills Seminar"
                    : selectedDependent}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {workspace === "Student"
                    ? "Personal learning track · Sample enrollment"
                    : "Learning cycle participation · Sample data"}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                No grades or formal assessment results are displayed.
              </p>
              <Button
                variant="outline"
                className="w-full"
                render={<Link to="/portal" />}
              >
                Browse available learning features
                <ArrowRight />
              </Button>
            </CardContent>
          </Card>
        </section>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>
                {workspace === "Student"
                  ? "Upcoming activities"
                  : workspace === "Parent"
                    ? "Upcoming schedule"
                    : "Upcoming activities"}
              </CardTitle>
              <CardDescription>
                {workspace === "Staff"
                  ? "Academic schedule records when that module is enabled."
                  : "Schedule entries for this demo workspace."}
              </CardDescription>
            </div>
            {workspace === "Staff" && canViewAcademic && (
              <Button
                size="sm"
                variant="ghost"
                render={<Link to="/education-academic/academic/calendar" />}
              >
                View calendar
                <ArrowRight />
              </Button>
            )}
          </CardHeader>
          <CardContent className="divide-y">
            {contextualEvents.length ? (
              contextualEvents.map((event) => {
                const content = (
                  <>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {event.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {event.detail}
                      </p>
                    </div>
                    <span className="shrink-0 text-right text-xs text-muted-foreground">
                      {formatDate(event.date)}
                      {event.startTime
                        ? `, ${event.startTime} (${timeZone})`
                        : ""}
                    </span>
                  </>
                );
                return event.href ? (
                  <Link
                    key={event.id}
                    to={event.href}
                    className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0 hover:text-primary"
                  >
                    {content}
                  </Link>
                ) : (
                  <div
                    key={event.id}
                    className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                  >
                    {content}
                  </div>
                );
              })
            ) : (
              <p className="py-3 text-sm text-muted-foreground">
                {workspace === "Staff" && !canViewAcademic
                  ? "Event data is unavailable because no connected source is enabled."
                  : "No upcoming activities are recorded."}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="size-4" />
              Announcements
            </CardTitle>
            <CardDescription>
              Sample notices for the {workspace.toLowerCase()} demo experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y">
            {audienceAnnouncements.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setAnnouncementId(item.id);
                  markAnnouncementRead(item.id);
                }}
                className="flex w-full items-start gap-3 py-3 text-left first:pt-0 last:pb-0 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${item.read ? "bg-muted" : "bg-primary"}`}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 text-sm font-medium">
                    {item.title}
                    {!item.read && <Badge variant="secondary">New</Badge>}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {formatDate(item.date)}
                  </span>
                </span>
                <ArrowRight className="mt-0.5 size-4 shrink-0" />
              </button>
            ))}
            {!audienceAnnouncements.length && (
              <p className="py-3 text-sm text-muted-foreground">
                No announcements are available.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <section aria-labelledby="launchers-heading" className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="launchers-heading" className="text-lg font-semibold">
              Available launchers
            </h2>
            <p className="text-sm text-muted-foreground">
              Only enabled modules appear. Workspace presentation does not grant
              access.
            </p>
          </div>
          <div className="w-full sm:max-w-xs">
            <label htmlFor="launcher-search" className="sr-only">
              Search available launchers
            </label>
            <Input
              id="launcher-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search launchers"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Favorites:</span>
            {favoriteLaunchers.length ? (
              favoriteLaunchers.map((slug) => (
                <Button
                  key={slug}
                  size="sm"
                  variant="outline"
                  onClick={() => openLauncher(slug)}
                >
                  <Star className="fill-current text-amber-500" />
                  {category?.modules.find((module) => module.slug === slug)
                    ?.module_name ?? slug}
                </Button>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">
                No registered launcher is favorited for this workspace.
              </span>
            )}
          </div>
          {recentLaunchers.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Recently used:
              </span>
              {recentLaunchers.map((slug) => (
                <Button
                  key={slug}
                  size="sm"
                  variant="outline"
                  onClick={() => openLauncher(slug)}
                >
                  {category?.modules.find((module) => module.slug === slug)
                    ?.module_name ?? slug}
                </Button>
              ))}
            </div>
          )}
        </div>
        {visibleLaunchers.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleLaunchers.map((module) => {
              const destination = routeByModule[module.slug];
              const favorite = favorites.includes(module.slug);
              return (
                <Card key={module.code}>
                  <CardHeader className="flex-row items-start justify-between gap-3">
                    <div className="min-w-0">
                      <CardTitle className="text-base">
                        {module.module_name}
                      </CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {module.description}
                      </CardDescription>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`${favorite ? "Remove" : "Add"} ${module.module_name} ${favorite ? "from" : "to"} favorites`}
                      title="Toggle favorite"
                      onClick={() => toggleFavorite(module.slug)}
                    >
                      <Star
                        className={`size-4 ${favorite ? "fill-current text-amber-500" : ""}`}
                      />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {destination ? (
                      <Button
                        className="w-full justify-between"
                        variant="outline"
                        onClick={() => openLauncher(module.slug)}
                      >
                        Open launcher
                        <ArrowRight />
                      </Button>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Enabled in the catalog, but no destination is registered
                        in this prototype.
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-6 text-sm text-muted-foreground">
              {search
                ? "No enabled launchers match your search."
                : "No other launchers are enabled for this account."}
            </CardContent>
          </Card>
        )}
      </section>

      <Card>
        <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            All profiles, activities, schedules, announcements, and tasks shown
            here are demo records held in memory for this session.
          </p>
          <Button variant="outline" render={<Link to="/portal" />}>
            <LayoutGrid />
            Browse all launchers
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(selectedAnnouncement)}
        onOpenChange={(open) => {
          if (!open) setAnnouncementId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
            <DialogDescription>
              Demo announcement ·{" "}
              {selectedAnnouncement
                ? formatDate(selectedAnnouncement.date)
                : ""}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-6 text-muted-foreground">
            {selectedAnnouncement?.body}
          </p>
          <div className="flex justify-end">
            <Button onClick={() => setAnnouncementId(null)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
