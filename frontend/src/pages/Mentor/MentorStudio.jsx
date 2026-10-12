import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Clock, 
  BookOpen, 
  Star, 
  Eye, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  MessageSquare,
  Award,
  Filter,
  X,
  Sliders,
  Send,
  ShieldCheck
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import InkStroke from '../../components/common/InkStroke'

export default function MentorStudio() {
  const { user } = useAuth()
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all') // all, pending, reviewed
  const [feedbackForm, setFeedbackForm] = useState({
    score: 84,
    formScore: 88,
    spacingScore: 78,
    slantScore: 85,
    praise: 'Excellent pressure contrast on the shaded downstroke. Entry hairline is crisp.',
    improvement: 'Ensure the oval closes seamlessly at the top right before initiating the descender.',
  })

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      studentName: 'Ananya',
      task: "Letter 'a' practice",
      style: 'Modern Pointed Pen',
      submittedAt: '2 hours ago',
      score: 82,
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      sampleUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500',
      specimen: 'a',
      studentNotes: 'I had some difficulty keeping the 55° slant consistent on the teardrop entrance.',
    },
    {
      id: 2,
      studentName: 'Riya',
      task: 'Quote practice',
      style: 'Brush Flourish',
      submittedAt: '5 hours ago',
      score: 88,
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      sampleUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=500',
      specimen: 'Stay Positive',
      studentNotes: 'Working on ascending loop flourishes. Did the loop balance with the baseline?',
    },
    {
      id: 3,
      studentName: 'Karthik',
      task: 'Flourishing exercise',
      style: 'Copperplate Classic',
      submittedAt: 'Yesterday',
      score: 74,
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      sampleUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500',
      specimen: 'S & g loops',
      studentNotes: 'My ink line feathered slightly on the second downstroke. Would love advice on nib pressure.',
    },
    {
      id: 4,
      studentName: 'Julian Cross',
      task: 'Miniscule m & n rhythm',
      style: 'Gothic Textura',
      submittedAt: '2 days ago',
      score: 91,
      status: 'reviewed',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      sampleUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=500',
      specimen: 'miniscule',
      studentNotes: 'Practiced maintaining identical 1-pen-width inter-stem spacing.',
      mentorPraise: 'Flawless cadence and crisp diamond serifs. Ready for major capitols.',
    },
  ])

  const filteredSubmissions = submissions.filter((sub) => {
    if (filterStatus === 'pending') return sub.status === 'pending'
    if (filterStatus === 'reviewed') return sub.status === 'reviewed'
    return true
  })

  const openReviewModal = (submission) => {
    setSelectedSubmission(submission)
    setFeedbackForm({
      score: submission.score,
      formScore: Math.min(95, submission.score + 4),
      spacingScore: Math.max(70, submission.score - 6),
      slantScore: submission.score,
      praise: 'Strong oval symmetry and deliberate ink control.',
      improvement: 'Work on consistent release of pressure before the baseline.',
    })
  }

  const handleSubmitCritique = (e) => {
    e.preventDefault()
    if (!selectedSubmission) return

    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === selectedSubmission.id
          ? { ...s, status: 'reviewed', score: feedbackForm.score, mentorPraise: feedbackForm.praise }
          : s
      )
    )

    toast.success(`Mentor critique dispatched to ${selectedSubmission.studentName}!`, {
      icon: '🖋️',
      style: {
        background: '#171513',
        color: '#F6F0E6',
        border: '1px solid #B49A68',
      },
    })
    setSelectedSubmission(null)
  }

  return (
    <div className="space-y-10 animate-fade-in max-w-6xl mx-auto pt-4 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(107,81,64,0.12)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#6B5140] font-mono font-bold">
            <span>CalliLab Studio</span>
            <span>•</span>
            <span>Instructor Console</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-normal text-[#171513] tracking-tight mt-1">
            Mentor Dashboard
          </h1>
          <p className="text-[13px] text-[#6B5140] font-sans mt-2 max-w-xl">
            Review student practice sheets, evaluate stroke anatomy, and nurture the next generation of master calligraphers.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[rgba(107,81,64,0.18)] text-[10px] uppercase text-[#171513] font-mono font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#A85D55] animate-pulse" />
            <span>Live: <strong>{user?.name || 'Master Instructor'}</strong></span>
          </div>
        </div>
      </div>

      {/* 4 KPI Metrics - Exact Reference Match (Screen #13) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Students */}
        <div className="paper-sheet p-6 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#6B5140] font-bold">Students</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#A85D55]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-normal text-[#171513]">42</span>
            <span className="text-[10px] font-mono text-[#A85D55] font-bold bg-[#F4E8E6] px-2 py-0.5 rounded">+4 this week</span>
          </div>
          <p className="text-[11px] text-[#8E7360] font-sans mt-2">Active across 3 cohorts</p>
        </div>

        {/* Metric 2: Pending Reviews */}
        <div className="paper-sheet p-6 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm hover:-translate-y-1 transition-transform relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#F4E8E6] rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#A85D55] font-bold">Pending Reviews</span>
            <span className="px-2 py-0.5 rounded-full bg-[#A85D55] text-white text-[9px] font-mono font-bold tracking-widest uppercase">
              Action Req.
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2 relative z-10">
            <span className="text-4xl font-serif font-normal text-[#A85D55]">8</span>
            <span className="text-[10px] font-mono text-[#6B5140]">awaiting feedback</span>
          </div>
          <p className="text-[11px] text-[#8E7360] font-sans mt-2 relative z-10">Avg response time: 3.2 hrs</p>
        </div>

        {/* Metric 3: Active Courses */}
        <div className="paper-sheet p-6 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#6B5140] font-bold">Active Courses</span>
            <BookOpen className="w-4 h-4 text-[#8E7360]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-normal text-[#171513]">12</span>
            <span className="text-[10px] font-mono text-[#8E7360] font-bold bg-[#FAF6F0] px-2 py-0.5 rounded">Curated</span>
          </div>
          <p className="text-[11px] text-[#8E7360] font-sans mt-2">Beginner to Advanced</p>
        </div>

        {/* Metric 4: Average Rating */}
        <div className="paper-sheet p-6 rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#6B5140] font-bold">Average Rating</span>
            <Star className="w-4 h-4 text-[#B49A68] fill-[#B49A68]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-normal text-[#171513]">4.8</span>
            <span className="text-xs text-[#B49A68] font-mono font-bold tracking-widest">★★★★★</span>
          </div>
          <p className="text-[11px] text-[#8E7360] font-sans mt-2">Based on 148 student reviews</p>
        </div>
      </div>

      {/* Main Section: Recent Submissions - Exact Reference Screen #13 */}
      <div className="paper-sheet rounded-xl bg-white border border-[rgba(107,81,64,0.18)] shadow-sm p-6 md:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(107,81,64,0.12)] pb-4">
          <div>
            <h2 className="text-2xl font-serif font-normal text-[#171513] flex items-center gap-2">
              Recent Submissions
            </h2>
            <p className="text-[11px] text-[#6B5140] font-sans mt-1">
              Practice sheets submitted by learners for detailed instructor critique.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter pills */}
            <div className="flex items-center gap-1 bg-[#FAF6F0] p-1 rounded-full border border-[rgba(107,81,64,0.15)] text-[11px] font-bold font-sans">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  filterStatus === 'all' ? 'bg-[#171513] text-[#FAF6F0] shadow-sm' : 'text-[#6B5140] hover:text-[#171513]'
                }`}
              >
                All ({submissions.length})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  filterStatus === 'pending' ? 'bg-[#A85D55] text-white shadow-sm' : 'text-[#6B5140] hover:text-[#171513]'
                }`}
              >
                Pending ({submissions.filter((s) => s.status === 'pending').length})
              </button>
              <button
                onClick={() => setFilterStatus('reviewed')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  filterStatus === 'reviewed' ? 'bg-[#171513] text-[#FAF6F0] shadow-sm' : 'text-[#6B5140] hover:text-[#171513]'
                }`}
              >
                Reviewed ({submissions.filter((s) => s.status === 'reviewed').length})
              </button>
            </div>
          </div>
        </div>

        {/* Submissions List - Matching Ananya, Riya, Karthik from Reference */}
        <div className="space-y-4">
          {filteredSubmissions.map((sub) => (
            <div
              key={sub.id}
              className={`group p-4 md:p-5 rounded-xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                sub.status === 'reviewed' ? 'bg-[#FAF6F0]/50 border-[rgba(107,81,64,0.1)] opacity-80' : 'bg-white border-[rgba(107,81,64,0.18)] hover:border-[#A85D55] shadow-sm'
              }`}
            >
              {/* Left Artwork Thumbnail + Student Info */}
              <div className="flex items-center gap-5">
                {/* Authentic Calligraphy Thumbnail */}
                <div className="relative w-20 h-20 md:w-28 md:h-20 rounded-lg overflow-hidden bg-[#FAF6F0] border border-[rgba(107,81,64,0.15)] shrink-0 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={sub.sampleUrl}
                    alt={sub.task}
                    className="w-full h-full object-cover mix-blend-multiply opacity-90"
                  />
                  <div className="absolute inset-0 bg-[#171513]/5" />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-white border border-[rgba(107,81,64,0.15)] text-[#171513] font-script text-xs shadow-sm">
                    {sub.specimen}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-serif font-bold text-[#171513] group-hover:text-[#A85D55] transition-colors">
                      {sub.studentName}
                    </h3>
                    <span className="text-[10px] text-[#6B5140] font-mono uppercase tracking-wider font-bold">
                      • {sub.style}
                    </span>
                  </div>

                  <p className="text-[13px] font-sans text-[#171513] font-medium leading-none">
                    {sub.task}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] text-[#8E7360] font-mono font-bold uppercase tracking-widest pt-1">
                    <span>{sub.submittedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#A85D55]">
                      <Sparkles className="w-3 h-3 text-[#A85D55]" /> AI Score: {sub.score}/100
                    </span>
                  </div>

                  {sub.mentorPraise && (
                    <p className="text-xs text-[#6B5140] font-serif italic mt-2 line-clamp-1 bg-[#FAF6F0] px-3 py-1.5 rounded w-max border-l-2 border-[#A85D55]">
                      "{sub.mentorPraise}"
                    </p>
                  )}
                </div>
              </div>

              {/* Right Action Button - Matching "View" button in reference */}
              <div className="flex flex-col items-end gap-3 w-full md:w-auto shrink-0">
                {sub.status === 'reviewed' ? (
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#B49A68] font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Reviewed
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#A85D55] font-bold">
                    Needs Critique
                  </span>
                )}
                
                <button
                  onClick={() => openReviewModal(sub)}
                  className="btn-outline-ink px-6 py-2 rounded text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all w-full md:w-auto"
                >
                  <Eye className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span>View & Grade</span>
                </button>
              </div>
            </div>
          ))}

          {filteredSubmissions.length === 0 && (
            <div className="p-16 text-center text-[#6B5140] font-serif space-y-3 bg-[#FAF6F0] rounded-xl border border-[rgba(107,81,64,0.15)]">
              <p className="text-xl text-[#171513] font-normal">All submissions reviewed!</p>
              <p className="text-sm font-sans">Your critique queue is clear. Time to brew a fresh cup of tea.</p>
              <InkStroke color="#B49A68" width={100} height={12} className="mx-auto pt-2" />
            </div>
          )}
        </div>
      </div>

      {/* Review Modal / Desk Drawer */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171513]/60 backdrop-blur-sm animate-fade-in">
          <div className="paper-sheet w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(107,81,64,0.2)] shadow-2xl p-8 space-y-8 relative bg-white">
            <button
              onClick={() => setSelectedSubmission(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#FAF6F0] text-[#6B5140] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-[rgba(107,81,64,0.12)] pb-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#A85D55] uppercase tracking-widest font-bold">
                <span>Instructor Assessment Sheet</span>
                <span>•</span>
                <span>Learner: {selectedSubmission.studentName}</span>
              </div>
              <h2 className="text-3xl font-serif font-normal text-[#171513] mt-2">
                Critique: {selectedSubmission.task}
              </h2>
              <p className="text-[11px] text-[#6B5140] font-mono uppercase tracking-widest mt-1">
                Submitted {selectedSubmission.submittedAt} • Style: {selectedSubmission.style}
              </p>
            </div>

            {/* Side-by-side: Student Submission vs Exemplar Reference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Student Artwork */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-serif font-bold text-[#171513] uppercase tracking-wider">
                  <span>Student Submission</span>
                  <span className="font-mono text-[10px] text-[#A85D55] bg-[#F4E8E6] px-2 py-0.5 rounded">AI Scan: {selectedSubmission.score}/100</span>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#FAF6F0] border border-[rgba(107,81,64,0.18)] shadow-inner flex items-center justify-center p-4">
                  <img
                    src={selectedSubmission.sampleUrl}
                    alt="Student work"
                    className="max-h-full object-contain rounded mix-blend-multiply"
                  />
                  {/* Subtle guidelines overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                    backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 38px, rgba(168,93,85,0.4) 38px, rgba(168,93,85,0.4) 39px)'
                  }} />
                </div>
                {selectedSubmission.studentNotes && (
                  <p className="text-xs text-[#6B5140] bg-[#FAF6F0] p-3 rounded-lg border-l-2 border-[#A85D55] italic font-serif shadow-sm">
                    "<strong>Learner note:</strong> {selectedSubmission.studentNotes}"
                  </p>
                )}
              </div>

              {/* Reference Master Exemplar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-serif font-bold text-[#171513] uppercase tracking-wider">
                  <span>Master Exemplar Reference</span>
                  <span className="font-mono text-[10px] text-[#B49A68] bg-[#FAF6F0] px-2 py-0.5 rounded border border-[#B49A68]/30">55° Slant Standard</span>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#FAF6F0] border border-[rgba(107,81,64,0.18)] shadow-inner flex items-center justify-center p-4">
                  <div className="text-center font-script text-6xl text-[#171513] select-none">
                    {selectedSubmission.specimen}
                  </div>
                  <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                    backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 38px, rgba(107,81,64,0.4) 38px, rgba(107,81,64,0.4) 39px)'
                  }} />
                </div>
                <div className="p-3 rounded-lg bg-[#FAF6F0] border border-[rgba(107,81,64,0.1)] text-xs text-[#6B5140] shadow-sm">
                  <p className="font-bold text-[#171513] font-sans uppercase tracking-wider text-[10px] mb-1">Evaluation Criteria:</p>
                  <p className="text-[11px] leading-relaxed">Smooth transition from hairline to swelling shades, clean oval closure, consistent baseline rest.</p>
                </div>
              </div>
            </div>

            {/* Mentor Grading Controls Form */}
            <form onSubmit={handleSubmitCritique} className="space-y-6 border-t border-[rgba(107,81,64,0.12)] pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-serif font-bold text-[#171513] uppercase tracking-wider">
                      Letter Form
                    </label>
                    <span className="font-mono text-[10px] font-bold text-[#A85D55]">{feedbackForm.formScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={feedbackForm.formScore}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, formScore: Number(e.target.value) })}
                    className="w-full accent-[#171513] cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-serif font-bold text-[#171513] uppercase tracking-wider">
                      Spacing & Rhythm
                    </label>
                    <span className="font-mono text-[10px] font-bold text-[#A85D55]">{feedbackForm.spacingScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={feedbackForm.spacingScore}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, spacingScore: Number(e.target.value) })}
                    className="w-full accent-[#171513] cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-serif font-bold text-[#171513] uppercase tracking-wider">
                      Slant & Control
                    </label>
                    <span className="font-mono text-[10px] font-bold text-[#A85D55]">{feedbackForm.slantScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={feedbackForm.slantScore}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, slantScore: Number(e.target.value) })}
                    className="w-full accent-[#171513] cursor-pointer"
                  />
                </div>
              </div>

              {/* Qualitative Critique Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="text-xs font-serif font-bold text-[#171513] uppercase tracking-wider block mb-2">
                    Strengths (What was done well)
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackForm.praise}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, praise: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#FAF6F0] border border-[rgba(107,81,64,0.18)] text-sm font-sans text-[#171513] focus:outline-none focus:border-[#A85D55] transition-colors resize-none shadow-inner"
                    placeholder="Note positive pressure nuances and clean entries..."
                  />
                </div>
                <div>
                  <label className="text-xs font-serif font-bold text-[#171513] uppercase tracking-wider block mb-2">
                    Actionable Improvement Drills
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackForm.improvement}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, improvement: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#FAF6F0] border border-[rgba(107,81,64,0.18)] text-sm font-sans text-[#171513] focus:outline-none focus:border-[#A85D55] transition-colors resize-none shadow-inner"
                    placeholder="Prescribe targeted remedial strokes..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-[rgba(107,81,64,0.12)]">
                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="btn-outline-ink px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-ink px-8 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Critique</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
