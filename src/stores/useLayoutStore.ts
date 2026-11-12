import { create } from "zustand";

interface LayoutState {
  isMobileOpen: boolean;
  isCollapsed: boolean;
  setMobileOpen: (open: boolean) => void;
  toggleMobile: () => void;
  toggleCollapse: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isMobileOpen: false,
  isCollapsed: false,
  setMobileOpen: (open) => set({ isMobileOpen: open }),
  toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
