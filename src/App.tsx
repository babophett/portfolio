import { useState } from 'react'
import { Nav } from './components/Nav'
import { Lightbox } from './components/Lightbox'
import { CartDrawer } from './components/CartDrawer'
import { WorkPage } from './pages/WorkPage'
import { AboutPage } from './pages/AboutPage'
import { ShopPage } from './pages/ShopPage'
import { ThankYouPage } from './pages/ThankYouPage'
import { Photo } from './data/photos'
import { CartItem, Page } from './types'
import { T, font } from './types/tokens'

export default function App() {
  const [page, setPage] = useState<Page>('work')
  const [lightbox, setLightbox] = useState<Photo | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const orderStatus = new URLSearchParams(window.location.search).get('order')
  const isThankYou = orderStatus === 'success'

  const navigate = (p: Page) => {
    setPage(p)
    setLightbox(null)
    window.history.replaceState({}, '', window.location.pathname)
    window.scrollTo({ top: 0 })
  }

  return (
    <div style={{ background: T.ink, minHeight: '100vh' }}>
      {orderStatus === 'cancelled' && (
        <div
          className="text-center py-3 text-sm"
          style={{ background: T.panel, color: T.muted, fontFamily: font.body, border: `1px solid ${T.panelEdge}` }}
        >
          Checkout cancelled — your cart is still saved.
        </div>
      )}
      <Nav
        page={page}
        setPage={navigate}
        cartCount={cart.length}
        onCartOpen={() => setCartOpen(true)}
      />

      {isThankYou ? (
        <ThankYouPage onGoShop={() => navigate('shop')} onGoWork={() => navigate('work')} />
      ) : (
        <>
          {page === 'work'  && <WorkPage  onOpen={setLightbox} onGoShop={() => navigate('shop')} />}
          {page === 'about' && <AboutPage onGoShop={() => navigate('shop')} />}
          {page === 'shop'  && <ShopPage  onAddToCart={(item) => setCart((c) => [...c, item])} onOpen={setLightbox} />}
        </>
      )}

      <footer
        className="max-w-6xl mx-auto px-5 py-10 flex flex-wrap gap-4 items-center justify-between"
        style={{ borderTop: `1px solid ${T.panelEdge}` }}
      >
        <div style={{ fontFamily: font.mono, color: T.muted }} className="text-xs tracking-widest">
          © {new Date().getFullYear()} ISAAC YAP · ALL FRAMES SHOT ON LOCATION
        </div>
        <div style={{ fontFamily: font.mono, color: T.muted }} className="text-xs">
          PRINTS SHIP WORLDWIDE
        </div>
      </footer>

      <Lightbox
        photo={lightbox}
        onClose={() => setLightbox(null)}
        onGoShop={() => navigate('shop')}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={(idx) => setCart((c) => c.filter((_, i) => i !== idx))}
      />
    </div>
  )
}
