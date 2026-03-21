import { Truck, Package, Box } from "lucide-react";

const formats = [
  {
    Icon: Truck,
    name: "Bulk Tanker",
    description:
      "Ideal for large-volume blenders and industrial users. Full tanker loads dispatched directly from our Ghaziabad plant across NCR and UP.",
  },
  {
    Icon: Package,
    name: "210L Drum",
    description:
      "Standard format for mid-scale procurement. Steel drums with full labelling and CoA documentation included.",
  },
  {
    Icon: Box,
    name: "IBC (1000L)",
    description:
      "Intermediate bulk containers for flexible high-volume storage. Suitable for trial orders and blending lab evaluations.",
  },
];

export default function PackFormats() {
  return (
    <section className="bg-ink-900 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="section-label mb-4">05 · PACK FORMATS</p>
        <h2
          className="text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white mb-12"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Available In Every Scale
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {formats.map((format) => (
            <div
              key={format.name}
              className="bg-ink-800/50 border border-ink-600/40 rounded-2xl p-8 text-center"
            >
              <format.Icon className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3
                className="text-white mb-3"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                {format.name}
              </h3>
              <p
                className="text-ink-200"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: "0.875rem" }}
              >
                {format.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
