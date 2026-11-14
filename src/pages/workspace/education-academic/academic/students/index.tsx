import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import {
  Plus,
  Search,
  Eye,
  Edit,
  GraduationCap,
  Filter,
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { initialStudentsData } from "@/interfaces/academic-education/academic/students.interface";
import EmptyState from "@/components/errors/EmptyState";

const ITEMS_PER_PAGE = 3; // Contoh ukuran halaman untuk demo pagination

export default function StudentsIndexPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Ambil daftar kelas unik untuk opsi filter dropdown
  const availableClasses = useMemo(() => {
    const classes = initialStudentsData.map((s) => s.currentClass);
    return ["ALL", ...Array.from(new Set(classes))];
  }, []);

  // Filter data berdasarkan pencarian dan kelas
  const filteredStudents = useMemo(() => {
    return initialStudentsData.filter((student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.nisn.includes(searchQuery) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesClass =
        selectedClass === "ALL" || student.currentClass === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [searchQuery, selectedClass]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStudents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredStudents, currentPage]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Students Management
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Manage student enrollment records, profiles, and historical class transitions.
          </p>
        </div>

        <Button render={<Link to="/education-academic/academic/students/create" />}>
          <Plus className="mr-2 size-4" aria-hidden="true" />
          Create Student
        </Button>
      </header>

      <div className="space-y-4">
        {/* Filter & Search Bar Card */}
        <Card className="shadow-xs">
          <CardContent className="flex flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, NISN, or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Class Filter Dropdown */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Filter className="size-3.5" />
                <span>Filter Class:</span>
              </div>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="ALL">All Classes</option>
                {availableClasses.filter(c => c !== "ALL").map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="overflow-hidden shadow-xs">
          <CardHeader className="border-b bg-muted/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Students Directory</CardTitle>
                <CardDescription>
                  Showing {filteredStudents.length} registered student records
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="pl-6">Student Info</TableHead>
                  <TableHead>NISN</TableHead>
                  <TableHead>Current Class</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length ? (
                  paginatedStudents.map((student) => (
                    <TableRow key={student.id} className="transition-colors hover:bg-muted/40">
                      <TableCell className="pl-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs">
                            {student.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{student.fullName}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {student.nisn}
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center gap-1.5 font-medium text-foreground">
                          <GraduationCap className="size-3.5 text-primary" />
                          {student.currentClass}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {student.academicYear}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={student.enrollmentStatus === "Active" ? "secondary" : "outline"}
                          className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                        >
                          {student.enrollmentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            render={<Link to={`/education-academic/academic/students/detail/${student.id}`} />}
                            title="View Details"
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            render={<Link to={`/education-academic/academic/students/edit${student.id}`} />}
                            title="Edit Student"
                          >
                            <Edit className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      <EmptyState
                        onAction={() =>
                          navigate("/education-academic/academic/students/create")
                        }
                        actionLabel="Add students"
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination Container */}
            {totalPages > 1 && (
              <div className="border-t bg-muted/10 px-6 py-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            isActive={pageNumber === currentPage}
                            onClick={() => setCurrentPage(pageNumber)}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}