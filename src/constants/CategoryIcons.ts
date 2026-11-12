import {
  GraduationCap,
  Store,
  Utensils,
  Users,
  Factory,
  ShoppingBag,
  Building2,
  BriefcaseBusiness,
  Truck,
  CalendarDays,
  Layers,
  CircleHelp,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICONS = {
  "graduation-cap": GraduationCap,
  store: Store,
  utensils: Utensils,
  users: Users,
  factory: Factory,
  "shopping-bag": ShoppingBag,
  "building-2": Building2,
  "briefcase-business": BriefcaseBusiness,
  truck: Truck,
  "calendar-days": CalendarDays,
  layers: Layers,
} satisfies Record<string, LucideIcon>;

export const DEFAULT_CATEGORY_ICON: LucideIcon = CircleHelp;

export function getCategoryIcon(
  iconName: string | null | undefined,
): LucideIcon {
  if (!iconName) {
    return DEFAULT_CATEGORY_ICON;
  }

  return (
    CATEGORY_ICONS[iconName as keyof typeof CATEGORY_ICONS] ??
    DEFAULT_CATEGORY_ICON
  );
}
