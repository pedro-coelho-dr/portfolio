import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigationType, useParams } from 'react-router-dom'
import { detailMap, type Block } from '../data/detail'

type Lightbox = { src: string; alt: string }

function scrollToTop() {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'auto' : 'smooth' })
}

function renderBlock(
  block: Block,
  base: string,
  key: number,
  isLead: boolean,
  onOpen: (img: Lightbox) => void,
) {
  switch (block.type) {
    case 'p':
      return (
        <p key={key} className={isLead ? 'detail-lead' : 'detail-p'}>
          {block.content}
        </p>
      )
    case 'code':
      return (
        <pre key={key} className="spec-code detail-code">
          {block.content}
        </pre>
      )
    case 'ul':
      return (
        <ul key={key} className="detail-ul">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'img': {
      const src = block.external ? block.src : `${base}${block.src}`
      return (
        <figure key={key} className="detail-image">
          <button
            className="detail-image-trigger"
            onClick={() => onOpen({ src, alt: block.alt ?? '' })}
            type="button"
          >
            <img alt={block.alt ?? ''} height={block.h} loading="lazy" src={src} width={block.w} />
          </button>
          {block.caption ? (
            <figcaption className="detail-caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      )
    }
    case 'video': {
      const src = block.external ? block.src : `${base}${block.src}`
      return (
        <figure key={key} className={block.wide ? 'detail-video detail-video-wide' : 'detail-video'}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={block.caption ?? ''}
            src={src}
          />
          {block.caption ? (
            <figcaption className="detail-caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      )
    }
    case 'imgs': {
      return (
        <div key={key} className="detail-image-grid">
          {block.items.map((img, i) => {
            const src = img.external ? img.src : `${base}${img.src}`
            return (
              <figure key={i} className="detail-image">
                <button
                  className="detail-image-trigger"
                  onClick={() => onOpen({ src, alt: img.alt ?? '' })}
                  type="button"
                >
                  <img alt={img.alt ?? ''} height={img.h} loading="lazy" src={src} width={img.w} />
                </button>
                {img.alt ? (
                  <figcaption className="detail-caption">{img.alt}</figcaption>
                ) : null}
              </figure>
            )
          })}
        </div>
      )
    }
  }
}

/**
 * Inline detail view. Rendered through Home's <Outlet/> as a new band beneath
 * the works grid, so opening a project/code/text entry keeps the SPA surface
 * intact rather than swapping to a standalone page. The back link returns to
 * the home grid (Home handles the smooth scroll on close).
 */
function DetailSection() {
  const { slug } = useParams<{ slug: string }>()
  const navType = useNavigationType()
  const base = import.meta.env.BASE_URL
  const item = slug ? detailMap[slug] : undefined

  // Own the "scroll to the detail" behaviour, because only this component knows
  // when the detail is actually mounted and laid out (it's lazy-loaded). PUSH =
  // opened from the grid → glide down smoothly; POP = deep link / refresh /
  // back-forward → jump straight to the top of the band. A second pass on the
  // next frame corrects for any late layout shift (images, fonts) settling in
  // above the band. Home handles scrolling back up when the detail closes.
  const bandRef = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = reduce || navType === 'POP' ? 'auto' : 'smooth'
    const toTop = () => bandRef.current?.scrollIntoView({ behavior, block: 'start' })
    toTop()
    if (behavior === 'auto') {
      const raf = requestAnimationFrame(toTop)
      return () => cancelAnimationFrame(raf)
    }
  }, [slug, navType])

  // Lightbox for body images — click any image to open a focused overlay.
  const [lightbox, setLightbox] = useState<Lightbox | null>(null)
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  // Close the lightbox when the open entry changes — done during render (React's
  // "reset state when a prop changes" pattern) rather than in an effect, which
  // avoids the cascading-render lint and an extra paint showing a stale overlay.
  const [prevSlug, setPrevSlug] = useState(slug)
  if (slug !== prevSlug) {
    setPrevSlug(slug)
    setLightbox(null)
  }

  // Move keyboard focus to the detail heading when it opens, so screen-reader
  // and keyboard users land on the freshly revealed content.
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    // preventScroll: the scroll position is owned by the layout effect above —
    // focusing must not move the viewport (it used to fight that scroll).
    headingRef.current?.focus({ preventScroll: true })
  }, [slug])

  // Reflect the open entry in the document title + social/meta tags; restore the
  // page defaults on close. Without SSG these benefit JS-executing consumers (the
  // browser tab, Google) and keep a single canonical tag rather than duplicates.
  useEffect(() => {
    const prevTitle = document.title
    const restore: Array<() => void> = []

    if (item) {
      const title = `${item.title} — Pedro Coelho`
      document.title = title
      const pairs: Array<[string, string]> = [
        ['meta[property="og:title"]', title],
        ['meta[name="twitter:title"]', title],
      ]
      // Only override the description tags when this entry has a tagline; for
      // an entry without one (e.g. notes-on-ai), keep the page's default.
      if (item.tagline) {
        pairs.push(
          ['meta[name="description"]', item.tagline],
          ['meta[property="og:description"]', item.tagline],
          ['meta[name="twitter:description"]', item.tagline],
        )
      }
      for (const [selector, content] of pairs) {
        const el = document.head.querySelector<HTMLMetaElement>(selector)
        if (!el) continue
        const prev = el.content
        el.content = content
        restore.push(() => { el.content = prev })
      }
    } else {
      document.title = 'Not found — Pedro Coelho'
    }

    return () => {
      document.title = prevTitle
      restore.forEach((fn) => fn())
    }
  }, [item])

  if (!item) {
    return (
      <section className="detail-band" aria-label="Not found" ref={bandRef}>
        <div className="page-shell">
          <div className="detail-article detail-notfound" data-tone="neutral">
            <span className="detail-eyebrow">
              <span aria-hidden="true" className="detail-eyebrow-rule" />
              404
            </span>
            <h2 className="detail-title">not found</h2>
            <p className="detail-tagline">
              That entry doesn’t exist — it may have been renamed or moved. Head back
              to the works grid to keep exploring.
            </p>
            <Link className="detail-back" to="/">
              <span aria-hidden="true" className="detail-back-arrow">←</span>
              <span aria-hidden="true" className="detail-back-rule" />
              back to works
            </Link>
          </div>
        </div>
      </section>
    )
  }

  let globalBlockIndex = 0

  return (
    <section className="detail-band" aria-label={`${item.title} detail`} ref={bandRef}>
      <div className="page-shell">
        <article
          className="detail-article"
          data-tone={item.tone ?? 'neutral'}
          lang={item.lang === 'pt-br' ? 'pt-BR' : undefined}
        >
          <header className="detail-header">
            <span className="detail-eyebrow">
              <span aria-hidden="true" className="detail-eyebrow-rule" />
              {item.eyebrow}
            </span>

            <h2 className="detail-title" ref={headingRef} tabIndex={-1}>
              {item.title}
            </h2>
            {item.tagline ? (
              <p className="detail-tagline">{item.tagline}</p>
            ) : null}

            {item.links.length > 0 ? (
              <div className="detail-links">
                {item.links.map((link) => (
                  <a
                    key={link.label}
                    className="detail-link-item"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                    {link.lang === 'pt-br' ? (
                      <span className="detail-link-flag" title="Conteúdo em português (BR)">
                        <span aria-hidden="true" className="detail-link-flag-mark" />
                        pt-br
                      </span>
                    ) : null}
                    <span aria-hidden="true" className="detail-link-arrow">↗</span>
                  </a>
                ))}
              </div>
            ) : null}
          </header>

          {item.meta.length > 0 ? (
            <dl className="detail-spec">
              {item.meta.map((m) => (
                <div className="detail-spec-row" key={m.key}>
                  <dt className="detail-spec-key">{m.key}</dt>
                  <dd className="detail-spec-val">{m.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="detail-body">
            {item.sections.map((section, si) => (
              <section key={si} className="detail-section">
                {section.title ? (
                  <h3 className="detail-h2">{section.title}</h3>
                ) : null}
                {section.blocks.map((block, bi) => {
                  const isLead = globalBlockIndex === 0 && block.type === 'p'
                  globalBlockIndex++
                  return renderBlock(block, base, bi, isLead, setLightbox)
                })}
              </section>
            ))}
          </div>

          <footer className="detail-foot">
            <button className="detail-totop" onClick={scrollToTop} type="button">
              <span aria-hidden="true" className="detail-totop-rule" />
              back to top
              <span aria-hidden="true" className="detail-totop-arrow">↑</span>
            </button>
          </footer>
        </article>
      </div>

      {lightbox ? createPortal(
        <div
          className="detail-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt || 'Image preview'}
          onClick={() => setLightbox(null)}
        >
          <button
            className="detail-lightbox-close"
            onClick={() => setLightbox(null)}
            type="button"
            aria-label="Close preview"
          >
            ✕
          </button>
          <figure
            className="detail-lightbox-figure"
            onClick={(e) => e.stopPropagation()}
          >
            <img alt={lightbox.alt} src={lightbox.src} />
            {lightbox.alt ? (
              <figcaption className="detail-lightbox-caption">
                {lightbox.alt}
              </figcaption>
            ) : null}
          </figure>
        </div>,
        document.body,
      ) : null}
    </section>
  )
}

export default DetailSection
