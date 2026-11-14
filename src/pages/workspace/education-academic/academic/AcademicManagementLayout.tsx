import { useMemo, useState } from "react";
import { Outlet } from "react-router";
import {
  AcademicStudentsContext,
  initialAcademicData,
  type AcademicData,
  type AcademicRecord,
  type AcademicStudent,
  type AcademicStudentsContextValue,
} from "./academic-students-state";

const today = () => new Date().toISOString().slice(0, 10);
const makeId = (collection: string) => `${collection}-${crypto.randomUUID()}`;

function validateRecord(
  data: AcademicData,
  collection: keyof AcademicData,
  id: string | undefined,
  values: Record<string, string>,
) {
  const errors: Record<string, string> = {};
  const required =
    collection === "students"
      ? ["studentNumber", "fullName"]
      : collection === "teachers"
        ? ["code", "name", "email"]
        : collection === "classes" ||
            collection === "subjects" ||
            collection === "periods"
          ? ["code", "name"]
          : collection === "enrollments"
            ? ["studentId", "classId", "periodId"]
            : collection === "teaching-assignments"
              ? ["teacherId", "classId", "subjectId", "periodId"]
              : collection === "schedules"
                ? [
                    "classId",
                    "subjectId",
                    "teacherId",
                    "periodId",
                    "day",
                    "startTime",
                    "endTime",
                  ]
                : collection === "completions"
                  ? ["studentId", "programId", "periodId"]
                  : ["name"];
  for (const field of required)
    if (!values[field]?.trim()) errors[field] = "This field is required.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email address.";
  if (values.startDate && values.endDate && values.startDate > values.endDate)
    errors.endDate = "End date must be on or after the start date.";
  if (values.startTime && values.endTime && values.startTime >= values.endTime)
    errors.endTime = "End time must be after the start time.";
  const codeFields = ["code", "studentNumber"];
  for (const field of codeFields) {
    const val = values[field]?.trim().toLowerCase();
    if (
      val &&
      data[collection].some(
        (record) =>
          record.id !== id &&
          String(record[field as keyof AcademicRecord] ?? "").toLowerCase() ===
            val,
      )
    ) {
      errors[field] = "This identifier is already in use.";
    }
  }
  if (
    collection === "periods" &&
    values.status === "Active" &&
    data.periods.some(
      (record) => record.id !== id && record.status === "Active",
    )
  ) {
    errors.status = "Only one academic period can be active at a time.";
  }
  const refs: Array<[string, keyof AcademicData]> = [
    ["studentId", "students"],
    ["teacherId", "teachers"],
    ["classId", "classes"],
    ["subjectId", "subjects"],
    ["programId", "subjects"],
    ["periodId", "periods"],
  ];
  for (const [field, target] of refs)
    if (
      values[field] &&
      !data[target].some((record) => record.id === values[field])
    )
      errors[field] = "Choose an existing record.";
  if (
    collection === "enrollments" &&
    data.enrollments.some(
      (record) =>
        record.id !== id &&
        record.studentId === values.studentId &&
        record.classId === values.classId &&
        record.periodId === values.periodId,
    )
  ) {
    errors.studentId =
      "This student is already enrolled in this class and period.";
  }
  if (collection === "schedules") {
    const start = values.startTime ?? "";
    const end = values.endTime ?? "";
    const clash = data.schedules.some(
      (record) =>
        record.id !== id &&
        record.day === values.day &&
        (record.teacherId === values.teacherId ||
          record.classId === values.classId) &&
        start < (record.endTime ?? "") &&
        end > (record.startTime ?? ""),
    );
    if (clash)
      errors.startTime =
        "This teacher or class already has a schedule at that time.";
  }
  return errors;
}

export default function AcademicManagementLayout() {
  const [data, setData] = useState<AcademicData>(() =>
    structuredClone(initialAcademicData),
  );
  const value = useMemo<AcademicStudentsContextValue>(() => {
    const students = data.students as AcademicStudent[];
    const createRecord: AcademicStudentsContextValue["createRecord"] = (
      collection,
      values,
    ) => {
      const errors = validateRecord(data, collection, undefined, values);
      if (Object.keys(errors).length) return { record: null, errors };
      const record = {
        ...values,
        id: makeId(collection),
        status: values.status || "Active",
        createdAt: today(),
      } as AcademicRecord;
      setData((current) => ({
        ...current,
        [collection]: [record, ...current[collection]],
      }));
      return { record, errors: {} };
    };
    const updateRecord: AcademicStudentsContextValue["updateRecord"] = (
      collection,
      id,
      values,
    ) => {
      const errors = validateRecord(data, collection, id, values);
      if (Object.keys(errors).length) return { record: null, errors };
      const record = {
        ...data[collection].find((item) => item.id === id),
        ...values,
        id,
        createdAt:
          data[collection].find((item) => item.id === id)?.createdAt ?? today(),
      } as AcademicRecord;
      setData((current) => ({
        ...current,
        [collection]: current[collection].map((item) =>
          item.id === id ? record : item,
        ),
      }));
      return { record, errors: {} };
    };
    const deleteRecord: AcademicStudentsContextValue["deleteRecord"] = (
      collection,
      id,
    ) => {
      const references: Partial<
        Record<
          keyof AcademicData,
          Array<[keyof AcademicData, keyof AcademicRecord]>
        >
      > = {
        students: [
          ["enrollments", "studentId"],
          ["completions", "studentId"],
        ],
        teachers: [
          ["schedules", "teacherId"],
          ["teaching-assignments", "teacherId"],
        ],
        classes: [
          ["students", "classId"],
          ["schedules", "classId"],
          ["enrollments", "classId"],
          ["teaching-assignments", "classId"],
          ["activities", "classId"],
        ],
        subjects: [
          ["schedules", "subjectId"],
          ["teaching-assignments", "subjectId"],
          ["completions", "programId"],
        ],
        periods: [
          ["classes", "periodId"],
          ["students", "periodId"],
          ["schedules", "periodId"],
          ["enrollments", "periodId"],
          ["teaching-assignments", "periodId"],
          ["activities", "periodId"],
          ["completions", "periodId"],
          ["calendar-events", "periodId"],
        ],
      };
      for (const [childCollection, field] of references[collection] ?? []) {
        if (data[childCollection].some((record) => record[field] === id)) {
          return {
            success: false,
            message: "This record is in use. Remove its related records first.",
          };
        }
      }
      setData((current) => ({
        ...current,
        [collection]: current[collection].filter((record) => record.id !== id),
      }));
      return { success: true };
    };
    return {
      data,
      students,
      createRecord,
      updateRecord,
      deleteRecord,
      addStudent: (student) => {
        const result = createRecord(
          "students",
          student as unknown as Record<string, string>,
        );
        return result.record as AcademicStudent | null;
      },
    };
  }, [data]);
  return (
    <AcademicStudentsContext.Provider value={value}>
      <Outlet />
    </AcademicStudentsContext.Provider>
  );
}
