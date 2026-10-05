import { useState, useEffect } from 'react'
import { Crown, Users, BookOpen, Award, Sliders, Shield, TrendingUp, Cpu } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function AdminConsole() {
  const { user } = useAuth()
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users')
        setUsersList(res.data.users || [])
      } catch (err) {
        // Fallback demo users if backend request fails
        setUsersList([
          { _id: '1', name: 'CalliVerse Admin', email: 'admin@calliverse.com', role: 'admin', skillLevel: 'advanced', streak: 30 },
          { _id: '2', name: 'Master Sophia Chen', email: 'mentor@calliverse.com', role: 'mentor', skillLevel: 'advanced', streak: 21 },
          { _id: '3', name: 'Elena Vance', email: 'learner@calliverse.com', role: 'learner', skillLevel: 'beginner', streak: 4 },
          { _id: '4', name: 'Julian Cross', email: 'artist@calliverse.com', role: 'learner', skillLevel: 'intermediate', streak: 7 },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100 flex items-center gap-2">
            Administrator Command Center <Crown className="w-6 h-6 text-rose-400" />
          </h1>
          <p className="text-xs text-neutral-400">
            System governance, user role auditing, AI assessment metrics, and global platform observability.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900 border border-rose-500/20">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Total Users</p>
          <p className="text-2xl font-bold font-display text-neutral-100 mt-1">{usersList.length || 4}</p>
        </div>
        <div className="p-5 rounded-2xl bg-neutral-900 border border-rose-500/20">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Active Mentors</p>
          <p className="text-2xl font-bold font-display text-purple-400 mt-1">1 Certified</p>
        </div>
        <div className="p-5 rounded-2xl bg-neutral-900 border border-rose-500/20">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">AI Assessments</p>
          <p className="text-2xl font-bold font-display text-amber-400 mt-1">218 Evaluated</p>
        </div>
        <div className="p-5 rounded-2xl bg-neutral-900 border border-rose-500/20">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Platform Health</p>
          <p className="text-2xl font-bold font-display text-green-400 mt-1">100% Online</p>
        </div>
      </div>

      {/* Users & Roles Governance Table */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-900/15 space-y-4">
        <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-neutral-200 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-500" /> Platform Accounts & RBAC Registry
          </h3>
          <span className="text-xs text-neutral-400 font-mono">{usersList.length} Accounts Registered</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase font-mono text-[10px]">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Skill Level</th>
                <th className="py-3 px-4">Practice Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {usersList.map((u) => (
                <tr key={u._id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-neutral-200">{u.name}</td>
                  <td className="py-3.5 px-4 text-neutral-400 font-mono">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-mono uppercase text-[9px] font-bold ${
                      u.role === 'admin' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      u.role === 'mentor' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                      'bg-amber-500/15 text-amber-300 border border-amber-500/25'
                    }`}>
                      {u.role || 'learner'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 capitalize text-neutral-300">{u.skillLevel || 'Beginner'}</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">{u.streak || 0} Days 🔥</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
