import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Check, 
  Clock, 
  Target, 
  Compass, 
  Award, 
  Sliders, 
  BookOpen,
  Zap
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Onboarding() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)

  // Onboarding Answers State
  const [name, setName] = useState(user?.name || '')
  const [skillLevel, setSkillLevel] = useState('beginner')
  const [currentExperience, setCurrentExperience] = useState('beginner')
  const [preferredStyles, setPreferredStyles] = useState(['brush', 'modern'])
  const [learningGoals, setLearningGoals] = useState(['hobby', 'community'])
  const [dailyPracticeTarget, setDailyPracticeTarget] = useState(15) // minutes
  const [preferredDifficulty, setPreferredDifficulty] = useState('easy')
  const [interests, setInterests] = useState(['posters', 'trace'])

  const stylesList = [
    { id: 'brush', name: 'Brush Lettering', desc: 'Modern casual script & bounce lettering' },
    { id: 'gothic', name: 'Gothic / Blackletter', desc: 'Dramatic and bold medieval heavy angles' },
    { id: 'modern', name: 'Modern Script', desc: 'Flowing contemporary cursive calligraphy' },
    { id: 'copperplate', name: 'Copperplate / Engrosser', desc: 'Classic traditional shaded dip-pen script' },
    { id: 'italic', name: 'Chancery Italic', desc: 'Clean, elegant, and historically grounded' },
    { id: 'minimal', name: 'Minimal Typography', desc: 'Sleek, modern monogram and layout lines' },
  ]

  const goalsList = [
    { id: 'hobby', name: 'Master Calligraphy as a Relaxing Creative Hobby' },
    { id: 'professional', name: 'Design invitations, logos, and stationery professionally' },
    { id: 'mindfulness', name: 'Daily mindfulness, focus, and artistic relaxation' },
    { id: 'community', name: 'Build a digital calligraphy portfolio & share artwork' },
    { id: 'ai-skill', name: 'Improve stroke consistency using AI real-time assessment' },
  ]

  const timeTargets = [
    { mins: 10, label: '10 Mins / Day', desc: 'Quick daily bite-sized drills' },
    { mins: 15, label: '15 Mins / Day', desc: 'Recommended optimal learning pace' },
    { mins: 25, label: '25 Mins / Day', desc: 'Deep focus stroke mastery' },
    { mins: 40, label: '40 Mins / Day', desc: 'Intensive artist accelerator' },
  ]

  const toggleMultiSelect = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item))
    } else {
      setList([...list, item])
    }
  }

  // Calculate recommended path dynamically
  const getRecommendedPath = () => {
    if (skillLevel === 'advanced') {
      return 'Advanced Flourishing → Custom Typography → Creative Lettering → Professional Portfolio'
    }
    if (skillLevel === 'intermediate') {
      return 'Brush Lettering → Letter Connections → Spacing & Alignment → Composition'
    }
    return 'Basic Strokes → Letter Formation → Words → Flourishing'
  }

  const getStarterModule = () => {
    if (skillLevel === 'advanced') {
      return 'Complex Flourish Compositions & Script Flourishing'
    }
    if (skillLevel === 'intermediate') {
      return 'Letter Spacing, Rhythm & Contrast Control'
    }
    return 'Drill #1: Fundamentals of Upstrokes & Downstrokes'
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      const res = await axios.put('/api/users/onboarding', {
        name,
        skillLevel,
        currentExperience,
        preferredStyles,
        learningGoals,
        interests,
        dailyPracticeTarget,
        preferredDifficulty,
        recommendedPath: getRecommendedPath(),
      })
      updateUser(res.data)
      toast.success('Personalized Learning Profile Generated! Welcome to CalliVerse ✨')
      navigate('/dashboard')
    } catch (err) {
      toast.error('Failed to save profile. Proceeding to Dashboard...')
      navigate('/dashboard')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 relative overflow-hidden ink-bg">
      {/* Dynamic Gold Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl glass p-8 md:p-12 relative z-10 border-amber-500/10 shadow-2xl space-y-8">
        
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-amber-900/15 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-semibold">
              Step {step} of 4 — {step === 4 ? 'Personalized Profile' : 'Personalization'}
            </span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-9 h-1.5 rounded-full transition-all duration-300 ${
                  num <= step ? 'bg-amber-500 shadow-gold' : 'bg-neutral-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wizard Steps */}
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Name & Skill Level */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight font-display text-neutral-100">
                  Welcome to CalliVerse 🖋️
                </h2>
                <p className="text-sm text-neutral-400">
                  Let’s calibrate your personal calligraphy journey. What is your current skill level?
                </p>
              </div>

              {/* Name Confirmation */}
              <div className="space-y-1">
                <label className="label">Your Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="input py-2.5"
                />
              </div>

              {/* Skill Level Selection */}
              <div className="space-y-2">
                <label className="label">Calligraphy Experience Level</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  {[
                    { lvl: 'beginner', title: 'Beginner', subtitle: 'Never used a calligraphy pen or brush' },
                    { lvl: 'intermediate', title: 'Intermediate', subtitle: 'Familiar with basic strokes & alphabet forms' },
                    { lvl: 'advanced', title: 'Advanced', subtitle: 'Design compositions, invitations & flourishing' },
                  ].map((item) => (
                    <button
                      key={item.lvl}
                      type="button"
                      onClick={() => {
                        setSkillLevel(item.lvl)
                        setCurrentExperience(item.lvl)
                        if (item.lvl === 'beginner') setPreferredDifficulty('easy')
                        if (item.lvl === 'intermediate') setPreferredDifficulty('medium')
                        if (item.lvl === 'advanced') setPreferredDifficulty('hard')
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-3 ${
                        skillLevel === item.lvl
                          ? 'border-amber-500 bg-amber-500/15 text-amber-300 shadow-gold'
                          : 'border-amber-900/20 bg-neutral-900/50 text-neutral-300 hover:border-amber-500/40'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-lg font-bold font-display capitalize">{item.title}</span>
                        {skillLevel === item.lvl && <CheckCircle className="w-4 h-4 text-amber-400" />}
                      </div>
                      <span className="text-xs text-neutral-400 leading-relaxed">{item.subtitle}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Preferred Styles */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight font-display text-neutral-100">
                  Preferred Calligraphy Styles
                </h2>
                <p className="text-sm text-neutral-400">
                  Select the letterform traditions you want to practice and analyze with AI.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 max-h-[340px] overflow-y-auto pr-1">
                {stylesList.map((styleObj) => {
                  const selected = preferredStyles.includes(styleObj.id)
                  return (
                    <button
                      key={styleObj.id}
                      type="button"
                      onClick={() => toggleMultiSelect(styleObj.id, preferredStyles, setPreferredStyles)}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                        selected
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-gold'
                          : 'border-amber-900/20 bg-neutral-900/50 text-neutral-300 hover:border-amber-500/40'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold font-display text-neutral-100">{styleObj.name}</h4>
                        <p className="text-xs text-neutral-400">{styleObj.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ml-3 ${
                        selected ? 'bg-amber-500 border-amber-500' : 'border-neutral-700 bg-neutral-800'
                      }`}>
                        {selected && <Check className="w-3.5 h-3.5 text-neutral-950 stroke-[3]" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Goals, Daily Practice Target & Difficulty */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight font-display text-neutral-100">
                  Practice Goals & Routine
                </h2>
                <p className="text-sm text-neutral-400">
                  Consistent practice builds muscle memory. Tailor your daily commitment.
                </p>
              </div>

              {/* Daily Practice Target */}
              <div className="space-y-2">
                <label className="label flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Daily Practice Target
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {timeTargets.map((target) => (
                    <button
                      key={target.mins}
                      type="button"
                      onClick={() => setDailyPracticeTarget(target.mins)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        dailyPracticeTarget === target.mins
                          ? 'border-amber-500 bg-amber-500/15 text-amber-300 shadow-gold'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="text-sm font-bold font-mono">{target.label}</div>
                      <div className="text-[10px] text-neutral-400 mt-1">{target.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Difficulty */}
              <div className="space-y-2">
                <label className="label flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-500" /> Preferred Difficulty
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'easy', label: 'Gentle / Easy', desc: 'Guided tracing with slant markers' },
                    { id: 'medium', label: 'Balanced / Medium', desc: 'Standard word and alphabet drills' },
                    { id: 'hard', label: 'Challenging / Hard', desc: 'Freehand flourishes & compositions' },
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => setPreferredDifficulty(diff.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        preferredDifficulty === diff.id
                          ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="text-xs font-bold capitalize">{diff.label}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{diff.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goals list */}
              <div className="space-y-2">
                <label className="label flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-500" /> Primary Goals
                </label>
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {goalsList.map((goal) => {
                    const selected = learningGoals.includes(goal.id)
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => toggleMultiSelect(goal.id, learningGoals, setLearningGoals)}
                        className={`w-full p-2.5 px-3 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                          selected
                            ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                            : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <span>{goal.name}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Generated Personalized Learning Profile */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-gold">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight font-display text-neutral-100">
                  Your Personalized Calligraphy Profile
                </h2>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Based on your goals and skill calibration, our AI has designed a tailored learning trajectory.
                </p>
              </div>

              {/* Profile Card Output */}
              <div className="p-6 rounded-2xl bg-neutral-900/90 border border-amber-500/30 space-y-5 shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-36 h-36 bg-amber-500/10 rounded-full filter blur-2xl pointer-events-none" />

                {/* Level + Daily Target Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-b border-amber-900/20 pb-4">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Assessed Level</span>
                    <p className="text-base font-bold text-amber-400 font-display capitalize mt-0.5">
                      {skillLevel} Artist
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Daily Target</span>
                    <p className="text-base font-bold text-neutral-100 font-display mt-0.5">
                      {dailyPracticeTarget} Mins / Day
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Pace & Mode</span>
                    <p className="text-base font-bold text-neutral-100 font-display capitalize mt-0.5">
                      {preferredDifficulty} Mode
                    </p>
                  </div>
                </div>

                {/* Recommended Path Display */}
                <div className="space-y-2">
                  <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-semibold flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" /> Recommended Learning Path
                  </span>
                  <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-amber-500/20 text-neutral-200 font-serif text-sm leading-relaxed tracking-wide">
                    {getRecommendedPath()}
                  </div>
                </div>

                {/* Selected Styles & Starter Drill */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Focus Styles</span>
                    <div className="flex flex-wrap gap-1.5">
                      {preferredStyles.map((s) => (
                        <span key={s} className="text-[10px] px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono capitalize">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-500" /> Recommended First Step
                    </span>
                    <p className="text-xs text-neutral-300 font-medium bg-neutral-950/50 p-2 rounded-lg border border-neutral-800">
                      {getStarterModule()}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Navigation Buttons Footer */}
        <div className="flex justify-between items-center pt-6 border-t border-amber-900/10">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1 || saving}
            className={`btn btn-ghost btn-sm flex items-center gap-1.5 ${
              step === 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step === 4 ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="btn btn-primary btn-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 px-6 py-2.5 text-sm font-semibold"
            >
              {saving ? 'Saving...' : 'Begin Calligraphy Journey'} <Sparkles className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary btn-sm flex items-center gap-1.5 px-5 py-2 text-xs font-semibold"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
