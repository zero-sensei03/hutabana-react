import { Link, useNavigate, useParams } from "react-router";
import { format, parseISO } from "date-fns";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Edit,
  MapPin,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAcademicStudents } from "../academic-students-state";
import EmptyState from "@/components/errors/EmptyState";

export default function AcademicCalendarDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useAcademicStudents();

  const allEvents = [...data["calendar-events"], ...data.activities];
  const event = allEvents.find((item) => String(item.id) === String(id));

  if (!event) {
    return (
      <main className="mx-auto flex w-full flex-col items-center justify-center py-20 text-center space-y-4 bg-white shadow-md rounded-md">
        <EmptyState
          title="Event Not Found"
          description="The event you are looking for does not exist or has been removed."
          onAction={() =>
            navigate("/education-academic/academic/schedule-event")
          }
          actionLabel="Back to Calendar"
        />
      </main>
    );
  }

  const parsedDate = event.date ? parseISO(event.date) : new Date();

  return (
    <main className="mx-auto w-full space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            to="/education-academic/academic/schedule-event"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to Calendar
          </Link>
          <div className="flex items-center gap-3 pt-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {event.name}
            </h1>
            <Badge
              variant="secondary"
              className="uppercase text-xs font-semibold"
            >
              {event.type ?? "Academic"}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            render={
              <Link
                to={`/education-academic/academic/schedule-event/edit/${event.id}`}
              />
            }
          >
            <Edit className="mr-1.5 size-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              if (confirm("Are you sure you want to delete this event?")) {
                // Lakukan aksi hapus di state jika ada
                navigate("/education-academic/academic/schedule-event");
              }
            }}
          >
            <Trash2 className="mr-1.5 size-4" />
            Delete
          </Button>
        </div>
      </header>

      {/* Detail Content Card */}
      <Card className="shadow-xs">
        <CardHeader className="border-b bg-muted/20 pb-5">
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="rounded-lg border bg-background p-2 text-primary">
                <CalendarIcon className="size-4" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider font-semibold">
                  Date
                </span>
                <span className="font-medium text-foreground">
                  {format(parsedDate, "EEEE, MMMM d, yyyy")}
                </span>
              </div>
            </div>

            {(event.startTime || event.endTime) && (
              <div className="flex items-center gap-2">
                <div className="rounded-lg border bg-background p-2 text-primary">
                  <Clock className="size-4" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider font-semibold">
                    Time
                  </span>
                  <span className="font-medium text-foreground">
                    {event.startTime ?? "--:--"}{" "}
                    {event.endTime ? `- ${event.endTime}` : ""}
                  </span>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-2">
                <div className="rounded-lg border bg-background p-2 text-primary">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider font-semibold">
                    Location
                  </span>
                  <span className="font-medium text-foreground">
                    {event.location}
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Description & Notes
            </h3>
            <div className="rounded-xl border bg-muted/30 p-4 text-sm text-foreground leading-relaxed">
              {event.description ??
                "No detailed description or notes have been added for this academic activity."}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 border-t pt-6 text-xs text-muted-foreground">
            <div>
              <span className="font-semibold text-foreground">Event ID:</span>{" "}
              {event.id}
            </div>
            <div>
              <span className="font-semibold text-foreground">
                Workspace Source:
              </span>{" "}
              Academic Calendar Registry
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
