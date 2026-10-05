import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Sparkles, Play, Music, Volume2, ArrowLeft, Download, QrCode } from 'lucide-react'
import toast from 'react-hot-toast'

export default function QRArtwork() {
  const { id } = useParams()
  const [revealKey, setRevealKey] = useState(0)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const [playingVoice, setPlayingVoice] = useState(false)

  const handleReveal = () => {
    setRevealKey(prev => prev + 1)
    toast.success('Ink reveal animation played!')
  }

  const handleDownloadQR = () => {
    toast.success('QR Code downloaded successfully!')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 relative overflow-hidden selection:bg-amber-500 selection:text-neutral-950 font-body ink-bg">
      {/* Decorative Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full filter blur-3xl" />

      <div className="w-full max-w-2xl glass p-8 md:p-12 relative z-10 border-amber-500/10 shadow-2xl space-y-8 text-center">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center border-b border-amber-900/10 pb-4">
          <Link to="/dashboard" className="text-xs text-neutral-400 hover:text-amber-500 flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Studio Dashboard
          </Link>
          <span className="badge uppercase tracking-widest text-[9px] font-semibold">QR Interactive Experience</span>
        </div>

        {/* Animated handwriting reveal viewport */}
        <div className="relative aspect-[16/9] w-full rounded-2xl bg-[#F5F0E8] border border-amber-900/20 overflow-hidden flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.04),transparent_70%)]" />

          {/* SVG Animated Ink Reveal stroke */}
          <div className="relative z-10 w-full max-w-sm" key={revealKey}>
            <svg viewBox="0 0 400 150" className="w-full">
              <path 
                d="M 30,80 C 120,20 180,120 280,40 C 320,10 350,70 380,30" 
                className="ink-line" 
                style={{
                  stroke: '#1A1714',
                  strokeWidth: '4.5',
                  strokeLinecap: 'round',
                  animation: 'write 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                }}
              />
              <path 
                d="M 50,110 C 130,90 220,140 330,105" 
                className="ink-line" 
                style={{
                  stroke: '#C9A96E',
                  strokeWidth: '3.5',
                  strokeLinecap: 'round',
                  animation: 'write 2.5s cubic-bezier(0.4, 0, 0.2, 1) 1.5s forwards'
                }}
              />
            </svg>
            <p className="font-script text-2xl text-neutral-800 mt-2 select-none">CalliVerse Masterpiece</p>
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            {/* Music trigger */}
            <button 
              onClick={() => {
                setIsPlayingMusic(!isPlayingMusic)
                toast.success(isPlayingMusic ? 'Music muted' : 'Soft ambient Zen strings playing...')
              }}
              className={`p-2.5 rounded-full border transition-all ${
                isPlayingMusic ? 'bg-amber-500 border-amber-500 text-neutral-950' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
              title="Toggle Ambient Audio"
            >
              <Music className="w-4 h-4" />
            </button>
            
            {/* Voice support play trigger */}
            <button 
              onClick={() => {
                setPlayingVoice(!playingVoice)
                toast.success(playingVoice ? 'Voice note stopped' : 'Playing artist voice message: "Welcome to my customized ink signature design!"')
              }}
              className={`p-2.5 rounded-full border transition-all ${
                playingVoice ? 'bg-amber-500 border-amber-500 text-neutral-950' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
              title="Play Artist Voice Note"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic description & actions */}
        <div className="space-y-4 max-w-md mx-auto">
          <h2 className="text-2xl font-bold font-display text-neutral-100">Ink stroke successfully compiled!</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            The unique calligraphy animation curves have been saved to your digital portfolio directory. Share the QR below so friends can watch your signature render stroke-by-stroke with soothing ambient strings.
          </p>
        </div>

        {/* QR Code and Share Layout */}
        <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-900/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-white p-2 border border-amber-500/30 flex items-center justify-center">
              <QrCode className="w-full h-full text-neutral-950" />
            </div>
            <div className="text-left space-y-1">
              <h4 className="text-sm font-semibold text-neutral-200">Unique Share Link Ready</h4>
              <p className="text-[10px] text-neutral-400">Scan this code to load immediate reveal animations.</p>
            </div>
          </div>

          <div className="flex gap-2.5 w-full sm:w-auto">
            <button onClick={handleDownloadQR} className="btn btn-ghost btn-sm flex-1 sm:flex-none flex items-center justify-center gap-1.5 hover:border-amber-500">
              <Download className="w-4 h-4" /> Download QR
            </button>
            <button onClick={handleReveal} className="btn btn-primary btn-sm flex-1 sm:flex-none flex items-center justify-center gap-1.5">
              <Play className="w-4 h-4" /> Replay Strokes
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
