import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Sparkles, 
  Flame, 
  Clock, 
  Compass, 
  ArrowUpRight, 
  BookOpen, 
  Play, 
  FileText, 
  Download,
  Share2,
  Bookmark,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quoteIdx, setQuoteIdx] = useState(0)

  // Hardcoded premium quotes for Calligraphy reveal
  const quotes = [
    { text: "Art is the trace of a soul.", author: "Traditional Proverb" },
    { text: "Patience and practice create perfection.", author: "Edward Johnston" },
    { text: "Letters are things, not pictures of things.", author: "Eric Gill" },
    { text: "The stroke of a pen is a stroke of a heart.", author: "Aesthetic Script" }
  ]

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('/api/recommendations')
        setRecommendations(res.data)
      } catch (err) {
        toast.error('Failed to load personalized recommendations')
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()

    // Pick a daily quote based on the day
    const day = new Date().getDate()
    setQuoteIdx(day % quotes.length)
  }, [])

  const currentQuote = quotes[quoteIdx]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100">
            Welcome back, <span className="gradient-text font-serif italic">{user?.name}</span> ✨
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Ready to craft some beautiful letters today?
          </p>
        </div>

        {/* Streaks and XP badges */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-amber-950/30 border border-amber-500/20 shadow-gold">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500/10 animate-bounce" />
            <div>
              <p className="text-xs text-neutral-400 font-medium">Streak</p>
              <p className="text-sm font-semibold text-amber-400">4 Days Active</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-900 border border-amber-900/20">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-xs text-neutral-400 font-medium">Progress Level</p>
              <p className="text-sm font-semibold text-neutral-200 capitalize">{user?.skillLevel || 'Beginner'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Daily Inspirational Calligraphy Card */}
          <div className="quote-card hover-glow transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.08),transparent_70%)]" />
            <div className="relative space-y-6">
              <span className="badge mx-auto select-none uppercase tracking-widest text-[9px]">Daily Inspirational Card</span>
              <h2 className="text-4xl md:text-5xl font-script text-amber-200 py-4 leading-normal leading-[1.3] animate-glow select-none">
                "{currentQuote.text}"
              </h2>
              <p className="text-sm text-amber-500/80 font-display font-medium tracking-wide">
                — {currentQuote.author}
              </p>
              
              <div className="divider opacity-30 max-w-xs mx-auto" />
              
              <div className="flex items-center justify-center gap-3">
                <button 
                  onClick={() => toast.success('Artwork saved successfully!')}
                  className="p-2 rounded-full hover:bg-amber-500/10 text-neutral-400 hover:text-amber-400 border border-neutral-800 transition-all duration-300"
                  title="Save Design"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(currentQuote.text)
                    toast.success('Quote copied to clipboard!')
                  }}
                  className="p-2 rounded-full hover:bg-amber-500/10 text-neutral-400 hover:text-amber-400 border border-neutral-800 transition-all duration-300"
                  title="Share Art Card"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="section-title">Quick Studio Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/canvas" className="p-5 rounded-2xl bg-neutral-900 border border-amber-900/15 hover:border-amber-500/40 hover:bg-neutral-900/80 transition-all duration-300 flex flex-col justify-between h-36 relative group overflow-hidden">
                <div className="absolute right-3 top-3 p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div className="pt-8">
                  <h3 className="text-base font-semibold font-display text-neutral-200">Open Canvas</h3>
                  <p className="text-xs text-neutral-400 mt-1">Start drawing calligraphy strokes</p>
                </div>
              </Link>

              <Link to="/practice" className="p-5 rounded-2xl bg-neutral-900 border border-amber-900/15 hover:border-amber-500/40 hover:bg-neutral-900/80 transition-all duration-300 flex flex-col justify-between h-36 relative group overflow-hidden">
                <div className="absolute right-3 top-3 p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="pt-8">
                  <h3 className="text-base font-semibold font-display text-neutral-200">Practice Mode</h3>
                  <p className="text-xs text-neutral-400 mt-1">Guided trace & stroke practices</p>
                </div>
              </Link>

              <Link to="/fonts" className="p-5 rounded-2xl bg-neutral-900 border border-amber-900/15 hover:border-amber-500/40 hover:bg-neutral-900/80 transition-all duration-300 flex flex-col justify-between h-36 relative group overflow-hidden">
                <div className="absolute right-3 top-3 p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="pt-8">
                  <h3 className="text-base font-semibold font-display text-neutral-200">Style Preview</h3>
                  <p className="text-xs text-neutral-400 mt-1">Test aesthetic font styling instantly</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recommended Tutorials */}
          <div className="space-y-4">
            <h2 className="section-title">Recommended Practice & Lessons</h2>
            {loading ? (
              <div className="h-28 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations?.tutorials.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl border border-amber-900/10 bg-neutral-900/40 flex items-center justify-between hover-glow transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Play className="w-4 h-4 fill-amber-400/10" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold font-display text-neutral-200">{t.title}</h4>
                        <p className="text-xs text-neutral-400 mt-0.5">{t.duration} • Style: {t.style}</p>
                      </div>
                    </div>
                    <Link to="/practice" className="p-2 rounded-lg bg-neutral-850 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 transition-all duration-300">
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-8">
          
          {/* Daily Challenge Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-amber-950/20 border border-amber-500/20 space-y-4 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-500/5 rounded-full filter blur-xl" />
            <div className="flex items-center gap-2 text-amber-400">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="text-xs uppercase font-mono tracking-widest font-semibold">Daily Challenge</span>
            </div>
            <h3 className="text-lg font-semibold font-display text-neutral-200">
              {recommendations?.dailyChallenge || 'Practice traditional curves!'}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Complete today's challenge to keep your daily streak alive and unlock custom premium calligraphy brushes.
            </p>
            <Link to="/practice" className="w-full btn btn-primary btn-sm flex items-center justify-center gap-1">
              Start Challenge <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* AI Stroke Analysis Quick Portal */}
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-amber-900/10 space-y-4">
            <div className="flex items-center gap-2 text-amber-500">
              <Cpu className="w-5 h-5" />
              <h3 className="text-sm font-semibold uppercase tracking-wider font-mono">AI Practice Analyzer</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Upload a snapshot of your handwritten paper letters. The AI analyzer will instantly compute stroke alignment, pressure consistency, and letter slanting guides.
            </p>
            <Link to="/progress" className="w-full btn btn-outline btn-sm flex items-center justify-center gap-1 hover:border-amber-500/30 hover:text-amber-400">
              Go To Analyzer <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Premium Brush Recommendations */}
          <div className="p-6 rounded-2xl bg-neutral-900/30 border border-amber-900/10 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-neutral-200">Recommended Brushes</h3>
            <div className="space-y-3">
              {recommendations?.brushes.map((b, idx) => (
                <div key={idx} className="flex justify-between items-center pb-2 border-b border-amber-900/5 last:border-b-0 last:pb-0">
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-200">{b.name}</h4>
                    <p className="text-[10px] text-amber-600 uppercase tracking-widest mt-0.5">{b.bestFor.join(', ')}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono capitalize">
                    {b.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
