import type { ReactNode } from "react";

type Props = { eyebrow: string; title: ReactNode; children?: ReactNode };

export function PageIntro({ eyebrow, title, children }: Props) {
  return (
    <section className="px-3 pt-4 sm:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary p-2 sm:p-3">
        <div className="absolute inset-0 grid-dots" aria-hidden />
        <div className="relative rounded-[1.6rem] bg-background px-6 py-14 sm:px-12 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-lilac px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-lilac-foreground">
            <span className="size-1.5 rounded-full bg-primary" /> {eyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl font-display-tight text-6xl sm:text-8xl animate-rise">{title}</h1>
          {children && <div className="mt-6 max-w-2xl text-lg text-muted-foreground">{children}</div>}
        </div>
      </div>
    </section>
  );
}
