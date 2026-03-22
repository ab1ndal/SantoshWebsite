'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p
        className="text-ink-100 leading-relaxed mb-6"
        style={{ fontFamily: "'Barlow', sans-serif", fontSize: '16px' }}
      >
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        className="text-ink-50 mt-12 mb-4"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
          lineHeight: '1.1',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-ink-50 mt-8 mb-3"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
          lineHeight: '1.1',
        }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-amber-500 pl-6 italic text-ink-200 my-8">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-ink-50">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-ink-200">{children}</em>
    ),
    link: ({ value, children }) => {
      const isExternal = value?.href?.startsWith('http')
      return (
        <a
          href={value?.href}
          className="text-green-500 underline underline-offset-2 hover:text-green-400"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-6 mb-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="ml-6 mb-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li
        className="text-ink-100"
        style={{ fontFamily: "'Barlow', sans-serif", fontSize: '16px' }}
      >
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li
        className="text-ink-100"
        style={{ fontFamily: "'Barlow', sans-serif", fontSize: '16px' }}
      >
        {children}
      </li>
    ),
  },
  types: {
    image: ({ value }) => {
      // Build src from asset ref if available
      const ref: string = value?.asset?._ref ?? ''
      // Sanity image URL pattern: ref format is "image-{id}-{dimensions}-{format}"
      // For a basic fallback without @sanity/image-url, use empty string
      const src = ref
        ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${ref.replace('image-', '').replace(/-(\w+)$/, '.$1').replace(/-(\d+x\d+)-/, '/$1-')}`
        : ''
      return (
        <figure className="my-8">
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={value?.alt ?? ''}
              className="w-full rounded-lg object-cover"
            />
          )}
        </figure>
      )
    },
  },
}

export function PortableTextRenderer({ value }: { value: unknown[] }) {
  return <PortableText value={value} components={components} />
}
