import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Sparkles, Globe, Share2, Award, LayoutGrid, Paintbrush, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Portfolio() {
  const { user } = useAuth()
  const [copiedLink, setCopiedLink] = useState(false)

  const savedArtworks = [
    {
      id: 1,
      title: "Royal Monogram Frame",
      category: "logo",
      imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400",
      date: "May 2026",
    },
    {
      id: 2,
      title: "Zen Mindfulness Postcard",
      category: "poster",
      imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=400",
      date: "April 2026",
    },
    {
      id: 3,
      title: "Copperplate script invitation",
      category: "invitation",
      imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400",
      date: "March 2026",
    }
  ]

  const handleSharePortfolio = () => {
    navigator.clipboard.writeText(`${window.location.origin}/portfolio/${user?._id || 'demo'}`)
    setCopiedLink(true)
    toast.success('Artist Portfolio link copied successfully!')
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100 flex items-center gap-2">
            My Digital Artist Portfolio <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500/10" />
          </h1>
          <p className="text-xs text-neutral-400">Manage your collections, customize your public profile page, and share your designs with external collectors.</p>
        </div>

        <button 
          onClick={handleSharePortfolio}
          className="btn btn-primary btn-sm flex items-center gap-1.5"
        >
          <Share2 className="w-4 h-4" /> Share Portfolio Link
        </button>
      </div>

      {/* Profile Card Summary */}
      <div className="p-6 md:p-8 rounded-2xl bg-neutral-900 border border-amber-900/15 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-amber-500/5 rounded-full filter blur-3xl" />
        
        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left z-10">
          <div className="w-20 h-20 rounded-full border-2 border-amber-500 bg-amber-500/10 flex items-center justify-center text-3xl">
            🎨
          </div>
          <div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h2 className="text-2xl font-bold font-display text-neutral-100">{user?.name}</h2>
              <span className="badge font-mono capitalize">{user?.skillLevel || 'Beginner'} Artist</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1 max-w-md">
              A passionate creative calligraphy enthusiast mastering Gothic, Chancery, and Roman scripts within the digital canvas.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 border-t md:border-t-0 md:border-l border-amber-900/10 pt-4 md:pt-0 md:pl-8 z-10 w-full md:w-auto justify-around">
          <div className="text-center">
            <p className="text-xs text-neutral-400 font-mono">Designs</p>
            <p className="text-lg font-bold font-display text-amber-400">3 Saved</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-neutral-400 font-mono">Achievements</p>
            <p className="text-lg font-bold font-display text-amber-400">3 Badges</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-neutral-400 font-mono">Status</p>
            <p className="text-lg font-bold font-display text-green-400">Public</p>
          </div>
        </div>
      </div>

      {/* Portfolio Showcase Grid */}
      <div className="space-y-4">
        <h3 className="section-title">Showcase Collection</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArtworks.map((art) => (
            <div key={art.id} className="card p-5 hover-glow transition-all duration-300 relative overflow-hidden group">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-amber-500/10 relative">
                <img 
                  src={art.imageUrl} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 text-[9px] px-2 py-0.5 rounded bg-neutral-950/80 border border-amber-500/20 text-amber-400 font-semibold uppercase tracking-wider font-mono">
                  {art.category}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold font-display text-neutral-200">{art.title}</h4>
                  <span className="text-[10px] text-neutral-500 font-mono">{art.date}</span>
                </div>
                <div className="flex justify-end pt-2 border-t border-amber-900/5">
                  <button className="text-xs text-neutral-400 hover:text-amber-500 flex items-center gap-1 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> View Details
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
