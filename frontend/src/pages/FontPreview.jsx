import { useState } from 'react'
import { Sparkles, Type, Copy, CheckCircle, Paintbrush } from 'lucide-react'
import toast from 'react-hot-toast'

export default function FontPreview() {
  const [inputText, setInputText] = useState('CalliVerse Art')
  const [copiedId, setCopiedId] = useState(null)

  const styles = [
    {
      id: 'gothic',
      name: 'Gothic / Blackletter',
      fontClass: 'font-fell',
      styleDesc: 'Bold, heavy medieval angles perfect for manuscripts.',
      border: 'border-amber-900/40',
      bg: 'from-amber-950/20 to-neutral-900',
    },
    {
      id: 'modern',
      name: 'Modern Brush Lettering',
      fontClass: 'font-script',
      styleDesc: 'Flowing cursive strokes suitable for postcards.',
      border: 'border-amber-500/25',
      bg: 'from-neutral-900 to-amber-950/15',
    },
    {
      id: 'elegant',
      name: 'Cormorant Serif Script',
      fontClass: 'font-display',
      styleDesc: 'Slender, high-contrast stems for wedding stationary designs.',
      border: 'border-amber-900/30',
      bg: 'from-amber-900/10 to-neutral-900',
    },
    {
      id: 'playfair',
      name: 'Classic Vintage Roman',
      fontClass: 'font-serif',
      styleDesc: 'Timeless Roman lettering for luxury brand monograms.',
      border: 'border-neutral-850',
      bg: 'from-neutral-900 to-neutral-950',
    }
  ]

  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success('Styled calligraphy text copied!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100 flex items-center gap-2">
            Smart Font Preview System <Type className="w-5 h-5 text-amber-500 fill-amber-500/10" />
          </h1>
          <p className="text-xs text-neutral-400">Type your desired message below to immediately preview it rendered across multiple high-end calligraphy type styles.</p>
        </div>
      </div>

      {/* Input controls */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-900/15 space-y-4">
        <label className="label uppercase tracking-widest font-mono text-[10px] text-amber-500 font-semibold">Enter Calligraphy Text Preview Input</label>
        <div className="relative">
          <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Type styled words..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input pl-12 py-4 text-base"
          />
        </div>
      </div>

      {/* Style Previews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {styles.map((style) => (
          <div key={style.id} className={`card p-6 flex flex-col justify-between hover-glow transition-all duration-300 relative overflow-hidden ${style.border}`}>
            <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-xl" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs uppercase font-mono tracking-widest text-amber-500 font-semibold">{style.name}</h3>
                <span className="text-[10px] text-neutral-500 font-mono">{style.fontClass} style</span>
              </div>

              {/* Big Font Preview Container */}
              <div className={`p-8 rounded-xl bg-gradient-to-br ${style.bg} border border-amber-500/5 flex items-center justify-center min-h-[140px] text-center`}>
                <p 
                  className={`text-4xl md:text-5xl text-amber-200 transition-all font-light ${style.fontClass} tracking-wide select-all`}
                >
                  {inputText || 'Type words above'}
                </p>
              </div>

              <p className="text-xs text-neutral-400 leading-normal">
                {style.styleDesc}
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-amber-900/5 mt-4">
              <button 
                onClick={() => handleCopyText(style.id, inputText)}
                className="text-xs text-neutral-400 hover:text-amber-500 flex items-center gap-1.5 transition-colors"
              >
                {copiedId === style.id ? (
                  <><CheckCircle className="w-3.5 h-3.5 text-amber-500" /> Copied!</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Copy String</>
                )}
              </button>

              <button 
                onClick={() => toast.success('Font loaded onto active studio pen!')}
                className="text-xs text-amber-400 font-semibold hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <Paintbrush className="w-3.5 h-3.5" /> Load Font to Pen
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
