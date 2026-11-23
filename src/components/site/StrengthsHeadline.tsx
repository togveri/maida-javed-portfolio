import { useEffect, useRef, useState, type ReactNode } from "react";
import { Code2, Globe2, Sparkles } from "lucide-react";

/** Words start joined; on each entry the words part and their symbols appear in sequence. */
function Symbol({ children, delay, on }: { children: ReactNode; delay: number; on: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-block overflow-hidden align-middle transition-[max-width,margin] duration-700 ease-[cubic-bezier(.7,0,.2,1)]"
      style={{ maxWidth: on ? "1.9em" : "0em", marginInline: on ? "0.12em" : "0", transitionDelay: `${delay}ms` }}
    >
      <span
        className="mx-[0.08em] grid h-[0.78em] w-[1.5em] place-items-center rounded-full border border-ink-foreground/40 text-primary-glow transition-all duration-700 ease-[cubic-bezier(.34,1.56,.64,1)]"
        style={{
          transform: on ? "scale(1) rotate(0deg)" : "scale(0.2) rotate(-120deg)",
          opacity: on ? 1 : 0,
          filter: on ? "blur(0)" : "blur(6px)",
          transitionDelay: `${delay + 350}ms`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

export function StrengthsHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOn(Boolean(entry?.isIntersecting)),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <h2 ref={ref} className="mt-8 font-display text-[clamp(2.4rem,6.5vw,5.6rem)] font-semibold leading-[1.08] tracking-tight">
      Curious
      <Symbol delay={200} on={on}><Sparkles className="size-[0.42em]" /></Symbol>
      {on ? "" : " "}mind,
      <br />
      <span className="pl-[8%]">clean</span>
      <Symbol delay={1100} on={on}><Code2 className="size-[0.42em]" /></Symbol>
      {on ? "" : " "}code,{" "}
      <span className="font-serif font-normal italic text-ink-muted">thoughtful</span>
      <br />
      real
      <Symbol delay={2000} on={on}><Globe2 className="size-[0.42em]" /></Symbol>
      {on ? "" : " "}impact.
    </h2>
  );
}
