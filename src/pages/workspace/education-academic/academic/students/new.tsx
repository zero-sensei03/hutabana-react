import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
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
import { DemoDataNotice } from "../DemoDataNotice";
import { useAcademicStudents } from "../academic-students-state";

const studentSchema = z.object({
  studentNumber: z
    .string()
    .trim()
    .min(1, "Enter a student number.")
    .max(24, "Student number must be 24 characters or fewer."),
  fullName: z
    .string()
    .trim()
    .min(2, "Enter the student's full name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z.union([z.email("Enter a valid email address."), z.literal("")]),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export default function CreateStudentPage() {
  const { addStudent } = useAcademicStudents();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: { studentNumber: "", fullName: "", email: "" },
  });

  const onSubmit = async (values: StudentFormValues) => {
    const student = addStudent({
      studentNumber: values.studentNumber,
      fullName: values.fullName,
      email: values.email,
      status: "Active",
    });

    if (!student) {
      setError("studentNumber", {
        type: "validate",
        message: "That student number is already in use in this demo list.",
      });
      return;
    }

    toast.success("Demo student added", {
      description:
        "This change is only in memory and is not saved to a server.",
    });
    navigate(`../${student.id}`);
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
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
        <p className="mb-2 text-sm font-medium text-primary">
          Student directory
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Create student
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a student to the current demo session.
        </p>
      </div>

      <DemoDataNotice />

      <Card>
        <CardHeader>
          <CardTitle>Student information</CardTitle>
          <CardDescription>
            Student number and full name are required. Email is optional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="studentNumber">
                Student number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="studentNumber"
                required
                autoComplete="off"
                aria-invalid={Boolean(errors.studentNumber)}
                aria-describedby={
                  errors.studentNumber ? "studentNumber-error" : undefined
                }
                {...register("studentNumber")}
              />
              {errors.studentNumber && (
                <p
                  id="studentNumber-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.studentNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                required
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
                {...register("fullName")}
              />
              {errors.fullName && (
                <p
                  id="fullName-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email address{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                render={<Link to="../" />}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <CheckCircle2 aria-hidden="true" />
                {isSubmitting ? "Adding…" : "Add demo student"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
