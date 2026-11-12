import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppInfoProps {
  name: string;
  logo: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface AppState {
  appInfo: AppInfoProps | null;
  setAppInfo: (info: AppInfoProps) => void;
}

export const useAppStore = create<AppState>()(
  //   appInfo: null,
  persist(
    (set) => ({
      appInfo: null,
      setAppInfo: (info) => set({ appInfo: info }),
    }),
    {
      name: "app-information-ofa",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        appInfo: state.appInfo,
      }),
    },
  ),
);
