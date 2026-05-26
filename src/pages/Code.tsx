import VisualCard from '../components/VisualCard'
import { code } from '../data/code'

function Code() {
  return (
    <section className="section-band">
      <div className="page-shell">
        <header className="section-header">
          <h1 className="section-name">code</h1>
        </header>
        <div className="card-grid-four">
          {code.map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Code
