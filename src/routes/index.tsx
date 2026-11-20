import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { StrengthsHeadline } from "@/components/site/StrengthsHeadline";

const WorkspaceOrbit = lazy(() => import("@/components/site/WorkspaceOrbit"));
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Github,
  GraduationCap,
  HeartHandshake,
  BookOpen,
  Utensils,
  BrainCircuit,
  Database,
  GraduationCap as DegreeIcon,
  Layers3,
  Lightbulb,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ring } from "@/components/site/Ring";
import waves from "@/assets/waves.jpg";
import { featuredProjects, profile, repos, repoUrl, skillGroups } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maida Javed — Software & Full-Stack Web Developer" },
      {
        name: "description",
        content:
          "BSCS graduate from Virtual University of Pakistan building full-stack web apps with PHP, Python, MySQL and JavaScript.",
      },
      { property: "og:title", content: "Maida Javed — Software & Full-Stack Web Developer" },
      {
        property: "og:description",
        content: "Technology at its best solves real problems. Explore Maida Javed's projects, skills and journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const marquee = skillGroups.flatMap((g) => g.items);

function Index() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Workspace />
      <Featured />
      <CtaBand />
    </>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const aboutCards = [
    {
      title: "Computer Science graduate",
      detail: "BSCS · Virtual University of Pakistan",
      Icon: DegreeIcon,
      tag: "01 / 05",
    },
    {
      title: "Full-stack web apps",
      detail: "Building practical applications from interface to data layer.",
      Icon: Layers3,
      tag: "02 / 05",
    },
    {
      title: "Python programs",
      detail: "Useful tools shaped around clear logic and everyday tasks.",
      Icon: Terminal,
      tag: "03 / 05",
    },
    {
      title: "Thoughtful databases",
      detail: "Structured data designed to support real workflows.",
      Icon: Database,
      tag: "04 / 05",
    },
    {
      title: "Simpler everyday experiences",
      detail: "Technology is at its best when it solves real problems.",
      Icon: Lightbulb,
      tag: "05 / 05",
    },
  ];

  useEffect(() => {
    const updateCard = () => {
      const section = sectionRef.current;
      if (!section) return;
      const distance = Math.max(0, -section.getBoundingClientRect().top);
      const step = Math.max(1, window.innerHeight * 0.72);
      setActiveCard(Math.min(aboutCards.length - 1, Math.floor(distance / step)));
    };
    updateCard();
    window.addEventListener("scroll", updateCard, { passive: true });
    window.addEventListener("resize", updateCard);
    return () => {
      window.removeEventListener("scroll", updateCard);
      window.removeEventListener("resize", updateCard);
    };
  }, [aboutCards.length]);

  const active = aboutCards[activeCard];
  if (!active) return null;
  const ActiveIcon = active.Icon;

  return (
    <section id="home" ref={sectionRef} className="relative min-h-[370svh] px-3 sm:px-5">
      <div className="sticky top-[4.75rem] mx-auto grid h-[calc(100svh-5.5rem)] min-h-[32rem] max-w-7xl overflow-hidden rounded-[2rem] bg-primary p-2 sm:p-3">
        <div className="absolute inset-0 grid-dots" aria-hidden />
        <div className="relative grid overflow-hidden rounded-[1.6rem] bg-background px-6 py-8 sm:px-12 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative z-10 flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold">
              <span className="size-2 rounded-full bg-primary" /> About me
            </span>
            <h1 className="mt-6 font-display-tight text-6xl animate-rise sm:text-7xl lg:text-8xl">
              Maida Javed
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I'm a Computer Science graduate building full-stack web apps, Python programs and thoughtful databases that make everyday experiences simpler.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/projects">View projects <ArrowRight /></Link>
              </Button>
              <Button asChild variant="pill" size="xl">
                <a href={profile.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>
              </Button>
            </div>
          </div>

          <div className="relative flex min-h-56 items-center justify-center lg:min-h-full">
            <div className="absolute inset-2 rounded-[1.4rem] bg-lilac/60 sm:inset-8" aria-hidden="true" />
            <article key={activeCard} aria-live="polite" className="relative w-full max-w-md animate-rise rounded-3xl border border-border bg-card p-6 shadow-float sm:p-9">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-muted-foreground">About · {active.tag}</span>
                <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground"><ActiveIcon className="size-6" /></span>
              </div>
              <h2 className="mt-8 font-display-tight text-4xl sm:text-5xl">{active.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{active.detail}</p>
              <div className="mt-8 flex gap-2" aria-label={`Card ${activeCard + 1} of ${aboutCards.length}`}>
                {aboutCards.map((card, index) => (
                  <span key={card.tag} className={`h-1.5 flex-1 rounded-full ${index === activeCard ? "bg-primary" : "bg-border"}`} />
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="mx-auto mt-4 max-w-7xl overflow-hidden px-3 sm:px-5">
      <div className="flex w-max animate-marquee gap-3">
        {items.map((s, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
          >
            <span className="size-1.5 rounded-full bg-primary" /> {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Manifesto() {
  return (
    <section id="about" className="mt-16 px-3 sm:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-6 py-20 text-ink-foreground sm:px-12 sm:py-28">
        <img
          src={waves}
          alt=""
          aria-hidden
          loading="lazy"
          width={1600}
          height={912}
          className="absolute inset-0 size-full object-cover opacity-80"
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">Strengths</p>
          <StrengthsHeadline />

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <div className="strength-card glass group rounded-3xl p-6">
              <GraduationCap className="strength-icon size-6 text-accent" />
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{profile.intro}</p>
            </div>
            <div className="strength-card glass group rounded-3xl p-6">
              <HeartHandshake className="strength-icon size-6 text-accent" />
              <p className="mt-2 font-semibold">What I bring to a team</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{profile.bring}</p>
            </div>
            <div className="strength-card glass group rounded-3xl p-6">
              <BadgeCheck className="strength-icon size-6 text-accent" />
              <p className="mt-2 font-semibold">My career goal</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{profile.goal}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Workspace() {
  const langCounts = { Python: repos.filter((r) => r.language === "Python").length, HTML: repos.filter((r) => r.language === "HTML").length };
  const short = ["Backend", "Frontend", "Data", "Network", "Tools"];
  const bars = skillGroups.map((g, i) => ({ label: short[i], value: g.items.length }));
  const maxBar = Math.max(...bars.map((b) => b.value));
  const orbitRepos = useMemo(() => repos.map((r) => ({ title: r.title, language: r.language, url: repoUrl(r.name) })), []);
  return (
    <section id="workspace" className="mt-16 px-3 sm:px-5">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-secondary p-4 sm:p-6">
        <div className="flex flex-col justify-between gap-6 px-2 pt-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-muted-foreground">My developer space</p>
            <h2 className="font-display-tight text-5xl sm:text-6xl">
              Welcome to
              <br />
              my workspace
            </h2>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-muted-foreground">Public repositories</p>
              <p className="font-display text-4xl font-extrabold">{profile.stats.repos}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">GitHub followers</p>
              <p className="font-display text-4xl font-extrabold">{profile.stats.followers}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Languages spoken</p>
              <p className="font-display text-4xl font-extrabold">{profile.stats.languages}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ClientOnly fallback={<div className="h-[420px] rounded-3xl bg-ink sm:h-[520px]" />}>
            <Suspense fallback={<div className="h-[420px] rounded-3xl bg-ink sm:h-[520px]" />}>
              <WorkspaceOrbit repos={orbitRepos} />
            </Suspense>
          </ClientOnly>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          {/* recent repos table */}
          <div className="rounded-3xl bg-card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Recent repositories</p>
                <p className="text-xs text-muted-foreground">Latest work published on GitHub</p>
              </div>
              <Link to="/projects" className="text-xs font-semibold text-primary hover:underline">
                See all
              </Link>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground">
                    <th className="pb-3 font-medium">Project</th>
                    <th className="pb-3 font-medium">Language</th>
                    <th className="pb-3 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {repos.map((r) => (
                    <tr key={r.name} className="border-t border-border">
                      <td className="py-3 pr-3">
                        <a href={repoUrl(r.name)} target="_blank" rel="noreferrer" className="font-semibold hover:text-primary">
                          {r.title}
                        </a>
                      </td>
                      <td className="py-3 text-muted-foreground">{r.language}</td>
                      <td className="py-3 text-right">
                        {r.preview ? (
                          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                            Live preview
                          </span>
                        ) : (
                          <span className="rounded-full bg-lilac px-2.5 py-1 text-xs font-semibold text-lilac-foreground">
                            Source code
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl bg-card p-5 sm:p-6">
              <p className="font-bold">Toolkit by area</p>
              <p className="text-xs text-muted-foreground">Number of technologies in each skill area</p>
              <div className="mt-5 flex h-40 items-end justify-between gap-2">
                {bars.map((b, i) => (
                  <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div
                      className={`w-full rounded-full ${i % 3 === 0 ? "bg-primary" : i % 3 === 1 ? "bg-accent" : "bg-lilac"}`}
                      style={{ height: `${(b.value / maxBar) * 100}%` }}
                    />
                    <span className="text-[11px] text-muted-foreground">{b.label} · {b.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-ink p-5 text-ink-foreground sm:p-6">
              <div className="flex items-center justify-between">
                <p className="font-bold">GitHub repo mix</p>
                <a href={profile.github} target="_blank" rel="noreferrer" className="grid size-8 place-items-center rounded-full bg-ink-foreground/10">
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
              <p className="mt-3 font-display text-4xl font-extrabold">
                {langCounts.Python + langCounts.HTML} <span className="text-base font-medium text-ink-muted">project repos</span>
              </p>
              <div className="mt-4 flex h-3 overflow-hidden rounded-full">
                <div className="bg-primary-glow" style={{ flex: langCounts.Python }} />
                <div className="bg-accent" style={{ flex: langCounts.HTML }} />
              </div>
              <div className="mt-3 flex gap-5 text-xs text-ink-muted">
                <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary-glow" /> Python · {langCounts.Python}</span>
                <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-accent" /> HTML previews · {langCounts.HTML}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const icons = [Utensils, BookOpen];
  return (
    <section id="projects" className="mt-16 px-3 sm:px-5">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 px-2 sm:flex-row sm:items-end">
          <h2 className="font-display-tight text-5xl sm:text-7xl">
            Featured <span className="font-serif font-normal italic text-primary">builds</span>
          </h2>
          <p className="max-w-sm text-muted-foreground">
            Two full applications that shaped my development journey — from donation workflows to
            peer-to-peer book exchange.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {featuredProjects.map((p, i) => {
            const Icon = icons[i] ?? Utensils;
            const lime = i === 0;
            return (
              <article
                key={p.title}
                className={`group relative overflow-hidden rounded-[2rem] p-7 sm:p-10 ${lime ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}
              >
                <div className="flex items-start justify-between">
                  <span className={`grid size-14 place-items-center rounded-2xl ${lime ? "bg-ink text-ink-foreground" : "bg-primary-foreground/15"}`}>
                    <Icon className="size-6" />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${lime ? "bg-ink/10" : "bg-primary-foreground/15"}`}>
                    {p.kind}
                  </span>
                </div>
                <h3 className="mt-10 font-display-tight text-4xl sm:text-5xl">{p.title}</h3>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 opacity-90">
                      <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${lime ? "bg-ink" : "bg-accent"}`} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className={`rounded-full px-3 py-1 text-xs font-semibold ${lime ? "bg-card/70" : "bg-primary-foreground/10"}`}>
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section id="contact" className="my-16 px-3 sm:px-5">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-card p-8 sm:flex-row sm:items-center sm:p-12">
        <h2 className="max-w-2xl font-display-tight text-4xl sm:text-6xl">
          Looking for a curious developer for your team?
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">Get in touch <ArrowRight /></Link>
          </Button>
          <Button asChild variant="pill" size="xl">
            <Link to="/journey">My journey</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
