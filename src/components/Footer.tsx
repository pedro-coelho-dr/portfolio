function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="page-shell flex flex-col gap-4 py-7 font-mono text-sm text-muted-text sm:flex-row sm:items-center sm:justify-between">
        <p>pedrocoelho.io · 2026</p>
        <nav aria-label="Footer links" className="flex flex-wrap gap-4">
          <a className="hover:text-primary-text" href="https://github.com/pedrocoelho">
            GitHub
          </a>
          <a className="hover:text-primary-text" href="https://www.linkedin.com/in/pedrocoelho/">
            LinkedIn
          </a>
          <a className="hover:text-primary-text" href="mailto:hello@pedrocoelho.io">
            Email
          </a>
          <a className="hover:text-primary-text" href="#top">
            back to top
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
