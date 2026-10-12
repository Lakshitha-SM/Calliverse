import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Flame, Trophy, Clock, ArrowRight, CheckCircle2, ChevronRight, Target, Award } from 'lucide-react'

export default function Challenges() {
  const navigate = useNavigate()
  
  const streak = 12

  const activeChallenges = [
    { id: 1, title: 'Master the Ascender Loop', desc: 'Achieve a 90% score on the ascender loop drill.', xp: 50, time: '10 min', status: 'pending' },
    { id: 2, title: 'Copperplate Quote', desc: 'Write a full 5-word quote with perfect slant alignment.', xp: 120, time: '25 min', status: 'pending' },
    { id: 3, title: '7-Day Streak', desc: 'Practice for 7 consecutive days.', xp: 100, time: 'Weekly', status: 'completed' },
  ]

  const leaderboard = [
    { rank: 1, name: 'Elena V.', score: '4,250' },
    { rank: 2, name: 'Marcus D.', score: '3,890' },
    { rank: 3, name: 'Lakshitha', score: '3,750', isCurrentUser: true },
    { rank: 4, name: 'Sarah K.', score: '3,120' },
    { rank: 5, name: 'James T.', score: '2,900' },
  ]

  const timelineSteps = [
    { day: 'Mon', status: 'completed' },
    { day: 'Tue', status: 'completed' },
    { day: 'Wed', status: 'completed' },
    { day: 'Thu', status: 'active' },
    { day: 'Fri', status: 'locked' },
    { day: 'Sat', status: 'locked' },
    { day: 'Sun', status: 'locked', reward: true },
  ]

  return (
    <div className="space-y-10 animate-fade-in max-w-6xl mx-auto select-none pt-4">
      
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="border-b border-[rgba(107,81,64,0.14)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#A85D55] font-bold">
            Push Your Limits
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#171513] font-normal tracking-tight mt-1">
            Weekly Challenges
          </h1>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-[rgba(107,81,64,0.15)] shadow-sm shrink-0">
          <div className="w-12 h-12 rounded-full bg-[#FAF6F0] flex items-center justify-center border border-[rgba(107,81,64,0.1)] text-[#B49A68]">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-[#6B5140] font-bold">Total XP</p>
            <p className="text-2xl font-serif font-bold text-[#171513] leading-none mt-1">3,750</p>
          </div>
        </div>
      </div>

      {/* ── Weekly Timeline ────────────────────────────────────────── */}
      <div className="paper-sheet p-6 bg-white border border-[rgba(107,81,64,0.18)] shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs uppercase font-sans tracking-widest text-[#171513] font-bold">
            Weekly Progression
          </h3>
          <span className="text-[10px] font-mono font-bold text-[#A85D55] bg-[#F4E8E6] px-2 py-1 rounded">Day 4 of 7</span>
        </div>
        
        {/* Desktop Horizontal Timeline / Mobile Vertical */}
        <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-0">
          {/* Background Line (Desktop only) */}
          <div className="hidden md:block absolute top-[18px] left-8 right-8 h-px bg-[rgba(107,81,64,0.15)] z-0" />
          {/* Background Line (Mobile only) */}
          <div className="md:hidden absolute left-[18px] top-8 bottom-8 w-px bg-[rgba(107,81,64,0.15)] z-0" />

          {timelineSteps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 text-center group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step.status === 'completed' ? 'bg-[#171513] text-white border-2 border-[#171513]' : 
                step.status === 'active' ? 'bg-[#F4E8E6] text-[#A85D55] border-2 border-[#A85D55]' : 
                'bg-[#FAF6F0] text-[#8E7360] border-2 border-transparent'
              }`}>
                {step.status === 'completed' ? <CheckCircle2 size={18} /> : 
                 step.reward ? <Award size={18} /> : 
                 (idx + 1)}
              </div>
              <div className="text-left md:text-center">
                <p className={`text-[11px] font-mono uppercase tracking-widest ${
                  step.status === 'active' ? 'text-[#A85D55] font-bold' : 
                  step.status === 'completed' ? 'text-[#171513]' : 'text-[#8E7360]'
                }`}>{step.day}</p>
                {step.reward && (
                  <p className="text-[9px] font-sans text-[#B49A68] font-bold mt-1 uppercase tracking-wider">Loot Box</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 Cols): Challenge Cards List */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-[#171513] font-normal flex items-center gap-2">
              <Target size={20} className="text-[#A85D55]" /> Today's Quests
            </h3>
            
            <div className="space-y-4">
              {activeChallenges.map((challenge) => (
                <div key={challenge.id} className={`paper-sheet p-5 sm:p-6 bg-white border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group ${
                  challenge.status === 'completed' ? 'border-[rgba(107,81,64,0.1)] opacity-70' : 'border-[rgba(107,81,64,0.18)] hover:border-[#A85D55] shadow-sm'
                }`}>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h4 className={`text-lg font-serif font-bold transition-colors ${
                        challenge.status === 'completed' ? 'text-[#6B5140] line-through' : 'text-[#171513] group-hover:text-[#A85D55]'
                      }`}>{challenge.title}</h4>
                      {challenge.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-[#B49A68]" strokeWidth={2.5} />}
                    </div>
                    <p className="text-xs text-[#6B5140] font-sans leading-relaxed max-w-lg">
                      {challenge.desc}
                    </p>
                    <div className="flex items-center gap-3 mt-3.5">
                      <span className="text-[10px] font-mono bg-[#EFE5D5] px-2.5 py-1 rounded text-[#6B5140] flex items-center gap-1.5 font-bold">
                        <Clock size={12} strokeWidth={2.5} /> {challenge.time}
                      </span>
                      <span className="text-[10px] font-mono bg-[#F4E8E6] text-[#A85D55] px-2.5 py-1 rounded font-bold border border-[#D8AFA9]/50">
                        +{challenge.xp} XP
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {challenge.status === 'completed' ? (
                      <button className="w-full sm:w-auto btn-outline-ink text-xs py-2 px-6 flex items-center justify-center gap-1.5 cursor-default opacity-80 border-transparent bg-[#FAF6F0]">
                        Claimed
                      </button>
                    ) : (
                      <button onClick={() => navigate('/practice')} className="w-full sm:w-auto btn-ink text-xs py-2.5 px-8 flex items-center justify-center gap-1.5 shadow-sm">
                        Accept <ChevronRight size={14} />
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 Cols): Streak & Leaderboard */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="paper-sheet p-8 bg-gradient-to-br from-[#171513] to-[#24201D] text-[#FAF6F0] border border-[#302B27] flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden aspect-square lg:aspect-auto lg:h-[280px]">
            <div className="absolute top-0 w-full h-full bg-radial from-[#A85D55]/20 to-transparent blur-3xl pointer-events-none" />
            
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C4B5A5] font-bold relative z-10 mb-4">
              Active Streak
            </span>
            
            <div className="relative z-10 mb-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#302B27] flex items-center justify-center border-4 border-[#171513] shadow-[0_0_15px_rgba(168,93,85,0.4)]">
                <Flame className="w-12 h-12 text-[#A85D55]" fill="#A85D55" />
              </div>
              <h2 className="text-5xl font-serif font-normal mt-5 leading-none">{streak} <span className="text-xl text-[#C4B5A5]">Days</span></h2>
              <p className="text-[10px] text-[#A85D55] font-sans font-bold uppercase tracking-widest mt-2">On Fire!</p>
            </div>
          </div>

          <div className="paper-sheet bg-white border border-[rgba(107,81,64,0.18)] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[rgba(107,81,64,0.1)] bg-[#FAF6F0]/50">
              <h3 className="text-xs uppercase font-sans tracking-widest text-[#171513] font-bold flex items-center gap-2">
                <Trophy size={14} className="text-[#B49A68]" /> Studio Leaderboard
              </h3>
            </div>
            <div className="divide-y divide-[rgba(107,81,64,0.08)]">
              {leaderboard.map((user, idx) => (
                <div key={idx} className={`p-4 flex items-center justify-between transition-colors ${
                  user.isCurrentUser ? 'bg-[#F4E8E6]/40 border-l-2 border-l-[#A85D55]' : 'hover:bg-[#FAF6F0]'
                }`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-mono font-bold w-4 text-center ${
                      idx === 0 ? 'text-[#B49A68]' : 
                      idx === 1 ? 'text-[#8E7360]' : 
                      idx === 2 ? 'text-[#A85D55]' : 'text-[#6B5140]'
                    }`}>
                      #{user.rank}
                    </span>
                    <span className={`text-sm font-sans ${user.isCurrentUser ? 'font-bold text-[#171513]' : 'font-medium text-[#6B5140]'}`}>
                      {user.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#171513] bg-[#FAF6F0] px-2 py-0.5 rounded">
                    {user.score}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-3 text-center border-t border-[rgba(107,81,64,0.1)] bg-[#FAF6F0]/50">
              <Link to="#" className="text-[10px] font-mono text-[#A85D55] font-bold hover:text-[#171513] transition-colors uppercase tracking-widest">
                View Global Rank
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
