export const allPostsQuery = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) { title, slug, tag, readTime, publishedAt, excerpt }`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] { title, slug, tag, featuredImage, readTime, publishedAt, excerpt, body }`

export const latestPostsQuery = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0..2] { title, slug, tag, readTime, publishedAt, excerpt }`

export const allPostSlugsQuery = `*[_type == "post" && defined(publishedAt)] { "slug": slug.current, publishedAt }`
