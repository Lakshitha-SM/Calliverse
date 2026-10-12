import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff, ArrowRight, Loader2, CheckCircle2, Circle } from 'lucide-react'
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
    {/* ink blots */}
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

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  
  const { login } = useAuth()
  const navigate = useNavigate()

  // Validate requirements
  const hasLength = password.length >= 8
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasNum = /[0-9]/.test(password)
  
  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = 'Please enter your full name'
    
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail) e.email = 'Please enter your email address'
    else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) e.email = 'Please enter a valid email address'
    
    if (!password) e.password = 'Please enter a password'
    else if (!(hasLength && hasUpper && hasLower && hasNum)) e.password = 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.'
    
    if (!confirmPassword) e.confirmPassword = 'Confirm your password'
    else if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match'
    
    if (!agreeTerms) e.terms = 'Please accept the Terms & Privacy Policy to continue.'
    
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/register', { name: name.trim(), email: email.trim().toLowerCase(), password, role: 'learner' })
      login(res.data, res.data.token)
      toast.success(`Welcome to CalliLab, ${name.trim()}!`)
      navigate('/onboarding')
    } catch (err) {
      if (!err.response) {
        setErrors({ global: 'Unable to connect to the server. Please check your connection and try again.' })
      } else {
        const msg = err.response.data?.message;
        if (msg === 'Email already registered') {
          setErrors({ email: 'This email is already registered. Please log in instead.' })
        } else {
          setErrors({ global: msg || 'Unable to create your account right now. Please try again.' })
        }
      }
    } finally {
      setLoading(false)
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
            width: 260, height: 140, position: 'relative', marginBottom: 4,
            backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 28px, rgba(107,81,64,0.15) 28px, rgba(107,81,64,0.15) 29px)',
            borderBottom: '2px solid rgba(23,21,19,0.3)',
          }}>
            <div style={{ position:'absolute', bottom:36, left:0, right:0, height:1, background:'rgba(107,81,64,0.25)', borderTop:'1px dashed rgba(168,93,85,0.4)' }} />
            <div style={{ position:'absolute', bottom:72, left:0, right:0, height:1, borderTop:'1px dashed rgba(107,81,64,0.18)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:'var(--font-script)', fontSize:100, color:'var(--ink)', lineHeight:1, opacity:0.88 }}>
                Journey
              </span>
            </div>
          </div>

          <p style={{ fontFamily:'var(--font-serif)', fontSize:14, fontStyle:'italic', color:'var(--brown)', marginTop:12, textAlign:'center' }}>
            "The beginning of a beautiful mastery."
          </p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:11.5, color:'var(--brown-light)', textAlign:'center', maxWidth:220, marginTop:8, lineHeight:1.6 }}>
            Join our artisan community to perfect your strokes and discover your style.
          </p>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:12, position:'relative', zIndex:2 }}>
          <span style={{ width:32, height:1, background:'var(--bdr-medium)' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--brown)' }}>
            02 — Join CalliLab
          </span>
        </div>
      </div>

      {/* ── RIGHT — Sign Up Form ───────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 32px',
        background: 'var(--paper)',
        overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: 400, animation: 'fadeUp 0.6s ease forwards' }}>

          <div style={{ marginBottom: 8 }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--terracotta)', fontWeight:700 }}>
              New Artist
            </span>
          </div>

          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:34, fontWeight:500, color:'var(--ink)', lineHeight:1.1, marginBottom:8 }}>
            Begin your<br />creative journey.
          </h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--brown)', marginBottom:32, lineHeight:1.6 }}>
            Create an account to track your progress and access the practice lab.
          </p>

          {errors.global && (
            <div style={{ padding:'10px 14px', background:'var(--terracotta-lt)', border:'1px solid var(--terracotta-bdr)', borderRadius:10, marginBottom:20, fontSize:12.5, color:'var(--burgundy)', fontFamily:'var(--font-body)' }}>
              {errors.global}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Name */}
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                autoComplete="name"
                placeholder="First Last"
                value={name}
                onChange={e => { setName(e.target.value); setErrors(p => ({...p, name:null, global:null})) }}
                className="input-paper"
                style={{ borderColor: errors.name ? 'var(--terracotta)' : undefined }}
              />
              {errors.name && <p style={{ fontSize:11.5, color:'var(--terracotta)', marginTop:4, fontFamily:'var(--font-body)' }}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="artist@callilab.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email:null, global:null})) }}
                className="input-paper"
                style={{ borderColor: errors.email ? 'var(--terracotta)' : undefined }}
              />
              {errors.email && <p style={{ fontSize:11.5, color:'var(--terracotta)', marginTop:4, fontFamily:'var(--font-body)' }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <div style={{ position:'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password:null, global:null})) }}
                  className="input-paper"
                  style={{ paddingRight: 44, borderColor: errors.password ? 'var(--terracotta)' : undefined }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--brown-light)', padding:2 }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {/* Validation hints */}
              <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                {[
                  { label: '8+ chars', ok: hasLength },
                  { label: 'Uppercase', ok: hasUpper },
                  { label: 'Lowercase', ok: hasLower },
                  { label: 'Number', ok: hasNum },
                ].map((req, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: req.ok ? 'var(--terracotta)' : 'var(--brown-light)', fontFamily: 'var(--font-body)' }}>
                    {req.ok ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                    {req.label}
                  </div>
                ))}
              </div>
              {errors.password && <p style={{ fontSize:11.5, color:'var(--terracotta)', marginTop:4, fontFamily:'var(--font-body)' }}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="form-label">Confirm Password</label>
              <input
                type={showPw ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({...p, confirmPassword:null, global:null})) }}
                className="input-paper"
                style={{ borderColor: errors.confirmPassword ? 'var(--terracotta)' : undefined }}
              />
              {errors.confirmPassword && <p style={{ fontSize:11.5, color:'var(--terracotta)', marginTop:4, fontFamily:'var(--font-body)' }}>{errors.confirmPassword}</p>}
            </div>

            {/* Checkbox */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 4, cursor: 'pointer' }}>
              <div style={{ position: 'relative', marginTop: 2 }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={e => { setAgreeTerms(e.target.checked); setErrors(p => ({...p, terms:null})) }}
                  style={{ opacity: 0, position: 'absolute' }}
                />
                <div style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid', borderColor: agreeTerms ? 'var(--ink)' : 'var(--bdr-medium)', background: agreeTerms ? 'var(--ink)' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  {agreeTerms && <CheckCircle2 size={12} color="white" />}
                </div>
              </div>
              <span style={{ fontSize: 12, color: 'var(--brown)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                I agree to the Terms & Privacy Policy.
              </span>
            </label>
            {errors.terms && <p style={{ fontSize:11.5, color:'var(--terracotta)', marginTop:-10, fontFamily:'var(--font-body)' }}>{errors.terms}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-ink"
              style={{ width:'100%', padding:'13px 24px', marginTop:8, fontSize:13, borderRadius:10 }}
            >
              {loading ? (
                <>
                  <Loader2 size={15} style={{ animation:'spinInk 0.8s linear infinite' }} />
                  Creating Account...
                </>
              ) : (
                <>Create Account <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          {/* Signup link */}
          <p style={{ textAlign:'center', fontSize:13, fontFamily:'var(--font-body)', color:'var(--brown)', marginTop:32 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color:'var(--terracotta)', fontWeight:700, textDecoration:'none' }}>
              Sign In →
            </Link>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinInk { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
