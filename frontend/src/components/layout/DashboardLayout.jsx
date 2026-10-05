import { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { 
  LayoutDashboard, 
  Paintbrush, 
  FileImage, 
  BookOpen, 
  TrendingUp, 
  Users, 
  FolderHeart, 
  Type, 
  LogOut, 
  Menu, 
  X,
  Sun,
  Moon,
  Sparkles,
  Compass,
  User,
  GraduationCap,
  Crown
} from 'lucide-react'

export default function DashboardLayout() {
  const { user, logout, switchRole } = useAuth()
  const { theme, toggle } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const role = user?.role || 'learner'

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Learning Paths', path: '/courses', icon: Compass },
    { name: 'Practice Lab', path: '/practice', icon: BookOpen },
    { name: 'Design Canvas', path: '/canvas', icon: Paintbrush },
    { name: 'Progress & AI', path: '/progress', icon: TrendingUp },
    { name: 'Community Gallery', path: '/community', icon: Users },
    { name: 'My Portfolio', path: '/portfolio', icon: FolderHeart },
    { name: 'Templates', path: '/templates', icon: FileImage },
    { name: 'Font Preview', path: '/fonts', icon: Type },
    { name: 'My Profile', path: '/profile', icon: User },
  ]

  // Role-specific items
  if (role === 'mentor' || role === 'admin') {
    menuItems.splice(4, 0, { name: 'Mentor Studio', path: '/mentor', icon: GraduationCap, badge: 'Mentor' })
  }
  if (role === 'admin') {
    menuItems.splice(5, 0, { name: 'Admin Console', path: '/admin', icon: Crown, badge: 'Admin' })
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleRoleToggle = async () => {
    const nextRole = role === 'learner' ? 'mentor' : role === 'mentor' ? 'admin' : 'learner'
    await switchRole(nextRole)
    toast.success(`Active mode switched to ${nextRole.toUpperCase()}`)
  }

  const isActive = (path) => location.pathname === path

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-neutral-950 text-neutral-100 border-r border-amber-900/30">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-amber-900/20">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-gold shadow-gold">
          <Sparkles className="w-5 h-5 text-neutral-950" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-wider text-amber-500 font-display">CalliVerse</h1>
          <span className="text-[10px] text-amber-600/70 tracking-widest uppercase font-mono">AI EdTech Platform</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive(item.path) ? 'text-amber-400' : 'text-neutral-400'}`} />
                <span className="text-xs font-medium">{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono uppercase bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Actions */}
      <div className="p-4 border-t border-amber-900/20 space-y-3">
        {/* User Card */}
        {user && (
          <div className="p-3 rounded-xl bg-neutral-900/70 border border-amber-900/20 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-amber-500/30 flex items-center justify-center bg-amber-500/10 text-amber-400 font-bold text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate text-neutral-200">{user.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[9px] uppercase font-mono px-1.5 py-0.2 rounded font-semibold ${
                    role === 'admin' ? 'bg-rose-500/20 text-rose-300' :
                    role === 'mentor' ? 'bg-purple-500/20 text-purple-300' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {role}
                  </span>
                  <span className="text-[10px] text-neutral-500 capitalize">• {user.skillLevel || 'Beginner'}</span>
                </div>
              </div>
            </div>

            {/* Quick Role Switcher Pill */}
            <button
              type="button"
              onClick={handleRoleToggle}
              className="w-full py-1 px-2 rounded-lg bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-400 hover:text-amber-400 hover:border-amber-500/30 flex items-center justify-between transition-colors"
              title="Click to cycle role for demoing: Learner → Mentor → Admin"
            >
              <span>Demo Role Switcher</span>
              <span className="text-amber-500 font-mono font-bold">⇄ {role.toUpperCase()}</span>
            </button>
          </div>
        )}

        <div className="flex gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="flex-1 flex items-center justify-center p-3 rounded-xl hover:bg-neutral-900 text-neutral-400 hover:text-neutral-100 border border-neutral-900 transition-all duration-300"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center p-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 text-neutral-400 border border-neutral-900 hover:border-red-500/20 transition-all duration-300"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Nav Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-950 border-b border-amber-900/20 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-gold">
            <Sparkles className="w-4 h-4 text-neutral-950" />
          </div>
          <h1 className="text-lg font-semibold tracking-wider text-amber-500 font-display">CalliVerse</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-100"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-100"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 h-full animate-fade-in">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 pt-16 md:pt-0 min-h-screen flex flex-col bg-neutral-950/90 ink-bg">
        <div className="flex-1 p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
