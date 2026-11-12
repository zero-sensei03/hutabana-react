import { KeyRound, Layers3, ShieldCheck, Workflow, Blocks } from "lucide-react";

export const PhilosophyHighlights = [
  {
    order: 1,
    icon: Workflow,
    title: "Adapts to Your Workflow",
    desc: "Technology adapts to your organization's needs, not the other way around.",
    iconColor: "bg-indigo-400/20 border-indigo-400 text-indigo-600",
    bgColorIcon: "bg-[#e5deff]",
  },
  {
    order: 2,
    icon: Blocks,
    title: "Built to Grow",
    desc: "A flexible ecosystem that evolves alongside your organization's growth and changing needs.",
    iconColor: "bg-emerald-400/20 border-emerald-400 text-emerald-600",
    bgColorIcon: "bg-[#99f0ff]",
  },
];

export const CoreValue = [
  {
    order: 1,
    icon: KeyRound,
    title: "One Account, Every Access",
    desc: "Access multiple modules and services within a unified ecosystem through Single Sign-On (SSO). Sign in once to access the services you need, based on your role and permissions.",
    tagline: "One Account, One Ecosystem",
    color: "text-[#7865e8]",
    bgColorIcon: "bg-[#e5deff]",
  },
  {
    order: 2,
    icon: Layers3,
    title: "Modular by Design",
    desc: "Choose only the modules your organization needs. Start with essential services and gradually expand your capabilities without having to adopt every feature from the beginning.",
    tagline: "Built Around Your Needs",
    color: "text-[#3495a1]",
    bgColorIcon: "bg-[#99f0ff]",
  },
  {
    order: 3,
    icon: ShieldCheck,
    title: "Security and Control",
    desc: "Manage access based on user roles and protect organizational information through security mechanisms designed to support more controlled and reliable operations.",
    tagline: "Secure by Design",
    color: "text-[#7769a1]",
    bgColorIcon: "bg-[#e8ddff]",
  },
];

export const DeployJournay = [
  {
    order: 1,
    title: "Choose Your Modules",
    desc: "Select applications according to your organization's immediate operational needs, whether starting with simple attendance or full financial ledgers.",
  },
  {
    order: 2,
    title: "Configure Your Workspace",
    desc: "Set up your organization, import existing master records, assign team roles with granular permissions, and launch in days rather than months.",
  },
  {
    order: 3,
    title: "Grow Your Platform",
    desc: "Add more modules as your organization evolves. New modules plug instantly into your shared database without complex re-integrations.",
  },
];
