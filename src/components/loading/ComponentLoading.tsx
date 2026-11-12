import "@/assets/css/component-loading.css";

const ComponentLoading = ({
  size = "md",
  text = "Loading...",
  description = "Please wait, the process is underway.",
  variant = "block",
  showText = true,
  className = "",
}) => {
  return (
    <div
      className={[
        "edu-loader",
        `edu-loader--${size}`,
        `edu-loader--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="edu-loader__visual" aria-hidden="true">
        <div className="edu-loader__glow" />

        <div className="edu-loader__book">
          <div className="edu-loader__page edu-loader__page--left">
            <span />
            <span />
            <span />
          </div>

          <div className="edu-loader__page edu-loader__page--right">
            <span />
            <span />
            <span />
          </div>

          <div className="edu-loader__spine" />
        </div>

        <div className="edu-loader__spark edu-loader__spark--one">✦</div>

        <div className="edu-loader__spark edu-loader__spark--two">·</div>
      </div>

      {showText && (
        <div className="edu-loader__content">
          <span className="edu-loader__text">{text}</span>

          {description && (
            <span className="edu-loader__description">{description}</span>
          )}
        </div>
      )}

      <span className="edu-loader__sr-only">{text}</span>
    </div>
  );
};

export default ComponentLoading;
