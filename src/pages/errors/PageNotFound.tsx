import "@/assets/css/not-found.css";
import { useAppStore } from "@/stores/useAppStore";
import { useLocation } from "react-router";

const NotFound = ({
  homeLabel = "Back to Home",
  title = "Oops! Page Not Found",
  description = "It looks like the page you are looking for is not here. It may have been moved, deleted, or the address might be incorrect.",
  showBackButton = true,
}) => {
  const { appInfo } = useAppStore();
  const location = useLocation();

  const homeHref = location.pathname.includes("portal") ? "/portal" : "/";

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.assign(homeHref);
    }
  };

  return (
    <main className="edu-not-found">
      {/* Background decoration */}
      <div className="edu-not-found__background">
        <div className="not-found-orb not-found-orb--one" />
        <div className="not-found-orb not-found-orb--two" />
        <div className="not-found-grid" />
      </div>

      <section className="edu-not-found__container">
        {/* Brand */}
        <div className="edu-not-found__brand">
          <div className="not-found-brand-icon">
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M5 8.5C9.2 7.2 13.1 8.1 16 10.3V25C12.8 22.7 9 22 5 23.5V8.5Z"
                fill="currentColor"
              />
              <path
                d="M27 8.5C22.8 7.2 18.9 8.1 16 10.3V25C19.2 22.7 23 22 27 23.5V8.5Z"
                fill="currentColor"
                opacity=".65"
              />
              <path d="M16 10.3V25" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <span>{appInfo?.name || "HUTABANA"}</span>
        </div>

        {/* Illustration */}
        <div className="edu-not-found__illustration">
          <div className="not-found-orbit not-found-orbit--one" />
          <div className="not-found-orbit not-found-orbit--two" />

          <span className="not-found-star not-found-star--one">✦</span>
          <span className="not-found-star not-found-star--two">✧</span>
          <span className="not-found-star not-found-star--three">·</span>

          <div className="not-found-floating-page not-found-floating-page--one">
            <span />
            <span />
            <span />
          </div>

          <div className="not-found-floating-page not-found-floating-page--two">
            <span />
            <span />
            <span />
          </div>

          <div className="not-found-book">
            <div className="not-found-book__left">
              <span className="not-found-book__symbol">?</span>
              <div className="not-found-book__lines">
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="not-found-book__right">
              <span className="not-found-book__symbol">✦</span>
              <div className="not-found-book__lines">
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="not-found-book__spine" />
          </div>

          <div className="not-found-shadow" />
        </div>

        {/* Error number */}
        <div className="edu-not-found__number">
          <span>4</span>
          <span className="number-zero">0</span>
          <span>4</span>
        </div>

        {/* Message */}
        <div className="edu-not-found__message">
          <div className="not-found-label">
            <span />
            PAGE NOT FOUND
            <span />
          </div>

          <h1>{title}</h1>

          <p>{description}</p>
        </div>

        {/* Actions */}
        <div className="edu-not-found__actions">
          <a
            href={homeHref}
            className="not-found-button not-found-button--primary"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V10.5Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M9 21V14H15V21"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>

            {homeLabel}
          </a>

          {showBackButton && (
            <button
              type="button"
              onClick={handleGoBack}
              className="not-found-button not-found-button--secondary"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M5 12L11 18M5 12L11 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Previous Page
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="edu-not-found__footer">
          <span>✦</span>
          <p>Every journey of knowledge starts somewhere.</p>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
