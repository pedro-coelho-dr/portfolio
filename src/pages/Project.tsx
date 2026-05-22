import VisualCard from '../components/VisualCard'
import { projects } from '../data/projects'

function Project() {
  return (
    <section className="page-shell page-section">
      <h1 className="font-mono text-4xl font-semibold text-primary-text">project</h1>
      <p className="section-copy">Security labs, vulnerable apps, and tooling experiments.</p>
      <div className="card-grid-four">
        {projects.map((item) => (
          <VisualCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}

export default Project
