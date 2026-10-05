import { useState } from 'react'
import { Sparkles, BookOpen, Star, Award, Sliders, CheckCircle2, Play, MousePointer } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Practice() {
  const [selectedLesson, setSelectedLesson] = useState(1)
  const [traceLetter, setTraceLetter] = useState('A')
  const [practiceStatus, setPracticeStatus] = useState('idle') // idle, tracing, completed

  const lessons = [
    { id: 1, title: "Fundamentals of Brush Slanting", category: "Beginner", difficulty: "Easy", duration: "10 mins", description: "Master basic strokes, pen angle alignment, and downward pressure consistency." },
    { id: 2, title: "Gothic Alphabet Tracing", category: "Intermediate", difficulty: "Medium", duration: "15 mins", description: "Learn heavy gothic brush letters with step-by-step structural guidelines." },
    { id: 3, title: "Modern Script Capital Flourishes", category: "Advanced", difficulty: "Hard", duration: "25 mins", description: "Add dramatic beautiful loops, wedding invitation flourishes, and signatures." },
  ]

  const letters = ['A', 'B', 'C', 'D', 'G', 'K', 'S', 'Z']

  const handleCompletePractice = () => {
    setPracticeStatus('completed')
    toast.success('Awesome work! Daily streak updated. +50 XP!')
  }

  const handleReset = () => {
    setPracticeStatus('idle')
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100 flex items-center gap-2">
            Trace & Practice Mode <BookOpen className="w-5 h-5 text-amber-500 fill-amber-500/10" />
          </h1>
          <p className="text-xs text-neutral-400">Interactive step-by-step stroke tracing system. Match pen width and alignment to traditional templates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side - Lesson Track */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-neutral-200">Interactive Lessons</h3>
          
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setSelectedLesson(lesson.id)
                  handleReset()
                }}
                className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-4 relative overflow-hidden ${
                  selectedLesson === lesson.id 
                    ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-gold' 
                    : 'border-amber-900/15 bg-neutral-900/40 text-neutral-300 hover:border-amber-500/30'
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-mono tracking-widest font-semibold uppercase">
                    {lesson.category}
                  </span>
                  <span className="text-xs text-neutral-500">{lesson.duration}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-semibold font-display text-neutral-200">{lesson.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-1">{lesson.description}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-amber-500/90 font-mono">
                  <Sliders className="w-3.5 h-3.5" /> Difficulty: {lesson.difficulty}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Middle/Right Side - Guided Tracing Board */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-900/15 space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
              <div>
                <h3 className="text-base font-semibold font-display text-neutral-200">
                  {selectedLesson === 1 && "Basic Stroke Tracing"}
                  {selectedLesson === 2 && "Blackletter Alphabet Tracing"}
                  {selectedLesson === 3 && "Flourishes Practice"}
                </h3>
                <p className="text-xs text-neutral-400">Trace inside the illuminated guides below.</p>
              </div>

              {/* Letter selector */}
              {selectedLesson === 2 && (
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {letters.map((char) => (
                    <button
                      key={char}
                      onClick={() => {
                        setTraceLetter(char)
                        handleReset()
                      }}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold border transition-all ${
                        traceLetter === char 
                          ? 'border-amber-500 bg-amber-500/15 text-amber-400' 
                          : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {char}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tracing Canvas Box Simulator */}
            <div className="relative aspect-[16/10] w-full rounded-2xl bg-[#EDE5D5] border-2 border-amber-900/20 overflow-hidden flex items-center justify-center select-none shadow-2xl">
              
              {/* Slant guidelines */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 30px, #000 31px, #000 33px)',
                  backgroundSize: '100% 100%'
                }}
              />

              {/* Spacing grids */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Big tracing character background helper */}
              <div className="absolute inset-0 flex items-center justify-center text-center">
                {selectedLesson === 1 && (
                  <span className="text-[12rem] font-fell text-neutral-600/15 italic rotate-12">/</span>
                )}
                {selectedLesson === 2 && (
                  <span className="text-[13rem] font-fell text-neutral-600/15 uppercase font-bold tracking-widest leading-none">
                    {traceLetter}
                  </span>
                )}
                {selectedLesson === 3 && (
                  <span className="text-[11rem] font-script text-neutral-600/15 italic">S</span>
                )}
              </div>

              {/* Status alerts */}
              {practiceStatus === 'completed' ? (
                <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-4 text-center p-6">
                  <Award className="w-16 h-16 text-amber-400 animate-bounce" />
                  <div>
                    <h3 className="text-xl font-bold font-display text-neutral-100">Practice Completed!</h3>
                    <p className="text-sm text-neutral-400 mt-1 max-w-sm">You did an outstanding job matching stroke pressure. Slant alignment: 94%</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleReset} className="btn btn-ghost btn-sm">Try Again</button>
                    <button className="btn btn-primary btn-sm">Next Lesson</button>
                  </div>
                </div>
              ) : (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-neutral-950/90 border border-amber-500/20 px-4 py-2.5 rounded-xl z-10 flex items-center gap-3 text-xs text-neutral-300">
                  <MousePointer className="w-4 h-4 text-amber-500 animate-pulse" />
                  Drag mouse or stylus on paper to start tracing guides
                </div>
              )}

              {/* Draw simulation brush trigger */}
              <div 
                className="absolute inset-0 cursor-crosshair z-0" 
                onMouseDown={() => {
                  if (practiceStatus === 'idle') {
                    setPracticeStatus('tracing')
                    setTimeout(() => {
                      handleCompletePractice()
                    }, 2500)
                  }
                }}
              />
            </div>

            {/* Tracing Instructions details */}
            <div className="p-4 rounded-xl bg-neutral-950/50 border border-amber-950/20 space-y-2">
              <h4 className="text-xs uppercase font-mono tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Lesson Tracing Instructions
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                1. Match pen slant to the red 55 degree diagonal lines.<br/>
                2. Apply heavy downward pressure on the thick shaded strokes.<br/>
                3. Release pressure when gliding upward to keep hairline strokes thin.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}
