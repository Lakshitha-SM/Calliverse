import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  ArrowRight, 
  GraduationCap, 
  Compass,
  Award
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

export default function CoursesCatalog() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Fallback curated curriculum if database is cold / starting
  const fallbackCourses = [
    {
      _id: 'c1',
      slug: 'foundations-strokes-letter-formation',
      title: 'Calligraphy Foundations: Strokes & Letter Formation',
      subtitle: 'Master basic strokes, pen pressure control, lower/uppercase alphabets, and numbers.',
      category: 'beginner',
      level: 'Beginner',
      style: 'Brush & Pointed Pen',
      thumbnailUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600',
      estimatedHours: 4,
      instructorName: 'Master Sophia Chen',
      tags: ['Basic Strokes', 'Pressure Control', 'Alphabets', 'Beginner'],
      lessonsCount: 4,
      lessons: [
        { title: 'Basic Strokes & Pressure Control', estimatedMinutes: 15, difficulty: 'easy' },
        { title: 'Curves, Loops & Ovals', estimatedMinutes: 20, difficulty: 'easy' },
        { title: 'Lowercase Letter Formation (a-z)', estimatedMinutes: 25, difficulty: 'medium' },
        { title: 'Uppercase Lettering & Basic Words', estimatedMinutes: 30, difficulty: 'medium' }
      ]
    },
    {
      _id: 'c2',
      slug: 'intermediate-spacing-flourishing-quotes',
      title: 'Intermediate Script: Spacing, Flourishing & Quotes',
      subtitle: 'Advance into brush lettering, letter connections, graceful flourishes, and quotes.',
      category: 'intermediate',
      level: 'Intermediate',
      style: 'Modern Brush & Chancery Script',
      thumbnailUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=600',
      estimatedHours: 6,
      instructorName: 'Master Sophia Chen',
      tags: ['Flourishing', 'Brush Lettering', 'Connections', 'Composition'],
      lessonsCount: 4,
      lessons: [
        { title: 'Brush Lettering & Bounce Script Dynamics', estimatedMinutes: 25, difficulty: 'medium' },
        { title: 'Letter Connections & Rhythm Spacing', estimatedMinutes: 25, difficulty: 'medium' },
        { title: 'Ascender & Descender Flourishing Rules', estimatedMinutes: 30, difficulty: 'hard' },
        { title: 'Quote Composition & Layout Design', estimatedMinutes: 35, difficulty: 'hard' }
      ]
    },
    {
      _id: 'c3',
      slug: 'advanced-typography-gothic-brand-lettering',
      title: 'Advanced Masterclass: Typography, Gothic & Brand Lettering',
      subtitle: 'Professional calligraphy: Gothic blackletter, complex flourishing, monogram logos, and custom lettering.',
      category: 'advanced',
      level: 'Advanced',
      style: 'Gothic Blackletter & Custom Monograms',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600',
      estimatedHours: 8,
      instructorName: 'Master Sophia Chen',
      tags: ['Gothic', 'Blackletter', 'Brand Lettering', 'Monograms'],
      lessonsCount: 3,
      lessons: [
        { title: 'Blackletter & Gothic Textura Quadrata', estimatedMinutes: 30, difficulty: 'hard' },
        { title: 'Complex Monogram & Intertwined Crest Design', estimatedMinutes: 35, difficulty: 'hard' },
        { title: 'Commercial Invitation & Portfolio Exhibition Piece', estimatedMinutes: 45, difficulty: 'hard' }
      ]
    }
  ]

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let url = '/api/courses'
        const params = new URLSearchParams()
        if (activeCategory !== 'all') params.append('category', activeCategory)
        if (searchQuery.trim()) params.append('search', searchQuery.trim())
        if (params.toString()) url += `?${params.toString()}`

        const res = await axios.get(url)
        if (res.data && res.data.length > 0) {
          setCourses(res.data)
        } else if (activeCategory === 'all' && !searchQuery.trim()) {
          setCourses(fallbackCourses)
        } else {
          // Filter fallback data locally
          const filtered = fallbackCourses.filter(c => {
            const matchesCat = activeCategory === 'all' || c.category === activeCategory
            const matchesSearch = !searchQuery.trim() || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesCat && matchesSearch
          })
          setCourses(filtered)
        }
      } catch (err) {
        setCourses(fallbackCourses)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [activeCategory, searchQuery])

  const categories = [
    { id: 'all', label: 'All Curricula' },
    { id: 'beginner', label: 'Beginner Foundations' },
    { id: 'intermediate', label: 'Intermediate Mastery' },
    { id: 'advanced', label: 'Advanced Masterclass' }
  ]

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl">
      {/* Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100 flex items-center gap-2">
            Structured Calligraphy Learning Paths <BookOpen className="w-6 h-6 text-amber-500" />
          </h1>
          <p className="text-xs text-neutral-400">
            Step-by-step verified calligraphy curricula from basic hairline strokes to museum-grade flourishes and brand typography.
          </p>
        </div>

        {user?.recommendedPath && (
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-500/25">
            <Compass className="w-4 h-4 text-amber-500" />
            <div>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Your Recommended Path</p>
              <p className="text-xs font-semibold text-amber-300 truncate max-w-xs">{user.recommendedPath}</p>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900 border border-amber-900/15">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search lessons, strokes, styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-12 py-2.5 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                activeCategory === cat.id
                  ? 'border-amber-500 bg-amber-500/15 text-amber-300 shadow-gold'
                  : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const lessonList = course.lessons || []
          const lessonCount = lessonList.length || course.lessonsCount || 4

          return (
            <div
              key={course._id || course.slug}
              className="card p-6 flex flex-col justify-between hover-glow transition-all duration-300 relative overflow-hidden group border border-amber-900/20"
            >
              <div className="space-y-4">
                {/* Thumbnail Image */}
                <div className="aspect-[16/9] rounded-xl overflow-hidden relative border border-amber-500/10">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className={`absolute top-3 left-3 text-[10px] px-2.5 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider border ${
                    course.category === 'beginner' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                    course.category === 'intermediate' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                    'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}>
                    {course.category}
                  </span>

                  <span className="absolute bottom-3 right-3 text-[10px] px-2 py-0.5 rounded bg-neutral-950/80 text-neutral-300 font-mono flex items-center gap-1 border border-neutral-800">
                    <Clock className="w-3 h-3 text-amber-500" /> ~{course.estimatedHours} Hours
                  </span>
                </div>

                {/* Course Metadata */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{course.instructorName || 'Master Sophia Chen'}</span>
                    <span>•</span>
                    <span className="text-amber-500 font-semibold">{course.style}</span>
                  </div>

                  <h3 className="text-lg font-semibold font-display text-neutral-100 group-hover:text-amber-300 transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {course.subtitle || course.description}
                  </p>
                </div>

                {/* Lesson Mini Syllabus */}
                <div className="space-y-1.5 pt-2 border-t border-amber-900/10">
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono font-semibold flex items-center gap-1">
                    <Layers className="w-3 h-3 text-amber-500" /> {lessonCount} Structured Modules
                  </p>
                  <div className="space-y-1">
                    {lessonList.slice(0, 3).map((l, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px] text-neutral-300 py-0.5">
                        <span className="truncate pr-2">• {l.title}</span>
                        <span className="text-[10px] text-neutral-500 font-mono shrink-0">{l.estimatedMinutes || 15}m</span>
                      </div>
                    ))}
                    {lessonCount > 3 && (
                      <p className="text-[10px] text-amber-500/80 italic font-mono">+ {lessonCount - 3} more drills</p>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {course.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 font-mono border border-neutral-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 border-t border-amber-900/10 mt-4">
                <Link
                  to={`/courses/${course.slug || course._id}`}
                  className="btn btn-primary btn-sm w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5"
                >
                  Explore Curriculum <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
