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
  ChevronRight
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

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
        // Fallback default
        toast.error('Loading course details...')
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [idOrSlug])

  if (loading && !course) {
    return (
      <div className="p-12 text-center text-neutral-400 font-mono text-xs flex items-center justify-center gap-2">
        <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        Loading course curriculum...
      </div>
    )
  }

  const lessonList = course?.lessons || []

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Back button */}
      <div>
        <Link to="/courses" className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Curricula
        </Link>
      </div>

      {/* Course Hero Banner */}
      <div className="p-8 rounded-3xl bg-neutral-900 border border-amber-900/20 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] px-3 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {course?.category} Track
            </span>
            <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> ~{course?.estimatedHours || 4} Total Hours
            </span>
            <span className="text-xs text-neutral-400 font-mono">•</span>
            <span className="text-xs text-amber-400 font-mono">{course?.style || 'Pointed Pen & Brush'}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-display text-neutral-100 leading-tight">
            {course?.title}
          </h1>

          <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
            {course?.description || course?.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-amber-900/15">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                🖋️
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 uppercase font-mono">Curator / Instructor</p>
                <p className="text-xs font-semibold text-neutral-200">{course?.instructorName || 'Master Sophia Chen'}</p>
              </div>
            </div>

            {lessonList.length > 0 && (
              <Link
                to={`/lessons/${lessonList[0].slug || lessonList[0]._id}`}
                className="btn btn-primary btn-sm flex items-center gap-2 px-6 py-2.5 ml-auto text-xs font-semibold shadow-gold"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Start Lesson #1
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      {course?.learningOutcomes && course.learningOutcomes.length > 0 && (
        <div className="p-6 rounded-2xl bg-neutral-900/80 border border-amber-900/15 space-y-3">
          <h3 className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-500" /> What You Will Master In This Course
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {course.learningOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                <span className="text-amber-500 font-bold shrink-0">✓</span>
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Syllabus Modules & Lessons */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-neutral-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-500" /> Course Syllabus & Step-by-Step Lessons
        </h2>

        <div className="space-y-3">
          {lessonList.map((lesson, idx) => (
            <Link
              key={lesson._id || idx}
              to={`/lessons/${lesson.slug || lesson._id}`}
              className="p-5 rounded-2xl bg-neutral-900 border border-amber-900/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-500/40 hover:bg-neutral-900/80 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">
                      {lesson.moduleName || 'Module'}
                    </span>
                    <span className="text-[10px] text-neutral-600">•</span>
                    <span className="text-[10px] text-amber-500 font-mono capitalize">
                      {lesson.difficulty || 'Easy'}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold font-display text-neutral-100 group-hover:text-amber-300 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {lesson.explanation?.slice(0, 110)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" /> {lesson.estimatedMinutes || 15}m
                </span>
                <span className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 group-hover:text-amber-400 group-hover:border-amber-500/30 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
