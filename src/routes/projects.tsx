import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Github, Play, Star, Terminal, FileCode2 } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";
import { featuredProjects, profile, repos, repoUrl } from "@/data/profile";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Maida Javed" },
      {
        name: "description",
        content:
          "Full-stack and Python projects by Maida Javed: Food Waste Reduction System, Online Book Sharing Platform and GitHub repositories.",
      },
      { property: "og:title", content: "Projects — Maida Javed" },
      {
        property: "og:description",
        content: "Full-stack web apps and Python systems built by Maida Javed, with live previews and source code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Selected work"
        title={
          <>
            Projects built to <span className="font-serif font-normal italic text-primary">solve</span> things
          </>
        }
      >
        Full-stack applications and Python systems — each one a practical answer to an everyday
        problem, from donation workflows to grocery stock and electricity billing.
      </PageIntro>

      <section className="mt-12 px-3 sm:px-5">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          {featuredProjects.map((p, i) => (
            <article key={p.title} className="rounded-[2rem] border border-border bg-card p-7 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-extrabold text-primary">0{i + 1}</span>
                <span className="h-px flex-1 bg-border" />
                <span className="rounded-full bg-lilac px-3 py-1 text-xs font-semibold text-lilac-foreground">
                  {p.kind}
                </span>
              </div>
              <h2 className="mt-8 font-display-tight text-4xl sm:text-5xl">{p.title}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.points.map((pt) => (
                  <li key={pt} className="rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-border px-3 py-1 text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 px-3 sm:px-5">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-secondary p-4 sm:p-6">
          <div className="flex flex-col justify-between gap-4 px-2 pt-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm text-muted-foreground">From GitHub</p>
              <h2 className="font-display-tight text-5xl sm:text-6xl">Repositories</h2>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground"
            >
              <Github className="size-4" /> @{profile.handle}
            </a>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((r, i) => {
              const tone = ["bg-lilac", "bg-accent", "bg-primary/15"][i % 3];
              const Icon = r.language === "Python" ? Terminal : FileCode2;
              return (
                <article key={r.name} className="group flex flex-col rounded-3xl bg-card p-3 transition-all hover:-translate-y-1 hover:shadow-float">
                  <div className={`relative grid h-40 place-items-center rounded-2xl ${tone}`}>
                    <Icon className="size-14 text-foreground/80 transition-transform group-hover:scale-110" strokeWidth={1.4} />
                    {r.stars ? (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-card px-2 py-0.5 text-xs font-semibold">
                        <Star className="size-3" /> {r.stars}
                      </span>
                    ) : null}
                    <span className="absolute bottom-3 left-3 rounded-full bg-card px-2.5 py-0.5 text-xs font-semibold">
                      {r.language === "Python" ? "Python" : "Python · HTML preview"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <h3 className="text-lg font-bold leading-tight">{r.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {r.concepts.map((c) => (
                        <span key={c} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold">
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex gap-2">
                      <a
                        href={repoUrl(r.name)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-3 py-2 text-xs font-semibold text-ink-foreground"
                      >
                        <Github className="size-3.5" /> Code
                      </a>
                      {r.preview && (
                        <a
                          href={r.preview}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
                        >
                          <Play className="size-3.5" /> Live preview
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-64 flex-col justify-between rounded-3xl bg-ink p-6 text-ink-foreground"
            >
              <ArrowUpRight className="size-8 self-end transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              <p className="font-display-tight text-4xl">
                See everything
                <br />
                on GitHub
              </p>
            </a>
          </div>
        </div>
      </section>
      <div className="h-12" />
    </>
  );
}
