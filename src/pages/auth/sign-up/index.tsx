import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  CircleAlert,
} from "lucide-react";
import { Link } from "react-router";
import { GoogleButton } from "@/components/buttons/GoogleButtons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  validateField,
  type RegisterFieldName,
  type RegisterFormErrors,
  type RegisterProps,
} from "./sign-up.validate";
import { ProcessingButton } from "@/components/loading/ProcessingButton";

const initialData: RegisterProps = {
  username: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const [data, setData] = useState<RegisterProps>(initialData);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [touched, setTouched] = useState<Record<RegisterFieldName, boolean>>({
    username: false,
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: RegisterFieldName, value: string) => {
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

  const handleBlur = (field: RegisterFieldName) => {
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

    const fields: RegisterFieldName[] = ["username", "email", "password"];
    const nextErrors: RegisterFormErrors = {};
    fields.forEach((field) => {
      const error = validateField(field, data[field]);

      if (error) {
        nextErrors[field] = error;
      }
    });
    setTouched({
      username: true,
      email: true,
      password: true,
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

  const renderError = (field: RegisterFieldName) => {
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
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Username <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground">
              <User className="w-4 h-4" />
            </span>
            <Input
              value={data.username}
              onChange={(e) => handleChange("username", e.target.value)}
              type="text"
              placeholder="Your username here"
              className="w-full h-11 pl-10 pr-4 bg-muted/40 border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition-all"
              onBlur={() => handleBlur("username")}
              aria-invalid={Boolean(touched.username && errors.username)}
              aria-describedby={
                touched.username && errors.username
                  ? "username-error"
                  : undefined
              }
            />
          </div>
          {renderError("username")}
        </div>

        <div>
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

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Password <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground">
              <Lock className="w-4 h-4" />
            </span>
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground cursor-pointer"
            >
              {showPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </span>
            <Input
              value={data.password}
              onChange={(e) => handleChange("password", e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-11 pl-10 pr-10 bg-muted/40 border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition-all"
              onBlur={() => handleBlur("password")}
              aria-invalid={Boolean(touched.password && errors.password)}
              aria-describedby={
                touched.password && errors.password
                  ? "password-error"
                  : undefined
              }
            />
          </div>
          {renderError("password")}
        </div>

        {/* Action Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 mt-2 inline-flex items-center justify-center font-semibold text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99] transition-all shadow-sm disabled:opacity-70 cursor-pointer"
        >
          {isLoading ? (
            <ProcessingButton />
          ) : (
            <span className="inline-flex items-center gap-2">
              Create Account
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground font-medium">
            Or
          </span>
        </div>
      </div>

      <GoogleButton action={() => alert("hello")} isLoading={false} />

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>
          Already have an account?{" "}
          <Link
            to={"/auth/sign-in"}
            className="font-semibold text-primary hover:underline cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
