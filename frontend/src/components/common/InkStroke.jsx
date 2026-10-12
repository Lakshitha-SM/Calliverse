export default function InkStroke({ className = '', color = '#A85D55', width = 180, height = 24 }) {
  return (
    <svg 
      className={`overflow-visible pointer-events-none select-none ${className}`}
      width={width} 
      height={height} 
      viewBox="0 0 200 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M2 18 C 45 4, 110 22, 198 8" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="animate-ink-draw"
      />
      <circle cx="198" cy="8" r="1.5" fill={color} opacity="0.7" />
    </svg>
  )
}
