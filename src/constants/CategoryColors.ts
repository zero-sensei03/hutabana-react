export const CATEGORY_COLORS = [
  {
    background: "bg-red-100",
    hoverBackground: "hover:bg-red-100/40",
    foreground: "text-red-600",
    border: "border-red-200",
    buttonBackground: "bg-red-600",
    buttonHoverText: "group-hover:text-red-600",
  },
  {
    background: "bg-purple-100",
    hoverBackground: "hover:bg-purple-100/40",
    foreground: "text-purple-600",
    border: "border-purple-200",
    buttonBackground: "bg-purple-600",
    buttonHoverText: "group-hover:text-purple-600",
  },
  {
    background: "bg-green-100",
    hoverBackground: "hover:bg-green-100/40",
    foreground: "text-green-600",
    border: "border-green-200",
    buttonBackground: "bg-green-600",
    buttonHoverText: "group-hover:text-green-600",
  },
  {
    background: "bg-blue-100",
    hoverBackground: "hover:bg-blue-100/40",
    foreground: "text-blue-600",
    border: "border-blue-200",
    buttonBackground: "bg-blue-600",
    buttonHoverText: "group-hover:text-blue-600",
  },
  {
    background: "bg-orange-100",
    hoverBackground: "hover:bg-orange-100/40",
    foreground: "text-orange-600",
    border: "border-orange-200",
    buttonBackground: "bg-orange-600",
    buttonHoverText: "group-hover:text-orange-600",
  },
  {
    background: "bg-pink-100",
    hoverBackground: "hover:bg-pink-100/40",
    foreground: "text-pink-600",
    border: "border-pink-200",
    buttonBackground: "bg-pink-600",
    buttonHoverText: "group-hover:text-pink-600",
  },
  {
    background: "bg-yellow-100",
    hoverBackground: "hover:bg-yellow-100/40",
    foreground: "text-yellow-600",
    border: "border-yellow-200",
    buttonBackground: "bg-yellow-600",
    buttonHoverText: "group-hover:text-yellow-600",
  },
  {
    background: "bg-indigo-100",
    hoverBackground: "hover:bg-indigo-100/40",
    foreground: "text-indigo-600",
    border: "border-indigo-200",
    buttonBackground: "bg-indigo-600",
    buttonHoverText: "group-hover:text-indigo-600",
  },
  {
    background: "bg-teal-100",
    hoverBackground: "hover:bg-teal-100/40",
    foreground: "text-teal-600",
    border: "border-teal-200",
    buttonBackground: "bg-teal-600",
    buttonHoverText: "group-hover:text-teal-600",
  },
  {
    background: "bg-cyan-100",
    hoverBackground: "hover:bg-cyan-100/40",
    foreground: "text-cyan-600",
    border: "border-cyan-200",
    buttonBackground: "bg-cyan-600",
    buttonHoverText: "group-hover:text-cyan-600",
  },
  {
    background: "bg-emerald-100",
    hoverBackground: "hover:bg-emerald-100/40",
    foreground: "text-emerald-600",
    border: "border-emerald-200",
    buttonBackground: "bg-emerald-600",
    buttonHoverText: "group-hover:text-emerald-600",
  },
  {
    background: "bg-rose-100",
    hoverBackground: "hover:bg-rose-100/40",
    foreground: "text-rose-600",
    border: "border-rose-200",
    buttonBackground: "bg-rose-600",
    buttonHoverText: "group-hover:text-rose-600",
  },
] as const;

export function getCategoryColor(key: string) {
  let hash = 0;

  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }

  const index = Math.abs(hash) % CATEGORY_COLORS.length;

  return CATEGORY_COLORS[index];
}
