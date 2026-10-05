import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

import Landing    from './pages/Landing'
import Login      from './pages/Auth/Login'
import Signup     from './pages/Auth/Signup'
import Onboarding from './pages/Onboarding'
import Dashboard  from './pages/Dashboard'
import Canvas     from './pages/Canvas'
import Templates  from './pages/Templates'
import Practice   from './pages/Practice'
import Progress   from './pages/Progress'
import Community  from './pages/Community'
import Portfolio  from './pages/Portfolio'
import FontPreview from './pages/FontPreview'
import QRArtwork  from './pages/QRArtwork'
import Profile    from './pages/Profile'
import CoursesCatalog from './pages/Courses/CoursesCatalog'
import CourseDetail   from './pages/Courses/CourseDetail'
import LessonView     from './pages/Courses/LessonView'
import MentorStudio from './pages/Mentor/MentorStudio'
import AdminConsole from './pages/Admin/AdminConsole'
import DashboardLayout from './components/layout/DashboardLayout'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <div style={{ width:48, height:48, border:'3px solid #C9A96E', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
  return user ? children : <Navigate to="/login" replace />
}

const RoleRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!allowedRoles.includes(user.role || 'learner')) {
    return (
      <div className="p-8 text-center space-y-4 max-w-md mx-auto my-12 bg-neutral-900 border border-amber-900/30 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-500 font-display">Access Restricted</h2>
        <p className="text-xs text-neutral-400">
          This area requires <span className="text-amber-400 font-bold uppercase">{allowedRoles.join(' or ')}</span> privileges.
        </p>
        <p className="text-[11px] text-neutral-500">
          Use the <strong>Demo Role Switcher</strong> at the bottom of your sidebar to test this role.
        </p>
      </div>
    )
  }
  return children
}

const OnboardingRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.onboardingComplete) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background:'#2C2825', color:'#F5F0E8', border:'1px solid rgba(201,169,110,0.3)' },
              success: { iconTheme: { primary:'#C9A96E', secondary:'#1A1714' } },
            }}
          />
          <Routes>
            {/* Public */}
            <Route path="/"         element={<Landing />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/signup"   element={<Signup />} />
            <Route path="/artwork/:id" element={<QRArtwork />} />

            {/* Onboarding */}
            <Route path="/onboarding" element={
              <OnboardingRoute><Onboarding /></OnboardingRoute>
            } />

            {/* Protected — Dashboard layout */}
            <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
              <Route path="/dashboard"   element={<Dashboard />} />
              <Route path="/courses"     element={<CoursesCatalog />} />
              <Route path="/courses/:idOrSlug" element={<CourseDetail />} />
              <Route path="/lessons/:idOrSlug" element={<LessonView />} />
              <Route path="/canvas"      element={<Canvas />} />
              <Route path="/canvas/:id"  element={<Canvas />} />
              <Route path="/templates"   element={<Templates />} />
              <Route path="/practice"    element={<Practice />} />
              <Route path="/progress"    element={<Progress />} />
              <Route path="/community"   element={<Community />} />
              <Route path="/portfolio"   element={<Portfolio />} />
              <Route path="/fonts"       element={<FontPreview />} />
              <Route path="/profile"     element={<Profile />} />
              <Route path="/mentor"      element={<RoleRoute allowedRoles={['mentor', 'admin']}><MentorStudio /></RoleRoute>} />
              <Route path="/admin"       element={<RoleRoute allowedRoles={['admin']}><AdminConsole /></RoleRoute>} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}
