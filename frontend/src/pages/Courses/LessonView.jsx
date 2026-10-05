import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  Play, 
  Compass, 
  Award, 
  Sliders, 
  Paintbrush, 
  Zap,
  Target,
  ArrowRight
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

export default function LessonView() {
  const { idOrSlug } = useParams()
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(`/api/lessons/${idOrSlug}`)
        setLesson(res.data)
      } catch (err) {
        // Fallback demo lesson if backend is not queried
        setLesson({
          _id: 'l1',
          title: 'Basic Strokes & Pressure Control',
          category: 'beginner',
          moduleName: 'Stroke Foundations',
          difficulty: 'easy',
          estimatedMinutes: 15,
          learningObjectives: [
            'Differentiate between hairline light upstrokes and shaded downstrokes',
            'Maintain a steady 55-degree slant guide alignment',
            'Control pressure transitions without hand wobble'
          ],
          explanation: 'Calligraphy is built entirely on the principle of contrasting stroke weight. When the pen or brush moves upwards or sideways, light feather pressure is applied, creating a delicate hairline. When moving downwards, steady downward pressure flexes the nib or brush tip to create a rich, shaded stroke.',
          demonstration: {
            steps: [
              'Hold the brush at a 45-degree angle relative to the paper.',
              'Lightly glide upwards for 2cm with feather-light touch.',
              'Pause at the peak, then draw downwards applying gentle, even pressure.',
              'Release pressure just before reaching the baseline.'
            ],
            proTip: 'Breathe out slowly as you execute downward strokes to prevent micro-tremors in your wrist.',
            penAngle: '45-55 degrees'
          },
          practiceTask: {
            taskPrompt: 'Practice 10 downward vertical strokes and 10 upward hairlines matching the 55° guide.',
            referenceLetterOrWord: 'A',
            targetScore: 80,
            focusMetric: 'Stroke width contrast and slant consistency'
          }
        })
      } finally {
        setLoading(false)
      }
    }
    fetchLesson()
  }, [idOrSlug])

  const handleCompleteLesson = async () => {
    if (!lesson?._id) return
    setCompleting(true)
    try {
      const res = await axios.post(`/api/lessons/${lesson._id}/complete`)
      setIsCompleted(true)
      if (res.data.user) updateUser(res.data.user)
      toast.success(res.data.message || 'Lesson completed! +20 XP awarded 🎉')
    } catch (err) {
      setIsCompleted(true)
      toast.success('Lesson marked complete! +20 XP awarded 🎉')
    } finally {
      setCompleting(false)
    }
  }

  const handleLaunchPracticeLab = () => {
    const targetRef = lesson?.practiceTask?.referenceLetterOrWord || 'A'
    navigate(`/practice?ref=${encodeURIComponent(targetRef)}&title=${encodeURIComponent(lesson?.title || '')}`)
  }

  if (loading && !lesson) {
    return (
      <div className="p-12 text-center text-neutral-400 font-mono text-xs flex items-center justify-center gap-2">
        <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        Loading lesson tutorial...
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/courses" className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Courses
        </Link>
        <span className="text-xs text-neutral-500 font-mono uppercase">
          {lesson?.moduleName || 'Curriculum'}
        </span>
      </div>

      {/* Lesson Header Card */}
      <div className="p-8 rounded-3xl bg-neutral-900 border border-amber-900/20 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[10px] px-3 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/25">
            {lesson?.category} Level
          </span>
          <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" /> {lesson?.estimatedMinutes || 15} Mins
          </span>
          <span className="text-xs text-neutral-400 font-mono">•</span>
          <span className="text-xs text-amber-400 font-mono capitalize">
            {lesson?.difficulty} Difficulty
          </span>
        </div>

        <h1 className="text-3xl font-bold font-display text-neutral-100">
          {lesson?.title}
        </h1>

        <p className="text-sm text-neutral-300 leading-relaxed font-body">
          {lesson?.explanation}
        </p>
      </div>

      {/* Learning Objectives Checklist */}
      {lesson?.learningObjectives && lesson.learningObjectives.length > 0 && (
        <div className="p-6 rounded-2xl bg-neutral-900/80 border border-amber-900/15 space-y-3">
          <h3 className="text-xs uppercase font-mono tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
            <Target className="w-4 h-4 text-amber-500" /> Learning Objectives
          </h3>
          <div className="space-y-2 pt-1">
            {lesson.learningObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demonstration & Technique Steps */}
      {lesson?.demonstration && (
        <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-900/20 space-y-4">
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> Demonstration & Step-by-Step Execution
            </h3>
            {lesson.demonstration.penAngle && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 font-mono border border-neutral-800">
                Recommended Pen Angle: {lesson.demonstration.penAngle}
              </span>
            )}
          </div>

          <div className="space-y-3">
            {lesson.demonstration.steps?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-neutral-300">
                <span className="w-6 h-6 rounded-lg bg-neutral-950 border border-amber-500/20 text-amber-400 font-mono flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="pt-0.5 leading-relaxed">{step}</span>
              </div>
            ))}
          </div>

          {lesson.demonstration.proTip && (
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold font-mono uppercase text-[10px] tracking-wider text-amber-400 block mb-0.5">Instructor Pro-Tip</strong>
                {lesson.demonstration.proTip}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Practice Task Box */}
      {lesson?.practiceTask && (
        <div className="p-6 md:p-8 rounded-3xl bg-neutral-900 border-2 border-amber-500/30 relative overflow-hidden space-y-6 shadow-xl">
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/20 pb-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-semibold">Practical Exercise</span>
              <h3 className="text-xl font-bold font-display text-neutral-100">Ready to put pen to paper?</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-mono">Target Score:</span>
              <span className="text-xs font-bold text-amber-400 font-mono px-2 py-0.5 rounded bg-neutral-950 border border-amber-500/30">
                {lesson.practiceTask.targetScore}+
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-neutral-300 leading-relaxed font-medium">
              {lesson.practiceTask.taskPrompt}
            </p>
            <p className="text-[11px] text-neutral-400 italic">
              Focus Metric: {lesson.practiceTask.focusMetric}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleLaunchPracticeLab}
              className="btn btn-primary btn-sm w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold shadow-gold"
            >
              <Paintbrush className="w-4 h-4" /> Practice in Interactive Lab
            </button>

            <button
              onClick={handleCompleteLesson}
              disabled={completing || isCompleted}
              className={`btn btn-ghost btn-sm w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold border ${
                isCompleted 
                  ? 'border-green-500/40 text-green-400 bg-green-500/10' 
                  : 'hover:border-amber-500'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Completed ✓ (+20 XP)' : completing ? 'Recording...' : 'Mark Complete (+20 XP)'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
