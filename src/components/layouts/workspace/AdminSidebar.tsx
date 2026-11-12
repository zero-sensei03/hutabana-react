import { createElement, useMemo } from "react";
import { NavLink, useLocation } from "react-router";
import { useModuleStore, type ModuleInfoProps } from "@/stores/useModuleStore";
import { useLayoutStore } from "@/stores/useLayoutStore";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LayoutGrid } from "lucide-react";
import { useAppStore, type AppInfoProps } from "@/stores/useAppStore";
import { AcademicSidebarMenu, type sidebarType } from "@/constants/SidebarMenu";
import { getCategoryIcon } from "@/constants/CategoryIcons";

interface SidebarContentProps {
  sidebarMenu: sidebarType[];
  isCollapsed: boolean;
  onNavigate: () => void;
  appInfo: AppInfoProps | null;
  categoryData?: ModuleInfoProps | null;
  moduleSlug: string;
}

const SidebarContent = ({
  sidebarMenu,
  isCollapsed,
  onNavigate,
  appInfo,
  categoryData,
  moduleSlug,
}: SidebarContentProps) => (
  <div className="flex h-full flex-col border md:rounded-xl! pb-4 shadow-md">
    <div className="flex h-16 items-center border-b px-4 gap-3">
      {!appInfo?.logo ? (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <LayoutGrid className="h-5 w-5" />
        </div>
      ) : (
        <img
          src={appInfo?.logo}
          alt="logo"
          className={cn("", { "h-8 w-8": isCollapsed, "h-12": !isCollapsed })}
        />
      )}
      {!isCollapsed && (
        <div className="flex flex-col pe-2 overflow-hidden">
          <span className="font-bold tracking-tight truncate">
            {appInfo?.name}
          </span>
          <span className="text-[10px] italic opacity-60 uppercase tracking-[2px]">
            {moduleSlug.replace("-", " ")}
          </span>
        </div>
      )}
    </div>

    {!isCollapsed && (
      <div className="my-4 px-4 text-xs">
        <div className="border rounded-md p-3 shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              {createElement(getCategoryIcon(categoryData?.icon), {
                size: 16,
                strokeWidth: 1.8,
              })}
            </div>
            <div className="flex flex-col pe-2 overflow-hidden space-y-1">
              <span className="font-bold tracking-tight truncate">
                {categoryData?.name}
              </span>
              <span className="text-[10px] italic opacity-60">
                Workspace Portal
              </span>
            </div>
          </div>
        </div>
      </div>
    )}

    <div
      className={cn("flex-1 overflow-y-auto pb-4", {
        "px-3": !isCollapsed,
        "px-1.5 mt-4!": isCollapsed,
      })}
    >
      <div className="space-y-6">
        {sidebarMenu.map((category) => {
          return (
            <div key={category.title} className="space-y-1">
              {!isCollapsed && (
                <h4 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 opacity-40">
                  {category.title}
                </h4>
              )}

              {category.menu.map((mod) => (
                <NavLink
                  key={mod.key}
                  to={mod.url || ""}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between rounded-sm px-3 py-2.5 text-xs font-medium transition-colors duration-200 ease-in-out shadow-sm mb-2",
                      isActive
                        ? "bg-secondary text-secondary-foreground border-s-4"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground hover:border-s-4",
                      isCollapsed && "justify-center px-2",
                    )
                  }
                  title={isCollapsed ? mod.name : undefined}
                >
                  <div className="flex items-center gap-3 truncate duration-200 ease-in-out">
                    <mod.icon className="h-4 w-4 shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate">{mod.name}</span>
                    )}
                  </div>
                </NavLink>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export const AdminSidebar = () => {
  const { moduleInfo } = useModuleStore();
  const { appInfo } = useAppStore();
  const { isMobileOpen, setMobileOpen, isCollapsed } = useLayoutStore();

  const location = useLocation();
  const categoriesSlug = location.pathname.split("/");

  const categoryData = moduleInfo?.find((its) => its.slug == categoriesSlug[1]);

  const sidebarMenu = useMemo(() => {
    let menu: sidebarType[] = [];
    if (
      categoriesSlug?.[1] == "education-academic" &&
      categoriesSlug?.[2] == "academic"
    )
      menu = AcademicSidebarMenu;

    return menu;
  }, [categoriesSlug]);

  return (
    <>
      <aside
        className={cn(
          "hidden md:block transition-all duration-300 shrink-0 ps-2.5 pt-2.5 h-[calc(100vh-10px)]!",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <SidebarContent
          sidebarMenu={sidebarMenu}
          isCollapsed={isCollapsed}
          onNavigate={() => setMobileOpen(false)}
          appInfo={appInfo}
          categoryData={categoryData}
          moduleSlug={categoriesSlug?.[2]}
        />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <SidebarContent
            sidebarMenu={sidebarMenu}
            isCollapsed={false}
            onNavigate={() => setMobileOpen(false)}
            appInfo={appInfo}
            categoryData={categoryData}
            moduleSlug={categoriesSlug?.[2]}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
