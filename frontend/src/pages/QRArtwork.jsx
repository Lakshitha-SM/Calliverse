import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Sparkles, Play, Music, Volume2, ArrowLeft, Download, QrCode } from 'lucide-react'
import toast from 'react-hot-toast'
import InkStroke from '../components/common/InkStroke'

export default function QRArtwork() {
  const { id } = useParams()
  const [revealKey, setRevealKey] = useState(0)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const [playingVoice, setPlayingVoice] = useState(false)

  const handleReveal = () => {
    setRevealKey(prev => prev + 1)
    toast.success('Ink stroke animation replayed!', {
      icon: '🖋️',
      style: {
        background: '#171513',
        color: '#F6F0E6',
        border: '1px solid #B49A68',
      },
    })
  }

  const handleDownloadQR = () => {
    toast.success('Artisan QR seal downloaded successfully!', {
      icon: '📜',
      style: {
        background: '#171513',
        color: '#F6F0E6',
        border: '1px solid #B49A68',
      },
    })
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center p-6 relative overflow-hidden font-body paper-texture">
      <div className="w-full max-w-2xl paper-texture p-8 md:p-12 relative z-10 border border-charcoal/15 rounded-3xl shadow-paper space-y-8 text-center">
        {/* Header Actions */}
        <div className="flex justify-between items-center border-b border-charcoal/10 pb-4">
          <Link to="/portfolio" className="text-xs font-serif font-semibold text-charcoal/70 hover:text-burgundy flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return to Portfolio
          </Link>
          <span className="text-[10px] px-3 py-1 rounded-full font-mono uppercase font-bold tracking-wider bg-cream border border-charcoal/15 text-charcoal">
            Archival Interactive Artwork
          </span>
        </div>

        {/* Animated handwriting reveal viewport */}
        <div className="relative aspect-[16/9] w-full rounded-2xl bg-white border border-charcoal/15 overflow-hidden flex items-center justify-center shadow-inner">
          <div className="absolute inset-0 calli-guidelines opacity-15 pointer-events-none" />

          {/* SVG Animated Ink Reveal stroke */}
          <div className="relative z-10 w-full max-w-sm" key={revealKey}>
            <svg viewBox="0 0 400 150" className="w-full">
              <path 
                d="M 30,80 C 120,20 180,120 280,40 C 320,10 350,70 380,30" 
                className="ink-line" 
                style={{
                  stroke: '#171513',
                  strokeWidth: '4.5',
                  strokeLinecap: 'round',
                  animation: 'write 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                }}
              />
              <path 
                d="M 50,110 C 130,90 220,140 330,105" 
                className="ink-line" 
                style={{
                  stroke: '#B49A68',
                  strokeWidth: '3.5',
                  strokeLinecap: 'round',
                  animation: 'write 2.5s cubic-bezier(0.4, 0, 0.2, 1) 1.5s forwards'
                }}
              />
            </svg>
            <p className="font-script text-3xl text-ink mt-3 select-none">CalliLab Masterpiece</p>
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            {/* Music trigger */}
            <button 
              onClick={() => {
                setIsPlayingMusic(!isPlayingMusic)
                toast.success(isPlayingMusic ? 'Ambient audio muted' : 'Soft ambient Zen strings playing...')
              }}
              className={`p-2.5 rounded-full border transition-all ${
                isPlayingMusic ? 'bg-ink border-ink text-paper' : 'bg-white border-charcoal/20 text-charcoal hover:text-ink'
              }`}
              title="Toggle Ambient Audio"
            >
              <Music className="w-4 h-4" />
            </button>
            
            {/* Voice support play trigger */}
            <button 
              onClick={() => {
                setPlayingVoice(!playingVoice)
                toast.success(playingVoice ? 'Voice note paused' : 'Artist commentary: "Crafted with 55° copperplate slant on archival linen paper."')
              }}
              className={`p-2.5 rounded-full border transition-all ${
                playingVoice ? 'bg-burgundy border-burgundy text-white' : 'bg-white border-charcoal/20 text-charcoal hover:text-ink'
              }`}
              title="Play Artist Voice Note"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic description & actions */}
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl font-serif font-bold text-ink">Ink Stroke Preserved</h2>
          <p className="text-xs text-charcoal/70 leading-relaxed font-sans">
            The vector stroke curves and pressure gradients have been engraved into your portfolio archive. Scan or share the QR below to replay the physical drawing stroke-by-stroke.
          </p>
        </div>

        {/* QR Code and Share Layout */}
        <div className="p-6 rounded-2xl bg-white border border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-16 h-16 rounded-xl bg-cream p-2 border border-charcoal/15 flex items-center justify-center shrink-0">
              <QrCode className="w-full h-full text-ink" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-serif font-bold text-ink">Archival QR Verification</h4>
              <p className="text-[11px] text-charcoal/60 font-sans">Direct link to interactive calligraphy playback.</p>
            </div>
          </div>

          <div className="flex gap-2.5 w-full sm:w-auto">
            <button 
              onClick={handleDownloadQR} 
              className="btn-outline-ink px-4 py-2 rounded-xl text-xs font-serif font-semibold flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download QR
            </button>
            <button 
              onClick={handleReveal} 
              className="btn-burgundy px-5 py-2 rounded-xl text-xs font-serif font-semibold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5" /> Replay Stroke
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
