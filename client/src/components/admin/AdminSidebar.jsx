import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
  { name: 'Works', path: '/admin/works', icon: '🧵' },
]

function AdminSidebar({ onNavigate }) {
  return (
    <div className="h-full flex flex-col bg-primary text-cream">
      <div className="px-6 py-6 border-b border-cream/10">
        <span className="font-heading text-xl font-semibold">
          Saree<span className="text-accent">Pleating</span>
        </span>
        <p className="text-xs text-cream/50 mt-0.5 tracking-wide">Admin Panel</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent text-primary-dark'
                  : 'text-cream/70 hover:bg-cream/10 hover:text-cream'
              }`
            }
          >
            <span>{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-cream/10">
        <p className="text-xs text-cream/40">v1.0 · Paru Pleating</p>
      </div>
    </div>
  )
}

export default AdminSidebar