import "@/assets/css/education-loading.css";
import { useAppStore } from "@/stores/useAppStore";

const PageLoading = ({
  title = "Preparing a Learning Experience",
  description = "Preparing something exciting for you...",
  progress = null,
  fullscreen = true,
  showProgress = true,
}) => {
  const { appInfo } = useAppStore();
  return (
    <div
      className={`education-loading ${
        fullscreen ? "education-loading--fullscreen" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={title}
    >
      <div className="education-loading__ambient">
        <span className="ambient-orb ambient-orb--one" />
        <span className="ambient-orb ambient-orb--two" />
        <span className="ambient-orb ambient-orb--three" />
      </div>

      <div className="education-loading__content">
        {/* Brand */}
        <div className="education-loading__brand">
          <div className="brand-mark">
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M5 8.5C9.2 7.2 13.1 8.1 16 10.3V25C12.8 22.7 9 22 5 23.5V8.5Z"
                fill="currentColor"
                opacity=".9"
              />
              <path
                d="M27 8.5C22.8 7.2 18.9 8.1 16 10.3V25C19.2 22.7 23 22 27 23.5V8.5Z"
                fill="currentColor"
                opacity=".65"
              />
              <path
                d="M16 10.3V25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M10 13L13 14M10 17L13 18M22 13L19 14M22 17L19 18"
                stroke="#fff"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity=".8"
              />
            </svg>
          </div>
          <span>{appInfo?.name || "HUTABANA"}</span>
        </div>

        {/* Illustration */}
        <div className="education-loading__illustration">
          <div className="illustration-grid" />

          <div className="floating-symbol floating-symbol--star">✦</div>

          <div className="floating-symbol floating-symbol--plus">+</div>

          <div className="floating-symbol floating-symbol--dot">
            <span />
            <span />
            <span />
          </div>

          <div className="floating-card floating-card--left">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 5.5C7 4.5 10 5.2 12 7V20C9.5 18.2 7 17.7 4 18.5V5.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M20 5.5C17 4.5 14 5.2 12 7V20C14.5 18.2 17 17.7 20 18.5V5.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="floating-card floating-card--right">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L14.8 8.7L21 9.6L16.5 14L17.6 20.2L12 17.3L6.4 20.2L7.5 14L3 9.6L9.2 8.7L12 3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="book-scene">
            <div className="book-shadow" />

            <div className="book">
              <div className="book-cover book-cover--left">
                <div className="book-page-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="book-page-decoration">
                  <span>✦</span>
                </div>
              </div>

              <div className="book-cover book-cover--right">
                <div className="book-page-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="book-page-decoration">
                  <span>✧</span>
                </div>
              </div>

              <div className="book-spine" />

              <div className="book-pages book-pages--one" />
              <div className="book-pages book-pages--two" />
            </div>

            <div className="book-glow" />
          </div>

          <div className="orbit orbit--one" />
          <div className="orbit orbit--two" />
        </div>

        {/* Text */}
        <div className="education-loading__text">
          <div className="loading-eyebrow">
            <span className="loading-indicator" />
            PLEASE WAIT A MOMENT
          </div>

          <h2>{title}</h2>

          <p>{description}</p>
        </div>

        {/* Progress */}
        {showProgress && (
          <div className="education-loading__progress">
            <div className="progress-track">
              <div
                className={`progress-fill ${
                  progress === null ? "progress-fill--indeterminate" : ""
                }`}
                style={
                  progress !== null
                    ? {
                        width: `${Math.min(100, Math.max(0, progress))}%`,
                      }
                    : undefined
                }
              />
            </div>

            <div className="progress-meta">
              <span>
                {progress !== null
                  ? progress >= 100
                    ? "Completed"
                    : "Processing..."
                  : "Preparing Everything"}
              </span>

              <span className="progress-percentage">
                {progress !== null ? `${Math.round(progress)}%` : "•••"}
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="education-loading__footer">
          <span className="footer-icon">✦</span>
          <span>Every great idea starts with learning.</span>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
