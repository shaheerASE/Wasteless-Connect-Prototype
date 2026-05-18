import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-white font-semibold border-b-2 border-white pb-0.5'
      : 'text-green-200 hover:text-white transition-colors duration-150'

  return (
    <nav className="bg-green-800 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-y-2">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🥗</span>
          <span className="text-white font-bold text-lg tracking-tight">
            Wasteless Connect
          </span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/listings" className={linkClass}>
            Listings
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink
            to="/post"
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-1.5 rounded-full transition-colors duration-150 font-semibold text-sm"
          >
            + Post Food
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
