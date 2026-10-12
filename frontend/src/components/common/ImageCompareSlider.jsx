import { useState, useRef } from 'react'

export default function ImageCompareSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'First Attempt',
  afterLabel = 'Latest Attempt',
  beforeScore = 61,
  afterScore = 84,
  className = ''
}) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPos(percent)
  }

  const onMouseMove = (e) => handleMove(e.clientX)
  const onTouchMove = (e) => handleMove(e.touches[0].clientX)

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Score Header Indicators */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6B5140]" />
          <span className="font-serif text-[#6B5140] font-medium">{beforeLabel}</span>
          <span className="px-2 py-0.5 rounded-md bg-[#EFE5D5] text-[#171513] font-mono text-[11px] font-bold">
            {beforeScore}/100
          </span>
        </div>

        <div className="text-center px-3 py-1 rounded-full bg-[#F4E8E6] text-[#A85D55] font-sans font-bold text-[11px] border border-[#D8AFA9]">
          +{afterScore - beforeScore} Improvement
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-[#171513] text-[#F6F0E6] font-mono text-[11px] font-bold">
            {afterScore}/100
          </span>
          <span className="font-serif text-[#171513] font-medium">{afterLabel}</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#A85D55]" />
        </div>
      </div>

      {/* Comparison Viewport */}
      <div 
        ref={containerRef}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[rgba(107,81,64,0.2)] bg-[#FAF6F0] cursor-ew-resize select-none shadow-sm"
      >
        {/* Right / After Image (Full background) */}
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-[#FAF6F0]">
          {afterImage ? (
            <img src={afterImage} alt="Latest attempt" className="w-full h-full object-contain" />
          ) : (
            <span className="font-script text-8xl text-[#171513] opacity-80">a</span>
          )}
          <span className="absolute bottom-3 right-3 text-[10px] uppercase font-mono tracking-wider text-[#A85D55] bg-white/90 px-2.5 py-1 rounded border border-[#D8AFA9]">
            {afterLabel}
          </span>
        </div>

        {/* Left / Before Image (Clipped overlay) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden flex items-center justify-center bg-[#EFE5D5]"
          style={{ width: `${sliderPos}%` }}
        >
          <div 
            className="absolute inset-0 flex items-center justify-center p-6"
            style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
          >
            {beforeImage ? (
              <img src={beforeImage} alt="First attempt" className="w-full h-full object-contain" />
            ) : (
              <span className="font-script text-8xl text-[#6B5140] opacity-50 transform -rotate-3">a</span>
            )}
          </div>
          <span className="absolute bottom-3 left-3 text-[10px] uppercase font-mono tracking-wider text-[#6B5140] bg-white/90 px-2.5 py-1 rounded border border-[rgba(107,81,64,0.2)]">
            {beforeLabel}
          </span>
        </div>

        {/* Slider Divider Line & Handle */}
        <div 
          className="absolute inset-y-0 w-0.5 bg-[#171513] shadow-[0_0_8px_rgba(23,21,19,0.3)] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#171513] text-[#F6F0E6] flex items-center justify-center text-[10px] shadow-md border-2 border-[#F6F0E6]">
            ⇄
          </div>
        </div>
      </div>
    </div>
  )
}
