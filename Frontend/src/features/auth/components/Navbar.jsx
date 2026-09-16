import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <img
        className="navbar__brand"
        src="/logo_reverse.jpeg"
        alt="InferTrials logo"
      />
      <a className="navbar__github" href="https://github.com/MELLOxProg/langgraph-ai-arena/" target="_blank" rel="noreferrer">
        <svg className="navbar__github-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.31 9.31 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.91v2.81c0 .28.18.6.69.5A10.17 10.17 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
        </svg>
        GitHub
      </a>
    </nav>
  )
}