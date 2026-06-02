import { Link, useParams } from 'react-router-dom'
import { detailMap, type Block } from '../data/detail'

function renderBlock(block: Block, base: string, key: number, isLead: boolean, showImages: boolean) {
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
      if (!showImages) return null
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
    case 'imgs': {
      if (!showImages) return null
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

function DetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const base = import.meta.env.BASE_URL
  const item = slug ? detailMap[slug] : undefined
  const showImages = slug === 'glhf'

  if (!item) {
    return (
      <div className="detail-page">
        <div className="page-shell">
          <Link className="page-back-link" to="/">← back</Link>
          <p className="detail-p">Page not found.</p>
        </div>
      </div>
    )
  }

  let globalBlockIndex = 0

  return (
    <div className="detail-page">
      <div className="page-shell">
        <Link className="page-back-link" to={`/#${item.category}`}>
          ← back
        </Link>

        <article className="detail-article" data-tone={item.tone ?? 'neutral'}>
          <header className="detail-header">
            <div className="detail-header-top">
              <span className="detail-eyebrow">
                <span aria-hidden="true" className="detail-eyebrow-dot" />
                {item.eyebrow}
              </span>
              <ul className="detail-meta-chips">
                {item.meta.map((m) => (
                  <li key={m.key}>{m.value}</li>
                ))}
              </ul>
            </div>

            <h1 className="detail-title">{item.title}</h1>
            <p className="detail-tagline">{item.tagline}</p>

            {item.links.length > 0 ? (
              <div className="detail-links-bar">
                {item.links.map((link) => (
                  <a
                    key={link.label}
                    className="detail-link-item"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                    <span aria-hidden="true" className="detail-link-arrow">↗</span>
                  </a>
                ))}
              </div>
            ) : null}
          </header>

          <div className="detail-body">
            {item.sections.map((section, si) => (
              <section key={si} className="detail-section">
                {section.title ? (
                  <h2 className="detail-h2">{section.title}</h2>
                ) : null}
                {section.blocks.map((block, bi) => {
                  const isLead = globalBlockIndex === 0 && block.type === 'p'
                  globalBlockIndex++
                  return renderBlock(block, base, bi, isLead, showImages)
                })}
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

export default DetailPage
