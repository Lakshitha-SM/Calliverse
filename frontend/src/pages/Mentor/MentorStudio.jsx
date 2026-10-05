import { useState } from 'react'
import { GraduationCap, BookOpen, Users, CheckCircle, MessageSquare, Award, Plus, Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function MentorStudio() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('submissions')

  const submissions = [
    {
      id: 1,
      studentName: 'Elena Vance',
      exerciseTitle: 'Gothic Miniscules: Letter a & e',
      submittedAt: 'Today, 2:15 PM',
      score: 82,
      imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400',
      status: 'pending',
    },
    {
      id: 2,
      studentName: 'Julian Cross',
      exerciseTitle: 'Brush Lettering: Entrance Strokes',
      submittedAt: 'Yesterday',
      score: 76,
      imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=400',
      status: 'reviewed',
      feedback: 'Good baseline consistency. Work on releasing pressure on the upward hair strokes.',
    },
  ]

  const handleGiveFeedback = (id) => {
    toast.success('Feedback recorded & dispatched to student notification center!')
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100 flex items-center gap-2">
            Mentor Studio & Feedback Queue <GraduationCap className="w-6 h-6 text-purple-400" />
          </h1>
          <p className="text-xs text-neutral-400">
            Welcome, Instructor <span className="text-amber-400 font-semibold">{user?.name}</span>. Review learner submissions, provide targeted critique, and monitor student cohort growth.
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => toast.success('Lesson Creation modal will be available in Phase 2!')}
            className="btn btn-primary btn-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create Lesson
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900 border border-purple-500/20">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Assigned Students</p>
          <p className="text-2xl font-bold font-display text-neutral-100 mt-1">28</p>
        </div>
        <div className="p-5 rounded-2xl bg-neutral-900 border border-purple-500/20">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Pending Submissions</p>
          <p className="text-2xl font-bold font-display text-amber-400 mt-1">1 Unreviewed</p>
        </div>
        <div className="p-5 rounded-2xl bg-neutral-900 border border-purple-500/20">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Reviews Completed</p>
          <p className="text-2xl font-bold font-display text-neutral-100 mt-1">142</p>
        </div>
        <div className="p-5 rounded-2xl bg-neutral-900 border border-purple-500/20">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Cohort Avg Score</p>
          <p className="text-2xl font-bold font-display text-green-400 mt-1">84%</p>
        </div>
      </div>

      {/* Submissions Queue */}
      <div className="space-y-4">
        <h3 className="section-title flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-amber-500" /> Student Practice Submissions Queue
        </h3>

        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="p-6 rounded-2xl bg-neutral-900 border border-amber-900/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-amber-500/30 transition-all">
              <div className="flex items-center gap-4">
                <img 
                  src={sub.imageUrl} 
                  alt={sub.exerciseTitle} 
                  className="w-20 h-20 rounded-xl object-cover border border-amber-500/20"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold font-display text-neutral-100">{sub.studentName}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                      AI Score: {sub.score}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 font-medium">{sub.exerciseTitle}</p>
                  <p className="text-[10px] text-neutral-500 font-mono">Submitted: {sub.submittedAt}</p>
                  {sub.feedback && (
                    <p className="text-xs text-neutral-400 italic bg-neutral-950/60 p-2 rounded-lg border border-neutral-800 mt-2 max-w-lg">
                      "{sub.feedback}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button 
                  onClick={() => handleGiveFeedback(sub.id)}
                  className="btn btn-primary btn-sm text-xs flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> {sub.status === 'pending' ? 'Review & Grade' : 'Update Feedback'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
