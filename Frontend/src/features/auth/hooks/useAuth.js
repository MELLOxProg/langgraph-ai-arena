import { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { getMe, login, logout, register } from '../services/auth.api'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  const { user, setUser, loading, setLoading } = context
  async function handleRegister(payload) { setLoading(true); try { const data = await register(payload); setUser(data.user); return data } finally { setLoading(false) } }
  async function handleLogin(payload) { setLoading(true); try { const data = await login(payload); setUser(data.user); return data } finally { setLoading(false) } }
  async function handleGetMe() { try { const data = await getMe(); setUser(data.user) } catch { setUser(null) } finally { setLoading(false) } }
  async function handleLogout() {
    try {
      await logout()
    } finally {
      setUser(null)
    }
  }
  return { user, loading, handleRegister, handleLogin, handleGetMe, handleLogout }
}