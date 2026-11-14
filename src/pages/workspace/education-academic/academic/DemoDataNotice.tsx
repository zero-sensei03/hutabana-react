import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DemoDataNotice() {
  return (
    <Alert className="border-amber-300/60 bg-amber-50/70 text-amber-950 dark:border-amber-700/50 dark:bg-amber-950/30 dark:text-amber-100">
      <Info aria-hidden="true" />
      <AlertDescription className="text-current">
        Demo data only. Changes stay in memory while this workspace is open;
        leaving the workspace or refreshing resets them. Nothing is saved.
      </AlertDescription>
    </Alert>
  );
}
