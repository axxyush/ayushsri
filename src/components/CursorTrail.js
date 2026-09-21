import React, { useEffect, useRef, useState } from "react";

const THEME = {
  Ironman: "#ef4444",
  Wolverine: "#eab308",
  Spiderman2099: "#3b82f6",
  Hulk: "#22c55e",
};

/**
 * Desktop-only themed particle trail that follows the cursor.
 * Disabled on coarse pointers / touch and when reduced-motion is preferred.
 */
export default function CursorTrail({ hero }) {
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqPointer = window.matchMedia("(pointer: fine)");
    const update = () =>
      setEnabled(mqPointer.matches && !mqMotion.matches && window.innerWidth > 768);
    update();
    mqMotion.addEventListener("change", update);
    mqPointer.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mqMotion.removeEventListener("change", update);
      mqPointer.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const color = THEME[hero] || THEME.Ironman;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      for (let i = 0; i < 2; i += 1) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.4,
          life: 1,
          size: 2 + Math.random() * 2.5,
        });
      }
      if (particles.current.length > 80) {
        particles.current.splice(0, particles.current.length - 80);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.life > 0.02);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.life *= 0.92;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = p.life * 0.55;
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      particles.current = [];
    };
  }, [enabled, hero]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail-canvas"
      aria-hidden="true"
    />
  );
}
