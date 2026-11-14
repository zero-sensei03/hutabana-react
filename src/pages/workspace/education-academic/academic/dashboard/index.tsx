import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  GraduationCap,
  Layers,
  MapPin,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import EmptyState from "@/components/errors/EmptyState";
import type { ScheduleRes } from "@/interfaces/academic-education/academic/calendar-schedule.interface";

type activityProps = {
  id: string;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  periodId: string;
  status: string;
  createdAt: string;
};

const statCards = [
  {
    title: "Total Students",
    subtitle: "Enrolled learners",
    collection: "students",
    path: "students",
    icon: GraduationCap,
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    borderHover: "hover:border-blue-500/40",
  },
  {
    title: "Teachers & Staff",
    subtitle: "Active staff",
    collection: "staff",
    path: "staff",
    icon: Users,
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    borderHover: "hover:border-emerald-500/40",
  },
  {
    title: "Active Classes",
    subtitle: "Running courses",
    collection: "classes",
    path: "classes",
    icon: BookOpen,
    accent: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    borderHover: "hover:border-violet-500/40",
  },
  {
    title: "Academic Periods",
    subtitle: "Active terms",
    collection: "periods",
    path: "periods",
    icon: Activity,
    accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    borderHover: "hover:border-amber-500/40",
  },
] as const;

const workspaces = [
  {
    label: "Academic periods",
    description: "Manage semesters, terms, and academic calendars",
    path: "periods",
    icon: CalendarDays,
  },
  {
    label: "Class scheduling",
    description: "Organize timetables, rooms, and session slots",
    path: "schedules",
    icon: Clock,
  },
  {
    label: "Class enrollment",
    description: "Assign students to classes and manage rosters",
    path: "enrollments",
    icon: UserCheck,
  },
  {
    label: "Teaching assignments",
    description: "Allocate instructors to courses and subjects",
    path: "teaching-assignments",
    icon: Layers,
  },
  {
    label: "Academic activities",
    description: "Track exams, workshops, and school events",
    path: "activities",
    icon: ClipboardList,
  },
  {
    label: "Academic progress",
    description: "Monitor grades, attendance, and milestones",
    path: "progress",
    icon: TrendingUp,
  },
  {
    label: "Reports & analytics",
    description: "Generate institutional summaries and exports",
    path: "reports",
    icon: BarChart3,
  },
];

function formatDateBadge(dateStr?: string) {
  if (!dateStr) return { month: "TBD", day: "--" };
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return { month: "EVENT", day: "•" };
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
  };
}

export default function DashboardAcademic() {
  const CARD_TOP = useMemo(() => {
    return statCards.map((item) => ({
      ...item,
      count: 0,
    }));
  }, []);
  const UPCOMING_EVENT: ScheduleRes[] = [];
  const RECENT_ACTIVIRTIES: activityProps[] = [];

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 pb-10">
      <header className="flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Academic Management
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Centralized overview of student records, faculty operations, and
            upcoming institutional schedules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="outline" render={<Link to="schedule-event" />}>
            <Calendar className="mr-2 size-4" aria-hidden="true" />
            Schedule & Event
          </Button>
        </div>
      </header>

      {/* KPI Metrics Grid */}
      <section aria-label="Key academic metrics">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CARD_TOP.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                to={card.path}
                className="group block outline-none"
              >
                <Card
                  className={`h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring ${card.borderHover}`}
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardDescription className="font-medium text-foreground/80">
                        {card.title}
                      </CardDescription>
                      <div className="text-3xl font-bold tracking-tight tabular-nums">
                        {card.count}
                      </div>
                    </div>
                    <div className={`rounded-xl p-2.5 ${card.accent}`}>
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{card.subtitle}</span>
                      <span className="inline-flex items-center font-medium text-primary opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100">
                        Manage
                        <ArrowUpRight
                          className="ml-0.5 size-3.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main Content Split: Upcoming & Recent */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Academic Activity */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <div>
              <CardTitle className="text-lg">Upcoming Schedule</CardTitle>
              <CardDescription className="mt-0.5">
                Next scheduled events and academic milestones
              </CardDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              render={<Link to="schedule-event" />}
            >
              Full Schedule
              <ArrowUpRight className="ml-1.5 size-3.5" aria-hidden="true" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 divide-y p-0">
            {UPCOMING_EVENT.length ? (
              UPCOMING_EVENT.map((event) => {
                const { month, day } = formatDateBadge(event.date);
                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg border bg-muted/50 text-center">
                      <span className="text-[10px] font-bold tracking-wider text-primary">
                        {month}
                      </span>
                      <span className="text-base font-bold leading-none tabular-nums">
                        {day}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-foreground">
                        {event.name}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        {event.startTime && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="size-3.5" aria-hidden="true" />
                            {event.startTime}
                          </span>
                        )}
                        {event.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3.5" aria-hidden="true" />
                            {event.location}
                          </span>
                        )}
                        {!event.startTime && !event.location && (
                          <span>{event.date}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyState />
            )}
          </CardContent>
        </Card>

        {/* Recent Academic Activities */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <div>
              <CardTitle className="text-lg">Recent Activities</CardTitle>
              <CardDescription className="mt-0.5">
                Latest logged records and academic updates
              </CardDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              render={<Link to="activities" />}
            >
              View All
              <ArrowUpRight className="ml-1.5 size-3.5" aria-hidden="true" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 divide-y p-0">
            {RECENT_ACTIVIRTIES.length ? (
              RECENT_ACTIVIRTIES.map((activity) => (
                <Link
                  key={activity.id}
                  to={`activities/${activity.id}`}
                  className="group flex items-center justify-between gap-4 px-6 py-4 outline-none transition-colors hover:bg-muted/40 focus-visible:bg-muted/60"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-1.5 text-primary">
                      <CheckCircle2 className="size-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium transition-colors group-hover:text-primary">
                        {activity.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Logged on {activity.date ?? activity.createdAt}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Link>
              ))
            ) : (
              <EmptyState />
            )}
          </CardContent>
        </Card>
      </section>

      {/* Academic Workspaces Directory */}
      <section aria-label="Academic workspaces">
        <Card>
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-lg">Academic Workspaces</CardTitle>
            <CardDescription>
              Direct navigation to core operational modules and management tools
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {workspaces.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group flex flex-col justify-between rounded-xl border bg-card p-4 outline-none transition-all duration-200 hover:border-primary/40 hover:bg-muted/30 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="rounded-lg border bg-background p-2 text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
                        <Icon className="size-4" aria-hidden="true" />
                      </div>
                      <ArrowUpRight
                        className="size-4 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary">
                        {item.label}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
