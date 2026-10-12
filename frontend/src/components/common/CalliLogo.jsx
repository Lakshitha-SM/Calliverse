import { Link } from 'react-router-dom'

export default function CalliLogo({ className = '', size = 'md', to = '/' }) {
  const isSm = size === 'sm'
  const isLg = size === 'lg'

  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Artisan Nib Icon */}
      <div className={`relative flex items-center justify-center rounded-full border transition-all duration-300 ${
        isSm ? 'w-7 h-7' : isLg ? 'w-10 h-10' : 'w-8 h-8'
      } bg-[#171513] text-[#F6F0E6] border-[#171513] group-hover:bg-[#302B27]`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`${isSm ? 'w-3.5 h-3.5' : isLg ? 'w-5 h-5' : 'w-4 h-4'} text-[#F6F0E6] transform -rotate-45 group-hover:scale-105 transition-transform`}
        >
          {/* Calligraphy Dip Pen Nib Symbol */}
          <path d="M12 2L4 14l3 3 8-8 1-3-4-4z" />
          <path d="M4 14l4 4" />
          <path d="M14 6l4 4" />
          <circle cx="9" cy="11" r="1" fill="currentColor" />
          <line x1="9" y1="11" x2="4" y2="16" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <span className={`font-serif tracking-tight font-semibold text-[#171513] leading-none ${
          isSm ? 'text-lg' : isLg ? 'text-2xl' : 'text-xl'
        }`}>
          Calli<span className="font-script italic text-[#A85D55] font-normal text-[1.25em] ml-0.5">Lab</span>
        </span>
        <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-[#6B5140] font-medium mt-0.5 opacity-80">
          Studio
        </span>
      </div>
    </Link>
  )
}
