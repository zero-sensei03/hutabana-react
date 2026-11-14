import { useState } from "react";
import { format, addMonths, subMonths, isSameMonth, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight, Clock, MapPin, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/errors/EmptyState";
import type { ScheduleRes } from "@/interfaces/academic-education/academic/calendar-schedule.interface";

export default function AcademicCalendarPage() {
  const [month, setMonth] = useState(new Date());

  const [isLoading] = useState<boolean>(false);
  const isCurrentMonth = isSameMonth(month, new Date());
  const FETCH_DATA: ScheduleRes[] = [];

  const navigate = useNavigate();

  return (
    <main className="mx-auto w-full space-y-8 pb-10">
      {/* Header Section */}
      <header className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Academic Calendar
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Manage and track scheduled academic events, institutional
            milestones, and workspace activities.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {!isCurrentMonth && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMonth(new Date())}
            >
              Today
            </Button>
          )}
          <Button
            render={
              <Link to="/education-academic/academic/schedule-event/create" />
            }
          >
            <Plus className="mr-2 size-4" aria-hidden="true" />
            Create Event
          </Button>
        </div>
      </header>

      {/* Main Calendar Card */}
      <Card className="overflow-hidden shadow-xs">
        <CardHeader className="flex flex-col gap-4 border-b bg-muted/20 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl font-bold tracking-tight">
                {format(month, "MMMM yyyy")}
              </CardTitle>
              <Badge
                variant="secondary"
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              >
                {FETCH_DATA.length} event{FETCH_DATA.length === 1 ? "" : "s"}{" "}
                scheduled
              </Badge>
            </div>
            <CardDescription>
              Showing active schedule items for this month
            </CardDescription>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg"
              aria-label="Previous month"
              onClick={() => setMonth((value) => subMonths(value, 1))}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 rounded-lg font-medium"
              onClick={() => setMonth(new Date())}
            >
              This Month
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg"
              aria-label="Next month"
              onClick={() => setMonth((value) => addMonths(value, 1))}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div>
                <Skeleton key={index} className="h-18 m-2" />
              </div>
            ))
          ) : FETCH_DATA.length ? (
            <div className="divide-y">
              {FETCH_DATA.map((event) => {
                const parsedDate = parseISO(event.date!);
                const dayName = format(parsedDate, "EEE").toUpperCase();
                const dayNumber = format(parsedDate, "d");

                return (
                  <Link
                    key={event.id}
                    to={`/education-academic/academic/calendar-events/${event.id}`}
                    className="group flex flex-col gap-4 px-6 py-4.5 outline-none transition-colors hover:bg-muted/40 focus-visible:bg-muted/60 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      {/* Date Badge Box */}
                      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border bg-card text-center shadow-2xs transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
                        <span className="text-[10px] font-bold tracking-wider text-primary">
                          {dayName}
                        </span>
                        <span className="text-base font-bold leading-none text-foreground tabular-nums">
                          {dayNumber}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-semibold text-foreground group-hover:text-primary transition-colors">
                            {event.name}
                          </p>
                          {event.type && (
                            <Badge
                              variant="outline"
                              className="hidden shrink-0 text-[10px] font-medium uppercase tracking-wider sm:inline-flex"
                            >
                              {event.type}
                            </Badge>
                          )}
                        </div>

                        <p className="line-clamp-1 text-xs text-muted-foreground">
                          {event.description ??
                            "No additional description provided for this academic session."}
                        </p>
                      </div>
                    </div>

                    {/* Metadata (Time & Location) */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-16 text-xs text-muted-foreground sm:pl-0 sm:shrink-0 sm:text-right">
                      {event.startTime && (
                        <div className="inline-flex items-center gap-1">
                          <Clock className="size-3.5 text-muted-foreground/70" />
                          <span className="font-medium text-foreground">
                            {event.startTime}
                          </span>
                        </div>
                      )}
                      {event.location && (
                        <div className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5 text-muted-foreground/70" />
                          <span className="truncate max-w-37.5">
                            {event.location}
                          </span>
                        </div>
                      )}
                      {!event.startTime && !event.location && (
                        <span className="font-medium text-foreground">
                          {format(parsedDate, "EEEE, MMMM d, yyyy")}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <EmptyState
              onAction={() =>
                navigate("/education-academic/academic/schedule-event/create")
              }
              actionLabel="Add event for this month"
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
