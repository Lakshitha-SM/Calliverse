import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  Play, 
  GraduationCap, 
  Award, 
  Sliders, 
  Layers,
  ChevronRight,
  PenTool
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import InkStroke from '../../components/common/InkStroke'

export default function CourseDetail() {
  const { idOrSlug } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${idOrSlug}`)
        setCourse(res.data)
      } catch (err) {
        // Fallback default course curriculum if backend is quiet
        setCourse({
          title: 'Foundations of Pointed Pen Calligraphy',
          subtitle: 'From proper nib posture and pressure cadence to classical miniscule alphabets.',
          category: 'Beginner',
          style: 'Copperplate & English Roundhand',
          estimatedHours: 4,
          instructorName: 'Master Sophia Chen',
          learningOutcomes: [
            'Master pen angle, paper orientation, and nib flex dynamics',
            'Develop muscle memory for the 8 primary foundation strokes',
            'Construct uniform oval families: a, o, d, g, q, c, e',
            'Maintain consistent 55° slant angle across long sentences',
          ],
          lessons: [
            {
              _id: '1',
              title: 'Introduction & Anatomy of the Pointed Pen',
              slug: 'intro-anatomy',
              moduleName: 'Module 1: Nib Mechanics',
              difficulty: 'Beginner',
              explanation: 'Examine nib flukes, vent holes, reservoir flow, and oblique holder setup for optimal ink feed.',
            },
            {
              _id: '2',
              title: 'The 8 Fundamental Strokes & Pressure Gradients',
              slug: 'fundamental-strokes',
              moduleName: 'Module 1: Nib Mechanics',
              difficulty: 'Beginner',
              explanation: 'Practicing hairline upstrokes, shaded downstrokes, overturns, underturns, and compound curves.',
            },
            {
              _id: '3',
              title: 'Miniscule Letters: Oval & Stem Group',
              slug: 'miniscule-letters',
              moduleName: 'Module 2: Lowercase Mastery',
              difficulty: 'Intermediate',
              explanation: 'Constructing letters a, b, c, d with uniform x-height, counter-spaces, and hairline connections.',
            },
            {
              _id: '4',
              title: 'Word Spacing, Kerning & Flourishing Accents',
              slug: 'spacing-flourishing',
              moduleName: 'Module 3: Composition',
              difficulty: 'Advanced',
              explanation: 'Harmonious letter grouping, inter-word rhythm, and graceful terminal loop extensions.',
            },
          ],
        })
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [idOrSlug])

  if (loading && !course) {
    return (
      <div className="p-16 text-center text-[#6B5140] font-serif text-sm flex items-center justify-center gap-2">
        <div className="w-5 h-5 border-2 border-[#171513] border-t-transparent rounded-full animate-spin" />
        Preparing curriculum syllabus...
      </div>
    )
  }

  const lessonList = course?.lessons || []

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pt-4 select-none">
      {/* Back button */}
      <div>
        <Link 
          to="/courses" 
          className="text-xs font-serif font-bold text-[#6B5140] hover:text-[#171513] uppercase tracking-widest flex items-center gap-1.5 transition-colors w-max"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Learning Pathways
        </Link>
      </div>

      {/* Course Hero Banner */}
      <div className="paper-sheet p-8 md:p-10 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm relative overflow-hidden">
        
        {/* Decorative corner splash */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#F4E8E6] to-transparent rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[9px] px-3 py-1 rounded bg-[#171513] text-[#FAF6F0] font-mono uppercase font-bold tracking-widest shadow-sm">
              {course?.category} Pathway
            </span>
            <span className="text-[11px] text-[#6B5140] font-mono font-bold flex items-center gap-1 bg-[#FAF6F0] px-2 py-0.5 rounded border border-[rgba(107,81,64,0.15)]">
              <Clock className="w-3.5 h-3.5 text-[#171513]" /> ~{course?.estimatedHours || 4} Total Hours
            </span>
            <span className="text-[11px] text-[#171513] font-mono font-bold uppercase tracking-widest bg-[#FAF6F0] px-2 py-0.5 rounded border border-[rgba(107,81,64,0.15)]">
              {course?.style || 'Pointed Pen & Brush'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-normal text-[#171513] tracking-tight leading-tight mt-2">
            {course?.title}
          </h1>

          <p className="text-[13px] md:text-sm text-[#6B5140] max-w-2xl leading-relaxed font-sans mt-2">
            {course?.description || course?.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-[rgba(107,81,64,0.12)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[rgba(107,81,64,0.18)] text-[#171513] flex items-center justify-center font-bold text-lg shadow-sm">
                🖋️
              </div>
              <div>
                <p className="text-[9px] text-[#8E7360] uppercase font-mono tracking-widest font-bold">Lead Instructor</p>
                <p className="text-sm font-serif font-bold text-[#171513]">{course?.instructorName || 'Master Sophia Chen'}</p>
              </div>
            </div>

            {lessonList.length > 0 && (
              <Link
                to={`/lessons/${lessonList[0].slug || lessonList[0]._id}`}
                className="btn-ink px-8 py-3 rounded-lg ml-auto text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Begin Lesson #1
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      {course?.learningOutcomes && course.learningOutcomes.length > 0 && (
        <div className="paper-sheet p-8 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm space-y-5">
          <h3 className="text-[11px] uppercase font-mono tracking-widest text-[#171513] font-bold flex items-center gap-2 border-b border-[rgba(107,81,64,0.12)] pb-3">
            <CheckCircle2 className="w-4 h-4 text-[#A85D55]" /> What You Will Master In This Curriculum
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {course.learningOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-[#171513] font-medium leading-relaxed bg-[#FAF6F0] p-3 rounded-lg border border-[rgba(107,81,64,0.1)]">
                <span className="text-[#A85D55] font-bold shrink-0 mt-0.5">✓</span>
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Syllabus Modules & Lessons */}
      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-serif font-normal text-[#171513] flex items-center gap-2 border-b border-[rgba(107,81,64,0.12)] pb-4">
          <Layers className="w-5 h-5 text-[#8E7360]" /> Curriculum Modules & Lessons
        </h2>

        <div className="space-y-4">
          {lessonList.map((lesson, idx) => (
            <Link
              key={lesson._id || idx}
              to={`/lessons/${lesson.slug || lesson._id}`}
              className="paper-sheet p-5 sm:p-6 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-[#A85D55] shadow-sm hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-lg bg-[#FAF6F0] border border-[rgba(107,81,64,0.15)] text-[#171513] flex items-center justify-center font-bold font-serif text-lg shrink-0 group-hover:bg-[#171513] group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-[#6B5140] uppercase tracking-widest font-mono font-bold bg-[#FAF6F0] px-2 py-0.5 rounded">
                      {lesson.moduleName || 'Module'}
                    </span>
                    <span className="text-[9px] text-[#A85D55] font-mono font-bold uppercase tracking-widest bg-[#F4E8E6] px-2 py-0.5 rounded border border-[#A85D55]/20">
                      {lesson.difficulty || 'Easy'}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#171513] group-hover:text-[#A85D55] transition-colors leading-tight">
                    {lesson.title}
                  </h3>
                  <p className="text-[13px] text-[#6B5140] line-clamp-1 font-sans">
                    {lesson.explanation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#171513] flex items-center gap-1 bg-[#FAF6F0] group-hover:bg-[#171513] group-hover:text-white px-4 py-2 rounded transition-all">
                  Open Lesson <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
