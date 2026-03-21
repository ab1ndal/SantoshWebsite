const comparisonRows = [
  {
    property: "VISCOSITY INDEX",
    santosh: "≥ 95",
    groupI: "80–95",
    virginII: "≥ 90",
    santoshGood: true,
  },
  {
    property: "SULFUR CONTENT",
    santosh: "< 300 ppm",
    groupI: "0.2–1.2%",
    virginII: "< 300 ppm",
    santoshGood: true,
  },
  {
    property: "BS-VI COMPATIBLE",
    santosh: "Yes",
    groupI: "Marginal",
    virginII: "Yes",
    santoshGood: true,
    isCheckmark: true,
  },
  {
    property: "PRICE VS VIRGIN",
    santosh: "15–25% lower",
    groupI: "20–30% lower",
    virginII: "Baseline",
    santoshGood: true,
  },
  {
    property: "SUPPLY RELIABILITY",
    santosh: "Domestic",
    groupI: "Domestic",
    virginII: "Import-dependent",
    santoshGood: false,
  },
  {
    property: "PROCESS TYPE",
    santosh: "Hydrotreating",
    groupI: "Acid Clay / Adsorption",
    virginII: "Hydrocracking",
    santoshGood: true,
  },
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="inline-block mr-1">
      <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="#52c17e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ComparisonTable() {
  return (
    <section className="bg-ink-900 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="section-label mb-4">03 · COMPARISON</p>
        <h2
          className="text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white mb-10"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Why Santosh Group II+ RRBO Outperforms
        </h2>

        <p
          className="font-mono text-xs text-ink-400 mb-2 lg:hidden"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          ← swipe to see all columns →
        </p>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                {/* Property column */}
                <th
                  className="py-4 px-4 text-left text-ink-400 uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                >
                  Property
                </th>

                {/* Santosh column — RECOMMENDED */}
                <th className="py-4 px-4 text-left bg-green-900/30 border-l-2 border-r-2 border-t-2 border-green-500/50">
                  <span
                    className="inline-block bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full text-xs tracking-widest uppercase mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    RECOMMENDED
                  </span>
                  <br />
                  <span
                    className="text-white"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.875rem" }}
                  >
                    SANTOSH GROUP II+ RRBO
                  </span>
                </th>

                {/* Group I column */}
                <th
                  className="py-4 px-4 text-left border border-ink-600/30"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#5c6050" }}
                >
                  Group I RRBO
                </th>

                {/* Virgin Group II column */}
                <th
                  className="py-4 px-4 text-left border border-ink-600/30"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#5c6050" }}
                >
                  Virgin Group II
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => {
                const isLast = i === comparisonRows.length - 1;
                return (
                  <tr key={row.property} className="border-b border-ink-600/20">
                    <td
                      className="py-3 px-4 text-ink-400 uppercase"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                    >
                      {row.property}
                    </td>
                    <td
                      className={`py-3 px-4 text-green-400 bg-green-900/20 border-l-2 border-r-2 border-green-500/30 ${isLast ? "border-b-2 border-b-green-500/30" : ""}`}
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                    >
                      {row.isCheckmark && row.santosh === "Yes" ? (
                        <>
                          <CheckIcon />
                          Yes
                        </>
                      ) : (
                        row.santosh
                      )}
                    </td>
                    <td
                      className="py-3 px-4 text-ink-200"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                    >
                      {row.isCheckmark && row.groupI === "Marginal" ? (
                        <span className="text-amber-300">— Marginal</span>
                      ) : (
                        row.groupI
                      )}
                    </td>
                    <td
                      className="py-3 px-4 text-ink-200"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                    >
                      {row.isCheckmark && row.virginII === "Yes" ? (
                        <>
                          <CheckIcon />
                          Yes
                        </>
                      ) : (
                        row.virginII
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p
          className="mt-4 text-ink-400"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
        >
          Group I RRBO spec ref: IFP Product Data Sheet. Virgin Group II import price ref: ICIS Base
          Oils Report Q4 2025. BS-VI compatibility per API SN/CF specification requirements.
        </p>
      </div>
    </section>
  );
}
