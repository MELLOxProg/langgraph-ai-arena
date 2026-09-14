import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext(null)

/** Global toast state. Wrap your app with <ToastProvider>. */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const addToast = useCallback((message, { duration = 2500 } = {}) => {
    const id = ++idRef.current
    setToasts((prev) => [...prev, { id, message, visible: true }])

    // Start fade-out slightly before removal for smooth animation
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      )
    }, duration - 350)

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}

      {/* ── Toast Viewport ── */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            style={{
              transition: 'opacity 0.35s ease, transform 0.35s ease',
              opacity: toast.visible ? 1 : 0,
              transform: toast.visible ? 'translateY(0)' : 'translateY(8px)',
            }}
            className="
              flex items-center gap-2.5
              px-4 py-2.5 rounded-lg
              bg-elevated border border-line
              shadow-[0_8px_32px_rgba(0,0,0,0.5)]
              backdrop-blur-xl
              text-[0.8rem] font-medium text-fg
              pointer-events-auto
            "
          >
            {/* Checkmark icon */}
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[rgba(63,185,80,0.2)] shrink-0">
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#3fb950" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/** Returns an `addToast(message)` function from anywhere inside the tree. */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
