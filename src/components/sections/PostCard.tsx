import Link from 'next/link'
import { Post } from '@/lib/sanity/types'

const tagColorMap: Record<Post['tag'], string> = {
  Technical: 'bg-green-500/10 text-green-400 border-green-500/30',
  Regulatory: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Comparison: 'bg-ink-700 text-ink-200 border-ink-600',
  'How-To': 'bg-ink-700 text-ink-200 border-ink-600',
}

export function PostCard({ post }: { post: Post }) {
  const tagClasses = tagColorMap[post.tag] ?? 'bg-ink-700 text-ink-200 border-ink-600'
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link
      href={`/insights/${post.slug.current}`}
      className="group flex flex-col p-6 rounded-xl border border-ink-600 bg-ink-800 hover:border-green-400/50 hover:shadow-md transition-all duration-300"
    >
      <div
        className={`inline-flex items-center px-2.5 py-1 rounded border text-xs tracking-wider mb-4 w-fit ${tagClasses}`}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400 }}
      >
        {post.tag}
      </div>

      <h3
        className="text-base text-ink-100 leading-snug group-hover:text-green-400 transition-colors mb-3"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '16px' }}
      >
        {post.title}
      </h3>

      <p
        className="text-ink-200 leading-relaxed flex-1 mb-5"
        style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: '16px' }}
      >
        {post.excerpt}
      </p>

      <div className="border-t border-ink-700 pt-4 flex items-center justify-between">
        <span
          className="text-ink-400"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: '12px' }}
        >
          {formattedDate}
        </span>

        {post.readTime && (
          <span
            className="text-ink-400"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: '12px' }}
            aria-label={`${post.readTime} minute read`}
          >
            {post.readTime} min read
          </span>
        )}

        <span
          className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: '12px' }}
        >
          Read →
        </span>
      </div>
    </Link>
  )
}
