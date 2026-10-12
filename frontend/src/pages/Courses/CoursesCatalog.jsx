import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Play } from 'lucide-react'

/* ─────────────────────────────────────────────────────────
   INLINE SVG ARTWORK — Botanical calligraphy illustrations
───────────────────────────────────────────────────────── */

const BeginnerArtwork = () => (
  <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <defs>
      <radialGradient id="bg-beg" cx="60%" cy="40%" r="70%">
        <stop offset="0%" stopColor="#F0E6D3" />
        <stop offset="100%" stopColor="#EDE0C8" />
      </radialGradient>
      <radialGradient id="wash-beg" cx="55%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#B5C9B0" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#B5C9B0" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="360" height="200" fill="url(#bg-beg)" />
    <ellipse cx="200" cy="95" rx="90" ry="65" fill="url(#wash-beg)" />
    <ellipse cx="195" cy="90" rx="70" ry="50" fill="#A8C4A2" fillOpacity="0.18" />
    {/* Feather */}
    <g transform="translate(158,22) rotate(15)">
      <line x1="40" y1="155" x2="40" y2="10" stroke="#5A8A72" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M40,140 C28,125 10,110 8,85 C6,60 20,40 40,18" stroke="#6EA882" strokeWidth="0.8" fill="none" />
      <path d="M40,120 C30,108 16,96 14,78" stroke="#6EA882" strokeWidth="0.6" fill="none" strokeOpacity="0.7" />
      <path d="M40,100 C32,90 22,82 20,68" stroke="#6EA882" strokeWidth="0.5" fill="none" strokeOpacity="0.55" />
      <path d="M40,140 C52,125 70,110 72,85 C74,60 60,40 40,18" stroke="#6EA882" strokeWidth="0.8" fill="none" />
      <path d="M40,120 C50,108 64,96 66,78" stroke="#6EA882" strokeWidth="0.6" fill="none" strokeOpacity="0.7" />
      <path d="M40,100 C48,90 58,82 60,68" stroke="#6EA882" strokeWidth="0.5" fill="none" strokeOpacity="0.55" />
      <path d="M40,18 C20,40 6,60 8,85 C10,110 28,125 40,140 C52,125 70,110 72,85 C74,60 60,40 40,18 Z" fill="#7CB89A" fillOpacity="0.30" />
      <path d="M40,10 C38,18 36,28 40,38 C44,28 42,18 40,10 Z" fill="#4A7A62" fillOpacity="0.7" />
    </g>
    {/* Bottom-left leaves */}
    <g transform="translate(30,120)">
      <path d="M0,60 C-8,40 -5,20 10,8 C8,25 4,42 0,60 Z" fill="#8EB89A" fillOpacity="0.5" />
      <path d="M0,60 C10,40 14,22 8,8 C6,24 4,42 0,60 Z" fill="#7DAA8A" fillOpacity="0.45" />
      <line x1="0" y1="60" x2="9" y2="8" stroke="#5A8470" strokeWidth="0.7" strokeOpacity="0.5" />
    </g>
    <g transform="translate(50,132) rotate(-10)">
      <path d="M0,45 C-6,28 -4,14 8,5 C6,18 3,32 0,45 Z" fill="#8EB89A" fillOpacity="0.4" />
      <path d="M0,45 C8,28 10,14 6,5 C4,18 2,32 0,45 Z" fill="#7DAA8A" fillOpacity="0.35" />
    </g>
    {/* Script letters */}
    <text x="24" y="92" fontFamily="'Pinyon Script', cursive" fontSize="42" fill="#302B27" fillOpacity="0.75" letterSpacing="8">a</text>
    <text x="70" y="106" fontFamily="'Pinyon Script', cursive" fontSize="34" fill="#302B27" fillOpacity="0.50" letterSpacing="8">a</text>
    <text x="108" y="120" fontFamily="'Pinyon Script', cursive" fontSize="26" fill="#302B27" fillOpacity="0.30">a</text>
    {/* Top-right mini leaves */}
    <g transform="translate(290, 18) rotate(-20)">
      <path d="M0,30 C-5,18 -3,8 5,2 C4,12 2,22 0,30Z" fill="#8EB89A" fillOpacity="0.45" />
      <path d="M0,30 C6,18 8,8 5,2 C3,12 2,22 0,30Z" fill="#7DAA8A" fillOpacity="0.4" />
    </g>
    <g transform="translate(312, 28) rotate(10)">
      <path d="M0,22 C-4,13 -2,5 4,1 C3,9 2,16 0,22Z" fill="#8EB89A" fillOpacity="0.38" />
      <path d="M0,22 C4,13 6,5 4,1 C2,9 2,16 0,22Z" fill="#7DAA8A" fillOpacity="0.32" />
    </g>
    {/* Ink quote */}
    <text x="232" y="52" fontFamily="'Pinyon Script', cursive" fontSize="13" fill="#302B27" fillOpacity="0.35" transform="rotate(-5,232,52)">Small strokes</text>
    <text x="240" y="68" fontFamily="'Pinyon Script', cursive" fontSize="13" fill="#302B27" fillOpacity="0.28" transform="rotate(-5,240,68)">create big</text>
    <text x="244" y="84" fontFamily="'Pinyon Script', cursive" fontSize="13" fill="#302B27" fillOpacity="0.22" transform="rotate(-5,244,84)">progress...</text>
  </svg>
)

const IntermediateArtwork = () => (
  <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <defs>
      <radialGradient id="bg-int" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#F2E8E6" />
        <stop offset="100%" stopColor="#EDE0DC" />
      </radialGradient>
      <radialGradient id="wash-int" cx="50%" cy="55%" r="52%">
        <stop offset="0%" stopColor="#D4849A" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#D4849A" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="360" height="200" fill="url(#bg-int)" />
    <ellipse cx="180" cy="100" rx="100" ry="72" fill="url(#wash-int)" />
    <ellipse cx="175" cy="95" rx="78" ry="55" fill="#E8A0B0" fillOpacity="0.16" />
    {/* Rose feather */}
    <g transform="translate(138,22) rotate(12)">
      <line x1="40" y1="160" x2="40" y2="8" stroke="#C47A90" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M40,145 C25,128 5,110 4,82 C3,55 20,35 40,12" stroke="#D4849A" strokeWidth="0.85" fill="none" />
      <path d="M40,125 C28,110 14,98 12,76" stroke="#D4849A" strokeWidth="0.65" fill="none" strokeOpacity="0.7" />
      <path d="M40,105 C30,93 20,84 18,68" stroke="#D4849A" strokeWidth="0.55" fill="none" strokeOpacity="0.55" />
      <path d="M40,145 C55,128 75,110 76,82 C77,55 60,35 40,12" stroke="#D4849A" strokeWidth="0.85" fill="none" />
      <path d="M40,125 C52,110 66,98 68,76" stroke="#D4849A" strokeWidth="0.65" fill="none" strokeOpacity="0.7" />
      <path d="M40,105 C50,93 60,84 62,68" stroke="#D4849A" strokeWidth="0.55" fill="none" strokeOpacity="0.55" />
      <path d="M40,12 C20,35 3,55 4,82 C5,110 25,128 40,145 C55,128 75,110 76,82 C77,55 60,35 40,12 Z" fill="#E8A0B4" fillOpacity="0.28" />
      <path d="M40,8 C37,16 35,27 40,38 C45,27 43,16 40,8 Z" fill="#B86880" fillOpacity="0.75" />
    </g>
    {/* Right botanical branch */}
    <g transform="translate(270, 20)">
      <path d="M20,180 C18,140 22,100 15,60 C10,35 5,18 8,5" stroke="#C4869A" strokeWidth="0.9" fill="none" strokeOpacity="0.6" />
      <path d="M12,100 C2,88 -5,78 -8,65" stroke="#C4869A" strokeWidth="0.7" fill="none" strokeOpacity="0.5" />
      <path d="M14,120 C24,108 30,95 28,82" stroke="#C4869A" strokeWidth="0.7" fill="none" strokeOpacity="0.5" />
      {[{x:8,y:5},{x:-8,y:65},{x:28,y:82}].map((p,i) => (
        <g key={i} transform={`translate(${p.x},${p.y})`}>
          <circle r="3" fill="#E8A8BC" fillOpacity="0.6" />
          <circle r="1.2" fill="#C47A8E" fillOpacity="0.7" />
        </g>
      ))}
      {[60,85,110,135].map((y,i) => (
        <g key={i} transform={`translate(${i%2===0?-2:16},${y})`}>
          <path d={i%2===0?"M0,0 C-8,-8 -10,-18 -4,-24 C-3,-14 -1,-6 0,0Z":"M0,0 C8,-8 10,-18 4,-24 C3,-14 1,-6 0,0Z"} fill="#D4A0B0" fillOpacity="0.45" />
        </g>
      ))}
    </g>
    <text x="18" y="90" fontFamily="'Pinyon Script', cursive" fontSize="52" fill="#302B27" fillOpacity="0.72">Intermediate</text>
    {/* Bottom florals */}
    <g transform="translate(20,155)">
      <path d="M0,40 C-10,25 -8,10 5,2 C3,18 1,30 0,40Z" fill="#D4A0B0" fillOpacity="0.4" />
      <path d="M0,40 C12,25 14,10 5,2 C5,18 3,30 0,40Z" fill="#C49BAC" fillOpacity="0.35" />
    </g>
    <g transform="translate(42,162) rotate(-15)">
      <path d="M0,32 C-8,20 -6,8 4,2 C2,14 1,24 0,32Z" fill="#D4A0B0" fillOpacity="0.35" />
      <path d="M0,32 C10,20 12,8 4,2 C3,14 2,24 0,32Z" fill="#C49BAC" fillOpacity="0.3" />
    </g>
  </svg>
)

const AdvancedArtwork = () => (
  <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <defs>
      <radialGradient id="bg-adv" cx="45%" cy="45%" r="70%">
        <stop offset="0%" stopColor="#F0EBE8" />
        <stop offset="100%" stopColor="#EAE0DA" />
      </radialGradient>
      <radialGradient id="wash-adv" cx="45%" cy="50%" r="48%">
        <stop offset="0%" stopColor="#D4A898" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#D4A898" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="360" height="200" fill="url(#bg-adv)" />
    <ellipse cx="165" cy="98" rx="105" ry="75" fill="url(#wash-adv)" />
    {/* Flourish calligraphy */}
    <g opacity="0.72">
      <path d="M40,160 C55,140 80,110 100,80 C120,50 140,30 170,25 C200,20 220,35 215,65 C210,90 190,105 175,120 C160,135 145,145 140,160" stroke="#6B5140" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M70,130 C100,115 135,100 165,88 C195,76 225,70 250,75" stroke="#6B5140" strokeWidth="1" fill="none" strokeOpacity="0.5" strokeLinecap="round" />
      <path d="M140,160 C130,175 115,180 100,170 C85,160 82,142 95,135 C108,128 128,138 140,160" stroke="#6B5140" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M170,25 C185,12 205,8 215,18 C225,28 218,45 205,52" stroke="#6B5140" strokeWidth="1" fill="none" strokeLinecap="round" strokeOpacity="0.65" />
    </g>
    {/* Right botanical cluster */}
    <g transform="translate(252, 10)">
      <path d="M15,185 C12,155 20,120 10,85 C4,60 0,38 6,15" stroke="#C4909A" strokeWidth="1" fill="none" strokeOpacity="0.55" />
      <path d="M8,85 C-5,72 -12,60 -10,48" stroke="#C4909A" strokeWidth="0.7" fill="none" strokeOpacity="0.45" />
      <path d="M11,115 C22,102 28,88 24,72" stroke="#C4909A" strokeWidth="0.7" fill="none" strokeOpacity="0.45" />
      <path d="M13,140 C4,128 -2,115 0,100" stroke="#C4909A" strokeWidth="0.7" fill="none" strokeOpacity="0.4" />
      {[{tx:-10,ty:48,r:0},{tx:24,ty:72,r:5},{tx:0,ty:100,r:-5},{tx:6,ty:15,r:3}].map((l,i) => (
        <g key={i} transform={`translate(${l.tx},${l.ty}) rotate(${l.r})`}>
          <ellipse rx="6" ry="14" fill="#D4AEB8" fillOpacity="0.45" transform="rotate(-40)" />
          <line x1="0" y1="-14" x2="0" y2="14" stroke="#C4909A" strokeWidth="0.5" strokeOpacity="0.4" transform="rotate(-40)" />
        </g>
      ))}
      {[{x:-10,y:48},{x:24,y:72},{x:6,y:15}].map((p,i) => (
        <g key={i} transform={`translate(${p.x},${p.y})`}>
          {[0,72,144,216,288].map((deg,j) => (
            <ellipse key={j} cx={Math.cos(deg*Math.PI/180)*4.5} cy={Math.sin(deg*Math.PI/180)*4.5} rx="2.5" ry="1.5" fill="#E8C0C8" fillOpacity="0.55" transform={`rotate(${deg})`} />
          ))}
          <circle r="1.5" fill="#C48090" fillOpacity="0.7" />
        </g>
      ))}
    </g>
    {/* Left spray */}
    <g transform="translate(15, 25)">
      <path d="M10,160 C8,130 14,100 8,70 C4,48 2,28 5,10" stroke="#B4969A" strokeWidth="0.8" fill="none" strokeOpacity="0.5" />
      {[70,100,130].map((y,i) => (
        <g key={i} transform={`translate(${i%2===0?-5:12},${y})`}>
          <ellipse rx="5" ry="12" fill="#D4AEB0" fillOpacity="0.38" transform="rotate(-35)" />
        </g>
      ))}
    </g>
    <text x="28" y="52" fontFamily="'Pinyon Script', cursive" fontSize="32" fill="#302B27" fillOpacity="0.58">Advanced</text>
    <text x="55" y="82" fontFamily="'Pinyon Script', cursive" fontSize="22" fill="#302B27" fillOpacity="0.32">flourishing</text>
  </svg>
)

/* ── Lesson preview artworks ───────────────────────────── */
const LessonArtwork = ({ type }) => {
  if (type === 'strokes') return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <rect width="200" height="130" fill="#F0E8DC" />
      <text x="10" y="80" fontFamily="'Pinyon Script', cursive" fontSize="62" fill="#302B27" fillOpacity="0.72" letterSpacing="6">a a a</text>
      <path d="M15,100 C40,90 80,85 130,88 C160,90 180,95 195,100" stroke="#6B5140" strokeWidth="0.7" fill="none" strokeOpacity="0.3" />
    </svg>
  )
  if (type === 'lowercase') return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <rect width="200" height="130" fill="#F0E8DC" />
      <line x1="8" y1="95" x2="192" y2="95" stroke="#A85D55" strokeWidth="0.5" strokeOpacity="0.4" />
      <line x1="8" y1="68" x2="192" y2="68" stroke="#A85D55" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4,4" />
      <line x1="8" y1="116" x2="192" y2="116" stroke="#A85D55" strokeWidth="0.5" strokeOpacity="0.4" />
      <text x="6" y="100" fontFamily="'Pinyon Script', cursive" fontSize="50" fill="#302B27" fillOpacity="0.75">lowercase</text>
      <g transform="translate(145,18)">
        <path d="M8,55 C6,40 12,25 6,12" stroke="#8EB49A" strokeWidth="0.8" fill="none" strokeOpacity="0.6" />
        <path d="M8,55 C-4,38 -6,22 6,12 C-2,28 0,42 8,55Z" fill="#8EB49A" fillOpacity="0.35" />
        <path d="M8,55 C20,38 22,22 6,12 C12,28 14,42 8,55Z" fill="#7DA48A" fillOpacity="0.3" />
      </g>
    </svg>
  )
  if (type === 'brush') return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <rect width="200" height="130" fill="#EEE8DF" />
      <text x="5" y="80" fontFamily="'Pinyon Script', cursive" fontSize="56" fill="#302B27" fillOpacity="0.8">Brush</text>
      <text x="18" y="118" fontFamily="'Pinyon Script', cursive" fontSize="36" fill="#302B27" fillOpacity="0.55">Lettering</text>
      <path d="M148,15 C150,35 148,55 150,72" stroke="#A85D55" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.4" />
      <path d="M148,15 C143,12 138,14 140,20 C143,26 150,22 148,15Z" fill="#6B5140" fillOpacity="0.55" />
    </svg>
  )
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
      <rect width="200" height="130" fill="#F0EAE4" />
      <text x="5" y="72" fontFamily="'Pinyon Script', cursive" fontSize="50" fill="#302B27" fillOpacity="0.8">Flourishing</text>
      <path d="M18,105 C35,90 65,82 90,88 C115,94 125,110 120,122" stroke="#6B5140" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeOpacity="0.45" />
      <path d="M120,122 C115,132 104,134 96,126 C88,118 94,106 105,108" stroke="#6B5140" strokeWidth="1" fill="none" strokeLinecap="round" strokeOpacity="0.4" />
      <g transform="translate(165,15)">
        <path d="M5,42 C-4,28 -2,14 5,4 C4,18 3,30 5,42Z" fill="#D4AEB8" fillOpacity="0.45" />
        <path d="M5,42 C14,28 16,14 5,4 C7,18 8,30 5,42Z" fill="#C49BAC" fillOpacity="0.4" />
      </g>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
export default function CoursesCatalog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeStyle, setActiveStyle] = useState('Modern')
  const [styleOpen, setStyleOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const learningPaths = [
    {
      level: 'Beginner',
      subtitle: 'Build Your Basics',
      lessons: 12,
      progress: 60,
      slug: 'modern-basics',
      action: 'Continue',
      category: 'beginner',
      Artwork: BeginnerArtwork,
      progressColor: '#5A8A72',
    },
    {
      level: 'Intermediate',
      subtitle: 'Find Your Flow',
      lessons: 10,
      progress: 34,
      slug: 'flourishing',
      action: 'Start',
      category: 'intermediate',
      Artwork: IntermediateArtwork,
      progressColor: '#A85D55',
    },
    {
      level: 'Advanced',
      subtitle: 'Create Your Style',
      lessons: 8,
      progress: 6,
      slug: 'brush-script',
      action: 'Start',
      category: 'advanced',
      Artwork: AdvancedArtwork,
      progressColor: '#A85D55',
    },
  ]

  const filterPills = [
    { id: 'all', label: 'All' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ]

  const styles = ['Modern', 'Copperplate', 'Brush', 'Gothic', 'Italic']

  const popularLessons = [
    { title: 'Letter Strokes', type: 'strokes', slug: 'intro-anatomy' },
    { title: 'Lowercase Letters', type: 'lowercase', slug: 'miniscule-letters' },
    { title: 'Brush Lettering', type: 'brush', slug: 'brush-lettering' },
    { title: 'Flourishing', type: 'flourishing', slug: 'spacing-flourishing' },
  ]

  const filteredPaths = activeCategory === 'all'
    ? learningPaths
    : learningPaths.filter(p => p.category === activeCategory)

  return (
    <div style={{position:'relative',maxWidth:'1100px',margin:'0 auto',paddingTop:'8px',paddingBottom:'56px'}}>

      {/* ── Subtle background deco ── */}
      <div aria-hidden="true" style={{position:'absolute',top:0,right:0,width:'100%',height:'100%',pointerEvents:'none',overflow:'hidden',zIndex:0}}>
        <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',top:0,right:'-60px',width:'700px',height:'500px'}}>
          <path d="M650,50 C680,120 700,200 680,280 C660,360 620,420 640,500" stroke="#6B5140" strokeWidth="0.5" fill="none" strokeOpacity="0.06" strokeDasharray="6,10" />
          <path d="M720,80 C740,130 750,190 730,250" stroke="#A85D55" strokeWidth="0.4" fill="none" strokeOpacity="0.05" />
          <ellipse cx="700" cy="80" rx="120" ry="90" fill="none" stroke="#B49A68" strokeWidth="0.4" strokeOpacity="0.06" />
        </svg>
      </div>

      {/* ── Page Header ── */}
      <div style={{
        position:'relative', zIndex:1,
        display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'24px',
        marginBottom:'28px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}>
        <div style={{flex:1,minWidth:0}}>
          <h1 style={{
            fontFamily:"'Cormorant Garamond', Georgia, serif",
            fontSize:'clamp(38px,5vw,52px)',
            fontWeight:400, color:'#171513',
            letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:'8px',
          }}>Learning Paths</h1>
          <p style={{fontFamily:"'DM Sans', sans-serif",fontSize:'14px',color:'#6B5140',fontWeight:400,marginBottom:'16px',lineHeight:1.5}}>
            Structured modules to improve your calligraphy skills
          </p>
          {/* Decorative rule */}
          <div style={{display:'flex',alignItems:'center',gap:'10px',maxWidth:'320px'}}>
            <div style={{flex:1,height:'1px',background:'linear-gradient(90deg,rgba(107,81,64,0.18),rgba(180,154,104,0.3),rgba(107,81,64,0.08))'}} />
            <svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M9,1 C11,4 15,5 17,5 C15,5 11,6 9,9 C7,6 3,5 1,5 C3,5 7,4 9,1Z" fill="#B49A68" fillOpacity="0.5" />
            </svg>
            <div style={{flex:1,height:'1px',background:'linear-gradient(90deg,rgba(180,154,104,0.3),rgba(107,81,64,0.18),rgba(107,81,64,0.08))'}} />
          </div>
        </div>

        {/* Hero botanical illustration */}
        <div aria-hidden="true" style={{flexShrink:0,width:'clamp(140px,22vw,240px)',height:'clamp(88px,14vw,138px)',opacity:0.88}}>
          <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
            <defs>
              <radialGradient id="hero-wash" cx="55%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#D4BCA0" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#D4BCA0" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="145" cy="75" rx="110" ry="72" fill="url(#hero-wash)" />
            <g transform="translate(80, 5)">
              <path d="M50,148 C20,120 0,85 10,48 C18,20 42,5 65,8 C88,11 100,30 95,58 C88,90 65,115 50,148Z" fill="#C4A882" fillOpacity="0.35" />
              <path d="M50,148 C80,120 100,85 90,48 C82,20 58,5 35,8 C12,11 0,30 5,58 C12,90 35,115 50,148Z" fill="#B49870" fillOpacity="0.28" />
              <line x1="50" y1="148" x2="52" y2="8" stroke="#8A7050" strokeWidth="0.8" strokeOpacity="0.4" />
            </g>
            <g transform="translate(160, 20) rotate(15)">
              <path d="M25,100 C10,78 5,52 14,28 C20,10 32,3 42,8 C52,13 55,28 48,50 C38,74 25,100 25,100Z" fill="#C4A882" fillOpacity="0.28" />
              <path d="M25,100 C40,78 45,52 36,28 C30,10 18,3 8,8 C-2,13 -5,28 2,50 C12,74 25,100 25,100Z" fill="#B49870" fillOpacity="0.22" />
              <line x1="25" y1="100" x2="28" y2="8" stroke="#8A7050" strokeWidth="0.6" strokeOpacity="0.35" />
            </g>
            <text x="165" y="55" fontFamily="'Pinyon Script', cursive" fontSize="14" fill="#302B27" fillOpacity="0.42" transform="rotate(-8,165,55)">Small strokes</text>
            <text x="172" y="73" fontFamily="'Pinyon Script', cursive" fontSize="14" fill="#302B27" fillOpacity="0.36" transform="rotate(-8,172,73)">create big</text>
            <text x="178" y="91" fontFamily="'Pinyon Script', cursive" fontSize="14" fill="#302B27" fillOpacity="0.30" transform="rotate(-8,178,91)">progress...</text>
          </svg>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div style={{
        position:'relative', zIndex:2,
        display:'flex', alignItems:'center', justifyContent:'space-between', gap:'16px',
        marginBottom:'32px', flexWrap:'wrap',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.48s ease 0.1s, transform 0.48s ease 0.1s',
      }}>
        <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap'}}>
          {filterPills.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveCategory(p.id)}
              style={{
                padding:'7px 18px',
                borderRadius:'8px',
                fontFamily:"'DM Sans', sans-serif",
                fontSize:'12.5px',
                fontWeight:500,
                cursor:'pointer',
                border: activeCategory === p.id ? '1.5px solid #171513' : '1.5px solid rgba(107,81,64,0.2)',
                background: activeCategory === p.id ? '#171513' : 'transparent',
                color: activeCategory === p.id ? '#F6F0E6' : '#6B5140',
                transition:'all 0.2s ease',
                letterSpacing:'0.01em',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        {/* Style dropdown */}
        <div
          onClick={() => setStyleOpen(o => !o)}
          style={{
            position:'relative',
            display:'flex', alignItems:'center', gap:'6px',
            padding:'7px 14px', borderRadius:'8px',
            border:'1.5px solid rgba(107,81,64,0.2)',
            background:'#FAF6F0', cursor:'pointer',
            fontFamily:"'DM Sans', sans-serif", fontSize:'12.5px',
            color:'#302B27', fontWeight:500,
            userSelect:'none', transition:'border-color 0.2s',
          }}
        >
          <span>{activeStyle}</span>
          <ChevronDown size={13} style={{color:'#6B5140',transition:'transform 0.2s',transform:styleOpen?'rotate(180deg)':'none',flexShrink:0}} />
          {styleOpen && (
            <div style={{
              position:'absolute', top:'calc(100% + 6px)', right:0,
              minWidth:'130px', background:'#FAF6F0',
              border:'1px solid rgba(107,81,64,0.18)', borderRadius:'10px',
              boxShadow:'0 8px 24px rgba(23,21,19,0.1)', overflow:'hidden', zIndex:100,
            }}>
              {styles.map(s => (
                <button key={s}
                  onClick={(e) => { e.stopPropagation(); setActiveStyle(s); setStyleOpen(false) }}
                  style={{
                    display:'block', width:'100%', textAlign:'left',
                    padding:'9px 14px',
                    fontFamily:"'DM Sans', sans-serif", fontSize:'12.5px',
                    color: s === activeStyle ? '#A85D55' : '#302B27',
                    fontWeight: s === activeStyle ? 600 : 400,
                    background: s === activeStyle ? 'rgba(168,93,85,0.06)' : 'transparent',
                    border:'none', cursor:'pointer',
                  }}
                >{s}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Learning Path Cards ── */}
      <div style={{
        position:'relative', zIndex:1,
        display:'grid',
        gridTemplateColumns: filteredPaths.length === 1 ? '1fr' : filteredPaths.length === 2 ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
        gap:'20px', marginBottom:'48px',
      }} className="lp-cards-responsive">
        {filteredPaths.map((path, idx) => {
          const { Artwork } = path
          return (
            <div
              key={path.slug}
              className="lp-card"
              style={{
                background:'#F6F0E6',
                border:'1px solid rgba(107,81,64,0.16)',
                borderRadius:'14px',
                overflow:'hidden',
                transition:'transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease, border-color 0.22s ease',
                boxShadow:'0 2px 12px rgba(23,21,19,0.05), 0 1px 3px rgba(23,21,19,0.04)',
                display:'flex', flexDirection:'column',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionProperty:'opacity,transform,box-shadow,border-color',
                transitionDuration:`0.5s,0.5s,0.28s,0.22s`,
                transitionDelay:`${0.2 + idx * 0.1}s,${0.2 + idx * 0.1}s,0s,0s`,
                transitionTimingFunction:'ease,ease,ease,ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(23,21,19,0.10), 0 3px 10px rgba(23,21,19,0.06)'
                e.currentTarget.style.borderColor = 'rgba(107,81,64,0.28)'
                e.currentTarget.querySelector('.lp-art-inner').style.transform = 'scale(1.03)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(23,21,19,0.05), 0 1px 3px rgba(23,21,19,0.04)'
                e.currentTarget.style.borderColor = 'rgba(107,81,64,0.16)'
                e.currentTarget.querySelector('.lp-art-inner').style.transform = 'scale(1)'
              }}
            >
              {/* Artwork zone */}
              <div style={{width:'100%',aspectRatio:'16/9',overflow:'hidden',flexShrink:0}}>
                <div
                  className="lp-art-inner"
                  style={{width:'100%',height:'100%',transition:'transform 0.45s cubic-bezier(0.22,1,0.36,1)'}}
                >
                  <Artwork />
                </div>
              </div>

              {/* Card body */}
              <div style={{padding:'18px 20px 20px',display:'flex',flexDirection:'column',flex:1}}>
                <span style={{
                  fontFamily:"'Pinyon Script','Alex Brush',cursive",
                  fontSize:'30px', color:'#171513', lineHeight:1.2,
                  display:'block', marginBottom:'2px',
                }}>{path.level}</span>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'12px',fontWeight:500,color:'#6B5140',marginBottom:'16px',letterSpacing:'0.01em'}}>{path.subtitle}</p>

                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'11.5px',fontWeight:500,color:'#302B27'}}>{path.lessons} Lessons</span>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'11px',fontWeight:600,color:'#6B5140'}}>{path.progress}%</span>
                </div>

                {/* Progress bar */}
                <div style={{width:'100%',height:'3px',background:'#E8DCCB',borderRadius:'9999px',overflow:'hidden',marginBottom:'18px'}}>
                  <div style={{height:'100%',borderRadius:'9999px',background:path.progressColor,width:`${path.progress}%`,transition:'width 0.8s cubic-bezier(0.22,1,0.36,1)'}} />
                </div>

                {/* CTA */}
                <Link
                  to={`/courses/${path.slug}`}
                  className="lp-cta-btn"
                  style={{
                    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'7px',
                    width:'100%', padding:'11px 20px', borderRadius:'8px',
                    fontFamily:"'DM Sans',sans-serif", fontSize:'12.5px', fontWeight:600,
                    letterSpacing:'0.03em', textDecoration:'none',
                    transition:'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                    border:'1.5px solid',
                    background: path.action === 'Continue' ? '#171513' : 'transparent',
                    color: path.action === 'Continue' ? '#F6F0E6' : '#302B27',
                    borderColor: path.action === 'Continue' ? '#171513' : 'rgba(107,81,64,0.28)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#A85D55'
                    e.currentTarget.style.borderColor = '#A85D55'
                    e.currentTarget.style.color = '#F6F0E6'
                    const arrow = e.currentTarget.querySelector('.btn-arrow')
                    if (arrow) arrow.style.transform = 'translateX(3px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = path.action === 'Continue' ? '#171513' : 'transparent'
                    e.currentTarget.style.borderColor = path.action === 'Continue' ? '#171513' : 'rgba(107,81,64,0.28)'
                    e.currentTarget.style.color = path.action === 'Continue' ? '#F6F0E6' : '#302B27'
                    const arrow = e.currentTarget.querySelector('.btn-arrow')
                    if (arrow) arrow.style.transform = 'translateX(0)'
                  }}
                >
                  <span>{path.action}</span>
                  <ArrowRight size={14} className="btn-arrow" style={{transition:'transform 0.2s ease',flexShrink:0}} />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Popular Lessons ── */}
      <div style={{
        position:'relative', zIndex:1,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease 0.55s, transform 0.5s ease 0.55s',
      }}>
        <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:'18px'}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'26px',fontWeight:400,color:'#171513',letterSpacing:'-0.01em'}}>
            Popular Lessons
          </h2>
          <Link to="/courses"
            style={{display:'inline-flex',alignItems:'center',gap:'5px',fontFamily:"'DM Sans',sans-serif",fontSize:'12px',fontWeight:500,color:'#6B5140',textDecoration:'none'}}
            onMouseEnter={e => { e.currentTarget.style.color = '#A85D55' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B5140' }}
          >
            View All <ArrowRight size={13} />
          </Link>
        </div>

        <div className="lp-popular-grid">
          {popularLessons.map((lesson, idx) => (
            <Link
              key={idx}
              to={`/lessons/${lesson.slug}`}
              style={{
                display:'flex', flexDirection:'column', gap:'9px',
                textDecoration:'none',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.45s ease ${0.6 + idx * 0.07}s, transform 0.45s ease ${0.6 + idx * 0.07}s`,
              }}
              className="lp-lesson-link"
            >
              <div
                className="lp-lesson-art"
                style={{
                  position:'relative', width:'100%', aspectRatio:'4/3',
                  borderRadius:'10px', overflow:'hidden',
                  border:'1px solid rgba(107,81,64,0.14)',
                  background:'#F0E8DC',
                  transition:'border-color 0.2s',
                }}
              >
                <LessonArtwork type={lesson.type} />
                {/* Play button */}
                <div
                  className="lp-play-btn"
                  style={{
                    position:'absolute', bottom:'10px', right:'10px',
                    width:'28px', height:'28px', borderRadius:'50%',
                    background:'rgba(23,21,19,0.72)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    backdropFilter:'blur(4px)',
                    transition:'background 0.2s, transform 0.2s',
                  }}
                >
                  <Play size={11} style={{color:'#F6F0E6',fill:'#F6F0E6'}} />
                </div>
              </div>
              <p
                className="lp-lesson-name"
                style={{fontFamily:"'DM Sans',sans-serif",fontSize:'12px',fontWeight:500,color:'#302B27',lineHeight:1.35,padding:'0 2px',transition:'color 0.18s'}}
              >{lesson.title}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Responsive styles (scoped) ── */}
      <style>{`
        .lp-cards-responsive {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        @media (max-width: 900px) {
          .lp-cards-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .lp-cards-responsive { grid-template-columns: 1fr !important; }
        }
        .lp-popular-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .lp-popular-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .lp-popular-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        .lp-lesson-link:hover .lp-lesson-art {
          border-color: rgba(107,81,64,0.28) !important;
        }
        .lp-lesson-link:hover .lp-play-btn {
          background: #A85D55 !important;
          transform: scale(1.08);
        }
        .lp-lesson-link:hover .lp-lesson-name {
          color: #A85D55 !important;
        }
        .lp-lesson-link {
          transition: transform 0.22s ease !important;
        }
        .lp-lesson-link:hover {
          transform: translateY(-2px) !important;
        }
      `}</style>
    </div>
  )
}
