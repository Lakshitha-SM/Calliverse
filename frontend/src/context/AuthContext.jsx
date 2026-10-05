import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('cv_user')
    const token  = localStorage.getItem('cv_token')
    if (stored && token) {
      setUser(JSON.parse(stored))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    setLoading(false)
  }, [])

  const login = (userData, token) => {
    localStorage.setItem('cv_user',  JSON.stringify(userData))
    localStorage.setItem('cv_token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('cv_user')
    localStorage.removeItem('cv_token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const switchRole = async (newRole) => {
    try {
      const res = await axios.put('/api/users/role', { role: newRole })
      const updated = { ...user, role: newRole }
      localStorage.setItem('cv_user', JSON.stringify(updated))
      setUser(updated)
      return res.data
    } catch (err) {
      // Fallback local update if network issue
      const updated = { ...user, role: newRole }
      localStorage.setItem('cv_user', JSON.stringify(updated))
      setUser(updated)
      return { user: updated }
    }
  }

  const role = user?.role || 'learner'
  const isLearner = role === 'learner'
  const isMentor = role === 'mentor'
  const isAdmin = role === 'admin'

  return (
    <AuthContext.Provider value={{
      user,
      role,
      isLearner,
      isMentor,
      isAdmin,
      login,
      logout,
      updateUser,
      switchRole,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
