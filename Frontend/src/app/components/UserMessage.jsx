export default function UserMessage({ message }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[640px] bg-surface border border-line rounded-[16px_16px_4px_16px] px-6 py-4 flex flex-col gap-2">
        <p className="text-[0.9rem] leading-relaxed text-fg whitespace-pre-wrap break-words">
          {message.text}
        </p>
        <div className="flex items-center justify-end gap-2">
          <span className="font-mono text-[0.62rem] text-fg-dim tracking-[0.03em]">
            {message.timestamp}
          </span>
          <div
            className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[0.65rem] font-bold text-white"
            style={{ backgroundImage: 'linear-gradient(135deg, #58a6ff, #bc8cff)' }}
          >
            U
          </div>
        </div>
      </div>
    </div>
  )
}
