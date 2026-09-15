import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormGroup from '../components/FormGroup'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { handleLogin } = useAuth(); const navigate = useNavigate(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('')
  async function handleSubmit(event) { event.preventDefault(); setError(''); try { await handleLogin({ email, password }); navigate('/') } catch (err) { setError(err.response?.data?.message || 'Login failed') } }
  return <><Navbar /><main className="login-page"><div className="form-container"><h1>Login</h1><form onSubmit={handleSubmit}><FormGroup type="email" label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} /><FormGroup type="password" label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} /><button className="button" type="submit">Login</button>{error && <p className="auth-error">{error}</p>}<p>Don't have an account? <Link to="/register">Register</Link></p></form></div></main></>
}