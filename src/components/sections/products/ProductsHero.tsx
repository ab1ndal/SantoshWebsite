export default function ProductsHero() {
  return (
    <section className="bg-ink-950 gradient-mesh grid-overlay pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="section-label mb-4">01 · PRODUCTS</p>
        <h1
          className="text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white mb-6"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          <span className="text-green-400">Group II+</span> RRBO.
          <br />
          Built for BS-VI India.
        </h1>
        <p
          className="text-ink-200 text-sm leading-relaxed mb-10 max-w-2xl"
          style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
        >
          Re-refined base oil meeting API Group II+ specifications — produced at our 65 TPD plant
          in Ghaziabad, using Indian Oil Technology hydrotreating.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#tds"
            className="px-6 py-3.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
          >
            Download TDS →
          </a>
          <a
            href="/sample-request"
            className="px-6 py-3.5 border border-ink-600/60 text-ink-100 rounded-lg font-semibold hover:border-ink-400/80 transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
          >
            Request a Sample →
          </a>
        </div>
      </div>
    </section>
  );
}
