import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import waves from "@/assets/waves.jpg";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maida Javed" },
      {
        name: "description",
        content: "Connect with Maida Javed, software and full-stack web developer based in Pakistan, via GitHub.",
      },
      { property: "og:title", content: "Contact — Maida Javed" },
      {
        property: "og:description",
        content: "Always interested in learning, building practical projects and connecting with people in technology.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="px-3 pb-12 pt-4 sm:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-6 py-20 text-ink-foreground sm:px-12 sm:py-28">
        <img src={waves} alt="" aria-hidden width={1600} height={912} className="absolute inset-0 size-full object-cover opacity-80" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">Let's connect</p>
          <h1 className="mt-6 max-w-4xl font-display-tight text-6xl sm:text-8xl">
            Let's make technology work{" "}
            <span className="font-serif font-normal italic text-accent">better</span> for people.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted">
            I'm always interested in learning, building practical projects, and connecting with people in
            technology.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="lime" size="xl">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github /> Follow on GitHub <ArrowUpRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/projects">Browse projects</Link>
            </Button>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="glass rounded-3xl p-6 transition-transform hover:-translate-y-1">
              <Github className="size-6 text-accent" />
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ink-muted">GitHub</p>
              <p className="mt-1 font-semibold">@{profile.handle}</p>
            </a>
            <div className="glass rounded-3xl p-6">
              <MapPin className="size-6 text-accent" />
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ink-muted">Location</p>
              <p className="mt-1 font-semibold">{profile.location}</p>
            </div>
            <div className="glass rounded-3xl p-6">
              <Briefcase className="size-6 text-accent" />
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ink-muted">Looking for</p>
              <p className="mt-1 font-semibold">Software Developer / Full-Stack Web Developer roles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
