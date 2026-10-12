import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Search, 
  Paintbrush, 
  ArrowRight,
  Bookmark
} from 'lucide-react'
import toast from 'react-hot-toast'
import InkStroke from '../components/common/InkStroke'

export default function Templates() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Layouts' },
    { id: 'wedding', name: 'Wedding Suites' },
    { id: 'posters', name: 'Quote Broadsides' },
    { id: 'cards', name: 'Greeting Cards' },
    { id: 'branding', name: 'Monograms & Seals' },
  ]

  const templatesList = [
    {
      id: 1,
      title: 'Copperplate Wedding Suite',
      category: 'wedding',
      author: 'CalliLab Atelier',
      specimen: 'Save The Date',
      desc: 'Graceful script framing with botanical flourish corners, perfect for pointed pen copperplate.',
      rating: 4.9,
    },
    {
      id: 2,
      title: 'Zen Brushstroke Broadside',
      category: 'posters',
      author: 'Master Sophia Chen',
      specimen: 'Breathe & Write',
      desc: 'Generous negative whitespace with disciplined slant guides for contemplative quote lettering.',
      rating: 4.8,
    },
    {
      id: 3,
      title: 'Royal Initial Monogram Seal',
      category: 'branding',
      author: 'CalliLab Atelier',
      specimen: 'L · S · M',
      desc: 'Vintage circular laurel wreaths designed for custom initials, crests, and personal seals.',
      rating: 5.0,
    },
    {
      id: 4,
      title: 'Artisan Deckled Card Layout',
      category: 'cards',
      author: 'Traditional Ink Guild',
      specimen: 'Warmest Wishes',
      desc: 'Deckled paper border margins calibrated for modern pointed pen greetings and festive cards.',
      rating: 4.7,
    },
    {
      id: 5,
      title: 'Archival Illuminated Letterhead',
      category: 'wedding',
      author: 'CalliLab Atelier',
      specimen: 'An Honor to Invite',
      desc: 'Historical Renaissance manuscript margins with delicate hairline flourishes and serif accents.',
      rating: 4.9,
    },
  ]

  const filteredTemplates = templatesList.filter((temp) => {
    const matchesSearch = temp.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || temp.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-warm-brown font-mono font-semibold">
            <span>CalliLab Studio</span>
            <span>•</span>
            <span>Curated Layouts</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mt-1">
            Studio Templates & Layouts
          </h1>
          <p className="text-sm text-charcoal/70 mt-1 max-w-xl">
            Launch pre-aligned calligraphy sheets with guideline grids, ornamental flourishes, and balanced margins.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="paper-texture p-4 rounded-2xl border border-charcoal/10 shadow-paper flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
          <input 
            type="text" 
            placeholder="Search template layouts..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2 rounded-xl bg-white border border-charcoal/15 text-xs text-ink placeholder:text-charcoal/40 focus:outline-none focus:border-warm-brown"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif whitespace-nowrap transition-all ${
                activeCategory === cat.id 
                  ? 'bg-ink text-paper font-semibold shadow-sm' 
                  : 'bg-white border border-charcoal/10 text-charcoal/70 hover:text-ink'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((temp) => (
          <div 
            key={temp.id} 
            className="paper-texture rounded-3xl border border-charcoal/10 shadow-paper p-6 flex flex-col justify-between group hover:shadow-paper-hover transition-all"
          >
            {/* Visual Mockup Card */}
            <div className="aspect-[4/3] rounded-2xl bg-cream/70 border border-charcoal/15 flex items-center justify-center p-6 mb-5 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute inset-0 calli-guidelines opacity-20 pointer-events-none" />
              
              <div className="text-center space-y-2 relative z-10">
                <span className="text-[10px] tracking-widest text-warm-brown font-mono uppercase font-semibold">
                  {temp.category}
                </span>
                <h3 className="text-3xl font-script text-ink leading-tight">
                  {temp.specimen}
                </h3>
                <div className="w-12 h-px bg-charcoal/20 mx-auto" />
                <p className="text-[10px] text-charcoal/50 font-serif italic">Pre-aligned guideline margins</p>
              </div>
            </div>

            {/* Template Info */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-serif font-bold text-ink group-hover:text-burgundy transition-colors">
                    {temp.title}
                  </h4>
                  <span className="text-xs font-mono font-semibold text-gold">★ {temp.rating}</span>
                </div>
                <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed font-sans">
                  {temp.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-charcoal/10">
                <span className="text-[11px] font-mono text-charcoal/50">By {temp.author}</span>
                <Link 
                  to="/canvas" 
                  className="btn-burgundy px-4 py-1.5 rounded-xl text-xs font-serif font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Paintbrush className="w-3.5 h-3.5" />
                  <span>Open in Canvas</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
