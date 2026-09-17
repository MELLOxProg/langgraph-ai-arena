import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/auth-glass.scss";

// GitHub SVG path — reused from Navbar/Login
const GH_PATH =
  "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.31 9.31 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.91v2.81c0 .28.18.6.69.5A10.17 10.17 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z";

const wallpapers = [
  "/wallpapers/1.png",
  "/wallpapers/2.png",
  "/wallpapers/3.png",
  "/wallpapers/4.jpg",
  "/wallpapers/5.png",
  "/wallpapers/6.webp",
];

export default function Register() {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [wallpaperIndex, setWallpaperIndex] = useState(() => {
    const saved = Number(window.localStorage.getItem("infertrials-wallpaper-index") || 0);
    return Number.isFinite(saved) ? saved % wallpapers.length : 0;
  });

  useEffect(() => {
    window.localStorage.setItem("infertrials-wallpaper-index", String(wallpaperIndex));
  }, [wallpaperIndex]);

  const apiUrl =
    import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3000`;

  const cycleWallpaper = () => {
    setWallpaperIndex((current) => (current + 1) % wallpapers.length);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await handleRegister({ name, email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div
      className="auth-page"
      style={{
        backgroundImage: `url(${wallpapers[wallpaperIndex]})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Ambient orbs */}
      <div className="auth-orb auth-orb--blue" aria-hidden="true" />
      <div className="auth-orb auth-orb--purple" aria-hidden="true" />
      <div className="auth-orb auth-orb--amber" aria-hidden="true" />

      {/* Left hero panel */}
      <section className="auth-hero" aria-hidden="true">
        <div className="auth-hero__wordmark">
          <span className="wordmark-dot" />
          <span>Infer Trials</span>
          <button
            type="button"
            className="wallpaper-switcher"
            onClick={cycleWallpaper}
            aria-label="Cycle auth wallpaper"
          >
            Change wallpaper
          </button>
        </div>
        <div className="auth-hero__quote">
          <blockquote>
            "Controlled trials. Competing models.<br />
            Measurable intelligence."
          </blockquote>
          <cite>Obsidian Synthetics — Arena Protocol</cite>
        </div>
      </section>

      {/* Right frosted panel */}
      <section className="auth-panel" aria-labelledby="register-heading">
        <div className="auth-panel__inner">

          {/* Header */}
          <div className="auth-header">
            {/* <div className="auth-badge">
              <span className="badge-dot" />
              New Account
            </div> */}
            <h1 id="register-heading">Create Account</h1>
            <p>Join the AI evaluation arena</p>
          </div>

          {/* Google OAuth */}
          <a
            id="google-register-btn"
            className="btn-google"
            href={`${apiUrl}/api/auth/google`}
          >
            {/* Google G — multicolor */}
            <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" fill="#EA4335" />
              <path d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" fill="#4285F4" />
              <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z" fill="#FBBC05" />
              <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z" fill="#34A853" />
            </svg>
            Continue with Google
          </a>

          {/* Divider */}
          <div className="auth-divider" aria-hidden="true">
            <span>or</span>
          </div>

          {/* Credential form */}
          <form onSubmit={handleSubmit} id="register-form" noValidate>
            {/* Full Name */}
            <div className="glass-field">
              <label htmlFor="register-name">Full Name</label>
              <div className="field-wrapper">
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <span className="field-icon">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM3.5 16.5a6.5 6.5 0 0113 0" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="glass-field">
              <label htmlFor="register-email">Email</label>
              <div className="field-wrapper">
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="field-icon">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2.5 6.5l7.5 5 7.5-5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="1.5" y="4" width="17" height="12" rx="2" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="glass-field">
              <label htmlFor="register-password">Password</label>
              <div className="field-wrapper">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="field-icon field-icon--btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="16" height="16">
                      <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.52 10.52 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="16" height="16">
                      <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button id="register-submit-btn" className="btn-submit" type="submit">
              Create Account
            </button>
          </form>

          {/* Login link */}
          <p className="auth-footer-link">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>

      {/* GitHub button — fixed bottom-left */}
      <a
        id="github-btn"
        className="auth-github-btn"
        href="https://github.com/MELLOxProg/langgraph-ai-arena/"
        target="_blank"
        rel="noreferrer"
        aria-label="View on GitHub"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d={GH_PATH} />
        </svg>
        GitHub
      </a>
    </div>
  );
}
