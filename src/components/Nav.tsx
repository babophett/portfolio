import { Page } from '../types'
import { T, font } from '../types/tokens'

interface Props {
  page: Page
  setPage: (p: Page) => void
  cartCount: number
  onCartOpen: () => void
}

const NAV_LINKS: { id: Page; label: string }[] = [
  { id: 'work',  label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'shop',  label: 'Print shop' },
]

export function Nav({ page, setPage, cartCount, onCartOpen }: Props) {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{ background: 'rgba(5,13,26,0.88)', borderBottom: `1px solid ${T.panelEdge}` }}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => setPage('work')}
          className="text-left focus:outline-none"
        >
          <div style={{ fontFamily: font.display, color: T.bone }} className="text-xl tracking-wide leading-none">
            ISAAC YAP
          </div>
          <div style={{ fontFamily: font.mono, color: T.muted }} className="text-[10px] tracking-widest mt-0.5">
            FIELD LOG
          </div>
        </button>

        {/* Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className="px-3 py-2 text-sm rounded transition-colors focus:outline-none"
              style={{
                fontFamily: font.body,
                color: page === l.id ? T.bone : T.muted,
                borderBottom: page === l.id ? `2px solid ${T.glow}` : '2px solid transparent',
              }}
            >
              {l.label}
            </button>
          ))}

          <button
            onClick={onCartOpen}
            aria-label={`Open cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
            className="ml-2 px-3 py-2 text-sm rounded focus:outline-none"
            style={{
              fontFamily: font.mono,
              color: T.ink,
              background: cartCount > 0 ? T.glow : T.panelEdge,
              transition: 'background 0.2s',
            }}
          >
            Cart{cartCount > 0 ? ` · ${cartCount}` : ''}
          </button>
        </nav>
      </div>
    </header>
  )
}
