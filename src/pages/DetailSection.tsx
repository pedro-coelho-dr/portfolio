import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { detailMap, type Block } from '../data/detail'

function scrollToTop() {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'auto' : 'smooth' })
}

function renderBlock(block: Block, base: string, key: number, isLead: boolean) {
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
          <img alt={block.alt ?? ''} loading="lazy" src={src} />
          {block.caption ? (
            <figcaption className="detail-caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      )
    }
    case 'video': {
      const src = block.external ? block.src : `${base}${block.src}`
      return (
        <figure key={key} className="detail-video">
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
                <img alt={img.alt ?? ''} loading="lazy" src={src} />
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
  const base = import.meta.env.BASE_URL
  const item = slug ? detailMap[slug] : undefined

  // Move keyboard focus to the detail heading when it opens, so screen-reader
  // and keyboard users land on the freshly revealed content.
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    headingRef.current?.focus()
  }, [slug])

  // Reflect the open entry in the document title; restore the default on close.
  useEffect(() => {
    if (!item) return
    document.title = `${item.title} — Pedro Coelho`
    return () => {
      document.title = 'Pedro Coelho — offsec · dev · ai'
    }
  }, [item])

  if (!item) {
    return (
      <section className="detail-band" aria-label="Detail">
        <div className="page-shell">
          <p className="detail-p">Entry not found.</p>
        </div>
      </section>
    )
  }

  let globalBlockIndex = 0

  return (
    <section className="detail-band" aria-label={`${item.title} detail`}>
      <div className="page-shell">
        <article className="detail-article" data-tone={item.tone ?? 'neutral'}>
          <header className="detail-header">
            <span className="detail-eyebrow">
              <span aria-hidden="true" className="detail-eyebrow-rule" />
              {item.eyebrow}
            </span>

            <h1 className="detail-title" ref={headingRef} tabIndex={-1}>
              {item.title}
            </h1>
            <p className="detail-tagline">{item.tagline}</p>

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
                  <h2 className="detail-h2">{section.title}</h2>
                ) : null}
                {section.blocks.map((block, bi) => {
                  const isLead = globalBlockIndex === 0 && block.type === 'p'
                  globalBlockIndex++
                  return renderBlock(block, base, bi, isLead)
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
    </section>
  )
}

export default DetailSection
