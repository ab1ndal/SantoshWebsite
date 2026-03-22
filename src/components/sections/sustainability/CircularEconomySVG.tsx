"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const nodes = [
  { id: "collected", x: 150, y: 30, label: "Used Oil Collected", sub: "Workshops & Fleets" },
  { id: "rerefined", x: 270, y: 160, label: "Re-Refined at Santosh", sub: "REVA Hydrotreating" },
  { id: "engines", x: 150, y: 290, label: "Back Into Engines", sub: "Group II+ RRBO" },
  { id: "again", x: 30, y: 160, label: "Collected Again", sub: "EPR Mandated Loop" },
];

export default function CircularEconomySVG() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-ink-800 py-24 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(58,158,100,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-12">
          <p className="section-label mb-3">02 · CIRCULAR ECONOMY</p>
          <h2
            className="text-[clamp(1.75rem,4vw,3rem)] leading-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            The Loop That Closes the Gap
          </h2>
          <p
            className="text-ink-200 text-base leading-relaxed mt-4 max-w-xl mx-auto"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
          >
            Every litre of RRBO displaces virgin base oil, recaptures used oil from the waste stream,
            and feeds back into the same engines it came from. The EPR mandate makes this loop
            economically mandated — not just environmentally responsible.
          </p>
        </div>

        <div className="flex justify-center">
          <svg
            viewBox="0 0 400 400"
            className="w-full max-w-lg mx-auto"
            aria-label="Circular economy: Used Oil Collected to Re-Refined at Santosh to Back Into Engines to Collected Again"
          >
            <defs>
              <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L0,8 L8,4 Z" fill="#3a9e64" />
              </marker>
              <marker id="arrow-amber" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L0,8 L8,4 Z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* Animated clockwise connecting path (dashed green arrows) */}
            <motion.path
              d="M200 80 Q295 80 295 160 Q295 240 200 240 Q105 240 105 160 Q105 80 200 80"
              fill="none"
              stroke="#3a9e64"
              strokeWidth="2"
              strokeDasharray="8 4"
              animate={{ strokeDashoffset: [0, -48] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />

            {/* Return arc (amber dashed) */}
            <path
              d="M150 290 Q20 290 20 160 Q20 30 150 30"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              markerEnd="url(#arrow-amber)"
            />

            {/* Node boxes — appear on scroll */}
            {nodes.map((node, i) => (
              <g
                key={node.id}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(15px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                }}
              >
                <rect
                  x={node.x - 50}
                  y={node.y - 25}
                  width={100}
                  height={50}
                  rx="8"
                  fill="#1c1e18"
                  stroke="#2d7a4e"
                  strokeWidth="1.5"
                />
                <text
                  x={node.x}
                  y={node.y - 8}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#d4d8c8"
                  fontFamily="Barlow Condensed, sans-serif"
                  fontWeight="600"
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={node.y + 7}
                  textAnchor="middle"
                  fontSize="7.5"
                  fill="#5c6050"
                  fontFamily="Barlow, sans-serif"
                >
                  {node.sub}
                </text>
              </g>
            ))}

            {/* Directional arrows between nodes */}
            {/* Top to Right */}
            <path
              d="M200 55 Q270 55 270 135"
              fill="none"
              stroke="#3a9e64"
              strokeWidth="2"
              markerEnd="url(#arrow-green)"
            />
            {/* Right to Bottom */}
            <path
              d="M270 185 Q270 265 200 265"
              fill="none"
              stroke="#3a9e64"
              strokeWidth="2"
              markerEnd="url(#arrow-green)"
            />
            {/* Bottom to Left */}
            <path
              d="M150 290 Q80 290 80 215"
              fill="none"
              stroke="#3a9e64"
              strokeWidth="2"
              markerEnd="url(#arrow-green)"
            />
            {/* Left to Top */}
            <path
              d="M80 135 Q80 55 150 55"
              fill="none"
              stroke="#3a9e64"
              strokeWidth="2"
              markerEnd="url(#arrow-green)"
            />

            {/* Loop label */}
            <text
              x="200"
              y="200"
              textAnchor="middle"
              fontSize="9"
              fill="#3a9e64"
              fontFamily="Barlow Condensed, sans-serif"
              fontWeight="600"
            >
              EPR-Mandated
            </text>
            <text
              x="200"
              y="213"
              textAnchor="middle"
              fontSize="9"
              fill="#3a9e64"
              fontFamily="Barlow Condensed, sans-serif"
            >
              Circular Loop
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
