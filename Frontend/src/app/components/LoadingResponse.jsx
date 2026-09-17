export default function LoadingResponse() {
  return (
    <div className="flex animate-fade-slide">
      <div className="bg-surface border border-line rounded-[10px] p-6 w-full flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 rounded-full border-[2.5px] border-line border-t-blue animate-spin shadow-[0_0_10px_rgba(88,166,255,0.3)] shrink-0" />
          <div>
            <div className="text-[0.9rem] font-semibold text-fg">
              Generating Solutions
            </div>
            <div className="font-mono text-[0.65rem] text-fg-dim tracking-[0.04em] mt-0.5">
              Running dual-model analysis…
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="flex flex-col gap-3">
          {[
            { label: "Solution 1", color: "bg-amber", delay: "0s" },
            { label: "Solution 2", color: "bg-green", delay: "0.2s" },
            { label: "Judge", color: "bg-purple", delay: "0.4s" },
          ].map(({ label, color, delay }) => (
            <div key={label} className="flex items-center gap-4">
              <span
                className={`font-mono text-[0.65rem] font-semibold tracking-wider uppercase w-17 text-right shrink-0 ${
                  label === "Solution 1"
                    ? "text-amber"
                    : label === "Solution 2"
                      ? "text-green"
                      : "text-purple"
                }`}
              >
                {label}
              </span>
              <div className="flex-1 h-1 bg-elevated rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full animate-loading-bar ${color}`}
                  style={{ animationDelay: delay }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
