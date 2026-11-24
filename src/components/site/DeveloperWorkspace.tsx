import { useEffect, useRef, useState } from "react";
import { profile, repos, repoUrl, skillGroups } from "@/data/profile";
import { ExternalLink, Github } from "lucide-react";

/**
 * DeveloperWorkspace
 * An interactive, high-end developer desk battle station:
 * - Ultrawide 21:9 curved monitor aligned directly with an ergonomic desk setup
 * - Re-engineered, futuristic tempered-glass PC tower with spinning ARGB fans & interior glow
 * - Developer avatar seated at mechanical keyboard
 * - Scroll-driven repository showcase:
 *   - Scroll down / up fills & empties the right-side progress rail
 *   - Screen displays each repo with its original data, summary, terminal typing, and GitHub/preview links
 *   - 3D mouse parallax tilt on the monitor and floating toolkit/stats cards
 */
export function DeveloperWorkspace() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [termText, setTermText] = useState("");
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const N = repos.length;
  const shortAreas = ["Backend", "Frontend", "Data", "Network", "Tools"];
  const toolkit = skillGroups.map((g, i) => ({
    name: shortAreas[i] ?? g.title,
    count: g.items.length,
  }));
  const maxToolCount = Math.max(...toolkit.map((t) => t.count), 7);

  // 1. Scroll-driven repository switching & right-rail fill
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setScrollPercent(progress * 100);

      const newIndex = Math.min(N - 1, Math.floor(progress * N));
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [N]);

  // 2. Terminal typing simulation when active repo changes
  useEffect(() => {
    const activeRepo = repos[activeIndex];
    if (!activeRepo) return;

    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    const command = `$ git clone ${repoUrl(activeRepo.name)}  # ${activeRepo.concepts.join(" · ")}`;
    let charIndex = 0;
    setTermText("");

    typingTimerRef.current = setInterval(() => {
      charIndex++;
      setTermText(command.slice(0, charIndex));
      if (charIndex >= command.length) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, 18);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [activeIndex]);

  // 3. Pointer move 3D tilt on monitor & floating cards
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onPointerMove = (e: PointerEvent) => {
      const b = stage.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5;
      const y = (e.clientY - b.top) / b.height - 0.5;

      stage.style.setProperty("--rx", `${-y * 7}deg`);
      stage.style.setProperty("--ry", `${x * 10}deg`);
      stage.style.setProperty("--tx-l", `${x * -20}px`);
      stage.style.setProperty("--ty-l", `${y * -12}px`);
      stage.style.setProperty("--tx-r", `${x * 20}px`);
      stage.style.setProperty("--ty-r", `${y * -12}px`);
    };

    const onPointerLeave = () => {
      stage.style.setProperty("--rx", "0deg");
      stage.style.setProperty("--ry", "0deg");
      stage.style.setProperty("--tx-l", "0px");
      stage.style.setProperty("--ty-l", "0px");
      stage.style.setProperty("--tx-r", "0px");
      stage.style.setProperty("--ty-r", "0px");
    };

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);

    return () => {
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  // 4. Ambient Particle Canvas Animation
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let W = (cv.width = cv.offsetWidth);
    let H = (cv.height = cv.offsetHeight);

    const onResize = () => {
      if (!cv) return;
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const colors = ["#bbf438", "#6c4cff", "#3b82f6", "#f5ead6"];
    const particles = Array.from({ length: 70 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.4,
      v: Math.random() * 0.0003 + 0.00008,
      c: colors[i % colors.length] ?? "#bbf438",
      o: Math.random() * 6,
    }));

    const render = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.y -= p.v;
        if (p.y < 0) p.y = 1;
        ctx.globalAlpha = 0.25 + 0.4 * Math.sin(t / 800 + p.o);
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Click on a sidebar repo to scroll directly to it
  const scrollToRepo = (idx: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const totalScrollable = section.offsetHeight - window.innerHeight;
    const targetScroll = section.offsetTop + (idx / N) * totalScrollable + 5;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const activeRepo = repos[activeIndex] ?? repos[0]!;

  return (
    <section
      id="workspace"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `calc(100vh + ${N * 75}vh)` }}
    >
      {/* Sticky Stage Viewport */}
      <div
        ref={stageRef}
        className="ws-stage sticky top-0 h-screen min-h-[640px] w-full overflow-hidden flex flex-col justify-between select-none"
        style={{
          background: "radial-gradient(ellipse at 50% 32%, #0d1533 0%, #05070f 65%, #04050a 100%)",
        }}
      >
        {/* Particle Canvas Background */}
        <canvas ref={canvasRef} className="absolute inset-0 size-full pointer-events-none z-0" />

        {/* Ambient Top Eyebrow */}
        <div className="absolute top-[3vh] left-[4vw] sm:left-[5vw] z-10 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-accent font-semibold">
          <span className="size-2 rounded-full bg-accent animate-ping" />
          My developer space
        </div>

        {/* Massive Monumental Ghost Typography */}
        <div className="absolute left-1/2 top-[4%] -translate-x-1/2 font-display text-[clamp(60px,16vw,220px)] font-black text-white/[0.04] whitespace-nowrap tracking-tighter select-none pointer-events-none z-0">
          WORKSPACE
        </div>

        {/* Ambient Floating Code Chips */}
        <div className="chip hidden md:block" style={{ left: "20vw", top: "7vh" }}>
          git push origin main
        </div>
        <div className="chip hidden md:block" style={{ right: "18vw", top: "8vh", animationDelay: "-2s" }}>
          &#123; ...repos.map(ship) &#125;
        </div>
        <div className="chip hidden md:block" style={{ left: "6vw", top: "72vh", animationDelay: "-4s" }}>
          &lt;Portfolio.Live /&gt;
        </div>
        <div className="chip hidden md:block" style={{ right: "6vw", top: "70vh", animationDelay: "-1s" }}>
          npm run build
        </div>

        {/* Left Floating Card: TOOLKIT BY AREA */}
        <div className="ws-card ws-card-left hidden lg:block" id="cl">
          <h5 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
            Toolkit by Area
          </h5>
          <div className="space-y-2">
            {toolkit.map((item) => (
              <div key={item.name} className="grid grid-cols-[68px_1fr_18px] items-center gap-2 font-mono text-[11px]">
                <span className="text-muted-foreground">{item.name}</span>
                <div className="h-1.5 w-full bg-[#162038] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-1000"
                    style={{ width: `${(item.count / maxToolCount) * 100}%` }}
                  />
                </div>
                <span className="text-right text-foreground font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Floating Card: GITHUB STATS */}
        <div className="ws-card ws-card-right hidden lg:block" id="cr">
          <h5 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
            GitHub Metrics
          </h5>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-black text-foreground min-w-[34px]">
                {profile.stats.repos}
              </span>
              <span className="text-muted-foreground">public repos</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-black text-foreground min-w-[34px]">
                {profile.stats.followers}
              </span>
              <span className="text-muted-foreground">followers</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-black text-foreground min-w-[34px]">
                {profile.stats.languages}
              </span>
              <span className="text-muted-foreground">languages spoken</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BATTLESTATION STAGE: Ultrawide Monitor + Desk + Seated Developer + PC Tower */}
        {/* ========================================================================= */}
        <div className="relative z-10 flex-1 flex flex-col justify-end items-center pb-[2vh]">
          {/* Ultrawide Curved Monitor Component */}
          <div className="mon-wrap">
            <div className="mon">
              <div className="screen">
                {/* CRT Screen Sweep Beam */}
                <div className="beam" />

                {/* Left Screen Column: Sidebar with Repositories List */}
                <div className="screen-side">
                  <h6>RECENT REPOS</h6>
                  <div className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden pr-1">
                    {repos.map((r, i) => (
                      <div
                        key={r.name}
                        onClick={() => scrollToRepo(i)}
                        className={`screen-item ${i === activeIndex ? "on" : ""}`}
                      >
                        <span className="truncate min-w-0 flex-1">{r.title}</span>
                        <i className="font-mono text-[10px] not-italic opacity-80 shrink-0">0{i + 1}</i>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Screen Column: Active Repository IDE Card & Terminal */}
                <div className="screen-main">
                  <div className="flex items-center justify-between">
                    <span className="screen-num">
                      0{activeIndex + 1} / 0{N}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      MaidaJaved23 / {activeRepo.name}
                    </span>
                  </div>

                  <h2 className="screen-title">{activeRepo.title}</h2>

                  {/* Metadata Pills */}
                  <div className="flex flex-wrap items-center gap-2 my-2">
                    <span className="screen-pill">{activeRepo.language}</span>
                    <span className={`screen-pill ${activeRepo.preview ? "screen-pill-accent" : ""}`}>
                      {activeRepo.preview ? "Live preview" : "Source code"}
                    </span>
                    {activeRepo.stars ? (
                      <span className="screen-pill">★ {activeRepo.stars}</span>
                    ) : null}
                  </div>

                  {/* Description */}
                  <p className="screen-desc">{activeRepo.summary}</p>

                  {/* Terminal Typing Simulation */}
                  <div className="screen-term">
                    {termText}
                    <b className="terminal-cursor" />
                  </div>

                  {/* Direct Link Action Buttons */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={repoUrl(activeRepo.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="screen-cta"
                    >
                      <Github className="size-3.5 inline mr-1" />
                      Open on GitHub ↗
                    </a>
                    {activeRepo.preview ? (
                      <a
                        href={activeRepo.preview}
                        target="_blank"
                        rel="noreferrer"
                        className="screen-cta-secondary"
                      >
                        <ExternalLink className="size-3.5 inline mr-1" />
                        Live Preview ↗
                      </a>
                    ) : null}
                  </div>

                  {/* Bottom Fill Bar */}
                  <div
                    className="screen-bar"
                    style={{ width: `${((activeIndex + 1) / N) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Aluminum Heavy-duty Monitor Neck & Stand Base resting flush on desk */}
            <div className="mon-neck" />
            <div className="mon-base" />
          </div>

          {/* ========================================================================= */}
          {/* SVG DESK SETUP: Matte Executive Desk + Seated Developer */}
          {/* ========================================================================= */}
          <div className="desk-scene w-full max-w-[1080px] h-[26vh] min-h-[170px] pointer-events-none relative z-20">
            <svg
              viewBox="0 0 880 220"
              preserveAspectRatio="xMidYMax meet"
              className="size-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                {/* Desk Surface Gradient */}
                <linearGradient id="desk-mat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e273d" />
                  <stop offset="100%" stopColor="#101524" />
                </linearGradient>
              </defs>

              {/* 1. SOLID EXECUTIVE DESK SURFACE */}
              {/* Desk Top Bevel */}
              <rect x="60" y="148" width="760" height="12" rx="3" fill="url(#desk-mat)" stroke="#263452" strokeWidth="1" />
              {/* Desk Ambient Underglow Strip (Acid Lime) */}
              <rect x="62" y="158" width="756" height="3" fill="#bbf438" className="desk-led-glow" />
              {/* Desk Heavy Steel Legs */}
              <rect x="85" y="161" width="10" height="60" fill="#0c111c" />
              <rect x="785" y="161" width="10" height="60" fill="#0c111c" />
              {/* Cable Grommet / Organizer */}
              <ellipse cx="440" cy="151" rx="8" ry="3" fill="#0c101a" stroke="#1d263b" />

              {/* Ultra-wide Desk Mat under peripherals */}
              <rect x="240" y="146" width="360" height="7" rx="2" fill="#0c101b" stroke="#3b82f6" strokeWidth="0.8" />
              {/* Mechanical Keyboard with RGB Underglow */}
              <rect x="330" y="142" width="140" height="9" rx="2.5" fill="#131929" stroke="#bbf438" strokeWidth="1" />
              {/* Wireless Gaming Mouse */}
              <rect x="495" y="144" width="14" height="7" rx="3.5" fill="#131929" stroke="#3b82f6" strokeWidth="1" />

              {/* 2. DEVELOPER AVATAR SEATED AT WORKSPACE */}
              <g className="developer-avatar">
                {/* Ergonomic Mesh Office Chair Backrest */}
                <path d="M 370 195 Q 365 125 392 118 L 448 118 Q 475 125 470 195 L 476 220 L 364 220 Z" fill="#202947" stroke="#2b375e" strokeWidth="1.2" />
                {/* Chair Headrest */}
                <rect x="400" y="88" width="40" height="18" rx="6" fill="#161e33" stroke="#2b375e" strokeWidth="1" />

                {/* Torso / Developer Hoodie */}
                <path d="M 376 150 Q 400 130 420 152 Q 440 130 464 150 L 452 210 L 388 210 Z" fill="#182038" />
                {/* Clean Code Badge on Hoodie */}
                <text x="420" y="176" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#bbf438" fontWeight="bold">
                  &lt;/&gt;
                </text>

                {/* Hands resting on Mechanical Keyboard */}
                <path d="M 376 150 L 362 165 L 392 147" fill="none" stroke="#273359" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 464 150 L 478 165 L 448 147" fill="none" stroke="#273359" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
                <ellipse cx="392" cy="144" rx="7" ry="5" fill="#d9a07c" />
                <ellipse cx="502" cy="146" rx="6" ry="5" fill="#d9a07c" />

                {/* Developer Head & Hair */}
                <path d="M 400 94 Q 396 72 420 70 Q 444 72 440 94 Q 446 120 436 138 Q 420 144 404 138 Q 396 120 400 94 Z" fill="#171221" />
                {/* Developer Studio Headphones with Accent Lime Lights */}
                <path d="M 399 95 Q 399 66 420 66 Q 441 66 441 95" fill="none" stroke="#0a0d17" strokeWidth="3.5" />
                <rect x="393" y="90" width="8" height="18" rx="3.5" fill="#bbf438" />
                <rect x="439" y="90" width="8" height="18" rx="3.5" fill="#bbf438" />
              </g>
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT PROGRESS RAIL (Fills as user scrolls down, empties as user scrolls up) */}
        {/* ========================================================================= */}
        <div className="ws-rail" aria-hidden="true">
          <i
            className="ws-rail-fill"
            style={{ height: `${scrollPercent}%` }}
          />
        </div>

        {/* Bottom Interactive Navigation Hint */}
        <div className="absolute z-20 left-1/2 bottom-[1.8vh] -translate-x-1/2 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-zinc-500 whitespace-nowrap">
          Scroll to explore projects &middot; click monitor to view code
        </div>
      </div>
    </section>
  );
}
