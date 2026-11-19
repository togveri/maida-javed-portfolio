import { createFileRoute } from "@tanstack/react-router";
import { Award, GraduationCap, Languages } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";
import { Ring } from "@/components/site/Ring";
import { certifications, education, languages } from "@/data/profile";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Education & Certifications — Maida Javed" },
      {
        name: "description",
        content:
          "BS and Associate Degree in Computer Science from Virtual University of Pakistan, plus Cisco Networking Academy and Coursera certifications.",
      },
      { property: "og:title", content: "Education & Certifications — Maida Javed" },
      {
        property: "og:description",
        content: "Maida Javed's academic journey, certifications and languages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JourneyPage,
});

function JourneyPage() {
  const issuers = [...new Set(certifications.map((c) => c.issuer))];
  const ordered = [...education].reverse();
  return (
    <>
      <PageIntro
        eyebrow="Journey"
        title={
          <>
            Learning that <span className="font-serif font-normal italic text-primary">never</span> stops
          </>
        }
      >
        Two Computer Science degrees, nine certifications and four languages — a steady path of
        curiosity and continuous learning.
      </PageIntro>

      <section className="mt-12 px-3 sm:px-5">
        <div className="mx-auto max-w-7xl">
          <h2 className="flex items-center gap-3 px-2 font-display-tight text-5xl">
            <GraduationCap className="size-9 text-primary" /> Education
          </h2>
          <ol className="relative mt-8 grid gap-4 md:grid-cols-2">
            {ordered.map((e, i) => (
              <li
                key={e.degree}
                className={`rounded-[2rem] p-7 sm:p-10 ${i === 1 ? "bg-primary text-primary-foreground" : "border border-border bg-card"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${i === 1 ? "bg-accent text-accent-foreground" : "bg-lilac text-lilac-foreground"}`}>
                      Step 0{i + 1} · {e.status}
                    </span>
                    <h3 className="mt-6 font-display-tight text-4xl">{e.degree}</h3>
                    <p className={`mt-2 text-sm ${i === 1 ? "opacity-80" : "text-muted-foreground"}`}>{e.school}</p>
                  </div>
                  <div className={`shrink-0 rounded-3xl p-3 text-center ${i === 1 ? "bg-card text-card-foreground" : "bg-secondary"}`}>
                    <Ring value={Number(e.cgpa)} max={4} size={92} stroke={8} label={e.cgpa} />
                    <p className="mt-1 text-[11px] font-semibold">CGPA / 4.00</p>
                  </div>
                </div>
                <p className={`mt-8 text-xs font-semibold uppercase tracking-[0.2em] ${i === 1 ? "opacity-70" : "text-muted-foreground"}`}>
                  Relevant coursework
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {e.coursework.map((c) => (
                    <li
                      key={c}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${i === 1 ? "bg-primary-foreground/15" : "bg-secondary"}`}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-16 px-3 sm:px-5">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[2rem] bg-ink p-6 text-ink-foreground sm:p-10">
            <h2 className="flex items-center gap-3 font-display-tight text-5xl">
              <Award className="size-9 text-accent" /> Certifications
            </h2>
            {issuers.map((iss) => (
              <div key={iss} className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">{iss}</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {certifications
                    .filter((c) => c.issuer === iss)
                    .map((c) => (
                      <li key={c.title} className="glass flex items-center gap-3 rounded-2xl px-4 py-3 text-sm">
                        <span className="size-2 shrink-0 rounded-full bg-accent" />
                        {c.title}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] bg-lilac p-6 text-lilac-foreground sm:p-10">
            <h2 className="flex items-center gap-3 font-display-tight text-5xl">
              <Languages className="size-9" /> Languages
            </h2>
            <ul className="mt-8 space-y-6">
              {languages.map((l) => (
                <li key={l.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold">{l.name}</span>
                    <span className="text-sm opacity-75">{l.level}</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-card/60">
                    <div className="h-full rounded-full bg-ink" style={{ width: `${l.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div className="h-12" />
    </>
  );
}
