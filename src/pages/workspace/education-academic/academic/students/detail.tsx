import { ArrowLeft, Mail, UserRound } from "lucide-react";
import { Link, useParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DemoDataNotice } from "../DemoDataNotice";
import { useAcademicStudents } from "../academic-students-state";

export default function StudentDetailPage() {
  const { studentId } = useParams();
  const { students } = useAcademicStudents();
  const student = students.find((record) => record.id === studentId);

  if (!student) {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-5">
        <Button variant="ghost" size="sm" render={<Link to="../" />}>
          <ArrowLeft aria-hidden="true" />
          Back to students
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Student record not found</CardTitle>
            <CardDescription>
              This record may not exist in the current demo session. Demo
              changes are cleared when you refresh.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" render={<Link to="../" />}>
              Return to students
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 mb-3"
          render={<Link to="../" />}
        >
          <ArrowLeft aria-hidden="true" />
          Back to students
        </Button>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg font-semibold text-primary">
              {student.fullName
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="min-w-0">
              <p className="mb-1 text-sm font-medium text-primary">
                Student record
              </p>
              <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                {student.fullName}
              </h1>
            </div>
          </div>
          <Badge
            variant={student.status === "Active" ? "secondary" : "outline"}
          >
            {student.status}
          </Badge>
        </div>
      </div>

      <DemoDataNotice />

      <Card>
        <CardHeader>
          <CardTitle>Student information</CardTitle>
          <CardDescription>
            Basic details from the current Academic Management demo dataset.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <UserRound
              className="mt-0.5 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs text-muted-foreground">Student number</p>
              <p className="mt-1 font-medium">{student.studentNumber}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail
              className="mt-0.5 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs text-muted-foreground">Email address</p>
              <p className="mt-1 break-all font-medium">
                {student.email || "Not provided"}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Record status</p>
            <p className="mt-1 font-medium">{student.status}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Added to demo dataset
            </p>
            <p className="mt-1 font-medium">
              {new Intl.DateTimeFormat("en", {
                dateStyle: "medium",
              }).format(new Date(`${student.createdAt}T00:00:00`))}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
