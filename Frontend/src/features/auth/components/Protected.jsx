import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Protected({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="auth-loading">Loading...</div>
  return user ? children : <Navigate to="/login" replace />
}