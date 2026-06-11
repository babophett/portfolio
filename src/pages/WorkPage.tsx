import { useState } from 'react'
import { PHOTOS, Photo } from '../data/photos'
import { FieldNote } from '../components/FieldNote'
import { T, font } from '../types/tokens'

const ALL_TAGS = ['landscape', 'ski', 'alpine', 'desert', 'storm', 'coastal'] as const
type Tag = typeof ALL_TAGS[number]

interface Props {
  onOpen: (photo: Photo) => void
  onGoShop: () => void
}

export function WorkPage({ onOpen, onGoShop }: Props) {
  const [activeTag, setActiveTag] = useState<Tag | null>(null)

  const workPhotos = PHOTOS.filter((p) => p.collection.includes('work'))
  const hero = workPhotos.find((p) => p.id === 'oeschinen-alpenglow') ?? workPhotos[0]

  const filtered = activeTag
    ? workPhotos.filter((p) => p.tags.includes(activeTag))
    : workPhotos

  const usedTags = ALL_TAGS.filter((t) =>
    workPhotos.some((p) => p.tags.includes(t))
  )

  return (
    <main>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-10 pb-16 grid md:grid-cols-2 gap-10 items-end">
        <div>
          <div style={{ fontFamily: font.mono, color: T.glow }} className="text-xs tracking-widest mb-4">
            FIELD LOG · EST. 2022
          </div>
          <h1
            style={{ fontFamily: font.display, color: T.bone, lineHeight: 0.95 }}
            className="text-5xl sm:text-7xl tracking-wide"
          >
            FINE ART<br />
            PRINTS BY<br />
            <span style={{ color: T.glow }}>ISAAC YAP.</span>
          </h1>
          <p style={{ fontFamily: font.body, color: T.muted }} className="mt-6 max-w-md text-base leading-relaxed">
            Landscape photography from the mountains, backcountry, and beyond.
            Available as archival fine art prints.
          </p>
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-3 text-sm rounded focus:outline-none"
              style={{ fontFamily: font.body, background: T.glow, color: T.ink, fontWeight: 600 }}
            >
              View the work
            </button>
            <button
              onClick={onGoShop}
              className="px-5 py-3 text-sm rounded focus:outline-none"
              style={{ fontFamily: font.body, border: `1px solid ${T.panelEdge}`, color: T.bone }}
            >
              Buy a print
            </button>
          </div>
        </div>

        {hero && (
          <button
            onClick={() => onOpen(hero)}
            className="block w-full focus:outline-none rounded overflow-hidden group text-left"
          >
            <img
              src={hero.src}
              alt={hero.title}
              className="w-full max-h-[78vh] object-cover rounded transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="pt-3">
              <FieldNote photo={hero} />
            </div>
          </button>
        )}
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-6xl mx-auto px-5 pb-24">
        <div
          className="flex flex-wrap items-center justify-between gap-3 mb-6 pt-6"
          style={{ borderTop: `1px solid ${T.panelEdge}` }}
        >
          <h2 style={{ fontFamily: font.display, color: T.bone }} className="text-2xl tracking-wide">
            SELECTED FRAMES
          </h2>

          {/* Tag filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className="px-3 py-1 text-xs rounded focus:outline-none"
              style={{
                fontFamily: font.mono,
                color: activeTag === null ? T.ink : T.muted,
                background: activeTag === null ? T.bone : 'transparent',
                border: `1px solid ${activeTag === null ? T.bone : T.panelEdge}`,
              }}
            >
              All
            </button>
            {usedTags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(activeTag === t ? null : t)}
                className="px-3 py-1 text-xs rounded focus:outline-none capitalize"
                style={{
                  fontFamily: font.mono,
                  color: activeTag === t ? T.ink : T.muted,
                  background: activeTag === t ? T.glow : 'transparent',
                  border: `1px solid ${activeTag === t ? T.glow : T.panelEdge}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ fontFamily: font.mono, color: T.muted }} className="text-xs w-full sm:w-auto">
            {filtered.length} / {workPhotos.length} FRAMES
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpen(p)}
              className="mb-5 w-full break-inside-avoid text-left rounded overflow-hidden focus:outline-none group"
              style={{ background: T.panel, border: `1px solid ${T.panelEdge}` }}
            >
              <div className="overflow-hidden">
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4">
                <div style={{ fontFamily: font.body, color: T.bone, fontWeight: 600 }} className="text-sm mb-1">
                  {p.title}
                </div>
                <FieldNote photo={p} />
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
