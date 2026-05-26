import VisualCard from '../components/VisualCard'
import { projects } from '../data/projects'

function Project() {
  return (
    <section className="section-band">
      <div className="page-shell">
        <header className="section-header">
          <h1 className="section-name">project</h1>
        </header>
        <div className="card-grid-four">
          {projects.map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Project
