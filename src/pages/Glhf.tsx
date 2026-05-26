const challengeMap = ['Lobby', 'User', 'Direct', 'Board', 'Root']

const vulnerabilityClasses = [
  'enumeration',
  'brute-force weakness',
  'session / cookie flaws',
  'IDOR',
  'unrestricted upload',
  'XSS',
  'CSRF',
  'SQL injection',
]

function Glhf() {
  return (
    <section className="section-band">
      <div className="page-shell">
        <header className="page-header">
          <h1 className="page-header-title">glhf</h1>
          <p className="page-header-tagline">
            Deliberately vulnerable Flask lab for practicing web exploitation.
          </p>
        </header>

        <dl className="spec-list">
          <div className="spec-row">
            <dt className="spec-key">stack</dt>
            <dd className="spec-value">flask · python · docker</dd>
          </div>
          <div className="spec-row">
            <dt className="spec-key">type</dt>
            <dd className="spec-value">vulnerable lab</dd>
          </div>
          <div className="spec-row">
            <dt className="spec-key">version</dt>
            <dd className="spec-value">v0.1-beta</dd>
          </div>
        </dl>

        <section className="spec-section">
          <h2 className="spec-section-title">
            <span className="spec-section-marker">//</span>challenge map
          </h2>
          <p className="spec-section-flow">{challengeMap.join(' → ')}</p>
        </section>

        <section className="spec-section">
          <h2 className="spec-section-title">
            <span className="spec-section-marker">//</span>vulnerability classes
          </h2>
          <p className="spec-section-list">{vulnerabilityClasses.join(' / ')}</p>
        </section>

        <p className="spec-prose">
          GLHF is framed as a controlled lab artifact: intentionally weak surfaces, concise
          documentation, and short challenge progression for practicing recognition and
          reporting.
        </p>
      </div>
    </section>
  )
}

export default Glhf
