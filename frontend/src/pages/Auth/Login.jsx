import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
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

/* ── Ink Pen SVG ─────────────────────────────────────── */
const PenNib = () => (
  <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
    <rect x="20" y="0" width="20" height="60" rx="10" fill="#302B27" />
    <polygon points="15,55 30,105 45,55" fill="#B49A68" />
    <polygon points="20,55 30,95 40,55" fill="#8E7360" />
    <line x1="30" y1="95" x2="30" y2="115" stroke="#171513" strokeWidth="1.5" />
    <circle cx="30" cy="117" r="3" fill="#171513" />
  </svg>
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail) e.email = 'Please enter your email address'
    else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) e.email = 'Please enter a valid email address'
    if (!password) e.password = 'Please enter your password'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    
    const normalizedEmail = email.trim().toLowerCase()
    setLoading(true)
    
    try {
      const res = await axios.post('/api/auth/login', { email: normalizedEmail, password })
      login(res.data, res.data.token)
      toast.success(`Welcome back, ${res.data.name}!`)
      if (res.data.onboardingComplete) navigate('/dashboard')
      else navigate('/onboarding')
    } catch (err) {
      // Demo fallback bypass
      if (
        (import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_AUTH === 'true') &&
        normalizedEmail === 'demo@callilab.local' &&
        password === 'Demo@1234'
      ) {
        // Create mock demo session
        const demoUser = {
          _id: 'demo-12345',
          name: 'Lakshitha',
          email: 'demo@callilab.local',
          role: 'learner',
          level: 'Intermediate',
          skillScore: 83,
          streak: 12,
          onboardingComplete: true,
          avatar: '',
          xp: 1250,
          dailyPracticeTarget: 15
        }
        // Since we bypass the backend, we create a fake JWT-like token structure
        // that the AuthContext can store in localStorage to maintain the session
        const demoToken = 'demo-bypass-token.eyJkZW1vIjoidHJ1ZSJ9.signature'
        login(demoUser, demoToken)
        toast.success('Entering the studio...')
        setTimeout(() => navigate('/dashboard'), 800)
        return
      }

      if (!err.response) {
        setErrors({ global: 'Unable to connect to the server. Please check your connection and try again.' })
      } else if (err.response.status === 401 || err.response.status === 403) {
        setErrors({ global: 'Invalid email or password' })
      } else if (err.response.status === 404) {
        setErrors({ global: 'Login service not found' })
      } else if (err.response.status >= 500) {
        setErrors({ global: 'Server error. Please try again.' })
      } else {
        setErrors({ global: err.response.data?.message || 'Invalid email or password' })
      }
    } finally {
      setLoading(false)
    }
  }

  const quickFill = (role) => {
    const map = {
      learner: ['learner@calliverse.com', 'calliverse123'],
      mentor:  ['mentor@calliverse.com',  'calliverse123'],
      admin:   ['admin@calliverse.com',   'calliverse123'],
    }
    setEmail(map[role][0]); setPassword(map[role][1]); setErrors({})
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

        {/* Botanical decorations */}
        <BotanicalLeft />
        <BotanicalRight />

        {/* Watercolor wash blobs */}
        <div style={{ position:'absolute', top:'20%', right:'10%', width:200, height:200, background:'radial-gradient(circle, rgba(168,93,85,0.12) 0%, transparent 70%)', borderRadius:'50%', filter:'blur(40px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'25%', left:'15%', width:160, height:160, background:'radial-gradient(circle, rgba(180,154,104,0.10) 0%, transparent 70%)', borderRadius:'50%', filter:'blur(30px)', pointerEvents:'none' }} />

        {/* Logo top */}
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

        {/* Center artwork */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', zIndex:2 }}>

          {/* Pen illustration */}
          <div style={{ marginBottom: 8 }}><PenNib /></div>

          {/* Ink drop */}
          <svg width="8" height="16" viewBox="0 0 8 16" style={{ marginBottom: 12 }}>
            <path d="M 4,0 Q 8,6 4,14 Q 0,6 4,0" fill="#171513" opacity="0.7" />
          </svg>

          {/* Slant guides */}
          <div style={{
            width: 260, height: 140, position: 'relative', marginBottom: 4,
            backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 28px, rgba(107,81,64,0.15) 28px, rgba(107,81,64,0.15) 29px)',
            borderBottom: '2px solid rgba(23,21,19,0.3)',
          }}>
            {/* Guide lines */}
            <div style={{ position:'absolute', bottom:36, left:0, right:0, height:1, background:'rgba(107,81,64,0.25)', borderTop:'1px dashed rgba(168,93,85,0.4)' }} />
            <div style={{ position:'absolute', bottom:72, left:0, right:0, height:1, borderTop:'1px dashed rgba(107,81,64,0.18)' }} />

            {/* The big calligraphy letter */}
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:'var(--font-script)', fontSize:110, color:'var(--ink)', lineHeight:1, opacity:0.88 }}>
                Create
              </span>
            </div>
          </div>

          {/* Caption */}
          <p style={{ fontFamily:'var(--font-serif)', fontSize:14, fontStyle:'italic', color:'var(--brown)', marginTop:12, textAlign:'center' }}>
            "Every stroke tells a story."
          </p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:11.5, color:'var(--brown-light)', textAlign:'center', maxWidth:220, marginTop:8, lineHeight:1.6 }}>
            A quiet space to learn, practice,<br />and master the art of calligraphy.
          </p>
        </div>

        {/* Bottom editorial label */}
        <div style={{ display:'flex', alignItems:'center', gap:12, position:'relative', zIndex:2 }}>
          <span style={{ width:32, height:1, background:'var(--bdr-medium)' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--brown)' }}>
            01 — Calligraphy Studio
          </span>
        </div>
      </div>

      {/* ── RIGHT — Login Form ───────────────────────────── */}
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

          {/* Eyebrow */}
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--terracotta)', fontWeight:700 }}>
              Welcome Back
            </span>
          </div>

          {/* Heading */}
          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:34, fontWeight:500, color:'var(--ink)', lineHeight:1.1, marginBottom:8 }}>
            Continue your<br />creative journey.
          </h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--brown)', marginBottom:32, lineHeight:1.6 }}>
            Sign in to continue your calligraphy practice.
          </p>

          {/* Global error */}
          {errors.global && (
            <div style={{ padding:'10px 14px', background:'var(--terracotta-lt)', border:'1px solid var(--terracotta-bdr)', borderRadius:10, marginBottom:20, fontSize:12.5, color:'var(--burgundy)', fontFamily:'var(--font-body)' }}>
              {errors.global}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display:'flex', flexDirection:'column', gap:18 }}>

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
              {errors.email && <p style={{ fontSize:11.5, color:'var(--terracotta)', marginTop:5, fontFamily:'var(--font-body)' }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                <label className="form-label" style={{ margin:0 }}>Password</label>
                <Link to="/login" style={{ fontSize:11.5, color:'var(--terracotta)', fontFamily:'var(--font-body)', textDecoration:'none', fontWeight:500 }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position:'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
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
              {errors.password && <p style={{ fontSize:11.5, color:'var(--terracotta)', marginTop:5, fontFamily:'var(--font-body)' }}>{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-ink"
              style={{ width:'100%', padding:'13px 24px', marginTop:4, fontSize:13, borderRadius:10 }}
            >
              {loading ? (
                <>
                  <Loader2 size={15} style={{ animation:'spinInk 0.8s linear infinite' }} />
                  Signing In...
                </>
              ) : (
                <>Sign In <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:12, margin:'24px 0' }}>
            <div style={{ flex:1, height:1, background:'var(--bdr-subtle)' }} />
            <span style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--brown-subtle)', letterSpacing:'0.1em', textTransform:'uppercase' }}>or</span>
            <div style={{ flex:1, height:1, background:'var(--bdr-subtle)' }} />
          </div>

          {/* Demo Access */}
          <div style={{ marginBottom:24 }}>
            <p style={{ fontSize:10, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.16em', color:'var(--brown-subtle)', textAlign:'center', marginBottom:10 }}>
              Demo Studio Access
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
              {[
                { role:'learner', label:'Learner', color:'var(--ink)' },
                { role:'mentor',  label:'Mentor',  color:'var(--terracotta)' },
                { role:'admin',   label:'Admin',   color:'var(--burgundy)' },
              ].map(d => (
                <button
                  key={d.role}
                  type="button"
                  onClick={() => quickFill(d.role)}
                  style={{
                    padding:'8px', borderRadius:8, background:'white',
                    border:'1.5px solid var(--bdr-soft)',
                    fontSize:11.5, fontFamily:'var(--font-body)', fontWeight:600,
                    color: d.color, cursor:'pointer', transition:'all 0.18s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = d.color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bdr-soft)'}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Signup link */}
          <p style={{ textAlign:'center', fontSize:13, fontFamily:'var(--font-body)', color:'var(--brown)' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color:'var(--terracotta)', fontWeight:700, textDecoration:'none' }}>
              Create an Account →
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
