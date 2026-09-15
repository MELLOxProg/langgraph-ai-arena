import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'highlight.js/styles/github-dark.css'
import App from './app/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './features/auth/auth.provider.jsx'
import './features/auth/auth.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter><AuthProvider><App /></AuthProvider></BrowserRouter>
  </StrictMode>,
)
