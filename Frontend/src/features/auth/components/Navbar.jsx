import { Link } from 'react-router-dom'

export default function Navbar() {
  const apiUrl = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3000`
  return <nav className="navbar"><Link className="navbar__brand" to="/" aria-label="AI Arena logo placeholder">AI Arena logo</Link><a className="navbar__github" href={`${apiUrl}/api/auth/google`}>Continue with Google</a></nav>
}