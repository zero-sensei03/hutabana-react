import { useMemo, useState } from "react";
import { ArrowRight, Plus, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyState from "@/components/errors/EmptyState";
import { DemoDataNotice } from "../DemoDataNotice";
import { useAcademicStudents } from "../academic-students-state";

export default function StudentListPage() {
  const { students } = useAcademicStudents();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;

    return students.filter((student) =>
      [student.fullName, student.studentNumber, student.email].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [search, students]);

  const hasSearch = search.trim().length > 0;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">
            Academic Management
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Students
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse and manage student records for this organization.
          </p>
        </div>
        <Button render={<Link to="new" />}>
          <Plus aria-hidden="true" />
          Create student
        </Button>
      </div>

      <DemoDataNotice />

      <Card>
        <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-medium">Student directory</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {students.length} demo{" "}
              {students.length === 1 ? "record" : "records"}
            </p>
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              aria-label="Search students"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, number, or email"
              className="h-10 pl-9 pr-10"
            />
            {search && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 size-8"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        <CardContent className="p-0">
          {filteredStudents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Student number
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10">
                    <span className="sr-only">Open record</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Link
                        to={student.id}
                        className="group flex min-w-40 items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {student.fullName
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-medium group-hover:text-primary">
                            {student.fullName}
                          </span>
                          <span className="block text-xs text-muted-foreground md:hidden">
                            {student.studentNumber}
                          </span>
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {student.studentNumber}
                    </TableCell>
                    <TableCell className="hidden max-w-60 truncate lg:table-cell">
                      {student.email || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.status === "Active" ? "secondary" : "outline"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={student.id}
                        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`View ${student.fullName}`}
                      >
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="px-4 py-8">
              {hasSearch ? (
                <EmptyState
                  variant="search"
                  title="No matching students"
                  description={`No student records match “${search.trim()}”. Try another name, number, or email.`}
                  actionLabel="Clear search"
                  onAction={() => setSearch("")}
                  size="sm"
                />
              ) : (
                <EmptyState
                  variant="users"
                  title="No students yet"
                  description="Create the first student record to start building this directory."
                  actionLabel="Create student"
                  onAction={() => navigate("new")}
                  size="sm"
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
