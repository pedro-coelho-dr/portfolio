import { Link } from 'react-router-dom'

type VisualCardProps = {
  activeSlug?: string
  description?: string
  eyebrow?: string
  index?: number
  meta?: string[]
  title: string
  to?: string
  tone?: 'amber' | 'neutral' | 'pink' | 'red'
}

function VisualCard({ activeSlug, description, eyebrow, meta, title, to, tone }: VisualCardProps) {
  const target = to ?? '/project/glhf'
  const isActive = Boolean(activeSlug) && target.endsWith(`/${activeSlug}`)

  return (
    <Link
      aria-current={isActive ? 'true' : undefined}
      className={`specimen-card specimen-card--link${isActive ? ' is-active' : ''}`}
      data-tone={tone ?? 'neutral'}
      to={target}
    >
      <div aria-hidden="true" className="specimen-card-image" />
      <div className="specimen-card-info">
        {eyebrow ? (
          <span className="specimen-card-eyebrow">
            <span aria-hidden="true" className="specimen-card-eyebrow-dot" />
            {eyebrow}
          </span>
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
