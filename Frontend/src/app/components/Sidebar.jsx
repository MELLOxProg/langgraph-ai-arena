const HISTORY_CHATS = [
  { id: 'h1', title: 'Binary Search Tree Traversal', group: 'Yesterday' },
  { id: 'h2', title: 'Fibonacci with Memoization', group: 'Yesterday' },
  { id: 'h3', title: 'Graph BFS Shortest Path', group: 'This Week' },
]

export default function Sidebar({ chats, activeChatId, onSelectChat, onNewChat }) {
  return (
    <aside className="w-[272px] min-w-[272px] h-screen bg-canvas border-r border-line flex flex-col overflow-hidden">

      {/* ── Brand ── */}
      <div className="px-4 py-5 border-b border-line flex-shrink-0">
        <div className="flex items-center gap-2">
          <span
            className="text-2xl bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(88,166,255,0.4)]"
            style={{ backgroundImage: 'linear-gradient(135deg, #58a6ff, #bc8cff)' }}
          >
            ⚡
          </span>
          <div>
            <div
              className="font-bold text-[0.95rem] tracking-tight bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #58a6ff, #bc8cff)' }}
            >
              AI Arena
            </div>
            <div className="font-mono text-[0.65rem] font-semibold text-fg-dim tracking-[0.08em] uppercase">
              v2.4
            </div>
          </div>
        </div>
      </div>

      {/* ── New Chat ── */}
      <div className="px-4 py-4 border-b border-line flex-shrink-0">
        <button
          id="new-chat-btn"
          onClick={onNewChat}
          className="
            w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md
            bg-elevated text-fg text-[0.8rem] font-semibold tracking-wide
            border border-line
            hover:border-blue hover:bg-[rgba(88,166,255,0.06)] hover:text-blue
            hover:shadow-[0_0_12px_rgba(88,166,255,0.1)]
            transition-all duration-200 cursor-pointer
          "
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New Arena Match
        </button>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {/* Today — live chats */}
        {chats.length > 0 && (
          <div className="mb-4">
            <div className="font-mono text-[0.62rem] font-semibold tracking-[0.08em] uppercase text-fg-dim px-2 py-1 mb-1">
              Today
            </div>
            {chats.map((chat) => {
              const active = activeChatId === chat.id
              return (
                <button
                  key={chat.id}
                  id={`chat-item-${chat.id}`}
                  onClick={() => onSelectChat(chat.id)}
                  className={`
                    w-full flex items-center gap-2 px-2 py-[0.45rem] rounded-md
                    text-[0.8rem] text-left transition-all duration-150 mb-0.5
                    border cursor-pointer
                    ${active
                      ? 'bg-[rgba(88,166,255,0.08)] border-[rgba(88,166,255,0.2)] text-blue shadow-[0_0_10px_rgba(88,166,255,0.05)]'
                      : 'bg-transparent border-transparent text-fg-muted hover:bg-elevated hover:text-fg'
                    }
                  `}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`flex-shrink-0 ${active ? 'opacity-100' : 'opacity-60'}`}>
                    <path d="M1 1h10v7H7l-3 3V8H1V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                    {chat.title}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* History groups */}
        {['Yesterday', 'This Week'].map((group) => {
          const items = HISTORY_CHATS.filter((h) => h.group === group)
          if (!items.length) return null
          return (
            <div key={group} className="mb-4">
              <div className="font-mono text-[0.62rem] font-semibold tracking-[0.08em] uppercase text-fg-dim px-2 py-1 mb-1">
                {group}
              </div>
              {items.map((chat) => (
                <button
                  key={chat.id}
                  id={`chat-item-${chat.id}`}
                  className="
                    w-full flex items-center gap-2 px-2 py-[0.45rem] rounded-md
                    text-[0.8rem] text-left transition-all duration-150 mb-0.5
                    border border-transparent bg-transparent text-fg-muted
                    hover:bg-elevated hover:text-fg cursor-pointer
                  "
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 opacity-60">
                    <path d="M1 1h10v7H7l-3 3V8H1V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                    {chat.title}
                  </span>
                </button>
              ))}
            </div>
          )
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="border-t border-line px-4 py-4 flex flex-col gap-2 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green shadow-[0_0_6px_rgba(63,185,80,0.6)] animate-pulse-glow" />
          <span className="font-mono text-[0.65rem] text-fg-dim tracking-[0.04em]">
            Cluster: US‑East‑1
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-bold text-white flex-shrink-0"
            style={{ backgroundImage: 'linear-gradient(135deg, #58a6ff, #bc8cff)' }}
          >
            A
          </div>
          <div>
            <div className="text-[0.8rem] font-semibold text-fg">alex.dev</div>
            <div className="font-mono text-[0.6rem] text-purple font-semibold tracking-[0.04em]">
              Pro Tier
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
