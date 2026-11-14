import "@/assets/css/empty-state.css";

const illustrations = {
  default: {
    icon: "✦",
    label: "EMPTY SPACE",
  },
  search: {
    icon: "⌕",
    label: "NO RESULTS",
  },
  folder: {
    icon: "▱",
    label: "EMPTY FOLDER",
  },
  users: {
    icon: "♧",
    label: "NO MEMBERS",
  },
  book: {
    icon: "▤",
    label: "NO MATERIALS",
  },
};

interface props {
  title?: string;
  description?: string;
  variant?: "default" | "search" | "folder" | "users" | "book";
  size?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
  showIllustration?: boolean;
  className?: string;
}

const EmptyState = ({
  title = "No Data",
  description = "The data you are looking for is not yet available. Start adding something to populate this page.",
  variant = "default",
  size = "md",
  actionLabel,
  onAction,
  icon,
  showIllustration = true,
  className = "",
}: props) => {
  const currentIllustration = illustrations[variant] || illustrations.default;

  return (
    <div
      className={[
        "edu-empty",
        `edu-empty--${size}`,
        `edu-empty--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showIllustration && (
        <div className="edu-empty__illustration" aria-hidden="true">
          <div className="edu-empty__ambient" />

          <div className="edu-empty__orbit edu-empty__orbit--one" />
          <div className="edu-empty__orbit edu-empty__orbit--two" />

          <div className="edu-empty__spark edu-empty__spark--one">✦</div>

          <div className="edu-empty__spark edu-empty__spark--two">✧</div>

          <div className="edu-empty__main-icon">
            {icon || currentIllustration.icon}
          </div>

          <div className="edu-empty__floating-dot edu-empty__floating-dot--one" />
          <div className="edu-empty__floating-dot edu-empty__floating-dot--two" />

          <div className="edu-empty__ground" />
        </div>
      )}

      <div className="edu-empty__content">
        <span className="edu-empty__eyebrow">
          <span />
          {currentIllustration.label}
          <span />
        </span>

        <h3>{title}</h3>

        {description && <p>{description}</p>}

        {actionLabel && onAction && (
          <button
            type="button"
            className="edu-empty__action"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
