import Link from "next/link";

const posts = [
  {
    slug: "what-is-group-ii-plus-base-oil",
    tag: "Technical",
    tagColor: "text-green-700 border-green-400/50 bg-green-50",
    title: "What is Group II+ Base Oil and Why India's Lubricant Industry is Shifting to It",
    excerpt: "As BS-VI mandates reshape India's lubricant landscape, Group II+ base oils are emerging as the required standard — not just a premium option.",
    date: "March 2026",
  },
  {
    slug: "epr-compliance-guide-2026",
    tag: "Regulatory",
    tagColor: "text-amber-700 border-amber-400/50 bg-amber-50",
    title: "EPR Compliance Guide 2026: What Lubricant Manufacturers Need to Know",
    excerpt: "India's Extended Producer Responsibility framework for used oil is now active. Here's what lubricant manufacturers must do — and by when.",
    date: "March 2026",
  },
  {
    slug: "re-refined-vs-virgin-base-oil",
    tag: "Comparison",
    tagColor: "text-gray-600 border-gray-300 bg-gray-50",
    title: "Re-Refined Base Oil vs Virgin Base Oil: A Technical Comparison",
    excerpt: "Modern hydrotreated RRBO meets or exceeds Group II virgin specs. The data makes a compelling case for circular base oil sourcing.",
    date: "March 2026",
  },
];

export default function LatestInsights() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-3">08 · INSIGHTS</p>
            <h2
              className="text-[clamp(2rem,4vw,2.8rem)] text-gray-900"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Latest from the lab & field
            </h2>
          </div>
          <Link
            href="/insights"
            className="text-green-600 font-semibold hover:text-green-700 transition-colors whitespace-nowrap"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
          >
            All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group flex flex-col p-6 rounded-xl border border-gray-200 bg-white hover:border-green-400/50 hover:shadow-md transition-all duration-300"
            >
              <div className={`inline-flex items-center px-2.5 py-1 rounded border text-xs font-mono tracking-wider mb-4 w-fit ${post.tagColor}`}>
                {post.tag}
              </div>
              <h3
                className="text-base font-bold text-gray-900 mb-3 leading-snug group-hover:text-green-700 transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
              >
                {post.title}
              </h3>
              <p
                className="text-sm text-gray-600 leading-relaxed flex-1 mb-5"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
              >
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400 font-mono">{post.date}</span>
                <span className="text-xs text-green-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
