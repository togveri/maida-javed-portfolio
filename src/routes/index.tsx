import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { StrengthsHeadline } from "@/components/site/StrengthsHeadline";
import { HeroScene } from "@/components/site/HeroScene";
import { DeveloperWorkspace } from "@/components/site/DeveloperWorkspace";

import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  GraduationCap,
  HeartHandshake,
  BrainCircuit,
  Database,
  GitBranch,
  GraduationCap as DegreeIcon,
  Layers3,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ring } from "@/components/site/Ring";
import waves from "@/assets/waves.jpg";
import { featuredProjects, profile, skillGroups } from "@/data/profile";
import { FoodWasteCartIcon, BookRiffleIcon } from "@/components/site/ProjectCardIcons";

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
      <DeveloperWorkspace />
      <Featured />
      <CtaBand />
    </>
  );
}

function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth scroll listener that calculates 0 to 1 progress across the hero container
  useEffect(() => {
    let rafId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = Math.max(0, -rect.top);
      targetProgress = Math.min(1, Math.max(0, currentScroll / totalScroll));
    };

    const updateLoop = () => {
      // Lerp smoothing (like Lenis momentum)
      currentProgress += (targetProgress - currentProgress) * 0.09;
      setScrollProgress(currentProgress);
      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Rogue Studio style scattered cards with custom parallax vectors (palX, palY)
  const cards = [
    {
      id: "edu",
      tag: "01 / EDUCATION",
      title: "Computer Science Graduate",
      detail: "BSCS · Virtual University of Pakistan · CGPA 3.01",
      extra: "Algorithms · AI · Data Warehousing · Cloud",
      Icon: DegreeIcon,
      accent: "text-accent border-accent/30 bg-accent/10",
      iconBg: "bg-accent/15 text-accent",
      pos: "top-[12%] left-[4%] lg:left-[8%]",
      palX: -1.6,
      palY: -2.4,
      rotate: -3,
    },
    {
      id: "web",
      tag: "02 / FULL-STACK",
      title: "Full-Stack Web Apps",
      detail: "Building practical web apps from UI to relational data layer.",
      extra: "PHP · MySQL · JavaScript · REST APIs",
      Icon: Layers3,
      accent: "text-primary-glow border-primary/30 bg-primary/10",
      iconBg: "bg-primary/20 text-primary-glow",
      pos: "top-[14%] right-[4%] lg:right-[7%]",
      palX: 1.8,
      palY: -2.0,
      rotate: 2.5,
    },
    {
      id: "py",
      tag: "03 / LOGIC",
      title: "Python Programs",
      detail: "Useful console tools, CSV pipelines and clean automation logic.",
      extra: "OOP · Error handling · Algorithms · Testing",
      Icon: Terminal,
      accent: "text-amber-400 border-amber-400/30 bg-amber-400/10",
      iconBg: "bg-amber-400/15 text-amber-300",
      pos: "bottom-[20%] left-[3%] lg:left-[6%]",
      palX: -2.0,
      palY: 2.2,
      rotate: 2,
    },
    {
      id: "db",
      tag: "04 / ARCHITECTURE",
      title: "Thoughtful Databases",
      detail: "Structured relational models designed for data integrity.",
      extra: "SQL · PostgreSQL · Schema Normalization",
      Icon: Database,
      accent: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
      iconBg: "bg-cyan-400/15 text-cyan-300",
      pos: "bottom-[18%] right-[4%] lg:right-[8%]",
      palX: 2.2,
      palY: 1.8,
      rotate: -2.5,
    },
    {
      id: "integration",
      tag: "05 / INTEGRATION",
      title: "APIs, Linux & Git",
      detail: "Connecting backend logic, databases, and APIs into version-controlled systems.",
      extra: "Git · Linux CLI · REST APIs · Postman & XAMPP",
      Icon: GitBranch,
      accent: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
      iconBg: "bg-emerald-400/15 text-emerald-300",
      pos: "bottom-[8%] left-[28%] lg:left-[36%] hidden md:block",
      palX: 0.4,
      palY: 2.8,
      rotate: -1,
    },
  ];

  // Floating tiny code brackets and syntax blocks moving with the scroll
  const codeSnippets = [
    {
      code: "if (problem.isComplex) { solveWithCuriosity(); }",
      pos: "top-[26%] left-[22%]",
      palX: 1.2,
      palY: -2.8,
      color: "text-accent",
    },
    {
      code: "{ const [curiosity, setCuriosity] = useState(true); }",
      pos: "top-[22%] right-[24%]",
      palX: -1.4,
      palY: -2.2,
      color: "text-primary-glow",
    },
    {
      code: "<Database.Normalize 3NF />",
      pos: "top-[48%] left-[6%]",
      palX: -2.4,
      palY: 0.8,
      color: "text-cyan-400",
    },
    {
      code: "def optimize_pipeline(data): return clean(data)",
      pos: "top-[46%] right-[8%]",
      palX: 2.2,
      palY: -0.6,
      color: "text-amber-400",
    },
    {
      code: "git commit -m 'feat: complete full-stack workflow'",
      pos: "bottom-[34%] left-[24%]",
      palX: -1.8,
      palY: 2.4,
      color: "text-emerald-400",
    },
    {
      code: "npm run build:future",
      pos: "bottom-[32%] right-[22%]",
      palX: 1.5,
      palY: 2.6,
      color: "text-violet-400",
    },
    {
      code: "[01001101 01100001 01101001 01100100 01100001]",
      pos: "top-[8%] left-[40%]",
      palX: 0.2,
      palY: -3.2,
      color: "text-zinc-500",
    },
    {
      code: "try { integrate(); } catch (err) { debug(err); }",
      pos: "bottom-[12%] right-[10%]",
      palX: 2.0,
      palY: 3.4,
      color: "text-zinc-400",
    },
    {
      code: "{ ...systemIntegration }",
      pos: "bottom-[14%] left-[12%]",
      palX: -1.5,
      palY: 3.0,
      color: "text-accent",
    },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[290svh] w-full bg-background"
    >
      {/* Sticky viewport container (Rogue Studio homeHeader equivalent) */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden rogue-hero-container flex flex-col justify-between p-4 sm:p-8">
        {/* Three.js interactive 3D particle & wireframe canvas */}
        <HeroScene scrollProgress={scrollProgress} />

        {/* Ambient background glow dots */}
        <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" aria-hidden />

        {/* Top Header Information Row (like Rogue Studio top bar) */}
        <div className="relative z-20 flex items-center justify-between pt-16 sm:pt-14 px-2 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            Software & Full-Stack Developer
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 uppercase">
            <span>Pakistan</span>
            <span className="text-zinc-600">/</span>
            <span>BSCS '26</span>
          </span>
        </div>

        {/* ============================================================== */}
        {/* CENTER MONUMENTAL BACKGROUND NAME (Replicating Rogue Studio H1) */}
        {/* ============================================================== */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4 select-none"
          style={{
            transform: `scale(${1 - scrollProgress * 0.1}) translateY(${scrollProgress * 60}px)`,
            opacity: Math.max(0.12, 1 - scrollProgress * 0.95),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
          }}
        >
          <div className="text-center">
            <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-accent/80 uppercase mb-3">
              Computer Science &middot; Full-Stack &middot; Python &middot; Databases
            </p>
            <h1 className="rogue-bg-name-solid text-[clamp(4.8rem,16vw,14rem)] leading-[0.84] tracking-tighter">
              MAIDA<span className="text-accent italic font-serif text-[0.85em]">*</span>
            </h1>
            <h1 className="rogue-bg-name text-[clamp(3.8rem,13vw,11.5rem)] leading-[0.84] tracking-tighter mt-1 opacity-70">
              JAVED
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-sm sm:text-base font-sans text-muted-foreground/90 leading-relaxed font-medium">
              Computer Science graduate building full-stack web applications, Python automation tools,
              and normalized databases with clean code and disciplined Git workflows.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FLOATING SCATTERED CARDS (Rogue Studio homeHeader__imageWrap) */}
        {/* ============================================================== */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {cards.map((card) => {
            const CardIcon = card.Icon;
            const xOffset = card.palX * scrollProgress * 110;
            const yOffset = card.palY * scrollProgress * 160;

            return (
              <div
                key={card.id}
                className={`absolute ${card.pos} pointer-events-auto w-[280px] sm:w-[320px] transition-transform duration-75`}
                style={{
                  transform: `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${card.rotate + scrollProgress * 4}deg)`,
                }}
              >
                <article className="rogue-card rounded-2xl p-4 sm:p-5 group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                      {card.tag}
                    </span>
                    <span className={`grid size-9 place-items-center rounded-xl ${card.iconBg}`}>
                      <CardIcon className="size-4" />
                    </span>
                  </div>
                  <h3 className="mt-3 font-display-tight text-xl sm:text-2xl text-foreground group-hover:text-accent transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {card.detail}
                  </p>
                  <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>{card.extra}</span>
                    <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      &rarr;
                    </span>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* FLOATING FADED CODE BRACKETS & IF-ELSE BLOCKS                   */}
        {/* ============================================================== */}
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
          {codeSnippets.map((chip, idx) => {
            const xOffset = chip.palX * scrollProgress * 130;
            const yOffset = chip.palY * scrollProgress * 190;
            const opacity = Math.max(0.15, Math.min(0.85, 0.45 + Math.sin(idx + scrollProgress * 4) * 0.35));

            return (
              <div
                key={idx}
                className={`absolute ${chip.pos} floating-code-chip px-3 py-1.5 rounded-lg text-[11px] sm:text-xs transition-transform duration-75`}
                style={{
                  transform: `translate3d(${xOffset}px, ${yOffset}px, 0)`,
                  opacity,
                }}
              >
                <span className={chip.color}>{chip.code}</span>
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* BOTTOM METADATA BAR (Matching Rogue Studio footer notes)        */}
        {/* ============================================================== */}
        <div className="relative z-20 flex items-end justify-between pb-4 sm:pb-6 px-2 sm:px-6 text-xs text-muted-foreground font-mono">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Focus Area</span>
            <span className="text-zinc-300 font-medium">Full-Stack Web &amp; Python Programming</span>
          </div>
          <div className="flex items-center gap-2 text-accent">
            <span className="size-1.5 rounded-full bg-accent animate-ping" />
            <span className="text-[11px] font-mono tracking-wider uppercase">Scroll to dive in</span>
          </div>
          <div className="hidden sm:flex flex-col text-right gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Degree</span>
            <span className="text-zinc-300 font-medium">BS Computer Science &middot; VU</span>
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

function Featured() {
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
            const lime = i === 0;
            return (
              <article
                key={p.title}
                className={`group relative overflow-hidden rounded-[2rem] p-7 sm:p-10 ${lime ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}
              >
                <div className="flex items-start justify-between">
                  <span className={`featured-project-icon grid size-14 place-items-center rounded-2xl ${lime ? "bg-ink text-ink-foreground" : "bg-primary-foreground/15 text-primary-foreground"}`} aria-hidden="true">
                    {lime ? <FoodWasteCartIcon /> : <BookRiffleIcon />}
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
