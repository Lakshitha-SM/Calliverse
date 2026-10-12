import { useState } from 'react'
import { Heart, Search, Filter, X, ArrowUpRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Community() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedArt, setSelectedArt] = useState(null)
  const [likes, setLikes] = useState({ 1: 142, 2: 98, 3: 84, 4: 120, 5: 165, 6: 110 })
  const [liked, setLiked] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  const filterPills = [
    { id: 'all', label: 'All Works' },
    { id: 'modern', label: 'Modern Script' },
    { id: 'brush', label: 'Brush Lettering' },
    { id: 'gothic', label: 'Gothic Miniscules' },
    { id: 'flourishing', label: 'Flourishing' },
  ]

  const galleryItems = [
    {
      id: 1, title: 'Good Things take Time', author: 'Ananya Sharma', avatar: 'A', style: 'Modern Script', category: 'modern', year: '2026', score: 92,
      caption: 'Practiced rhythmic miniscule connections with Walnut Sepia ink on cold-pressed paper.'
    },
    {
      id: 2, title: 'Bloom', author: 'Riya Patel', avatar: 'R', style: 'Brush Calligraphy', category: 'brush', year: '2026', score: 88,
      caption: 'Delicate entrance flourishes combined with botanical watercolor accents.'
    },
    {
      id: 3, title: 'Create', author: 'Karthik Raja', avatar: 'K', style: 'Gothic Miniscules', category: 'gothic', year: '2026', score: 90,
      caption: 'Sharp 45° angle nib work with strict baseline and waistline precision.'
    },
    {
      id: 4, title: 'Stay Positive', author: 'Harini V', avatar: 'H', style: 'Modern Script', category: 'modern', year: '2026', score: 86,
      caption: 'Loose bouncy brush lettering with balanced ascender loops.'
    },
    {
      id: 5, title: 'Dream', author: 'Lakshitha S M', avatar: 'L', style: 'Flourishing Script', category: 'flourishing', year: '2026', score: 94,
      caption: 'Complex figure-eight flourishes framing a classical copperplate stem.'
    },
    {
      id: 6, title: 'Be Kind', author: 'Meera Nair', avatar: 'M', style: 'Pointed Pen', category: 'modern', year: '2026', score: 89,
      caption: 'Feather-light hairlines and slow shaded downstrokes executed on Japanese parchment.'
    },
  ]

  const filteredItems = galleryItems.filter(item => 
    (activeFilter === 'all' || item.category === activeFilter) &&
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleLike = (id, e) => {
    e?.stopPropagation()
    const isCurrentlyLiked = liked[id]
    setLiked({ ...liked, [id]: !isCurrentlyLiked })
    setLikes({ ...likes, [id]: isCurrentlyLiked ? likes[id] - 1 : (likes[id] || 0) + 1 })
    toast.success(isCurrentlyLiked ? 'Like removed' : 'Appreciated artwork! +5 XP')
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto select-none pt-4">
      
      {/* ── Header & Filter Bar ────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(107,81,64,0.14)] pb-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#A85D55] font-bold">
              Artisan Exhibition
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#171513] font-normal tracking-tight">
              Community Gallery
            </h1>
            <p className="text-sm text-[#6B5140] font-sans mt-2 max-w-lg">
              Curated masterworks, quote compositions, and stroke studies from artists worldwide.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#8E7360]" />
            <input
              type="text"
              placeholder="Search artworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-[#171513] placeholder-[#8E7360] text-xs pl-10 pr-4 py-3 rounded-full border border-[rgba(107,81,64,0.2)] focus:outline-none focus:border-[#171513] shadow-sm transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {filterPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id)}
              className={`px-5 py-2 rounded-full text-xs font-sans font-bold transition-all ${
                activeFilter === pill.id
                  ? 'bg-[#171513] text-[#FAF6F0] shadow-sm'
                  : 'bg-white text-[#6B5140] border border-[rgba(107,81,64,0.18)] hover:bg-[#FAF6F0]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Gallery Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => {
          const isLiked = liked[item.id]
          return (
            <div
              key={item.id}
              onClick={() => setSelectedArt(item)}
              className="group flex flex-col gap-4 cursor-pointer"
            >
              {/* Artwork Square */}
              <div className="w-full aspect-square rounded-2xl bg-[#FAF6F0] border border-[rgba(107,81,64,0.15)] flex flex-col items-center justify-center relative overflow-hidden group-hover:border-[#A85D55] transition-colors shadow-sm">
                
                {/* Score Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono font-bold text-[#A85D55] border border-[rgba(107,81,64,0.1)]">
                  Score: {item.score}%
                </div>

                <span className="font-script text-6xl text-[#171513] select-none group-hover:scale-110 transition-transform duration-500">
                  {item.title.split(' ')[0]}
                </span>
              </div>

              {/* Artwork Meta */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#171513] font-bold group-hover:text-[#A85D55] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B5140] font-sans mt-0.5">By {item.author}</p>
                </div>
                
                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className={`flex items-center gap-1.5 p-1.5 px-3 rounded-full text-xs font-mono transition-all border ${
                    isLiked
                      ? 'bg-[#F4E8E6] text-[#A85D55] font-bold border-[#D8AFA9]'
                      : 'bg-white text-[#6B5140] hover:text-[#A85D55] border-[rgba(107,81,64,0.15)]'
                  }`}
                  title="Appreciate artwork"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#A85D55] text-[#A85D55]' : ''}`} />
                  <span>{likes[item.id] || 0}</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Modal Inspector ────────────────────────────────────────── */}
      {selectedArt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171513]/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedArt(null)}>
          <div className="w-full max-w-2xl bg-[#F6F0E6] rounded-2xl overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedArt(null)}
              className="absolute top-4 right-4 p-2 text-[#6B5140] hover:text-[#171513] rounded-full hover:bg-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Artwork Display Area */}
            <div className="w-full aspect-[16/10] bg-[#FAF6F0] border-b border-[rgba(107,81,64,0.15)] flex flex-col items-center justify-center relative overflow-hidden paper-texture">
              <span className="font-script text-8xl text-[#171513] select-none scale-[1.2]">
                {selectedArt.title}
              </span>
            </div>

            {/* Metadata Area */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-serif text-[#171513] font-normal mb-1">{selectedArt.title}</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#171513] text-[#FAF6F0] flex items-center justify-center font-serif text-[10px]">
                      {selectedArt.avatar}
                    </div>
                    <p className="text-sm font-serif font-bold text-[#6B5140]">{selectedArt.author}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E7360] block mb-1">
                    {selectedArt.style}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#A85D55] bg-[#F4E8E6] px-2 py-0.5 rounded border border-[#D8AFA9]">
                      AI Score: {selectedArt.score}%
                    </span>
                    <span className="text-xs font-mono text-[#6B5140]">❤️ {likes[selectedArt.id] || 0}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#171513] font-sans leading-relaxed pt-4 border-t border-[rgba(107,81,64,0.1)]">
                {selectedArt.caption}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
