export default function AchievementStamp({
  label = 'COMPLETED',
  date = 'DAY 01',
  active = true,
  size = 'md',
  className = ''
}) {
  const isSm = size === 'sm'

  if (!active) {
    return (
      <div className={`relative flex flex-col items-center justify-center rounded-full border border-dashed border-[rgba(107,81,64,0.3)] bg-transparent text-[#6B5140] opacity-50 ${
        isSm ? 'w-10 h-10 text-[9px]' : 'w-14 h-14 text-[10px]'
      } ${className}`}>
        <span className="font-mono font-medium">{date}</span>
      </div>
    )
  }

  return (
    <div className={`relative flex flex-col items-center justify-center rounded-full border-2 border-[#A85D55] bg-[#F4E8E6] text-[#A85D55] transform -rotate-6 shadow-xs animate-stamp select-none ${
      isSm ? 'w-10 h-10 text-[9px]' : 'w-14 h-14 text-[10px]'
    } ${className}`}>
      {/* Inner fine concentric ring */}
      <div className="absolute inset-1 rounded-full border border-[rgba(168,93,85,0.4)] pointer-events-none" />
      <span className="font-mono font-bold leading-none">{date}</span>
      <span className="text-[7px] uppercase font-sans tracking-widest font-extrabold mt-0.5">
        ✓ {label}
      </span>
    </div>
  )
}
