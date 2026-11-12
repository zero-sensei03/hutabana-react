import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ModuleInfoProps {
  code: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  modules: {
    code: string;
    module_name: string;
    slug: string;
    description: string;
    order: number;
    price_monthly: number;
    price_yearly: number;
    discount_monthly: number;
    discount_yearly: number;
    is_active: boolean;
    is_sellable: boolean;
  }[];
}

interface ModuleState {
  moduleInfo: ModuleInfoProps[] | null;
  setModuleInfo: (info: ModuleInfoProps[]) => void;
  clearModuleInfo: () => void;
}

export const useModuleStore = create<ModuleState>()(
  persist(
    (set) => ({
      moduleInfo: null,
      setModuleInfo: (info) => set({ moduleInfo: info }),
      clearModuleInfo: () => set({ moduleInfo: null }),
    }),
    {
      name: "app-module-ofa",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        moduleInfo: state.moduleInfo,
      }),
    },
  ),
);
