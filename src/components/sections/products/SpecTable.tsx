const specRows = [
  {
    property: "Kinematic Viscosity @ 40°C",
    unit: "cSt",
    sn150: "28–32",
    sn500: "95–105",
    brightStock: "480–520",
    testMethod: "ASTM D445",
    groupIIMin: "—",
  },
  {
    property: "Kinematic Viscosity @ 100°C",
    unit: "cSt",
    sn150: "5.5–6.5",
    sn500: "11–13",
    brightStock: "32–38",
    testMethod: "ASTM D445",
    groupIIMin: "—",
  },
  {
    property: "Viscosity Index",
    unit: "—",
    sn150: "≥95",
    sn500: "≥95",
    brightStock: "≥95",
    testMethod: "ASTM D2270",
    groupIIMin: "80",
  },
  {
    property: "Flash Point (COC)",
    unit: "°C",
    sn150: "≥200",
    sn500: "≥220",
    brightStock: "≥260",
    testMethod: "ASTM D92",
    groupIIMin: "—",
  },
  {
    property: "Pour Point",
    unit: "°C",
    sn150: "≤ −9",
    sn500: "≤ −9",
    brightStock: "≤ −9",
    testMethod: "ASTM D97",
    groupIIMin: "—",
  },
  {
    property: "Sulfur Content",
    unit: "ppm",
    sn150: "<300",
    sn500: "<300",
    brightStock: "<300",
    testMethod: "ASTM D2622",
    groupIIMin: "—",
  },
  {
    property: "Colour (ASTM)",
    unit: "—",
    sn150: "≤2.0",
    sn500: "≤2.5",
    brightStock: "≤4.0",
    testMethod: "ASTM D1500",
    groupIIMin: "—",
  },
];

export default function SpecTable() {
  return (
    <section className="bg-ink-800 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="section-label mb-4">02 · SPECIFICATIONS</p>
        <h2
          className="text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white mb-10"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Technical Specifications
        </h2>

        <p
          className="font-mono text-xs text-ink-400 mb-2 lg:hidden"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          ← swipe to see all columns →
        </p>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead className="border-b border-ink-600/60">
              <tr>
                {["Property", "Unit", "SN 150", "SN 500", "Bright Stock", "Test Method", "Group II+ Min"].map(
                  (header) => (
                    <th
                      key={header}
                      className="py-3 px-4 text-left text-ink-400 uppercase tracking-wider"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {specRows.map((row, i) => (
                <tr
                  key={row.property}
                  className={`border-b border-ink-600/30 ${i % 2 === 0 ? "bg-ink-700/20" : ""}`}
                >
                  <td
                    className="py-3 px-4 text-ink-200"
                    style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: "0.875rem" }}
                  >
                    {row.property}
                  </td>
                  <td
                    className="py-3 px-4 text-ink-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                  >
                    {row.unit}
                  </td>
                  <td
                    className="py-3 px-4 text-green-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                  >
                    {row.sn150}
                  </td>
                  <td
                    className="py-3 px-4 text-green-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                  >
                    {row.sn500}
                  </td>
                  <td
                    className="py-3 px-4 text-green-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                  >
                    {row.brightStock}
                  </td>
                  <td
                    className="py-3 px-4 text-ink-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                  >
                    {row.testMethod}
                  </td>
                  <td
                    className="py-3 px-4 text-amber-300"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                  >
                    {row.groupIIMin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          className="mt-4 text-ink-400 italic"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
        >
          * Specifications pending client confirmation. Values shown are Group II+ industry reference
          standards. Batch-level CoA available on request.
        </p>
      </div>
    </section>
  );
}
