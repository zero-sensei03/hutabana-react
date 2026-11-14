import { createContext, useContext } from "react";

export type AcademicCollection =
  | "students"
  | "teachers"
  | "classes"
  | "subjects"
  | "periods"
  | "calendar-events"
  | "schedules"
  | "enrollments"
  | "teaching-assignments"
  | "activities"
  | "completions";

export type StudentStatus = "Active" | "Inactive";

export interface AcademicRecord {
  id: string;
  status: string;
  createdAt: string;
  name?: string;
  code?: string;
  fullName?: string;
  studentNumber?: string;
  email?: string;
  phone?: string;
  description?: string;
  notes?: string;
  specialization?: string;
  category?: string;
  level?: string;
  capacity?: number;
  startDate?: string;
  endDate?: string;
  date?: string;
  enrolledAt?: string;
  completedAt?: string;
  startTime?: string;
  endTime?: string;
  day?: string;
  location?: string;
  type?: string;
  studentId?: string;
  teacherId?: string;
  classId?: string;
  subjectId?: string;
  periodId?: string;
  programId?: string;
}

export interface AcademicStudent extends AcademicRecord {
  studentNumber: string;
  fullName: string;
  email: string;
}

export type AcademicData = Record<AcademicCollection, AcademicRecord[]>;
export type AcademicFormValues = Record<string, string>;
export type AcademicValidationErrors = Record<string, string>;

export interface CreateRecordResult {
  record: AcademicRecord | null;
  errors: AcademicValidationErrors;
}

export interface DeleteRecordResult {
  success: boolean;
  message?: string;
}

export interface AcademicStudentsContextValue {
  data: AcademicData;
  students: AcademicStudent[];
  addStudent: (
    student: Omit<AcademicStudent, "id" | "createdAt">,
  ) => AcademicStudent | null;
  createRecord: (
    collection: AcademicCollection,
    values: AcademicFormValues,
  ) => CreateRecordResult;
  updateRecord: (
    collection: AcademicCollection,
    id: string,
    values: AcademicFormValues,
  ) => CreateRecordResult;
  deleteRecord: (
    collection: AcademicCollection,
    id: string,
  ) => DeleteRecordResult;
}

export const initialStudents: AcademicStudent[] = [
  {
    id: "student-001",
    studentNumber: "2026-001",
    fullName: "Alya Pratama",
    email: "alya.pratama@example.edu",
    phone: "+62 812 5550 1001",
    status: "Active",
    classId: "class-001",
    periodId: "period-001",
    notes: "Prefers afternoon sessions.",
    createdAt: "2026-07-14",
  },
  {
    id: "student-002",
    studentNumber: "2026-002",
    fullName: "Rafi Mahendra",
    email: "rafi.mahendra@example.edu",
    phone: "+62 812 5550 1002",
    status: "Active",
    classId: "class-001",
    periodId: "period-001",
    createdAt: "2026-07-12",
  },
  {
    id: "student-003",
    studentNumber: "2026-003",
    fullName: "Nadia Putri",
    email: "nadia.putri@example.edu",
    phone: "+62 812 5550 1003",
    status: "Active",
    classId: "class-002",
    periodId: "period-001",
    createdAt: "2026-07-10",
  },
  {
    id: "student-004",
    studentNumber: "2025-118",
    fullName: "Dimas Saputra",
    email: "dimas.saputra@example.edu",
    status: "Inactive",
    classId: "class-002",
    periodId: "period-002",
    createdAt: "2026-06-28",
  },
  {
    id: "student-005",
    studentNumber: "2025-104",
    fullName: "Siti Rahmawati",
    email: "siti.rahmawati@example.edu",
    status: "Active",
    classId: "class-003",
    periodId: "period-001",
    createdAt: "2026-06-21",
  },
];

export const initialAcademicData: AcademicData = {
  students: initialStudents,
  teachers: [
    {
      id: "teacher-001",
      code: "INS-101",
      name: "Maya Lestari",
      email: "maya.lestari@example.edu",
      phone: "+62 812 5550 2001",
      specialization: "Language programs",
      status: "Active",
      createdAt: "2026-06-20",
    },
    {
      id: "teacher-002",
      code: "INS-102",
      name: "Bima Santoso",
      email: "bima.santoso@example.edu",
      phone: "+62 812 5550 2002",
      specialization: "Mathematics",
      status: "Active",
      createdAt: "2026-06-18",
    },
    {
      id: "teacher-003",
      code: "INS-103",
      name: "Lina Wibowo",
      email: "lina.wibowo@example.edu",
      specialization: "Science programs",
      status: "Active",
      createdAt: "2026-06-15",
    },
  ],
  classes: [
    {
      id: "class-001",
      code: "GRP-101",
      name: "Foundation Group A",
      level: "Foundation",
      periodId: "period-001",
      capacity: 18,
      description: "Small group for foundational language and study skills.",
      status: "Active",
      createdAt: "2026-06-20",
    },
    {
      id: "class-002",
      code: "GRP-102",
      name: "Applied Learning B",
      level: "Applied",
      periodId: "period-001",
      capacity: 16,
      description: "Applied interdisciplinary program group.",
      status: "Active",
      createdAt: "2026-06-20",
    },
    {
      id: "class-003",
      code: "GRP-201",
      name: "Weekend Cohort",
      level: "Intermediate",
      periodId: "period-002",
      capacity: 12,
      description: "Weekend learning cohort.",
      status: "Active",
      createdAt: "2026-06-10",
    },
  ],
  subjects: [
    {
      id: "subject-001",
      code: "PRG-LANG",
      name: "Language Foundations",
      category: "Program",
      description: "Communication and language fundamentals.",
      status: "Active",
      createdAt: "2026-06-10",
    },
    {
      id: "subject-002",
      code: "PRG-MATH",
      name: "Applied Mathematics",
      category: "Program",
      description: "Practical mathematical reasoning.",
      status: "Active",
      createdAt: "2026-06-10",
    },
    {
      id: "subject-003",
      code: "PRG-SCI",
      name: "Exploratory Science",
      category: "Program",
      description: "Introductory inquiry and applied science.",
      status: "Active",
      createdAt: "2026-06-10",
    },
  ],
  periods: [
    {
      id: "period-001",
      code: "2026-A",
      name: "Learning Cycle A · 2026",
      startDate: "2026-07-01",
      endDate: "2026-12-20",
      status: "Active",
      createdAt: "2026-06-01",
    },
    {
      id: "period-002",
      code: "2026-B",
      name: "Learning Cycle B · 2026",
      startDate: "2026-08-01",
      endDate: "2026-12-15",
      status: "Draft",
      createdAt: "2026-06-02",
    },
  ],
  "calendar-events": [
    {
      id: "event-001",
      name: "New cohort orientation",
      type: "Orientation",
      description: "Welcome and program introduction for new participants.",
      date: "2026-11-18",
      startTime: "09:00",
      endTime: "11:00",
      location: "Learning Hall",
      periodId: "period-001",
      status: "Scheduled",
      createdAt: "2026-10-20",
    },
    {
      id: "event-002",
      name: "Teaching team planning",
      type: "Meeting",
      description: "Planning session for the next learning cycle.",
      date: "2026-11-24",
      startTime: "13:00",
      endTime: "14:30",
      location: "Room 2",
      periodId: "period-001",
      status: "Scheduled",
      createdAt: "2026-10-22",
    },
  ],
  schedules: [
    {
      id: "schedule-001",
      name: "Foundation Group A · Language",
      classId: "class-001",
      subjectId: "subject-001",
      teacherId: "teacher-001",
      periodId: "period-001",
      day: "Monday",
      startTime: "09:00",
      endTime: "10:30",
      location: "Room 1",
      status: "Active",
      createdAt: "2026-07-01",
    },
    {
      id: "schedule-002",
      name: "Applied Learning B · Mathematics",
      classId: "class-002",
      subjectId: "subject-002",
      teacherId: "teacher-002",
      periodId: "period-001",
      day: "Tuesday",
      startTime: "10:00",
      endTime: "11:30",
      location: "Room 2",
      status: "Active",
      createdAt: "2026-07-01",
    },
    {
      id: "schedule-003",
      name: "Applied Learning B · Science",
      classId: "class-002",
      subjectId: "subject-003",
      teacherId: "teacher-003",
      periodId: "period-001",
      day: "Thursday",
      startTime: "13:00",
      endTime: "14:30",
      location: "Lab A",
      status: "Active",
      createdAt: "2026-07-01",
    },
  ],
  enrollments: [
    {
      id: "enrollment-001",
      studentId: "student-001",
      classId: "class-001",
      periodId: "period-001",
      enrolledAt: "2026-07-01",
      status: "Active",
      createdAt: "2026-07-01",
    },
    {
      id: "enrollment-002",
      studentId: "student-002",
      classId: "class-001",
      periodId: "period-001",
      enrolledAt: "2026-07-01",
      status: "Active",
      createdAt: "2026-07-01",
    },
    {
      id: "enrollment-003",
      studentId: "student-003",
      classId: "class-002",
      periodId: "period-001",
      enrolledAt: "2026-07-02",
      status: "Active",
      createdAt: "2026-07-02",
    },
    {
      id: "enrollment-004",
      studentId: "student-004",
      classId: "class-003",
      periodId: "period-002",
      enrolledAt: "2026-06-15",
      status: "Completed",
      createdAt: "2026-06-15",
    },
  ],
  "teaching-assignments": [
    {
      id: "assignment-001",
      name: "Language Foundations · Group A",
      teacherId: "teacher-001",
      classId: "class-001",
      subjectId: "subject-001",
      periodId: "period-001",
      status: "Active",
      createdAt: "2026-07-01",
    },
    {
      id: "assignment-002",
      name: "Applied Mathematics · Group B",
      teacherId: "teacher-002",
      classId: "class-002",
      subjectId: "subject-002",
      periodId: "period-001",
      status: "Active",
      createdAt: "2026-07-01",
    },
    {
      id: "assignment-003",
      name: "Exploratory Science · Group B",
      teacherId: "teacher-003",
      classId: "class-002",
      subjectId: "subject-003",
      periodId: "period-001",
      status: "Active",
      createdAt: "2026-07-01",
    },
  ],
  activities: [
    {
      id: "activity-001",
      name: "Program welcome session",
      description: "Meet the learning team and explore the program structure.",
      date: "2026-11-19",
      startTime: "09:00",
      endTime: "10:30",
      location: "Learning Hall",
      periodId: "period-001",
      status: "Planned",
      createdAt: "2026-10-15",
    },
    {
      id: "activity-002",
      name: "Academic team review",
      description: "Internal review of current program delivery.",
      date: "2026-11-26",
      startTime: "14:00",
      endTime: "15:00",
      location: "Meeting Room",
      periodId: "period-001",
      status: "Planned",
      createdAt: "2026-10-16",
    },
  ],
  completions: [
    {
      id: "completion-001",
      studentId: "student-004",
      programId: "subject-001",
      periodId: "period-002",
      completedAt: "2026-06-30",
      status: "Completed",
      notes: "Demo completion record; no certificate issued.",
      createdAt: "2026-06-30",
    },
    {
      id: "completion-002",
      studentId: "student-005",
      programId: "subject-002",
      periodId: "period-001",
      status: "In progress",
      createdAt: "2026-07-10",
    },
  ],
};

export const AcademicStudentsContext =
  createContext<AcademicStudentsContextValue | null>(null);

export function useAcademicStudents() {
  const context = useContext(AcademicStudentsContext);

  if (!context) {
    throw new Error(
      "useAcademicStudents must be used within AcademicManagementLayout",
    );
  }

  return context;
}
