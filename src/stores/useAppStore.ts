import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppInfo {
  name: string;
  logo: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface AppState {
  appInfo: AppInfo | null;
  setAppInfo: (info: AppInfo) => void;
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
