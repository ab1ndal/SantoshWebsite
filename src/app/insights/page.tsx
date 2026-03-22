import { unstable_cache } from 'next/cache'
import { sanityClient } from '@/lib/sanity/client'
import { allPostsQuery } from '@/lib/sanity/queries'
import { Post } from '@/lib/sanity/types'
import { PostCard } from '@/components/sections/PostCard'

export const revalidate = 3600

export const metadata = {
  title: 'Insights | Santosh Petrochemical',
  description:
    'Technical analysis, regulatory guides, and industry perspective from Santosh Petrochemical.',
}

const getPosts = unstable_cache(
  async () => sanityClient.fetch<Post[]>(allPostsQuery),
  ['all-posts'],
  { revalidate: 3600 }
)

export default async function InsightsPage() {
  const posts = await getPosts()

  return (
    <main>
      {/* Hero */}
      <section className="bg-ink-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="section-label mb-3">05 · INSIGHTS</p>
          <h1
            className="text-ink-50"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.1',
            }}
          >
            Insights from the Lab & Field
          </h1>
          <p
            className="text-ink-200 max-w-2xl mt-4"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: '16px' }}
          >
            Technical analysis, regulatory guides, and industry perspective from Santosh
            Petrochemical.
          </p>
        </div>
      </section>

      {/* Post Grid */}
      <section className="bg-ink-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <h2
                className="text-ink-200"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem' }}
              >
                No articles published yet.
              </h2>
              <p
                className="text-ink-400 mt-4"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: '16px' }}
              >
                Check back soon — our first insights are on the way.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.slug.current} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
