import SolarBackground from '../components/SolarBackground'
import VisualCard from '../components/VisualCard'
import { code } from '../data/code'
import { projects } from '../data/projects'
import { texts } from '../data/texts'

function Home() {
  return (
    <>
      <section className="page-shell page-section">
        <div className="max-w-3xl">
          <p className="section-kicker">cybersecurity · dev · applied AI</p>
          <h1 className="mt-4 font-mono text-4xl font-semibold text-primary-text">
            Pedro Coelho
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-body-text">
            Portfolio of security labs, code experiments, and technical notes.
          </p>
        </div>
        <div className="visual-field">
          <SolarBackground />
        </div>
      </section>

      <section className="page-shell page-section">
        <p className="section-kicker">project</p>
        <h2 className="section-title">Security labs and tooling artifacts.</h2>
        <div className="card-grid">
          {projects.slice(0, 3).map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="page-shell page-section">
        <p className="section-kicker">code</p>
        <h2 className="section-title">Experiments, scripts, and prototypes.</h2>
        <div className="card-grid">
          {code.slice(0, 3).map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="page-shell page-section">
        <p className="section-kicker">text</p>
        <h2 className="section-title">Reports, notes, and technical writeups.</h2>
        <div className="card-grid">
          {texts.slice(0, 3).map((item) => (
            <VisualCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
