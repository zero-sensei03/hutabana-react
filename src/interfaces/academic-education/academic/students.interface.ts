export interface ClassHistoryRecordRes {
  id: string;
  className: string;
  academicYear: string;
  semester: string;
  homeroomTeacher: string;
  status: "Completed" | "Active" | "Transferred";
  gpa?: string;
}

export interface StudentRes {
  id: string;
  nisn: string;
  fullName: string;
  gender: "Male" | "Female";
  email: string;
  phone: string;
  currentClass: string;
  academicYear: string;
  enrollmentStatus: "Active" | "Graduated" | "Inactive" | "Suspended";
  dateOfBirth: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  classHistory: ClassHistoryRecordRes[];
}

export const initialStudentsData: StudentRes[] = [
  {
    id: "std-001",
    nisn: "0082910234",
    fullName: "Ahmad Rizky Pratama",
    gender: "Male",
    email: "ahmad.rizky@student.edu",
    phone: "+62 812-3456-7890",
    currentClass: "Class 5A",
    academicYear: "2025/2026",
    enrollmentStatus: "Active",
    dateOfBirth: "2015-04-12",
    address: "Jl. Merdeka No. 45, Jakarta Pusat",
    guardianName: "Budi Pratama",
    guardianPhone: "+62 811-9876-5432",
    classHistory: [
      { id: "ch-1", className: "Class 1B", academicYear: "2021/2022", semester: "Odd & Even", homeroomTeacher: "Siti Rahma, S.Pd", status: "Completed", gpa: "3.85" },
      { id: "ch-2", className: "Class 2A", academicYear: "2022/2023", semester: "Odd & Even", homeroomTeacher: "Drs. Joko Susilo", status: "Completed", gpa: "3.90" },
      { id: "ch-3", className: "Class 3A", academicYear: "2023/2024", semester: "Odd & Even", homeroomTeacher: "Dewi Lestari, M.Pd", status: "Completed", gpa: "3.88" },
      { id: "ch-4", className: "Class 4B", academicYear: "2024/2025", semester: "Odd & Even", homeroomTeacher: "Ahmad Fauzi, S.Pd", status: "Completed", gpa: "3.92" },
      { id: "ch-5", className: "Class 5A", academicYear: "2025/2026", semester: "Odd (Active)", homeroomTeacher: "Hj. Aminah, S.Pd", status: "Active", gpa: "3.95" },
    ],
  },
  {
    id: "std-002",
    nisn: "0082910235",
    fullName: "Salsabila Putri",
    gender: "Female",
    email: "salsabila.putri@student.edu",
    phone: "+62 813-4567-8901",
    currentClass: "Class 6B",
    academicYear: "2025/2026",
    enrollmentStatus: "Active",
    dateOfBirth: "2014-09-20",
    address: "Jl. Sudirman Blok B/12, Jakarta Selatan",
    guardianName: "Hendra Wijaya",
    guardianPhone: "+62 812-3344-5566",
    classHistory: [
      { id: "ch-21", className: "Class 1A", academicYear: "2020/2021", semester: "Odd & Even", homeroomTeacher: "Siti Rahma, S.Pd", status: "Completed", gpa: "3.90" },
      { id: "ch-22", className: "Class 2B", academicYear: "2021/2022", semester: "Odd & Even", homeroomTeacher: "Drs. Joko Susilo", status: "Completed", gpa: "3.95" },
      { id: "ch-23", className: "Class 3B", academicYear: "2022/2023", semester: "Odd & Even", homeroomTeacher: "Dewi Lestari, M.Pd", status: "Completed", gpa: "3.92" },
      { id: "ch-24", className: "Class 4A", academicYear: "2023/2024", semester: "Odd & Even", homeroomTeacher: "Ahmad Fauzi, S.Pd", status: "Completed", gpa: "3.96" },
      { id: "ch-25", className: "Class 5B", academicYear: "2024/2025", semester: "Odd & Even", homeroomTeacher: "Hj. Aminah, S.Pd", status: "Completed", gpa: "3.98" },
      { id: "ch-26", className: "Class 6B", academicYear: "2025/2026", semester: "Odd (Active)", homeroomTeacher: "Drs. Sutrisno", status: "Active", gpa: "3.97" },
    ],
  },
  {
    id: "std-003",
    nisn: "0082910236",
    fullName: "Kevin Santoso",
    gender: "Male",
    email: "kevin.santoso@student.edu",
    phone: "+62 815-6789-0123",
    currentClass: "Class 3C",
    academicYear: "2025/2026",
    enrollmentStatus: "Active",
    dateOfBirth: "2017-01-15",
    address: "Jl. Pluit Permai No. 8, Jakarta Utara",
    guardianName: "Susanto",
    guardianPhone: "+62 818-9988-7766",
    classHistory: [
      { id: "ch-31", className: "Class 1C", academicYear: "2023/2024", semester: "Odd & Even", homeroomTeacher: "Ratna Sari, S.Pd", status: "Completed", gpa: "3.75" },
      { id: "ch-32", className: "Class 2C", academicYear: "2024/2025", semester: "Odd & Even", homeroomTeacher: "Bambang Pamungkas", status: "Completed", gpa: "3.80" },
      { id: "ch-33", className: "Class 3C", academicYear: "2025/2026", semester: "Odd (Active)", homeroomTeacher: "Yuni Shara, S.Pd", status: "Active", gpa: "3.85" },
    ],
  },
  {
    id: "std-004",
    nisn: "0082910237",
    fullName: "Nadia Zahra",
    gender: "Female",
    email: "nadia.zahra@student.edu",
    phone: "+62 817-8901-2345",
    currentClass: "Class 4A",
    academicYear: "2025/2026",
    enrollmentStatus: "Active",
    dateOfBirth: "2016-06-05",
    address: "Jl. Tebet Timur Dalam No. 19, Jakarta Selatan",
    guardianName: "Zulkifli",
    guardianPhone: "+62 813-1122-3344",
    classHistory: [
      { id: "ch-41", className: "Class 1A", academicYear: "2022/2023", semester: "Odd & Even", homeroomTeacher: "Siti Rahma, S.Pd", status: "Completed", gpa: "3.88" },
      { id: "ch-42", className: "Class 2A", academicYear: "2023/2024", semester: "Odd & Even", homeroomTeacher: "Drs. Joko Susilo", status: "Completed", gpa: "3.90" },
      { id: "ch-43", className: "Class 3A", academicYear: "2024/2025", semester: "Odd & Even", homeroomTeacher: "Dewi Lestari, M.Pd", status: "Completed", gpa: "3.91" },
      { id: "ch-44", className: "Class 4A", academicYear: "2025/2026", semester: "Odd (Active)", homeroomTeacher: "Ahmad Fauzi, S.Pd", status: "Active", gpa: "3.94" },
    ],
  },
];