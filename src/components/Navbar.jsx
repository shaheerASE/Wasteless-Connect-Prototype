import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const desktopLink = ({ isActive }) =>
    isActive
      ? 'text-white font-semibold border-b-2 border-white pb-0.5'
      : 'text-green-200 hover:text-white transition-colors duration-150'

  const mobileLink = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
      isActive ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-700'
    }`

  return (
    <nav className="bg-green-800 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={close}>
            <span className="text-2xl">🥗</span>
            <span className="text-white font-bold text-lg tracking-tight">
              Wasteless Connect
            </span>
          </Link>

          {/* Desktop links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-5 text-sm font-medium">
            <NavLink to="/" end className={desktopLink}>Home</NavLink>
            <NavLink to="/listings" className={desktopLink}>Listings</NavLink>
            <NavLink to="/dashboard" className={desktopLink}>Dashboard</NavLink>
            <NavLink to="/about" className={desktopLink}>About</NavLink>
            <NavLink
              to="/post"
              className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-full font-semibold transition-colors duration-150"
            >
              + Post Food
            </NavLink>
          </div>

          {/* Hamburger button — visible only on mobile */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-green-200 hover:text-white hover:bg-green-700 active:bg-green-600 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {open && (
          <div className="md:hidden border-t border-green-700 pt-2 pb-4 flex flex-col gap-1">
            <NavLink to="/" end className={mobileLink} onClick={close}>
              <span>🏠</span> Home
            </NavLink>
            <NavLink to="/listings" className={mobileLink} onClick={close}>
              <span>📋</span> Listings
            </NavLink>
            <NavLink to="/dashboard" className={mobileLink} onClick={close}>
              <span>📊</span> Dashboard
            </NavLink>
            <NavLink to="/about" className={mobileLink} onClick={close}>
              <span>ℹ️</span> About
            </NavLink>
            <div className="px-4 pt-2">
              <NavLink
                to="/post"
                className="block text-center bg-green-500 hover:bg-green-400 active:bg-green-600 text-white py-3.5 rounded-xl font-bold text-sm transition-colors"
                onClick={close}
              >
                + Post Surplus Food
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
