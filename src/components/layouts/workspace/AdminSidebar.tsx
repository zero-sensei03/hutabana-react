import { createElement, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ArrowLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useModuleStore, type ModuleInfoProps } from "@/stores/useModuleStore";
import { useLayoutStore } from "@/stores/useLayoutStore";
import { useAppStore, type AppInfoProps } from "@/stores/useAppStore";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AcademicSidebarMenu,
  DashboardWorkspaceSidebarMenu,
  type sidebarType,
} from "@/constants/SidebarMenu";
import { getCategoryIcon } from "@/constants/CategoryIcons";

interface SidebarContentProps {
  sidebarMenu: sidebarType[];
  isCollapsed: boolean;
  onNavigate: () => void;
  appInfo: AppInfoProps | null;
  categoryData?: ModuleInfoProps | null;
  moduleSlug?: string;
  launcherUrl?: string;
}

const SidebarContent = ({
  sidebarMenu,
  isCollapsed,
  onNavigate,
  appInfo,
  categoryData,
  moduleSlug,
  launcherUrl = "/portal",
}: SidebarContentProps) => (
  <div className="flex h-full flex-col overflow-hidden border bg-card text-card-foreground shadow-sm md:rounded-xl">
    {/* Brand / App Header */}
    <div
      className={cn(
        "flex h-16 shrink-0 items-center border-b transition-all duration-200",
        isCollapsed ? "justify-center px-2" : "gap-3 px-4",
      )}
    >
      {!appInfo?.logo ? (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
          <LayoutGrid className="h-4 w-4" />
        </div>
      ) : (
        <img
          src={appInfo.logo}
          alt={appInfo?.name ?? "App Logo"}
          className={cn(
            "object-contain transition-all",
            isCollapsed ? "h-8 w-8" : "h-9 w-auto max-w-35",
          )}
        />
      )}

      {!isCollapsed && (
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-bold tracking-tight text-foreground">
            {appInfo?.name ?? "Academic System"}
          </span>
          {moduleSlug && (
            <span className="truncate text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {moduleSlug.replace(/-/g, " ")}
            </span>
          )}
        </div>
      )}
    </div>

    {/* Active Workspace / Module Card */}
    <div className={cn("shrink-0 pt-4", isCollapsed ? "px-2" : "px-3")}>
      {!isCollapsed ? (
        <div className="rounded-xl border bg-muted/40 p-3 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
              {createElement(getCategoryIcon(categoryData?.icon), {
                size: 18,
                strokeWidth: 2,
              })}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-foreground">
                {categoryData?.name ?? "Academic Module"}
              </p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="truncate text-[11px] text-muted-foreground">
                  Workspace Portal
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          title={categoryData?.name ?? "Workspace Portal"}
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border bg-muted/40 text-primary"
        >
          {createElement(getCategoryIcon(categoryData?.icon), {
            size: 18,
            strokeWidth: 2,
          })}
        </div>
      )}
    </div>

    {/* Navigation Menu List */}
    <nav
      aria-label="Sidebar Navigation"
      className={cn(
        "flex-1 overflow-y-auto py-4 scrollbar-thin",
        isCollapsed ? "px-2" : "px-3",
      )}
    >
      <div className="space-y-6">
        {sidebarMenu.map((category, idx) => (
          <div key={category.title} className="space-y-1">
            {!isCollapsed ? (
              <h4 className="mb-2 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {category.title}
              </h4>
            ) : (
              idx > 0 && <div className="mx-2 my-3 border-t border-border/60" />
            )}

            {category.menu.map((mod) => {
              const Icon = mod.icon;

              if (!mod.url) {
                return (
                  <div
                    key={mod.key}
                    aria-disabled="true"
                    title={`Coming soon: ${mod.name}`}
                    className={cn(
                      "flex cursor-not-allowed items-center rounded-lg py-2 text-xs font-medium text-muted-foreground/50 select-none",
                      isCollapsed
                        ? "justify-center px-2"
                        : "justify-between px-2.5",
                    )}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && (
                        <span className="truncate">{mod.name}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <span className="ml-2 shrink-0 rounded-full border bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Soon
                      </span>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={mod.key}
                  to={mod.url}
                  end={mod.url === "/education-academic/academic"}
                  onClick={onNavigate}
                  title={isCollapsed ? mod.name : undefined}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-lg py-2.5 text-xs font-medium transition-all duration-150",
                      isCollapsed
                        ? "justify-center px-2"
                        : "justify-between px-2.5",
                      isActive
                        ? "bg-primary/10 font-semibold text-primary shadow-2xs ring-1 ring-primary/15"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex min-w-0 items-center gap-3">
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        />
                        {!isCollapsed && (
                          <span className="truncate">{mod.name}</span>
                        )}
                      </div>

                      {!isCollapsed && isActive && (
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>
    </nav>

    {/* Footer: Back to Launcher */}
    <div
      className={cn(
        "mt-auto shrink-0 border-t bg-muted/20 p-3",
        isCollapsed && "p-2",
      )}
    >
      <Link
        to={launcherUrl}
        onClick={onNavigate}
        title={isCollapsed ? "Back to Launcher" : undefined}
        className={cn(
          "group flex items-center rounded-lg border bg-background text-xs font-medium text-muted-foreground shadow-2xs transition-all duration-150 hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
          isCollapsed
            ? "h-10 w-10 justify-center mx-auto"
            : "w-full justify-between px-3 py-2.5",
        )}
      >
        <div className="flex items-center gap-2.5 truncate">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
          </div>
          {!isCollapsed && (
            <span className="truncate font-semibold">Back to Launcher</span>
          )}
        </div>

        {!isCollapsed && (
          <LayoutGrid className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100" />
        )}
      </Link>
    </div>
  </div>
);

export const AdminSidebar = () => {
  const { moduleInfo } = useModuleStore();
  const { appInfo } = useAppStore();
  const { isMobileOpen, setMobileOpen, isCollapsed } = useLayoutStore();

  const location = useLocation();
  const categoriesSlug = location.pathname.split("/");

  const categoryData = moduleInfo?.find(
    (its) => its.slug === categoriesSlug[1],
  );

  const sidebarMenu = useMemo(() => {
    let menu: sidebarType[] = [];
    if (
      categoriesSlug?.[1] === "education-academic" &&
      categoriesSlug?.[2] === "academic"
    ) {
      menu = AcademicSidebarMenu;
    } else if (
      categoriesSlug?.[1] === "education-academic" &&
      categoriesSlug?.[2] === "dashboard-and-workspace"
    ) {
      menu = DashboardWorkspaceSidebarMenu;
    }

    return menu;
  }, [categoriesSlug]);

  return (
    <>
      {/* Desktop Floating Sidebar */}
      <aside
        className={cn(
          "fixed z-50 hidden h-screen shrink-0 p-2.5 transition-all duration-300 md:block",
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
          launcherUrl="/portal"
        />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-72 border-none bg-transparent p-2.5 shadow-none"
        >
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
            launcherUrl="/portal"
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
