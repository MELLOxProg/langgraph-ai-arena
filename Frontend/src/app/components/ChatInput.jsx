import { useRef } from 'react'

export default function ChatInput({ value, onChange, onSend, onKeyDown, disabled }) {
  const textareaRef = useRef(null)

  const handleInput = (e) => {
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'
    onChange(e.target.value)
  }

  return (
    <div className="px-6 py-4 bg-[rgba(22,27,34,0.9)] backdrop-blur-xl border-t border-line flex flex-col gap-2 shrink-0">

      {/* Input Wrapper */}
      <div
        className={`
          flex items-end gap-2 bg-surface border rounded-[10px] px-4 py-2
          transition-all duration-200
          ${disabled ? 'border-line' : 'border-line focus-within:border-blue focus-within:shadow-[0_0_0_3px_rgba(88,166,255,0.1)]'}
        `}
      >
        <textarea
          ref={textareaRef}
          id="chat-input-textarea"
          className="
            flex-1 bg-transparent border-none outline-none
            text-fg text-[0.88rem] leading-relaxed
            min-h-5.5 max-h-40 overflow-y-auto
            py-1.5 resize-none placeholder:text-fg-dim
            disabled:opacity-50 disabled:cursor-not-allowed
            font-sans
          "
          placeholder="Submit a coding challenge to the arena… (Enter to send, Shift+Enter for newline)"
          value={value}
          onInput={handleInput}
          onChange={handleInput}
          onKeyDown={onKeyDown}
          disabled={disabled}
          rows={1}
        />

        <div className="flex items-center gap-2 pb-1">
          {/* Hints */}
          <div className="hidden sm:flex gap-1">
            {['↵ Send', '⇧↵ New line'].map((hint) => (
              <span
                key={hint}
                className="font-mono text-[0.6rem] text-fg-dim px-1.5 py-0.5 rounded bg-elevated border border-line tracking-[0.03em]"
              >
                {hint}
              </span>
            ))}
          </div>

          {/* Send Button */}
          <button
            id="send-btn"
            onClick={onSend}
            disabled={disabled || !value.trim()}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-lg text-[0.8rem] font-semibold
              text-white cursor-pointer whitespace-nowrap
              transition-all duration-200 relative overflow-hidden
              before:absolute before:inset-0 before:bg-[rgba(255,255,255,0.1)] before:opacity-0 before:transition-opacity
              hover:before:opacity-100
              ${disabled || !value.trim()
                ? 'opacity-50 cursor-not-allowed pointer-events-none'
                : 'hover:shadow-[0_0_16px_rgba(88,166,255,0.4)] hover:-translate-y-px active:translate-y-0'
              }
            `}
            style={{ backgroundImage: 'linear-gradient(135deg, #58a6ff, #bc8cff)' }}
          >
            {disabled ? (
              <>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="animate-spin">
                  <path d="M8 2a6 6 0 0 1 5.657 4H12.5a4.5 4.5 0 0 0-9 0H2.343A6 6 0 0 1 8 2z" />
                </svg>
                Analyzing…
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.724 1.053a.5.5 0 0 1 .523-.079l12.5 6a.5.5 0 0 1 0 .894l-12.5 6a.5.5 0 0 1-.678-.605L2.5 8.5 1.07 1.655a.5.5 0 0 1 .655-.602zm.896 1.3L3.5 8h5a.5.5 0 0 1 0 1h-5l-.88 5.648L14.125 8 2.62 2.353z" />
                </svg>
                Send
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.6rem] text-fg-dim tracking-[0.04em]">
          AI Arena — Powered by LangGraph Multi-Agent Framework
        </span>
        <span className="font-mono text-[0.6rem] text-fg-dim tracking-[0.04em]">
          {value.length} chars
        </span>
      </div>
    </div>
  )
}
