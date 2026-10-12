import { useState } from 'react'
import { Sparkles, Type, Copy, CheckCircle, Paintbrush } from 'lucide-react'
import toast from 'react-hot-toast'
import InkStroke from '../components/common/InkStroke'

export default function FontPreview() {
  const [inputText, setInputText] = useState('CalliLab Art')
  const [copiedId, setCopiedId] = useState(null)

  const styles = [
    {
      id: 'pointed',
      name: 'Pointed Pen Copperplate',
      fontClass: 'font-script',
      styleDesc: 'Slender hairlines, dramatic swelling downstrokes, and delicate entrance flourishes.',
      sampleStyle: { fontFamily: "'Pinyon Script', cursive" },
    },
    {
      id: 'gothic',
      name: 'Gothic Textura Quadrata',
      fontClass: 'font-serif',
      styleDesc: 'Monumental medieval rhythm, angular diamond serifs, and high-density vertical cadence.',
      sampleStyle: { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' },
    },
    {
      id: 'brush',
      name: 'Modern Casual Brush',
      fontClass: 'font-script',
      styleDesc: 'Dynamic organic loops, freeform descenders, and relaxed contemporary letterforms.',
      sampleStyle: { fontFamily: "'Alex Brush', cursive" },
    },
    {
      id: 'cormorant',
      name: 'Archival Display Serif',
      fontClass: 'font-serif',
      styleDesc: 'High-contrast classical serif inspired by Claude Garamont’s 16th-century typographic punches.',
      sampleStyle: { fontFamily: "'Cormorant Garamond', serif" },
    },
  ]

  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success('Calligraphy specimen copied!', {
      icon: '🖋️',
      style: {
        background: '#171513',
        color: '#F6F0E6',
        border: '1px solid #B49A68',
      },
    })
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-brown font-mono font-semibold">
            <span>CalliLab Studio</span>
            <span>•</span>
            <span>Typographic Specimen</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mt-1">
            Type Specimen & Font Preview
          </h1>
          <p className="text-sm text-charcoal/70 mt-1 max-w-xl">
            Type your phrase to evaluate character anatomy, ligatures, and cadence across traditional and modern calligraphy styles.
          </p>
        </div>
      </div>

      {/* Input controls */}
      <div className="paper-texture p-6 rounded-3xl border border-charcoal/10 shadow-paper space-y-3">
        <label className="text-xs uppercase tracking-widest font-mono text-warm-brown font-semibold block">
          Enter Calligraphy Preview Phrase
        </label>
        <div className="relative">
          <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input 
            type="text" 
            placeholder="Type styled words..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-charcoal/15 text-base text-ink placeholder:text-charcoal/40 focus:outline-none focus:border-warm-brown shadow-inner font-serif"
          />
        </div>
      </div>

      {/* Style Previews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {styles.map((style) => (
          <div 
            key={style.id} 
            className="paper-texture rounded-3xl border border-charcoal/10 shadow-paper p-6 flex flex-col justify-between group hover:shadow-paper-hover transition-all"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-charcoal/10 pb-3">
                <h3 className="text-sm font-serif font-bold text-ink">{style.name}</h3>
                <span className="text-[10px] text-warm-brown font-mono uppercase font-semibold">Specimen</span>
              </div>

              {/* Big Font Preview Container on Paper */}
              <div className="p-8 rounded-2xl bg-white border border-charcoal/15 flex items-center justify-center min-h-[140px] text-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 calli-guidelines opacity-15 pointer-events-none" />
                <p 
                  className="text-4xl md:text-5xl text-ink transition-all select-all relative z-10"
                  style={style.sampleStyle}
                >
                  {inputText || 'Type words above'}
                </p>
              </div>

              <p className="text-xs text-charcoal/70 leading-relaxed font-sans">
                {style.styleDesc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-charcoal/10">
              <button
                onClick={() => handleCopyText(style.id, inputText)}
                className="btn-outline-ink px-4 py-1.5 rounded-xl text-xs font-serif flex items-center gap-1.5 transition-all"
              >
                {copiedId === style.id ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <span className="text-[11px] font-mono text-charcoal/50">Vector Stroke Ready</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
