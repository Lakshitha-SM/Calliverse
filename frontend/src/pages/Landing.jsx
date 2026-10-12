import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronRight, CheckCircle2, Star } from 'lucide-react'
import CalliLogo from '../components/common/CalliLogo'

export default function Landing() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [activeStroke, setActiveStroke] = useState('a')
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    // Trigger hero entrance animation
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(t) }
  }, [])

  const strokes = ['a', 'g', 's', 'm']

  const stats = [
    { val: '10K+', label: 'Learners' },
    { val: '500+', label: 'Lessons' },
    { val: '100+', label: 'Challenges' },
    { val: '4.8 ★', label: 'Community Rating' },
  ]

  const pathways = [
    {
      level: 'Beginner',
      tagline: 'Build Your Basics',
      desc: 'Master nib pressure, hairline upstrokes, and foundational oval forms.',
      lessons: '12 Lessons',
      progress: 60,
      status: 'Continue →',
      accent: '#6B5140',
      img: '/course-beginner.jpg',
    },
    {
      level: 'Intermediate',
      tagline: 'Find Your Flow',
      desc: 'Connect letterforms into rhythmic words with slant precision.',
      lessons: '15 Lessons',
      progress: 84,
      status: 'Start →',
      accent: '#A85D55',
      img: null,
    },
    {
      level: 'Advanced',
      tagline: 'Create Your Style',
      desc: 'Flourishing, ascending loops, and bespoke monogram composition.',
      lessons: '8 Lessons',
      progress: 0,
      status: 'Start →',
      accent: '#642F35',
      img: null,
    },
  ]

  const gallery = [
    { title: 'Good Things\ntake Time', author: 'Ananya', rating: '4.9' },
    { title: 'Bloom', author: 'Riya', rating: '4.8' },
    { title: 'Create', author: 'Karthik', rating: '5.0' },
    { title: 'Stay\nPositive', author: 'Lakshitha', rating: '4.9' },
    { title: 'Dream', author: 'Harini', rating: '4.7' },
    { title: 'Be\nKind', author: 'Meena', rating: '4.8' },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#F6F0E6', color: '#171513' }}>

      {/* ──────────────────────── NAVBAR ──────────────────────────── */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(246, 240, 230, 0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(107,81,64,0.12)' : 'none',
          padding: scrolled ? '12px 0' : '20px 0',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <CalliLogo size="md" to="/" />

          {/* Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Learn', to: '/courses' },
              { label: 'Practice', to: '/practice' },
              { label: 'Challenges', to: '/challenges' },
              { label: 'Gallery', to: '/community' },
              { label: 'About', to: '#about' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                style={{
                  fontSize: 13, fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 500, color: '#6B5140', textDecoration: 'none',
                  transition: 'color 0.2s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => e.target.style.color = '#171513'}
                onMouseLeave={e => e.target.style.color = '#6B5140'}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link
              to="/login"
              style={{
                fontSize: 13, fontWeight: 600, color: '#171513',
                padding: '8px 20px', borderRadius: 9999,
                border: '1.5px solid rgba(23,21,19,0.25)',
                textDecoration: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.2s',
                letterSpacing: '0.03em',
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              style={{
                fontSize: 13, fontWeight: 600, color: '#FAF6F0',
                padding: '8px 20px', borderRadius: 9999,
                background: '#171513',
                border: '1.5px solid #171513',
                textDecoration: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.2s',
                letterSpacing: '0.03em',
              }}
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* ──────────────────────── HERO ────────────────────────────── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 88,
          paddingBottom: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Watercolor background blobs matching the reference */}
        <div style={{
          position: 'absolute', top: '5%', left: '-5%',
          width: 420, height: 420,
          background: 'radial-gradient(circle, rgba(168,93,85,0.12) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '15%',
          width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(180,154,104,0.10) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(30px)', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

          {/* ── LEFT: Typography & CTAs ── */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Eyebrow Label */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', background: '#A85D55',
                animation: 'pulse 2s infinite',
              }} />
              <span style={{
                fontSize: 11, fontFamily: 'ui-monospace, monospace',
                letterSpacing: '0.18em', fontWeight: 700, color: '#6B5140',
                textTransform: 'uppercase',
              }}>
                Intelligent Calligraphy Studio
              </span>
            </div>

            {/* Main Headline — matching reference exactly */}
            <div style={{ marginBottom: 8 }}>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(46px, 5.5vw, 72px)',
                fontWeight: 400,
                color: '#171513',
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                Learn the Art.
              </h1>
              <h2 style={{
                fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                fontSize: 'clamp(52px, 6.2vw, 80px)',
                fontWeight: 400,
                color: '#A85D55',
                lineHeight: 1.08,
                letterSpacing: '0.01em',
                margin: 0,
                marginTop: -4,
              }}>
                Master the Stroke.
              </h2>
            </div>

            {/* Ink flourish SVG line */}
            <div style={{ margin: '16px 0 20px' }}>
              <svg width={220} height={22} viewBox="0 0 220 22" fill="none">
                <path
                  d="M 4,14 C 40,4 80,20 120,11 C 150,5 180,18 216,8"
                  stroke="#A85D55" strokeWidth="1.8" strokeLinecap="round"
                  fill="none"
                  style={{ animation: 'inkDraw 2s ease forwards' }}
                  className="animate-ink-draw"
                />
              </svg>
            </div>

            {/* Subtext */}
            <p style={{
              fontSize: 15, color: '#6B5140', fontFamily: 'Plus Jakarta Sans, sans-serif',
              lineHeight: 1.7, maxWidth: 420, marginBottom: 36, fontWeight: 400,
            }}>
              A personalized calligraphy learning platform with<br />
              AI-powered feedback.
            </p>

            {/* CTA Buttons — matching reference layout */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/practice"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#171513', color: '#FAF6F0',
                  fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
                  padding: '12px 28px', borderRadius: 9999,
                  border: '1.5px solid #171513',
                  textDecoration: 'none',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 14px rgba(23,21,19,0.18)',
                  transition: 'all 0.25s',
                }}
              >
                Get Started →
              </Link>
              <Link
                to="/courses"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent', color: '#171513',
                  fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
                  padding: '12px 24px', borderRadius: 9999,
                  border: '1.5px solid rgba(23,21,19,0.28)',
                  textDecoration: 'none',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s',
                }}
              >
                Explore the Studio
              </Link>
            </div>

            {/* Stats ribbon */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24, marginTop: 52,
              paddingTop: 36, borderTop: '1px solid rgba(107,81,64,0.15)',
            }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 28, fontWeight: 500, color: '#171513',
                    margin: '0 0 4px', lineHeight: 1,
                  }}>
                    {s.val}
                  </p>
                  <p style={{
                    fontSize: 10, fontFamily: 'Plus Jakarta Sans, sans-serif',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    color: '#6B5140', fontWeight: 500, margin: 0,
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Calligraphy Practice Sheet Artwork ── */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              position: 'relative',
            }}
          >
            {/* Main artwork card — resembles the reference right panel exactly */}
            <div style={{
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              background: '#FAF6F0',
              border: '1px solid rgba(107,81,64,0.18)',
              boxShadow: '0 20px 60px -8px rgba(48,43,39,0.14), 0 8px 20px -4px rgba(48,43,39,0.06)',
              aspectRatio: '4/5',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Background botanical image */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(/botanical-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.25,
              }} />

              {/* Slant guide lines overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 36px, rgba(168,93,85,0.14) 36px, rgba(168,93,85,0.14) 37px)',
                pointerEvents: 'none',
              }} />

              {/* Horizontal guide lines (baseline/x-height) */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {[38, 50, 58, 70, 78, 90].map(pct => (
                  <div key={pct} style={{
                    position: 'absolute', left: 0, right: 0,
                    top: `${pct}%`,
                    height: 1,
                    background: pct === 58 ? 'rgba(23,21,19,0.35)' : 'rgba(107,81,64,0.18)',
                    borderStyle: pct === 50 ? 'dashed' : 'solid',
                  }} />
                ))}
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 28px 20px' }}>

                {/* Top label */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{
                    fontSize: 10, fontFamily: 'ui-monospace, monospace',
                    letterSpacing: '0.14em', color: '#6B5140', textTransform: 'uppercase',
                  }}>
                    Practice Sheet № 01
                  </span>
                  <span style={{
                    fontSize: 10, fontFamily: 'ui-monospace, monospace',
                    color: '#A85D55', fontWeight: 700, letterSpacing: '0.1em',
                  }}>
                    55° Slant
                  </span>
                </div>

                {/* Hero artwork image — contains pen + letter + botanicals */}
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="/hero-artwork.jpg"
                    alt="Calligraphy practice artwork"
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'contain',
                      position: 'absolute', inset: 0,
                    }}
                  />

                  {/* Active stroke indicator overlay — shown when switching letters */}
                  {activeStroke !== 'a' && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(250,246,240,0.75)',
                      backdropFilter: 'blur(2px)',
                    }}>
                      <span style={{
                        fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                        fontSize: 160, color: '#171513', lineHeight: 1,
                        opacity: 0.85,
                      }}>
                        {activeStroke}
                      </span>
                    </div>
                  )}
                </div>

                {/* Token switcher at bottom — matching reference */}
                <div style={{
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: '1px solid rgba(107,81,64,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', color: '#6B5140' }}>
                    Token:
                  </span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {strokes.map(s => (
                      <button
                        key={s}
                        onClick={() => setActiveStroke(s)}
                        style={{
                          width: 30, height: 30,
                          borderRadius: '50%',
                          border: '1.5px solid',
                          borderColor: activeStroke === s ? '#171513' : 'rgba(107,81,64,0.3)',
                          background: activeStroke === s ? '#171513' : 'white',
                          color: activeStroke === s ? '#FAF6F0' : '#6B5140',
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 15, fontWeight: 600, cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', color: '#A85D55', fontWeight: 700 }}>
                    Score: 92%
                  </span>
                </div>
              </div>
            </div>

            {/* Floating mini cards matching the reference */}
            <div style={{
              position: 'absolute', top: 24, left: -24,
              background: 'white', borderRadius: 14,
              border: '1px solid rgba(107,81,64,0.15)',
              padding: '12px 16px',
              boxShadow: '0 8px 24px rgba(48,43,39,0.10)',
              display: 'flex', flexDirection: 'column', gap: 4,
              minWidth: 100,
            }}>
              <span style={{ fontSize: 9, fontFamily: 'ui-monospace, monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A85D55', fontWeight: 700 }}>
                Stroke Score
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: '#171513', lineHeight: 1 }}>
                92<span style={{ fontSize: 14, color: '#6B5140' }}>%</span>
              </span>
            </div>

            <div style={{
              position: 'absolute', bottom: 32, right: -20,
              background: 'white', borderRadius: 14,
              border: '1px solid rgba(107,81,64,0.15)',
              padding: '12px 16px',
              boxShadow: '0 8px 24px rgba(48,43,39,0.10)',
              display: 'flex', flexDirection: 'column', gap: 4,
              minWidth: 110,
            }}>
              <span style={{ fontSize: 9, fontFamily: 'ui-monospace, monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6B5140', fontWeight: 700 }}>
                🔥 Current Streak
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: '#171513', lineHeight: 1 }}>
                12 Days
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ──────────── COURSE PATHWAYS ────────────────────────────── */}
      <section style={{
        background: '#FAF6F0',
        borderTop: '1px solid rgba(107,81,64,0.12)',
        borderBottom: '1px solid rgba(107,81,64,0.12)',
        padding: '80px 32px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{
              fontSize: 10, fontFamily: 'ui-monospace, monospace',
              letterSpacing: '0.2em', fontWeight: 700, color: '#A85D55',
              textTransform: 'uppercase', display: 'block', marginBottom: 12,
            }}>
              Structured Master Curriculum
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              fontSize: 'clamp(30px, 3.5vw, 44px)', fontWeight: 400,
              color: '#171513', margin: '0 0 8px', lineHeight: 1.15,
            }}>
              Learning Paths
            </h2>
            <p style={{ fontSize: 13, color: '#6B5140', fontFamily: 'Plus Jakarta Sans, sans-serif', margin: 0 }}>
              Structured modules to improve your calligraphy skills
            </p>
          </div>

          {/* Filter pills matching reference */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 40 }}>
            {['All', 'Beginner', 'Intermediate', 'Advanced', 'Modern'].map((f, i) => (
              <button key={f} style={{
                padding: '6px 16px', borderRadius: 9999,
                background: i === 0 ? '#171513' : 'transparent',
                color: i === 0 ? '#FAF6F0' : '#6B5140',
                border: i === 0 ? '1.5px solid #171513' : '1.5px solid rgba(107,81,64,0.2)',
                fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {f}
              </button>
            ))}
          </div>

          {/* Three course cards — matching reference composition */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {pathways.map((path, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: 20,
                  border: '1px solid rgba(107,81,64,0.14)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(48,43,39,0.06)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/courses')}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(48,43,39,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(48,43,39,0.06)' }}
              >
                {/* Card image area */}
                <div style={{
                  aspectRatio: '16/9', background: '#F6F0E6',
                  position: 'relative', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {path.img ? (
                    <img src={path.img} alt={path.tagline} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      background: idx === 1
                        ? 'linear-gradient(135deg, #F4E8E6 0%, #EFE5D5 100%)'
                        : 'linear-gradient(135deg, #EFE2E4 0%, #F6F0E6 100%)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                      position: 'relative',
                    }}>
                      {/* Decorative calligraphy sample in each card */}
                      <span style={{
                        fontFamily: "'Pinyon Script', cursive",
                        fontSize: 72, color: idx === 1 ? '#A85D55' : '#642F35', lineHeight: 1,
                        opacity: 0.7,
                      }}>
                        {idx === 1 ? 'flow' : 'style'}
                      </span>
                      {/* Botanical decoration SVG */}
                      <svg width={80} height={40} viewBox="0 0 80 40" style={{ position: 'absolute', bottom: 8, right: 8, opacity: 0.35 }}>
                        <path d="M 5,35 Q 20,10 40,20 Q 60,30 75,8" stroke={path.accent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        <ellipse cx={30} cy={25} rx={8} ry={4} fill={path.accent} opacity="0.4" transform="rotate(-25, 30, 25)" />
                        <ellipse cx={50} cy={18} rx={6} ry={3} fill={path.accent} opacity="0.4" transform="rotate(-20, 50, 18)" />
                      </svg>
                    </div>
                  )}
                  {/* Level badge */}
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    padding: '4px 10px', borderRadius: 9999,
                    background: 'white', border: '1px solid rgba(107,81,64,0.2)',
                    fontSize: 10, fontWeight: 700, fontFamily: 'ui-monospace, monospace',
                    color: path.accent, textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>
                    {path.level}
                  </div>
                </div>

                {/* Card content */}
                <div style={{ padding: 20 }}>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22, fontWeight: 500, color: '#171513',
                    margin: '0 0 8px', lineHeight: 1.2,
                  }}>
                    "{path.tagline}"
                  </h3>
                  <p style={{
                    fontSize: 12, color: '#6B5140', fontFamily: 'Plus Jakarta Sans, sans-serif',
                    lineHeight: 1.6, margin: '0 0 16px',
                  }}>
                    {path.desc}
                  </p>

                  {/* Progress bar */}
                  {path.progress > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', color: '#6B5140' }}>{path.lessons}</span>
                        <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', color: path.accent, fontWeight: 700 }}>{path.progress}%</span>
                      </div>
                      <div style={{ height: 5, background: '#EFE5D5', borderRadius: 9999, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', width: `${path.progress}%`,
                          background: `linear-gradient(90deg, ${path.accent}99, ${path.accent})`,
                          borderRadius: 9999, transition: 'width 1s ease',
                        }} />
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, fontFamily: 'ui-monospace, monospace', color: '#6B5140' }}>
                      {path.progress > 0 ? `${path.lessons} — ${path.progress}%` : path.lessons}
                    </span>
                    <Link
                      to="/courses"
                      style={{
                        fontSize: 12, color: path.accent, fontWeight: 600,
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
                      }}
                    >
                      {path.status}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Lessons row */}
          <div style={{ marginTop: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22, fontWeight: 400, color: '#171513', margin: 0,
              }}>
                Popular Lessons
              </h3>
              <Link to="/courses" style={{ fontSize: 12, color: '#A85D55', fontWeight: 600, textDecoration: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                View All →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { title: 'Letter Strokes', level: 'Beginner', script: 'a a a' },
                { title: 'Never Look Back', level: 'Intermediate', script: 'Never look' },
                { title: 'Lowercase Letters', level: 'Beginner', script: 'a b c' },
                { title: 'Brush Lettering', level: 'Advanced', script: 'Bloom' },
              ].map((l, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: 16,
                  border: '1px solid rgba(107,81,64,0.12)',
                  padding: 16, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(107,81,64,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(107,81,64,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{
                    height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#F6F0E6', borderRadius: 10, marginBottom: 12,
                    fontFamily: "'Pinyon Script', cursive",
                    fontSize: 28, color: '#171513',
                  }}>
                    {l.script}
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#171513', fontFamily: 'Plus Jakarta Sans, sans-serif', margin: '0 0 4px' }}>{l.title}</p>
                  <p style={{ fontSize: 10, color: '#6B5140', fontFamily: 'ui-monospace, monospace', margin: 0, letterSpacing: '0.08em' }}>{l.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── AI ASSESSMENT SECTION ─────────────────────── */}
      <section style={{ padding: '80px 32px', background: '#F6F0E6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

          {/* Left text */}
          <div>
            <span style={{
              fontSize: 10, fontFamily: 'ui-monospace, monospace',
              letterSpacing: '0.2em', fontWeight: 700, color: '#A85D55',
              textTransform: 'uppercase', display: 'block', marginBottom: 14,
            }}>
              Subtle Neural Intelligence
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400,
              color: '#171513', margin: '0 0 16px', lineHeight: 1.2,
            }}>
              Instant Diagnostic Stroke Feedback
            </h2>
            <p style={{
              fontSize: 14, color: '#6B5140', lineHeight: 1.7,
              fontFamily: 'Plus Jakarta Sans, sans-serif', margin: '0 0 24px',
            }}>
              CalliVision v2.4 evaluates your handwriting against classical 55° slant guidelines, hairline-to-shade pressure contrast, and baseline drift in real time.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                '55° diagonal slant adherence with degree deviation',
                'Hairline vs downstroke thickness contrast ratio',
                'Micro-jitter and exit loop smoothness detection',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#6B5140', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  <CheckCircle2 size={16} style={{ color: '#A85D55', flexShrink: 0, marginTop: 2 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/progress"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#171513', color: '#FAF6F0',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
                padding: '12px 24px', borderRadius: 9999,
                textDecoration: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif',
                textTransform: 'uppercase',
              }}
            >
              Try AI Stroke Review <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right: assessment panel matching reference screen #7 */}
          <div style={{
            background: 'white', borderRadius: 20,
            border: '1px solid rgba(107,81,64,0.14)',
            boxShadow: '0 12px 36px rgba(48,43,39,0.08)',
            padding: 28, position: 'relative', overflow: 'hidden',
          }}>
            {/* Subtle botanical corner decoration */}
            <div style={{
              position: 'absolute', top: -10, right: -10,
              width: 100, height: 100, opacity: 0.15,
              backgroundImage: 'url(/botanical-bg.jpg)',
              backgroundSize: '200px',
              backgroundPosition: 'top right',
            }} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(107,81,64,0.12)' }}>
              <span style={{
                fontSize: 10, fontFamily: 'ui-monospace, monospace',
                letterSpacing: '0.14em', color: '#A85D55', textTransform: 'uppercase', fontWeight: 700,
              }}>
                Diagnostic Sample • Token "a"
              </span>
              <div style={{
                padding: '4px 10px', borderRadius: 9999,
                background: '#F6F0E6', border: '1px solid rgba(107,81,64,0.2)',
                fontSize: 12, fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: '#171513',
              }}>
                84 / 100
              </div>
            </div>

            {/* Score metrics — elegant assessment sheet look */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Slant Adherence', val: 88, color: '#6B5140' },
                { label: 'Stroke Contrast Ratio', val: 82, color: '#A85D55' },
                { label: 'Letter Spacing', val: 76, color: '#642F35' },
                { label: 'Baseline Alignment', val: 91, color: '#6B5140' },
              ].map((m, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: '#6B5140', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{m.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#171513', fontFamily: 'ui-monospace, monospace' }}>{m.val}%</span>
                  </div>
                  <div style={{ height: 5, background: '#F0EBE3', borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${m.val}%`,
                      background: `linear-gradient(90deg, ${m.color}88, ${m.color})`,
                      borderRadius: 9999,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Prescription note */}
            <div style={{
              marginTop: 20, padding: '12px 16px',
              background: '#F6F0E6', borderRadius: 12,
              border: '1px solid rgba(107,81,64,0.12)',
              fontSize: 12, color: '#6B5140', lineHeight: 1.6,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: '#171513' }}>Prescription: </span>
              "Release downward pressure 2mm before baseline to create cleaner exit transitions into connecting hairlines."
            </div>
          </div>

        </div>
      </section>

      {/* ──────────── GALLERY SECTION ─────────────────────────────── */}
      <section style={{
        background: '#FAF6F0',
        borderTop: '1px solid rgba(107,81,64,0.12)',
        padding: '80px 32px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <span style={{
                fontSize: 10, fontFamily: 'ui-monospace, monospace',
                letterSpacing: '0.2em', fontWeight: 700, color: '#A85D55',
                textTransform: 'uppercase', display: 'block', marginBottom: 8,
              }}>
                Student Exhibition
              </span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
                fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400,
                color: '#171513', margin: 0,
              }}>
                Curated Calligraphy Artwork
              </h2>
            </div>
            <Link to="/community" style={{ fontSize: 12, color: '#A85D55', fontWeight: 600, textDecoration: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              View Full Gallery →
            </Link>
          </div>

          {/* Gallery grid — masonry style like reference */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {gallery.map((art, i) => (
              <div
                key={i}
                onClick={() => navigate('/community')}
                style={{
                  background: 'white',
                  borderRadius: 18,
                  border: '1px solid rgba(107,81,64,0.12)',
                  overflow: 'hidden', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  gridRow: i === 0 ? 'span 2' : 'span 1',
                  boxShadow: '0 2px 12px rgba(48,43,39,0.05)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(48,43,39,0.10)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(48,43,39,0.05)' }}
              >
                <div style={{
                  height: i === 0 ? '100%' : 180, minHeight: 160,
                  display: 'flex', flexDirection: 'column',
                  position: 'relative',
                  background: i % 3 === 0 ? '#F4E8E6' : i % 3 === 1 ? '#EFE5D5' : '#FAF6F0',
                }}>
                  {/* Botanical decoration */}
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 80, height: 80, opacity: 0.3,
                    backgroundImage: 'url(/botanical-bg.jpg)',
                    backgroundSize: '160px',
                    backgroundPosition: 'top right',
                  }} />

                  {/* Main calligraphy text */}
                  <div style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 24,
                  }}>
                    <h3 style={{
                      fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                      fontSize: i === 0 ? 48 : 36, fontWeight: 400,
                      color: '#171513', textAlign: 'center',
                      lineHeight: 1.2, whiteSpace: 'pre-line', margin: 0,
                    }}>
                      {art.title}
                    </h3>
                  </div>

                  {/* Author / rating row */}
                  <div style={{
                    padding: '10px 16px',
                    borderTop: '1px solid rgba(107,81,64,0.1)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'rgba(255,255,255,0.7)',
                  }}>
                    <span style={{ fontSize: 11, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#6B5140', fontWeight: 500 }}>
                      By {art.author}
                    </span>
                    <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', color: '#A85D55', fontWeight: 700 }}>
                      ★ {art.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── FOOTER ─────────────────────────────────────── */}
      <footer
        id="about"
        style={{
          background: '#F6F0E6',
          borderTop: '1px solid rgba(107,81,64,0.15)',
          padding: '48px 32px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <CalliLogo size="md" to="/" />
          <p style={{ fontSize: 12, color: '#6B5140', fontFamily: 'Plus Jakarta Sans, sans-serif', margin: 0 }}>
            Crafted for calligraphers, typographers & lettering artists worldwide.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { label: 'Practice', to: '/practice' },
              { label: 'Courses', to: '/courses' },
              { label: 'Challenges', to: '/challenges' },
              { label: 'Sign In', to: '/login' },
            ].map(l => (
              <Link key={l.label} to={l.to} style={{ fontSize: 12, color: '#6B5140', textDecoration: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#171513'}
                onMouseLeave={e => e.target.style.color = '#6B5140'}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes inkDraw {
          0% { stroke-dashoffset: 1400; opacity: 0; }
          30% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        .animate-ink-draw {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: inkDraw 2.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
        }
        @media (max-width: 900px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
