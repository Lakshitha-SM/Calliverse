import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { 
  User, 
  Clock, 
  Flame, 
  Award, 
  Save, 
  Sliders, 
  Compass, 
  CheckCircle,
  GraduationCap,
  Crown,
  BookOpen,
  ArrowRight
} from 'lucide-react'
import InkStroke from '../components/common/InkStroke'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Profile() {
  const { user, updateUser, switchRole } = useAuth()
  
  const [name, setName] = useState(user?.name || 'Lakshitha S M')
  const [bio, setBio] = useState(user?.bio || 'Aspiring calligraphy artist devoted to pointed pen pressure control and classic flourished script.')
  const [skillLevel, setSkillLevel] = useState(user?.skillLevel || 'beginner')
  const [dailyPracticeTarget, setDailyPracticeTarget] = useState(user?.dailyPracticeTarget || 15)
  const [preferredStyles, setPreferredStyles] = useState(user?.preferredStyles || ['brush', 'modern'])
  const [saving, setSaving] = useState(false)

  const stylesList = [
    { id: 'brush', name: 'Brush Lettering' },
    { id: 'gothic', name: 'Gothic / Blackletter' },
    { id: 'modern', name: 'Modern Script' },
    { id: 'copperplate', name: 'Copperplate' },
    { id: 'flourishing', name: 'Flourishing' },
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
        preferredStyles,
      })
      if (res.data) updateUser(res.data)
      toast.success('Artist profile updated successfully!')
    } catch {
      updateUser({ name, bio, skillLevel, dailyPracticeTarget, preferredStyles })
      toast.success('Artist profile updated locally!')
    } finally {
      setSaving(false)
    }
  }

  const role = user?.role || 'learner'

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto select-none pt-4">
      
      {/* Header */}
      <div className="border-b border-[rgba(107,81,64,0.14)] pb-6">
        <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#A85D55] font-bold">
          Artist Studio Settings
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-[#171513] font-normal tracking-tight mt-1">
          Profile & Preferences
        </h1>
        <p className="text-sm text-[#6B5140] font-sans mt-2 max-w-xl">
          Manage your artist identity, daily target schedule, and preferred calligraphy styles to tailor your CalliLab experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Avatar & Summary Card (4 Cols) */}
        <div className="md:col-span-4 space-y-6">
          <div className="paper-sheet p-8 bg-white border border-[rgba(107,81,64,0.18)] text-center space-y-5 shadow-sm">
            <div className="w-32 h-32 rounded-full bg-[#171513] text-[#FAF6F0] flex items-center justify-center font-serif text-5xl font-bold mx-auto border-[6px] border-[#FAF6F0] ring-1 ring-[rgba(107,81,64,0.15)] shadow-md">
              {name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-[#171513] leading-tight">{name}</h2>
              <p className="text-xs text-[#A85D55] font-sans font-bold uppercase tracking-widest mt-1">
                {role} Level
              </p>
            </div>

            <div className="pt-5 border-t border-[rgba(107,81,64,0.1)] text-xs text-[#6B5140] font-mono space-y-3">
              <div className="flex justify-between items-center bg-[#FAF6F0] px-3 py-2 rounded">
                <span className="uppercase tracking-widest font-bold text-[9px]">Streak</span>
                <span className="font-bold text-[#171513] text-sm">12 Days</span>
              </div>
              <div className="flex justify-between items-center bg-[#FAF6F0] px-3 py-2 rounded">
                <span className="uppercase tracking-widest font-bold text-[9px]">Total XP</span>
                <span className="font-bold text-[#171513] text-sm">{user?.xp || 885}</span>
              </div>
              <div className="flex justify-between items-center bg-[#FAF6F0] px-3 py-2 rounded border border-[rgba(107,81,64,0.05)]">
                <span className="uppercase tracking-widest font-bold text-[9px]">Daily Goal</span>
                <span className="font-bold text-[#171513] text-sm">{dailyPracticeTarget}m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Form (8 Cols) */}
        <div className="md:col-span-8 paper-sheet p-8 sm:p-10 bg-white border border-[rgba(107,81,64,0.18)] shadow-sm">
          <form onSubmit={handleSaveProfile} className="space-y-8">
            
            <div className="space-y-2">
              <label className="text-xs font-serif font-bold text-[#171513] uppercase tracking-wider">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FAF6F0] text-[#171513] text-sm px-4 py-3 rounded-lg border border-[rgba(107,81,64,0.2)] focus:outline-none focus:border-[#A85D55] focus:ring-1 focus:ring-[#A85D55] transition-all font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-serif font-bold text-[#171513] uppercase tracking-wider">Artist Bio & Statement</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#FAF6F0] text-[#171513] text-sm px-4 py-3 rounded-lg border border-[rgba(107,81,64,0.2)] focus:outline-none focus:border-[#A85D55] focus:ring-1 focus:ring-[#A85D55] transition-all font-sans resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-serif font-bold text-[#171513] uppercase tracking-wider">Experience Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSkillLevel(lvl)}
                    className={`py-3 px-4 rounded-lg border text-[11px] font-sans uppercase tracking-widest font-bold transition-all ${
                      skillLevel === lvl
                        ? 'bg-[#171513] text-[#FAF6F0] border-[#171513] shadow-sm'
                        : 'bg-white text-[#6B5140] border-[rgba(107,81,64,0.2)] hover:border-[#A85D55] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-serif font-bold text-[#171513] uppercase tracking-wider">Daily Practice Target</span>
                <span className="font-mono text-[#A85D55] font-bold bg-[#F4E8E6] px-3 py-1 rounded">{dailyPracticeTarget} Minutes</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={dailyPracticeTarget}
                onChange={(e) => setDailyPracticeTarget(Number(e.target.value))}
                className="w-full accent-[#171513] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-[#8E7360] uppercase tracking-widest px-1">
                <span>10m</span>
                <span>60m</span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <label className="text-xs font-serif font-bold text-[#171513] uppercase tracking-wider block">Preferred Styles</label>
              <div className="flex flex-wrap gap-3">
                {stylesList.map((st) => {
                  const active = preferredStyles.includes(st.id)
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => toggleStyle(st.id)}
                      className={`px-4 py-2 rounded-full text-xs font-sans font-bold transition-all border ${
                        active
                          ? 'bg-[#A85D55] text-white border-[#A85D55] shadow-sm'
                          : 'bg-white text-[#6B5140] border-[rgba(107,81,64,0.2)] hover:border-[#A85D55]'
                      }`}
                    >
                      {st.name}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="pt-8 border-t border-[rgba(107,81,64,0.12)] flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn-ink text-xs py-3 px-8 flex items-center gap-2 shadow-sm font-bold"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Settings'}</span>
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  )
}
