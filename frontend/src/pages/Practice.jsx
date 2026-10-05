import { useState, useRef, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  Sparkles, 
  Paintbrush, 
  UploadCloud, 
  RotateCcw, 
  Undo, 
  Redo, 
  Trash2, 
  Eye, 
  EyeOff, 
  Sliders, 
  Award, 
  CheckCircle2, 
  Camera, 
  Layers, 
  SplitSquareVertical, 
  History, 
  Flame, 
  Download,
  Save,
  Check,
  Zap,
  MousePointer,
  HelpCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function Practice() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()

  // Practice Modes: 'canvas' | 'upload' | 'compare'
  const [activeTab, setActiveTab] = useState('canvas')
  
  // Target Reference Letter or Word
  const initialRef = searchParams.get('ref') || 'a'
  const [targetReference, setTargetReference] = useState(initialRef)
  const [customInput, setCustomInput] = useState('')

  // Guidelines Visibility States
  const [showGuidelines, setShowGuidelines] = useState(true)
  const [showSlantGuides, setShowSlantGuides] = useState(true)
  const [showTraceUnderlay, setShowTraceUnderlay] = useState(true)
  const [traceOpacity, setTraceOpacity] = useState(0.2) // 10% to 60%
  const [showGrid, setShowGrid] = useState(false)

  // Brush & Tool Settings
  const [tool, setTool] = useState('pen') // 'pen' | 'brush' | 'chisel' | 'eraser'
  const [brushSize, setBrushSize] = useState(5)
  const [inkColor, setInkColor] = useState('#1A1714') // Lamp Black default
  const [paperTexture, setPaperTexture] = useState('parchment') // parchment, linen, rice, slate

  // Upload state
  const [uploadFile, setUploadFile] = useState(null)
  const [uploadPreview, setUploadPreview] = useState(null)
  const [uploading, setUploading] = useState(false)

  // History & Attempts
  const [previousAttempts, setPreviousAttempts] = useState([])
  const [selectedAttemptForCompare, setSelectedAttemptForCompare] = useState(null)
  const [savingAttempt, setSavingAttempt] = useState(false)

  // Canvas drawing state & refs
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef({ x: 0, y: 0, time: 0, speed: 0 })
  const undoStackRef = useRef([])
  const redoStackRef = useRef([])

  const quickLetters = [
    { label: '| (Downstroke)', val: '|' },
    { label: '/ (Upstroke)', val: '/' },
    { label: 'a', val: 'a' },
    { label: 'b', val: 'b' },
    { label: 'c', val: 'c' },
    { label: 'd', val: 'd' },
    { label: 'g', val: 'g' },
    { label: 'm', val: 'm' },
    { label: 's', val: 's' },
    { label: 'minimum', val: 'minimum' },
    { label: 'Breathe', val: 'Breathe' },
    { label: 'Grace', val: 'Grace' },
  ]

  const inkPalettes = [
    { id: 'lamp-black', name: 'Lamp Black', color: '#1A1714' },
    { id: 'rich-gold', name: 'Gold Dust', color: '#C9A96E' },
    { id: 'vermilion', name: 'Vermilion', color: '#B83B26' },
    { id: 'prussian-blue', name: 'Prussian Blue', color: '#1B3B6F' },
    { id: 'walnut-sepia', name: 'Walnut Sepia', color: '#5C4033' },
  ]

  // Paper backgrounds
  const textures = {
    parchment: '#F2ECE0',
    linen: '#FAF7F2',
    rice: '#EAE5D9',
    slate: '#1E1B18'
  }

  // Fetch previous attempts for the active target reference
  const fetchAttempts = useCallback(async (refChar) => {
    try {
      const res = await axios.get(`/api/practice/attempts?targetReference=${encodeURIComponent(refChar)}`)
      setPreviousAttempts(res.data || [])
      if (res.data && res.data.length > 0) {
        setSelectedAttemptForCompare(res.data[0])
      }
    } catch {
      setPreviousAttempts([])
    }
  }, [])

  useEffect(() => {
    fetchAttempts(targetReference)
  }, [targetReference, fetchAttempts])

  // Canvas Initialization & Resizing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // High-DPI screen sharp rendering
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Save initial blank canvas snapshot
    const initialSnap = ctx.getImageData(0, 0, canvas.width, canvas.height)
    undoStackRef.current = [initialSnap]
    redoStackRef.current = []
  }, [])

  // Push Canvas snapshot to Undo stack
  const pushCanvasState = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height)
    undoStackRef.current.push(snap)
    if (undoStackRef.current.length > 25) undoStackRef.current.shift()
    redoStackRef.current = []
  }

  // Handle Undo
  const handleUndo = () => {
    const canvas = canvasRef.current
    if (!canvas || undoStackRef.current.length <= 1) {
      toast.error('Nothing to undo')
      return
    }
    const ctx = canvas.getContext('2d')
    const current = undoStackRef.current.pop()
    redoStackRef.current.push(current)
    const prev = undoStackRef.current[undoStackRef.current.length - 1]
    ctx.putImageData(prev, 0, 0)
  }

  // Handle Redo
  const handleRedo = () => {
    const canvas = canvasRef.current
    if (!canvas || redoStackRef.current.length === 0) {
      toast.error('Nothing to redo')
      return
    }
    const ctx = canvas.getContext('2d')
    const next = redoStackRef.current.pop()
    undoStackRef.current.push(next)
    ctx.putImageData(next, 0, 0)
  }

  // Clear Canvas
  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    pushCanvasState()
    toast.success('Practice canvas cleared')
  }

  // Mouse & Touch Coordinates Helper
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
      time: Date.now()
    }
  }

  // Start Drawing
  const startDrawing = (e) => {
    const coords = getCanvasCoords(e)
    isDrawingRef.current = true
    lastPointRef.current = coords
  }

  // Dynamic Calligraphy Stroke Smoothing & Pressure Simulation
  const draw = (e) => {
    if (!isDrawingRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const currentCoords = getCanvasCoords(e)
    const prev = lastPointRef.current

    // Calculate velocity for natural pressure simulation
    const dist = Math.hypot(currentCoords.x - prev.x, currentCoords.y - prev.y)
    const timeDiff = Math.max(1, currentCoords.time - prev.time)
    const speed = dist / timeDiff // px per ms

    // Pressure calculation: fast velocity = thinner hairline; slow deliberate stroke = thick rich stroke
    let dynamicWidth = brushSize
    if (tool === 'brush') {
      // Flexible brush curve
      const factor = Math.max(0.4, Math.min(2.2, 1.8 - speed * 0.45))
      dynamicWidth = brushSize * factor
    } else if (tool === 'chisel') {
      // 45 degree angle nib simulation
      const angle = Math.atan2(currentCoords.y - prev.y, currentCoords.x - prev.x)
      const angleDiff = Math.abs(Math.sin(angle - Math.PI / 4))
      dynamicWidth = Math.max(2, brushSize * (0.3 + angleDiff * 1.4))
    }

    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = brushSize * 2.5
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = inkColor
      ctx.lineWidth = dynamicWidth
      // Subtle ink bleed shadow
      ctx.shadowColor = inkColor
      ctx.shadowBlur = 1.2
    }

    ctx.beginPath()
    ctx.moveTo(prev.x, prev.y)
    // Smooth quadratic curve midpoint
    const midX = (prev.x + currentCoords.x) / 2
    const midY = (prev.y + currentCoords.y) / 2
    ctx.quadraticCurveTo(prev.x, prev.y, midX, midY)
    ctx.stroke()
    ctx.restore()

    lastPointRef.current = currentCoords
  }

  // Stop Drawing
  const stopDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false
      pushCanvasState()
    }
  }

  // Save Canvas Practice Attempt
  const handleSaveCanvasAttempt = async (goToAssessment = false) => {
    const canvas = canvasRef.current
    if (!canvas) return
    setSavingAttempt(true)

    try {
      // Export canvas with paper background
      const offscreen = document.createElement('canvas')
      offscreen.width = canvas.width
      offscreen.height = canvas.height
      const offCtx = offscreen.getContext('2d')

      // Draw paper background
      offCtx.fillStyle = textures[paperTexture] || '#F2ECE0'
      offCtx.fillRect(0, 0, offscreen.width, offscreen.height)
      // Draw user's ink
      offCtx.drawImage(canvas, 0, 0)

      const base64Data = offscreen.toDataURL('image/png')

      const res = await axios.post('/api/practice/attempt', {
        targetReference,
        attemptType: 'digital_canvas',
        base64Data,
        durationSeconds: 90
      })

      if (res.data.user) updateUser(res.data.user)
      toast.success(`Practice Attempt #${res.data.attemptNumber} Saved! +10 XP`)
      fetchAttempts(targetReference)

      if (goToAssessment) {
        navigate('/progress', { state: { attemptImage: res.data.attempt?.imageUrl || base64Data, targetReference } })
      }
    } catch (err) {
      toast.error('Failed to save practice attempt')
    } finally {
      setSavingAttempt(false)
    }
  }

  // Upload handwritten paper work
  const handleUploadHandwritten = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit')
      return
    }

    setUploadFile(file)
    setUploadPreview(URL.createObjectURL(file))
  }

  const handleSaveUploadedWork = async (goToAssessment = false) => {
    if (!uploadFile) return toast.error('Please choose a calligraphy image first')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('image', uploadFile)

      const uploadRes = await axios.post('/api/practice/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      const imageUrl = uploadRes.data.url

      const res = await axios.post('/api/practice/attempt', {
        targetReference,
        attemptType: 'handwritten_upload',
        imageUrl,
        durationSeconds: 120
      })

      if (res.data.user) updateUser(res.data.user)
      toast.success('Handwritten work uploaded & saved! +10 XP')
      fetchAttempts(targetReference)

      if (goToAssessment) {
        navigate('/progress', { state: { attemptImage: imageUrl, targetReference } })
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100 flex items-center gap-2">
            Calligraphy Practice Lab <BookOpen className="w-6 h-6 text-amber-500" />
          </h1>
          <p className="text-xs text-neutral-400">
            Interactive digital drawing lab & handwritten work upload. Trace over precision guidelines, compare attempts, and submit for AI analysis.
          </p>
        </div>

        {/* Practice Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-900 border border-amber-900/20">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'canvas' 
                ? 'bg-amber-500 text-neutral-950 shadow-gold' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Paintbrush className="w-3.5 h-3.5" /> Digital Canvas
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'upload' 
                ? 'bg-amber-500 text-neutral-950 shadow-gold' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" /> Upload Handwritten
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'compare' 
                ? 'bg-amber-500 text-neutral-950 shadow-gold' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" /> Compare Mode
          </button>
        </div>
      </div>

      {/* Target Reference Selector & Character Palette */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-amber-900/20 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-semibold flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" /> Target Practice Reference Letter / Word:
          </span>

          {/* Custom Reference Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type custom letter/word..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customInput.trim()) {
                  setTargetReference(customInput.trim())
                  setCustomInput('')
                  toast.success(`Active drill set to: "${customInput.trim()}"`)
                }
              }}
              className="input py-1 px-3 text-xs w-48"
            />
            <button
              onClick={() => {
                if (customInput.trim()) {
                  setTargetReference(customInput.trim())
                  setCustomInput('')
                  toast.success(`Active drill set to: "${customInput.trim()}"`)
                }
              }}
              className="btn btn-ghost btn-sm text-xs py-1"
            >
              Set
            </button>
          </div>
        </div>

        {/* Quick character buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {quickLetters.map((item) => (
            <button
              key={item.val}
              onClick={() => {
                setTargetReference(item.val)
                toast.success(`Practicing: ${item.label}`)
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold border transition-all shrink-0 ${
                targetReference === item.val
                  ? 'border-amber-500 bg-amber-500/15 text-amber-300 shadow-gold'
                  : 'border-neutral-800 text-neutral-400 hover:text-neutral-200 bg-neutral-950/40'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: DIGITAL PRACTICE CANVAS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'canvas' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Drawing Canvas Board (Left 3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Canvas Toolbar Top */}
            <div className="p-3 rounded-2xl bg-neutral-900 border border-amber-900/15 flex flex-wrap items-center justify-between gap-3 text-xs">
              
              {/* Nib / Tool Selection */}
              <div className="flex items-center gap-1">
                {[
                  { id: 'pen', label: 'Fine Pen' },
                  { id: 'brush', label: 'Brush Nib' },
                  { id: 'chisel', label: 'Chisel 45°' },
                  { id: 'eraser', label: 'Eraser' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTool(t.id)}
                    className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                      tool === t.id
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Ink Colors */}
              <div className="flex items-center gap-1.5">
                {inkPalettes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setInkColor(p.color)}
                    style={{ backgroundColor: p.color }}
                    className={`w-6 h-6 rounded-full border transition-all ${
                      inkColor === p.color ? 'ring-2 ring-amber-400 scale-110 border-white' : 'border-neutral-700'
                    }`}
                    title={p.name}
                  />
                ))}
              </div>

              {/* Brush Size Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-neutral-400 font-mono">Size: {brushSize}px</span>
                <input
                  type="range"
                  min="2"
                  max="28"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-20 accent-amber-500"
                />
              </div>

              {/* Canvas Undo/Redo & Clear */}
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleUndo} 
                  className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200" 
                  title="Undo"
                >
                  <Undo className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleRedo} 
                  className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200" 
                  title="Redo"
                >
                  <Redo className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleClear} 
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-400" 
                  title="Clear Canvas"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Interactive Drawing Viewport Container */}
            <div 
              className="relative aspect-[16/10] w-full rounded-2xl border-2 border-amber-900/30 overflow-hidden shadow-2xl select-none"
              style={{ backgroundColor: textures[paperTexture] }}
            >
              
              {/* 55° Slant Guidelines Overlay */}
              {showSlantGuides && (
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 35px, #8B5A2B 36px, #8B5A2B 37px)',
                    backgroundSize: '100% 100%'
                  }}
                />
              )}

              {/* Grid Overlay */}
              {showGrid && (
                <div 
                  className="absolute inset-0 pointer-events-none opacity-15"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '18px 18px'
                  }}
                />
              )}

              {/* Horizontal Calligraphy Guidelines (Ascender, x-Height, Baseline, Descender) */}
              {showGuidelines && (
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-center gap-10 px-8 opacity-40">
                  {/* Ascender line (dashed) */}
                  <div className="w-full border-b border-dashed border-amber-900/40 relative">
                    <span className="absolute -top-3 left-0 text-[8px] font-mono text-neutral-600">Ascender line</span>
                  </div>
                  {/* x-Height line (dotted) */}
                  <div className="w-full border-b border-dotted border-blue-900/50 relative">
                    <span className="absolute -top-3 left-0 text-[8px] font-mono text-blue-900">x-Height (waistline)</span>
                  </div>
                  {/* Baseline (solid) */}
                  <div className="w-full border-b-2 border-amber-950/60 relative">
                    <span className="absolute -top-3.5 left-0 text-[8px] font-mono text-amber-900 font-bold">Baseline</span>
                  </div>
                  {/* Descender line (dashed) */}
                  <div className="w-full border-b border-dashed border-amber-900/40 relative">
                    <span className="absolute -top-3 left-0 text-[8px] font-mono text-neutral-600">Descender line</span>
                  </div>
                </div>
              )}

              {/* Reference Character Trace Underlay Watermark */}
              {showTraceUnderlay && (
                <div 
                  className="absolute inset-0 pointer-events-none flex items-center justify-center text-center transition-opacity"
                  style={{ opacity: traceOpacity }}
                >
                  <span className="text-[12rem] font-serif text-neutral-800 select-none tracking-wider font-light italic">
                    {targetReference}
                  </span>
                </div>
              )}

              {/* Native HTML5 Canvas for Zero-Lag Drawing */}
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full cursor-crosshair relative z-10 touch-none"
              />

              {/* Bottom Guideline Legend Indicator */}
              <div className="absolute bottom-2.5 right-3 z-20 text-[9px] font-mono text-neutral-600 bg-neutral-900/70 px-2 py-1 rounded border border-neutral-800 pointer-events-none">
                Slant: 55° • Pressure simulation active
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <MousePointer className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>Draw directly with mouse, stylus pen, or tablet touch</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => handleSaveCanvasAttempt(false)}
                  disabled={savingAttempt}
                  className="btn btn-ghost btn-sm text-xs flex items-center justify-center gap-1.5 flex-1 sm:flex-none border hover:border-amber-500"
                >
                  <Save className="w-4 h-4" /> {savingAttempt ? 'Saving...' : 'Save Attempt (+10 XP)'}
                </button>

                <button
                  onClick={() => handleSaveCanvasAttempt(true)}
                  disabled={savingAttempt}
                  className="btn btn-primary btn-sm text-xs flex items-center justify-center gap-1.5 flex-1 sm:flex-none shadow-gold"
                >
                  <Sparkles className="w-4 h-4" /> Save & AI Evaluate →
                </button>
              </div>
            </div>

          </div>

          {/* Right Sidebar: Guidelines Controls & Attempt History */}
          <div className="space-y-4">
            
            {/* Guidelines Control Card */}
            <div className="p-5 rounded-2xl bg-neutral-900 border border-amber-900/15 space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Guideline Overlays
              </h3>

              <div className="space-y-2.5 text-xs text-neutral-300">
                <label className="flex items-center justify-between cursor-pointer">
                  <span>55° Slant Lines</span>
                  <input
                    type="checkbox"
                    checked={showSlantGuides}
                    onChange={(e) => setShowSlantGuides(e.target.checked)}
                    className="accent-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span>Baseline & x-Height</span>
                  <input
                    type="checkbox"
                    checked={showGuidelines}
                    onChange={(e) => setShowGuidelines(e.target.checked)}
                    className="accent-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span>Millimeter Dot Grid</span>
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    className="accent-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span>Trace Underlay Model</span>
                  <input
                    type="checkbox"
                    checked={showTraceUnderlay}
                    onChange={(e) => setShowTraceUnderlay(e.target.checked)}
                    className="accent-amber-500"
                  />
                </label>

                {showTraceUnderlay && (
                  <div className="pt-2 border-t border-neutral-800 space-y-1">
                    <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                      <span>Trace Opacity</span>
                      <span>{Math.round(traceOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.6"
                      step="0.05"
                      value={traceOpacity}
                      onChange={(e) => setTraceOpacity(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Paper Texture Card */}
            <div className="p-5 rounded-2xl bg-neutral-900 border border-amber-900/15 space-y-3">
              <h3 className="text-xs uppercase font-mono tracking-wider text-neutral-300 font-semibold">
                Paper Surface Texture
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'parchment', name: 'Vintage' },
                  { id: 'linen', name: 'Fine Linen' },
                  { id: 'rice', name: 'Rice Paper' },
                  { id: 'slate', name: 'Dark Slate' },
                ].map((tex) => (
                  <button
                    key={tex.id}
                    onClick={() => setPaperTexture(tex.id)}
                    className={`p-2 rounded-xl text-xs border transition-all ${
                      paperTexture === tex.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                        : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {tex.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Previous Attempts Carousel / List */}
            <div className="p-5 rounded-2xl bg-neutral-900 border border-amber-900/15 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-900/10 pb-2">
                <h3 className="text-xs uppercase font-mono tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" /> Previous Attempts ({previousAttempts.length})
                </h3>
              </div>

              {previousAttempts.length === 0 ? (
                <p className="text-xs text-neutral-500 py-3 text-center">
                  No saved attempts yet for "{targetReference}". Draw and save above!
                </p>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {previousAttempts.map((att) => (
                    <div
                      key={att._id}
                      onClick={() => {
                        setSelectedAttemptForCompare(att)
                        setActiveTab('compare')
                      }}
                      className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/30 cursor-pointer flex items-center justify-between transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={att.imageUrl} 
                          alt={att.title} 
                          className="w-10 h-10 rounded-lg object-cover border border-amber-500/20"
                        />
                        <div>
                          <p className="text-xs font-semibold text-neutral-200 group-hover:text-amber-300">
                            Attempt #{att.attemptNumber}
                          </p>
                          <p className="text-[10px] text-neutral-500 font-mono capitalize">
                            {att.attemptType?.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-amber-500 group-hover:underline">Compare</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: UPLOAD HANDWRITTEN WORK
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'upload' && (
        <div className="p-8 rounded-3xl bg-neutral-900 border border-amber-900/20 space-y-6 max-w-3xl mx-auto shadow-2xl">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold font-display text-neutral-100">
              Upload Your Physical Handwritten Calligraphy
            </h2>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Snapped a picture of your physical ink on paper? Upload it here to log practice, compare with the reference, and run AI stroke analysis.
            </p>
          </div>

          {/* Drag & Drop Upload Container */}
          <div className="border-2 border-dashed border-amber-500/30 hover:border-amber-500/60 rounded-3xl p-8 text-center transition-all bg-neutral-950/40 relative">
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleUploadHandwritten}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            
            {uploadPreview ? (
              <div className="space-y-4">
                <img
                  src={uploadPreview}
                  alt="Upload Preview"
                  className="max-h-64 mx-auto rounded-2xl object-contain border border-amber-500/30 shadow-xl"
                />
                <p className="text-xs text-amber-400 font-mono">
                  {uploadFile?.name} ({(uploadFile.size / 1024).toFixed(1)} KB)
                </p>
                <p className="text-[10px] text-neutral-400">Click or drag a new image to replace</p>
              </div>
            ) : (
              <div className="space-y-3 py-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/20 shadow-gold">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-200">
                    Drag and drop your calligraphy photo, or <span className="text-amber-400 underline">browse files</span>
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">Supports PNG, JPEG, WEBP up to 10MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-amber-900/10">
            <button
              onClick={() => handleSaveUploadedWork(false)}
              disabled={!uploadFile || uploading}
              className="btn btn-ghost btn-sm text-xs flex items-center gap-1.5 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Save to Practice Log (+10 XP)'}
            </button>

            <button
              onClick={() => handleSaveUploadedWork(true)}
              disabled={!uploadFile || uploading}
              className="btn btn-primary btn-sm text-xs flex items-center gap-1.5 w-full sm:w-auto shadow-gold"
            >
              <Sparkles className="w-4 h-4" /> Save & Send to AI Assessment →
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: COMPARE MODE (Side-by-Side Reference vs. Attempt)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'compare' && (
        <div className="p-8 rounded-3xl bg-neutral-900 border border-amber-900/20 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
            <div>
              <h2 className="text-2xl font-bold font-display text-neutral-100 flex items-center gap-2">
                Side-by-Side Reference Comparison <SplitSquareVertical className="w-5 h-5 text-amber-500" />
              </h2>
              <p className="text-xs text-neutral-400">
                Inspect your stroke slant, x-height, and counter-spaces directly against the master template.
              </p>
            </div>

            {previousAttempts.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 font-mono">Attempt:</span>
                <select
                  value={selectedAttemptForCompare?._id || ''}
                  onChange={(e) => {
                    const found = previousAttempts.find(a => a._id === e.target.value)
                    if (found) setSelectedAttemptForCompare(found)
                  }}
                  className="input py-1 px-2.5 text-xs font-mono"
                >
                  {previousAttempts.map(a => (
                    <option key={a._id} value={a._id}>
                      Attempt #{a.attemptNumber} ({new Date(a.createdAt).toLocaleDateString()})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Split Screen Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: Reference Master Model */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>Master Reference Model</span>
                <span className="text-amber-500">Target: "{targetReference}"</span>
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-[#F2ECE0] border-2 border-amber-900/30 flex items-center justify-center relative overflow-hidden shadow-inner">
                {/* 55° guide lines */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 35px, #8B5A2B 36px, #8B5A2B 37px)',
                    backgroundSize: '100% 100%'
                  }}
                />
                <span className="text-[10rem] font-serif text-neutral-900 italic font-light select-none">
                  {targetReference}
                </span>
                <span className="absolute bottom-3 left-3 text-[9px] px-2 py-0.5 rounded bg-neutral-900/80 text-amber-300 font-mono border border-neutral-700">
                  Ideal 55° Slant & Stroke Geometry
                </span>
              </div>
            </div>

            {/* Box 2: Your Attempt */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>Your Latest Attempt</span>
                <span className="text-amber-400">
                  {selectedAttemptForCompare ? `Attempt #${selectedAttemptForCompare.attemptNumber}` : 'Current Canvas'}
                </span>
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-neutral-950 border-2 border-amber-500/30 flex items-center justify-center relative overflow-hidden shadow-inner">
                {selectedAttemptForCompare ? (
                  <img
                    src={selectedAttemptForCompare.imageUrl}
                    alt="Your Practice Attempt"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2 text-neutral-500">
                    <Paintbrush className="w-8 h-8 mx-auto text-neutral-600" />
                    <p className="text-xs">No attempt recorded yet. Draw on the digital canvas or upload an image!</p>
                  </div>
                )}
                {selectedAttemptForCompare && (
                  <span className="absolute bottom-3 left-3 text-[9px] px-2 py-0.5 rounded bg-neutral-900/80 text-neutral-300 font-mono border border-neutral-700 capitalize">
                    {selectedAttemptForCompare.attemptType?.replace('_', ' ')}
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center pt-4 border-t border-amber-900/10">
            <button
              onClick={() => setActiveTab('canvas')}
              className="btn btn-ghost btn-sm text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Retry Drill on Canvas
            </button>

            {selectedAttemptForCompare && (
              <button
                onClick={() => navigate('/progress', { state: { attemptImage: selectedAttemptForCompare.imageUrl, targetReference } })}
                className="btn btn-primary btn-sm text-xs flex items-center gap-1.5 shadow-gold"
              >
                <Sparkles className="w-4 h-4" /> Run AI Assessment on this Attempt →
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  )
}
