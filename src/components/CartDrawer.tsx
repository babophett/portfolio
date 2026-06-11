import { useEffect } from 'react'
import { CartItem } from '../types'
import { T, font } from '../types/tokens'

interface Props {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onRemove: (index: number) => void
  onCheckout: () => void
}

export function CartDrawer({ open, onClose, items, onRemove, onCheckout }: Props) {
  const total = items.reduce((s, i) => s + i.price, 0)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(5,13,26,0.7)' }}
        onClick={onClose}
      />

      <aside
        className="absolute right-0 top-0 h-full w-full max-w-md flex flex-col gap-5 overflow-y-auto"
        style={{ background: T.panel, borderLeft: `1px solid ${T.panelEdge}`, padding: '1.5rem' }}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <h2 style={{ fontFamily: font.display, color: T.bone }} className="text-2xl tracking-wide">
            CART
          </h2>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm rounded focus:outline-none"
            style={{ fontFamily: font.body, color: T.muted, border: `1px solid ${T.panelEdge}` }}
          >
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <p style={{ fontFamily: font.body, color: T.muted }} className="text-sm">
            Nothing here yet. Head to the print shop to pick a frame.
          </p>
        ) : (
          <>
            <ul className="space-y-4 flex-1">
              {items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 items-start rounded p-3"
                  style={{ border: `1px solid ${T.panelEdge}` }}
                >
                  <img src={item.photoSrc} alt="" className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <div style={{ fontFamily: font.body, color: T.bone, fontWeight: 600 }} className="text-sm truncate">
                      {item.photoTitle}
                    </div>
                    <div style={{ fontFamily: font.mono, color: T.muted }} className="text-[11px] mt-0.5">
                      {item.size} · {item.paper}
                    </div>
                    <button
                      onClick={() => onRemove(idx)}
                      className="mt-1 text-[11px] underline focus:outline-none"
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

            <div className="pt-4 space-y-3" style={{ borderTop: `1px solid ${T.panelEdge}` }}>
              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: font.body, color: T.bone }}>Total</span>
                <span style={{ fontFamily: font.display, color: T.bone }} className="text-2xl tracking-wide">
                  ${total}
                </span>
              </div>
              <button
                onClick={() => { onClose(); onCheckout() }}
                className="w-full py-3 text-sm rounded font-bold focus:outline-none"
                style={{ fontFamily: font.body, background: T.glow, color: T.ink }}
              >
                Review order
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
