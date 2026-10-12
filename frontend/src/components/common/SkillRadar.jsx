export default function SkillRadar({
  skills = {
    formation: 92,
    spacing: 76,
    alignment: 88,
    strokeControl: 68,
    flourishing: 52
  },
  size = 220,
  className = ''
}) {
  const categories = [
    { key: 'formation', label: 'Letter Formation', val: skills.formation || 92 },
    { key: 'spacing', label: 'Spacing', val: skills.spacing || 76 },
    { key: 'alignment', label: 'Alignment', val: skills.alignment || 88 },
    { key: 'strokeControl', label: 'Stroke Control', val: skills.strokeControl || 68 },
    { key: 'flourishing', label: 'Flourishing', val: skills.flourishing || 52 }
  ]

  const center = size / 2
  const radius = size * 0.38
  const total = categories.length

  // Calculate polygon points for concentric rings (levels 0.25, 0.5, 0.75, 1.0)
  const rings = [0.25, 0.5, 0.75, 1.0]

  const getCoordinates = (value, index) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2
    const r = (value / 100) * radius
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    }
  }

  // Polygon points for active user skills
  const skillPoints = categories.map((cat, idx) => {
    const coords = getCoordinates(cat.val, idx)
    return `${coords.x},${coords.y}`
  }).join(' ')

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Background Concentric Radar Polygons */}
        {rings.map((ringFactor, rIdx) => {
          const ringPoints = categories.map((_, idx) => {
            const x = center + (radius * ringFactor) * Math.cos((Math.PI * 2 / total) * idx - Math.PI / 2)
            const y = center + (radius * ringFactor) * Math.sin((Math.PI * 2 / total) * idx - Math.PI / 2)
            return `${x},${y}`
          }).join(' ')

          return (
            <polygon 
              key={rIdx} 
              points={ringPoints} 
              fill={rIdx === 3 ? 'rgba(239, 229, 213, 0.35)' : 'none'} 
              stroke="rgba(107, 81, 64, 0.15)" 
              strokeWidth="1" 
              strokeDasharray={rIdx < 3 ? '2 2' : 'none'}
            />
          )
        })}

        {/* Axis Spokes from center */}
        {categories.map((_, idx) => {
          const coords = getCoordinates(100, idx)
          return (
            <line 
              key={idx} 
              x1={center} 
              y1={center} 
              x2={coords.x} 
              y2={coords.y} 
              stroke="rgba(107, 81, 64, 0.18)" 
              strokeWidth="1" 
            />
          )
        })}

        {/* User Skills Polygon with Terracotta Wash Fill */}
        <polygon 
          points={skillPoints} 
          fill="rgba(168, 93, 85, 0.18)" 
          stroke="#A85D55" 
          strokeWidth="1.75" 
          strokeLinejoin="round" 
        />

        {/* Vertex Markers */}
        {categories.map((cat, idx) => {
          const coords = getCoordinates(cat.val, idx)
          return (
            <g key={idx}>
              <circle cx={coords.x} cy={coords.y} r="3.5" fill="#171513" stroke="#F6F0E6" strokeWidth="1.5" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
