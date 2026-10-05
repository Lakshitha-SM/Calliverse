import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Sparkles, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return toast.error('Please enter all fields')

    setLoading(true)
    try {
      const res = await axios.post('/api/auth/login', { email, password })
      login(res.data, res.data.token)
      toast.success(`Welcome back, ${res.data.name}!`)
      
      if (res.data.onboardingComplete) {
        navigate('/dashboard')
      } else {
        navigate('/onboarding')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // Quick credentials for ease of verification/testing
  const handleQuickLogin = (demoRole) => {
    if (demoRole === 'learner') {
      setEmail('learner@calliverse.com')
      setPassword('calliverse123')
    } else if (demoRole === 'mentor') {
      setEmail('mentor@calliverse.com')
      setPassword('calliverse123')
    } else if (demoRole === 'admin') {
      setEmail('admin@calliverse.com')
      setPassword('calliverse123')
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
          <h2 className="text-3xl font-semibold tracking-tight font-display text-neutral-100">Welcome Back</h2>
          <p className="text-sm text-neutral-400">Continue your premium calligraphy journey</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Enter your password"
                className="input pl-12"
                required
              />
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
              <>Sign In <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        {/* Quick Demo Credentials */}
        <div className="pt-2 border-t border-amber-900/10 space-y-3">
          <p className="text-xs text-amber-500/80 font-medium text-center uppercase tracking-widest">Instant Demo Roles</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('learner')}
              className="p-2.5 text-xs rounded-xl bg-neutral-900 border border-amber-900/20 text-neutral-300 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300 text-center"
            >
              🎓 Learner
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('mentor')}
              className="p-2.5 text-xs rounded-xl bg-neutral-900 border border-amber-900/20 text-neutral-300 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300 text-center"
            >
              🖋️ Mentor
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="p-2.5 text-xs rounded-xl bg-neutral-900 border border-amber-900/20 text-neutral-300 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300 text-center"
            >
              ⚡ Admin
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-2">
          <p className="text-xs text-neutral-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-amber-500 hover:underline transition-colors font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
