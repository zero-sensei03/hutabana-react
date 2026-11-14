import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Sparkles, User, BookOpen, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StudentsCreatePage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    nisn: "",
    gender: "Male",
    email: "",
    phone: "",
    currentClass: "Class 1A",
    academicYear: "2025/2026",
    enrollmentStatus: "Active",
    dateOfBirth: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/education-academic/academic/students");
    }, 600);
  };

  return (
    <main className="mx-auto w-full space-y-8 pb-12">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            to="/education-academic/academic/students"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to Students Directory
          </Link>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Register New Student
          </h1>
          <p className="text-sm text-muted-foreground">
            Add student personal details, guardian contact, and initial class placement.
          </p>
        </div>
      </header>

      <Card className="shadow-xs">
        <form onSubmit={handleSubmit}>
          <CardHeader className="border-b bg-muted/20 pb-5">
            <CardTitle className="text-lg">Student Enrollment Form</CardTitle>
            <CardDescription>
              Complete all mandatory fields to register a student profile.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                <User className="size-4" /> Personal Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Budi Santoso"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    NISN <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 0089234123"
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">Email</label>
                  <input
                    type="email"
                    placeholder="student@school.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+62 812-..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
            </div>

            <hr className="border-border/60" />

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                <BookOpen className="size-4" /> Academic & Class Assignment
              </h3>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Initial Class <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={formData.currentClass}
                    onChange={(e) => setFormData({ ...formData, currentClass: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="Class 1A">Class 1A</option>
                    <option value="Class 1B">Class 1B</option>
                    <option value="Class 2A">Class 2A</option>
                    <option value="Class 3C">Class 3C</option>
                    <option value="Class 4A">Class 4A</option>
                    <option value="Class 5A">Class 5A</option>
                    <option value="Class 6B">Class 6B</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">Academic Year</label>
                  <input
                    type="text"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">Status</label>
                  <select
                    value={formData.enrollmentStatus}
                    onChange={(e) => setFormData({ ...formData, enrollmentStatus: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-border/60" />

            {/* Guardian & Address */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                <Phone className="size-4" /> Guardian & Contact Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">Guardian Name</label>
                  <input
                    type="text"
                    placeholder="Parent/Guardian Name"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">Guardian Phone</label>
                  <input
                    type="text"
                    placeholder="+62 811-..."
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary" /> Residential Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Street address, city..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t pt-5">
              <Button type="button" variant="outline" onClick={() => navigate("/education-academic/academic/students")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Sparkles className="mr-2 size-4" />
                {isSubmitting ? "Saving..." : "Save Student"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </main>
  );
}