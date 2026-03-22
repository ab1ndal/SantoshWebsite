"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle / molecular network background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
    }

    const N = 55;
    const particles: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(58,158,100,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(58,158,100,0.5)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-ink-950">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(58,158,100,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-amber-500" />
            <span
              className="section-label"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Group II+ Re-Refined Base Oil · Ghaziabad, India
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] tracking-wide text-white mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            India produces{" "}
            <span
              className="text-amber-500"
              style={{ textShadow: "0 0 40px rgba(245,158,11,0.3)" }}
            >
              1.3 million tonnes
            </span>
            <br />
            of used oil every year.
            <br />
            <span className="text-green-400">We are changing what happens next.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg lg:text-xl text-ink-200 max-w-2xl mb-10 leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
          >
            Santosh Petrochemical Innovations is commissioning India&apos;s Group&nbsp;II+ RRBO
            facility in Ghaziabad — converting used lubricating oil into premium base oil
            via vacuum distillation and hydrotreating. EPR-compliant. BS-VI ready.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href="/sample-request"
              className="inline-flex items-center gap-2 px-7 py-4 bg-green-500 text-white rounded font-semibold hover:bg-green-400 transition-colors duration-200 shadow-lg shadow-green-900/30"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem", letterSpacing: "0.06em" }}
            >
              Request a Sample
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/collect"
              className="inline-flex items-center gap-2 px-7 py-4 border border-amber-500/70 text-amber-400 rounded font-semibold hover:bg-amber-500/10 transition-colors duration-200"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem", letterSpacing: "0.06em" }}
            >
              Schedule a Pickup
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center gap-2 px-7 py-4 text-ink-200 hover:text-white transition-colors duration-200"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem", letterSpacing: "0.06em" }}
            >
              See Our Process ↓
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* Text badges */}
            {[
              { label: "EPR Registered" },
              { label: "CPCB Compliant" },
              { label: "Group II+ via Hydrotreating" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm text-ink-200"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em" }}
              >
                <span className="text-green-400 font-bold">✓</span>
                {item.label}
              </div>
            ))}

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-ink-600" />

            {/* Technology partner logos */}
            <div className="flex items-center gap-4">
              <span
                className="text-xs text-ink-500 uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Technology
              </span>
              <div className="flex items-center gap-3">
                {/* Indian Oil logo */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/8 border border-white/10">
                  <Image
                    src="/indian-oil-logo.svg"
                    alt="Indian Oil Corporation"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span
                    className="text-xs text-ink-200"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em" }}
                  >
                    Indian Oil
                  </span>
                </div>
                {/* Santosh logo */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/8 border border-white/10">
                  <Image
                    src="/santosh-logo.svg"
                    alt="Santosh Petrochemical"
                    width={40}
                    height={40}
                    className="object-contain brightness-0 invert"
                  />
                  <span
                    className="text-xs text-ink-200"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em" }}
                  >
                    Santosh
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-400">
        <div
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Scroll
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-ink-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
