import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { 
  User, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Flame, 
  Award, 
  Save, 
  Sliders, 
  Compass, 
  CheckCircle,
  GraduationCap,
  Crown,
  BookOpen
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Profile() {
  const { user, updateUser, switchRole } = useAuth()
  
  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [skillLevel, setSkillLevel] = useState(user?.skillLevel || 'beginner')
  const [dailyPracticeTarget, setDailyPracticeTarget] = useState(user?.dailyPracticeTarget || 15)
  const [preferredDifficulty, setPreferredDifficulty] = useState(user?.preferredDifficulty || 'easy')
  const [preferredStyles, setPreferredStyles] = useState(user?.preferredStyles || ['brush', 'modern'])
  const [saving, setSaving] = useState(false)
  const [roleUpdating, setRoleUpdating] = useState(false)

  const stylesList = [
    { id: 'brush', name: 'Brush Lettering' },
    { id: 'gothic', name: 'Gothic / Blackletter' },
    { id: 'modern', name: 'Modern Script' },
    { id: 'copperplate', name: 'Copperplate / Engrosser' },
    { id: 'italic', name: 'Chancery Italic' },
    { id: 'minimal', name: 'Minimal Typography' },
  ]

  const toggleStyle = (id) => {
    if (preferredStyles.includes(id)) {
      setPreferredStyles(preferredStyles.filter(s => s !== id))
    } else {
      setPreferredStyles([...preferredStyles, id])
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await axios.put('/api/users/me', {
        name,
        bio,
        skillLevel,
        dailyPracticeTarget: Number(dailyPracticeTarget),
        preferredDifficulty,
        preferredStyles,
      })
      updateUser(res.data)
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleRoleChange = async (newRole) => {
    if (newRole === user?.role) return
    setRoleUpdating(true)
    try {
      await switchRole(newRole)
      toast.success(`Active role switched to ${newRole.toUpperCase()}!`)
    } catch {
      toast.error('Failed to switch role')
    } finally {
      setRoleUpdating(false)
    }
  }

  const getRoleBadge = (r) => {
    if (r === 'admin') return { label: 'Administrator', bg: 'bg-rose-500/15 text-rose-300 border-rose-500/30', icon: Crown }
    if (r === 'mentor') return { label: 'Calligraphy Mentor', bg: 'bg-purple-500/15 text-purple-300 border-purple-500/30', icon: GraduationCap }
    return { label: 'Calligraphy Learner', bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30', icon: BookOpen }
  }

  const badge = getRoleBadge(user?.role || 'learner')
  const RoleIcon = badge.icon

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100 flex items-center gap-2">
            My Profile & Preferences <User className="w-5 h-5 text-amber-500" />
          </h1>
          <p className="text-xs text-neutral-400">Manage your artist identity, learning calibration, daily commitments, and role permissions.</p>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-neutral-900 border border-amber-900/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left z-10">
          <div className="w-20 h-20 rounded-2xl border-2 border-amber-500 bg-amber-500/10 flex items-center justify-center text-3xl font-display font-bold text-amber-400 shadow-gold">
            {user?.name?.charAt(0).toUpperCase() || 'C'}
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-col md:flex-row md:items-center gap-2.5">
              <h2 className="text-2xl font-bold font-display text-neutral-100">{user?.name}</h2>
              <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold border ${badge.bg}`}>
                <RoleIcon className="w-3.5 h-3.5" /> {badge.label}
              </span>
            </div>
            <p className="text-xs text-neutral-400">{user?.email}</p>
            <p className="text-xs text-neutral-300 italic pt-1 max-w-md">
              "{user?.bio || 'Passionate about traditional letterforms and contemporary calligraphy flourishes.'}"
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-amber-900/15 pt-4 md:pt-0 md:pl-8 z-10 w-full md:w-auto text-center">
          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
              <Flame className="w-4 h-4" />
            </div>
            <p className="text-lg font-bold font-display text-neutral-100">{user?.streak || 0} Days</p>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Streak</p>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
              <Award className="w-4 h-4" />
            </div>
            <p className="text-lg font-bold font-display text-amber-400">{user?.xp || 0} XP</p>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">{user?.level || 'Beginner'}</p>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-lg font-bold font-display text-neutral-100">{user?.dailyPracticeTarget || 15}m</p>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Target/Day</p>
          </div>
        </div>
      </div>

      {/* Role Switcher Box (Essential for Demo / Project Evaluation) */}
      <div className="p-6 rounded-2xl bg-neutral-900/80 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Role-Based Access Control (RBAC) Switcher
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Switch roles on the fly to inspect Learner, Mentor, and Admin workflows and permissions.
            </p>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded bg-neutral-800 text-neutral-400 font-mono">
            Demo Tool
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { id: 'learner', title: 'Learner', icon: BookOpen, desc: 'Practice exercises, submit to AI, track streak & portfolio' },
            { id: 'mentor', title: 'Mentor / Instructor', icon: GraduationCap, desc: 'Review submissions, give feedback, manage courses' },
            { id: 'admin', title: 'Administrator', icon: Crown, desc: 'System analytics, user management, platform governance' },
          ].map((r) => {
            const Icon = r.icon
            const isCurrent = (user?.role || 'learner') === r.id
            return (
              <button
                key={r.id}
                type="button"
                disabled={roleUpdating}
                onClick={() => handleRoleChange(r.id)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-500/15 text-amber-300 shadow-gold'
                    : 'border-neutral-800 bg-neutral-950/50 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-bold flex items-center gap-1.5 font-display text-neutral-100">
                    <Icon className="w-4 h-4 text-amber-500" /> {r.title}
                  </span>
                  {isCurrent && <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500 text-neutral-950 font-bold uppercase">Active</span>}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{r.desc}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Learning Path Summary */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-900/15 space-y-3">
        <h3 className="text-xs uppercase font-mono tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
          <Compass className="w-4 h-4" /> Personalized Learning Trajectory
        </h3>
        <p className="text-sm font-serif text-neutral-200 bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800">
          {user?.recommendedPath || 'Basic Strokes → Letter Formation → Words → Flourishing'}
        </p>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleSaveProfile} className="p-6 md:p-8 rounded-2xl bg-neutral-900 border border-amber-900/20 space-y-6">
        <h3 className="text-lg font-semibold font-display text-neutral-100 border-b border-amber-900/10 pb-3">
          Edit Profile Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="label">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="label">Skill Level</label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="input capitalize"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="label">Daily Practice Target (Minutes)</label>
            <input
              type="number"
              min="5"
              max="120"
              value={dailyPracticeTarget}
              onChange={(e) => setDailyPracticeTarget(e.target.value)}
              className="input"
            />
          </div>

          <div className="space-y-1.5">
            <label className="label">Preferred Practice Difficulty</label>
            <select
              value={preferredDifficulty}
              onChange={(e) => setPreferredDifficulty(e.target.value)}
              className="input capitalize"
            >
              <option value="easy">Easy (Slant Guides & Tracing)</option>
              <option value="medium">Medium (Standard Alphabet & Words)</option>
              <option value="hard">Hard (Freehand Flourishes)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="label">Biography / Artist Note</label>
          <textarea
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Share your calligraphy background or creative interests..."
            className="input resize-none"
          />
        </div>

        {/* Favorite Calligraphy Styles */}
        <div className="space-y-2">
          <label className="label">Favorite Calligraphy Styles</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {stylesList.map((st) => {
              const active = preferredStyles.includes(st.id)
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => toggleStyle(st.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    active
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {st.name} {active && '✓'}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-amber-900/10">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary btn-sm flex items-center gap-2 px-6 py-2.5 text-xs font-semibold"
          >
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>

    </div>
  )
}
