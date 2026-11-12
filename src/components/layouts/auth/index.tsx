import { useAppStore } from "@/stores/useAppStore";
import { Outlet, useLocation } from "react-router";

type mode = "sign-in" | "sign-up" | "forgot-password";

const AuthLayout = () => {
  const { appInfo } = useAppStore();

  const location = useLocation();
  const pathname = location.pathname.split("/");
  const authMode: mode = (pathname[pathname.length - 1] as mode) || "signin";

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 flex items-center space-x-4">
          {!appInfo?.logo ? (
            <div className="inline-flex items-center justify-center w-12! h-12! rounded-lg bg-primary/20 font-bold text-xl shadow-sm">
              ✨
            </div>
          ) : (
            <img src={appInfo?.logo} alt="logo" className="h-20 w-auto" />
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {authMode === "sign-in" && "Welcome back"}
              {authMode === "sign-up" && "Create an account"}
              {authMode === "forgot-password" && "Reset password"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              {authMode === "sign-in" &&
                "Please enter your details to sign in."}
              {authMode === "sign-up" && "Start your journey with us today."}
              {authMode === "forgot-password" &&
                "We'll send you instructions to reset your password."}
            </p>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
