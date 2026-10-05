import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Heart, 
  Calendar, 
  MapPin, 
  Award, 
  Search,
  Grid,
  Filter,
  Paintbrush
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function Templates() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Assets' },
    { id: 'wedding', name: 'Wedding Invitations' },
    { id: 'posters', name: 'Quote Posters' },
    { id: 'cards', name: 'Greeting Cards' },
    { id: 'branding', name: 'Branding & Monograms' },
  ]

  const templatesList = [
    {
      id: 1,
      title: "Elegant Gold Wedding Invitation",
      category: "wedding",
      author: "CalliVerse Premium",
      bgClass: "from-amber-950/20 to-neutral-900",
      desc: "Graceful script layout with borders, perfect for traditional copperplate calligraphy styling.",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Minimalist Zen Quote Poster",
      category: "posters",
      author: "Traditional Ink Studio",
      bgClass: "from-neutral-900 to-amber-950/10",
      desc: "Spacious aesthetic poster background with brushstroke guides for mindfulness scripts.",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Royal Monogram Badge",
      category: "branding",
      author: "CalliVerse Premium",
      bgClass: "from-amber-900/10 to-neutral-900",
      desc: "Golden floral circular frames for logo designs, signatures, and initial practices.",
      rating: 5.0,
    },
    {
      id: 4,
      title: "Artistic Festive Greeting Card",
      category: "cards",
      author: "Creative Brush Masters",
      bgClass: "from-amber-950/30 to-neutral-900",
      desc: "Warm vibrant border decorations tailored for modern script greetings and quotes.",
      rating: 4.7,
    },
    {
      id: 5,
      title: "Vintage Letterhead Layout",
      category: "wedding",
      author: "Traditional Ink Studio",
      bgClass: "from-neutral-900 to-amber-900/5",
      desc: "Classic deckled paper borders suited for elegant signatures and letters.",
      rating: 4.6,
    }
  ]

  const filteredTemplates = templatesList.filter((temp) => {
    const matchesSearch = temp.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || temp.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100 flex items-center gap-2">
            Template & Poster Designer <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500/10" />
          </h1>
          <p className="text-xs text-neutral-400">Instantly launch pre-styled creative posters, invitation layouts, monograms, and wedding templates.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-900 border border-amber-900/15">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search ready-made layouts..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-12"
          />
        </div>

        {/* Categories Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all duration-300 ${
                activeCategory === cat.id 
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-gold' 
                  : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((temp) => (
          <div key={temp.id} className="card p-6 flex flex-col justify-between group hover-glow transition-all duration-300 relative overflow-hidden">
            
            {/* Template Visual Mockup Background */}
            <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${temp.bgClass} border border-amber-500/10 flex items-center justify-center p-6 mb-5 relative group-hover:scale-[1.02] transition-transform duration-300`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.06),transparent_70%)]" />
              
              {/* Calligraphy Ornament Mockup */}
              <div className="text-center space-y-3 z-10">
                <span className="text-[10px] tracking-widest text-amber-500 font-mono uppercase">Template Preview</span>
                <h3 className="text-2xl font-serif text-amber-200">{temp.title}</h3>
                <div className="w-16 h-px bg-amber-500/30 mx-auto" />
                <p className="text-[10px] text-neutral-400 italic">Preloaded font guides</p>
              </div>
            </div>

            {/* Template Info */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-semibold font-display text-neutral-200">{temp.title}</h4>
                  <span className="text-xs text-amber-400 font-semibold">★ {temp.rating}</span>
                </div>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {temp.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-amber-900/5">
                <span className="text-[10px] font-mono text-neutral-500">By {temp.author}</span>
                <Link to="/canvas" className="btn btn-primary btn-sm flex items-center gap-1.5 py-2 px-4 text-xs font-semibold">
                  <Paintbrush className="w-3.5 h-3.5" /> Customize Layout
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
