import { useState } from 'react'
import { CartItem } from '../types'
import { T, font } from '../types/tokens'

interface Props {
  items: CartItem[]
  onRemove: (index: number) => void
  onBack: () => void
}

export function CheckoutPage({ items, onRemove, onBack }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const total = items.reduce((s, i) => s + i.price, 0)

  const handlePay = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      })
      if (!res.ok) throw new Error(await res.text())
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-5 py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-8 text-sm focus:outline-none"
        style={{ fontFamily: font.mono, color: T.muted }}
      >
        ← Back to shop
      </button>

      <div style={{ fontFamily: font.mono, color: T.glow }} className="text-xs tracking-widest mb-3">
        REVIEW YOUR ORDER
      </div>
      <h1
        style={{ fontFamily: font.display, color: T.bone, lineHeight: 0.95 }}
        className="text-4xl sm:text-5xl tracking-wide mb-10"
      >
        CHECKOUT
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p style={{ fontFamily: font.body, color: T.muted }} className="mb-6">
            Your cart is empty.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 text-sm rounded font-semibold focus:outline-none"
            style={{ fontFamily: font.body, background: T.glow, color: T.ink }}
          >
            Go to shop
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {/* Order items */}
          <ul className="flex-1 space-y-4">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="flex gap-4 rounded p-4"
                style={{ background: T.panel, border: `1px solid ${T.panelEdge}` }}
              >
                <img
                  src={item.photoSrc}
                  alt={item.photoTitle}
                  className="w-20 h-20 object-cover rounded shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: font.body, color: T.bone, fontWeight: 600 }} className="text-sm">
                    {item.photoTitle}
                  </div>
                  <div style={{ fontFamily: font.mono, color: T.muted }} className="text-xs mt-1">
                    {item.size} · {item.paper}
                  </div>
                  <button
                    onClick={() => onRemove(idx)}
                    className="mt-2 text-xs underline focus:outline-none"
                    style={{ fontFamily: font.body, color: T.muted }}
                  >
                    Remove
                  </button>
                </div>
                <div style={{ fontFamily: font.mono, color: T.bone }} className="text-sm shrink-0">
                  ${item.price}
                </div>
              </li>
            ))}
          </ul>

          {/* Order summary */}
          <aside
            className="rounded p-6 space-y-5 md:w-72 shrink-0"
            style={{ background: T.panel, border: `1px solid ${T.panelEdge}` }}
          >
            <div style={{ fontFamily: font.mono, color: T.bone }} className="text-xs tracking-widest">
              ORDER SUMMARY
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span style={{ fontFamily: font.body, color: T.muted }} className="truncate pr-3">
                    {item.photoTitle}
                  </span>
                  <span style={{ fontFamily: font.mono, color: T.muted }}>${item.price}</span>
                </div>
              ))}
            </div>

            <div
              className="flex justify-between items-baseline pt-4"
              style={{ borderTop: `1px solid ${T.panelEdge}` }}
            >
              <span style={{ fontFamily: font.body, color: T.bone }}>Total</span>
              <span style={{ fontFamily: font.display, color: T.bone }} className="text-3xl tracking-wide">
                ${total}
              </span>
            </div>

            <div className="space-y-2">
              <div style={{ fontFamily: font.mono, color: T.muted }} className="text-[11px]">
                ▮ Secure payment via Stripe
              </div>
              <div style={{ fontFamily: font.mono, color: T.muted }} className="text-[11px]">
                ▮ Ships within 7–10 days
              </div>
              <div style={{ fontFamily: font.mono, color: T.muted }} className="text-[11px]">
                ▮ Signed & numbered
              </div>
            </div>

            {error && (
              <p style={{ fontFamily: font.body, color: '#f87171' }} className="text-xs">
                {error}
              </p>
            )}

            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full py-3 text-sm rounded font-bold focus:outline-none disabled:opacity-60"
              style={{ fontFamily: font.body, background: T.glow, color: T.ink }}
            >
              {loading ? 'Redirecting to Stripe…' : `Pay $${total}`}
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}
