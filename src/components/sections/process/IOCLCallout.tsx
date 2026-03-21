import Image from "next/image";
import Link from "next/link";

export default function IOCLCallout() {
  return (
    <section className="bg-ink-800 border-t border-green-500/20 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="section-label mb-4" style={{ color: "#f59e0b" }}>
          07 · TECHNOLOGY PARTNER
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: prominent investor-facing content */}
          <div>
            <h2
              className="text-[clamp(2rem,5vw,4.5rem)] leading-tight text-amber-500 mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Indian Oil Technology
            </h2>

            <p
              className="text-ink-200 mb-4"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              Trusted hydrotreating process technology for India&apos;s re-refining industry.
            </p>

            <p
              className="text-ink-200 mb-8 leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: "0.875rem" }}
            >
              Our plant operates on Indian Oil Technology — the same process know-how trusted by
              Group II+ producers across the Indian market. IOCL&apos;s association carries decades
              of refining expertise and aligns with our BS-VI supply commitments.
            </p>

            {/* Trust signal pills */}
            <div className="flex flex-wrap gap-3">
              {["Indian Refining IP", "BS-VI Aligned", "Group II+ Proven"].map((pill) => (
                <span
                  key={pill}
                  className="bg-green-900/30 border border-green-500/20 text-green-400 px-3 py-1 rounded-full"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Right: logos */}
          <div className="flex flex-col items-center justify-center gap-8 p-12 rounded-2xl bg-ink-900/60 border border-ink-600/30">
            {/* Indian Oil logo */}
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white rounded-xl px-8 py-5 flex items-center justify-center">
                <Image
                  src="/indian-oil-logo.svg"
                  alt="Indian Oil Corporation"
                  width={140}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p
                className="text-xs text-ink-400 text-center"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Technology Partner
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 h-px bg-ink-600/50" />
              <span className="text-xs text-ink-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>+</span>
              <div className="flex-1 h-px bg-ink-600/50" />
            </div>

            {/* Santosh logo */}
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white rounded-xl px-8 py-5 flex items-center justify-center">
                <Image
                  src="/santosh-logo.svg"
                  alt="Santosh Petrochemical Innovations"
                  width={100}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p
                className="text-xs text-ink-400 text-center"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Operator
              </p>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="border-t border-ink-600/30 pt-16 mt-16 text-center">
          <h3
            className="text-[clamp(1.5rem,4vw,3rem)] leading-tight text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Ready to Evaluate Our Products?
          </h3>
          <p
            className="text-ink-200 mb-8"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: "0.875rem" }}
          >
            See our full product specifications, available grades, and request a sample.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-6 py-3.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
            >
              View Products →
            </Link>
            <Link
              href="/sample-request"
              className="px-6 py-3.5 border border-ink-600/60 text-ink-100 rounded-lg font-semibold hover:border-ink-400/80 transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
            >
              Request a Sample →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
