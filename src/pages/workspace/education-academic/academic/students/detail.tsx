import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Edit,
  Trash2,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { initialStudentsData } from "@/interfaces/academic-education/academic/students.interface";
import EmptyState from "@/components/errors/EmptyState";

export default function StudentsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = initialStudentsData.find((s) => String(s.id) === String(id));

  if (!student) {
    return (
      <main className="mx-auto flex w-full flex-col items-center justify-center py-20 text-center space-y-4 bg-white shadow-md rounded-md">
        <EmptyState
          title="Student Record Not Found"
          description="The student profile you are looking for does not exist or has been removed."
          onAction={() =>
            navigate("/education-academic/academic/students")
          }
          actionLabel="Back to Students Directory"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            to="/education-academic/academic/students"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to Students Directory
          </Link>
          <div className="flex items-center gap-3 pt-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {student.fullName}
            </h1>
            <Badge
              variant={student.enrollmentStatus === "Active" ? "secondary" : "outline"}
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            >
              {student.enrollmentStatus}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" render={<Link to={`/education-academic/academic/students/edit/${id}`} />}>
            <Edit className="mr-1.5 size-4" />
            Edit Profile
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              if (confirm("Are you sure you want to delete this student record?")) {
                navigate("/education-academic/academic/students");
              }
            }}
          >
            <Trash2 className="mr-1.5 size-4" />
            Delete
          </Button>
        </div>
      </header>

      {/* Student Overview Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Personal Details */}
        <Card className="md:col-span-2 shadow-xs">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <CardTitle className="text-base font-bold">Personal & Contact Info</CardTitle>
            <CardDescription>Official institutional identity records</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 pt-6 sm:grid-cols-2">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">NISN</span>
              <p className="font-mono text-sm font-medium text-foreground">{student.nisn}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Gender</span>
              <p className="text-sm font-medium text-foreground">{student.gender}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Email Address</span>
              <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Mail className="size-3.5 text-primary" /> {student.email}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</span>
              <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Phone className="size-3.5 text-primary" /> {student.phone}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Date of Birth</span>
              <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Calendar className="size-3.5 text-primary" /> {student.dateOfBirth}
              </p>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Residential Address</span>
              <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" /> {student.address}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Guardian Card */}
        <Card className="shadow-xs">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <CardTitle className="text-base font-bold">Guardian Details</CardTitle>
            <CardDescription>Primary contact person</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Guardian Name</span>
              <p className="text-sm font-semibold text-foreground">{student.guardianName}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Guardian Phone</span>
              <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Phone className="size-3.5 text-primary" /> {student.guardianPhone}
              </p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-3.5 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Current Placement:</span> {student.currentClass} ({student.academicYear})
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class History Table (Riwayat Kelas) */}
      <Card className="shadow-xs">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <GraduationCap className="size-5 text-primary" /> Class Enrollment History
              </CardTitle>
              <CardDescription>
                Chronological record of class progression across semesters and academic years
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="pl-6">Class Level</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Homeroom Teacher</TableHead>
                <TableHead>GPA / Score</TableHead>
                <TableHead className="text-right pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {student.classHistory && student.classHistory.length > 0 ? (
                student.classHistory.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell className="pl-6 font-semibold text-foreground">
                      {history.className}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs font-mono">
                      {history.academicYear}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {history.semester}
                    </TableCell>
                    <TableCell className="text-xs text-foreground font-medium">
                      {history.homeroomTeacher}
                    </TableCell>
                    <TableCell className="text-xs font-mono font-medium text-foreground">
                      {history.gpa ? (
                        <span className="inline-flex items-center gap-1">
                          <Award className="size-3.5 text-amber-500" /> {history.gpa}
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Badge
                        variant={history.status === "Active" ? "default" : "outline"}
                        className="rounded-full px-2.5 py-0.5 text-[10px]"
                      >
                        {history.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No class history records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}