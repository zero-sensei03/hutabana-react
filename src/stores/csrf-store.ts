import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CsrfState = {
  csrfToken: string | null;
  setCsrfToken: (token: string | null) => void;
  clearCsrfToken: () => void;
};

export const useCsrfStore = create<CsrfState>()(
  persist(
    (set) => ({
      csrfToken: null,

      setCsrfToken: (token) => {
        set({ csrfToken: token });
      },

      clearCsrfToken: () => {
        set({ csrfToken: null });
      },
    }),
    {
      name: "csrf-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        csrfToken: state.csrfToken,
      }),
    },
  ),
);
