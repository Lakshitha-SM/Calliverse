import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  ArrowRight, 
  ArrowLeft, 
  Feather,
  Paintbrush,
  PenTool,
  Loader2
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

/* ── Botanical SVG Decoration ─────────────────────────── */
const BotanicalLeft = () => (
  <svg width="220" height="320" viewBox="0 0 220 320" fill="none" style={{ position: 'absolute', left: 0, top: 0, opacity: 0.75 }}>
    <ellipse cx="40" cy="80" rx="28" ry="14" fill="#A85D55" opacity=".35" transform="rotate(-40 40 80)" />
    <ellipse cx="70" cy="55" rx="22" ry="11" fill="#6B5140" opacity=".3" transform="rotate(-55 70 55)" />
    <ellipse cx="25" cy="130" rx="20" ry="9" fill="#C98E84" opacity=".4" transform="rotate(-30 25 130)" />
    <ellipse cx="55" cy="110" rx="16" ry="8" fill="#B49A68" opacity=".3" transform="rotate(-50 55 110)" />
    <path d="M 50,160 Q 30,120 60,90 Q 90,60 80,30" stroke="#6B5140" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".5" />
    <circle cx="38" cy="155" r="4" fill="#A85D55" opacity=".5" />
    <circle cx="42" cy="145" r="3" fill="#A85D55" opacity=".4" />
    <circle cx="32" cy="160" r="3" fill="#A85D55" opacity=".35" />
    <ellipse cx="90" cy="140" rx="18" ry="9" fill="#A85D55" opacity=".2" transform="rotate(-60 90 140)" />
    <ellipse cx="15" cy="185" rx="22" ry="10" fill="#6B5140" opacity=".25" transform="rotate(-20 15 185)" />
    <circle cx="95" cy="65" r="3.5" fill="#171513" opacity=".15" />
    <circle cx="75" cy="170" r="2.5" fill="#171513" opacity=".1" />
  </svg>
)

const BotanicalRight = () => (
  <svg width="200" height="280" viewBox="0 0 200 280" fill="none" style={{ position: 'absolute', right: 0, bottom: 0, opacity: 0.7 }}>
    <ellipse cx="160" cy="200" rx="30" ry="13" fill="#A85D55" opacity=".3" transform="rotate(30 160 200)" />
    <ellipse cx="130" cy="230" rx="24" ry="11" fill="#6B5140" opacity=".28" transform="rotate(15 130 230)" />
    <ellipse cx="175" cy="160" rx="20" ry="9" fill="#C98E84" opacity=".35" transform="rotate(40 175 160)" />
    <path d="M 140,130 Q 170,160 150,200 Q 130,240 160,270" stroke="#6B5140" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".4" />
    <circle cx="110" cy="250" r="4.5" fill="#A85D55" opacity=".45" />
    <circle cx="120" cy="240" r="3" fill="#A85D55" opacity=".35" />
    <ellipse cx="105" cy="195" rx="16" ry="8" fill="#B49A68" opacity=".25" transform="rotate(50 105 195)" />
    <circle cx="185" cy="135" r="3" fill="#171513" opacity=".12" />
  </svg>
)

const PenNib = () => (
  <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
    <rect x="20" y="0" width="20" height="60" rx="10" fill="#302B27" />
    <polygon points="15,55 30,105 45,55" fill="#B49A68" />
    <polygon points="20,55 30,95 40,55" fill="#8E7360" />
    <line x1="30" y1="95" x2="30" y2="115" stroke="#171513" strokeWidth="1.5" />
    <circle cx="30" cy="117" r="3" fill="#171513" />
  </svg>
)

export default function Onboarding() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)

  const [skillLevel, setSkillLevel] = useState('beginner')
  const [preferredStyles, setPreferredStyles] = useState(['modern'])
  const [dailyPracticeTarget, setDailyPracticeTarget] = useState(15)

  const skillOptions = [
    { id: 'beginner', label: 'Beginner', desc: 'Starting from scratch with pen grip & basic strokes', icon: PenTool },
    { id: 'intermediate', label: 'Intermediate', desc: 'Familiar with letterforms, refining slant & rhythm', icon: Paintbrush },
    { id: 'advanced', label: 'Advanced', desc: 'Mastering flourishes, composition, and personal style', icon: Feather },
  ]

  const styleOptions = [
    { id: 'modern', label: 'Modern', script: 'Modern', desc: 'Contemporary loose cursive' },
    { id: 'brush', label: 'Brush', script: 'Brush', desc: 'Dynamic flexible bounce script' },
    { id: 'gothic', label: 'Gothic', script: 'Gothic', desc: 'Dramatic blackletter precision' },
    { id: 'flourishing', label: 'Flourishing', script: 'Grace', desc: 'Expansive entrance & exit loops' },
  ]

  const toggleStyle = (id) => {
    if (preferredStyles.includes(id)) {
      if (preferredStyles.length > 1) setPreferredStyles(preferredStyles.filter(s => s !== id))
    } else {
      setPreferredStyles([...preferredStyles, id])
    }
  }

  const handleComplete = async () => {
    setSaving(true)
    try {
      const payload = { skillLevel, preferredStyles, dailyPracticeTarget, onboardingComplete: true }
      const res = await axios.put('/api/users/onboarding', payload)
      if (res.data) updateUser(res.data)
      toast.success('Your personalized calligraphy studio is ready!')
      navigate('/dashboard')
    } catch {
      updateUser({ skillLevel, preferredStyles, dailyPracticeTarget, onboardingComplete: true })
      toast.success('Welcome to CalliLab!')
      navigate('/dashboard')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--paper)', overflow: 'hidden' }}>

      {/* ── LEFT — Artistic Brand Panel ─────────────────── */}
      <div style={{
        flex: '0 0 45%',
        background: 'linear-gradient(160deg, #FAF6EF 0%, #F0E8DA 50%, #E8DCCB 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 48px',
        overflow: 'hidden',
      }} className="hide-mobile">

        <BotanicalLeft />
        <BotanicalRight />

        <div style={{ position:'absolute', top:'20%', right:'10%', width:200, height:200, background:'radial-gradient(circle, rgba(168,93,85,0.12) 0%, transparent 70%)', borderRadius:'50%', filter:'blur(40px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'25%', left:'15%', width:160, height:160, background:'radial-gradient(circle, rgba(180,154,104,0.10) 0%, transparent 70%)', borderRadius:'50%', filter:'blur(30px)', pointerEvents:'none' }} />

        <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10, position:'relative', zIndex:2 }}>
          <div style={{ width:36, height:36, borderRadius:'50%', background:'var(--ink)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#F6F0E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:18, height:18, transform:'rotate(-45deg)' }}>
              <path d="M12 2L4 14l3 3 8-8 1-3-4-4z" />
              <path d="M4 14l4 4" />
            </svg>
          </div>
          <div>
            <span style={{ fontFamily:'var(--font-serif)', fontSize:20, fontWeight:600, color:'var(--ink)', letterSpacing:'-0.01em' }}>
              Calli<span style={{ fontFamily:'var(--font-script)', fontSize:24, color:'var(--terracotta)' }}>Lab</span>
            </span>
            <div style={{ fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--brown)', fontFamily:'var(--font-mono)', marginTop:-2 }}>Artisan Studio</div>
          </div>
        </Link>

        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', zIndex:2 }}>
          <div style={{ marginBottom: 8 }}><PenNib /></div>
          <svg width="8" height="16" viewBox="0 0 8 16" style={{ marginBottom: 12 }}>
            <path d="M 4,0 Q 8,6 4,14 Q 0,6 4,0" fill="#171513" opacity="0.7" />
          </svg>

          <div style={{
            width: 300, height: 160, position: 'relative', marginBottom: 4,
            backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 28px, rgba(107,81,64,0.15) 28px, rgba(107,81,64,0.15) 29px)',
            borderBottom: '2px solid rgba(23,21,19,0.3)',
          }}>
            <div style={{ position:'absolute', bottom:42, left:0, right:0, height:1, background:'rgba(107,81,64,0.25)', borderTop:'1px dashed rgba(168,93,85,0.4)' }} />
            <div style={{ position:'absolute', bottom:84, left:0, right:0, height:1, borderTop:'1px dashed rgba(107,81,64,0.18)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', paddingTop:20 }}>
              <span style={{ fontFamily:'var(--font-script)', fontSize:60, color:'var(--ink)', lineHeight:0.9, opacity:0.88 }}>
                Let's begin your<br/>creative journey
              </span>
            </div>
          </div>

          <p style={{ fontFamily:'var(--font-body)', fontSize:11.5, color:'var(--brown-light)', textAlign:'center', maxWidth:260, marginTop:16, lineHeight:1.6 }}>
            Tell us a little about your experience to craft your bespoke daily exercises, stroke guidelines, and AI review thresholds.
          </p>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:12, position:'relative', zIndex:2 }}>
          <span style={{ width:32, height:1, background:'var(--bdr-medium)' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--brown)' }}>
            03 — Setup Profile
          </span>
        </div>
      </div>

      {/* ── RIGHT — Onboarding Form ───────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 32px',
        background: 'var(--paper)',
        overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: 480, animation: 'fadeUp 0.6s ease forwards' }}>

          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom: 24 }}>
            <span style={{ width:40, height:3, borderRadius:4, background: step >= 1 ? 'var(--ink)' : 'var(--paper-aged)', transition:'background 0.3s' }} />
            <span style={{ width:40, height:3, borderRadius:4, background: step >= 2 ? 'var(--ink)' : 'var(--paper-aged)', transition:'background 0.3s' }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--brown)', marginLeft:8 }}>
              Step {step} of 2
            </span>
          </div>

          {step === 1 && (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              <h1 style={{ fontFamily:'var(--font-serif)', fontSize:30, fontWeight:500, color:'var(--ink)', lineHeight:1.2, marginBottom:8 }}>
                What is your current skill level?
              </h1>
              <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--brown)', marginBottom:32, lineHeight:1.6 }}>
                Select the level that best reflects your current comfort with pointed pen or brush lettering.
              </p>

              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {skillOptions.map((opt) => {
                  const Icon = opt.icon
                  const active = skillLevel === opt.id
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSkillLevel(opt.id)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: 12,
                        border: '1.5px solid',
                        borderColor: active ? 'var(--ink)' : 'var(--bdr-soft)',
                        background: active ? 'var(--paper-light)' : 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        transition: 'all 0.2s',
                        boxShadow: active ? '0 4px 12px rgba(23,21,19,0.06)' : 'none'
                      }}
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: active ? 'var(--ink)' : 'var(--paper-cream)',
                        color: active ? 'white' : 'var(--brown)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily:'var(--font-serif)', fontSize:18, fontWeight:600, color:'var(--ink)', marginBottom:2 }}>
                          {opt.label}
                        </h3>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:11.5, color:'var(--brown)', lineHeight:1.4 }}>
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              <h1 style={{ fontFamily:'var(--font-serif)', fontSize:30, fontWeight:500, color:'var(--ink)', lineHeight:1.2, marginBottom:8 }}>
                Which style interests you?
              </h1>
              <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--brown)', marginBottom:32, lineHeight:1.6 }}>
                Choose one or more styles you want to master.
              </p>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12, marginBottom:32 }}>
                {styleOptions.map((st) => {
                  const active = preferredStyles.includes(st.id)
                  return (
                    <div
                      key={st.id}
                      onClick={() => toggleStyle(st.id)}
                      style={{
                        padding: '24px 16px 16px',
                        borderRadius: 12,
                        border: '1.5px solid',
                        borderColor: active ? 'var(--terracotta)' : 'var(--bdr-soft)',
                        background: active ? 'var(--terracotta-lt)' : 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                        aspectRatio: '4/3'
                      }}
                    >
                      <span style={{ fontFamily:'var(--font-script)', fontSize:40, color:'var(--ink)', flex:1, display:'flex', alignItems:'center' }}>
                        {st.script}
                      </span>
                      <div style={{ marginTop: 'auto' }}>
                        <h4 style={{ fontFamily:'var(--font-serif)', fontSize:16, fontWeight:600, color:'var(--ink)', marginBottom:2 }}>
                          {st.label}
                        </h4>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:10, color: active ? 'var(--terracotta)' : 'var(--brown)', lineHeight:1.3 }}>
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                  <span style={{ fontFamily:'var(--font-serif)', fontSize:14, fontWeight:600, color:'var(--ink)' }}>Daily Practice Target:</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:11, fontWeight:600, color:'var(--terracotta)' }}>{dailyPracticeTarget} Min / Day</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="45"
                  step="5"
                  value={dailyPracticeTarget}
                  onChange={(e) => setDailyPracticeTarget(Number(e.target.value))}
                  style={{ width:'100%', accentColor:'var(--terracotta)', cursor:'pointer' }}
                />
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, fontSize:9, fontFamily:'var(--font-mono)', textTransform:'uppercase', color:'var(--brown-subtle)' }}>
                  <span>10 mins (Quick)</span>
                  <span>45 mins (Mastery)</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 48, paddingTop:24, borderTop:'1px solid var(--bdr-subtle)' }}>
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-outline"
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : <div />}

            {step === 1 ? (
              <button
                onClick={() => setStep(2)}
                className="btn-terracotta"
              >
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={saving}
                className="btn-terracotta"
              >
                {saving ? <><Loader2 size={14} className="animate-spin" /> Setting Up...</> : <>Enter Studio <ArrowRight size={14} /></>}
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin { animation: spinInk 1s linear infinite; }
        @keyframes spinInk { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
