import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Download, Share2, CheckCircle2, ShieldCheck, Printer, ArrowLeft } from 'lucide-react'
import CalliLogo from '../components/common/CalliLogo'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Certificate() {
  const { user } = useAuth()
  const studentName = user?.name || 'Lakshitha S M'
  const courseTitle = 'Beginner Calligraphy Mastery Course'
  const completionDate = '30 September 2026'
  const certificateId = 'CL-2026-8942-VERIFIED'

  const handlePrint = () => {
    window.print()
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Certificate link copied to clipboard!')
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto py-4 select-none">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden border-b border-[rgba(107,81,64,0.12)] pb-4">
        <Link to="/portfolio" className="inline-flex items-center gap-1.5 text-xs text-[#6B5140] hover:text-[#171513] font-bold uppercase tracking-wider transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="btn-outline-ink text-xs py-2 px-5 flex items-center gap-1.5 font-bold"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
          <button
            onClick={handlePrint}
            className="btn-ink text-xs py-2 px-5 flex items-center gap-1.5 font-bold shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* ── Archival Certificate of Completion (Printable Sheet) ─────── */}
      <div className="certificate-frame rounded-xl text-center space-y-8 relative overflow-hidden bg-[#FAF6F0] print:border-none print:shadow-none p-10 md:p-16 shadow-lg border border-[rgba(107,81,64,0.25)]">
        
        {/* Paper Texture overlay */}
        <div className="absolute inset-0 paper-texture opacity-60 pointer-events-none" />

        {/* Ornate Corner Flourishes */}
        <div className="absolute top-6 left-6 w-16 h-16 border-t-[3px] border-l-[3px] border-[#B49A68] pointer-events-none opacity-80" />
        <div className="absolute top-6 right-6 w-16 h-16 border-t-[3px] border-r-[3px] border-[#B49A68] pointer-events-none opacity-80" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-[3px] border-l-[3px] border-[#B49A68] pointer-events-none opacity-80" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-[3px] border-r-[3px] border-[#B49A68] pointer-events-none opacity-80" />

        {/* Certificate Brand Header */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
          <CalliLogo size="lg" to="#" />
          <span className="text-[9px] uppercase font-mono tracking-[0.4em] text-[#6B5140] font-bold mt-2">
            Official Academy Credential
          </span>
        </div>

        {/* Title */}
        <div className="relative z-10 space-y-2 pt-4">
          <h1 className="text-4xl md:text-6xl font-serif text-[#171513] tracking-widest uppercase font-light">
            Certificate
          </h1>
          <p className="text-xs md:text-sm font-sans uppercase tracking-[0.3em] text-[#B49A68] font-bold">
            of Completion
          </p>
        </div>

        {/* Recipient Statement */}
        <div className="relative z-10 space-y-5 max-w-xl mx-auto py-4">
          <p className="text-sm md:text-base font-serif italic text-[#6B5140]">
            This is to proudly certify that
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#171513] font-bold border-b-2 border-[rgba(107,81,64,0.2)] pb-2 inline-block px-12">
            {studentName}
          </h2>
          <p className="text-[13px] md:text-sm text-[#6B5140] font-sans leading-relaxed max-w-lg mx-auto">
            has demonstrated exceptional devotion to craftsmanship, stroke pressure consistency, and 55° slant angle geometry by successfully completing all structured modules of the
          </p>
          <h3 className="text-2xl md:text-3xl font-serif text-[#A85D55] font-normal px-4">
            {courseTitle}
          </h3>
          <p className="text-[11px] font-mono text-[#8E7360] uppercase tracking-widest pt-2">
            Dated: {completionDate}
          </p>
        </div>

        {/* Footer Signatures and Verified QR Seal */}
        <div className="relative z-10 pt-10 border-t border-[rgba(107,81,64,0.15)] max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          
          {/* Master Signature */}
          <div className="text-center sm:text-left space-y-1.5">
            <span className="font-script text-4xl text-[#171513] block mb-2">
              Sophia Chen
            </span>
            <div className="w-48 border-b border-[#171513] mx-auto sm:mx-0" />
            <p className="text-[9px] uppercase font-sans text-[#6B5140] tracking-[0.15em] font-bold pt-1">
              Master Calligrapher & Instructor
            </p>
          </div>

          {/* QR Verification Seal */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white border border-[rgba(107,81,64,0.2)] shadow-sm">
            <div className="w-14 h-14 bg-[#171513] text-white flex flex-col items-center justify-center p-1.5 rounded-lg">
              {/* Stylized QR Matrix */}
              <div className="grid grid-cols-3 gap-[3px] w-9 h-9">
                <div className="bg-white rounded-sm" />
                <div className="bg-white rounded-sm" />
                <div className="bg-transparent" />
                <div className="bg-white rounded-sm" />
                <div className="bg-white rounded-sm" />
                <div className="bg-white rounded-sm" />
                <div className="bg-transparent" />
                <div className="bg-white rounded-sm" />
                <div className="bg-white rounded-sm" />
              </div>
            </div>
            <div className="text-left text-[10px] font-mono leading-tight">
              <span className="font-bold text-[#171513] flex items-center gap-1.5 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A85D55]" strokeWidth={2.5} /> Verified ID
              </span>
              <span className="text-[#6B5140] block">{certificateId}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
