import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Sparkles, 
  Flame, 
  Compass, 
  ArrowUpRight, 
  TrendingUp, 
  Bot, 
  Target,
  Trophy,
  ArrowRight,
  Clock,
  PlayCircle
} from 'lucide-react'
import InkStroke from '../components/common/InkStroke'

export default function Dashboard() {
  const { user } = useAuth()
  
  const studentName = user?.name?.split(' ')[0] || 'Lakshitha'

  return (
    <div className="space-y-10 animate-fade-in max-w-6xl mx-auto pt-4">
      
      {/* ── Top Section: Header & Progress Graph ─────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-6 border-b border-[rgba(107,81,64,0.12)]">
        
        {/* Header Left */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif text-[#171513] font-normal tracking-tight">
            Good morning, <span className="font-serif italic font-bold text-[#A85D55]">{studentName}</span> ✨
          </h1>
          <p className="text-[13px] text-[#6B5140] font-sans">
            Your creative journey continues. Ready to practice your rhythm today?
          </p>
          <InkStroke color="#A85D55" width={170} height={18} className="mt-3" />
        </div>

        {/* Header Right: Mini Progress Graph */}
        <div className="w-full lg:w-72 p-5 bg-white border border-[rgba(107,81,64,0.15)] flex flex-col justify-between shadow-sm rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#171513] font-bold">
              Weekly Progress
            </span>
            <span className="text-[10px] text-[#A85D55] font-bold bg-[#F4E8E6] px-2 py-0.5 rounded-full">+12%</span>
          </div>
          <div className="h-20 w-full flex items-end justify-between gap-1.5">
            {[40, 65, 30, 80, 50, 90, 75].map((h, i) => (
              <div key={i} className="w-full bg-[#FAF6F0] rounded-t-md relative overflow-hidden h-full group">
                <div 
                  className="absolute bottom-0 w-full bg-[#D8AFA9] group-hover:bg-[#A85D55] rounded-t-md transition-all duration-700" 
                  style={{ height: `${h}%` }} 
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] font-mono text-[#8E7360] mt-2 px-1">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>
        </div>

      </div>

      {/* ── 3 Main Status Cards ────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Daily Practice Target */}
        <div className="p-6 bg-gradient-to-br from-white to-[#FAF6F0] border border-[rgba(107,81,64,0.18)] hover:border-[#A85D55] transition-all flex flex-col justify-between min-h-[180px] rounded-xl shadow-sm group">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full bg-[#F4E8E6] text-[#A85D55] flex items-center justify-center">
              <Clock className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <span className="text-[9px] uppercase font-mono tracking-wider text-[#6B5140] font-bold">Today</span>
          </div>
          
          <div className="mt-4">
            <p className="text-[10px] uppercase font-sans tracking-widest text-[#6B5140] mb-1">
              Daily Practice Target
            </p>
            <h3 className="text-3xl font-serif text-[#171513] font-normal leading-none">
              <span className="font-bold">12 min</span> <span className="text-lg text-[#8E7360]">left</span>
            </h3>
            
            <div className="mt-4 bg-[#EFE5D5] h-1.5 rounded-full w-full overflow-hidden">
              <div className="bg-[#A85D55] h-full rounded-full transition-all duration-1000" style={{ width: '60%' }} />
            </div>
            <div className="flex justify-between text-[9px] font-mono text-[#6B5140] mt-2 uppercase">
              <span>18m done</span>
              <span>30m goal</span>
            </div>
          </div>
        </div>

        {/* Card 2: Current Course */}
        <div className="p-6 bg-white border border-[rgba(107,81,64,0.18)] hover:border-[#A85D55] transition-all flex flex-col justify-between min-h-[180px] rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full bg-[#FAF6F0] text-[#171513] flex items-center justify-center border border-[rgba(107,81,64,0.1)]">
              <Compass className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <span className="text-[9px] uppercase font-mono tracking-wider text-[#6B5140] font-bold">In Progress</span>
          </div>
          
          <div className="mt-4">
            <p className="text-[10px] uppercase font-sans tracking-widest text-[#6B5140] mb-1">
              Current Course
            </p>
            <h3 className="text-2xl font-serif text-[#171513] font-medium leading-tight mb-4">
              Modern Calligraphy<br />Basics
            </h3>
            
            <Link to="/courses/modern-basics" className="btn-ink text-[10px] py-1.5 px-4 w-full justify-between">
              <span>Continue Lesson</span> <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Card 3: Recent AI Assessment */}
        <div className="p-6 bg-[#171513] text-[#FAF6F0] border border-[#302B27] hover:border-[#A85D55] transition-all flex flex-col justify-between min-h-[180px] rounded-xl shadow-md">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full bg-[#302B27] text-[#A85D55] flex items-center justify-center">
              <Bot className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <span className="text-[9px] uppercase font-mono tracking-wider text-[#C4B5A5] font-bold">Latest Review</span>
          </div>
          
          <div className="mt-4">
            <p className="text-[10px] uppercase font-sans tracking-widest text-[#C4B5A5] mb-1">
              AI Assessment Score
            </p>
            <div className="flex items-baseline gap-2 leading-none">
              <h3 className="text-[42px] font-serif font-normal text-white">84</h3>
              <span className="text-[11px] font-sans text-[#A85D55] font-bold">/ 100</span>
            </div>
            
            <p className="text-[11px] text-[#8E7360] font-sans mt-3 leading-relaxed border-l-2 border-[#A85D55] pl-2">
              Great improvement in letter spacing. Focus on ascender consistency next.
            </p>
          </div>
        </div>

      </div>

      {/* ── Recommended Practice Section ───────────────────────────── */}
      <div className="pt-6">
        <div className="flex items-end justify-between mb-5 border-b border-[rgba(107,81,64,0.1)] pb-3">
          <h2 className="text-2xl font-serif text-[#171513]">Recommended Practice</h2>
          <Link to="/practice" className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#A85D55] hover:text-[#171513] flex items-center gap-1 transition-colors">
            View All Drills <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Practice Item 1 */}
          <div className="bg-white rounded-xl p-4 flex gap-4 items-center group cursor-pointer border border-[rgba(107,81,64,0.15)] hover:border-[#A85D55] shadow-sm transition-all">
            <div className="w-16 h-16 rounded-xl bg-[#FAF6F0] border border-[rgba(107,81,64,0.15)] flex items-center justify-center text-3xl font-script text-[#171513] group-hover:bg-[#F4E8E6] transition-colors shadow-inner">
              a
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-serif font-bold text-[#171513] group-hover:text-[#A85D55] transition-colors leading-tight">Basic Ovals & As</h4>
              <p className="text-[11px] text-[#6B5140] font-sans line-clamp-1 mt-0.5">Foundational copperplate strokes.</p>
              <div className="flex items-center gap-2 mt-2.5">
                <span className="text-[9px] font-mono bg-[#EFE5D5] px-2 py-0.5 rounded text-[#6B5140] font-bold">10 MIN</span>
                <span className="text-[9px] font-mono bg-[#EFE5D5] px-2 py-0.5 rounded text-[#6B5140] font-bold">WARMUP</span>
              </div>
            </div>
            <PlayCircle className="w-6 h-6 text-[#8E7360] group-hover:text-[#A85D55] transition-colors shrink-0" strokeWidth={1.5} />
          </div>

          {/* Practice Item 2 */}
          <div className="bg-white rounded-xl p-4 flex gap-4 items-center group cursor-pointer border border-[rgba(107,81,64,0.15)] hover:border-[#A85D55] shadow-sm transition-all">
            <div className="w-16 h-16 rounded-xl bg-[#FAF6F0] border border-[rgba(107,81,64,0.15)] flex items-center justify-center text-3xl font-script text-[#171513] group-hover:bg-[#F4E8E6] transition-colors shadow-inner">
              ll
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-serif font-bold text-[#171513] group-hover:text-[#A85D55] transition-colors leading-tight">Ascender Loops</h4>
              <p className="text-[11px] text-[#6B5140] font-sans line-clamp-1 mt-0.5">Maintaining parallel slants.</p>
              <div className="flex items-center gap-2 mt-2.5">
                <span className="text-[9px] font-mono bg-[#EFE5D5] px-2 py-0.5 rounded text-[#6B5140] font-bold">15 MIN</span>
                <span className="text-[9px] font-mono bg-[#F4E8E6] px-2 py-0.5 rounded text-[#A85D55] font-bold border border-[#D8AFA9]/50">FOCUS</span>
              </div>
            </div>
            <PlayCircle className="w-6 h-6 text-[#8E7360] group-hover:text-[#A85D55] transition-colors shrink-0" strokeWidth={1.5} />
          </div>

          {/* Practice Item 3 */}
          <div className="bg-white rounded-xl p-4 flex gap-4 items-center group cursor-pointer border border-[rgba(107,81,64,0.15)] hover:border-[#A85D55] shadow-sm transition-all">
            <div className="w-16 h-16 rounded-xl bg-[#FAF6F0] border border-[rgba(107,81,64,0.15)] flex items-center justify-center text-3xl font-script text-[#171513] group-hover:bg-[#F4E8E6] transition-colors shadow-inner">
              &
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-serif font-bold text-[#171513] group-hover:text-[#A85D55] transition-colors leading-tight">Flourished Ampersand</h4>
              <p className="text-[11px] text-[#6B5140] font-sans line-clamp-1 mt-0.5">Creative challenge of the day.</p>
              <div className="flex items-center gap-2 mt-2.5">
                <span className="text-[9px] font-mono bg-[#EFE5D5] px-2 py-0.5 rounded text-[#6B5140] font-bold">20 MIN</span>
                <span className="text-[9px] font-mono bg-[#FAF6F0] px-2 py-0.5 rounded text-[#B49A68] font-bold border border-[#B49A68]/30">CHALLENGE</span>
              </div>
            </div>
            <PlayCircle className="w-6 h-6 text-[#8E7360] group-hover:text-[#A85D55] transition-colors shrink-0" strokeWidth={1.5} />
          </div>

        </div>
      </div>

    </div>
  )
}
