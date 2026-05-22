import VisualCard from '../components/VisualCard'
import { texts } from '../data/texts'

function Text() {
  return (
    <section className="page-shell page-section">
      <h1 className="font-mono text-4xl font-semibold text-primary-text">text</h1>
      <p className="section-copy">
        Reports, notes, and technical writeups from coursework and lab experiments.
      </p>
      <div className="card-grid">
        {texts.map((item) => (
          <VisualCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}

export default Text
