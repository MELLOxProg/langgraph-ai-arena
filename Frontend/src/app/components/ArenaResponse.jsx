import ScoreBadge from "./ScoreBadge";
import MarkdownContent from "./MarkdownContent";

export default function ArenaResponse({ message }) {
  const { solution1, solution2, judge } = message;
  const winner = judge.solution_1_score >= judge.solution_2_score ? 1 : 2;

  return (
    <div className="flex flex-col gap-6 animate-fade-slide">
      {/* ── Dual Solution Grid ── */}
      <div className="grid grid-cols-2 gap-4">
        {/* Solution 1 — Amber */}
        <div
          id="solution-1-card"
          className={`
            bg-surface rounded-[10px] overflow-hidden flex flex-col
            border border-t-2 border-t-amber border-[rgba(240,136,62,0.3)]
            transition-all duration-200 hover:-translate-y-0.5
            ${
              winner === 1
                ? "shadow-[0_0_30px_rgba(240,136,62,0.18)]"
                : "shadow-[0_0_20px_rgba(240,136,62,0.06)] hover:shadow-[0_4px_24px_rgba(240,136,62,0.12)]"
            }
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-[rgba(255,255,255,0.02)] shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md flex items-center justify-center font-mono text-[0.7rem] font-bold tracking-[0.04em] bg-[rgba(240,136,62,0.15)] text-amber border border-[rgba(240,136,62,0.3)]">
                S1
              </span>
              <div>
                <div className="text-[0.85rem] font-semibold text-fg">
                  Solution 1
                </div>
                <div className="font-mono text-[0.80rem] text-fg-dim tracking-[0.04em] mt-0.5 font-black">
                  Groq
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {winner === 1 && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(240,136,62,0.12)] border border-[rgba(240,136,62,0.4)] text-amber font-mono text-[0.6rem] font-bold tracking-[0.06em] animate-winner-pulse">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0l2.2 5.3L16 6l-4 4 1 5.5L8 13l-5 2.5 1-5.5-4-4 5.8-.7z" />
                  </svg>
                  WINNER
                </span>
              )}
              <ScoreBadge score={judge.solution_1_score} color="amber" />
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto max-h-130 p-4">
            <MarkdownContent content={solution1} />
          </div>

          {/* Footer — Judge */}
          <div className="px-4 py-4 border-t border-line bg-[rgba(240,136,62,0.03)] shrink-0">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 font-mono text-[0.65rem] font-semibold tracking-wider uppercase text-purple">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 2a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 8 2ZM8 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
                </svg>
                Judge Feedback
              </div>
              <p className="text-[0.78rem] leading-relaxed text-fg-muted">
                {judge.solution_1_feedback}
              </p>
            </div>
          </div>
        </div>

        {/* Solution 2 — Green */}
        <div
          id="solution-2-card"
          className={`
            bg-surface rounded-[10px] overflow-hidden flex flex-col
            border border-t-2 border-t-green border-[rgba(63,185,80,0.3)]
            transition-all duration-200 hover:-translate-y-0.5
            ${
              winner === 2
                ? "shadow-[0_0_30px_rgba(63,185,80,0.22)]"
                : "shadow-[0_0_20px_rgba(63,185,80,0.06)] hover:shadow-[0_4px_24px_rgba(63,185,80,0.12)]"
            }
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-[rgba(255,255,255,0.02)] shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md flex items-center justify-center font-mono text-[0.7rem] font-bold tracking-[0.04em] bg-[rgba(63,185,80,0.15)] text-green border border-[rgba(63,185,80,0.3)]">
                S2
              </span>
              <div>
                <div className="text-[0.85rem] font-semibold text-fg">
                  Solution 2
                </div>
                <div className="font-mono text-[0.80rem] text-fg-dim tracking-[0.04em] mt-0.5 font-black">
                  Cohere
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {winner === 2 && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(63,185,80,0.12)] border border-[rgba(63,185,80,0.4)] text-green font-mono text-[0.6rem] font-bold tracking-[0.06em] animate-winner-pulse">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0l2.2 5.3L16 6l-4 4 1 5.5L8 13l-5 2.5 1-5.5-4-4 5.8-.7z" />
                  </svg>
                  WINNER
                </span>
              )}
              <ScoreBadge score={judge.solution_2_score} color="green" />
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto max-h-130 p-4">
            <MarkdownContent content={solution2} />
          </div>

          {/* Footer — Judge */}
          <div className="px-4 py-4 border-t border-line bg-[rgba(63,185,80,0.03)] shrink-0">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 font-mono text-[0.65rem] font-semibold tracking-wider uppercase text-purple">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 2a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 8 2ZM8 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
                </svg>
                Judge Feedback
              </div>
              <p className="text-[0.78rem] leading-relaxed text-fg-muted">
                {judge.solution_2_feedback}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Judge Verdict Card ── */}
      <div
        id="judge-verdict"
        className="relative rounded-[10px] border border-[rgba(188,140,255,0.25)] p-6 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1428 0%, #161b22 100%)",
        }}
      >
        {/* Background bloom */}
        <div
          className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(188,140,255,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-[1.4rem] drop-shadow-[0_0_8px_rgba(188,140,255,0.5)]">
              ⚖️
            </span>
            <div>
              <div className="text-base font-bold text-fg">
                Judge Consensus Verdict
              </div>
              <div className="font-mono text-[0.65rem] text-purple tracking-wider mt-0.5">
                Automated Quality Analysis
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(188,140,255,0.12)] border border-[rgba(188,140,255,0.35)] text-purple font-mono text-[0.72rem] font-bold tracking-[0.03em]">
            Solution {winner} Declared Winner
          </div>
        </div>

        {/* Score VS row */}
        <div className="relative flex justify-center mb-6">
          <div className="flex items-center gap-10 bg-[rgba(255,255,255,0.03)] px-10 py-4 rounded-lg border border-line">
            <div
              className={`flex flex-col items-center gap-1 transition-transform duration-200 ${winner === 1 ? "scale-110" : ""}`}
            >
              <span
                className="font-mono text-[2.5rem] font-bold leading-none"
                style={{ color: "#f0883e", textShadow: "0 0 20px #f0883e" }}
              >
                {judge.solution_1_score}
              </span>
              <span className="font-mono text-[0.65rem] font-semibold tracking-[0.06em] uppercase text-fg-dim">
                Solution 1
              </span>
            </div>
            <span className="font-mono text-[0.8rem] font-bold text-fg-dim tracking-widest">
              VS
            </span>
            <div
              className={`flex flex-col items-center gap-1 transition-transform duration-200 ${winner === 2 ? "scale-110" : ""}`}
            >
              <span
                className="font-mono text-[2.5rem] font-bold leading-none"
                style={{ color: "#3fb950", textShadow: "0 0 20px #3fb950" }}
              >
                {judge.solution_2_score}
              </span>
              <span className="font-mono text-[0.65rem] font-semibold tracking-[0.06em] uppercase text-fg-dim">
                Solution 2
              </span>
            </div>
          </div>
        </div>

        {/* Verdict Summary */}
        <div className="relative flex flex-col gap-4">
          <p className="text-[0.83rem] leading-relaxed text-fg-muted px-4 py-2 rounded-md border-l-2 border-amber bg-[rgba(240,136,62,0.04)]">
            <span className="font-mono text-[0.65rem] font-bold tracking-wider uppercase text-amber mr-2">
              S1 Analysis:
            </span>
            {judge.solution_1_feedback}
          </p>
          <p className="text-[0.83rem] leading-relaxed text-fg-muted px-4 py-2 rounded-md border-l-2 border-green bg-[rgba(63,185,80,0.04)]">
            <span className="font-mono text-[0.65rem] font-bold tracking-wider uppercase text-green mr-2">
              S2 Analysis:
            </span>
            {judge.solution_2_feedback}
          </p>
        </div>
      </div>
    </div>
  );
}
