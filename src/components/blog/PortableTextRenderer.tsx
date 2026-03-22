'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from '@/lib/sanity/client'

const builder = imageUrlBuilder(sanityClient)

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
      if (!value?.asset) return null
      const src = builder.image(value).width(1200).auto('format').url()
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={value?.alt ?? ''}
            className="w-full rounded-lg object-cover"
          />
        </figure>
      )
    },
  },
}

export function PortableTextRenderer({ value }: { value: unknown[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableText value={value as any} components={components} />
}
