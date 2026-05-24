import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'home' },
  { to: '/project', label: 'project' },
  { to: '/code', label: 'code' },
  { to: '/text', label: 'text' },
]

function Header() {
  return (
    <header className="site-header">
      <div className="page-shell">
        <nav aria-label="Main navigation" className="poster-nav">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'poster-nav-link poster-nav-link--active' : 'poster-nav-link'
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
