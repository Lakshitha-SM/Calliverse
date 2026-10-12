import { useState, useRef, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { 
  PenTool, 
  Paintbrush, 
  Eraser, 
  Undo2, 
  Redo2, 
  Trash2, 
  Clock, 
  ArrowRight,
  Sliders,
  CheckCircle2,
  Play,
  Pause,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Flame,
  X,
  Target,
  Leaf,
  Info
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

// ── DRILL CATALOG ─────────────────────────────────────────────────────────────
const DRILL_CATALOG = [
  {
    id: 'drill-a',
    target: 'a',
    title: "Lowercase 'a'",
    category: 'Letter Formation',
    difficulty: 'Beginner',
    duration: '10 mins',
    durationSec: 600,
    objective: 'Master the oval enclosure and teardrop entry at consistent 55° slant.',
    tips: 'Begin with a hairline entry stroke, swell on the downstroke, then smoothly connect the exit.'
  },
  {
    id: 'drill-b',
    target: 'b',
    title: "Lowercase 'b'",
    category: 'Ascender Loops',
    difficulty: 'Beginner',
    duration: '12 mins',
    durationSec: 720,
    objective: 'Form an elongated 55° ascender loop transitioning cleanly into the base bowl.',
    tips: 'Keep the ascending loop delicate and light; apply firm pressure only on the main downstroke.'
  },
  {
    id: 'drill-c',
    target: 'c',
    title: "Lowercase 'c'",
    category: 'Letter Formation',
    difficulty: 'Beginner',
    duration: '8 mins',
    durationSec: 480,
    objective: 'Refine the classic teardrop entry terminal and open oval curvature.',
    tips: 'Leave ample internal counter-space for clear legibility and rhythm.'
  },
  {
    id: 'drill-d',
    target: 'd',
    title: "Lowercase 'd'",
    category: 'Ascender Loops',
    difficulty: 'Beginner',
    duration: '10 mins',
    durationSec: 600,
    objective: 'Harmonize an oval letterform with a tall straight ascending stem.',
    tips: 'The ascender should reach the ascender guide line without wavering.'
  },
  {
    id: 'drill-minimum',
    target: 'minimum',
    title: "Word 'minimum'",
    category: 'Spacing & Rhythm',
    difficulty: 'Intermediate',
    duration: '15 mins',
    durationSec: 900,
    objective: 'Achieve exact equal spacing between consecutive downstrokes.',
    tips: 'The ultimate rhythm exercise: every downstroke and counter-space must be identical.'
  },
  {
    id: 'drill-underturn',
    target: 'Underturn',
    title: "Basic Underturn",
    category: 'Basic Strokes',
    difficulty: 'Beginner',
    duration: '8 mins',
    durationSec: 480,
    objective: 'Modulate pressure from a thick downstroke into a hairline upward curve.',
    tips: 'Release pen pressure just before reaching the baseline to curl gracefully upward.'
  },
  {
    id: 'drill-grace',
    target: 'Grace',
    title: "Flourished 'Grace'",
    category: 'Flourishing',
    difficulty: 'Advanced',
    duration: '20 mins',
    durationSec: 1200,
    objective: 'Balance expressive flourishes with foundational letterforms.',
    tips: 'Anchor the word on the baseline before extending soaring loop flourishes.'
  }
]

// ── CHARACTER CATEGORIES ──────────────────────────────────────────────────────
const CHARACTER_CATEGORIES = [
  { id: 'lowercase', label: 'Lowercase', items: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] },
  { id: 'uppercase', label: 'Uppercase', items: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] },
  { id: 'numbers', label: 'Numbers', items: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] },
  { id: 'words', label: 'Words', items: ['minimum', 'calligraphy', 'flourish', 'artisan', 'harmony', 'rhythm', 'grace'] },
  { id: 'basic_strokes', label: 'Basic Strokes', items: ['Underturn', 'Overturn', 'Ascending Loop', 'Descending Loop', 'Compound Curve', 'Oval'] },
  { id: 'connectors', label: 'Connectors', items: ['Entry Stroke', 'Exit Hairline', 'High Connector', 'Crossbar'] },
  { id: 'flourishes', label: 'Flourishes', items: ['Ascender Loop', 'Descender Swash', 'Terminal Sweep', 'Figure-8'] },
]

// ── INK PALETTE ───────────────────────────────────────────────────────────────
const INK_PALETTE = [
  { name: 'Lamp Black', color: '#171513' },
  { name: 'Warm Walnut', color: '#6B5140' },
  { name: 'Terracotta Rose', color: '#A85D55' },
  { name: 'Deep Burgundy', color: '#642F35' },
  { name: 'Antique Gold', color: '#B49A68' },
]

export default function Practice() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()

  // ── Drill & Target State ──
  const initialRef = searchParams.get('ref') || 'a'
  const [selectedDrill, setSelectedDrill] = useState(() => {
    return DRILL_CATALOG.find(d => d.target === initialRef) || DRILL_CATALOG[0]
  })
  const [drillDropdownOpen, setDrillDropdownOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('lowercase')
  const [selectedCharacter, setSelectedCharacter] = useState(initialRef)

  // ── Tool & Ink Settings ──
  const [tool, setTool] = useState('pen') // 'pen' | 'brush' | 'eraser'
  const [brushSize, setBrushSize] = useState(4)
  const [inkColor, setInkColor] = useState('#171513')

  // ── Guide & Reference Settings ──
  const [guidePreset, setGuidePreset] = useState('slant') // 'none' | 'lines' | 'grid' | 'slant' | 'full'
  const [slantGuideActive, setSlantGuideActive] = useState(true)
  const [showReference, setShowReference] = useState(true)
  const [tracingMode, setTracingMode] = useState(false)
  const [referenceOpacity, setReferenceOpacity] = useState(0.25)

  // ── Timer State ── starts paused, auto-starts on first stroke
  const [timerRunning, setTimerRunning] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const timerStartedRef = useRef(false)

  useEffect(() => {
    if (!timerRunning) return
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timerRunning])

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
  }

  // ── Canvas Drawing Engine Refs ──
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef({ x: 0, y: 0, time: 0, pressure: 0.5 })
  const strokeHistoryRef = useRef([])
  const redoHistoryRef = useRef([])
  const [strokeCount, setStrokeCount] = useState(0)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  // ── Dialogs & Assessment State ──
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submissionStep, setSubmissionStep] = useState('') // 'capturing' | 'analyzing' | 'scoring'
  const [assessmentModalData, setAssessmentModalData] = useState(null)
  const [drillInfoOpen, setDrillInfoOpen] = useState(false)

  // Horizontal scroll container ref for character cards
  const charScrollRef = useRef(null)

  // ── Canvas Setup & Responsive Sizing ──
  const canvasReadyRef = useRef(false)

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const rect = parent.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    
    // Preserve existing drawing across resize
    let existingImage = null
    if (canvasReadyRef.current && canvas.width > 0 && canvas.height > 0) {
      try { existingImage = canvas.toDataURL('image/png') } catch (_) {}
    }

    canvas.width  = Math.round(rect.width  * dpr)
    canvas.height = Math.round(rect.height * dpr)
    canvas.style.width  = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    if (existingImage) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height)
      img.src = existingImage
    } else {
      // Snapshot initial blank state
      strokeHistoryRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)]
      redoHistoryRef.current = []
      setCanUndo(false)
      setCanRedo(false)
      canvasReadyRef.current = true
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(initCanvas, 60)
    window.addEventListener('resize', initCanvas)
    return () => { clearTimeout(t); window.removeEventListener('resize', initCanvas) }
  }, [initCanvas])

  // Restore draft + reset canvas when character changes
  const prevCharRef = useRef(selectedCharacter)
  useEffect(() => {
    if (prevCharRef.current === selectedCharacter) return
    prevCharRef.current = selectedCharacter
    // Reset canvas for new character
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      strokeHistoryRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)]
      redoHistoryRef.current = []
      setCanUndo(false)
      setCanRedo(false)
      setStrokeCount(0)
      // Reset timer
      setElapsedSeconds(0)
      setTimerRunning(false)
      timerStartedRef.current = false
      // Try to restore draft for this character after a short delay
      setTimeout(() => {
        try {
          const saved = sessionStorage.getItem(`callilab_draft_${selectedCharacter}`)
          if (saved && canvasRef.current) {
            const c = canvasRef.current
            const cx = c.getContext('2d')
            const img = new Image()
            img.onload = () => {
              const r = c.getBoundingClientRect()
              cx.drawImage(img, 0, 0, r.width, r.height)
              strokeHistoryRef.current.push(cx.getImageData(0, 0, c.width, c.height))
              setCanUndo(true)
              setStrokeCount(1)
            }
            img.src = saved
          }
        } catch (_) {}
      }, 80)
    }
  }, [selectedCharacter])

  // ── Keyboard Shortcuts (Ctrl+Z, Ctrl+Y, P, B, E) ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault(); handleUndo()
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault(); handleRedo()
      } else if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        if (e.key === 'p') setTool('pen')
        if (e.key === 'b') setTool('brush')
        if (e.key === 'e') setTool('eraser')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // ── Push Canvas State for Undo / Redo ──
  const pushCanvasState = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height)
    strokeHistoryRef.current.push(snap)
    if (strokeHistoryRef.current.length > 30) strokeHistoryRef.current.shift()
    redoHistoryRef.current = []
    setCanUndo(strokeHistoryRef.current.length > 1)
    setCanRedo(false)
    setStrokeCount(prev => prev + 1)

    // Auto save draft to session
    try {
      sessionStorage.setItem(`callilab_draft_${selectedCharacter}`, canvas.toDataURL('image/png'))
    } catch (_) {}
  }

  const handleUndo = () => {
    const canvas = canvasRef.current
    if (!canvas || strokeHistoryRef.current.length <= 1) return
    const ctx = canvas.getContext('2d')
    const current = strokeHistoryRef.current.pop()
    redoHistoryRef.current.push(current)
    const prev = strokeHistoryRef.current[strokeHistoryRef.current.length - 1]
    ctx.putImageData(prev, 0, 0)
    setCanUndo(strokeHistoryRef.current.length > 1)
    setCanRedo(true)
    setStrokeCount(s => Math.max(0, s - 1))
  }

  const handleRedo = () => {
    const canvas = canvasRef.current
    if (!canvas || redoHistoryRef.current.length === 0) return
    const ctx = canvas.getContext('2d')
    const next = redoHistoryRef.current.pop()
    strokeHistoryRef.current.push(next)
    ctx.putImageData(next, 0, 0)
    setCanUndo(true)
    setCanRedo(redoHistoryRef.current.length > 0)
    setStrokeCount(s => s + 1)
  }

  const handleClearConfirm = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    strokeHistoryRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)]
    redoHistoryRef.current = []
    setCanUndo(false)
    setCanRedo(false)
    setStrokeCount(0)
    // Reset timer for fresh practice
    setElapsedSeconds(0)
    setTimerRunning(false)
    timerStartedRef.current = false
    setClearDialogOpen(false)
    try {
      sessionStorage.removeItem(`callilab_draft_${selectedCharacter}`)
    } catch (_) {}
    toast.success('Parchment cleared — ready for a fresh start.')
  }

  // ── Coordinates Helper with Pressure Support ──
  const getCoordinates = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0, time: Date.now(), pressure: 0.5 }
    const rect = canvas.getBoundingClientRect()
    let clientX = e.clientX
    let clientY = e.clientY
    let pressure = e.pressure !== undefined && e.pressure > 0 ? e.pressure : 0.5

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
      if (e.touches[0].force !== undefined && e.touches[0].force > 0) {
        pressure = e.touches[0].force
      }
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
      time: Date.now(),
      pressure
    }
  }

  // ── Drawing Event Handlers ──
  const startDrawing = (e) => {
    if (e.type === 'mousedown' && e.button !== 0) return // only left mouse button
    if (e.type === 'touchstart') e.preventDefault()
    isDrawingRef.current = true

    // Auto-start timer on very first stroke
    if (!timerStartedRef.current) {
      timerStartedRef.current = true
      setTimerRunning(true)
    }

    const coords = getCoordinates(e)
    lastPointRef.current = coords

    // Draw single dot on click
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(coords.x, coords.y, Math.max(4, brushSize * 2.5), 0, Math.PI * 2)
      ctx.fill()
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = inkColor
      ctx.beginPath()
      ctx.arc(coords.x, coords.y, Math.max(0.5, brushSize / 2), 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }

  const draw = (e) => {
    if (!isDrawingRef.current) return
    if (e.type === 'touchmove') e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const current = getCoordinates(e)
    const prev = lastPointRef.current

    const dist = Math.hypot(current.x - prev.x, current.y - prev.y)
    const timeDiff = Math.max(1, current.time - prev.time)
    const speed = dist / timeDiff // px per ms

    // Physics: Fine Pen vs. Calligraphy Brush
    let dynamicWidth = brushSize
    if (tool === 'brush') {
      // Calligraphy brush: slow = thick, fast = thin; pressure-sensitive
      const speedFactor    = Math.max(0.35, Math.min(2.4, 2.0 - speed * 0.5))
      const pressureFactor = 0.5 + current.pressure * 1.0
      dynamicWidth = Math.max(1, brushSize * speedFactor * pressureFactor)
    } else if (tool === 'pen') {
      // Fine Pen: crisp hairline with subtle organic taper
      const speedFactor = Math.max(0.65, Math.min(1.35, 1.25 - speed * 0.25))
      dynamicWidth = Math.max(0.5, brushSize * speedFactor)
    }

    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = Math.max(6, brushSize * 4)
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = inkColor
      ctx.lineWidth = dynamicWidth
      ctx.shadowColor = inkColor
      ctx.shadowBlur = tool === 'brush' ? 0.6 : 0.2
    }

    // Smooth quadratic curve interpolation
    ctx.beginPath()
    ctx.moveTo(prev.x, prev.y)
    const midX = (prev.x + current.x) / 2
    const midY = (prev.y + current.y) / 2
    ctx.quadraticCurveTo(prev.x, prev.y, midX, midY)
    ctx.stroke()
    ctx.restore()

    lastPointRef.current = current
  }

  const stopDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false
      pushCanvasState()
    }
  }

  // ── Character Selection Handler ──
  const handleSelectCharacter = (char) => {
    setSelectedCharacter(char)
    setSearchParams({ ref: char })
    // If a drill exists with this target, sync drill info
    const matchedDrill = DRILL_CATALOG.find(d => d.target.toLowerCase() === char.toLowerCase())
    if (matchedDrill) {
      setSelectedDrill(matchedDrill)
    } else {
      setSelectedDrill({
        id: `drill-${char}`,
        target: char,
        title: char.length > 1 ? char : `Letter '${char}'`,
        category: char.length > 3 ? 'Words & Rhythm' : 'Letter Formation',
        difficulty: 'Practitioner',
        duration: '10 mins',
        durationSec: 600,
        objective: `Perfect the execution of ${char} adhering to standard 55° calligraphy guidelines.`,
        tips: 'Keep downstroke pressure uniform and observe consistent inter-character optical volume.'
      })
    }
  }

  // ── Scroll Character Row ──
  const scrollChars = (direction) => {
    if (!charScrollRef.current) return
    const scrollAmount = direction === 'left' ? -260 : 260
    charScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  // ── Submit Practice Attempt & Launch AI Assessment ──
  const handleSubmitPractice = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Require actual strokes drawn
    if (strokeCount === 0) {
      toast.error('Please write or practice your strokes on the canvas before submitting!')
      return
    }

    setSubmitting(true)
    setSubmissionStep('capturing')

    try {
      // 1. Create clean offscreen composite with ivory parchment background
      const offscreen = document.createElement('canvas')
      offscreen.width = canvas.width
      offscreen.height = canvas.height
      const offCtx = offscreen.getContext('2d')
      offCtx.fillStyle = '#FAF6F0'
      offCtx.fillRect(0, 0, offscreen.width, offscreen.height)
      offCtx.drawImage(canvas, 0, 0)
      const base64Data = offscreen.toDataURL('image/png')

      setSubmissionStep('analyzing')
      await new Promise(r => setTimeout(r, 600)) // smooth visual feedback

      setSubmissionStep('scoring')

      // 2. Call backend /api/practice/attempt
      const payload = {
        targetReference: selectedCharacter,
        title: `${selectedDrill.title} — Studio Practice`,
        attemptType: 'digital_canvas',
        base64Data,
        durationSeconds: elapsedSeconds,
        tool,
        brushSize,
        inkColor,
        notes: `Practiced "${selectedCharacter}" with ${tool === 'pen' ? 'Fine Pen' : tool === 'brush' ? 'Calligraphy Brush' : 'Eraser'} · guide: ${guidePreset} · ${formatTime(elapsedSeconds)}.`
      }

      const res = await axios.post('/api/practice/attempt', payload)

      if (res.data.user) {
        updateUser(res.data.user)
      }

      // Pause timer after successful submission
      setTimerRunning(false)
      toast.success(`Practice saved! +${res.data.xpEarned || 25} XP`)

      // Open instant assessment modal
      setAssessmentModalData({
        attempt: res.data.attempt,
        assessment: res.data.assessment,
        streak: res.data.streak || user?.streak || 13,
        xpEarned: res.data.xpEarned || 25,
        imageUrl: res.data.attempt?.imageUrl || base64Data
      })

    } catch (error) {
      console.error('Submission failed:', error)
      toast.error(error.response?.data?.message || 'Failed to submit practice attempt. Please try again.')
    } finally {
      setSubmitting(false)
      setSubmissionStep('')
    }
  }

  // Active characters list for current category
  const activeCharList = CHARACTER_CATEGORIES.find(c => c.id === activeCategory)?.items || []

  return (
    <div className="w-full flex flex-col gap-4 text-[#171513] select-none animate-fade-in relative">
      
      {/* ═══════════════════════════════════════════════════════════════
          HEADER: TITLE, SUBTITLE & CALLIGRAPHY MOTTO
          ═══════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-1 relative">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-[#171513] tracking-tight leading-none">
            Practice Lab
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5140] font-sans mt-1.5 font-normal">
            Refine your strokes with guided practice and real-time feedback.
          </p>
        </div>

        {/* Artistic Motto Quote */}
        <div className="hidden md:flex flex-col items-end">
          <p className="font-serif italic text-base lg:text-[18px] text-[#302B27] tracking-wide">
            “Small strokes create big progress.”
          </p>
          <div className="w-28 h-[1.5px] bg-[#A85D55] mt-1 opacity-70" />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          DRILL CONTROL BAR (Dropdown, Badges, Timer, Actions)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF6F0] p-2 sm:px-3 sm:py-2.5 rounded-2xl border border-[rgba(107,81,64,0.18)] shadow-xs">
        
        {/* Left: Drill Selector & Pills */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Drill Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => setDrillDropdownOpen(!drillDropdownOpen)}
              className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-[rgba(107,81,64,0.2)] hover:border-[#171513] transition-colors shadow-2xs group"
            >
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#8E7360]">
                DRILL
              </span>
              <span className="font-serif font-semibold text-xs sm:text-sm text-[#171513]">
                {selectedDrill.title}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8E7360] group-hover:text-[#171513] transition-transform duration-200" />
            </button>

            {/* Dropdown Menu */}
            {drillDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setDrillDropdownOpen(false)} />
                <div className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-xl border border-[rgba(107,81,64,0.22)] shadow-xl z-40 py-1 overflow-hidden animate-fade-in">
                  <div className="px-3 py-1.5 border-b border-[rgba(107,81,64,0.1)] text-[9px] uppercase tracking-wider font-mono text-[#8E7360]">
                    Select Studio Drill
                  </div>
                  {DRILL_CATALOG.map((drill) => (
                    <button
                      key={drill.id}
                      onClick={() => {
                        setSelectedDrill(drill)
                        setSelectedCharacter(drill.target)
                        setSearchParams({ ref: drill.target })
                        setDrillDropdownOpen(false)
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-sans flex items-center justify-between transition-colors ${
                        selectedDrill.id === drill.id ? 'bg-[#FAF6F0] text-[#642F35] font-bold' : 'text-[#302B27] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <span className="font-serif text-sm">{drill.title}</span>
                      <span className="text-[10px] font-mono text-[#8E7360]">{drill.duration}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Level Pill */}
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-[rgba(107,81,64,0.18)] text-[11px] font-medium text-[#302B27]">
            <Leaf className="w-3.5 h-3.5 text-[#A85D55]" />
            <span>{selectedDrill.difficulty}</span>
          </div>

          {/* Drill Info toggle */}
          <button
            onClick={() => setDrillInfoOpen(!drillInfoOpen)}
            title="Drill objective & tips"
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-full bg-white border border-[rgba(107,81,64,0.18)] text-[#8E7360] hover:text-[#171513] hover:bg-[#FAF6F0] transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
          </button>

          {/* Focus Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-[rgba(107,81,64,0.18)] text-[11px] font-medium text-[#302B27]">
            <Target className="w-3.5 h-3.5 text-[#A85D55]" />
            <span>{selectedDrill.category}</span>
          </div>

          {/* Duration Pill */}
          <div className="hidden md:flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-[rgba(107,81,64,0.18)] text-[11px] font-medium text-[#302B27]">
            <Clock className="w-3.5 h-3.5 text-[#A85D55]" />
            <span>{selectedDrill.duration}</span>
          </div>

        </div>

        {/* Right: Actions, Timer & SUBMIT */}
        <div className="flex items-center gap-2">
          
          {/* Undo Button */}
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
              canUndo 
                ? 'bg-white border-[rgba(107,81,64,0.22)] text-[#171513] hover:bg-[#FAF6F0] hover:scale-105 active:scale-95 shadow-2xs' 
                : 'bg-white/50 border-[rgba(107,81,64,0.1)] text-[#C4B5A5] cursor-not-allowed'
            }`}
            title="Undo stroke (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>

          {/* Redo Button */}
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
              canRedo 
                ? 'bg-white border-[rgba(107,81,64,0.22)] text-[#171513] hover:bg-[#FAF6F0] hover:scale-105 active:scale-95 shadow-2xs' 
                : 'bg-white/50 border-[rgba(107,81,64,0.1)] text-[#C4B5A5] cursor-not-allowed'
            }`}
            title="Redo stroke"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>

          {/* Clear Button */}
          <button
            onClick={() => setClearDialogOpen(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[rgba(107,81,64,0.22)] text-[#A85D55] hover:bg-[#F4E8E6] transition-all shadow-2xs active:scale-95"
            title="Clear practice sheet"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Timer Display — click to pause/resume */}
          <button
            id="btn-timer"
            onClick={() => setTimerRunning(!timerRunning)}
            className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[rgba(107,81,64,0.22)] shadow-2xs font-mono text-xs font-bold text-[#171513] hover:border-[#171513] transition-colors"
            title={timerRunning ? 'Click to Pause Timer' : 'Click to Resume Timer'}
            aria-label={timerRunning ? 'Pause timer' : 'Resume timer'}
          >
            {timerRunning
              ? <Pause className="w-3.5 h-3.5 text-[#A85D55]" />
              : <Play  className="w-3.5 h-3.5 text-[#8E7360]" />
            }
            <span>{formatTime(elapsedSeconds)}</span>
          </button>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmitPractice}
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#642F35] text-[#FAF6F0] hover:bg-[#50242A] border border-[#50242A] text-xs font-sans font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-75 disabled:cursor-wait"
          >
            <span>{submitting ? 'Analyzing...' : 'SUBMIT'}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN WORKSPACE DESK: STUDIO TOOLS + LARGE CANVAS
          ═══════════════════════════════════════════════════════════════ */}
      {/* Drill info callout — toggled by ℹ button */}
      {drillInfoOpen && (
        <div className="flex items-start gap-3 bg-[#FAF6F0] border border-[rgba(107,81,64,0.18)] rounded-xl px-4 py-3 text-xs shadow-sm" style={{ animation: 'fadeIn 0.2s ease' }}>
          <Sparkles className="w-4 h-4 text-[#A85D55] shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[#171513] mb-0.5">{selectedDrill.objective}</p>
            <p className="text-[#6B5140]"><span className="font-bold text-[#302B27]">Tip: </span>{selectedDrill.tips}</p>
          </div>
          <button onClick={() => setDrillInfoOpen(false)} className="text-[#8E7360] hover:text-[#171513] transition-colors shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 items-stretch" style={{ minHeight: 'calc(100vh - 330px)', maxHeight: 'calc(100vh - 230px)' }}>
        
        {/* ── LEFT: STUDIO TOOLS PANEL ────────────────────────────── */}
        <div className="w-full lg:w-[236px] shrink-0 bg-[#FAF6F0] rounded-2xl border border-[rgba(107,81,64,0.2)] p-4 shadow-sm flex flex-col gap-3 relative overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          
          <div className="space-y-3.5">
            
            {/* Studio Tools Header */}
            <div className="flex items-center gap-2 pb-1 border-b border-[rgba(107,81,64,0.12)]">
              <Sliders className="w-4 h-4 text-[#A85D55]" />
              <h2 className="text-xs uppercase font-sans font-bold tracking-[0.14em] text-[#171513]">
                Studio Tools
              </h2>
            </div>

            {/* Pen / Brush Selection */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTool('pen')}
                  className={`py-2 px-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    tool === 'pen'
                      ? 'bg-[#642F35] border-[#50242A] text-[#FAF6F0] shadow-sm'
                      : 'bg-white border-[rgba(107,81,64,0.18)] text-[#4A433D] hover:bg-white/80'
                  }`}
                >
                  <PenTool className="w-4 h-4" />
                  <span className="text-[11px] font-sans font-semibold">Fine Pen</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTool('brush')}
                  className={`py-2 px-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    tool === 'brush'
                      ? 'bg-[#642F35] border-[#50242A] text-[#FAF6F0] shadow-sm'
                      : 'bg-white border-[rgba(107,81,64,0.18)] text-[#4A433D] hover:bg-white/80'
                  }`}
                >
                  <Paintbrush className="w-4 h-4" />
                  <span className="text-[11px] font-sans font-semibold">Brush</span>
                </button>
              </div>

              {/* Eraser Tool */}
              <button
                type="button"
                onClick={() => setTool('eraser')}
                className={`w-full py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                  tool === 'eraser'
                    ? 'bg-[#642F35] border-[#50242A] text-[#FAF6F0] shadow-sm'
                    : 'bg-white border-[rgba(107,81,64,0.18)] text-[#4A433D] hover:bg-white/80'
                }`}
              >
                <Eraser className="w-4 h-4" />
                <span className="text-[11px] font-sans font-semibold">Eraser</span>
              </button>
            </div>

            {/* Artisan Ink Color Selection */}
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase font-mono font-bold tracking-wider text-[#6B5140] block">
                Artisan Ink
              </label>
              <div className="flex items-center justify-between gap-1.5 pt-0.5">
                {INK_PALETTE.map((ink) => {
                  const isSelected = inkColor === ink.color && tool !== 'eraser'
                  return (
                    <button
                      key={ink.color}
                      type="button"
                      onClick={() => {
                        setInkColor(ink.color)
                        if (tool === 'eraser') setTool('pen')
                      }}
                      className={`relative w-8 h-8 rounded-full transition-transform duration-200 flex items-center justify-center ${
                        isSelected ? 'scale-110' : 'hover:scale-105'
                      }`}
                      title={ink.name}
                    >
                      {/* Outer Ring when selected */}
                      {isSelected && (
                        <span className="absolute inset-[-3px] rounded-full border-2 border-[#171513] pointer-events-none" />
                      )}
                      <span 
                        className="w-full h-full rounded-full border border-black/10 shadow-xs block"
                        style={{ backgroundColor: ink.color }}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Size Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[9px] uppercase font-mono font-bold tracking-wider">
                <span className="text-[#6B5140]">Size</span>
                <span className="text-[#A85D55]">{brushSize}px</span>
              </div>
              <input
                id="brush-size-slider"
                type="range"
                min="1"
                max="24"
                step="1"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                aria-label="Brush size"
                aria-valuenow={brushSize}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #642F35 ${((brushSize-1)/23)*100}%, #EFE5D5 ${((brushSize-1)/23)*100}%)`,
                  accentColor: '#642F35',
                }}
              />
              {/* Live size preview dot */}
              <div className="flex justify-center pt-0.5">
                <span
                  className="rounded-full block"
                  style={{
                    width:  Math.max(4, brushSize),
                    height: Math.max(4, brushSize),
                    backgroundColor: tool === 'eraser' ? '#C4B5A5' : inkColor,
                    transition: 'all 0.1s ease',
                  }}
                />
              </div>
            </div>

            {/* Guides & Grid Controls */}
            <div className="space-y-2 pt-1 border-t border-[rgba(107,81,64,0.1)]">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-[#6B5140]">
                  Guides & Grid
                </span>
                
                {/* 55° Switch Toggle */}
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <span className="text-[10px] font-sans font-medium text-[#171513]">55° Guides</span>
                  <div className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      id="slant-guide-toggle"
                      checked={slantGuideActive}
                      onChange={(e) => setSlantGuideActive(e.target.checked)}
                      aria-label="Toggle 55° slant guides"
                      className="sr-only peer"
                    />
                    <div
                      className="w-8 rounded-full relative transition-colors duration-200"
                      style={{ height: 18, backgroundColor: slantGuideActive ? '#642F35' : '#DDD0BC' }}
                    >
                      <span
                        className="absolute top-[2px] bg-white rounded-full shadow-sm transition-transform duration-200"
                        style={{ width: 14, height: 14, left: 2, transform: slantGuideActive ? 'translateX(14px)' : 'translateX(0)' }}
                      />
                    </div>
                  </div>
                </label>
              </div>

              {/* 5 Guide Preset Cards */}
              <div className="grid grid-cols-5 gap-1 pt-1">
                {[
                  { id: 'none', label: 'None', visual: 'clean' },
                  { id: 'lines', label: 'Lines', visual: 'horiz' },
                  { id: 'grid', label: 'Grid', visual: 'grid' },
                  { id: 'slant', label: 'Slant', visual: 'slant' },
                  { id: 'full', label: 'Full', visual: 'full' },
                ].map((preset) => {
                  const isActive = guidePreset === preset.id
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setGuidePreset(preset.id)
                        if (preset.id === 'none') setSlantGuideActive(false)
                        else if (preset.id === 'slant' || preset.id === 'full') setSlantGuideActive(true)
                      }}
                      className={`flex flex-col items-center justify-center p-1 rounded-lg border transition-all ${
                        isActive
                          ? 'border-[#642F35] bg-[#EFE2E4] text-[#642F35] font-bold shadow-2xs'
                          : 'border-[rgba(107,81,64,0.18)] bg-white text-[#6B5140] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      {/* Mini preview thumbnail of the guide pattern */}
                      <div className="w-full h-7 rounded bg-[#FAF6F0] mb-1 relative overflow-hidden border border-black/5 flex items-center justify-center">
                        {preset.visual === 'clean' && <div className="w-full h-full" />}
                        {preset.visual === 'horiz' && (
                          <div className="w-full h-full flex flex-col justify-between py-1 px-1">
                            <div className="w-full h-px bg-[#8E7360]/40" />
                            <div className="w-full h-px bg-[#8E7360]/40" />
                            <div className="w-full h-px bg-[#8E7360]/60" />
                            <div className="w-full h-px bg-[#8E7360]/40" />
                          </div>
                        )}
                        {preset.visual === 'grid' && (
                          <div className="w-full h-full bg-[linear-gradient(to_right,#8E7360_1px,transparent_1px),linear-gradient(to_bottom,#8E7360_1px,transparent_1px)] bg-[size:4px_4px] opacity-25" />
                        )}
                        {preset.visual === 'slant' && (
                          <div className="w-full h-full bg-[repeating-linear-gradient(55deg,transparent,transparent_4px,#A85D55_4px,#A85D55_5px)] opacity-35" />
                        )}
                        {preset.visual === 'full' && (
                          <div className="w-full h-full bg-[linear-gradient(to_bottom,#8E7360_1px,transparent_1px),repeating-linear-gradient(55deg,transparent,transparent_5px,#A85D55_5px,#A85D55_6px)] bg-[size:100%_4px] opacity-35" />
                        )}
                      </div>
                      <span className="text-[9px] font-sans truncate">{preset.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tracing & Reference Controls */}
            <div className="space-y-2 pt-1 border-t border-[rgba(107,81,64,0.1)]">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-[#6B5140]">
                  Tracing & Reference
                </span>
              </div>

              {/* Show Reference Switch */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans text-[#302B27]">Show Reference</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="show-reference-toggle"
                    checked={showReference}
                    onChange={(e) => setShowReference(e.target.checked)}
                    aria-label="Toggle reference overlay"
                    className="sr-only"
                  />
                  <div
                    className="rounded-full relative transition-colors duration-200"
                    style={{ width: 32, height: 18, backgroundColor: showReference ? '#642F35' : '#DDD0BC', cursor: 'pointer' }}
                  >
                    <span
                      className="absolute top-[2px] bg-white rounded-full shadow-sm transition-transform duration-200"
                      style={{ width: 14, height: 14, left: 2, transform: showReference ? 'translateX(14px)' : 'translateX(0)' }}
                    />
                  </div>
                </label>
              </div>

              {/* Tracing Mode Switch */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans text-[#302B27]">Tracing Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="tracing-mode-toggle"
                    checked={tracingMode}
                    onChange={(e) => setTracingMode(e.target.checked)}
                    aria-label="Toggle tracing mode"
                    className="sr-only"
                  />
                  <div
                    className="rounded-full relative transition-colors duration-200"
                    style={{ width: 32, height: 18, backgroundColor: tracingMode ? '#642F35' : '#DDD0BC', cursor: 'pointer' }}
                  >
                    <span
                      className="absolute top-[2px] bg-white rounded-full shadow-sm transition-transform duration-200"
                      style={{ width: 14, height: 14, left: 2, transform: tracingMode ? 'translateX(14px)' : 'translateX(0)' }}
                    />
                  </div>
                </label>
              </div>

              {/* Reference Opacity Slider */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="text-[#6B5140] uppercase">Reference Opacity</span>
                  <span className="text-[#A85D55] font-bold">{Math.round(referenceOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.65"
                  step="0.05"
                  value={referenceOpacity}
                  onChange={(e) => setReferenceOpacity(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#EFE5D5] rounded-lg appearance-none cursor-pointer accent-[#642F35]"
                />
              </div>

            </div>

          </div>

          {/* Keyboard shortcut hint */}
          <div className="mt-auto pt-3 border-t border-[rgba(107,81,64,0.08)]">
            <p className="text-[8.5px] font-mono text-[#C4B5A5] text-center leading-relaxed">
              P = Pen · B = Brush · E = Eraser
              <br />Ctrl+Z = Undo · Ctrl+Y = Redo
            </p>
          </div>

        </div>

        {/* ── RIGHT: LARGE ARTISAN WRITING DESK & CANVAS ──────────── */}
        <div className="flex-1 rounded-2xl bg-[#F2EBE0] border border-[rgba(107,81,64,0.22)] shadow-md p-2.5 sm:p-4 flex flex-col gap-2 relative overflow-hidden min-w-0">
          
          {/* Deckle Edge Paper Canvas Sheet Container */}
          <div className="relative w-full flex-1 rounded-xl bg-[#FAF6F0] border border-[rgba(107,81,64,0.15)] shadow-inner overflow-hidden" style={{ minHeight: 360 }}>
            
            {/* Paper Subtle Grain Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")'
              }}
            />

            {/* Botanical Watercolor Corner Flourishes */}
            <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-75">
              <svg viewBox="0 0 120 120" className="w-full h-full text-[#6B5140]" fill="none" stroke="currentColor">
                <path d="M0,0 Q30,40 70,20 Q100,5 110,0" strokeWidth="1" stroke="rgba(107,81,64,0.4)" />
                <path d="M15,15 Q35,5 50,20 Q30,30 15,15 Z" fill="rgba(168,93,85,0.22)" strokeWidth="0.5" />
                <path d="M35,18 Q60,10 75,30 Q50,40 35,18 Z" fill="rgba(107,81,64,0.18)" strokeWidth="0.5" />
                <path d="M55,15 Q85,15 95,35 Q75,45 55,15 Z" fill="rgba(180,154,104,0.22)" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none opacity-85">
              <svg viewBox="0 0 140 140" className="w-full h-full text-[#6B5140]" fill="none" stroke="currentColor">
                <path d="M140,140 Q100,90 40,120 Q10,135 0,140" strokeWidth="1.2" stroke="rgba(107,81,64,0.4)" />
                <path d="M110,110 Q90,75 60,95 Q80,125 110,110 Z" fill="rgba(168,93,85,0.24)" strokeWidth="0.5" />
                <path d="M85,105 Q60,75 40,100 Q65,120 85,105 Z" fill="rgba(180,154,104,0.24)" strokeWidth="0.5" />
                <circle cx="120" cy="120" r="1.5" fill="#642F35" opacity="0.4" />
                <circle cx="105" cy="130" r="1.2" fill="#642F35" opacity="0.3" />
                <circle cx="95" cy="115" r="2" fill="#642F35" opacity="0.25" />
              </svg>
            </div>

            {/* ── CALLIGRAPHY GUIDELINES LAYER ── */}
            {guidePreset !== 'none' && (
              <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between select-none">
                
                {/* 55° Diagonal Slant Guides */}
                {(slantGuideActive || guidePreset === 'slant' || guidePreset === 'full') && (
                  <div 
                    className="absolute inset-0 opacity-45 pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 42px, rgba(168,93,85,0.22) 42px, rgba(168,93,85,0.22) 43px)'
                    }}
                  />
                )}

                {/* Optional Full Grid background */}
                {(guidePreset === 'grid' || guidePreset === 'full') && (
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(to right, rgba(107,81,64,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(107,81,64,0.2) 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}
                  />
                )}

                {/* Classical Calligraphy Metric Rule Lines: Ascender, X-Height, Baseline, Descender */}
                {(guidePreset === 'lines' || guidePreset === 'slant' || guidePreset === 'full') && (
                  <div className="absolute inset-0 flex flex-col justify-center pointer-events-none px-4">
                    
                    {/* Ascender line (~22% height) */}
                    <div className="absolute top-[22%] left-0 right-0 border-b border-dashed border-[rgba(107,81,64,0.28)] flex items-center px-4">
                      <span className="text-[9px] font-serif italic text-[#8E7360] -translate-y-2.5">
                        Ascender
                      </span>
                    </div>

                    {/* X-height line (~40% height) */}
                    <div className="absolute top-[40%] left-0 right-0 border-b border-dashed border-[rgba(107,81,64,0.28)] flex items-center px-4">
                      <span className="text-[9px] font-serif italic text-[#8E7360] -translate-y-2.5">
                        X-height
                      </span>
                    </div>

                    {/* Baseline line (~68% height) */}
                    <div className="absolute top-[68%] left-0 right-0 border-b border-[rgba(107,81,64,0.4)] flex items-center px-4">
                      <span className="text-[9px] font-serif italic text-[#6B5140] font-semibold -translate-y-2.5">
                        Baseline
                      </span>
                    </div>

                    {/* Descender line (~86% height) */}
                    <div className="absolute top-[86%] left-0 right-0 border-b border-dashed border-[rgba(107,81,64,0.28)] flex items-center px-4">
                      <span className="text-[9px] font-serif italic text-[#8E7360] -translate-y-2.5">
                        Descender
                      </span>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* ── REFERENCE UNDERLAY LAYER (z-[12], visible through transparent canvas) ── */}
            {showReference && (
              <div 
                className="absolute inset-0 pointer-events-none flex items-center select-none overflow-hidden"
                style={{
                  zIndex: 12,
                  opacity: referenceOpacity,
                  justifyContent: tracingMode ? 'center' : 'flex-start',
                  paddingLeft: tracingMode ? 0 : 'clamp(8%, 12%, 18%)',
                }}
              >
                <span
                  className="font-script text-[#171513] font-normal leading-none select-none"
                  style={{ fontSize: 'min(36vw, 17rem)', transform: 'translateY(-2%)' }}
                >
                  {selectedCharacter}
                </span>
              </div>
            )}

            {/* ── ARTISTIC CALLIGRAPHY OBLIQUE DIP PEN DECORATION (As shown in screenshot) ── */}
            <div className="absolute right-4 top-1/3 pointer-events-none z-20 hidden md:block opacity-90 transition-transform duration-500 hover:scale-105">
              <svg width="220" height="120" viewBox="0 0 220 120" fill="none">
                {/* Oblique Dark Ebony Holder */}
                <path d="M220,10 L140,55 L135,52 L215,8 Z" fill="#24201D" />
                <path d="M140,55 L125,65 L120,60 L135,52 Z" fill="#3B342F" />
                {/* Brass Flange & Gold Pointed Nib */}
                <path d="M125,65 L105,78 L100,74 L120,60 Z" fill="#B49A68" stroke="#8A6E3B" strokeWidth="0.5" />
                <path d="M105,78 L75,98 L72,97 L70,95 L98,72 L105,78 Z" fill="#D4AF37" stroke="#9A7B2C" strokeWidth="0.5" />
                {/* Nib Vent Hole and Slit */}
                <circle cx="88" cy="85" r="1.5" fill="#171513" />
                <path d="M88,85 L72,97" stroke="#171513" strokeWidth="0.8" />
                {/* Shadow */}
                <ellipse cx="140" cy="85" rx="60" ry="8" fill="rgba(23,21,19,0.12)" filter="blur(6px)" />
              </svg>
            </div>

            {/* ── INTERACTIVE INK DRAWING CANVAS (z-[20], transparent background) ── */}
            <canvas
              ref={canvasRef}
              id="practice-canvas"
              aria-label="Calligraphy practice canvas — draw with mouse or touch"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerCancel={stopDrawing}
              className="absolute inset-0 w-full h-full touch-none"
              style={{
                zIndex: 20,
                cursor: tool === 'eraser' ? 'cell' : 'crosshair',
              }}
            />

            {/* Empty state — shown when canvas is blank */}
            {strokeCount === 0 && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-2"
                style={{ zIndex: 16, opacity: 0.55 }}
              >
                <PenTool className="w-8 h-8 text-[#C4B5A5]" />
                <p className="font-serif text-sm text-[#8E7360]">Your practice desk is ready</p>
                <p className="text-xs text-[#C4B5A5]">Begin your first stroke on the parchment</p>
              </div>
            )}

          </div>

          {/* ═══════════════════════════════════════════════════════════════
              BOTTOM CHARACTER SELECTOR (Tabs & Letter Carousel)
              ═══════════════════════════════════════════════════════════════ */}
          <div className="pt-2 border-t border-[rgba(107,81,64,0.12)] space-y-2">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto pb-0.5 text-xs" style={{ scrollbarWidth: 'none' }}>
              {CHARACTER_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`font-sans tracking-wide transition-all shrink-0 pb-1 relative ${
                      isActive 
                        ? 'text-[#642F35] font-bold' 
                        : 'text-[#6B5140] hover:text-[#171513]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#642F35] rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Character Cards Horizontal Carousel */}
            <div className="relative flex items-center">
              
              {/* Left Scroll Chevron */}
              <button
                onClick={() => scrollChars('left')}
                className="w-7 h-7 rounded-full bg-white border border-[rgba(107,81,64,0.2)] text-[#6B5140] hover:text-[#171513] hover:bg-[#FAF6F0] flex items-center justify-center shadow-xs z-10 shrink-0 mr-1.5 active:scale-95 transition-all"
                title="Scroll previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Scrollable Characters Row */}
              <div 
                ref={charScrollRef}
                className="flex items-center gap-1.5 overflow-x-auto flex-1 py-0.5"
                style={{ scrollbarWidth: 'none' }}
              >
                {activeCharList.map((char) => {
                  const isSelected = selectedCharacter === char
                  const isLong = char.length > 2
                  return (
                    <button
                      key={char}
                      id={`char-${char.replace(/\s+/g, '-')}`}
                      onClick={() => handleSelectCharacter(char)}
                      aria-pressed={isSelected}
                      className={`h-10 rounded-xl transition-all duration-150 flex items-center justify-center shrink-0 border ${
                        isLong ? 'px-3' : 'w-10'
                      } ${
                        isSelected
                          ? 'border-2 border-[#642F35] bg-white text-[#642F35] shadow-sm scale-105'
                          : 'border-[rgba(107,81,64,0.18)] bg-white/80 text-[#171513] hover:bg-white hover:border-[rgba(107,81,64,0.4)]'
                      }`}
                    >
                      <span className="font-script text-xl leading-none">
                        {char}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Right Scroll Chevron */}
              <button
                onClick={() => scrollChars('right')}
                className="w-7 h-7 rounded-full bg-white border border-[rgba(107,81,64,0.2)] text-[#6B5140] hover:text-[#171513] hover:bg-[#FAF6F0] flex items-center justify-center shadow-xs z-10 shrink-0 ml-1.5 active:scale-95 transition-all"
                title="Scroll next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CONFIRMATION MODAL: CLEAR CANVAS
          ═══════════════════════════════════════════════════════════════ */}
      {clearDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FAF6F0] rounded-2xl border border-[rgba(107,81,64,0.25)] shadow-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#F4E8E6] text-[#A85D55] flex items-center justify-center mx-auto border border-[#D8AFA9]">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#171513]">
                Clear your current practice?
              </h3>
              <p className="text-xs text-[#6B5140] font-sans mt-1">
                This will clear all ink strokes from the current parchment. Your guidelines and reference will remain.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setClearDialogOpen(false)}
                className="px-4 py-2 rounded-full border border-[rgba(107,81,64,0.25)] text-xs font-sans font-bold text-[#6B5140] hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearConfirm}
                className="px-5 py-2 rounded-full bg-[#A85D55] hover:bg-[#934E47] text-white text-xs font-sans font-bold transition-all shadow-xs"
              >
                Clear Parchment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          CALLIVISION AI ANALYSIS LOADING OVERLAY
          ═══════════════════════════════════════════════════════════════ */}
      {submitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" style={{ animation: 'fadeIn 0.2s ease' }}>
          <div className="bg-[#FAF6F0] rounded-2xl border border-[rgba(107,81,64,0.25)] shadow-2xl p-8 max-w-sm w-full space-y-5 text-center">
            
            {/* Spinning Calligraphy Seal */}
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-[#642F35]/20 border-t-[#642F35] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PenTool className="w-6 h-6 text-[#642F35]" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl font-semibold text-[#171513]">
                CalliVision AI Analysis
              </h3>
              <p className="text-xs text-[#6B5140] font-sans min-h-[1.25rem] transition-all duration-300">
                {submissionStep === 'capturing' && 'Capturing high-resolution stroke raster…'}
                {submissionStep === 'analyzing' && 'Evaluating 55° slant, stroke smoothness & counter-spaces…'}
                {submissionStep === 'scoring'   && 'Compiling expert breakdown & updating your streak…'}
              </p>
            </div>

            <div className="w-full bg-[#EFE5D5] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#642F35] h-full rounded-full"
                style={{
                  width: submissionStep === 'capturing' ? '33%' : submissionStep === 'analyzing' ? '66%' : '90%',
                  transition: 'width 0.6s ease',
                }}
              />
            </div>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          INSTANT AI ASSESSMENT RESULT MODAL
          ═══════════════════════════════════════════════════════════════ */}
      {assessmentModalData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.2s ease' }}
        >
          <div className="bg-[#FAF6F0] rounded-3xl border border-[rgba(107,81,64,0.25)] shadow-2xl p-6 sm:p-8 max-w-lg w-full space-y-5 relative overflow-y-auto" style={{ maxHeight: '90vh' }}>
            
            {/* Close Button */}
            <button
              onClick={() => setAssessmentModalData(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#6B5140] hover:text-[#171513] hover:bg-[rgba(107,81,64,0.1)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Stamp */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#EFE2E4] border border-[#D8AFA9] flex items-center justify-center text-[#642F35] shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A85D55] font-bold">
                  Practice Verified • +{assessmentModalData.xpEarned} XP
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#171513]">
                  Strokes Analyzed
                </h3>
              </div>
            </div>

            {/* Overall Score Dial & Quick Stats */}
            <div className="p-4 rounded-2xl bg-white border border-[rgba(107,81,64,0.15)] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#642F35] text-[#FAF6F0] flex flex-col items-center justify-center shadow-inner">
                  <span className="font-serif text-2xl font-bold leading-none">
                    {assessmentModalData.assessment?.overallScore || assessmentModalData.attempt?.metrics?.overallScore || 85}
                  </span>
                  <span className="text-[8px] uppercase tracking-wider font-mono opacity-80 mt-0.5">/ 100</span>
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#171513]">
                    Overall Mastery
                  </h4>
                  <p className="text-xs text-[#6B5140] font-sans">
                    {(assessmentModalData.assessment?.overallScore ?? assessmentModalData.attempt?.metrics?.overallScore ?? 85) >= 85
                      ? 'Exemplary artisan quality'
                      : 'Solid foundation with clear advancement'}
                  </p>
                  <p className="text-[10px] text-[#8E7360] font-sans mt-0.5">
                    Practice time: {formatTime(elapsedSeconds)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4E8E6] text-[#A85D55] font-mono text-xs font-bold border border-[#D8AFA9]">
                <Flame className="w-4 h-4 fill-[#A85D55]" />
                <span>{assessmentModalData.streak} Day Streak</span>
              </div>
            </div>

            {/* Metric Bars Breakdown */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#6B5140]">
                Skill Breakdown
              </h4>
              
              {[
                { label: 'Letter Shape & Curvature',     val: assessmentModalData.assessment?.metrics?.letterShape        ?? assessmentModalData.attempt?.metrics?.shapeScore             ?? 88 },
                { label: 'Stroke Consistency (Pressure)', val: assessmentModalData.assessment?.metrics?.strokeConsistency  ?? assessmentModalData.attempt?.metrics?.strokeConsistencyScore ?? 85 },
                { label: 'Spacing & Optical Rhythm',      val: assessmentModalData.assessment?.metrics?.spacing            ?? assessmentModalData.attempt?.metrics?.spacingScore            ?? 82 },
                { label: '55° Slant Adherence',           val: assessmentModalData.assessment?.metrics?.slant              ?? assessmentModalData.attempt?.metrics?.slantScore             ?? 86 },
                { label: 'Baseline Consistency',          val: assessmentModalData.assessment?.metrics?.baselineConsistency ?? assessmentModalData.attempt?.metrics?.alignmentScore         ?? 89 },
                { label: 'Stroke Smoothness',             val: assessmentModalData.assessment?.metrics?.strokeSmoothness   ?? assessmentModalData.attempt?.metrics?.smoothnessScore        ?? 84 },
              ].map((m) => (
                <div key={m.label} className="space-y-0.5">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-[#302B27] font-medium">{m.label}</span>
                    <span className="font-mono text-[11px] font-bold text-[#642F35]">{m.val}</span>
                  </div>
                  <div className="w-full bg-[#EFE5D5] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#642F35] to-[#A85D55] h-full rounded-full"
                      style={{ width: `${m.val}%`, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Qualitative Feedback */}
            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[rgba(107,81,64,0.18)] space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-[#302B27]">
                  <strong>Strength: </strong>
                  {assessmentModalData.assessment?.feedback?.goodPoints?.[0]?.replace('✓ ','') ||
                   assessmentModalData.attempt?.feedback?.goodPoints?.[0]?.replace('✓ ','') ||
                   'Exceptional downstroke weight balance and smooth loop entry.'}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-[#A85D55] shrink-0 mt-0.5" />
                <p className="text-[#302B27]">
                  <strong>Focus Next: </strong>
                  {assessmentModalData.assessment?.feedback?.needsImprovement?.[0]?.replace('→ ','') ||
                   assessmentModalData.attempt?.feedback?.needsImprovement?.[0]?.replace('→ ','') ||
                   'Maintain consistent hairline exit angles against the 55° guideline.'}
                </p>
              </div>
              {(assessmentModalData.assessment?.feedback?.nextPracticeRecommendation ||
                assessmentModalData.attempt?.feedback?.nextPracticeRecommendation) && (
                <div className="flex items-start gap-2 pt-1.5 border-t border-[rgba(107,81,64,0.1)]">
                  <Sparkles className="w-4 h-4 text-[#B49A68] shrink-0 mt-0.5" />
                  <p className="text-[#302B27]">
                    <strong>Next: </strong>
                    {assessmentModalData.assessment?.feedback?.nextPracticeRecommendation ||
                     assessmentModalData.attempt?.feedback?.nextPracticeRecommendation}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAssessmentModalData(null)}
                className="flex-1 py-2.5 rounded-full border border-[rgba(107,81,64,0.25)] text-xs font-sans font-bold text-[#302B27] hover:bg-white transition-colors"
              >
                Continue Practicing
              </button>
              <button
                type="button"
                onClick={() => {
                  setAssessmentModalData(null)
                  navigate('/progress', { 
                    state: { 
                      attemptImage: assessmentModalData.imageUrl, 
                      targetReference: selectedCharacter,
                      assessment: assessmentModalData.assessment
                    } 
                  })
                }}
                className="flex-1 py-2.5 rounded-full bg-[#642F35] text-[#FAF6F0] hover:bg-[#50242A] text-xs font-sans font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>View Full Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
