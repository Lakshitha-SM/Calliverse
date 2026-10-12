import { useState, useEffect } from 'react'
import { 
  Users, 
  BookOpen, 
  Trophy, 
  Activity, 
  Search, 
  Filter, 
  Crown, 
  Shield, 
  CheckCircle2, 
  TrendingUp,
  Download,
  Sparkles,
  PieChart as PieIcon,
  BarChart3,
  UserCheck,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import InkStroke from '../../components/common/InkStroke'

export default function AdminConsole() {
  const { user } = useAuth()
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users')
        if (res.data?.users && res.data.users.length > 0) {
          setUsersList(res.data.users)
        } else {
          fallbackUsers()
        }
      } catch (err) {
        fallbackUsers()
      } finally {
        setLoading(false)
      }
    }

    const fallbackUsers = () => {
      setUsersList([
        { _id: '1', name: 'Lakshitha SM', email: 'lakshitha@callilab.com', role: 'admin', skillLevel: 'Advanced', streak: 12, joined: 'Sep 2026' },
        { _id: '2', name: 'Master Sophia Chen', email: 'sophia@callilab.com', role: 'mentor', skillLevel: 'Advanced', streak: 28, joined: 'Aug 2026' },
        { _id: '3', name: 'Ananya Sharma', email: 'ananya@example.com', role: 'learner', skillLevel: 'Intermediate', streak: 14, joined: 'Sep 2026' },
        { _id: '4', name: 'Riya Patel', email: 'riya@example.com', role: 'learner', skillLevel: 'Beginner', streak: 9, joined: 'Oct 2026' },
        { _id: '5', name: 'Karthik Rao', email: 'karthik@example.com', role: 'learner', skillLevel: 'Intermediate', streak: 18, joined: 'Aug 2026' },
        { _id: '6', name: 'Julian Cross', email: 'julian@example.com', role: 'learner', skillLevel: 'Intermediate', streak: 7, joined: 'Sep 2026' },
      ])
    }

    fetchUsers()
  }, [])

  const handleRoleToggle = (userId, currentRole) => {
    const nextRole = currentRole === 'learner' ? 'mentor' : currentRole === 'mentor' ? 'admin' : 'learner'
    setUsersList((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: nextRole } : u))
    )
    toast.success(`Role updated to ${nextRole.toUpperCase()} for account.`, {
      icon: '🛡️',
      style: {
        background: '#171513',
        color: '#FAF6F0',
        border: '1px solid #B49A68',
      },
    })
  }

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Monthly User Growth Bars - Screen #14
  const growthData = [
    { month: 'Jul', count: 480, height: '40%' },
    { month: 'Aug', count: 650, height: '55%' },
    { month: 'Sep', count: 820, height: '68%' },
    { month: 'Oct', count: 1040, height: '85%' },
    { month: 'Nov', count: 1180, height: '94%' },
    { month: 'Dec', count: 1240, height: '100%' },
  ]

  // Popular Styles distribution - Screen #14
  const popularStyles = [
    { name: 'Modern', percent: 42, color: '#6B5140' },
    { name: 'Gothic', percent: 28, color: '#171513' },
    { name: 'Flourishing', percent: 18, color: '#A85D55' },
    { name: 'Brush', percent: 12, color: '#B49A68' },
  ]

  return (
    <div className="space-y-10 animate-fade-in max-w-6xl mx-auto pt-4 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(107,81,64,0.12)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#6B5140] font-mono font-bold">
            <span>CalliLab Studio Platform</span>
            <span>•</span>
            <span>System Governance</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-normal text-[#171513] tracking-tight mt-1">
            Admin Dashboard
          </h1>
          <p className="text-[13px] text-[#6B5140] font-sans mt-2 max-w-xl">
            Global metrics, studio enrollment analytics, learning pathways distribution, and platform authority controls.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toast.success('Telemetry data exported as archival CSV')}
            className="btn-outline-ink px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards - Exact Match to Screen #14 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Total Users */}
        <div className="paper-sheet p-6 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#6B5140] font-bold">Total Users</span>
            <span className="px-2 py-0.5 rounded text-[#171513] bg-[#FAF6F0] border border-[rgba(107,81,64,0.15)] text-[9px] font-mono font-bold tracking-widest uppercase">
              +18% MoM
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-normal text-[#171513]">1,240</span>
          </div>
          <p className="text-[11px] text-[#8E7360] font-sans mt-2">Registered calligraphers</p>
        </div>

        {/* Metric 2: Active Users */}
        <div className="paper-sheet p-6 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm hover:-translate-y-1 transition-transform relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#F4E8E6] rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#A85D55] font-bold">Active Users</span>
            <span className="px-2 py-0.5 rounded-full bg-[#A85D55] text-white text-[9px] font-mono font-bold tracking-widest uppercase">
              Daily
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2 relative z-10">
            <span className="text-4xl font-serif font-normal text-[#A85D55]">320</span>
          </div>
          <p className="text-[11px] text-[#8E7360] font-sans mt-2 relative z-10">Currently practicing on canvas</p>
        </div>

        {/* Metric 3: Total Lessons */}
        <div className="paper-sheet p-6 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#6B5140] font-bold">Total Lessons</span>
            <BookOpen className="w-4 h-4 text-[#8E7360]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-normal text-[#171513]">48</span>
          </div>
          <p className="text-[11px] text-[#8E7360] font-sans mt-2">Across 3 progression tracks</p>
        </div>

        {/* Metric 4: Active Challenges */}
        <div className="paper-sheet p-6 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#6B5140] font-bold">Active Challenges</span>
            <Trophy className="w-4 h-4 text-[#B49A68]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-normal text-[#171513]">12</span>
          </div>
          <p className="text-[11px] text-[#8E7360] font-sans mt-2">7-Day & Monthly Sprints</p>
        </div>
      </div>

      {/* Analytical Charts Row - Screen #14 (User Growth & Popular Styles) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel (2 cols): User Growth Bar Chart */}
        <div className="lg:col-span-2 paper-sheet p-6 md:p-8 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[rgba(107,81,64,0.12)] pb-4">
            <div>
              <h2 className="text-2xl font-serif font-normal text-[#171513] flex items-center gap-2">
                User Growth
              </h2>
              <p className="text-[11px] text-[#6B5140] font-sans mt-1">
                Monthly learner onboarding and platform adoption trajectory
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest px-3 py-1.5 rounded bg-[#FAF6F0] border border-[rgba(107,81,64,0.15)] text-[#171513] uppercase">
              H2 2026
            </span>
          </div>

          {/* Bar Chart Visualization matching Screen #14 */}
          <div className="h-56 flex items-end justify-between gap-4 pt-6 px-2">
            {growthData.map((d, idx) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[10px] font-mono text-[#6B5140] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.count}
                </span>
                <div 
                  className="w-full max-w-[48px] rounded-t-md transition-all duration-500 group-hover:brightness-110 relative"
                  style={{ 
                    height: d.height, 
                    backgroundColor: idx === growthData.length - 1 ? '#171513' : idx % 2 === 0 ? '#6B5140' : '#A85D55' 
                  }}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-t-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs font-serif font-bold text-[#171513] group-hover:text-[#A85D55] transition-colors">
                  {d.month}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6B5140] font-mono pt-4 border-t border-[rgba(107,81,64,0.1)]">
            <span className="uppercase tracking-widest font-bold">Cumulative Registrations: +760</span>
            <span className="text-[#A85D55] font-bold tracking-wider">Retention Rate: 84.6%</span>
          </div>
        </div>

        {/* Right Panel (1 col): Popular Styles Breakdown matching Screen #14 */}
        <div className="paper-sheet p-6 md:p-8 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm space-y-6">
          <div className="border-b border-[rgba(107,81,64,0.12)] pb-4">
            <h2 className="text-2xl font-serif font-normal text-[#171513]">
              Popular Styles
            </h2>
            <p className="text-[11px] text-[#6B5140] font-sans mt-1">
              Enrollment distribution across disciplines
            </p>
          </div>

          {/* Donut Chart representation */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* SVG Conic Donut representation */}
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90 drop-shadow-sm">
                {/* Modern: 42% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#6B5140"
                  strokeWidth="3.5"
                  strokeDasharray="42 58"
                  strokeDashoffset="0"
                />
                {/* Gothic: 28% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#171513"
                  strokeWidth="3.5"
                  strokeDasharray="28 72"
                  strokeDashoffset="-42"
                />
                {/* Flourishing: 18% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#A85D55"
                  strokeWidth="3.5"
                  strokeDasharray="18 82"
                  strokeDashoffset="-70"
                />
                {/* Brush: 12% */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#B49A68"
                  strokeWidth="3.5"
                  strokeDasharray="12 88"
                  strokeDashoffset="-88"
                />
              </svg>
              {/* Center Donut Label */}
              <div className="absolute text-center">
                <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-[#8E7360] block">Dominant</span>
                <span className="text-xl font-serif font-bold text-[#171513] leading-tight">Modern</span>
                <span className="text-xs font-mono font-bold text-[#A85D55] block">42%</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3 pt-2 border-t border-[rgba(107,81,64,0.1)]">
            {popularStyles.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-inner"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-serif font-bold text-[#171513]">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-[#6B5140]">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User & Role Governance Table */}
      <div className="paper-sheet p-6 md:p-8 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(107,81,64,0.12)] pb-4">
          <div>
            <h2 className="text-2xl font-serif font-normal text-[#171513] flex items-center gap-2">
              User & Role Governance
            </h2>
            <p className="text-[11px] text-[#6B5140] font-sans mt-1">
              Manage student cohorts, assign mentor privileges, and oversee platform access.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B5140]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="pl-9 pr-4 py-2 rounded-lg bg-[#FAF6F0] border border-[rgba(107,81,64,0.18)] text-xs text-[#171513] placeholder:text-[#8E7360] focus:outline-none focus:border-[#A85D55] font-sans w-full sm:w-64"
              />
            </div>

            {/* Role Filter Pills */}
            <div className="flex items-center gap-1 bg-[#FAF6F0] p-1 rounded-lg border border-[rgba(107,81,64,0.15)] text-xs font-bold font-sans">
              {['all', 'learner', 'mentor', 'admin'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-4 py-1.5 rounded transition-all capitalize ${
                    roleFilter === r ? 'bg-[#171513] text-[#FAF6F0] shadow-sm' : 'text-[#6B5140] hover:text-[#171513]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[rgba(107,81,64,0.1)] text-[#8E7360] uppercase tracking-widest font-mono text-[9px] font-bold">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Skill Level</th>
                <th className="py-3 px-4">Practice Streak</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(107,81,64,0.05)] font-sans">
              {filteredUsers.map((u) => (
                <tr key={u._id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                  <td className="py-3.5 px-4 font-serif font-bold text-sm text-[#171513]">{u.name}</td>
                  <td className="py-3.5 px-4 text-[#6B5140] font-mono text-[10px]">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-3 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${
                        u.role === 'admin'
                          ? 'bg-[#171513] text-white'
                          : u.role === 'mentor'
                          ? 'bg-[#A85D55] text-white'
                          : 'bg-[#FAF6F0] border border-[rgba(107,81,64,0.15)] text-[#171513]'
                      }`}
                    >
                      {u.role || 'learner'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#171513] font-bold">{u.skillLevel || 'Beginner'}</td>
                  <td className="py-3.5 px-4 text-[#A85D55] font-mono font-bold">{u.streak || 0} Days 🔥</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleRoleToggle(u._id, u.role)}
                      className="px-4 py-1.5 rounded border border-[rgba(107,81,64,0.2)] text-[10px] font-bold uppercase tracking-wider text-[#6B5140] hover:bg-[#171513] hover:text-[#FAF6F0] hover:border-[#171513] transition-colors"
                      title="Toggle role privilege"
                    >
                      Cycle Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
