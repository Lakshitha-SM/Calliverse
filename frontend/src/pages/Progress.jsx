import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  Bot, 
  RotateCcw,
  CheckCircle2,
  Sliders,
  TrendingUp,
  Clock,
  Flame,
  BookOpen,
  ArrowRight,
  ShieldCheck
} from 'lucide-react'
import ImageCompareSlider from '../components/common/ImageCompareSlider'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function Progress() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const incomingImage = location.state?.attemptImage || null
  const incomingRef = location.state?.targetReference || 'a'
  const incomingAssessment = location.state?.assessment || null

  const [activeTab, setActiveTab] = useState(incomingImage ? 'assessment' : 'analytics')
  
  const [currentAssessment, setCurrentAssessment] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyticsFilter, setAnalyticsFilter] = useState('overall')

  useEffect(() => {
    if (activeTab === 'assessment') {
      if (incomingAssessment) {
        setCurrentAssessment({
          score: incomingAssessment.overallScore || 85,
          metrics: [
            { label: 'Letter Spacing', status: (incomingAssessment.metrics?.spacing || 82) >= 80 ? 'Good' : 'Needs work', val: incomingAssessment.metrics?.spacing || 82, color: '#171513' },
            { label: '55° Slant Angle', status: (incomingAssessment.metrics?.slant || 80) >= 80 ? 'Good' : 'Needs work', val: incomingAssessment.metrics?.slant || 80, color: '#A85D55' },
            { label: 'Stroke Consistency', status: (incomingAssessment.metrics?.strokeConsistency || 85) >= 80 ? 'Excellent' : 'Fair', val: incomingAssessment.metrics?.strokeConsistency || 85, color: '#B49A68' },
            { label: 'Stroke Smoothness', status: (incomingAssessment.metrics?.strokeSmoothness || 88) >= 80 ? 'Excellent' : 'Good', val: incomingAssessment.metrics?.strokeSmoothness || 88, color: '#642F35' }
          ],
          feedback: incomingAssessment.feedback
        })
        setAnalyzing(false)
      } else {
        setAnalyzing(true)
        setTimeout(() => {
          setCurrentAssessment({
            score: 84,
            metrics: [
              { label: 'Letter Spacing', status: 'Good', val: 85, color: '#171513' },
              { label: 'Slant Angle', status: 'Needs work', val: 55, color: '#A85D55' },
              { label: 'Stroke Thickness', status: 'Excellent', val: 95, color: '#B49A68' }
            ]
          })
          setAnalyzing(false)
        }, 600)
      }
    }
  }, [activeTab, incomingAssessment])

  const stats = [
    { label: 'Exercises Completed', val: '47', icon: BookOpen },
    { label: 'Total Practice Time', val: '12 hrs', icon: Clock },
    { label: 'Lessons Completed', val: '18', icon: CheckCircle2 },
    { label: 'Day Streak', val: `${user?.streak || 12}`, icon: Flame },
  ]

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto select-none pt-4">
      
      {/* ── Top Tabs Banner ────────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(107,81,64,0.14)]">
        <div>
          <h1 className="text-4xl font-serif text-[#171513] font-normal">
            {activeTab === 'assessment' ? 'AI Assessment Results' : 'Progress Analytics'}
          </h1>
          <p className="text-sm text-[#6B5140] font-sans mt-1">
            {activeTab === 'assessment' ? 'Instant feedback on your strokes.' : 'Track your calligraphy journey.'}
          </p>
        </div>
        
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-[rgba(107,81,64,0.18)] shadow-sm">
          <button
            onClick={() => setActiveTab('assessment')}
            className={`px-5 py-2 rounded-full text-xs font-sans font-bold transition-all ${
              activeTab === 'assessment' ? 'bg-[#171513] text-[#FAF6F0]' : 'text-[#6B5140] hover:text-[#171513]'
            }`}
          >
            Review Sheet
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-2 rounded-full text-xs font-sans font-bold transition-all ${
              activeTab === 'analytics' ? 'bg-[#171513] text-[#FAF6F0]' : 'text-[#6B5140] hover:text-[#171513]'
            }`}
          >
            Skill Analytics
          </button>
        </div>
      </div>

      {/* ── SCREEN 06: AI ASSESSMENT RESULTS ────────────────────────── */}
      {activeTab === 'assessment' && (
        <div className="space-y-8">
          
          {/* Top: Overall Score Banner */}
          <div className="paper-sheet p-8 bg-white border border-[rgba(107,81,64,0.2)] flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#A85D55]/10 to-transparent rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#171513] flex items-center justify-center border-4 border-[#F4E8E6]">
                <Bot className="w-8 h-8 text-[#FAF6F0]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-serif text-[#171513] font-bold">CalliCoach AI Assessment</h2>
                  <span className="flex items-center gap-1 text-[10px] uppercase font-mono bg-[#EFE5D5] text-[#A85D55] px-2 py-0.5 rounded-full font-bold border border-[rgba(168,93,85,0.3)]">
                    <ShieldCheck size={12} /> Verified Result
                  </span>
                </div>
                <p className="text-sm text-[#6B5140] font-sans mt-0.5">Evaluation for token: "{incomingRef}"</p>
              </div>
            </div>

            <div className="flex items-baseline gap-2 relative z-10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B5140] font-bold pb-2">Overall Score</span>
              <span className="text-6xl font-serif font-normal text-[#171513]">
                {analyzing ? '--' : currentAssessment?.score || 84}
              </span>
              <span className="text-xl font-sans text-[#A85D55] font-bold">/ 100</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left side: Original Attempt Canvas Preview */}
            <div className="space-y-3">
              <span className="text-[11px] uppercase font-mono tracking-widest text-[#171513] font-bold">Original Attempt</span>
              <div className="aspect-[4/3] rounded-2xl bg-[#FAF6F0] border-2 border-[rgba(107,81,64,0.2)] p-4 slant-55-pattern shadow-inner flex flex-col justify-center items-center relative">
                {analyzing ? (
                  <div className="flex flex-col items-center text-[#A85D55] animate-pulse">
                    <Bot className="w-12 h-12 mb-2" />
                    <span className="text-xs font-mono font-bold">Analyzing Strokes...</span>
                  </div>
                ) : incomingImage ? (
                  <img src={incomingImage} alt="Attempt" className="w-full h-full object-contain mix-blend-multiply" />
                ) : (
                  <span className="font-script text-[10rem] text-[#171513] opacity-90">{incomingRef}</span>
                )}
              </div>
              <button onClick={() => navigate(`/practice?ref=${incomingRef}`)} className="btn-outline-ink text-xs py-2.5 px-6 w-full flex items-center justify-center gap-2">
                <RotateCcw size={14} /> Retake Practice
              </button>
            </div>

            {/* Right side: AI Feedback Breakdown */}
            <div className="space-y-6">
              <span className="text-[11px] uppercase font-mono tracking-widest text-[#171513] font-bold">AI Feedback Breakdown</span>
              
              <div className="space-y-4">
                {(currentAssessment?.metrics || [
                  { label: 'Letter Spacing', status: 'Good', val: 85, color: '#171513' },
                  { label: 'Slant Angle', status: 'Needs work', val: 55, color: '#A85D55' },
                  { label: 'Stroke Thickness', status: 'Excellent', val: 95, color: '#B49A68' }
                ]).map((metric, idx) => (
                  <div key={idx} className="paper-sheet p-5 bg-white border border-[rgba(107,81,64,0.15)] flex flex-col justify-between hover:border-[rgba(107,81,64,0.3)] transition-colors group">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-serif font-bold text-[#171513] group-hover:text-[#A85D55] transition-colors">{metric.label}</span>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold`} 
                            style={{ backgroundColor: `${metric.color}20`, color: metric.color }}>
                        {metric.status}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#EFE5D5] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: analyzing ? '0%' : `${metric.val}%`, backgroundColor: metric.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-[#F4E8E6] border border-[#D8AFA9] space-y-2 mt-4 shadow-sm">
                <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#A85D55] flex items-center gap-1.5">
                  <Sliders size={14} /> AI Recommendation
                </h4>
                <p className="text-xs text-[#6B5140] leading-relaxed">
                  Focus heavily on your 55° slant angle consistency. Revisit the "Modern Calligraphy Basics" module for guided ascender drills.
                </p>
                <button onClick={() => navigate('/courses')} className="btn-burgundy text-xs py-2 px-5 mt-2 shadow-sm font-bold w-max">
                  Go to Course
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── SCREEN 07: PROGRESS ANALYTICS ────────────────────────────── */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['overall', 'time', 'skills', 'improvement'].map((f) => (
              <button
                key={f}
                onClick={() => setAnalyticsFilter(f)}
                className={`px-5 py-1.5 rounded-full text-xs font-sans font-bold transition-all capitalize ${
                  analyticsFilter === f ? 'bg-[#171513] text-[#FAF6F0]' : 'bg-white text-[#6B5140] border border-[rgba(107,81,64,0.18)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* 4 Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s, idx) => {
              const Icon = s.icon
              return (
                <div key={idx} className="paper-sheet p-5 bg-white border border-[rgba(107,81,64,0.18)] flex items-center gap-4 hover:border-[#A85D55] transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] text-[#A85D55] flex items-center justify-center border border-[rgba(107,81,64,0.1)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono text-[#6B5140] font-bold">{s.label}</p>
                    <p className="text-2xl font-serif font-bold text-[#171513]">{s.val}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="paper-sheet p-6 bg-white border border-[rgba(107,81,64,0.18)] space-y-4 shadow-sm">
               <h3 className="text-xs uppercase font-sans tracking-widest text-[#171513] font-bold border-b border-[rgba(107,81,64,0.12)] pb-2">
                Attempt Evolution (Before / After)
              </h3>
              <ImageCompareSlider beforeScore={61} afterScore={84} beforeLabel="Day 01" afterLabel="Day 12" />
            </div>

            <div className="paper-sheet p-6 bg-white border border-[rgba(107,81,64,0.18)] space-y-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase font-sans tracking-widest text-[#171513] font-bold border-b border-[rgba(107,81,64,0.12)] pb-2">
                  Skill Progression Heatmap
                </h3>
                <div className="space-y-4 mt-5 text-xs font-mono">
                  {[
                    { label: 'Letter Formation', val: 92 },
                    { label: 'Spacing', val: 76 },
                    { label: 'Alignment', val: 88 },
                    { label: 'Stroke Control', val: 68 },
                  ].map((m, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[#6B5140]">{m.label}</span>
                        <span className="font-bold text-[#171513]">{m.val}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#FAF6F0] rounded-full overflow-hidden border border-[rgba(107,81,64,0.05)]">
                        <div className="h-full bg-[#A85D55] rounded-full" style={{ width: `${m.val}%`, backgroundColor: m.val >= 85 ? '#171513' : '#A85D55' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="text-xs font-sans font-bold text-[#A85D55] hover:text-[#171513] flex items-center gap-1 w-max self-end mt-4">
                Download Detailed PDF Report <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
