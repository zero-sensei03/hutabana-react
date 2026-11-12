import { useGetModulePublic } from "@/services/landing-page";
import { ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router";
import LogoDark from "@/assets/images/logo-dark.webp";

export function SiteFooter() {
  const { data } = useGetModulePublic();

  const footerGroups = useMemo(() => {
    const links_data = [];
    if (data?.data) {
      links_data.push({
        title: "Products",
        links: data.data.map((its) => ({
          label: its.name,
          to: `/modules?category=${its.slug}`,
        })),
      });
    }

    links_data.push({
      title: "Company",
      links: [
        { label: "About Us", to: "/about-us" },
        { label: "Help Center", to: "/help-center" },
        { label: "Contact Us", to: "/contacts" },
        { label: "Privacy Policy", to: "/privacy-policy" },
        { label: "Terms of Service", to: "/terms" },
      ],
    });

    return links_data;
  }, [data]);

  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      {/* Decorative accent */}
      <div
        className="pointer-events-none absolute -right-24 -top-32
        size-80 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-300 px-4">
        {/* Main footer */}
        <div
          className="grid gap-12 py-14 sm:py-16
          md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand */}
          <div className="space-y-5 lg:col-span-2">
            <Link to="/" className="group inline-flex items-center gap-3">
              <span className="bg-primary p-1.5 rounded-lg">
                <img src={LogoDark} alt="logo" width={40} />
              </span>

              <span className="text-lg font-bold tracking-tight">
                {import.meta.env.VITE_APP_NAME || "HUTABANA"}
              </span>
            </Link>

            <p className="max-w-md text-sm leading-5 text-background/65">
              A flexible modular platform for education, business, and
              organizations. Build a system that fits your needs and grows with
              you.
            </p>

            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 text-sm
                font-semibold text-primary transition-colors
                hover:text-primary/80"
            >
              Let's talk about your needs
              <ArrowUpRight
                className="size-4 transition-transform
                group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Navigation groups */}
          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-5">
              <h3 className="text-sm font-semibold text-background">
                {group.title}
              </h3>

              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-flex items-center gap-1
                        text-sm text-background/60
                        transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="flex flex-col gap-3 py-6 text-xs
          text-background/50 sm:flex-row sm:items-center
          sm:justify-between"
        >
          <p>
            © {new Date().getFullYear()}{" "}
            {import.meta.env.VITE_APP_NAME || "HUTABANA"}. All rights reserved.
          </p>

          <p>Built for organizations that aspire to grow.</p>
        </div>
      </div>
    </footer>
  );
}
