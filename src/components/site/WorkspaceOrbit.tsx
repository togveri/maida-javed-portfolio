import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

export type OrbitRepo = { title: string; language: string; url: string };

/** Three.js orbit: core + two language rings with repo nodes, data packets and star dust. Browser-only (three is imported in effect). */
export default function WorkspaceOrbit({ repos }: { repos: OrbitRepo[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<OrbitRepo | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let dispose = () => {};
    let cancelled = false;
    import("three").then((T) => { const THREE = T; {
      if (cancelled) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // WebGL can't read CSS tokens in oklch reliably; mirror the palette here.
      const INK = 0xf2ead6, BLUE = 0x5b7cff, LIME = 0xd3f23f;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);
      renderer.domElement.className = "absolute inset-0 size-full";
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 3, 17);
      const world = new THREE.Group();
      scene.add(world);
      scene.add(new THREE.AmbientLight(0xffffff, 0.9));
      const sun = new THREE.DirectionalLight(0xffffff, 0.8);
      sun.position.set(5, 8, 10);
      scene.add(sun);

      const coreMat = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(LIME) }, uTime: { value: 0 } },
        vertexShader: "varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN=normalize(normalMatrix*normal); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }",
        fragmentShader: "uniform vec3 uColor; uniform float uTime; varying vec3 vN; varying vec3 vV; void main(){ float f=pow(1.0-max(dot(vN,vV),0.0),2.0); float p=0.5+0.5*sin(uTime*1.6); gl_FragColor=vec4(uColor, clamp(0.25+f*0.85+p*0.12,0.0,1.0)); }",
        transparent: true,
      });
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.85, 48, 32), coreMat);
      world.add(core);
      const line = (c: number, o: number) => new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: o });
      const wireA = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.45, 1)), line(INK, 0.45));
      const wireB = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.95, 0)), line(BLUE, 0.6));
      world.add(wireA, wireB);

      const N = 600, sp = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const r = 12 + ((i * 7919) % 97) / 10, th = i * 2.399, ph = Math.acos(1 - (2 * (i + 0.5)) / N);
        sp.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.8, r * Math.sin(ph) * Math.sin(th)], i * 3);
      }
      const sg = new THREE.BufferGeometry();
      sg.setAttribute("position", new THREE.BufferAttribute(sp, 3));
      const stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: INK, size: 0.06, transparent: true, opacity: 0.5, depthWrite: false }));
      scene.add(stars);

      const langs = Array.from(new Set(repos.map((r) => r.language)));
      const rings = langs.map((lang, i) => {
        const radius = 3.2 + i * 1.9;
        const tilt = new THREE.Group();
        tilt.rotation.set(i % 2 ? -0.3 : 0.42, 0, i % 2 ? -0.2 : 0.12);
        const spin = new THREE.Group();
        tilt.add(spin);
        world.add(tilt);
        const pts = Array.from({ length: 160 }, (_, k) => new THREE.Vector3(Math.cos((k / 160) * Math.PI * 2) * radius, 0, Math.sin((k / 160) * Math.PI * 2) * radius));
        tilt.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), line(INK, 0.3)));
        return { lang, radius, spin, speed: i % 2 ? -0.15 : 0.28 };
      });

      const picks: THREE.Object3D[] = [];
      const nodes = repos.map((repo, idx) => {
        const ring = rings[langs.indexOf(repo.language)]!;
        const same = repos.filter((r) => r.language === repo.language);
        const ang = (same.indexOf(repo) / same.length) * Math.PI * 2 + 0.4;
        const node = new THREE.Group();
        node.position.set(Math.cos(ang) * ring.radius, 0, Math.sin(ang) * ring.radius);
        ring.spin.add(node);
        const py = repo.language === "Python";
        const geo = py ? new THREE.OctahedronGeometry(0.5) : new THREE.BoxGeometry(0.62, 0.62, 0.62);
        const body = new THREE.Group();
        body.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: py ? BLUE : LIME, roughness: 0.5, flatShading: true })));
        body.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), line(0x0b0e17, 0.9)));
        node.add(body);
        const pick = new THREE.Mesh(new THREE.SphereGeometry(0.85, 10, 8), new THREE.MeshBasicMaterial({ visible: false }));
        pick.userData = { idx };
        node.add(pick);
        picks.push(pick);
        const lg = new THREE.BufferGeometry();
        lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
        const link = new THREE.Line(lg, line(INK, 0.15));
        const pg = new THREE.BufferGeometry();
        pg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(9), 3));
        const packets = new THREE.Points(pg, new THREE.PointsMaterial({ color: LIME, size: 0.12, transparent: true, depthWrite: false }));
        link.frustumCulled = packets.frustumCulled = false;
        world.add(link, packets);
        return { node, body, link, packets, s: 1, phase: idx * 1.3 };
      });

      const resize = () => {
        const { width, height } = el.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(1, height);
        camera.position.z = camera.aspect < 1 ? 24 : 17;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), pointer = { x: 0, y: 0 };
      let hovered = -1;
      const onMove = (e: PointerEvent) => {
        const r = renderer.domElement.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        pointer.x = ndc.x; pointer.y = ndc.y;
        ray.setFromCamera(ndc, camera);
        const hit = ray.intersectObjects(picks, false)[0];
        const i = hit ? (hit.object.userData["idx"] as number) : -1;
        if (i !== hovered) {
          hovered = i;
          setHover(i >= 0 ? repos[i]! : null);
          el.style.cursor = i >= 0 ? "pointer" : "grab";
        }
      };
      const onClick = () => { if (hovered >= 0) window.open(repos[hovered]!.url, "_blank", "noopener"); };
      const onLeave = () => { hovered = -1; setHover(null); pointer.x = pointer.y = 0; };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("click", onClick);
      el.addEventListener("pointerleave", onLeave);

      let visible = true;
      const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; });
      io.observe(el);
      const tmp = new THREE.Vector3();
      let t = 0, last = performance.now(), raf = 0;
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!visible) return;
        if (!reduce) t += dt;
        coreMat.uniforms["uTime"]!.value = t;
        wireA.rotation.set(t * 0.12, t * 0.35, 0);
        wireB.rotation.set(0, -t * 0.2, t * 0.1);
        stars.rotation.y = t * 0.02;
        rings.forEach((r) => (r.spin.rotation.y = t * r.speed));
        world.rotation.y += (pointer.x * 0.35 - world.rotation.y) * 0.05;
        world.rotation.x += (-pointer.y * 0.15 - world.rotation.x) * 0.05;
        scene.updateMatrixWorld(true);
        nodes.forEach((n, i) => {
          n.s += ((hovered === i ? 1.45 : 1) - n.s) * 0.15;
          n.body.scale.setScalar(n.s);
          n.body.rotation.set(t * 0.3, t * 0.6 + n.phase, 0);
          n.node.getWorldPosition(tmp);
          world.worldToLocal(tmp);
          const la = n.link.geometry.attributes["position"] as THREE.BufferAttribute;
          la.setXYZ(1, tmp.x, tmp.y, tmp.z); la.needsUpdate = true;
          const pa = n.packets.geometry.attributes["position"] as THREE.BufferAttribute;
          for (let q = 0; q < 3; q++) { const k = (t * 0.22 + q / 3 + n.phase * 0.1) % 1; pa.setXYZ(q, tmp.x * k, tmp.y * k, tmp.z * k); }
          pa.needsUpdate = true;
        });
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(frame);
      el.dataset["sceneReady"] = "true";

      dispose = () => {
        cancelAnimationFrame(raf);
        ro.disconnect(); io.disconnect();
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("click", onClick);
        el.removeEventListener("pointerleave", onLeave);
        scene.traverse((o) => {
          const m = o as THREE.Mesh;
          m.geometry?.dispose();
          const mat = m.material as THREE.Material | undefined;
          mat?.dispose?.();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    }});
    return () => { cancelled = true; dispose(); };
  }, [repos]);

  return (
    <div ref={wrap} className="relative h-[420px] w-full cursor-grab overflow-hidden rounded-3xl bg-ink sm:h-[520px]">
      <div className="pointer-events-none absolute left-5 top-5 z-10 text-ink-foreground">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-muted">Repo orbit</p>
        <p className="mt-1 font-display text-2xl font-semibold">{hover ? hover.title : "Hover a node"}</p>
        <p className="text-xs text-ink-muted">{hover ? `${hover.language} · click to open on GitHub` : "Python inner ring · HTML outer ring"}</p>
      </div>
      <div className="pointer-events-none absolute bottom-5 left-5 z-10 flex gap-4 text-xs text-ink-muted">
        <span className="inline-flex items-center gap-1.5"><span className="size-2 rotate-45 bg-primary-glow" /> Python</span>
        <span className="inline-flex items-center gap-1.5"><span className="size-2 bg-accent" /> HTML</span>
      </div>
    </div>
  );
}
