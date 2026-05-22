import { Link } from 'react-router-dom'
import Tag from './Tag'

type VisualCardProps = {
  description: string
  eyebrow?: string
  meta?: string[]
  title: string
  to?: string
  tone?: 'amber' | 'neutral' | 'red'
}

const toneClasses = {
  amber: 'border-amber/45 bg-amber/10',
  neutral: 'border-border bg-elevated',
  red: 'border-red/50 bg-red/10',
}

function VisualCard({
  description,
  eyebrow,
  meta = [],
  title,
  to,
  tone = 'neutral',
}: VisualCardProps) {
  const content = (
    <>
      <div className={`h-32 border ${toneClasses[tone]}`}>
        <div className="h-full bg-[linear-gradient(135deg,rgba(236,230,216,0.06)_0,transparent_35%),radial-gradient(circle_at_72%_38%,rgba(245,184,75,0.28),transparent_26%),radial-gradient(circle_at_24%_78%,rgba(229,72,77,0.22),transparent_24%)]" />
      </div>
      <div className="mt-5">
        {eyebrow ? <p className="font-mono text-xs text-amber">{eyebrow}</p> : null}
        <h3 className="mt-1 font-mono text-xl font-semibold text-primary-text">{title}</h3>
        <p className="mt-3 text-sm text-body-text">{description}</p>
      </div>
      {meta.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {meta.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      ) : null}
    </>
  )

  if (to) {
    return (
      <Link className="block border border-border bg-surface p-4 hover:border-red/70" to={to}>
        {content}
      </Link>
    )
  }

  return <article className="border border-border bg-surface p-4">{content}</article>
}

export default VisualCard
