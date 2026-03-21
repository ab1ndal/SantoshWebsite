export default function ProcessHero() {
  return (
    <section className="bg-ink-950 gradient-mesh grid-overlay pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="section-label mb-4">01 · THE PROCESS</p>
        <h1
          className="text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white mb-6"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          From Used Oil
          <br />
          to <span className="text-green-400">Group II+</span>
          <br />
          in Six Steps.
        </h1>
        <p
          className="text-ink-200 text-sm leading-relaxed max-w-2xl"
          style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
        >
          Our re-refining plant in Ghaziabad uses Indian Oil Technology — vacuum distillation with
          Wiped Film Evaporation, followed by catalytic hydrotreating. Each batch lab-verified to
          Group II+ specification.
        </p>
      </div>
    </section>
  );
}
