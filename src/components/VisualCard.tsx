import { Link } from 'react-router-dom'

type VisualCardProps = {
  description?: string
  eyebrow?: string
  index?: number
  meta?: string[]
  title: string
  to?: string
  tone?: 'amber' | 'neutral' | 'red'
}

function VisualCard({ description, eyebrow, title, to }: VisualCardProps) {
  // Placeholder behavior: every card falls through to /project/glhf as the template
  // detail page until individual routes exist. Explicit `to` props still win.
  const target = to ?? '/project/glhf'

  return (
    <Link className="specimen-card specimen-card--link" to={target}>
      <div aria-hidden="true" className="specimen-card-image" />
      <div className="specimen-card-info">
        {eyebrow ? <span className="specimen-card-eyebrow">{eyebrow}</span> : null}
        <h3 className="specimen-card-title">{title}</h3>
        {description ? <p className="specimen-card-summary">{description}</p> : null}
      </div>
    </Link>
  )
}

export default VisualCard
