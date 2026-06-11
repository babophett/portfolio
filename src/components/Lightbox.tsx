import { useEffect, useCallback } from 'react'
import { Photo } from '../data/photos'
import { FieldNote } from './FieldNote'
import { T, font } from '../types/tokens'

interface Props {
  photo: Photo | null
  onClose: () => void
  onGoShop: () => void
}

export function Lightbox({ photo, onClose, onGoShop }: Props) {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )

  useEffect(() => {
    if (!photo) return
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [photo, onKeyDown])

  if (!photo) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: 'rgba(5,13,26,0.93)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <div
        className="max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.title}
          className="w-full max-h-[72vh] object-contain rounded"
        />
        <div className="flex flex-wrap items-end justify-between gap-3 mt-4">
          <div>
            <div style={{ fontFamily: font.display, color: T.bone }} className="text-2xl tracking-wide">
              {photo.title.toUpperCase()}
            </div>
            <FieldNote photo={photo} />
          </div>
          <div className="flex gap-2">
            {photo.forSale && (
              <button
                onClick={onGoShop}
                className="px-4 py-2 text-sm rounded focus:outline-none"
                style={{ fontFamily: font.body, background: T.glow, color: T.ink, fontWeight: 600 }}
              >
                Buy print — from ${photo.priceFrom}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded focus:outline-none"
              style={{ fontFamily: font.body, color: T.bone, border: `1px solid ${T.panelEdge}` }}
            >
              Close  <span style={{ color: T.muted, fontSize: 11 }}>esc</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
