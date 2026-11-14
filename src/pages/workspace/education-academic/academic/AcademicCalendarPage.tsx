import { useState } from "react";
import { format, addMonths, subMonths, isSameMonth, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DemoDataNotice } from "./DemoDataNotice";
import { useAcademicStudents } from "./academic-students-state";

export default function AcademicCalendarPage() {
  const [month, setMonth] = useState(new Date());
  const { data } = useAcademicStudents();
  const events = [...data["calendar-events"], ...data.activities]
    .filter((event) => event.date && isSameMonth(parseISO(event.date), month))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Overview</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Academic Calendar
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Academic events and activities from the current demo workspace.
          </p>
        </div>
        <Button render={<Link to="../calendar-events/new" />}>
          <Plus aria-hidden="true" />
          Create event
        </Button>
      </header>
      <DemoDataNotice />
      <Card>
        <CardHeader className="flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>{format(month, "MMMM yyyy")}</CardTitle>
            <CardDescription>
              {events.length} event{events.length === 1 ? "" : "s"} in this
              month
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous month"
              onClick={() => setMonth((value) => subMonths(value, 1))}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next month"
              onClick={() => setMonth((value) => addMonths(value, 1))}
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="divide-y p-0">
          {events.length ? (
            events.map((event) => (
              <Link
                key={event.id}
                to={`/education-academic/academic/calendar-events/${event.id}`}
                className="flex flex-col gap-2 px-5 py-4 outline-none hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  <span className="block font-medium">{event.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {event.description ?? event.type ?? "Academic activity"}
                    {event.location ? ` · ${event.location}` : ""}
                  </span>
                </span>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {format(parseISO(event.date!), "EEE, d MMM")}
                  {event.startTime ? ` · ${event.startTime}` : ""}
                </span>
              </Link>
            ))
          ) : (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">
              No events are scheduled for this month.
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
