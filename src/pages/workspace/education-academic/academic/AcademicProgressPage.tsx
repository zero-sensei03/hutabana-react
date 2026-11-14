import { Link } from "react-router";
import { ArrowRight, ChartNoAxesColumnIncreasing } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

export default function AcademicProgressPage() {
  const { data } = useAcademicStudents();
  const active = data.enrollments.filter(
    (item) => item.status === "Active",
  ).length;
  const completed = data.completions.filter(
    (item) => item.status === "Completed",
  ).length;
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6">
      <header>
        <p className="text-sm font-medium text-primary">
          Evaluation &amp; Progress
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Academic Progress
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A transparent view of enrollment and completion records. No grades or
          assessment scores are included.
        </p>
      </header>
      <DemoDataNotice />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Active enrollments</CardDescription>
            <CardTitle className="text-3xl">{active}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Current demo records marked active.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Completed programs</CardDescription>
            <CardTitle className="text-3xl">{completed}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Completion records marked completed.
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Student activity</CardTitle>
          <CardDescription>
            Enrollment and completion status by student.
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y p-0">
          {data.students.map((student) => {
            const enrollments = data.enrollments.filter(
              (record) => record.studentId === student.id,
            );
            const completions = data.completions.filter(
              (record) => record.studentId === student.id,
            );
            return (
              <div
                key={student.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{student.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    {enrollments.length} enrollment
                    {enrollments.length === 1 ? "" : "s"} · {completions.length}{" "}
                    completion record{completions.length === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {enrollments.map((record) => (
                    <Badge key={record.id} variant="outline">
                      {record.status} enrollment
                    </Badge>
                  ))}
                  {completions.map((record) => (
                    <Badge
                      key={record.id}
                      variant={
                        record.status === "Completed" ? "secondary" : "outline"
                      }
                    >
                      {record.status}
                    </Badge>
                  ))}
                  {!enrollments.length && !completions.length && (
                    <span className="text-sm text-muted-foreground">
                      No progress records
                    </span>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    render={
                      <Link
                        to={`/education-academic/academic/students/${student.id}`}
                      />
                    }
                  >
                    Student record
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
      <Card className="border-dashed">
        <CardContent className="flex items-start gap-3 p-5">
          <ChartNoAxesColumnIncreasing
            className="mt-0.5 size-5 text-primary"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            Progress here is derived only from demo enrollment and completion
            records. Formal assessments, grades, and report cards remain outside
            this workspace prototype.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
