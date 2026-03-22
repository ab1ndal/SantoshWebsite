import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity/client'
import { postBySlugQuery, allPostSlugsQuery } from '@/lib/sanity/queries'
import { Post } from '@/lib/sanity/types'
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer'

export const revalidate = 3600

const tagColorMap: Record<Post['tag'], string> = {
  Technical: 'bg-green-500/10 text-green-400 border-green-500/30',
  Regulatory: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Comparison: 'bg-ink-700 text-ink-200 border-ink-600',
  'How-To': 'bg-ink-700 text-ink-200 border-ink-600',
}

const getPost = unstable_cache(
  async (slug: string) => sanityClient.fetch<Post | null>(postBySlugQuery, { slug }),
  ['post'],
  { revalidate: 3600 }
)

export async function generateStaticParams() {
  const posts = await sanityClient.fetch<Array<{ slug: string }>>(allPostSlugsQuery)
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Article Not Found | Santosh Insights' }
  return { title: `${post.title} | Santosh Insights` }
}

export default async function InsightsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const tagClasses = tagColorMap[post.tag] ?? 'bg-ink-700 text-ink-200 border-ink-600'

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <main>
      {/* Post Hero */}
      <section className="bg-ink-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className={`inline-flex items-center px-2.5 py-1 rounded border text-xs tracking-wider w-fit ${tagClasses}`}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400 }}
          >
            {post.tag}
          </div>

          <h1
            className="text-ink-50 leading-none max-w-3xl mt-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            }}
          >
            {post.title}
          </h1>

          <div
            className="flex items-center gap-4 mt-6 text-ink-400"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 400 }}
          >
            <span>{formattedDate}</span>
            {post.readTime && (
              <>
                <span>·</span>
                <span>{post.readTime} min read</span>
              </>
            )}
          </div>

          <div className="border-t border-ink-700 mt-8" />
        </div>
      </section>

      {/* Post Body */}
      <section className="bg-ink-900 py-16">
        <article className="max-w-[65ch] mx-auto px-6">
          <PortableTextRenderer value={post.body ?? []} />
        </article>
      </section>

      {/* Post Footer CTA */}
      <section className="bg-ink-800 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-ink-100 mb-8"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.1',
            }}
          >
            Interested in Group II+ RRBO?
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/sample-request"
              className="inline-flex px-6 py-3 rounded bg-green-500 text-white font-semibold hover:bg-green-400 transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.06em' }}
            >
              Request a Sample
            </Link>
            <Link
              href="/contact"
              className="inline-flex px-6 py-3 rounded border border-ink-500 text-ink-200 hover:border-green-400 hover:text-green-400 transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.06em' }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
