import { useEffect, useState } from 'react'
import { 
  Sparkles, 
  Heart, 
  Bookmark, 
  MessageSquare, 
  Sliders, 
  Compass, 
  Image as ImageIcon, 
  ChevronRight,
  Smile
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Community() {
  const [mood, setMood] = useState('elegant')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [inspiration, setInspiration] = useState(null)
  
  const [likes, setLikes] = useState({})
  const [bookmarks, setBookmarks] = useState({})

  const moodsList = [
    { id: 'elegant', label: '👑 Elegant Gold', colors: ['#C9A96E', '#F5F0E8', '#2C2C2C'], font: 'Cormorant Garamond' },
    { id: 'romantic', label: '🌸 Romantic Rose', colors: ['#E8B4B8', '#F7E7E9', '#8B1A4A'], font: 'Dancing Script' },
    { id: 'dark', label: '🦇 Dark Aesthetic', colors: ['#1A1A2E', '#16213E', '#E94560'], font: 'IM Fell English' },
    { id: 'festive', label: '🎉 Festive Gold', colors: ['#FFD700', '#FF6B35', '#004E89'], font: 'Playfair Display' },
    { id: 'minimal', label: '🤍 Minimal Clean', colors: ['#FFFFFF', '#F5F5F5', '#333333'], font: 'Inter' },
  ]

  const mockPosts = [
    {
      id: 1,
      author: { name: "Aria Thorne", avatar: "🌸" },
      imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400",
      caption: "Strokes of traditional Gothic style on organic cotton paper. Absolute bliss.",
      mood: "elegant",
      style: "Gothic",
      likesCount: 142,
    },
    {
      id: 2,
      author: { name: "Lucas Vance", avatar: "🖋️" },
      imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=400",
      caption: "Wrote wedding invite names using copperplate cursive and fine golden dust.",
      mood: "romantic",
      style: "Copperplate",
      likesCount: 98,
    },
    {
      id: 3,
      author: { name: "Elena Rostova", avatar: "✨" },
      imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400",
      caption: "Minimal monograms for branding design. Love how clean it turned out.",
      mood: "minimal",
      style: "Minimalist",
      likesCount: 64,
    }
  ]

  useEffect(() => {
    const fetchMoodInfo = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/recommendations/mood?mood=${mood}`)
        setInspiration(res.data)
      } catch (err) {
        // Fallback to local configs
        const selected = moodsList.find(m => m.id === mood)
        setInspiration({ colors: selected.colors, fonts: [selected.font] })
      } finally {
        setLoading(false)
      }
    }
    fetchMoodInfo()
  }, [mood])

  const toggleLike = (postId) => {
    setLikes(prev => {
      const active = !prev[postId]
      toast.success(active ? 'Artwork Liked!' : 'Unliked')
      return { ...prev, [postId]: active }
    })
  }

  const toggleBookmark = (postId) => {
    setBookmarks(prev => {
      const active = !prev[postId]
      toast.success(active ? 'Saved to Bookmarks!' : 'Removed from bookmarks')
      return { ...prev, [postId]: active }
    })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100 flex items-center gap-2">
            Community Gallery & Mood Inspiration <Compass className="w-5 h-5 text-amber-500 fill-amber-500/10" />
          </h1>
          <p className="text-xs text-neutral-400">Share your custom calligraphy designs, get inspired by artistic moods, and discover aesthetic styling palettes.</p>
        </div>
      </div>

      {/* Mood Selector Feed */}
      <div className="space-y-4">
        <label className="label uppercase tracking-widest font-mono text-[10px] text-amber-500/90 font-semibold">Filter Inspiration Gallery by Mood</label>
        
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {moodsList.map((m) => (
            <button
              key={m.id}
              onClick={() => setMood(m.id)}
              className={`px-4.5 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap border transition-all duration-300 ${
                mood === m.id 
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-gold' 
                  : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mood Recommendation Engine Details */}
      {inspiration && (
        <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-900/15 space-y-4 transition-all duration-500">
          <div className="flex items-center gap-2 border-b border-amber-900/5 pb-3">
            <Smile className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-neutral-200 capitalize">
              Recommended Styling Guide for: <span className="text-amber-500 font-display text-base font-normal">{mood} Mood</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Color Palette recommendation */}
            <div className="space-y-2">
              <label className="label">Recommended Color Palette</label>
              <div className="flex gap-3">
                {inspiration.colors?.map((col, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg border border-neutral-800" style={{ backgroundColor: col }} />
                    <span className="text-xs text-neutral-400 font-mono uppercase">{col}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Suggestion */}
            <div className="space-y-2">
              <label className="label">Recommended Calligraphy Font Style</label>
              <p 
                className="text-2xl text-amber-200 transition-all"
                style={{ fontFamily: inspiration.fonts?.[0] || 'Cormorant Garamond' }}
              >
                {inspiration.fonts?.[0] || 'Cormorant Garamond'} Calligraphy Preview
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Community Gallery Grid */}
      <div className="space-y-4">
        <h3 className="section-title">Inspiration Feed</h3>
        
        <div className="feed-grid">
          {mockPosts.map((post) => (
            <div key={post.id} className="card p-5 flex flex-col justify-between hover-glow transition-all duration-300 relative overflow-hidden group">
              
              {/* Image box */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-amber-500/10 relative">
                <img 
                  src={post.imageUrl} 
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Style badge */}
                <span className="absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded bg-neutral-950/80 border border-amber-500/20 text-amber-400 font-semibold uppercase tracking-wider font-mono">
                  {post.style}
                </span>
              </div>

              {/* Caption & stats */}
              <div className="space-y-3">
                
                {/* Author Info */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xs">
                    {post.author.avatar}
                  </div>
                  <span className="text-xs font-semibold text-neutral-200">{post.author.name}</span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed truncate-3-lines">
                  {post.caption}
                </p>

                {/* Interactions Row */}
                <div className="flex justify-between items-center pt-3 border-t border-amber-900/5">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1 text-xs transition-colors ${
                        likes[post.id] ? 'text-rose-500' : 'text-neutral-500 hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likes[post.id] ? 'fill-rose-500' : ''}`} />
                      <span>{post.likesCount + (likes[post.id] ? 1 : 0)}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-xs text-neutral-500 hover:text-amber-500 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>3 comments</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => toggleBookmark(post.id)}
                    className={`transition-colors ${
                      bookmarks[post.id] ? 'text-amber-500' : 'text-neutral-500 hover:text-amber-500'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarks[post.id] ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
