import SolarBackground from '../components/SolarBackground'
import Tag from '../components/Tag'

const metadata = ['Flask', 'Python', 'Docker', 'vulnerable lab', 'v0.1-beta']

const challengeMap = ['Lobby', 'User', 'Direct', 'Board', 'Root']

const vulnerabilityClasses = [
  'enumeration',
  'brute-force weakness',
  'session/cookie flaws',
  'IDOR',
  'unrestricted upload',
  'XSS',
  'CSRF',
  'SQL injection',
]

function Glhf() {
  return (
    <section className="page-shell page-section">
      <div className="max-w-3xl">
        <p className="section-kicker">project artifact</p>
        <h1 className="mt-2 font-mono text-4xl font-semibold text-primary-text">GLHF</h1>
        <p className="mt-4 text-lg text-body-text">
          Deliberately vulnerable Flask lab for practicing web exploitation.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {metadata.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </div>

      <div className="visual-field">
        <SolarBackground />
      </div>

      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <section>
          <h2 className="font-mono text-2xl font-semibold text-primary-text">challenge map</h2>
          <p className="mt-4 font-mono text-sm text-body-text">
            {challengeMap.map((item, index) =>
              index === challengeMap.length - 1 ? item : `${item} → `,
            )}
          </p>
        </section>

        <section>
          <h2 className="font-mono text-2xl font-semibold text-primary-text">
            vulnerability classes
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {vulnerabilityClasses.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </section>
      </div>

      <p className="max-w-3xl text-body-text">
        GLHF is framed as a controlled lab artifact: intentionally weak surfaces, concise
        documentation, and short challenge progression for practicing recognition and reporting.
      </p>
    </section>
  )
}

export default Glhf
