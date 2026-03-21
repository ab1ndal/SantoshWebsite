"use client";

const certs = [
  { label: "CPCB Registered", sub: "Used Oil Recycler", color: "green" },
  { label: "BIS IS 18722", sub: "RRBO Standard (Pending)", color: "amber" },
  { label: "PCB Registration", sub: "Hazardous Waste Rules 2016", color: "green" },
  { label: "EPR Compliant", sub: "Extended Producer Responsibility", color: "green" },
  { label: "ISO 9001", sub: "Quality Management (Pending)", color: "neutral" },
  { label: "Indian Oil Technology", sub: "IOCL MOU — March 2026", color: "amber" },
];

export default function CertificationsStrip() {
  return (
    <section className="bg-white py-16 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-14">
          <div className="flex-shrink-0">
            <p className="section-label mb-2">07 · COMPLIANCE</p>
            <h2
              className="text-2xl text-gray-900"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              Certifications &<br />Registrations
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {certs.map((cert) => (
              <div
                key={cert.label}
                className={`px-4 py-3 rounded-lg border ${
                  cert.color === "green"
                    ? "border-green-300 bg-green-50"
                    : cert.color === "amber"
                    ? "border-amber-300 bg-amber-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div
                  className={`text-sm font-bold ${
                    cert.color === "green" ? "text-green-700" : cert.color === "amber" ? "text-amber-700" : "text-gray-700"
                  }`}
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.04em" }}
                >
                  {cert.label}
                </div>
                <div className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {cert.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
