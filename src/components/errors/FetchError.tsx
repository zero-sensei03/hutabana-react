import "@/assets/css/component-fetch-error.css";

type FetchErrorProps = {
  size?: "sm" | "md" | "lg";
  title?: string;
  description?: string;
  variant?: "block" | "inline";
  showText?: boolean;
  className?: string;
  retryText?: string;
  onRetry?: () => void;
};

const FetchError = ({
  size = "md",
  title = "Failed to Load Data",
  description = "Something went wrong while fetching data. Please try again.",
  variant = "block",
  showText = true,
  className = "",
  retryText = "Try Again",
  onRetry,
}: FetchErrorProps) => {
  return (
    <div
      className={[
        "edu-fetch-error",
        `edu-fetch-error--${size}`,
        `edu-fetch-error--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="alert"
      aria-live="assertive"
    >
      <div className="edu-fetch-error__visual" aria-hidden="true">
        <div className="edu-fetch-error__glow" />

        <div className="edu-fetch-error__book">
          <div className="edu-fetch-error__page edu-fetch-error__page--left">
            <span />
            <span />
            <span />
          </div>

          <div className="edu-fetch-error__page edu-fetch-error__page--right">
            <span />
            <span />
            <span />
          </div>

          <div className="edu-fetch-error__spine" />
        </div>

        <div className="edu-fetch-error__warning">
          <span>!</span>
        </div>

        <div className="edu-fetch-error__spark edu-fetch-error__spark--one">
          ✦
        </div>

        <div className="edu-fetch-error__spark edu-fetch-error__spark--two">
          ·
        </div>
      </div>

      {showText && (
        <div className="edu-fetch-error__content">
          <span className="edu-fetch-error__title">{title}</span>

          {description && (
            <span className="edu-fetch-error__description">{description}</span>
          )}

          {onRetry && (
            <button
              type="button"
              className="edu-fetch-error__retry"
              onClick={onRetry}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 7v5h-5" />
                <path d="M4 17v-5h5" />
                <path d="M5.64 9A7 7 0 0 1 17.5 6.5L20 12" />
                <path d="M18.36 15A7 7 0 0 1 6.5 17.5L4 12" />
              </svg>

              {retryText}
            </button>
          )}
        </div>
      )}

      <span className="edu-fetch-error__sr-only">{title}</span>
    </div>
  );
};

export default FetchError;
