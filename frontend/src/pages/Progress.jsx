import { useState } from 'react'
import { 
  Sparkles, 
  Flame, 
  Award, 
  Cpu, 
  UploadCloud, 
  Sliders, 
  Loader2, 
  Compass, 
  CheckCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function Progress() {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)

  const badges = [
    { name: "Ink Initiate", desc: "Completed onboarding & first tracing stroke", icon: "🖋️", earned: true },
    { name: "Flourish Master", desc: "Earned 95% spacing alignment score", icon: "✨", earned: true },
    { name: "Streaker Elite", desc: "Active practice for 3 consecutive days", icon: "🔥", earned: true },
    { name: "Gothic Knight", desc: "Finished Gothic tracing levels completely", icon: "🏰", earned: false },
    { name: "Royal Scriptor", desc: "Published your first design portfolio", icon: "👑", earned: false },
  ]

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setAnalyzing(true)
    setAnalysisResult(null)

    // Simulate AI computing analysis
    setTimeout(() => {
      setAnalyzing(false)
      setAnalysisResult({
        overallScore: 88,
        slantScore: 92,
        spacingScore: 84,
        smoothnessScore: 90,
        pressureScore: 86,
        feedback: "Your letter slant matches standard chancery italics beautifully! However, focus on spacing consistency near the transitions between letters like 'm' and 'n'. Release pressure a bit faster on the upward hair strokes."
      })
      toast.success('AI Stroke Analysis Completed successfully!')
    }, 3000)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h1 className="text-3xl font-semibold font-display tracking-tight text-neutral-100 flex items-center gap-2">
            Progress & Gamification Center <Award className="w-5 h-5 text-amber-500 fill-amber-500/10" />
          </h1>
          <p className="text-xs text-neutral-400">Track your practice streaks, badges, achievements, and analyze handwritten calligraphy using the AI engine.</p>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="stat-card flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Current Streak</p>
            <p className="text-xl font-bold text-neutral-100 font-display">4 Days Active</p>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Lessons Finished</p>
            <p className="text-xl font-bold text-neutral-100 font-display">6 Completed</p>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Total XP Score</p>
            <p className="text-xl font-bold text-neutral-100 font-display">850 XP Level</p>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">AI Accuracy Avg</p>
            <p className="text-xl font-bold text-neutral-100 font-display">88% Accuracy</p>
          </div>
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns - AI Practice Analysis Uploader */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-900/15 space-y-6">
            
            <div className="flex items-center gap-2 text-amber-500 border-b border-amber-900/10 pb-4">
              <Cpu className="w-5 h-5 animate-pulse" />
              <h3 className="text-base font-semibold font-display text-neutral-200">AI Practice Stroke Analyzer</h3>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Snap a clear photo of your handwritten paper letters and upload it. The neural engine analyzes slant alignments, strokes consistency, pressure levels, and provides immediate suggestions for improvement.
            </p>

            {/* Upload Area */}
            <div className="relative border-2 border-dashed border-amber-900/20 hover:border-amber-500/40 rounded-2xl bg-neutral-950 p-8 text-center transition-all duration-300">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                disabled={analyzing}
              />
              
              {analyzing ? (
                <div className="space-y-4 py-6">
                  <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-200">Processing Stroke Geometry...</h4>
                    <p className="text-xs text-neutral-500 mt-1">Analyzing line alignment, slant levels and spacing curves...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <UploadCloud className="w-12 h-12 text-amber-500/60 mx-auto" />
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-200">Select Practice Snapshot Image</h4>
                    <p className="text-xs text-neutral-500 mt-1">Supports JPG, PNG, WEBP files up to 5MB.</p>
                  </div>
                  <button className="btn btn-ghost btn-sm">Browse Files</button>
                </div>
              )}
            </div>

            {/* Analysis Results Display */}
            {analysisResult && (
              <div className="p-6 rounded-xl bg-neutral-950 border border-amber-500/20 space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-amber-900/10 pb-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider font-mono text-amber-400">AI Stroke Report</h4>
                  <span className="text-xs text-neutral-400 font-mono">Overall Accuracy Score: <b className="text-amber-400 text-sm">{analysisResult.overallScore}%</b></span>
                </div>

                {/* Score Indicators */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span>55° Slant Match</span>
                      <span className="text-amber-500">{analysisResult.slantScore}%</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${analysisResult.slantScore}%` }} /></div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span>Letter Spacing</span>
                      <span className="text-amber-500">{analysisResult.spacingScore}%</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${analysisResult.spacingScore}%` }} /></div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span>Stroke Smoothness</span>
                      <span className="text-amber-500">{analysisResult.smoothnessScore}%</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${analysisResult.smoothnessScore}%` }} /></div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span>Pressure Balance</span>
                      <span className="text-amber-500">{analysisResult.pressureScore}%</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${analysisResult.pressureScore}%` }} /></div>
                  </div>
                </div>

                {/* AI Advice */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 flex gap-3">
                  <Sliders className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div>
                    <h5 className="text-xs uppercase font-mono text-amber-400 tracking-wider font-semibold">AI Tutor Improvement Advice</h5>
                    <p className="text-xs text-neutral-300 leading-relaxed mt-1.5">{analysisResult.feedback}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column - Gamification achievements & Badges */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-900/15 space-y-6">
            
            <div className="flex items-center gap-2 border-b border-amber-900/10 pb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-semibold font-display text-neutral-200">Badges & Achievements</h3>
            </div>

            <div className="space-y-4">
              {badges.map((badge, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    badge.earned 
                      ? 'border-amber-950/40 bg-neutral-950/40' 
                      : 'border-neutral-800 bg-neutral-900/20 opacity-40'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-200">{badge.name}</h4>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{badge.desc}</p>
                    </div>
                  </div>
                  {badge.earned && <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}
