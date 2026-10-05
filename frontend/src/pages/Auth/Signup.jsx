import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Sparkles, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('learner')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) return toast.error('Please fill in all fields')
    if (password.length < 6) return toast.error('Password must be at least 6 characters')

    setLoading(true)
    try {
      const res = await axios.post('/api/auth/register', { name, email, password, role })
      login(res.data, res.data.token)
      toast.success(`Account created successfully! Welcome, ${name}!`)
      navigate('/onboarding')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 relative overflow-hidden ink-bg">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl" />

      <div className="w-full max-w-md glass p-8 space-y-8 relative z-10 border-amber-500/10 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gradient-gold mx-auto shadow-gold">
            <Sparkles className="w-6 h-6 text-neutral-950" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight font-display text-neutral-100">Create Account</h2>
          <p className="text-sm text-neutral-400">Embark on your digital calligraphy experience</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="label">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="input pl-12"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="label">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input pl-12"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="label">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="input pl-12"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="label">I want to join as</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('learner')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  role === 'learner'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                    : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="text-xs font-semibold">🎓 Learner</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Learn, practice & get AI feedback</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('mentor')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  role === 'mentor'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                    : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="text-xs font-semibold">🖋️ Mentor</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Teach, review & guide students</div>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>Sign Up <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-2">
          <p className="text-xs text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-500 hover:underline transition-colors font-medium">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
