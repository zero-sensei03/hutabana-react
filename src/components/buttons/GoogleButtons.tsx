import { cn } from "cn";
import { Button } from "../ui/button";

export const GoogleButton = ({
  action,
  isLoading = false,
}: {
  action: () => void;
  isLoading?: boolean;
}) => {
  return (
    <Button
      type="button"
      disabled={isLoading}
      onClick={action}
      className={cn(
        "px-4 h-10 border border-input rounded-md bg-background hover:bg-muted/50 text-xs font-semibold text-foreground transition-all shadow-xs cursor-pointer w-full",
      )}
    >
      <div
        className={cn("flex items-center justify-center gap-2", {
          "animate-bounce": isLoading,
        })}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.6 6.4C.6 8.4 0 10.6 0 13s.6 4.6 1.6 6.6l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z"
          />
        </svg>
        {isLoading ? "Loading ..." : "Continue with Google"}
      </div>
    </Button>
  );
};
