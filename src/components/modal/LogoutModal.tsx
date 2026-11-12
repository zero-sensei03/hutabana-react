import { LogOut } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ProcessingButton } from "../loading/ProcessingButton";

type props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export const LogoutModal = ({ isOpen, onOpenChange }: props) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleConfirm = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/auth/sign-in");
      setLoading(false);
    }, 1000);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0 shadow-2xs">
            <LogOut className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground tracking-tight">
              Sign out of account
            </h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Are you sure you want to log out? You will need to enter your
              credentials again to access your workspace.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenChange}
            disabled={isLoading}
            className="flex-1 h-11 px-4 rounded-xl border border-input bg-background hover:bg-secondary text-xs font-semibold text-foreground transition-all cursor-pointer shadow-2xs disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 h-11 px-4 rounded-xl bg-destructive/60 hover:opacity-90 text-xs font-semibold text-white transition-all cursor-pointer shadow-xs inline-flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <ProcessingButton /> : "Yes, Sign Out"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
