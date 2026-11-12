import BackgroundImage from "@/assets/images/background.webp";
import Section2Image from "@/assets/images/home-2-section.webp";
import { HomeModuleComponent } from "@/components/landing-page/ModuleComponents";
import { TestimonialsSection } from "@/components/landing-page/TestimoniComponents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  CoreValue,
  DeployJournay,
  PhilosophyHighlights,
} from "@/constants/LandingContext";
import { cn } from "cn";
import {
  AppWindowIcon,
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle,
  Grid2X2CheckIcon,
  Layers3,
  MessageCircle,
  Route,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="space-y-8">
      <section
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        <div className="min-h-140 flex items-center max-w-300 mx-auto">
          <div className="max-w-2xl space-y-4 px-4">
            <div className="flex">
              <div className="bg-secondary border border-primary px-2 sm:py-1.5 py-1 sm:text-xs text-[10px] rounded-full font-semibold flex items-center gap-2 text-gray-500">
                <span className="bg-primary sm:p-1.5 p-1 rounded-full"></span>
                INDONESIA'S NEW GENERATION OF EDUTECH
              </div>
            </div>
            <h1 className="sm:text-6xl md:text-5xk text-4xl font-bold">
              A Single Ecosystem for All{" "}
              <span className="text-primary">Educational Operations</span>
            </h1>
            <p className="sm:text-base md:text-sm text-xs">
              A modern ERP & LMS platform featuring cutting-edge anime
              aesthetics, designed for schools, tutoring centers, and academies
              in Indonesia. Integrate academics, attendance, finance, and
              communication into one seamless workflow.
            </p>
            <div className="flex items-center space-x-3">
              <Button
                className={cn(
                  "h-10 px-4 sm:text-base md:text-sm text-xs hover:-translate-y-1 hover:shadow-lg duration-200 cursor-pointer text-white shadow-sm rounded-base",
                )}
              >
                Get Started
                <ArrowRight />
              </Button>
              <Button
                className={cn(
                  "bg-white h-10 px-4 sm:text-base md:text-sm text-xs hover:-translate-y-1 hover:shadow-lg duration-200 cursor-pointer shadow-sm rounded-base hover:bg-white hover:border-primary",
                )}
              >
                <AppWindowIcon className="text-primary" />
                Explore modules
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-350 mx-auto px-4 space-y-8">
        <div className="space-y-2 max-w-180 px-2">
          <div className="space-y-2">
            <div className="flex">
              <span className="flex items-center gap-2 text-primary font-bold md:text-sm text-[10px] uppercase bg-secondary/60 px-2.5 py-1 rounded-full border border-primary">
                <Grid2X2CheckIcon size={16} />
                Modular Workspace Engine
              </span>
            </div>
            <h1 className="font-bold md:text-4xl text-3xl">
              Highly Modular Centralized Interface
            </h1>
            <p className="xl:text-lg md:text-base sm:text-sm text-xs">
              Navigate every operational function of the organization without
              switching tabs, designed with the conciseness of a desktop
              interface and the fluidity of the cloud.
            </p>
          </div>
        </div>
        <Card className="shadow-md bg-linear-to-br from-primary/20 via-white to-secondary/20 space-y-2 rounded-md!">
          <CardHeader className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="flex gap-2">
                <span className="h-3 w-3 bg-red-800 rounded-full" />
                <span className="h-3 w-3 bg-purple-600 rounded-full" />
                <span className="h-3 w-3 bg-cyan-600 rounded-full" />
              </div>
              <span className="font-bold uppercase">
                {import.meta.env.VITE_APP_NAME || "HUTABANA"}
              </span>
            </div>

            <Link
              to="/modules"
              className="
                group relative md:inline-flex hidden items-center gap-2
                overflow-hidden rounded-full
                border border-primary/20
                bg-white/70 px-4 py-2
                text-sm font-semibold text-primary
                shadow-sm backdrop-blur-sm
                transition-all duration-300 ease-out
                hover:-translate-y-0.5
                hover:border-primary/40
                hover:bg-linear-to-br hover:from-primary/20 hover:to-secondary/20
                hover:shadow-md hover:shadow-primary/20
                active:translate-y-0 active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-primary
                focus-visible:ring-offset-2
              "
            >
              <span>Explore All</span>

              <ArrowRight
                size={16}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </CardHeader>
          <CardContent>
            <HomeModuleComponent limit={6} />
            <div className="flex items-center justify-center mt-4">
              <Link
                to="/modules"
                className="
                  md:hidden group relative inline-flex items-center gap-2
                  overflow-hidden rounded-full
                  border border-primary/20
                  bg-white/70 px-4 py-2
                  text-sm font-semibold text-primary
                  shadow-sm backdrop-blur-sm
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5
                  hover:border-primary/40
                  hover:bg-linear-to-br hover:from-primary/20 hover:to-secondary/20
                  hover:shadow-md hover:shadow-primary/20
                  active:translate-y-0 active:scale-95
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-primary
                  focus-visible:ring-offset-2
                "
              >
                <span>Explore All</span>

                <ArrowRight
                  size={16}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="max-w-350 mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[5fr_6fr] grid-cols-1 xl:space-x-12 lg:space-x-12 space-y-6 items-center">
          <div
            className="bg-cover bg-center bg-no-repeat min-h-54 h-full rounded-lg relative overflow-hidden p-4 flex flex-col justify-end"
            style={{
              backgroundImage: `url(${Section2Image})`,
            }}
          >
            <div className="bg-black/20 absolute inset-0" />
            <div className="bg-white relative rounded-lg p-4 shadow-lg italic font-semibold md:text-base text-xs">
              “A harmonious convergence of human empathy and scalable modular
              computing.”
            </div>
          </div>
          <div className="sm:space-y-4 space-y-2">
            <h1 className="font-bold md:text-4xl sm:text-3xl text-2xl sm:mb-6 mb-4">
              Technology That Adapts to the Way You Work.
            </h1>
            <p className="xl:text-lg md:text-base sm:text-sm text-xs">
              Every organization has its own identity, needs, and workflows. Yet
              conventional software often forces organizations into the same
              rigid systems, limiting their flexibility and potential for
              growth.
            </p>
            <p className="xl:text-lg md:text-base sm:text-sm text-xs">
              At {import.meta.env.VITE_APP_NAME || "HUTABANA"}, we take a
              different approach. We build a technology ecosystem that adapts to
              each organization's needs, brings workflows together on a unified
              platform, and evolves alongside your changing requirements.
            </p>
            <div className="grid sm:grid-cols-2 sm:space-x-4 grid-cols-1 sm:space-y-0 space-y-2 mt-6">
              {PhilosophyHighlights.map((item) => (
                <Card
                  key={item.title}
                  className={`bg-indigo-300/15 border border-indigo-300 rounded-md py-4`}
                >
                  <CardContent className="grid grid-cols-[25%_auto] space-x-4 items-start px-2.5">
                    <div className="flex items-center justify-center">
                      <div
                        className={`${item.iconColor} p-3 rounded-sm border`}
                      >
                        <item.icon size={16} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h2 className="font-bold sm:text-base text-sm">
                        {item.title}
                      </h2>
                      <p className="sm:text-xs text-[10px] sm:leading-5 leading-3">
                        {item.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[#ffffff] py-12">
        <section className="max-w-350 mx-auto px-4 space-y-4">
          <div className="space-y-2 text-center max-w-172 mx-auto">
            <div className="flex justify-center">
              <span className="flex items-center gap-2 text-primary font-bold md:text-sm text-[10px] uppercase bg-secondary/60 px-2.5 py-1 rounded-full border border-primary">
                <Box size={16} />
                Core Plan
              </span>
            </div>
            <h1 className="font-bold md:text-4xl sm:text-3xl text-2xl">
              Built Around People. Designed for Possibilities.
            </h1>
            <p className="md:text-lg sm:text-sm text-xs">
              Our framework is grounded in three enduring design principles that
              guide every capability we build.
            </p>
          </div>
          <br />
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {CoreValue.map((item) => (
              <Card
                key={item.order}
                className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-border/60 bg-background transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-indigo-300/70 hover:shadow-lg hover:shadow-indigo-500/5 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 ${item.bgColorIcon.replace("bg-", "bg-")} transition-transform duration-300 group-hover:scale-x-100`}
                />

                <CardContent className="space-y-3">
                  <div className="flex">
                    <div
                      className={`${item.color} ${item.bgColorIcon} rounded-md p-2.5 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 motion-reduce:transform-none`}
                    >
                      <item.icon size={20} />
                    </div>
                  </div>

                  <h2 className="text-base font-bold transition-colors duration-300 group-hover:text-indigo-600">
                    {item.title}
                  </h2>

                  <p className="text-[10px] leading-3 sm:text-xs sm:leading-5">
                    {item.desc}
                  </p>
                </CardContent>

                <CardFooter
                  className={`${item.color} flex items-center gap-2 text-[10px] font-semibold md:text-xs`}
                >
                  <span>{item.tagline}</span>
                  <CheckCircle
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <div className="py-8">
        <section className="max-w-350 mx-auto px-4 space-y-4">
          <div className="space-y-2 text-center max-w-172 mx-auto">
            <div className="flex justify-center">
              <span className="flex items-center gap-2 text-primary font-bold md:text-sm text-[10px] uppercase bg-secondary/60 px-2.5 py-1 rounded-full border border-primary">
                <Route size={16} />
                Deployment Journay
              </span>
            </div>
            <h1 className="font-bold md:text-4xl sm:text-3xl text-2xl">
              Start Small. Expand When You're Ready.
            </h1>
            <p className="md:text-lg sm:text-sm text-xs">
              A frictionless deployment path designed to respect your
              operational tempo without disruptive overhauls.
            </p>
          </div>
          <br />
          <div className="grid md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-2 md:gap-y-0">
            {DeployJournay.map((item) => (
              <Card
                key={item.order}
                className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-border/60 bg-secondary/30 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/50 hover:bg-secondary/50 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-primary/80 via-primary to-primary/30 transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />

                <CardContent className="relative space-y-2.5">
                  <div className="flex">
                    <div className="rounded-sm text-3xl font-extrabold text-primary transition-transform duration-300 ease-out group-hover:scale-105 md:text-4xl motion-reduce:transform-none motion-reduce:transition-none">
                      {String(item.order).padStart(2, "0")}
                    </div>
                  </div>

                  <h2 className="text-base font-bold transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h2>

                  <p className="text-[10px] leading-3 text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:text-xs sm:leading-5">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <div className="hidden">
        <TestimonialsSection />
      </div>

      <section className="max-w-300 mx-auto px-4 py-8">
        <div
          className="group relative isolate overflow-hidden rounded-2xl
          bg-linear-to-br from-primary to-orange-500
          px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14
          shadow-lg shadow-primary/15"
        >
          {/* Decorative background */}
          <div
            className="pointer-events-none absolute -right-16 -top-24
            -z-10 size-72 rounded-full border border-white/40
            transition-transform duration-700 group-hover:scale-110"
          />

          <div
            className="pointer-events-none absolute -right-4 -top-12
            -z-10 size-52 rounded-full bg-white/10 blur-2xl
            transition-transform duration-700 group-hover:translate-x-3"
          />

          <div
            className="pointer-events-none absolute bottom-0 right-12
            -z-10 opacity-15 transition-transform duration-500
            group-hover:-translate-y-2"
          >
            <Layers3
              className="size-40 md:size-56 text-white"
              strokeWidth={0.7}
            />
          </div>

          <div className="max-w-3xl space-y-6">
            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 rounded-full
              border border-white/30 bg-black/10 px-3 py-1.5
              text-[10px] font-bold uppercase tracking-[0.16em]
              text-white sm:text-xs"
            >
              <span className="size-2 animate-pulse rounded-full bg-white" />
              Start Your Journey
              <Sparkles className="size-3.5" />
            </span>

            {/* Heading and description */}
            <div className="space-y-4">
              <h2
                className="max-w-2xl text-3xl font-bold leading-tight
                tracking-tight text-white sm:text-4xl md:text-5xl"
              >
                Your Next Chapter
                <br className="hidden sm:block" /> Starts Here.
              </h2>

              <p
                className="max-w-2xl text-sm leading-7 text-white/85
                sm:text-base md:text-lg"
              >
                Discover a more flexible way to manage your organization with{" "}
                {import.meta.env.VITE_APP_NAME || "HUTABANA"}. Bring your
                workflows together with a modular platform that grows with your
                needs.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Link
                to="/modules"
                className="inline-flex items-center justify-center gap-2
                  rounded-xl bg-white px-5 py-3.5 text-sm font-semibold
                  text-foreground shadow-md shadow-black/10
                  transition-all duration-300
                  hover:-translate-y-1 hover:bg-white/90 hover:shadow-lg
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-white focus-visible:ring-offset-2
                  focus-visible:ring-offset-primary"
              >
                Explore Our Features
                <ArrowUpRight
                  className="size-4 transition-transform
                  duration-300 group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                to="/contacts"
                className="inline-flex items-center justify-center gap-2
                  rounded-xl border border-white/40 bg-white/10 px-5 py-3.5
                  text-sm font-semibold text-white backdrop-blur-sm
                  transition-all duration-300
                  hover:-translate-y-1 hover:bg-white/20
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-white"
              >
                <MessageCircle className="size-4" />
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
