import { Link } from 'react-router-dom'

type VisualCardProps = {
  activeSlug?: string
  avatar?: string
  description?: string
  eyebrow?: string
  index?: number
  lang?: 'pt-br'
  meta?: string[]
  title: string
  to?: string
  tone?: 'amber' | 'neutral' | 'pink' | 'red'
}

function VisualCard({ activeSlug, avatar, description, eyebrow, lang, meta, title, to, tone }: VisualCardProps) {
  const target = to ?? '/project/glhf'
  const isActive = Boolean(activeSlug) && target.endsWith(`/${activeSlug}`)
  const avatarSrc = avatar ? `${import.meta.env.BASE_URL}${avatar}` : undefined

  return (
    <Link
      aria-current={isActive ? 'true' : undefined}
      className={`specimen-card specimen-card--link${isActive ? ' is-active' : ''}`}
      data-tone={tone ?? 'neutral'}
      to={target}
    >
      <div aria-hidden="true" className="specimen-card-image" data-tone={tone ?? 'neutral'}>
        {avatarSrc ? <img alt="" loading="lazy" src={avatarSrc} /> : null}
      </div>
      <div className="specimen-card-info">
        {eyebrow ? (
          <div className="specimen-card-eyebrow-row">
            <span className="specimen-card-eyebrow">
              <span aria-hidden="true" className="specimen-card-eyebrow-dot" />
              {eyebrow}
            </span>
            {lang === 'pt-br' ? (
              <span className="specimen-card-lang" title="Conteúdo em português (BR)">
                <span aria-hidden="true" className="specimen-card-lang-mark" />
                pt-br
              </span>
            ) : null}
          </div>
        ) : null}
        <h3 className="specimen-card-title">{title}</h3>
        {description ? <p className="specimen-card-summary">{description}</p> : null}
        {meta && meta.length > 0 ? (
          <ul className="specimen-card-meta">
            {meta.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        ) : null}
      </div>
    </Link>
  )
}

export default VisualCard
