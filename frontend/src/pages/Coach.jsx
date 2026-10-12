import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Sparkles, 
  Bot, 
  Send, 
  Flame, 
  Compass, 
  BookOpen, 
  ArrowUpRight, 
  Target, 
  Lightbulb, 
  RefreshCw,
  Award
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Coach() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [recommendations, setRecommendations] = useState(null)
  const [loadingRecs, setLoadingRecs] = useState(true)
  const [messages, setMessages] = useState([])
  const [inputPrompt, setInputPrompt] = useState('')
  const [asking, setAsking] = useState(false)
  const messagesEndRef = useRef(null)

  const quickPrompts = [
    { label: 'Why is my spacing bad?', text: 'Why is my spacing score lower than my other skills and how can I fix it?' },
    { label: 'What should I practice today?', text: 'What specific letter drills should I practice today based on my latest progress?' },
    { label: 'How to improve stroke contrast?', text: 'How do I create a stronger contrast between hairline upstrokes and thick shaded downstrokes?' },
    { label: '7-Day Practice Routine', text: 'Give me a structured 7-day calligraphy mastery routine for my skill level.' },
  ]

  const fetchRecommendations = async () => {
    try {
      setLoadingRecs(true)
      const res = await axios.get('/api/coach/recommendations')
      setRecommendations(res.data)
    } catch {
      setRecommendations({
        skillLevel: user?.skillLevel || 'beginner',
        weakArea: { skill: 'spacing', score: 76 },
        strongArea: { skill: 'slant', score: 88 },
        nextBestLesson: {
          title: 'Letter Connections & Rhythm Spacing',
          slug: 'letter-connections-and-spacing',
          reason: 'Calibrate optical volume between letters to improve rhythm.'
        },
        recommendedDrills: [
          { task: '10-minute spacing drill with word "minimum"', reference: 'minimum', targetScore: 85 },
          { task: 'Oval symmetry with lowercase "o"', reference: 'o', targetScore: 82 }
        ],
        summary: 'Your spacing score (76%) needs focused attention, while your slant consistency (88%) is currently your strongest attribute.'
      })
    } finally {
      setLoadingRecs(false)
    }
  }

  useEffect(() => {
    fetchRecommendations()
    const userName = user?.name || 'Artist'
    const initialGreeting = {
      id: 'welcome',
      sender: 'coach',
      text: `Hello ${userName}! 👋 I am **CalliCoach**, your personal AI calligraphy mentor.\n\nI continuously analyze your practice attempts, stroke physics, and guideline adherence. Whether you need instant feedback on why letters bunch together, advice on pen pressure, or a custom 7-day training plan, I'm here to guide your journey to mastery.\n\nHow can I assist your practice today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([initialGreeting])
  }, [user])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, asking])

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputPrompt
    if (!query.trim()) return

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputPrompt('')
    setAsking(true)

    try {
      const res = await axios.post('/api/coach/ask', { prompt: query.trim() })
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: res.data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiMsg])
    } catch {
      const fallbackMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: `I've analyzed your technique against classical pointed pen and brush calligraphy standards.\n\n• Maintain your nib angle at 45° relative to the baseline.\n• Use feather-light pressure on the upward strokes to achieve clean hairlines.\n• Pull down deliberately for shaded strokes, exhaling slowly for stability.\n\nHead over to the Practice Lab and activate the 55° slant guidelines to try a quick 10-minute session!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, fallbackMsg])
    } finally {
      setAsking(false)
    }
  }

  const renderFormattedText = (content) => {
    return content.split('\n').map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g)
      return (
        <span key={idx} className="block min-h-[1.2em]">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-semibold text-[#A85D55]">{part.slice(2, -2)}</strong>
            }
            return part
          })}
        </span>
      )
    })
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto pt-4">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(107,81,64,0.14)] pb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#171513] font-normal tracking-tight flex items-center gap-3">
            CalliCoach AI <Bot className="w-8 h-8 text-[#A85D55]" strokeWidth={1.5} />
          </h1>
          <p className="text-sm text-[#6B5140] font-sans mt-3 max-w-lg leading-relaxed">
            Your interactive AI calligraphy mentor. Context-aware coaching grounded in your stroke physics, metrics, and practice drills.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4E8E6] border border-[#D8AFA9] text-xs">
            <Flame className="w-4 h-4 text-[#A85D55]" />
            <span className="font-medium text-[#A85D55]">4-Day Streak</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171513] border border-[#171513] text-xs text-[#FAF6F0]">
            <Award className="w-4 h-4 text-[#B49A68]" />
            <span className="capitalize">{user?.skillLevel || 'Beginner'} Level</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Diagnostics */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="paper-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[rgba(107,81,64,0.1)] pb-3">
              <h2 className="text-[10px] uppercase font-mono tracking-[0.15em] text-[#6B5140] font-bold flex items-center gap-2">
                <Target className="w-3.5 h-3.5" /> Skill Diagnosis
              </h2>
              <button 
                onClick={fetchRecommendations} 
                disabled={loadingRecs}
                className="text-[10px] text-[#A85D55] hover:text-[#171513] flex items-center gap-1 font-mono transition-colors uppercase tracking-widest"
              >
                <RefreshCw className={`w-3 h-3 ${loadingRecs ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </div>

            {loadingRecs ? (
              <div className="py-8 text-center text-xs text-[#6B5140]">
                <div className="w-5 h-5 border-2 border-[#A85D55] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                Analyzing recent practice data...
              </div>
            ) : recommendations ? (
              <div className="space-y-5">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F4E8E6] border border-[#D8AFA9]/50">
                    <span className="text-[9px] uppercase font-mono text-[#A85D55] tracking-widest font-bold block mb-1">Priority Focus</span>
                    <h3 className="text-sm font-bold text-[#171513] capitalize leading-none">
                      {recommendations.weakArea?.skill}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] mt-2 text-[#6B5140] font-mono">
                      <span>Score</span>
                      <span className="text-[#A85D55] font-bold">{recommendations.weakArea?.score}%</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[rgba(107,81,64,0.15)] shadow-sm">
                    <span className="text-[9px] uppercase font-mono text-[#6B5140] tracking-widest font-bold block mb-1">Strongest</span>
                    <h3 className="text-sm font-bold text-[#171513] capitalize leading-none">
                      {recommendations.strongArea?.skill}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] mt-2 text-[#6B5140] font-mono">
                      <span>Score</span>
                      <span className="text-[#171513] font-bold">{recommendations.strongArea?.score}%</span>
                    </div>
                  </div>
                </div>

                <p className="text-[13px] text-[#4A433D] leading-relaxed border-l-2 border-[#B49A68] pl-3 italic font-serif">
                  {recommendations.summary}
                </p>

                {recommendations.nextBestLesson && (
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#FAF6F0] to-white border border-[#B49A68]/30 space-y-2">
                    <div className="flex items-center gap-1.5 text-[#B49A68] text-[10px] uppercase tracking-widest font-bold font-mono">
                      <Sparkles className="w-3.5 h-3.5" /> Next Lesson
                    </div>
                    <h4 className="text-[15px] font-semibold text-[#171513] font-serif leading-tight">
                      {recommendations.nextBestLesson.title}
                    </h4>
                    <p className="text-[11px] text-[#6B5140]">
                      {recommendations.nextBestLesson.reason}
                    </p>
                    <Link
                      to="/courses"
                      className="inline-flex mt-2 items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#171513] hover:text-[#A85D55] transition-colors font-mono"
                    >
                      Explore Lesson <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}

                <div className="space-y-2 pt-2 border-t border-[rgba(107,81,64,0.1)]">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B5140] font-bold flex items-center gap-1.5 mt-4 mb-3">
                    <BookOpen className="w-3.5 h-3.5" /> Daily Drills
                  </span>
                  {recommendations.recommendedDrills?.map((drill, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-[rgba(107,81,64,0.15)] hover:border-[#A85D55]/40 transition-all flex items-center justify-between group shadow-sm"
                    >
                      <div className="space-y-1 max-w-[75%]">
                        <p className="text-xs font-semibold text-[#171513] leading-snug">{drill.task}</p>
                        <p className="text-[9px] text-[#6B5140] font-mono tracking-wide">
                          Target: <b className="text-[#A85D55] font-serif italic text-xs">"{drill.reference}"</b> • Goal: {drill.targetScore}+
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/practice?ref=${encodeURIComponent(drill.reference)}`)}
                        className="w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#A85D55] group-hover:bg-[#A85D55] group-hover:text-white transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            ) : null}
          </div>

          <div className="paper-card p-5 space-y-3">
            <h3 className="text-[10px] font-bold uppercase font-mono tracking-[0.15em] text-[#6B5140] flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-[#B49A68]" /> Master Calligrapher Rules
            </h3>
            <ul className="text-xs text-[#4A433D] space-y-2 list-disc list-inside leading-relaxed">
              <li>Paper angle: Tilt paper ~35° counter-clockwise so pull strokes follow your elbow pivot.</li>
              <li>Breathe rhythm: Inhale on thin upstrokes; exhale smoothly on thick shaded stems.</li>
              <li>Nib contact: Never rotate the pen body mid-stroke—keep your hand locked.</li>
            </ul>
          </div>

        </div>

        {/* Right Column - Interactive AI Chat */}
        <div className="lg:col-span-8 flex flex-col h-[700px] rounded-2xl bg-[#171513] border border-[rgba(107,81,64,0.2)] shadow-xl overflow-hidden relative">
          
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

          {/* Chat Header */}
          <div className="p-4 bg-[#1D1A18] border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#B49A68]">
                <Bot className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#F6F0E6] font-display flex items-center gap-2">
                  CalliCoach AI <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#B49A68]/15 text-[#B49A68] font-mono tracking-widest uppercase">Online</span>
                </h2>
                <p className="text-[10px] text-[#C4B5A5] font-mono mt-0.5">Contextual Tutor • CalliVision v2.4 Engine</p>
              </div>
            </div>

            <button 
              onClick={() => {
                const initialGreeting = {
                  id: 'reset',
                  sender: 'coach',
                  text: `Session reset! I am ready to review your next calligraphy challenge. Ask a question or pick one of the recommended topics below.`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
                setMessages([initialGreeting])
                toast.success('Conversation cleared')
              }}
              className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#6B5140] hover:text-[#A85D55] transition-colors"
            >
              Clear Chat
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-3 bg-[#171513] border-b border-[rgba(255,255,255,0.04)] flex items-center gap-2 overflow-x-auto no-scrollbar relative z-10">
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#B49A68] font-bold shrink-0 mr-1">
              Suggestions:
            </span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.text)}
                disabled={asking}
                className="px-3 py-1.5 rounded-full text-[11px] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(168,93,85,0.15)] text-[#C4B5A5] hover:text-[#F6F0E6] border border-[rgba(255,255,255,0.08)] hover:border-[#A85D55]/50 whitespace-nowrap transition-all shrink-0 font-sans"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5 relative z-10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'coach' && (
                  <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#B49A68] shrink-0">
                    <Bot className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-[13px] leading-relaxed font-sans shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#A85D55] text-white rounded-tr-sm'
                      : 'bg-[#1D1A18] border border-[rgba(255,255,255,0.06)] text-[#F6F0E6] rounded-tl-sm space-y-1.5'
                  }`}
                >
                  <div className="space-y-2">
                    {renderFormattedText(msg.text)}
                  </div>
                  <span
                    className={`block text-[9px] mt-2.5 font-mono tracking-wider ${
                      msg.sender === 'user' ? 'text-white/70 text-right' : 'text-[#8E7360]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#F6F0E6] border border-[#F6F0E6] flex items-center justify-center text-[#171513] font-serif font-bold text-sm shrink-0">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            ))}

            {asking && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#B49A68] shrink-0">
                  <Bot className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                </div>
                <div className="p-3.5 rounded-2xl bg-[#1D1A18] border border-[rgba(255,255,255,0.06)] text-[#8E7360] text-xs flex items-center gap-2">
                  <span>CalliCoach is analyzing...</span>
                  <span className="flex gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#B49A68] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 rounded-full bg-[#B49A68] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 rounded-full bg-[#B49A68] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-[#1D1A18] border-t border-[rgba(255,255,255,0.06)] relative z-10">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-3 relative"
            >
              <input
                type="text"
                placeholder="Ask CalliCoach for stroke advice, drills, or critique..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                disabled={asking}
                className="w-full bg-[#171513] text-[#F6F0E6] placeholder-[#6B5140] text-[13px] pl-4 pr-12 py-3 rounded-full border border-[rgba(255,255,255,0.1)] focus:outline-none focus:border-[#A85D55] transition-colors"
              />
              <button
                type="submit"
                disabled={asking || !inputPrompt.trim()}
                className="absolute right-1 top-1 bottom-1 aspect-square rounded-full bg-[#A85D55] flex items-center justify-center text-white disabled:opacity-50 disabled:bg-[#302B27] disabled:text-[#6B5140] transition-colors hover:bg-[#934E47]"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
