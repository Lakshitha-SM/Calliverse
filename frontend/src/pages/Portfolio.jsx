import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Award, 
  Share2, 
  ArrowUpRight, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  Edit3,
  Sparkles
} from 'lucide-react'
import InkStroke from '../components/common/InkStroke'
import AchievementStamp from '../components/common/AchievementStamp'
import toast from 'react-hot-toast'

export default function Portfolio() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('artworks')

  const studentName = user?.name || 'Lakshitha'

  const artworks = [
    { id: 1, title: 'Quiet Letters', style: 'Modern Script', year: '2026', score: 91, preview: 'Quiet' },
    { id: 2, title: 'Sunshine', style: 'Brush Lettering', year: '2026', score: 88, preview: 'Sunshine' },
    { id: 3, title: 'Believe', style: 'Flourishing Script', year: '2026', score: 94, preview: 'Believe' },
    { id: 4, title: 'Create', style: 'Modern Monogram', year: '2026', score: 89, preview: 'Create' },
  ]

  const certificates = [
    {
      id: 1,
      title: 'Beginner Calligraphy Mastery',
      issueDate: '30 September 2026',
      instructor: 'Master Sophia Chen',
      credentialId: 'CL-2026-8942-VERIFIED'
    },
    {
      id: 2,
      title: 'Foundations of 55° Slant Geometry',
      issueDate: '15 August 2026',
      instructor: 'Master Sophia Chen',
      credentialId: 'CL-2026-7721-VERIFIED'
    }
  ]

  const badges = [
    { name: 'Ink Initiate', desc: 'Completed first 10 precision strokes', date: 'DAY 01', xp: 50 },
    { name: 'Flourish Master', desc: 'Achieved 95% spacing alignment', date: 'DAY 04', xp: 150 },
    { name: 'Streaker Elite', desc: 'Active practice for 12 days', date: 'DAY 12', xp: 100 },
    { name: '55° Precisionist', desc: 'Zero slant deviation on ascenders', date: 'DAY 08', xp: 120 },
  ]

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Public artist portfolio URL copied to clipboard!')
  }

  return (
    <div className="space-y-10 animate-fade-in max-w-6xl mx-auto select-none pt-4">
      
      {/* ── Artist Profile Header Card ────────── */}
      <div className="paper-sheet p-8 sm:p-10 bg-white border border-[rgba(107,81,64,0.18)] shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">
        
        {/* Soft terracotta corner wash */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-radial from-[#A85D55]/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
          
          {/* Avatar & Artist Meta */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
            
            {/* Circular Artist Portrait */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#171513] text-[#FAF6F0] flex items-center justify-center font-serif text-4xl font-bold shadow-md border-[6px] border-[#FAF6F0] ring-1 ring-[rgba(107,81,64,0.15)] shrink-0">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div className="space-y-2 text-center sm:text-left w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif text-[#171513] font-normal leading-tight">
                    {studentName}
                  </h1>
                  <p className="text-xs font-sans text-[#A85D55] font-semibold tracking-wide uppercase mt-1">
                    Aspiring Calligrapher
                  </p>
                </div>
                
                {/* Right Header Buttons */}
                <div className="flex items-center justify-center sm:justify-start gap-3 shrink-0">
                  <button
                    onClick={handleShare}
                    className="btn-outline-ink text-xs py-2 px-4 flex items-center gap-1.5 shrink-0"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                  <Link
                    to="/profile"
                    className="btn-ink text-xs py-2 px-4 flex items-center gap-1.5 shrink-0"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                  </Link>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 pt-4 text-[11px] font-mono text-[#6B5140] uppercase tracking-widest border-t border-[rgba(107,81,64,0.1)]">
                <div>
                  <span className="font-bold text-[#171513] text-sm">24</span> Artworks
                </div>
                <div className="w-1 h-1 rounded-full bg-[#A85D55]/50" />
                <div>
                  <span className="font-bold text-[#171513] text-sm">12</span> Certificates
                </div>
                <div className="w-1 h-1 rounded-full bg-[#A85D55]/50" />
                <div>
                  <span className="font-bold text-[#171513] text-sm">8</span> Badges
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="text-center pt-2 pb-6">
        <p className="font-serif italic text-lg sm:text-xl text-[#6B5140]">
          "Turning simple letters into something beautiful ✨"
        </p>
        <InkStroke color="#A85D55" width={180} height={18} className="mx-auto pt-2" />
      </div>

      {/* ── Portfolio Section Tabs ───────────── */}
      <div className="flex items-center gap-2 border-b border-[rgba(107,81,64,0.14)] pb-4 overflow-x-auto no-scrollbar">
        {[
          { id: 'artworks', label: 'My Artworks' },
          { id: 'certificates', label: 'Certificates' },
          { id: 'achievements', label: 'Achievements' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-sans font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#171513] text-[#FAF6F0] shadow-sm'
                : 'text-[#6B5140] hover:text-[#171513] border border-transparent hover:border-[rgba(107,81,64,0.18)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: MY ARTWORKS ───────────────── */}
      {activeTab === 'artworks' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="paper-sheet p-6 bg-white border border-[rgba(107,81,64,0.18)] flex flex-col justify-between aspect-[3/4] hover:shadow-md hover:-translate-y-1 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-center text-[10px] font-mono text-[#8E7360]">
                <span>{art.year}</span>
                <span className="text-[#A85D55] font-bold bg-[#F4E8E6] px-2 py-0.5 rounded">{art.score}%</span>
              </div>

              {/* Calligraphy Specimen */}
              <div className="text-center my-auto py-8 relative">
                <div className="absolute inset-0 bg-radial from-[#FAF6F0] to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <span className="font-script text-5xl text-[#171513] group-hover:text-[#A85D55] transition-colors leading-snug relative z-10">
                  {art.preview}
                </span>
              </div>

              <div className="pt-4 border-t border-[rgba(107,81,64,0.1)] flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-serif font-bold text-[#171513] leading-tight">{art.title}</h4>
                  <span className="text-[10px] font-mono text-[#6B5140] uppercase tracking-wider">{art.style}</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#8E7360] group-hover:text-[#171513] transition-colors shrink-0" strokeWidth={1.5} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 2: CERTIFICATES ────────────────────────────────────── */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="paper-sheet p-8 bg-white border border-[rgba(107,81,64,0.18)] space-y-6 shadow-sm flex flex-col justify-between group hover:border-[rgba(107,81,64,0.3)] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold tracking-widest text-[#8E7360] uppercase">
                  <span>Official Credential</span>
                  <span className="text-[#A85D55] border border-[#A85D55]/30 px-2 py-0.5 rounded bg-[#F4E8E6]/50">Issued</span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-[#171513] font-normal leading-tight mb-2 group-hover:text-[#A85D55] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-[#6B5140] font-sans">
                    Instructor: <strong className="font-bold text-[#171513]">{cert.instructor}</strong> • Dated: {cert.issueDate}
                  </p>
                </div>
                <p className="text-[10px] font-mono text-[#8E7360] bg-[#FAF6F0] px-3 py-1.5 rounded w-max border border-[rgba(107,81,64,0.1)]">
                  ID: {cert.credentialId}
                </p>
              </div>

              <div className="pt-5 border-t border-[rgba(107,81,64,0.1)] flex items-center justify-between">
                <span className="text-sm font-serif italic text-[#A85D55] opacity-80">Verified Signature</span>
                <Link
                  to="/certificate"
                  className="btn-outline-ink text-[11px] font-bold py-2 px-5 flex items-center gap-1.5"
                >
                  <span>View & Print</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 3: ACHIEVEMENTS ────────────────────────────────────── */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="paper-sheet p-6 bg-white border border-[rgba(107,81,64,0.18)] flex flex-col items-center text-center space-y-4 shadow-sm hover:border-[#A85D55] transition-colors group"
            >
              <div className="transform group-hover:scale-105 transition-transform">
                <AchievementStamp label="UNLOCKED" date={b.date} active={true} size="lg" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-serif font-bold text-[#171513] group-hover:text-[#A85D55] transition-colors">{b.name}</h4>
                <p className="text-[11px] text-[#6B5140] font-sans leading-relaxed px-2">{b.desc}</p>
                <span className="text-[10px] font-mono text-[#A85D55] font-bold block mt-2 bg-[#F4E8E6] w-max mx-auto px-2 py-0.5 rounded border border-[#D8AFA9]/50">+{b.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
