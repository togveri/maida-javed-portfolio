import { Link } from "@tanstack/react-router";
import { Github, Coffee } from "lucide-react";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="px-3 pb-3 sm:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink-glow px-6 py-12 text-ink-foreground sm:px-12">
        <div className="absolute inset-0 grid-dots opacity-60" aria-hidden />
        <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display-tight text-5xl sm:text-6xl">
              Learn. Build.
              <br />
              <span className="font-serif text-accent italic font-normal tracking-normal">Collaborate.</span>
            </p>
            <p className="mt-5 max-w-sm text-sm text-ink-muted">{profile.belief}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Pages</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/projects" className="hover:text-accent">Projects</Link></li>
              <li><Link to="/skills" className="hover:text-accent">Skills</Link></li>
              <li><Link to="/journey" className="hover:text-accent">Journey</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Connect</p>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm hover:text-accent"
            >
              <Github className="size-4" /> @{profile.handle}
            </a>
            <p className="mt-2 text-sm text-ink-muted">{profile.location}</p>
          </div>
        </div>
        <div className="relative mt-12 flex flex-col justify-between gap-3 border-t border-ink-border pt-6 text-xs text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            <Coffee className="size-3.5" /> {profile.signoff}
          </p>
        </div>
      </div>
    </footer>
  );
}
