import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Play, 
  Award, 
  Volume2, 
  VolumeX, 
  Music, 
  QrCode, 
  Paintbrush, 
  Check, 
  Compass, 
  Trash2, 
  Grid, 
  Sliders, 
  Cpu, 
  Layers, 
  Bookmark, 
  Share2, 
  Heart, 
  Smile,
  ShieldCheck,
  CheckCircle2,
  Users,
  Star
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function Landing() {
  const containerRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [sliderPosition, setSliderPosition] = useState(50) // before/after slider
  const [activeTab, setActiveTab] = useState('spacing') // AI Feature Demo
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('premium') // Pricing

  // Tracing draw reveal state
  const [isRevealed, setIsRevealed] = useState(false)

  // Tracking mouse movement for spotlight cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto simulated drawing curves for live canvas showcase
  const [canvasStrokeWidth, setCanvasStrokeWidth] = useState(6)
  const [canvasSlant, setCanvasSlant] = useState(true)

  // Quick UI interactions
  const handleLike = () => {
    toast.success('Added to inspiration gallery! +10 XP!')
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText('https://calliverse.app/artwork/interactive-scan')
    toast.success('Artwork shareable link copied successfully!')
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#080706] text-[#F0EAE1] selection:bg-[#C9A96E] selection:text-[#080706] font-body relative overflow-hidden spotlight-glow"
      style={{
        '--x': `${coords.x}px`,
        '--y': `${coords.y}px`,
      }}
    >
      {/* Cinematic Vignette Overlay */}
      <div className="cinematic-vignette" />

      {/* Floating Fluid Ambient Ink Drops */}
      <div className="ambient-ink-drop w-[450px] h-[450px] bg-[#C9A96E]/5 top-10 left-10" />
      <div className="ambient-ink-drop w-[600px] h-[600px] bg-[#A07840]/3 bottom-10 right-10" style={{ animationDelay: '5s' }} />

      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-[#080706]/70 backdrop-blur-xl border-b border-[#C9A96E]/10 px-6 md:px-16 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#A07840] to-[#C9A96E] shadow-[#C9A96E]/20 shadow-md">
            <Sparkles className="w-5 h-5 text-[#080706]" />
          </div>
          <div>
            <span className="text-xl font-bold font-luxury tracking-wider text-[#C9A96E]">CalliVerse</span>
            <span className="block text-[8px] text-[#C9A96E]/60 tracking-widest uppercase font-mono">Future Artistic Studio</span>
          </div>
        </div>

        {/* Desktop Menu links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-[#A39E95]">
          <a href="#canvas-preview" className="hover:text-[#C9A96E] transition-colors">Digital Canvas</a>
          <a href="#ai-analyzer" className="hover:text-[#C9A96E] transition-colors">AI Analysis</a>
          <a href="#learning-journey" className="hover:text-[#C9A96E] transition-colors">Trace Learning</a>
          <a href="#interactive-qr" className="hover:text-[#C9A96E] transition-colors">QR Reveal</a>
          <a href="#pricing-section" className="hover:text-[#C9A96E] transition-colors">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-xs uppercase tracking-widest font-bold text-[#A39E95] hover:text-[#C9A96E] transition-colors duration-300">
            Sign In
          </Link>
          <Link to="/signup" className="btn-luxury py-2.5 px-6 text-xs uppercase tracking-widest font-bold">
            Enter Studio <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* 1. Cinematic Hero Section */}
      <section className="relative px-6 md:px-12 pt-28 pb-36 text-center max-w-5xl mx-auto z-10 space-y-8">
        {/* Animated luxury badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#A07840]/10 to-[#C9A96E]/5 border border-[#C9A96E]/20 text-xs text-[#C9A96E] font-medium tracking-wide uppercase shadow-lg shadow-[#C9A96E]/5"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C9A96E] animate-spin" style={{ animationDuration: '6s' }} />
          Awwwards-Winning Luxury Calligraphy SaaS
        </motion.div>

        {/* Large cinematic hero heading */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-semibold tracking-tight font-luxury text-[#F0EAE1] leading-[1.05]"
          >
            Express the Trace <br/>
            <span className="gradient-gold-text font-signature font-light italic normal-case text-7xl md:text-9xl animate-glow">
              of a Creative Soul
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base md:text-lg text-[#A39E95] max-w-2xl mx-auto leading-relaxed pt-2"
          >
            Unlock the ultimate futuristic digital space for calligraphy masters and learners. Experience pressure-sensitive canvases, AI alignment vectors, and interactive handwritten QRs.
          </motion.p>
        </div>

        {/* Action button trails */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
        >
          <Link to="/signup" className="btn-luxury text-sm uppercase tracking-widest font-bold py-4 px-10 group">
            Start Designing Free <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#canvas-preview" className="btn-luxury-outline text-sm uppercase tracking-widest font-bold py-4 px-10">
            <Play className="w-4 h-4 text-[#C9A96E]" /> Live Canvas Demo
          </a>
        </motion.div>

        {/* Floating golden key statistics */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16 max-w-4xl mx-auto text-left"
        >
          {[
            { label: "Active Designers", val: "14K+" },
            { label: "Trace Lessons Completed", val: "120K+" },
            { label: "AI Practice Analysis Avg", val: "94.2%" },
            { label: "Aesthetic Templates", val: "400+" }
          ].map((stat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#0F0D0C]/40 border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300">
              <span className="block text-2xl font-bold font-luxury text-[#C9A96E]">{stat.val}</span>
              <span className="block text-[10px] text-[#A39E95] uppercase tracking-wider font-mono mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 2. Interactive Digital Canvas Preview */}
      <section id="canvas-preview" className="px-6 md:px-12 py-28 border-t border-[#C9A96E]/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.02),transparent_70%)]" />
        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold">Interactive Digital Canvas</span>
            <h2 className="text-4xl md:text-5xl font-semibold font-luxury text-[#F0EAE1]">The Canvas That Feels Alive</h2>
            <p className="text-sm text-[#A39E95]">Experience automatic vector brush rendering and custom bleeding effects inside a fully responsive interactive suite.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Live canvas controls sidebar mock */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-5 rounded-2xl bg-[#0D0B0A] border border-[#C9A96E]/15 space-y-5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold block">Live Controls</span>
                
                {/* Slant toggle */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#A39E95]">Chancery Slant (55°)</span>
                  <button 
                    onClick={() => setCanvasSlant(!canvasSlant)}
                    className={`w-10 h-5.5 rounded-full transition-all duration-300 relative border ${
                      canvasSlant ? 'bg-[#C9A96E] border-[#C9A96E]' : 'bg-[#1A1715] border-neutral-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-[#080706] absolute top-0.5 transition-all duration-300 ${
                      canvasSlant ? 'right-0.5' : 'left-0.5'
                    }`} />
                  </button>
                </div>

                {/* Brush size slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#A39E95]">Nib Brush Width</span>
                    <span className="text-[#C9A96E] font-mono">{canvasStrokeWidth}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="15" 
                    value={canvasStrokeWidth} 
                    onChange={(e) => setCanvasStrokeWidth(e.target.value)}
                    className="w-full accent-[#C9A96E]" 
                  />
                </div>

                {/* Colors palette */}
                <div className="space-y-2">
                  <span className="text-[11px] text-[#A39E95] block">Preloaded Traditional Inks</span>
                  <div className="flex gap-2">
                    {['#C9A96E', '#8B1A4A', '#0D0B0A', '#FFFFFF'].map((col, idx) => (
                      <div 
                        key={idx} 
                        className="w-6 h-6 rounded-full border border-neutral-800 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: col }}
                        onClick={() => toast.success(`Selected Ink color: ${col}`)}
                      />
                    ))}
                  </div>
                </div>

                {/* Vector tools */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button className="p-2.5 rounded-lg border border-neutral-800 text-[10px] text-[#A39E95] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all flex items-center justify-center gap-1">
                    <Grid className="w-3.5 h-3.5" /> Guides
                  </button>
                  <button className="p-2.5 rounded-lg border border-neutral-800 text-[10px] text-[#A39E95] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all flex items-center justify-center gap-1">
                    <Layers className="w-3.5 h-3.5" /> 3 Layers
                  </button>
                </div>
              </div>
            </div>

            {/* Tracing Canvas drawing viewport with simulated drawing animations */}
            <div className="lg:col-span-3">
              <div className="relative aspect-[16/9] rounded-2xl bg-[#EDE5D5] border border-[#C9A96E]/20 overflow-hidden flex items-center justify-center shadow-2xl">
                
                {/* Dynamic grid lines */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.05]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.2px)',
                    backgroundSize: '24px 24px'
                  }}
                />

                {/* Chancery slant lines overlay */}
                {canvasSlant && (
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.07]"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 35px, #C9A96E 36px, #C9A96E 37px)',
                      backgroundSize: '100% 100%'
                    }}
                  />
                )}

                {/* Autogenerated calligraphy draw sequence */}
                <div className="w-full max-w-lg z-10 px-8">
                  <svg viewBox="0 0 500 200" className="w-full">
                    {/* Golden traditional calligraphy paths with css anim */}
                    <path 
                      d="M 50,100 C 180,20 280,180 380,80 C 420,40 450,110 480,70" 
                      fill="none"
                      stroke="#A07840" 
                      strokeWidth={canvasStrokeWidth}
                      strokeLinecap="round"
                      className="ink-trace-path"
                    />
                    <path 
                      d="M 80,130 C 180,110 300,160 420,110" 
                      fill="none"
                      stroke="#C9A96E" 
                      strokeWidth={canvasStrokeWidth * 0.7}
                      strokeLinecap="round"
                      className="ink-trace-path"
                      style={{ animationDelay: '1.8s' }}
                    />
                  </svg>
                  
                  <div className="text-center pt-2">
                    <span className="font-signature text-3xl text-neutral-800 select-none animate-glow">
                      Interactive Flourish Design
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-700 bg-neutral-100/90 border border-neutral-300 px-3 py-1 rounded-full uppercase font-bold shadow-sm">
                    Simulating Pressure: 82%
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Before/After Handwriting Transformation Slider */}
      <section className="px-6 md:px-12 py-24 bg-[#0A0908] border-b border-[#C9A96E]/10">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold">Interactive Before/After Transformation</span>
            <h2 className="text-3xl md:text-4xl font-semibold font-luxury text-[#F0EAE1]">From Pencil Sketch to Gold Masterpiece</h2>
            <p className="text-xs text-[#A39E95]">Drag the visual slider below to view the copperplate calligraphy vector render engine in action.</p>
          </div>

          {/* Interactive transformation slider viewport */}
          <div className="relative aspect-[16/9] w-full rounded-2xl border border-[#C9E96E]/10 overflow-hidden select-none shadow-2xl">
            {/* Before (sketch layout) */}
            <div className="absolute inset-0 bg-[#1A1816] flex items-center justify-center p-8">
              <div className="text-center max-w-sm space-y-3 opacity-60">
                <span className="text-[13rem] font-serif text-neutral-600 leading-none">C</span>
                <p className="text-xs text-neutral-500 font-mono tracking-widest uppercase">Initial Rough Graphite Sketch</p>
              </div>
            </div>

            {/* After (High-definition golden render overlay) */}
            <div 
              className="absolute inset-y-0 left-0 right-0 bg-neutral-950 flex items-center justify-center p-8 overflow-hidden transition-all duration-75"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.08),transparent_70%)] pointer-events-none" />
              <div className="text-center max-w-sm space-y-3 z-10 animate-fade-in">
                <span className="text-[13rem] font-luxury gradient-gold-text leading-none animate-glow font-bold">C</span>
                <p className="text-xs text-[#C9A96E] font-mono tracking-widest uppercase font-semibold">Rendered Vector Copperplate</p>
              </div>
            </div>

            {/* Slider bar overlay line */}
            <div 
              className="absolute inset-y-0 w-1 bg-[#C9A96E] cursor-ew-resize z-20"
              style={{ left: `${sliderPosition}%` }}
            />

            {/* Interactive slide inputs */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPosition}
              onChange={(e) => setSliderPosition(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
            />
          </div>

        </div>
      </section>

      {/* 4. Highly Interactive 3D Feature Cards */}
      <section className="px-6 md:px-12 py-28 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold">Interactive Features</span>
            <h2 className="text-4xl md:text-5xl font-semibold font-luxury text-[#F0EAE1]">Architected for Creative Excellence</h2>
            <p className="text-sm text-[#A39E95]">No repetitive grids. Each component is a miniature standalone masterpiece crafted to elevate your creative journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1: Digital Canvas */}
            <div className="luxury-card p-8 flex flex-col justify-between h-[320px] group transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A07840]/20 to-[#C9A96E]/5 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform">
                <Paintbrush className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold font-luxury text-[#F0EAE1] group-hover:text-[#C9A96E] transition-colors">Virtual Canvas Suite</h3>
                <p className="text-xs text-[#A39E95] leading-relaxed">
                  Advanced mouse and stylus pressure sensitivity controls, custom ink feathering adjustments, and guidelines overlay layouts.
                </p>
              </div>
              <div className="flex justify-end pt-2 border-t border-[#C9A96E]/5">
                <span className="text-[9px] font-mono tracking-widest text-[#C9A96E] uppercase font-semibold">Learn More →</span>
              </div>
            </div>

            {/* Feature 2: AI Analysis */}
            <div className="luxury-card p-8 flex flex-col justify-between h-[320px] group transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A07840]/20 to-[#C9A96E]/5 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold font-luxury text-[#F0EAE1] group-hover:text-[#C9A96E] transition-colors">AI Alignment Diagnostics</h3>
                <p className="text-xs text-[#A39E95] leading-relaxed">
                  Snap snapshots of paper calligraphy works to let the AI neural engine compute slant consistency and pressure metrics instantly.
                </p>
              </div>
              <div className="flex justify-end pt-2 border-t border-[#C9A96E]/5">
                <span className="text-[9px] font-mono tracking-widest text-[#C9A96E] uppercase font-semibold">Explore Diagnostic →</span>
              </div>
            </div>

            {/* Feature 3: Interactive QRs */}
            <div className="luxury-card p-8 flex flex-col justify-between h-[320px] group transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A07840]/20 to-[#C9A96E]/5 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold font-luxury text-[#F0EAE1] group-hover:text-[#C9A96E] transition-colors">Interactive QR Presentation</h3>
                <p className="text-xs text-[#A39E95] leading-relaxed">
                  Generate beautiful QR-codes for each creation. Scanning displays animated handwriting reveal paths with ambient Zens strings.
                </p>
              </div>
              <div className="flex justify-end pt-2 border-t border-[#C9A96E]/5">
                <span className="text-[9px] font-mono tracking-widest text-[#C9A96E] uppercase font-semibold">See Scan Demo →</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Daily Inspirational Quote Card (Artistic reveal showcase) */}
      <section className="px-6 md:px-12 py-24 bg-[#090807] relative">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold">Artistic Motivation reveal</span>
            <h2 className="text-3xl md:text-4xl font-semibold font-luxury text-[#F0EAE1]">Compiling Daily Inspirations</h2>
            <p className="text-xs text-[#A39E95]">Experience ink stroke animations that reveal gorgeous hand-drawn masterpieces on hover.</p>
          </div>

          <div 
            onClick={() => {
              setIsRevealed(!isRevealed)
              toast.success(isRevealed ? 'Card reset' : 'Ink reveal sequence triggered successfully!')
            }}
            className="quote-card p-12 md:p-16 border border-[#C9A96E]/15 rounded-3xl text-center relative overflow-hidden cursor-pointer hover:border-[#C9A96E]/40 transition-all duration-500 shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.06),transparent_70%)]" />
            
            <div className="relative space-y-6 z-10">
              <span className="badge mx-auto select-none uppercase tracking-widest text-[9px] border-[#C9A96E]/20 bg-[#C9A96E]/10">Interactive Daily Quote</span>
              
              {isRevealed ? (
                <h3 className="text-4xl md:text-6xl font-signature text-[#F5DCA8] leading-normal py-4 animate-glow select-none">
                  "Letters are things, not pictures of things."
                </h3>
              ) : (
                <h3 className="text-4xl md:text-6xl font-signature text-neutral-600/50 leading-normal py-4 select-none italic">
                  "Click card to reveal handwritten stroke animation"
                </h3>
              )}

              <p className="text-sm text-[#C9A96E] font-mono tracking-wider font-semibold">
                — Eric Gill (Lettering Pioneer)
              </p>

              <div className="divider opacity-30 max-w-xs mx-auto" />

              <div className="flex items-center justify-center gap-3">
                <button className="p-3 rounded-full bg-[#080706] hover:bg-[#C9A96E]/10 border border-neutral-800 text-[#A39E95] hover:text-[#C9A96E] transition-all">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="p-3 rounded-full bg-[#080706] hover:bg-[#C9A96E]/10 border border-neutral-800 text-[#A39E95] hover:text-[#C9A96E] transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. AI Features & Diagnostics Showcase Section */}
      <section id="ai-analyzer" className="px-6 md:px-12 py-28 relative border-t border-b border-[#C9A96E]/10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold">AI Diagnostics Engine</span>
            <h2 className="text-4xl md:text-5xl font-semibold font-luxury text-[#F0EAE1]">AI Stroke Geometric Analyzer</h2>
            <p className="text-sm text-[#A39E95]">Renders real-time analysis reports detailing slant matches, spacing curves, and stroke geometry outlines.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Tabs for features */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider font-mono text-[#A39E95]">Diagnostic Parameters</h4>
              
              <div className="space-y-2">
                {[
                  { id: 'spacing', title: "Spacing Consistency Check", desc: "Computes spacing metrics between letters A-Z." },
                  { id: 'slant', title: "55° Slant Angle Metric", desc: "Computes letter alignment against standard guides." },
                  { id: 'pressure', title: "Ink Pressure Balance Maps", desc: "Monitors brush pressure variance." }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-1 ${
                      activeTab === tab.id 
                        ? 'border-[#C9A96E] bg-[#C9A96E]/15 text-[#C9A96E] shadow-gold' 
                        : 'border-neutral-800 text-[#A39E95] hover:border-[#C9A96E]/30'
                    }`}
                  >
                    <span className="text-base font-semibold font-luxury">{tab.title}</span>
                    <span className="text-xs text-neutral-400 leading-normal">{tab.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnostic reports scoreboard panel */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-2xl bg-[#0D0B0A] border border-[#C9A96E]/15 space-y-6 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#C9A96E]/5 rounded-full filter blur-2xl" />
                
                <div className="flex justify-between items-center border-b border-[#C9A96E]/10 pb-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider font-mono text-[#C9A96E] flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 animate-pulse" /> Diagnostic Outlines Report
                  </h4>
                  <span className="text-xs font-mono text-neutral-500">Engine V2.4</span>
                </div>

                <div className="space-y-6">
                  {/* Dynamic Score Indicator widgets based on active tab state */}
                  {activeTab === 'spacing' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#A39E95] font-mono uppercase tracking-wider">Spacing Consistency Accuracy</span>
                        <span className="text-[#C9A96E] font-bold text-sm">92% Match</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '92%' }} /></div>
                      <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                        Outstanding spacing vectors! Spacings around curves ('o', 'c') matches standard Chancery ratios closely. Focus on maintaining width consistency on letters like 'm' and 'n'.
                      </p>
                    </div>
                  )}

                  {activeTab === 'slant' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#A39E95] font-mono uppercase tracking-wider">55° Slant Guideline Alignment</span>
                        <span className="text-[#C9A96E] font-bold text-sm">86% Accuracy</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '86%' }} /></div>
                      <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                        Your vertical stroke slants match standard copperplate vectors. Some slight deviation observed on final loops. Practice downward shading transitions to lock alignments.
                      </p>
                    </div>
                  )}

                  {activeTab === 'pressure' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#A39E95] font-mono uppercase tracking-wider">Ink Pressure Distribution</span>
                        <span className="text-[#C9A96E] font-bold text-sm">95% Balance</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '95%' }} /></div>
                      <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                        Pristine stroke pressure balance! Beautiful high-contrast lines showing high pen-shading accuracy on downward strokes. Keep up the clean sweeps.
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 flex gap-3 items-center">
                  <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-[11px] text-[#A39E95] leading-normal">
                    Interactive diagnostic reports can be generated for each upload snapshot. Unlocks **Streaks Badge XP**.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Modern Gamification Progress Hub Widget */}
      <section className="px-6 md:px-12 py-24 bg-[#0A0908]">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold">Gamification Progress Hub</span>
            <h2 className="text-3xl md:text-4xl font-semibold font-luxury text-[#F0EAE1]">Practice Streaks & Level Indicators</h2>
            <p className="text-xs text-[#A39E95]">Practice daily challenges, collect badges, and unlock custom golden brushes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Gamification Streak & XP Level widget */}
            <div className="p-6 rounded-2xl bg-[#0D0B0A] border border-[#C9A96E]/15 space-y-6 relative overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#C9A96E] animate-bounce" />
                  <span className="text-xs uppercase font-mono tracking-widest text-[#C9A96E] font-bold">Daily Streak Leaderboard</span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">Level 4 Scholar</span>
              </div>

              {/* Progress metrics */}
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#A39E95]">Artist Scholar XP Progress</span>
                  <span className="text-[#C9A96E]">850 / 1000 XP</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '85%' }} /></div>
              </div>

              {/* Achievements row */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                {[
                  { title: "Initiate Badge", icon: "🖋️" },
                  { title: "Flourish Elite", icon: "✨" },
                  { title: "Streak Master", icon: "🔥" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-900 space-y-1.5">
                    <span className="text-xl block">{item.icon}</span>
                    <span className="text-[9px] text-neutral-400 block font-mono font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Challenge Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0D0B0A] to-[#1C1814] border border-[#C9A96E]/20 space-y-5 flex flex-col justify-between shadow-2xl">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C9A96E] animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold">Active Scholar Challenge</span>
                </div>
                <h4 className="text-lg font-semibold font-luxury text-[#F5DCA8]">Practice Chancery "G" curves today!</h4>
                <p className="text-xs text-[#A39E95] leading-relaxed">
                  Lock Chancery slants within 88% accuracy scores on the live tracing board. Earn custom Tombow brush nibs!
                </p>
              </div>

              <div className="pt-2">
                <Link to="/practice" className="w-full btn-luxury py-2.5 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
                  Accept Daily Challenge <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Interactive QR scanning demo Section */}
      <section id="interactive-qr" className="px-6 md:px-12 py-28 relative border-t border-[#C9A96E]/10 bg-[#080706]">
        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold">QR Artwork Reveals</span>
            <h2 className="text-4xl md:text-5xl font-semibold font-luxury text-[#F0EAE1]">Scan & Experience Handwriting reveal</h2>
            <p className="text-sm text-[#A39E95]">Generate interactive artwork presentations. Scanning instantly reveals stroke tracing sequences with music.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Interactive handwriting showcase panel */}
            <div className="relative aspect-[16/10] w-full rounded-2xl bg-[#EDE5D5] border border-[#C9A96E]/20 overflow-hidden flex items-center justify-center p-8 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.03),transparent_70%)] pointer-events-none" />
              
              <div className="w-full max-w-xs text-center space-y-4 z-10 animate-fade-up">
                <svg viewBox="0 0 400 150" className="w-full">
                  <path 
                    d="M 40,80 C 120,30 200,110 320,50" 
                    fill="none" 
                    stroke="#1A1714" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    className="ink-trace-path" 
                  />
                </svg>
                <p className="font-signature text-2xl text-neutral-800 select-none">Zen Signature reveal</p>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                <button 
                  onClick={() => {
                    setIsPlayingMusic(!isPlayingMusic)
                    toast.success(isPlayingMusic ? 'Music muted' : 'Playing Zen ambient strings overlay...')
                  }}
                  className={`p-2.5 rounded-full border transition-all ${
                    isPlayingMusic ? 'bg-[#C9A96E] border-[#C9A96E] text-neutral-950' : 'bg-[#080706] border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Music className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* QR Scan Details */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold font-luxury text-[#F0EAE1]">Interactive Scanning Demo</h3>
                <p className="text-xs text-[#A39E95] leading-relaxed">
                  Every letter compile generates a unique presentation card with customizable backgrounds, traditional ink templates, dynamic reveal trails, and audio notes. Perfect for sharing on creative platforms.
                </p>
              </div>

              {/* QR Code generator mock widget */}
              <div className="p-6 rounded-2xl bg-[#0D0B0A] border border-[#C9A96E]/15 flex items-center justify-between gap-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center border border-[#C9A96E]/20">
                    <QrCode className="w-full h-full text-neutral-950" />
                  </div>
                  <div className="text-left space-y-1">
                    <h4 className="text-xs font-semibold text-[#F0EAE1]">Shareable Link Compiled</h4>
                    <p className="text-[10px] text-neutral-500 font-mono">calliverse.app/artwork/scans</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={handleCopyCode} className="btn-luxury-outline py-2 px-4 text-[10px] uppercase font-bold tracking-wider">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Luxury Pricing & Plans Section */}
      <section id="pricing-section" className="px-6 md:px-12 py-28 bg-[#090807] border-b border-[#C9A96E]/10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold">Premium SaaS Plans</span>
            <h2 className="text-4xl md:text-5xl font-semibold font-luxury text-[#F0EAE1]">Choose Your Creative Studio</h2>
            <p className="text-sm text-[#A39E95]">Master Chancery, Roman and Gothic scripts with our flexible options.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Plan 1: Free */}
            <div 
              onClick={() => setSelectedPlan('free')}
              className={`luxury-card p-8 flex flex-col justify-between h-[420px] cursor-pointer transition-all duration-300 ${
                selectedPlan === 'free' ? 'border-[#C9A96E] bg-[#C9A96E]/5 shadow-gold' : 'border-neutral-900'
              }`}
            >
              <div className="space-y-4">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#A39E95] font-bold block">Free Starter</span>
                <h3 className="text-2xl font-semibold font-luxury text-[#F0EAE1]">Calligraphy Hobby</h3>
                <p className="text-3xl font-bold font-luxury text-[#C9A96E]">$0 <span className="text-xs text-neutral-500 font-normal">/ month</span></p>
                <div className="divider opacity-20 my-2" />
                <ul className="space-y-2.5 text-xs text-[#A39E95]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Access 4 Tracing levels</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Save up to 5 vector designs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Standard Canvas brushes</li>
                </ul>
              </div>
              <Link to="/signup" className="btn-luxury-outline w-full py-3 text-xs uppercase font-bold">
                Get Started Free
              </Link>
            </div>

            {/* Plan 2: Pro (Recommended) */}
            <div 
              onClick={() => setSelectedPlan('premium')}
              className={`p-8 rounded-3xl bg-gradient-to-br from-[#1C1814] to-[#0A0908] border flex flex-col justify-between h-[450px] md:-translate-y-4 cursor-pointer transition-all duration-300 ${
                selectedPlan === 'premium' ? 'border-[#C9A96E] shadow-gold' : 'border-[#C9A96E]/30'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold block">Recommended Plan</span>
                  <span className="text-[8px] uppercase font-mono tracking-widest text-[#080706] bg-[#C9A96E] px-2 py-0.5 rounded font-bold">Popular</span>
                </div>
                <h3 className="text-2xl font-semibold font-luxury text-[#F0EAE1]">Creative Pro Scholar</h3>
                <p className="text-4xl font-bold font-luxury text-[#C9A96E]">$18 <span className="text-xs text-neutral-500 font-normal">/ month</span></p>
                <div className="divider opacity-30 my-2" />
                <ul className="space-y-2.5 text-xs text-neutral-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Unlimited AI Diagnostics</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Access all 50+ Tracing guides</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Premium customizable textures</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Multi-Format PNG / PDF Exports</li>
                </ul>
              </div>
              <Link to="/signup" className="btn-luxury w-full py-3.5 text-xs uppercase font-bold">
                Upgrade Pro Now
              </Link>
            </div>

            {/* Plan 3: Enterprise / Master */}
            <div 
              onClick={() => setSelectedPlan('master')}
              className={`luxury-card p-8 flex flex-col justify-between h-[420px] cursor-pointer transition-all duration-300 ${
                selectedPlan === 'master' ? 'border-[#C9A96E] bg-[#C9A96E]/5 shadow-gold' : 'border-neutral-900'
              }`}
            >
              <div className="space-y-4">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#A39E95] font-bold block">Exclusive Plan</span>
                <h3 className="text-2xl font-semibold font-luxury text-[#F0EAE1]">Signature Master</h3>
                <p className="text-3xl font-bold font-luxury text-[#C9A96E]">$45 <span className="text-xs text-neutral-500 font-normal">/ month</span></p>
                <div className="divider opacity-20 my-2" />
                <ul className="space-y-2.5 text-xs text-[#A39E95]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Private 1-on-1 Mentor Feedback</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Custom branded QR domains</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" /> Unlocked premium brush sets</li>
                </ul>
              </div>
              <Link to="/signup" className="btn-luxury-outline w-full py-3 text-xs uppercase font-bold">
                Contact Sales
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Cinematic Testimonials */}
      <section className="px-6 md:px-12 py-24 bg-[#080706]">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] font-bold">Designer Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-semibold font-luxury text-[#F0EAE1]">Endorsed by Master Scriptors</h2>
            <p className="text-xs text-[#A39E95]">Hear what creative digital calligraphy artists think about CalliVerse.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: "The vector brush bleeding and 55 slant guides completely transformed how I design wedding stationery layouts. The interactive reveal features are an absolute masterpiece.",
                author: "Clara Bennett",
                role: "Wedding Stationary Designer",
                stars: 5
              },
              {
                text: "I was skeptical about AI analyzing handwritten snapshots. But the report matches Chancery guidelines with amazing precision, suggesting pressure balance balances instantly.",
                author: "Marcus Thorne",
                role: "Traditional Lettering Scholar",
                stars: 5
              }
            ].map((test, idx) => (
              <div key={idx} className="luxury-card p-8 space-y-6 relative overflow-hidden group">
                <div className="absolute right-4 top-4 text-[#C9A96E]/20 text-6xl font-luxury select-none leading-none">”</div>
                <div className="flex gap-1">
                  {Array.from({ length: test.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-[#cream-typo] leading-relaxed italic opacity-90">
                  "{test.text}"
                </p>
                <div className="divider opacity-10 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#F0EAE1]">{test.author}</span>
                  <span className="text-[10px] text-[#A39E95] uppercase font-mono tracking-wider">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Immersive CTA Section */}
      <section className="px-6 md:px-12 py-24 relative overflow-hidden bg-gradient-to-t from-[#0A0908] to-[#080706]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto p-12 md:p-16 border border-[#C9A96E]/20 rounded-3xl text-center space-y-8 bg-[#0D0B0A]/85 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <Award className="w-12 h-12 text-[#C9A96E] mx-auto animate-bounce" />
          <h2 className="text-4xl md:text-5xl font-semibold font-luxury text-[#F0EAE1] leading-tight">Ready to Express Your Creative Soul?</h2>
          <p className="text-xs text-[#A39E95] max-w-xl mx-auto leading-relaxed">
            Join thousands of master scripts and digital artists who are shaping the future of interactive calligraphy learning. Start your free trial today.
          </p>
          <div className="flex justify-center pt-2">
            <Link to="/signup" className="btn-luxury py-4 px-10 text-sm uppercase tracking-widest font-bold group shadow-lg shadow-[#C9A96E]/15">
              Unlock Free Trial Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="border-t border-[#C9A96E]/10 px-6 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between text-xs text-[#A39E95] gap-6 relative z-10 bg-[#080706]">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#C9A96E] fill-[#C9A96E]/10" />
          <span>© 2026 CalliVerse App. Crafted for luxury lettering and traditional excellence. All rights reserved.</span>
        </div>
        <div className="flex gap-6 font-semibold uppercase tracking-widest text-[10px]">
          <a href="#" className="hover:text-[#C9A96E] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#C9A96E] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#C9A96E] transition-colors">Contact Support</a>
        </div>
      </footer>
    </div>
  )
}
