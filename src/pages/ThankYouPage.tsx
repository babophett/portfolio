import { T, font } from '../types/tokens'

interface Props {
  onGoShop: () => void
  onGoWork: () => void
}

export function ThankYouPage({ onGoShop, onGoWork }: Props) {
  return (
    <main className="max-w-6xl mx-auto px-5 py-24 flex flex-col items-center text-center gap-8">
      <div style={{ fontFamily: font.mono, color: T.glow }} className="text-xs tracking-widest">
        ORDER CONFIRMED
      </div>

      <h1
        style={{ fontFamily: font.display, color: T.bone, lineHeight: 0.95 }}
        className="text-5xl sm:text-7xl tracking-wide max-w-2xl"
      >
        YOUR FRAME<br />
        <span style={{ color: T.glow }}>IS ON ITS WAY.</span>
      </h1>

      <p style={{ fontFamily: font.body, color: T.muted }} className="max-w-md leading-relaxed text-sm">
        Check your email for a receipt and tracking info. Prints ship flat or in a tube within
        7–10 days. Every frame leaves signed and numbered.
      </p>

      <div
        className="rounded p-6 max-w-sm w-full text-left space-y-3"
        style={{ background: T.panel, border: `1px solid ${T.panelEdge}` }}
      >
        <div style={{ fontFamily: font.mono, color: T.bone }} className="text-xs tracking-widest mb-1">
          WHAT HAPPENS NEXT
        </div>
        {[
          'Confirmation email sent to your inbox',
          'Print processed &amp; signed within 2–3 days',
          'Shipped with tracking — flat or tube',
          'Frame arrives ready to hang',
        ].map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span style={{ fontFamily: font.mono, color: T.glow }} className="text-xs mt-0.5 shrink-0">
              0{i + 1}
            </span>
            <span
              style={{ fontFamily: font.body, color: T.muted }}
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: step }}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onGoShop}
          className="px-6 py-3 text-sm rounded font-semibold focus:outline-none"
          style={{ fontFamily: font.body, background: T.glow, color: T.ink }}
        >
          Shop more prints
        </button>
        <button
          onClick={onGoWork}
          className="px-6 py-3 text-sm rounded font-semibold focus:outline-none"
          style={{ fontFamily: font.body, color: T.bone, border: `1px solid ${T.panelEdge}` }}
        >
          View the work
        </button>
      </div>
    </main>
  )
}
