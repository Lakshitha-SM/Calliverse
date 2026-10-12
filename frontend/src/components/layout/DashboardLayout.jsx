import { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  Home,
  BookOpen,
  PenTool,
  Trophy,
  Activity,
  GraduationCap,
  Sparkles,
  Image as ImageIcon,
  FolderOpen,
  Award,
  User,
  LogOut, 
  Menu,
  Search,
  Flame,
  ArrowUpRight,
  ArrowRightLeft,
  Bell,
  MessageSquare
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function DashboardLayout() {
  const { user, logout, switchRole } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const role = user?.role || 'learner'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleRoleToggle = async () => {
    const nextRole = role === 'learner' ? 'mentor' : role === 'mentor' ? 'admin' : 'learner'
    await switchRole(nextRole)
    toast.success(`Active mode switched to ${nextRole.toUpperCase()}`)
  }

  const isActive = (path) => location.pathname === path

  const NavItem = ({ path, icon: Icon, label, badge, badgeColor = 'terracotta' }) => {
    const active = isActive(path)
    return (
      <Link
        to={path}
        onClick={() => setMobileOpen(false)}
        className={`group relative flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 text-[13px] font-sans ${
          active
            ? 'bg-[rgba(168,93,85,0.12)] border border-[rgba(168,93,85,0.35)] text-[#F6F0E6]'
            : 'text-[#C4B5A5] border border-transparent hover:bg-[rgba(255,255,255,0.045)] hover:text-[#FAF6F0] hover:translate-x-[2px]'
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Subtle active ink mark */}
          {active && (
            <span className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-1 h-3.5 bg-[#A85D55] rounded-r-md opacity-80" />
          )}
          <Icon className={`w-[17px] h-[17px] stroke-[1.5] transition-colors ${active ? 'text-[#C8796E]' : 'text-[#8E7360] group-hover:text-[#A85D55]'}`} />
          <span className="font-medium tracking-wide">{label}</span>
        </div>
        {badge && (
          <span className={`text-[9px] uppercase tracking-wider font-mono font-bold px-1.5 py-0.5 rounded border ${
            badgeColor === 'terracotta' ? 'bg-[#A85D55]/10 text-[#C8796E] border-[#A85D55]/30' :
            badgeColor === 'gold' ? 'bg-[#B49A68]/10 text-[#B49A68] border-[#B49A68]/30' :
            'bg-white/5 text-[#C4B5A5] border-white/10'
          }`}>
            {badge}
          </span>
        )}
      </Link>
    )
  }

  const SectionLabel = ({ children }) => (
    <div className="px-3 mt-5 mb-2 text-[9px] uppercase tracking-[0.16em] text-[rgba(246,240,230,0.40)] font-sans font-semibold">
      {children}
    </div>
  )

  const SidebarContent = () => (
    <div 
      className="flex flex-col h-full bg-[#171513] text-[#F6F0E6] select-none"
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.015\'/%3E%3C/svg%3E")',
      }}
    >
      
      {/* ── Brand Logo Header ── */}
      <div className="px-6 pt-7 pb-5">
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[#F6F0E6] text-[#171513] flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transform -rotate-45">
              <path d="M12 2L4 14l3 3 8-8 1-3-4-4z" />
              <path d="M4 14l4 4" />
              <circle cx="9" cy="11" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-serif text-[22px] tracking-tight text-[#F6F0E6] font-semibold leading-none">
              Calli<span className="font-script text-[#A85D55] font-normal text-[1.25em] ml-0.5">Lab</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.22em] text-[#8E7360] font-sans mt-[1px]">
              Artisan Studio
            </span>
          </div>
        </Link>
        <div className="w-full h-[1px] bg-[rgba(255,255,255,0.06)] mt-6" />
      </div>

      {/* ── Navigation Links ── */}
      <nav className="flex-1 px-4 overflow-y-auto pb-6 space-y-0.5 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        
        <SectionLabel>Studio</SectionLabel>
        <NavItem path="/dashboard" icon={Home} label="Home" />
        <NavItem path="/courses" icon={BookOpen} label="Learn" />
        <NavItem path="/practice" icon={PenTool} label="Practice Lab" />
        <NavItem path="/challenges" icon={Trophy} label="Challenges" badge="Hot" badgeColor="terracotta" />
        <NavItem path="/progress" icon={Activity} label="Progress & AI" />

        <SectionLabel>Creative</SectionLabel>
        {(role === 'mentor' || role === 'admin') && (
          <NavItem path="/mentor" icon={GraduationCap} label="Mentor Studio" badge="Mentor" badgeColor="gold" />
        )}
        {(role === 'admin') && (
          <NavItem path="/admin" icon={Award} label="Admin Console" badge="Admin" badgeColor="gold" />
        )}
        <NavItem path="/coach" icon={Sparkles} label="CalliCoach AI" badge="AI" badgeColor="terracotta" />
        <NavItem path="/community" icon={ImageIcon} label="Gallery" />
        <NavItem path="/portfolio" icon={FolderOpen} label="Portfolio" />
        <NavItem path="/certificate" icon={Award} label="Certificates" />

        <SectionLabel>Account</SectionLabel>
        <NavItem path="/profile" icon={User} label="My Profile" />

      </nav>

      {/* ── Bottom Profile Area ── */}
      <div className="p-4 pt-0">
        <div className="p-3 rounded-2xl bg-[#1D1A18] border border-[rgba(255,255,255,0.05)] shadow-lg space-y-3 mb-3">
          {user && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#A85D55] text-[#F6F0E6] flex items-center justify-center font-serif font-bold text-sm border border-[rgba(255,255,255,0.15)] flex-shrink-0 shadow-inner">
                {user.name?.charAt(0).toUpperCase() || 'L'}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="text-[13px] font-serif font-medium truncate text-[#F6F0E6] leading-tight">{user.name}</p>
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-sans mt-0.5">
                  <span className="text-[#B49A68] font-bold">{role}</span>
                  <span className="text-[#6B5140]">•</span>
                  <span className="text-[#8E7360]">{user.skillLevel || 'Advanced'}</span>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleRoleToggle}
            className="w-full py-2 px-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] text-[10px] text-[#C4B5A5] flex items-center justify-between transition-colors font-sans uppercase tracking-wider"
          >
            <span>Switch Studio Role</span>
            <ArrowRightLeft className="w-3 h-3 text-[#8E7360]" />
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-[#8E7360] hover:text-[#C8796E] rounded-xl transition-colors font-sans font-medium group"
        >
          <LogOut className="w-[15px] h-[15px] stroke-[1.5] group-hover:text-[#A85D55] transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>

    </div>
  )

  return (
    <div className="app-shell paper-texture text-[#171513]">
      
      {/* ── Desktop Sidebar ────────────────────────────────────────── */}
      <aside className="app-sidebar shadow-md hidden lg:block">
        <SidebarContent />
      </aside>

      {/* ── Main Content Area ──────────────────────────────────────── */}
      <div className="app-main">
        
        {/* ── Top Header (Only shown if not on practice page, or shown simplified) */}
        {/* Note: The user requested practice page to keep sidebar quiet. The header remains unaffected by the sidebar redesign. */}
        <header className="app-header px-4 sm:px-8 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#171513] hover:bg-[#EFE5D5]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full max-w-xs hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5140]" />
              <input
                type="text"
                placeholder="Search strokes, lessons, styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`)
                  }
                }}
                className="w-full bg-[#F6F0E6] text-[#171513] placeholder-[#8E7360] text-xs pl-9 pr-3 py-2 rounded-full border border-[rgba(107,81,64,0.18)] focus:outline-none focus:border-[#171513] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/challenges" className="flex items-center gap-2 group px-2 py-1 rounded-xl hover:bg-[#FAF6F0] transition-colors">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F4E8E6] border border-[#D8AFA9] flex items-center justify-center text-[#A85D55] shrink-0">
                <Flame className="w-4 h-4 fill-[#A85D55]" />
              </div>
              <div className="flex flex-col text-left leading-none hidden sm:flex">
                <span className="font-mono text-xs font-bold text-[#171513] group-hover:text-[#A85D55] transition-colors">
                  {user?.streak || 12} Day Streak
                </span>
                <span className="text-[9px] text-[#8E7360] font-sans mt-0.5">Keep going!</span>
              </div>
            </Link>

            {/* Notification & Messages */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button 
                type="button"
                className="relative p-2 rounded-full text-[#6B5140] hover:text-[#171513] hover:bg-[rgba(107,81,64,0.08)] transition-colors" 
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#A85D55] ring-2 ring-[#FAF6F0]" />
              </button>
              <button 
                type="button"
                className="p-2 rounded-full text-[#6B5140] hover:text-[#171513] hover:bg-[rgba(107,81,64,0.08)] transition-colors" 
                title="Community Messages"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>

            <Link 
              to="/profile" 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#171513] text-[#FAF6F0] flex items-center justify-center font-serif font-bold text-sm border-2 border-[rgba(107,81,64,0.2)] hover:scale-105 transition-transform shrink-0"
              title={user?.name || 'My Profile'}
            >
              {user?.name?.charAt(0).toUpperCase() || 'L'}
            </Link>
          </div>
        </header>

        {/* ── Page Content Container ───────────────────────────────── */}
        <main className={location.pathname === '/practice' ? 'w-full flex-1 p-3 sm:p-5 lg:p-6 max-w-[1640px] mx-auto min-w-0' : 'page-container'}>
          <Outlet />
        </main>

        {/* ── Footer (Omitted on dedicated practice desk) ─────────── */}
        {location.pathname !== '/practice' && (
          <footer className="border-t border-[rgba(107,81,64,0.1)] py-6 text-center text-xs text-[#6B5140] font-sans mt-auto">
            <p>© 2026 CalliLab Artisan Studio — Learn the Art. Master the Stroke.</p>
          </footer>
        )}

      </div>

      {/* ── Mobile Drawer ──────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-[280px] h-full animate-fade-in z-10 bg-[#171513]">
            <SidebarContent />
          </div>
        </div>
      )}

    </div>
  )
}
