import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { sanityClient } from '@/lib/sanity/client'
import { latestPostsQuery } from '@/lib/sanity/queries'
import { Post } from '@/lib/sanity/types'
import { PostCard } from '@/components/sections/PostCard'

const getLatestPosts = unstable_cache(
  async () => sanityClient.fetch<Post[]>(latestPostsQuery),
  ['latest-posts'],
  { revalidate: 3600 }
)

export default async function LatestInsights() {
  const posts = await getLatestPosts()

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="bg-ink-900 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-3">08 · INSIGHTS</p>
            <h2
              className="text-[clamp(2rem,4vw,2.8rem)] text-ink-50"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Latest from the lab & field
            </h2>
          </div>
          <Link
            href="/insights"
            className="text-green-500 font-semibold hover:text-green-400 transition-colors whitespace-nowrap"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.06em' }}
          >
            All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug.current} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
