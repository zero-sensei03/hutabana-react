import { Outlet } from "react-router";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { useLayoutStore } from "@/stores/useLayoutStore";
import { cn } from "cn";

const LayoutWorkspace = () => {
  const { isMobileOpen, setMobileOpen, isCollapsed } = useLayoutStore();
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <AdminHeader onMenuClick={() => setMobileOpen(!isMobileOpen)} />
        <main
          className={cn("flex-1 py-4 pe-4 md:py-6 md:pe-6", {
            "md:ps-68 ps-4": !isCollapsed,
            "md:ps-20 ps-4": isCollapsed,
          })}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutWorkspace;
