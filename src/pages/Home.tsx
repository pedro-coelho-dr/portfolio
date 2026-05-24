import VisualCard from '../components/VisualCard'
import { code } from '../data/code'
import { projects } from '../data/projects'
import { texts } from '../data/texts'

function Home() {
  return (
    <>
      <section className="home-hero page-shell">
        <div className="home-hero-inner">
          <h1 className="home-hero-title">pedro coelho</h1>
          <p className="home-hero-kicker">cybersecurity · dev · applied AI</p>
          <div className="home-whoami">
            <p>
              Recife-based CS student building security labs, tooling experiments, and
              technical artifacts around cybersecurity and applied AI.
            </p>
          </div>
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
