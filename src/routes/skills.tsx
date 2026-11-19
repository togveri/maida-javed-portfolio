import { createFileRoute } from "@tanstack/react-router";
import { Code2, Database, LayoutTemplate, Network, Palette, Wrench, Lightbulb } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";
import { additionalTools, competencies, interests, skillGroups } from "@/data/profile";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills & Tech Stack — Maida Javed" },
      {
        name: "description",
        content:
          "Maida Javed's tech stack: Python, PHP, C++, Django, Flask, JavaScript, Bootstrap, MySQL, PostgreSQL, Linux, Cisco Packet Tracer and more.",
      },
      { property: "og:title", content: "Skills & Tech Stack — Maida Javed" },
      {
        property: "og:description",
        content: "Backend, frontend, databases, networking and design tools used by Maida Javed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

const icons: Record<string, typeof Code2> = {
  code: Code2,
  layout: LayoutTemplate,
  database: Database,
  network: Network,
  palette: Palette,
};

function SkillsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tech stack"
        title={
          <>
            Tools I <span className="font-serif font-normal italic text-primary">build</span> with
          </>
        }
      >
        From backend logic and responsive interfaces to normalized databases and network
        configuration.
      </PageIntro>

      <section className="mt-12 px-3 sm:px-5">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink-glow px-5 py-16 text-ink-foreground sm:px-10 sm:py-20">
          <div className="absolute -left-20 top-1/2 size-96 -translate-y-1/2 rounded-full bg-primary/40 blur-3xl" aria-hidden />
          <div className="absolute -right-10 -top-10 size-72 rounded-full bg-primary-glow/30 blur-3xl" aria-hidden />
          <p className="relative text-center text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">
            Skill set · Glass edition
          </p>
          <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:items-center">
            {skillGroups.map((g, i) => {
              const Icon = icons[g.icon] ?? Code2;
              const hero = i === 2;
              return (
                <div
                  key={g.title}
                  className={`glass rounded-3xl p-6 transition-transform hover:-translate-y-2 ${hero ? "lg:-my-6 lg:scale-105 lg:py-10" : ""}`}
                >
                  <div className="relative mx-auto grid size-20 place-items-center">
                    <span className="absolute inset-0 rounded-3xl bg-electric opacity-90 blur-[2px]" />
                    <span className="absolute inset-1 rounded-[1.3rem] border border-ink-foreground/30 bg-ink-foreground/10 backdrop-blur" />
                    <Icon className="relative size-9 text-ink-foreground" strokeWidth={1.6} />
                  </div>
                  <h2 className="mt-6 text-center font-semibold">{g.title}</h2>
                  <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {g.items.map((s) => (
                      <li key={s} className="rounded-full bg-ink-foreground/10 px-2.5 py-1 text-xs text-ink-foreground/90">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="relative mx-auto mt-14 max-w-xl text-center text-sm text-ink-muted">
            <Wrench className="mr-1.5 inline size-4" />
            Additional tools: {additionalTools.join(", ")}.
          </p>
        </div>
      </section>

      <section className="mt-16 px-3 sm:px-5">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-10">
            <h2 className="font-display-tight text-5xl">Core competencies</h2>
            <dl className="mt-8 divide-y divide-border">
              {competencies.map((c, i) => (
                <div key={c.area} className="grid gap-2 py-5 sm:grid-cols-[auto_1fr_2fr] sm:items-baseline sm:gap-6">
                  <span className="font-display text-sm font-extrabold text-primary">0{i + 1}</span>
                  <dt className="font-bold">{c.area}</dt>
                  <dd className="text-sm text-muted-foreground">{c.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col justify-between rounded-[2rem] bg-accent p-6 text-accent-foreground sm:p-10">
            <span className="grid size-14 place-items-center rounded-2xl bg-ink text-ink-foreground">
              <Lightbulb className="size-6" />
            </span>
            <div className="mt-10">
              <h2 className="font-display-tight text-5xl">Always exploring</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {interests.map((i) => (
                  <li key={i} className="rounded-full bg-card/70 px-3 py-1.5 text-sm font-semibold">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="h-12" />
    </>
  );
}
