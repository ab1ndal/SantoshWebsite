export interface Post {
  title: string
  slug: { current: string }
  tag: 'Technical' | 'Regulatory' | 'Comparison' | 'How-To'
  featuredImage?: { asset: { _ref: string } }
  readTime?: number
  publishedAt: string
  excerpt: string
  body?: unknown[]
}
