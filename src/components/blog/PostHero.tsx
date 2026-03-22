'use client'

import { useEffect, useRef } from 'react'

interface PostHeroProps {
  title: string
  tag: string
  tagClasses: string
  formattedDate: string
  readTime?: number
  featuredImageUrl?: string
}

export function PostHero({
  title,
  tag,
  tagClasses,
  formattedDate,
  readTime,
  featuredImageUrl,
}: PostHeroProps) {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!featuredImageUrl) return

    const handleScroll = () => {
      if (!imageRef.current) return
      const scrollY = window.scrollY
      const blur = Math.min(scrollY / 30, 12)
      const scale = 1 + scrollY / 2000
      imageRef.current.style.filter = `blur(${blur}px)`
      imageRef.current.style.transform = `scale(${scale})`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [featuredImageUrl])

  return (
    <section className="relative overflow-hidden" style={{ minHeight: featuredImageUrl ? '520px' : undefined }}>
      {/* Featured image background */}
      {featuredImageUrl && (
        <>
          <div
            ref={imageRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${featuredImageUrl})`,
              transformOrigin: 'center top',
            }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/7:gd0 via-ink-900/80 to-ink-900" />
        </>
      )}

      {!featuredImageUrl && <div className="absolute inset-0 bg-ink-900" />}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div
          className={`inline-flex items-center px-2.5 py-1 rounded border text-xs tracking-wider w-fit ${tagClasses}`}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400 }}
        >
          {tag}
        </div>

        <h1
          className="text-ink-50 leading-none max-w-3xl mt-4"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {title}
        </h1>

        <div
          className="flex items-center gap-4 mt-6 text-ink-400"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 400 }}
        >
          <span>{formattedDate}</span>
          {readTime && (
            <>
              <span>·</span>
              <span>{readTime} min read</span>
            </>
          )}
        </div>

        <div className="border-t border-ink-700 mt-8" />
      </div>
    </section>
  )
}
