import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HeroScene – Three.js interactive 3D background for Rogue-inspired dark hero.
 * Features:
 * - Ambient starfield / digital code particle constellation with depth
 * - Floating geometric wireframe polyhedra (Torus & Icosahedron) with neon glowing edges
 * - Scroll-driven 3D camera translation & rotation
 * - Subtle mouse-reactive parallax tilt
 */
export function HeroScene({ scrollProgress }: { scrollProgress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    points: THREE.Points;
    meshes: THREE.Mesh[];
    raf: number;
    disposed: boolean;
    mouseX: number;
    mouseY: number;
    targetMouseX: number;
    targetMouseY: number;
  } | null>(null);

  // Sync scrollProgress into ref for smooth frame access
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.05);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 4, 30);
    pointLight1.position.set(-8, 6, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xbbf438, 3, 25);
    pointLight2.position.set(8, -6, 2);
    scene.add(pointLight2);

    // 1. Particle field (Star dust & digital nodes)
    const particleCount = 750;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const colorLime = new THREE.Color("#bbf438");
    const colorCobalt = new THREE.Color("#4f46e5");
    const colorCyan = new THREE.Color("#38bdf8");
    const colorDim = new THREE.Color("#71717a");

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      posArray[i3] = (Math.random() - 0.5) * 32;
      posArray[i3 + 1] = (Math.random() - 0.5) * 26;
      posArray[i3 + 2] = (Math.random() - 0.5) * 24 - 4;

      const pick = Math.random();
      const col = pick < 0.15 ? colorLime : pick < 0.4 ? colorCobalt : pick < 0.65 ? colorCyan : colorDim;
      colorArray[i3] = col.r;
      colorArray[i3 + 1] = col.g;
      colorArray[i3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    // Particle texture canvas
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext("2d")!;
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.3, "rgba(255,255,255,0.7)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    pCtx.fillStyle = grad;
    pCtx.beginPath();
    pCtx.arc(16, 16, 16, 0, Math.PI * 2);
    pCtx.fill();
    const particleTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      map: particleTex,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 2. Wireframe Floating 3D Geometries
    const meshes: THREE.Mesh[] = [];

    // Torus 1
    const torusGeo = new THREE.TorusGeometry(2.4, 0.04, 16, 80);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const torus1 = new THREE.Mesh(torusGeo, torusMat);
    torus1.position.set(-6, -2, -3);
    torus1.rotation.set(0.6, 0.4, 0.2);
    scene.add(torus1);
    meshes.push(torus1);

    // Torus 2 (Acid lime accent)
    const torusGeo2 = new THREE.TorusGeometry(1.6, 0.03, 16, 60);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0xbbf438,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const torus2 = new THREE.Mesh(torusGeo2, torusMat2);
    torus2.position.set(7, 3, -4);
    torus2.rotation.set(-0.4, 0.8, -0.3);
    scene.add(torus2);
    meshes.push(torus2);

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(5.5, -4.5, -2);
    scene.add(ico);
    meshes.push(ico);

    // Dodecahedron
    const dodecGeo = new THREE.DodecahedronGeometry(1.2, 0);
    const dodecMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const dodec = new THREE.Mesh(dodecGeo, dodecMat);
    dodec.position.set(-5.5, 4, -3.5);
    scene.add(dodec);
    meshes.push(dodec);

    // Mouse movement handler
    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      if (stateRef.current) {
        stateRef.current.targetMouseX = nx;
        stateRef.current.targetMouseY = ny;
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Window resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const state = {
      renderer,
      scene,
      camera,
      points: particles,
      meshes,
      raf: 0,
      disposed: false,
      mouseX: 0,
      mouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
    };
    stateRef.current = state;

    // Animation Loop
    let clock = 0;
    const renderLoop = () => {
      if (state.disposed) return;
      clock += 0.008;

      // Smooth mouse lerp
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.05;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.05;

      const progress = scrollRef.current; // 0 to 1

      // Rotate particle constellation
      particles.rotation.y = clock * 0.05 + progress * 0.4;
      particles.rotation.x = Math.sin(clock * 0.03) * 0.05 + progress * 0.2;

      // Rotate geometric meshes
      torus1.rotation.x += 0.004;
      torus1.rotation.y += 0.006;
      torus2.rotation.x -= 0.005;
      torus2.rotation.z += 0.004;
      ico.rotation.x += 0.007;
      ico.rotation.y += 0.005;
      dodec.rotation.y -= 0.006;
      dodec.rotation.z += 0.005;

      // Parallax scroll on wireframes
      torus1.position.y = -2 + progress * 4;
      torus2.position.y = 3 - progress * 5;
      ico.position.y = -4.5 + progress * 6;
      dodec.position.y = 4 - progress * 4.5;

      // Camera reactive position (Scroll translation + mouse tilt)
      camera.position.x = state.mouseX * 0.8;
      camera.position.y = state.mouseY * 0.6 - progress * 3;
      camera.position.z = 10 - progress * 2.5;
      camera.lookAt(state.mouseX * 0.2, -progress * 2, 0);

      renderer.render(scene, camera);
      state.raf = requestAnimationFrame(renderLoop);
    };

    state.raf = requestAnimationFrame(renderLoop);

    return () => {
      state.disposed = true;
      cancelAnimationFrame(state.raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      particleGeo.dispose();
      particleMat.dispose();
      particleTex.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      torusGeo2.dispose();
      torusMat2.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      dodecGeo.dispose();
      dodecMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-90"
      aria-hidden="true"
    />
  );
}
