import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  CheckCircle2, 
  Play, 
  Paintbrush, 
  ArrowRight,
  Clock,
  Check,
  ChevronRight,
  BookOpen,
  Sliders,
  Volume2
} from 'lucide-react'
import InkStroke from '../../components/common/InkStroke'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

export default function LessonView() {
  const { idOrSlug } = useParams()
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  
  const [activeStep, setActiveStep] = useState('downstrokes')
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)

  const lessonSteps = [
    { id: 'intro', label: 'Introduction' },
    { id: 'upstrokes', label: 'Upstrokes (Hairlines)' },
    { id: 'downstrokes', label: 'Downstrokes (Shaded)' },
    { id: 'curves', label: 'Compound Curves' },
    { id: 'loops', label: 'Oval Loops' },
    { id: 'task', label: 'Practice Task' },
    { id: 'quiz', label: 'Knowledge Check' },
  ]

  const learningChecklist = [
    'Understand fundamental stroke geometry',
    'Control pen pressure transitions',
    'Create consistent 55° diagonal lines',
    'Build involuntary muscle memory'
  ]

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(`/api/lessons/${idOrSlug}`)
        setLesson(res.data)
      } catch {
        // Fallback default lesson
        setLesson({
          title: 'Basic Strokes & Pressure Control',
          level: 'Beginner',
          module: 'Module 01: Foundations',
          targetRef: '|'
        })
      } finally {
        setLoading(false)
      }
    }
    fetchLesson()
  }, [idOrSlug])

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto select-none">
      
      {/* Top Breadcrumb Nav */}
      <div className="flex items-center justify-between text-xs text-[#6B5140] pb-2 border-b border-[rgba(107,81,64,0.12)]">
        <Link to="/courses" className="inline-flex items-center gap-1.5 hover:text-[#171513] font-medium">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Learning Paths
        </Link>
        <span className="font-mono text-[11px] text-[#A85D55] font-bold">
          Beginner • Lesson 01
        </span>
      </div>

      {/* ── 3-Column Digital Calligraphy Workbook (Matching Screen #5) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (3 Cols): Workbook Index Navigation */}
        <div className="lg:col-span-3 paper-sheet p-5 space-y-4 bg-white border border-[rgba(107,81,64,0.16)]">
          <div className="border-b border-[rgba(107,81,64,0.12)] pb-3">
            <h3 className="text-xs uppercase font-sans tracking-widest text-[#171513] font-bold">
              Lesson Contents
            </h3>
            <p className="text-[10px] text-[#6B5140] font-sans">Module 01: Basic Strokes</p>
          </div>

          <nav className="space-y-1">
            {lessonSteps.map((step) => {
              const active = activeStep === step.id
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans font-medium transition-all flex items-center justify-between ${
                    active
                      ? 'bg-[#171513] text-[#FAF6F0] font-bold shadow-xs'
                      : 'text-[#6B5140] hover:bg-[#FAF6F0] hover:text-[#171513]'
                  }`}
                >
                  <span className="truncate">{step.label}</span>
                  {active && <Check className="w-3 h-3 text-[#A85D55]" />}
                </button>
              )
            })}
          </nav>

          <div className="pt-3 border-t border-[rgba(107,81,64,0.1)]">
            <Link
              to="/practice?ref=|"
              className="w-full btn-outline-ink text-xs py-2 flex items-center justify-center gap-1.5"
            >
              <Paintbrush className="w-3 h-3 text-[#A85D55]" />
              <span>Launch Canvas</span>
            </Link>
          </div>
        </div>

        {/* Center Column (6 Cols): Main Workbook Demonstration Sheet */}
        <div className="lg:col-span-6 paper-sheet p-6 sm:p-8 space-y-6 bg-[#FAF6F0] border border-[rgba(107,81,64,0.18)] shadow-md">
          
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A85D55] font-bold">
              Foundational Technique
            </span>
            <h1 className="text-3xl font-serif text-[#171513] font-normal">
              Basic Strokes & Pressure Control
            </h1>
          </div>

          {/* Master Video / Pen Grip Demonstration Artwork Card */}
          <div className="relative aspect-[16/10] rounded-2xl bg-[#171513] text-[#FAF6F0] p-6 flex flex-col justify-between overflow-hidden shadow-inner group">
            {/* Subtle botanical backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#171513] via-[#302B27] to-[#6B5140]/30 opacity-90" />

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#C4B5A5]">
              <span>PEN ANGLE: 45°</span>
              <span className="text-[#A85D55] font-bold">HD DEMO</span>
            </div>

            {/* Simulated Pen Grip & Calligraphy Stroke Visual */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform cursor-pointer shadow-lg">
                <Play className="w-6 h-6 fill-white text-white ml-0.5" />
              </div>
              <p className="text-xs font-serif italic text-[#FAF6F0]">
                "Hold pen at 45° relative to the paper baseline"
              </p>
            </div>

            <div className="relative z-10 flex justify-between text-[10px] font-mono text-[#C4B5A5]">
              <span>Downward stroke: Exhale & press</span>
              <span>Hairline: Feather touch</span>
            </div>
          </div>

          {/* "Try These Strokes" Practice Drill Card */}
          <div className="p-5 rounded-2xl bg-white border border-[rgba(107,81,64,0.15)] space-y-3">
            <div className="flex items-center justify-between border-b border-[rgba(107,81,64,0.1)] pb-2">
              <h4 className="text-xs font-serif font-bold text-[#171513]">
                Try These Foundational Strokes:
              </h4>
              <span className="text-[10px] font-mono text-[#A85D55]">55° Slant Lines</span>
            </div>

            {/* Strokes Specimen Render */}
            <div className="flex items-center justify-around py-3 font-serif text-3xl text-[#171513] select-none slant-55-pattern rounded-xl bg-[#FAF6F0] p-3 border border-[rgba(107,81,64,0.1)]">
              <span className="font-light">/</span>
              <span className="font-black text-4xl">|</span>
              <span className="font-light">/</span>
              <span className="font-black text-4xl">|</span>
              <span className="font-light">/</span>
              <span className="font-black text-4xl">|</span>
            </div>

            <p className="text-[11px] text-[#6B5140] font-sans leading-relaxed">
              Alternate between feather-light upward hairlines (/) and slow deliberate downward shaded strokes (|). Keep the distance between each stroke uniform.
            </p>
          </div>

          {/* Workbook Footer Note */}
          <div className="pt-2 border-t border-[rgba(107,81,64,0.12)] flex items-center justify-between text-xs text-[#6B5140]">
            <p className="font-serif italic">
              "Practice makes permanent. Keep your strokes light and consistent."
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => toast.success('Beginning previous stroke drill')}
                className="btn-outline-ink text-[11px] py-1 px-3"
              >
                Previous
              </button>
              <button 
                onClick={() => toast.success('Advanced to next stroke drill')}
                className="btn-ink text-[11px] py-1 px-3"
              >
                Next
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (3 Cols): Checklist & Practice Task Launcher */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* "What You'll Learn" Card */}
          <div className="paper-sheet p-5 space-y-3 bg-white border border-[rgba(107,81,64,0.16)]">
            <h3 className="text-xs uppercase font-sans tracking-widest text-[#171513] font-bold border-b border-[rgba(107,81,64,0.1)] pb-2">
              What You'll Learn
            </h3>

            <ul className="space-y-2.5 text-xs text-[#6B5140] font-sans">
              {learningChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A85D55] shrink-0 mt-0.5" />
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Practice Task Launcher */}
          <div className="paper-sheet p-5 space-y-4 bg-gradient-to-br from-[#F4E8E6] to-[#FAF6F0] border border-[#D8AFA9]">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#A85D55] font-bold">
                Assigned Workbook Task
              </span>
              <h4 className="text-sm font-serif font-bold text-[#171513]">
                10-Minute Downstroke Drill
              </h4>
              <p className="text-[11px] text-[#6B5140] leading-snug">
                Draw 20 alternating hairlines and shaded downstrokes in the Practice Lab. Submit for AI slant and pressure scoring.
              </p>
            </div>

            <button
              onClick={() => navigate('/practice?ref=|')}
              className="w-full btn-burgundy text-xs py-2.5 flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Open in Practice Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}
