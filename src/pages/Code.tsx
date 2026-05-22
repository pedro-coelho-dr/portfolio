import VisualCard from '../components/VisualCard'
import { code } from '../data/code'

function Code() {
  return (
    <section className="page-shell page-section">
      <h1 className="font-mono text-4xl font-semibold text-primary-text">code</h1>
      <p className="section-copy">
        Small experiments, scripts, data pipelines, and applied ML prototypes.
      </p>
      <div className="card-grid-four">
        {code.map((item) => (
          <VisualCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}

export default Code
