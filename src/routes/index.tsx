import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Code2,
  Github,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  Globe2,
  BookOpen,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ring } from "@/components/site/Ring";
import heroGlass from "@/assets/hero-glass.png";
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
  return (
    <section className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary p-2 sm:p-3">
        <div className="absolute inset-0 grid-dots" aria-hidden />
        <div className="relative grid overflow-hidden rounded-[1.6rem] bg-background lg:grid-cols-[1.05fr_1fr]">
          {/* Copy */}
          <div className="relative z-10 flex flex-col justify-center px-6 pb-10 pt-12 sm:px-12 lg:py-20">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {profile.degree} · {profile.location}
            </span>
            <h1 className="mt-6 font-display-tight text-[clamp(3.4rem,8vw,6.8rem)] animate-rise">
              Software that
              <br />
              solves{" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-[-0.08em] bottom-[0.08em] top-[0.32em] -z-10 -rotate-1 rounded-md bg-accent" />
                real
              </span>
              <br />
              problems.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
              I'm <strong className="text-foreground">Maida Javed</strong> — a Computer Science graduate
              building full-stack web apps, Python programs and thoughtful databases that make everyday
              experiences simpler.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/projects">
                  View projects <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="pill" size="xl">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github /> GitHub
                </a>
              </Button>
            </div>
          </div>

          {/* Visual + floating cards */}
          <div className="relative min-h-[460px] lg:min-h-[620px]">
            <div className="absolute inset-6 rounded-[1.4rem] bg-lilac/60 lg:inset-y-10 lg:left-0 lg:right-10" aria-hidden />
            <img
              src={heroGlass}
              alt="Glass laptop with code symbol surrounded by database, security shield and network icons"
              width={1024}
              height={1024}
              className="absolute left-1/2 top-1/2 w-[82%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 animate-float drop-shadow-2xl"
            />

            <div className="absolute right-4 top-8 w-52 rounded-2xl border border-border bg-card p-3 shadow-float sm:right-8 lg:top-14 animate-float-slow">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground">
                  MJ
                </span>
                <div>
                  <p className="text-sm font-bold">Maida Javed</p>
                  <p className="text-xs font-semibold text-primary">Open to developer roles</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-24 right-4 hidden w-48 rounded-2xl border border-border bg-card p-4 text-center shadow-float sm:right-8 sm:block lg:bottom-36">
              <p className="text-sm font-bold">BSCS CGPA</p>
              <p className="text-xs text-muted-foreground">Virtual University of Pakistan</p>
              <div className="mt-3 flex justify-center">
                <Ring value={3.01} max={4} label="3.01" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">out of 4.00</p>
            </div>

            <div className="absolute bottom-6 right-4 flex w-56 items-center gap-3 rounded-2xl bg-lilac p-3 text-lilac-foreground shadow-float sm:right-8 lg:bottom-14">
              <span className="grid size-9 place-items-center rounded-xl bg-ink text-ink-foreground">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold">Currently exploring</p>
                <p className="text-xs opacity-80">AI · IoT · Cybersecurity</p>
              </div>
            </div>

            <div className="absolute bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-float sm:left-10 lg:bottom-14">
              <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Award className="size-4" />
              </span>
              <div>
                <p className="font-display text-xl font-extrabold leading-none">{profile.stats.certifications}</p>
                <p className="text-xs text-muted-foreground">Certifications</p>
              </div>
            </div>
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-2 inline-grid h-[0.78em] w-[1.5em] place-items-center rounded-full border border-ink-foreground/40 align-middle text-primary-glow">
      {children}
    </span>
  );
}

function Manifesto() {
  return (
    <section className="mt-16 px-3 sm:px-5">
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
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">About me</p>
          <h2 className="mt-8 font-display text-[clamp(2.4rem,6.5vw,5.6rem)] font-semibold leading-[1.08] tracking-tight">
            Curious
            <Pill>
              <Sparkles className="size-[0.42em]" />
            </Pill>
            mind,
            <br />
            <span className="pl-[8%]">clean</span>
            <Pill>
              <Code2 className="size-[0.42em]" />
            </Pill>
            code,{" "}
            <span className="font-serif font-normal italic text-ink-muted">thoughtful</span>
            <br />
            real
            <Pill>
              <Globe2 className="size-[0.42em]" />
            </Pill>
            impact.
          </h2>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <div className="glass rounded-3xl p-6">
              <GraduationCap className="size-6 text-accent" />
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{profile.intro}</p>
            </div>
            <div className="glass rounded-3xl p-6">
              <HeartHandshake className="size-6 text-accent" />
              <p className="mt-2 font-semibold">What I bring to a team</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{profile.bring}</p>
            </div>
            <div className="glass rounded-3xl p-6">
              <BadgeCheck className="size-6 text-accent" />
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
  return (
    <section className="mt-16 px-3 sm:px-5">
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

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
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
    <section className="mt-16 px-3 sm:px-5">
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
    <section className="my-16 px-3 sm:px-5">
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
