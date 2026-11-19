import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
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
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-border/70 bg-background/80 py-2 pl-3 pr-2 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground">
            MJ
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Maida Javed</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-ink p-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink-foreground"
              activeProps={{ className: "bg-lilac !text-lilac-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="lime" size="default" className="hidden sm:inline-flex">
            <Link to="/contact">
              Let's talk <ArrowUpRight />
            </Link>
          </Button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full bg-ink text-ink-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-3xl bg-ink p-3 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-2xl px-4 py-3 font-medium text-ink-muted"
              activeProps={{ className: "bg-lilac !text-lilac-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
