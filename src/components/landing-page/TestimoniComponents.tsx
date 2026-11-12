import { Quote, ArrowUpRight, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "A more organized way to bring our everyday workflows together.",
    name: "Customer Name",
    role: "Organization Lead",
    organization: "Organization Name",
  },
  {
    quote:
      "The modular approach gives us more flexibility to choose the tools we need.",
    name: "Customer Name",
    role: "Business Manager",
    organization: "Organization Name",
  },
  {
    quote:
      "A promising foundation for making our organization's operations more connected.",
    name: "Customer Name",
    role: "Operations Manager",
    organization: "Organization Name",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        className="pointer-events-none absolute left-0 top-20
        size-64 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-300 px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full
            border border-primary/30 bg-primary/10 px-3 py-1.5
            text-xs font-semibold uppercase tracking-wider
            text-foreground"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            Built for Better Work
          </span>

          <h2
            className="mt-5 text-3xl font-bold tracking-tight
            text-foreground sm:text-4xl md:text-5xl"
          >
            Better Workflows.
            <span className="block text-primary">Better Possibilities.</span>
          </h2>

          <p
            className="mx-auto mt-4 max-w-xl text-sm leading-7
            text-muted-foreground sm:text-base"
          >
            Every organization works differently. Aozora Eduverse helps bring
            the tools, people, and processes you need into one flexible
            foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden rounded-2xl
                border-border/70 bg-card shadow-sm
                transition-all duration-300
                hover:-translate-y-1.5 hover:border-primary/50
                hover:shadow-xl hover:shadow-primary/10"
            >
              <CardContent className="flex h-full flex-col p-6 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className="flex size-11 items-center justify-center
                    rounded-xl bg-primary/15 text-primary
                    transition-colors duration-300
                    group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <Quote className="size-5" />
                  </div>

                  <span
                    className="text-xs font-medium
                    text-muted-foreground"
                  >
                    0{index + 1}
                  </span>
                </div>

                <p className="flex-1 text-base leading-7 text-foreground/85">
                  “{item.quote}”
                </p>

                <div className="my-6 h-px bg-border" />

                <div className="flex items-center gap-3">
                  <div
                    className="flex size-11 shrink-0 items-center
                    justify-center rounded-full bg-accent
                    text-accent-foreground"
                  >
                    <UserRound className="size-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-sm font-semibold
                      text-foreground"
                    >
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.role}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {item.organization}
                    </p>
                  </div>

                  <ArrowUpRight
                    className="size-4 shrink-0
                    text-muted-foreground transition-transform
                    duration-300 group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-primary"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
