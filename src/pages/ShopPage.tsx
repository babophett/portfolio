import { useState } from 'react'
import { PHOTOS, Photo, PRINT_SIZES, PORTRAIT_PRINT_SIZES, PRINT_PAPERS, AnySizeId, PrintPaperId } from '../data/photos'
import { FieldNote } from '../components/FieldNote'
import { CartItem } from '../types'
import { T, font } from '../types/tokens'

interface Props {
  onAddToCart: (item: CartItem) => void
  onOpen: (photo: Photo) => void
}

export function ShopPage({ onAddToCart, onOpen }: Props) {
  const forSale    = PHOTOS.filter((p) => p.forSale)
  const portraits  = forSale.filter((p) => p.orientation === 'portrait')
  const landscapes = forSale.filter((p) => p.orientation === 'landscape')
  const half       = Math.ceil(landscapes.length / 2)
  const leftCol    = landscapes.slice(0, half)
  const rightCol   = landscapes.slice(half)

  return (
    <main className="max-w-6xl mx-auto px-5 py-12">
      <div style={{ fontFamily: font.mono, color: T.glow }} className="text-xs tracking-widest mb-4">
        PRINT SHOP
      </div>
      <h1
        style={{ fontFamily: font.display, color: T.bone, lineHeight: 0.95 }}
        className="text-4xl sm:text-6xl tracking-wide"
      >
        LIMITED PRINTS,<br />
        SIGNED & NUMBERED.
      </h1>
      <p style={{ fontFamily: font.body, color: T.muted }} className="mt-5 max-w-xl leading-relaxed">
        Every photographic print is produced in-house, using archival grade pigmented ink on premium archival photo paper. Each print includes a hand signed and numbered certificate of authenticity by the artist Isaac Yap with its field note. 
      </p>
       <p style={{ fontFamily: font.body, color: T.muted }} className="mt-5 max-w-xl leading-relaxed">
        Unframed prints are rolled on shipping roll with a protective layer of acid-free paper and an additional layer of foam in a sturdy shipping box. 
        We recommend only unrolling the print with your trusted local framer to ensure that it is kept in-tact prior to framing. Unframed prints ship for free in the US, international orders have a flat fee of $50.
      </p>
      <p style={{ fontFamily: font.body, color: T.muted }} className="mt-5 max-w-xl leading-relaxed">
        Special print requests or custom framing can be directed to support@isaacyap.us
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-12 items-start">
        <div className="flex flex-col gap-6">
          {leftCol.map((p) => (
            <ShopCard key={p.id} photo={p} onAddToCart={onAddToCart} onOpen={onOpen} />
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {portraits.map((p) => (
            <ShopCard key={p.id} photo={p} onAddToCart={onAddToCart} onOpen={onOpen} />
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {rightCol.map((p) => (
            <ShopCard key={p.id} photo={p} onAddToCart={onAddToCart} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </main>
  )
}

// ── Shop card ────────────────────────────────────────────────────

interface CardProps {
  photo: Photo
  onAddToCart: (item: CartItem) => void
  onOpen: (photo: Photo) => void
}

function ShopCard({ photo, onAddToCart, onOpen }: CardProps) {
  const VERTICAL_IDS = ['fuji-silhouette', 'alpine-torrent']
  const sizes = VERTICAL_IDS.includes(photo.id) ? PORTRAIT_PRINT_SIZES : PRINT_SIZES
  const [sizeId, setSizeId] = useState<AnySizeId>(sizes[0].id)
  const [paperId, setPaperId] = useState<PrintPaperId>(PRINT_PAPERS[0].id)
  const [added, setAdded] = useState(false)

  const size  = sizes.find((s) => s.id === sizeId)!
  const paper = PRINT_PAPERS.find((p) => p.id === paperId)!
  const price = photo.priceFrom + size.priceDelta + paper.priceDelta

  const handleAdd = () => {
    onAddToCart({
      photoId:    photo.id,
      photoTitle: photo.title,
      photoSrc:   photo.src,
      size:       size.label,
      paper:      paper.label,
      price,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div
      className="rounded overflow-hidden flex flex-col"
      style={{ background: T.panel, border: `1px solid ${T.panelEdge}` }}
    >
      <img
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        className="w-full block cursor-zoom-in"
        onClick={() => onOpen(photo)}
      />

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div>
          <div style={{ fontFamily: font.body, color: T.bone, fontWeight: 600 }}>{photo.title}</div>
          <FieldNote photo={photo} />
        </div>

        {/* Size picker */}
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s.id}
              onClick={() => setSizeId(s.id)}
              className="px-3 py-1.5 text-xs rounded focus:outline-none"
              style={{
                fontFamily: font.mono,
                color:      sizeId === s.id ? T.ink  : T.muted,
                background: sizeId === s.id ? T.bone : 'transparent',
                border: `1px solid ${sizeId === s.id ? T.bone : T.panelEdge}`,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Paper picker */}
        <div className="flex flex-wrap gap-2">
          {PRINT_PAPERS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPaperId(p.id)}
              className="px-3 py-1.5 text-xs rounded focus:outline-none"
              style={{
                fontFamily: font.mono,
                color:      paperId === p.id ? T.ink  : T.muted,
                background: paperId === p.id ? T.bone : 'transparent',
                border: `1px solid ${paperId === p.id ? T.bone : T.panelEdge}`,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Price + CTA */}
        <div
          className="mt-auto flex items-center justify-between pt-3"
          style={{ borderTop: `1px solid ${T.panelEdge}` }}
        >
          <div style={{ fontFamily: font.display, color: T.bone }} className="text-2xl tracking-wide">
            ${price}
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2.5 text-sm rounded font-semibold focus:outline-none transition-colors"
            style={{
              fontFamily: font.body,
              background: added ? T.bone : T.glow,
              color: T.ink,
            }}
          >
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
