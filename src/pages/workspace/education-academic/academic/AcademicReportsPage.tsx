import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DemoDataNotice } from "./DemoDataNotice";
import { useAcademicStudents } from "./academic-students-state";

export default function AcademicReportsPage() {
  const { data } = useAcademicStudents();
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () =>
      data.students
        .filter((student) =>
          `${student.fullName} ${student.studentNumber} ${student.email}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .map((student) => ({
          student: student.fullName,
          number: student.studentNumber,
          status: student.status,
          enrollments: data.enrollments.filter(
            (record) => record.studentId === student.id,
          ).length,
          completions: data.completions.filter(
            (record) =>
              record.studentId === student.id && record.status === "Completed",
          ).length,
        })),
    [data, query],
  );
  const download = () => {
    const escape = (value: string | number) =>
      `"${String(value).replaceAll('"', '""')}"`;
    const csv = [
      [
        "Student",
        "Student number",
        "Status",
        "Enrollments",
        "Completed programs",
      ],
      ...rows.map((row) => Object.values(row)),
    ]
      .map((row) => row.map((value) => escape(value ?? "")).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "academic-demo-progress.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6">
      <header>
        <p className="text-sm font-medium text-primary">Reports</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Academic Reports
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review and export a student enrollment and completion summary from the
          current demo data.
        </p>
      </header>
      <DemoDataNotice />
      <Card>
        <CardHeader className="gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <CardTitle>Student activity summary</CardTitle>
            <CardDescription className="mt-1">
              This report contains no grades, assessment results, or
              certificates.
            </CardDescription>
          </div>
          <Button variant="outline" onClick={download}>
            <Download aria-hidden="true" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <Input
            aria-label="Filter report by student"
            placeholder="Filter students"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="p-3 font-medium">Student</th>
                  <th className="p-3 font-medium">Number</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Enrollments</th>
                  <th className="p-3 font-medium">Completed programs</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr className="border-b last:border-0" key={row.number}>
                    <td className="p-3 font-medium">{row.student}</td>
                    <td className="p-3">{row.number}</td>
                    <td className="p-3">{row.status}</td>
                    <td className="p-3">{row.enrollments}</td>
                    <td className="p-3">{row.completions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No students match this filter.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
