import { useRef, useEffect } from 'react'
import UserMessage from './UserMessage'
import ArenaResponse from './ArenaResponse'
import LoadingResponse from './LoadingResponse'
import ChatInput from './ChatInput'

export default function ChatArea({ chat, isLoading, inputText, onInputChange, onSend }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat?.messages, isLoading])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0a0e14]">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 h-14 min-h-14 bg-[rgba(22,27,34,0.85)] backdrop-blur-md border-b border-line gap-4 flex-shrink-0">
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[0.9rem] font-semibold text-fg max-w-md overflow-hidden text-ellipsis whitespace-nowrap">
              {chat?.title || 'AI Arena'}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(63,185,80,0.1)] border border-[rgba(63,185,80,0.3)] font-mono text-[0.62rem] font-semibold text-green tracking-[0.05em] uppercase flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-glow" />
              Live
            </span>
          </div>
          <div className="font-mono text-[0.65rem] text-fg-dim tracking-[0.04em]">
            Dual-Solution Code Analysis Engine
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            id="fork-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-elevated text-fg-muted border border-line text-[0.75rem] font-medium hover:text-fg hover:border-fg-dim hover:bg-[rgba(255,255,255,0.03)] transition-all duration-150 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm3-8.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" />
            </svg>
            Fork
          </button>
          <button
            id="export-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-elevated text-fg-muted border border-line text-[0.75rem] font-medium hover:text-fg hover:border-fg-dim hover:bg-[rgba(255,255,255,0.03)] transition-all duration-150 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z" />
              <path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z" />
            </svg>
            Export
          </button>
        </div>
      </header>

      {/* ── Messages Feed ── */}
      <div
        id="messages-feed"
        className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8"
      >
        {!chat?.messages?.length && !isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 m-auto">
            <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(88,166,255,0.3)]">⚡</div>
            <h2
              className="text-2xl font-bold mb-2 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #58a6ff, #bc8cff)' }}
            >
              Start an Arena Match
            </h2>
            <p className="text-[0.9rem] text-fg-muted max-w-sm leading-relaxed">
              Submit a coding challenge and get two AI solutions with judge analysis.
            </p>
          </div>
        )}

        {chat?.messages?.map((msg) =>
          msg.type === 'user'
            ? <UserMessage key={msg.id} message={msg} />
            : <ArenaResponse key={msg.id} message={msg} />
        )}

        {isLoading && <LoadingResponse />}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ── */}
      <ChatInput
        value={inputText}
        onChange={onInputChange}
        onSend={onSend}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
    </main>
  )
}
