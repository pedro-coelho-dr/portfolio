import VisualCard from '../components/VisualCard'
import { texts } from '../data/texts'

function Text() {
  return (
    <section className="section-band">
      <div className="page-shell">
        <header className="section-header">
          <h1 className="section-name">text</h1>
        </header>
        <div className="card-grid">
          {texts.map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Text
