import { useState, useMemo, createElement } from "react";
import {
  Search,
  ArrowRight,
  Compass,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import { dummyLauncher } from "@/constants/DummyData";
import { getCategoryIcon } from "@/constants/CategoryIcons";
import { useNavigate } from "react-router";
import { useAppStore } from "@/stores/useAppStore";
import { LogoutModal } from "@/components/modal/LogoutModal";
import { Input } from "@/components/ui/input";

export default function LauncherPage() {
  const { appInfo } = useAppStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoriesData = useMemo(() => {
    return dummyLauncher.data.filter((its) => its.modules.length > 0);
  }, []);

  const renderCategoryIcon = (iconName: string) => getCategoryIcon(iconName);

  const filteredCategories = useMemo(() => {
    return categoriesData
      .filter((cat) => {
        if (selectedCategory !== "all" && cat.slug !== selectedCategory)
          return false;
        return true;
      })
      .map((cat) => {
        const filteredModules = cat.modules.filter(
          (mod) =>
            mod.module_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mod.description.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        return {
          ...cat,
          modules: filteredModules,
        };
      })
      .filter((cat) => cat.modules.length > 0);
  }, [searchQuery, selectedCategory, categoriesData]);

  const handleModuleClick = (categorySlug: string, moduleSlug: string) => {
    navigate(`/${categorySlug}/${moduleSlug}`);
  };

  const [openLogout, setOpenLogout] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      <LogoutModal
        isOpen={openLogout}
        onOpenChange={() => setOpenLogout(!openLogout)}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-secondary backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!appInfo?.logo ? (
              <div className="inline-flex items-center justify-center w-10! h-10! rounded-lg bg-primary font-bold text-xl shadow-sm">
                ✨
              </div>
            ) : (
              <img
                src={appInfo?.logo}
                alt="logo"
                height={20}
                className="w-auto h-14"
              />
            )}
            <div className="leading-3">
              <span className="font-extrabold text-base tracking-tight text-foreground block">
                {appInfo?.name || "HUTABANA"}
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">
                Workspace Launcher
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border-secondary-foreground text-secondary-foreground text-xs font-medium border">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Workspace</span>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <button
              onClick={() => setOpenLogout(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-2xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Select Your Module
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Choose from your active enterprise modules below to launch directly
            into your dedicated management workspace.
          </p>
        </div>

        <div className="flex flex-col items-stretch md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              All
            </button>
            {categoriesData.map((cat) => (
              <button
                key={cat.code}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground">
              <Search className="w-4 h-4" />
            </span>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search modules..."
              className="w-full h-10 pl-10 pr-4 bg-card border border-input rounded-md text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition-all shadow-2xs"
            />
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border/60 rounded-3xl p-8">
            <Compass className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <h3 className="text-base font-bold text-foreground">
              No modules found
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Try adjusting your search query or selected category filter.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category) => (
              <section key={category.code} className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border/60">
                  <div className="w-9 h-9 rounded-md bg-accent text-accent-foreground flex items-center justify-center">
                    {createElement(renderCategoryIcon(category.icon), {
                      size: 16,
                      strokeWidth: 1.8,
                    })}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground tracking-tight">
                      {category.name}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.modules.map((mod) => (
                    <div
                      key={mod.code}
                      onClick={() => handleModuleClick(category.slug, mod.slug)}
                      className="group relative bg-card border border-border/70 hover:border-ring/50 rounded-lg p-5 shadow-2xs hover:shadow-xl hover:shadow-black/3 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors mb-1.5">
                            {mod.module_name}
                          </h3>
                          <span className="w-7 h-7 rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground text-muted-foreground flex items-center justify-center transition-all">
                            <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {mod.description}
                        </p>
                      </div>

                      {/* Card Footer Indicator */}
                      <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Ready to Launch
                        </span>
                        <span className="group-hover:translate-x-0.5 transition-transform text-primary font-semibold flex items-center gap-1">
                          Access <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border/60 py-6 text-center text-xs text-muted-foreground bg-background/50">
        <p>© 2026 Enterprise Launcher. All rights reserved.</p>
      </footer>
    </div>
  );
}
