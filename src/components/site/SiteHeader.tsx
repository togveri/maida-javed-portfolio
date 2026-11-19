import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/journey", label: "Journey" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [section, setSection] = useState("Home");

  useEffect(() => {
    setOpen(false);
    const routeLabel = nav.find((item) => item.to === pathname)?.label ?? "Home";
    setSection(routeLabel);

    if (pathname !== "/") return;

    const sectionLabels: Record<string, string> = {
      home: "Home",
      about: "About",
      workspace: "Workspace",
      projects: "Projects",
      contact: "Contact",
    };
    const targets = Object.keys(sectionLabels)
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setSection(sectionLabels[visible.target.id] ?? "Home");
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-5">
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-2">
        <div className="relative">
          <div className="flex h-12 items-center gap-3 rounded-full border border-border/70 bg-background/65 px-4 shadow-float backdrop-blur-xl">
            <span className="min-w-20 text-sm font-semibold" aria-live="polite">{section}</span>
            <span className="h-5 w-px bg-border" aria-hidden="true" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="site-navigation"
              onClick={() => setOpen((isOpen) => !isOpen)}
              className="rounded-full"
            >
              {open ? <X /> : <Menu />}
            </Button>
            <ChevronDown className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
          </div>

          {open && (
            <nav id="site-navigation" aria-label="Main navigation" className="absolute right-0 top-14 flex w-52 flex-col gap-1 rounded-2xl border border-border/70 bg-background/95 p-2 shadow-float backdrop-blur-xl">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "bg-secondary !text-foreground" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <Button asChild variant="lime" size="default" className="h-12 px-5">
          <Link to="/contact">
            Let's talk <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </header>
  );
}
