import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Sparkles,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AcademicCalendarCreatePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    date: new Date().toISOString().slice(0, 10),
    startTime: "",
    endTime: "",
    location: "",
    type: "Academic",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi penyimpanan (integrasikan dengan fungsi state Anda, misal: data.addEvent(formData))
    setTimeout(() => {
      setIsSubmitting(false);
      // Kembali ke halaman kalender utama setelah sukses
      navigate("/education-academic/academic/schedule-event");
    }, 600);
  };

  return (
    <main className="mx-auto w-full space-y-8 pb-12">
      {/* Header dengan Back Button */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              to="/education-academic/academic/schedule-event"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Back to Calendar
            </Link>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Create Academic Event
          </h1>
          <p className="text-sm text-muted-foreground">
            Schedule a new institutional event, exam, workshop, or academic
            milestone.
          </p>
        </div>
      </header>

      {/* Form Card */}
      <Card className="shadow-xs">
        <form onSubmit={handleSubmit}>
          <CardHeader className="border-b bg-muted/20 pb-5">
            <CardTitle className="text-lg">Event Information</CardTitle>
            <CardDescription>
              Fill in the details below to publish this event to the academic
              calendar.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* Event Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-wider text-foreground"
              >
                Event Title <span className="text-destructive">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="e.g., Mid-Term Examination 2026"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Grid for Date & Type */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5"
                >
                  <CalendarIcon className="size-3.5 text-primary" />
                  Date <span className="text-destructive">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="type"
                  className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5"
                >
                  <Tag className="size-3.5 text-primary" />
                  Event Category
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Academic">Academic Session</option>
                  <option value="Exam">Examination</option>
                  <option value="Workshop">Workshop / Seminar</option>
                  <option value="Holiday">Holiday / Break</option>
                  <option value="Meeting">Faculty Meeting</option>
                </select>
              </div>
            </div>

            {/* Grid for Times */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="startTime"
                  className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5"
                >
                  <Clock className="size-3.5 text-primary" />
                  Start Time
                </label>
                <input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="endTime"
                  className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5"
                >
                  <Clock className="size-3.5 text-primary" />
                  End Time
                </label>
                <input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5"
              >
                <MapPin className="size-3.5 text-primary" />
                Location / Room
              </label>
              <input
                id="location"
                type="text"
                placeholder="e.g., Auditorium Hall A / Room 302"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-xs font-semibold uppercase tracking-wider text-foreground"
              >
                Description & Notes
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Provide a summary or instructions regarding this event..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Form Footer Actions */}
            <div className="flex items-center justify-end gap-3 border-t pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("../calendar")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Sparkles className="mr-2 size-4" />
                {isSubmitting ? "Saving..." : "Create Event"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </main>
  );
}
