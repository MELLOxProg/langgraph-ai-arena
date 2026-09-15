import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormGroup from '../components/FormGroup'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const { handleRegister } = useAuth(); const navigate = useNavigate(); const [form, setForm] = useState({ username: '', email: '', password: '' }); const [error, setError] = useState('')
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })
  async function handleSubmit(event) { event.preventDefault(); setError(''); try { await handleRegister(form); navigate('/') } catch (err) { setError(err.response?.data?.message || 'Registration failed') } }
  return <><Navbar /><main className="register-page"><div className="form-container"><h1>Register</h1><form onSubmit={handleSubmit}><FormGroup type="text" label="Username" placeholder="Enter your username" value={form.username} onChange={update('username')} /><FormGroup type="email" label="Email" placeholder="Enter your email" value={form.email} onChange={update('email')} /><FormGroup type="password" label="Password" placeholder="Enter your password" value={form.password} onChange={update('password')} /><button className="button" type="submit">Register</button>{error && <p className="auth-error">{error}</p>}<p>Already have an account? <Link to="/login">Login</Link></p></form></div></main></>
}