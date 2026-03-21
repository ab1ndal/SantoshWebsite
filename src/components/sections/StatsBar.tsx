"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 1300000,
    display: "1.3MT",
    label: "Tonnes of used oil generated annually in India",
    suffix: "",
  },
  {
    value: 15,
    display: "15%",
    label: "Currently formally recycled through legitimate channels",
    suffix: "%",
  },
  {
    value: 65,
    display: "65 TPD",
    label: "Installed processing capacity (tonnes per day)",
    suffix: " TPD",
  },
  {
    value: 50,
    display: "50%",
    label: "RRBO blending target mandated by EPR by FY2031",
    suffix: "%",
  },
];

function useCountUp(target: number, duration = 1800, triggered: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target, duration, triggered]);

  return count;
}

function StatItem({
  stat,
  triggered,
  index,
}: {
  stat: (typeof stats)[0];
  triggered: boolean;
  index: number;
}) {
  return (
    <div
      className="flex flex-col items-center lg:items-start text-center lg:text-left px-6 lg:px-0 group"
      style={{
        opacity: triggered ? 1 : 0,
        transform: triggered ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      <div
        className="text-[2.8rem] lg:text-[3.5rem] leading-none text-amber-500 mb-2"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
        aria-label={stat.display}
      >
        {stat.display}
      </div>
      <div
        className="text-sm text-ink-200 leading-snug max-w-[200px]"
        style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-ink-900 border-y border-ink-600/40 relative overflow-hidden"
    >
      {/* Subtle amber line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-ink-600/40">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} triggered={triggered} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
    </section>
  );
}
