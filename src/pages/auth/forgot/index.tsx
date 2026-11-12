import { useState } from "react";
import { Mail, ArrowRight, CircleAlert } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ProcessingButton } from "@/components/loading/ProcessingButton";
import {
  validateField,
  type ForgotFieldName,
  type ForgotFormErrors,
  type ForgotProps,
} from "./forgot.validate";
import { Input } from "@/components/ui/input";

const initialData: ForgotProps = {
  email: "",
};

export default function LoginPage() {
  const [data, setData] = useState<ForgotProps>(initialData);
  const [errors, setErrors] = useState<ForgotFormErrors>({});
  const [touched, setTouched] = useState<Record<ForgotFieldName, boolean>>({
    email: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: ForgotFieldName, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    }
  };

  const handleBlur = (field: ForgotFieldName) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, data[field]),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields: ForgotFieldName[] = ["email"];
    const nextErrors: ForgotFormErrors = {};
    fields.forEach((field) => {
      const error = validateField(field, data[field]);

      if (error) {
        nextErrors[field] = error;
      }
    });
    setTouched({
      email: true,
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const renderError = (field: ForgotFieldName) => {
    if (!touched[field] || !errors[field]) {
      return null;
    }

    return (
      <p
        id={`${field}-error`}
        className="mt-1.5 flex items-start gap-1.5 text-xs text-red-500"
        role="alert"
      >
        <CircleAlert className="mt-0.5 size-3.5 shrink-0" />
        <span>{errors[field]}</span>
      </p>
    );
  };

  return (
    <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/2 backdrop-blur-xl">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground">
              <Mail className="w-4 h-4" />
            </span>
            <Input
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              type="text"
              placeholder="email@email.com"
              className="w-full h-11 pl-10 pr-4 bg-muted/40 border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition-all"
              onBlur={() => handleBlur("email")}
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={
                touched.email && errors.email ? "email-error" : undefined
              }
            />
          </div>
          {renderError("email")}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 mt-2 inline-flex items-center justify-center font-semibold text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99] transition-all shadow-sm disabled:opacity-70 cursor-pointer"
        >
          {isLoading ? (
            <ProcessingButton />
          ) : (
            <span className="inline-flex items-center gap-2">
              Send Reset Instructions
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Switch Mode Footer */}
      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>
          Remember your password?{" "}
          <Link
            to={"/auth/sign-in"}
            className="font-semibold text-primary hover:underline cursor-pointer"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
