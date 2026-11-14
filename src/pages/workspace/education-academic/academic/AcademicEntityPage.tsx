import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Plus, Search, Trash2 } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import EmptyState from "@/components/errors/EmptyState";
import { DemoDataNotice } from "./DemoDataNotice";
import {
  useAcademicStudents,
  type AcademicCollection,
  type AcademicRecord,
} from "./academic-students-state";

type Field = {
  key: string;
  label: string;
  type?: "text" | "email" | "date" | "time" | "number" | "textarea" | "select";
  options?: string;
  required?: boolean;
};
const configs: Record<
  string,
  {
    collection: AcademicCollection;
    title: string;
    singular: string;
    fields: Field[];
  }
> = {
  students: {
    collection: "students",
    title: "Students / Participants",
    singular: "Student",
    fields: [
      { key: "studentNumber", label: "Student number", required: true },
      { key: "fullName", label: "Full name", required: true },
      { key: "email", label: "Email", type: "email" },
      { key: "phone", label: "Phone" },
      { key: "classId", label: "Class", type: "select", options: "classes" },
      {
        key: "periodId",
        label: "Academic period",
        type: "select",
        options: "periods",
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: "Active|Inactive",
      },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  teachers: {
    collection: "teachers",
    title: "Teachers / Instructors",
    singular: "Teacher",
    fields: [
      { key: "code", label: "Staff code", required: true },
      { key: "name", label: "Full name", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "phone", label: "Phone" },
      { key: "specialization", label: "Specialization" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: "Active|Inactive",
      },
    ],
  },
  classes: {
    collection: "classes",
    title: "Classes / Groups",
    singular: "Class",
    fields: [
      { key: "code", label: "Class code", required: true },
      { key: "name", label: "Name", required: true },
      { key: "level", label: "Level" },
      {
        key: "periodId",
        label: "Academic period",
        type: "select",
        options: "periods",
        required: true,
      },
      { key: "capacity", label: "Capacity", type: "number" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: "Active|Inactive",
      },
    ],
  },
  subjects: {
    collection: "subjects",
    title: "Subjects / Programs",
    singular: "Subject / program",
    fields: [
      { key: "code", label: "Code", required: true },
      { key: "name", label: "Name", required: true },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: "Active|Inactive",
      },
    ],
  },
  periods: {
    collection: "periods",
    title: "Academic Periods",
    singular: "Academic period",
    fields: [
      { key: "code", label: "Period code", required: true },
      { key: "name", label: "Name", required: true },
      { key: "startDate", label: "Start date", type: "date", required: true },
      { key: "endDate", label: "End date", type: "date", required: true },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: "Draft|Active|Completed",
      },
    ],
  },
  schedules: {
    collection: "schedules",
    title: "Class Scheduling",
    singular: "Schedule",
    fields: [
      {
        key: "classId",
        label: "Class",
        type: "select",
        options: "classes",
        required: true,
      },
      {
        key: "subjectId",
        label: "Subject",
        type: "select",
        options: "subjects",
        required: true,
      },
      {
        key: "teacherId",
        label: "Teacher",
        type: "select",
        options: "teachers",
        required: true,
      },
      {
        key: "periodId",
        label: "Academic period",
        type: "select",
        options: "periods",
        required: true,
      },
      {
        key: "day",
        label: "Day",
        type: "select",
        options: "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday",
        required: true,
      },
      { key: "startTime", label: "Start time", type: "time", required: true },
      { key: "endTime", label: "End time", type: "time", required: true },
      { key: "location", label: "Location" },
    ],
  },
  enrollments: {
    collection: "enrollments",
    title: "Class Enrollment",
    singular: "Enrollment",
    fields: [
      {
        key: "studentId",
        label: "Student",
        type: "select",
        options: "students",
        required: true,
      },
      {
        key: "classId",
        label: "Class",
        type: "select",
        options: "classes",
        required: true,
      },
      {
        key: "periodId",
        label: "Academic period",
        type: "select",
        options: "periods",
        required: true,
      },
      { key: "enrolledAt", label: "Enrollment date", type: "date" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: "Active|Completed|Withdrawn",
      },
    ],
  },
  "teaching-assignments": {
    collection: "teaching-assignments",
    title: "Teaching Assignments",
    singular: "Teaching assignment",
    fields: [
      {
        key: "teacherId",
        label: "Teacher",
        type: "select",
        options: "teachers",
        required: true,
      },
      {
        key: "classId",
        label: "Class",
        type: "select",
        options: "classes",
        required: true,
      },
      {
        key: "subjectId",
        label: "Subject",
        type: "select",
        options: "subjects",
        required: true,
      },
      {
        key: "periodId",
        label: "Academic period",
        type: "select",
        options: "periods",
        required: true,
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: "Active|Inactive",
      },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
  activities: {
    collection: "activities",
    title: "Academic Activities",
    singular: "Academic activity",
    fields: [
      { key: "name", label: "Activity name", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "date", label: "Date", type: "date", required: true },
      { key: "startTime", label: "Start time", type: "time" },
      { key: "endTime", label: "End time", type: "time" },
      { key: "location", label: "Location" },
      {
        key: "periodId",
        label: "Academic period",
        type: "select",
        options: "periods",
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: "Planned|Completed|Cancelled",
      },
    ],
  },
  "calendar-events": {
    collection: "calendar-events",
    title: "Academic Calendar",
    singular: "Calendar event",
    fields: [
      { key: "name", label: "Event name", required: true },
      { key: "type", label: "Event type" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "date", label: "Date", type: "date", required: true },
      { key: "startTime", label: "Start time", type: "time" },
      { key: "endTime", label: "End time", type: "time" },
      { key: "location", label: "Location" },
      {
        key: "periodId",
        label: "Academic period",
        type: "select",
        options: "periods",
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: "Scheduled|Completed|Cancelled",
      },
    ],
  },
  completions: {
    collection: "completions",
    title: "Graduation / Completion",
    singular: "Completion record",
    fields: [
      {
        key: "studentId",
        label: "Student",
        type: "select",
        options: "students",
        required: true,
      },
      {
        key: "programId",
        label: "Program",
        type: "select",
        options: "subjects",
        required: true,
      },
      {
        key: "periodId",
        label: "Academic period",
        type: "select",
        options: "periods",
        required: true,
      },
      { key: "completedAt", label: "Completion date", type: "date" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: "In progress|Completed|Withdrawn",
      },
      { key: "notes", label: "Notes", type: "textarea" },
    ],
  },
};
const labels: Record<string, string> = {
  students: "fullName",
  teachers: "name",
  classes: "name",
  subjects: "name",
  periods: "name",
  schedules: "name",
  enrollments: "studentId",
  "teaching-assignments": "name",
  activities: "name",
  "calendar-events": "name",
  completions: "studentId",
};

function recordLabel(
  record: AcademicRecord,
  collection: AcademicCollection,
  data: ReturnType<typeof useAcademicStudents>["data"],
) {
  const key = labels[collection];
  const relation = (field: keyof AcademicRecord, target: AcademicCollection) =>
    data[target].find((item) => item.id === record[field])?.name ??
    data[target].find((item) => item.id === record[field])?.fullName ??
    "—";
  if (collection === "enrollments" || collection === "completions")
    return relation("studentId", "students");
  if (collection === "schedules")
    return `${relation("classId", "classes")} · ${relation("subjectId", "subjects")}`;
  return String(
    record[key as keyof AcademicRecord] ?? record.code ?? record.id,
  );
}

export default function AcademicEntityPage({
  collectionOverride,
}: {
  collectionOverride?: string;
}) {
  const { collection: param, recordId } = useParams();
  const location = useLocation();
  const collectionPath = collectionOverride ?? param ?? "";
  const config = configs[collectionPath];
  const basePath = `/education-academic/academic/${collectionOverride ? "completion" : (config?.collection ?? collectionPath)}`;
  const { data, createRecord, updateRecord, deleteRecord } =
    useAcademicStudents();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("name");
  const [page, setPage] = useState(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const collection: AcademicCollection = config?.collection ?? "students";
  const rows = data[collection];
  const listing = useMemo(
    () =>
      rows
        .filter(
          (record) =>
            (statusFilter === "all" || record.status === statusFilter) &&
            `${record.name ?? ""} ${record.fullName ?? ""} ${record.code ?? ""} ${record.studentNumber ?? ""} ${record.email ?? ""}`
              .toLowerCase()
              .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sortOrder === "date"
            ? String(b.createdAt).localeCompare(a.createdAt)
            : recordLabel(a, collection, data).localeCompare(
                recordLabel(b, collection, data),
              ),
        ),
    [collection, data, query, rows, sortOrder, statusFilter],
  );
  const pageSize = 8;
  const pageCount = Math.max(1, Math.ceil(listing.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const pageRows = listing.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize,
  );
  if (!config)
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          This Academic page is unavailable.
        </p>
        <Button
          className="mt-4"
          render={<Link to="/education-academic/academic" />}
        >
          Back to overview
        </Button>
      </div>
    );
  const current = recordId
    ? rows.find((record) => record.id === recordId)
    : undefined;
  const segments = location.pathname.split("/");
  const edit = segments.at(-1) === "edit";
  const create = segments.at(-1) === "new";
  const formMode = create || edit;
  const detailMode = Boolean(recordId) && !edit;
  if (detailMode && !current)
    return (
      <main className="mx-auto max-w-3xl space-y-4 p-6">
        <h1 className="text-2xl font-semibold">Record not found</h1>
        <p className="text-muted-foreground">
          This demo record may have been removed.
        </p>
        <Button render={<Link to={basePath} />}>Back to {config.title}</Button>
      </main>
    );
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      config.fields.map((field) => [
        field.key,
        String(form.get(field.key) ?? "").trim(),
      ]),
    ) as Record<string, string>;
    const requiredErrors = Object.fromEntries(
      config.fields
        .filter((field) => field.required && !values[field.key])
        .map((field) => [field.key, "This field is required."]),
    );
    if (Object.keys(requiredErrors).length) {
      setFormErrors(requiredErrors);
      return;
    }
    const result =
      edit && current
        ? updateRecord(config.collection, current.id, values)
        : createRecord(config.collection, values);
    setFormErrors(result.errors);
    if (!result.record) return;
    toast.success(`${config.singular} ${edit ? "updated" : "created"}`, {
      description:
        "This demo change is only held in memory and is not saved to a server.",
    });
    navigate(`${basePath}/${result.record.id}`);
  };
  const fieldValue = (field: Field) =>
    String(
      current?.[field.key as keyof AcademicRecord] ??
        (field.key === "status"
          ? config.collection === "periods"
            ? "Draft"
            : "Active"
          : ""),
    );
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-1">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 mb-2"
            render={<Link to={basePath} />}
          >
            <ArrowLeft aria-hidden="true" />
            Back to {config.title}
          </Button>
          <p className="text-sm font-medium text-primary">
            Academic Management
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {formMode
              ? `${edit ? "Edit" : "Create"} ${config.singular}`
              : detailMode
                ? recordLabel(current!, config.collection, data)
                : config.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {formMode
              ? "Update the current in-memory demo workspace."
              : "Manage related demo records for this staff workspace."}
          </p>
        </div>
        {!detailMode && !formMode && (
          <Button render={<Link to={`${basePath}/new`} />}>
            <Plus aria-hidden="true" />
            Create {config.singular.toLowerCase()}
          </Button>
        )}
      </header>
      {(formMode || config.collection === "students") && <DemoDataNotice />}
      {formMode ? (
        <Card>
          <CardHeader>
            <CardTitle>{config.singular} information</CardTitle>
            <CardDescription>
              Changes remain in this browser session only and are lost on
              refresh.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-5 sm:grid-cols-2"
              onSubmit={onSubmit}
              noValidate
            >
              {config.fields.map((field) => {
                const id = `field-${field.key}`;
                const options = field.options?.split("|");
                const selectCollection = options?.[0] as
                  AcademicCollection | undefined;
                const choices =
                  selectCollection && selectCollection in data
                    ? data[selectCollection].map((record) => ({
                        value: record.id,
                        label:
                          record.fullName ??
                          record.name ??
                          record.code ??
                          record.id,
                      }))
                    : (options ?? []).map((option) => ({
                        value: option,
                        label: option,
                      }));
                return (
                  <div
                    key={field.key}
                    className={`space-y-2 ${field.type === "textarea" ? "sm:col-span-2" : ""}`}
                  >
                    <Label htmlFor={id}>
                      {field.label}
                      {field.required && (
                        <span className="text-destructive"> *</span>
                      )}
                    </Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={id}
                        name={field.key}
                        defaultValue={fieldValue(field)}
                        aria-invalid={Boolean(formErrors[field.key])}
                        aria-describedby={
                          formErrors[field.key] ? `${id}-error` : undefined
                        }
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={id}
                        name={field.key}
                        defaultValue={fieldValue(field)}
                        aria-invalid={Boolean(formErrors[field.key])}
                        aria-describedby={
                          formErrors[field.key] ? `${id}-error` : undefined
                        }
                        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                      >
                        <option value="">
                          Select {field.label.toLowerCase()}
                        </option>
                        {choices.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        id={id}
                        name={field.key}
                        type={field.type ?? "text"}
                        defaultValue={fieldValue(field)}
                        required={field.required}
                        aria-invalid={Boolean(formErrors[field.key])}
                        aria-describedby={
                          formErrors[field.key] ? `${id}-error` : undefined
                        }
                      />
                    )}
                    {formErrors[field.key] && (
                      <p
                        id={`${id}-error`}
                        role="alert"
                        className="text-sm text-destructive"
                      >
                        {formErrors[field.key]}
                      </p>
                    )}
                  </div>
                );
              })}
              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <Button type="submit">
                  {edit ? "Save changes" : "Create record"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  render={<Link to={basePath} />}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : detailMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Record details</CardTitle>
            <CardDescription>
              Demo record · created {current!.createdAt}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            {config.fields.map((field) => {
              const value = current![field.key as keyof AcademicRecord];
              let display = String(value ?? "—");
              if (
                field.type === "select" &&
                field.options &&
                data[field.options as AcademicCollection]
              ) {
                const target = data[field.options as AcademicCollection].find(
                  (record) => record.id === value,
                );
                display =
                  target?.fullName ?? target?.name ?? target?.code ?? display;
              }
              return (
                <div key={field.key}>
                  <p className="text-sm text-muted-foreground">{field.label}</p>
                  <p className="mt-1 break-words font-medium">{display}</p>
                </div>
              );
            })}
            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <Button render={<Link to="edit" />}>Edit record</Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (
                    !window.confirm(
                      `Delete this ${config.singular.toLowerCase()} demo record?`,
                    )
                  )
                    return;
                  const result = deleteRecord(config.collection, current!.id);
                  if (!result.success) {
                    toast.error(result.message);
                    return;
                  }
                  toast.success("Demo record deleted");
                  navigate(basePath);
                }}
              >
                <Trash2 aria-hidden="true" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-medium">{config.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {rows.length} demo {rows.length === 1 ? "record" : "records"}
              </p>
            </div>
            <div className="relative w-full sm:max-w-sm">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                aria-label={`Search ${config.title.toLowerCase()}`}
                placeholder="Search records"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(0);
                }}
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 border-b p-4">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              Status
              <select
                aria-label="Filter by status"
                className="h-9 rounded-md border border-input bg-background px-2 text-foreground"
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(0);
                }}
              >
                <option value="all">All statuses</option>
                {Array.from(new Set(rows.map((record) => record.status))).map(
                  (status) => (
                    <option key={status}>{status}</option>
                  ),
                )}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              Sort
              <select
                aria-label="Sort records"
                className="h-9 rounded-md border border-input bg-background px-2 text-foreground"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option value="name">Name</option>
                <option value="date">Recently added</option>
              </select>
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("");
                setStatusFilter("all");
                setSortOrder("name");
                setPage(0);
              }}
            >
              Reset filters
            </Button>
          </div>
          <CardContent className="divide-y p-0">
            {listing.length ? (
              <>
                {pageRows.map((record) => (
                  <Link
                    key={record.id}
                    to={`${basePath}/${record.id}`}
                    className="flex items-center justify-between gap-4 px-4 py-4 outline-none hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {recordLabel(record, config.collection, data)}
                      </span>
                      <span className="mt-1 block truncate text-xs text-muted-foreground">
                        {record.code ??
                          record.studentNumber ??
                          record.email ??
                          record.date ??
                          record.startDate ??
                          record.id}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <Badge
                        variant={
                          record.status === "Active" ||
                          record.status === "Completed"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {record.status}
                      </Badge>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 text-muted-foreground"
                      />
                    </span>
                  </Link>
                ))}
                <div className="flex items-center justify-between p-4 text-sm text-muted-foreground">
                  <span>
                    Showing {currentPage * pageSize + 1}–
                    {Math.min((currentPage + 1) * pageSize, listing.length)} of{" "}
                    {listing.length}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 0}
                      onClick={() => setPage((value) => value - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage + 1 >= pageCount}
                      onClick={() => setPage((value) => value + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-4 py-8">
                <EmptyState
                  variant={query || statusFilter !== "all" ? "search" : "users"}
                  title={
                    query || statusFilter !== "all"
                      ? "No matching records"
                      : `No ${config.title.toLowerCase()} yet`
                  }
                  description={
                    query || statusFilter !== "all"
                      ? "Try clearing a filter or changing your search."
                      : "Create a demo record to begin."
                  }
                  actionLabel={
                    query || statusFilter !== "all"
                      ? "Clear filters"
                      : `Create ${config.singular.toLowerCase()}`
                  }
                  onAction={() =>
                    query || statusFilter !== "all"
                      ? (setQuery(""), setStatusFilter("all"))
                      : navigate(`${basePath}/new`)
                  }
                  size="sm"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
