import { Suspense, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom'

import HeroWeb from '../components/HeroWeb'
import VisualCard from '../components/VisualCard'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_WHATSAPP } from '../data/contact'
import { code } from '../data/code'
import { projects } from '../data/projects'
import { texts } from '../data/texts'

const FEATURE_FRAMES = 4
const FEATURE_INTERVAL_MS = 4500

const TABS = ['project', 'code', 'text'] as const
type Tab = (typeof TABS)[number]

function tabFromHash(hash: string): Tab {
  const slug = hash.replace(/^#/, '')
  return (TABS as readonly string[]).includes(slug) ? (slug as Tab) : 'project'
}

function Home() {
  const cvHref = `${import.meta.env.BASE_URL}cv.pdf`
  const base = import.meta.env.BASE_URL
  const featured = projects[0]
  const featuredHref = featured.to ?? '/project/glhf'

  const location = useLocation()
  const navigate = useNavigate()

  // A detail view (project/code/text) is rendered through <Outlet/> as a nested
  // route. When one is open we derive the active tab from its category so the
  // grid above the detail stays in sync.
  const detailMatch = useMatch('/:category/:slug')
  const detailCategory = detailMatch?.params.category
  const activeSlug = detailMatch?.params.slug

  // The active tab is fully derived from the URL: an open detail dictates its
  // category, otherwise the hash. No local state needed.
  const tab: Tab =
    detailCategory && (TABS as readonly string[]).includes(detailCategory)
      ? (detailCategory as Tab)
      : tabFromHash(location.hash)

  function selectTab(next: Tab) {
    if (next === tab) return
    // Switching tabs always returns to the grid (closes any open detail).
    navigate({ pathname: '/', hash: `#${next}` })
  }

  // Roving-focus keyboard support for the tablist (ARIA tabs pattern): arrow
  // keys move and activate the adjacent tab, Home/End jump to the ends.
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  function onTabKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const i = TABS.indexOf(tab)
    let next: number | null = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % TABS.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + TABS.length) % TABS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = TABS.length - 1
    if (next === null) return
    e.preventDefault()
    selectTab(TABS[next])
    tabRefs.current[next]?.focus()
  }

  const sectionRef = useRef<HTMLElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const worksRef = useRef<HTMLDivElement>(null)

  // Reveal-once on scroll via IntersectionObserver — cross-browser and never
  // leaves content stranded at opacity:0 (replaces the Chromium-only
  // animation-timeline:view() approach). Re-runs per tab so freshly shown
  // panels animate in; honours prefers-reduced-motion (CSS shows them statically).
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const root = worksRef.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Mark via a data attribute, not a class: React owns className and
            // rewrites it on any re-render (hover→paused, detail open→is-active),
            // which would wipe an imperatively-added class. React leaves
            // attributes it didn't set in JSX alone, so this survives re-renders.
            entry.target.setAttribute('data-revealed', '')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    root.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [tab])

  // On first mount, if a tab hash is present scroll to the works section
  useEffect(() => {
    const hash = location.hash.replace(/^#/, '')
    if ((TABS as readonly string[]).includes(hash) && !activeSlug && sectionRef.current) {
      const el = sectionRef.current
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Smooth-scroll to the detail when it opens (or switches), and back to the
  // works grid when it closes — the page feels like one continuous surface.
  const prevSlug = useRef<string | undefined>(undefined)
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth'
    if (activeSlug && activeSlug !== prevSlug.current) {
      const el = detailRef.current
      if (el) setTimeout(() => el.scrollIntoView({ behavior, block: 'start' }), 60)
    } else if (!activeSlug && prevSlug.current) {
      sectionRef.current?.scrollIntoView({ behavior, block: 'start' })
    }
    prevSlug.current = activeSlug
  }, [activeSlug])

  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (tab !== 'project') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(
      () => setActive((i) => (i + 1) % FEATURE_FRAMES),
      FEATURE_INTERVAL_MS,
    )
    return () => window.clearInterval(t)
  }, [paused, tab])

  return (
    <>
      <section className="home-hero">
        <HeroWeb />
        <div className="home-hero-inner page-shell">
          <img
            alt="Pedro Coelho logo"
            className="home-hero-logo"
            src={`${import.meta.env.BASE_URL}img/logo.png`}
          />
          <h1 className="home-hero-title">pedro coelho</h1>
          <p className="home-hero-kicker">offsec · dev · ai</p>
          <p className="home-hero-bio-lead">
            Cybersecurity specialist and Computer Scientist from CESAR School,
            currently working at Tempest Security Intelligence.
          </p>
          {expanded ? (
            <div className="hero-bio-expanded">
              <p className="home-hero-bio">
                Focused on offensive security and security research across diverse
                environments, with a strong interest in turning security knowledge
                into software, tools, and working systems. Increasingly oriented
                toward applied AI, including autonomous agents, large language
                models, and AI Red Teaming.
              </p>
              <p className="home-hero-bio">
                Brings a multidisciplinary background in film and the public sector,
                combining systems thinking, communication, and an ability to approach
                technical problems from unexpected angles.
              </p>
            </div>
          ) : null}
          <button
            className={`hero-more-btn${expanded ? ' is-expanded' : ''}`}
            onClick={() => setExpanded(v => !v)}
            type="button"
          >
            <span aria-hidden="true" className="hero-more-rule" />
            {expanded ? 'less' : 'more'}
          </button>
          <div className="home-hero-actions">
            <div className="hero-actions-row">
              <a aria-label="Download CV" className="hero-cv-link" download href={cvHref}>
                cv
                <span aria-hidden="true">↓</span>
              </a>
              <a
                aria-label="LinkedIn"
                className="hero-icon-link"
                href="https://www.linkedin.com/in/pedro-coelho-dr"
                rel="noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" className="hero-icon-svg" viewBox="0 0 24 24">
                  <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56c0-1.02-.77-1.84-1.91-1.84-1.13 0-1.9.82-1.9 1.84 0 1 .75 1.82 1.86 1.84h.02c1.15 0 1.93-.84 1.93-1.84ZM20.44 13.05c0-3.39-1.77-4.97-4.13-4.97-1.9 0-2.75 1.07-3.23 1.82V8.5H9.7c.04.92 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.9-1.38 1.95-1.38 1.38 0 1.93 1.06 1.93 2.61V20h3.38v-6.95Z" fill="currentColor" />
                </svg>
              </a>
              <a
                aria-label="GitHub"
                className="hero-icon-link"
                href="https://github.com/pedro-coelho-dr"
                rel="noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" className="hero-icon-svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.595 2 12.262c0 4.534 2.865 8.38 6.839 9.737.5.095.682-.223.682-.495 0-.244-.009-.89-.014-1.747-2.782.616-3.369-1.387-3.369-1.387-.455-1.19-1.11-1.507-1.11-1.507-.907-.638.069-.626.069-.626 1.002.072 1.529 1.058 1.529 1.058.891 1.562 2.336 1.111 2.905.849.091-.664.349-1.111.635-1.367-2.221-.261-4.555-1.14-4.555-5.074 0-1.121.39-2.038 1.029-2.756-.103-.261-.446-1.312.098-2.735 0 0 .84-.276 2.75 1.053A9.33 9.33 0 0 1 12 6.836c.85.004 1.705.118 2.504.346 1.909-1.329 2.748-1.053 2.748-1.053.546 1.423.202 2.474.1 2.735.64.718 1.028 1.635 1.028 2.756 0 3.944-2.338 4.81-4.566 5.066.359.319.679.948.679 1.911 0 1.38-.012 2.492-.012 2.83 0 .274.18.594.688.493C19.138 20.639 22 16.794 22 12.262 22 6.595 17.523 2 12 2Z" fill="currentColor" />
                </svg>
              </a>
              <a aria-label="Email" className="hero-icon-link" href={`mailto:${CONTACT_EMAIL}`}>
                <svg aria-hidden="true" className="hero-icon-svg" viewBox="0 0 24 24">
                  <path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Zm1.93-.25L12 11.56l7.07-5.06H4.93Zm14.57 1.83-6.99 5a.9.9 0 0 1-1.02 0l-6.99-5v8.92c0 .14.11.25.25.25h14.5a.25.25 0 0 0 .25-.25V8.33Z" fill="currentColor" />
                </svg>
              </a>
              <a
                aria-label="WhatsApp"
                className="hero-icon-link"
                href={`https://wa.me/${CONTACT_WHATSAPP}`}
                rel="noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" className="hero-icon-svg" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor" />
                </svg>
              </a>
              <a aria-label="Phone" className="hero-icon-link" href={`tel:${CONTACT_PHONE}`}>
                <svg aria-hidden="true" className="hero-icon-svg" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band" ref={sectionRef}>
        <div className="page-shell" ref={worksRef}>
          <h2 className="sr-only" id="works-heading">Selected works</h2>
          <div
            aria-labelledby="works-heading"
            className="tab-bar"
            onKeyDown={onTabKeyDown}
            role="tablist"
            style={{
              ['--tab-index' as string]: TABS.indexOf(tab),
              ['--tab-color' as string]: tab === 'project' ? '#e5484d' : tab === 'code' ? '#f5d547' : '#ff4f9a',
            } as React.CSSProperties}
          >
            {TABS.map((t, i) => (
              <button
                aria-controls={`tab-panel-${t}`}
                aria-selected={t === tab}
                className={`tab-bar-btn${t === tab ? ' tab-bar-btn--active' : ''}`}
                id={`tab-${t}`}
                key={t}
                onClick={() => selectTab(t)}
                ref={(el) => { tabRefs.current[i] = el }}
                role="tab"
                tabIndex={t === tab ? 0 : -1}
                type="button"
              >
                {t}
              </button>
            ))}
          </div>

          {/* All three panels render so each tab's aria-controls resolves to a
              real element; inactive panels are hidden. The reveal animation
              replays whenever a panel un-hides (display none → block). */}
          <div
            aria-labelledby="tab-project"
            className="tab-panel"
            hidden={tab !== 'project'}
            id="tab-panel-project"
            role="tabpanel"
          >
            <article
              className={`home-feature reveal${paused ? ' is-paused' : ''}${activeSlug && featuredHref.endsWith(`/${activeSlug}`) ? ' is-active' : ''}`}
              data-tone={featured.tone ?? 'neutral'}
              onBlur={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <Link
                aria-labelledby="home-feature-title"
                className="home-feature__link"
                to={featuredHref}
              />
              <div className="home-feature__stage">
                <div className="home-feature__frames">
                  {Array.from({ length: FEATURE_FRAMES }, (_, i) => {
                    const id = String(i + 1).padStart(2, '0')
                    return (
                      <div
                        aria-hidden={i !== active}
                        className={`home-feature__frame${i === active ? ' is-active' : ''}`}
                        key={i}
                        style={{ backgroundImage: `url(${base}img/glhf/${id}.png)` }}
                      />
                    )
                  })}
                </div>
                <div
                  aria-label="Screenshot"
                  className="home-feature__dots"
                  role="group"
                >
                  {Array.from({ length: FEATURE_FRAMES }, (_, i) => (
                    <button
                      aria-label={`Show screenshot ${i + 1}`}
                      aria-pressed={i === active}
                      className={`home-feature__dot${i === active ? ' is-active' : ''}`}
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setActive(i) }}
                      type="button"
                    >
                      <span aria-hidden="true" className="home-feature__dot-fill" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="home-feature__info">
                <span className="home-feature__eyebrow">
                  <span aria-hidden="true" className="home-feature__eyebrow-dot" />
                  {featured.eyebrow}
                </span>
                <h3 className="home-feature__title" id="home-feature-title">{featured.title}</h3>
                <p className="home-feature__summary">{featured.description}</p>
                <ul className="home-feature__meta">
                  {featured.meta.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>

            {projects.length > 1 ? (
              <div className="card-grid tab-panel__grid-spacer">
                {projects.slice(1).map((item) => (
                  <VisualCard key={item.title} activeSlug={activeSlug} {...item} />
                ))}
              </div>
            ) : null}
          </div>

          <div
            aria-labelledby="tab-code"
            className="tab-panel"
            hidden={tab !== 'code'}
            id="tab-panel-code"
            role="tabpanel"
          >
            <div className="card-grid">
              {code.map((item) => (
                <VisualCard key={item.title} activeSlug={activeSlug} {...item} />
              ))}
            </div>
          </div>

          <div
            aria-labelledby="tab-text"
            className="tab-panel"
            hidden={tab !== 'text'}
            id="tab-panel-text"
            role="tabpanel"
          >
            <div className="card-grid">
              {texts.map((item) => (
                <VisualCard key={item.title} activeSlug={activeSlug} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div ref={detailRef}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </>
  )
}

export default Home
