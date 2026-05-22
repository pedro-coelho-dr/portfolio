import SolarBackground from './SolarBackground'

function LetsTalk() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="page-shell grid gap-6 py-12 lg:grid-cols-[1fr_18rem] lg:items-stretch">
        <div>
          <p className="section-kicker">let's talk</p>
          <h2 className="section-title">Security work, prototypes, and technical writing.</h2>
          <p className="section-copy">
            Open to focused collaborations around defensive tooling, lab design, applied AI,
            and clear technical documentation.
          </p>
          <a
            className="mt-6 inline-flex border border-red px-4 py-2 font-mono text-sm text-red hover:bg-red/10"
            href="mailto:hello@pedrocoelho.io"
          >
            Email
          </a>
        </div>
        <SolarBackground className="hidden lg:block" compact />
      </div>
    </section>
  )
}

export default LetsTalk
