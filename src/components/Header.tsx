import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'home' },
  { to: '/project', label: 'project' },
  { to: '/code', label: 'code' },
  { to: '/text', label: 'text' },
]

function Header() {
  return (
    <header className="border-b border-border bg-background/90">
      <div className="page-shell flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <a className="font-mono text-sm text-primary-text" href="#top">
          pedrocoelho.io
        </a>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-4 font-mono text-sm">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'text-red' : 'text-muted-text hover:text-primary-text'
              }
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
