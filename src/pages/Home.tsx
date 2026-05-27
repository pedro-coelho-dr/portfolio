import { Link } from 'react-router-dom'

import VisualCard from '../components/VisualCard'
import { code } from '../data/code'
import { projects } from '../data/projects'
import { texts } from '../data/texts'

function Home() {
  const cvHref = `${import.meta.env.BASE_URL}cv.pdf`

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-inner page-shell">
          <img
            alt="Pedro Coelho logo"
            className="home-hero-logo"
            src={`${import.meta.env.BASE_URL}logo.png`}
          />
          <h1 className="home-hero-title">pedro coelho</h1>
          <p className="home-hero-kicker">offsec · dev · ai</p>
          <p className="home-hero-bio">
            Computer Scientist and Cybersecurity specialist from CESAR School.
            Based in Recife, working at Tempest Security Intelligence,
            with interests in hacking, software engineering, and applied AI.
          </p>
          {/* TODO: replace cv.pdf with the final exported CV file once it is added to public/. */}
          <div className="home-hero-actions">
            <button
              aria-label="Open contact form"
              className="hero-action"
              onClick={() =>
                window.dispatchEvent(new CustomEvent('open-contact-form'))
              }
              type="button"
            >
              let's talk
              <svg
                aria-hidden="true"
                className="hero-action-icon"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9.6L5 20.5V5Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
                <path
                  d="M9 10.25h6M9 13h4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.6"
                />
              </svg>
            </button>
            <a aria-label="Download CV" className="hero-cv-btn" href={cvHref}>
              <svg
                aria-hidden="true"
                className="hero-cv-icon"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4v12m0 0 4.25-4.25M12 16l-4.25-4.25M5 19.5h14"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                />
              </svg>
              cv
            </a>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="page-shell">
          <header className="section-header">
            <Link className="section-name section-name--link" to="/project">
              project
            </Link>
          </header>
          <div className="card-grid">
            {projects.slice(0, 3).map((item) => (
              <VisualCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="page-shell">
          <header className="section-header">
            <Link className="section-name section-name--link" to="/code">
              code
            </Link>
          </header>
          <div className="card-grid">
            {code.slice(0, 3).map((item) => (
              <VisualCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="page-shell">
          <header className="section-header">
            <Link className="section-name section-name--link" to="/text">
              text
            </Link>
          </header>
          <div className="card-grid">
            {texts.slice(0, 3).map((item) => (
              <VisualCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
