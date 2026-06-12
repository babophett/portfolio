import { PHOTOS } from '../data/photos'
import { T, font } from '../types/tokens'

interface Props {
  onGoShop: () => void
}

export function AboutPage({ onGoShop }: Props) {
  const aboutPhotos = PHOTOS.filter((p) => p.collection.includes('about'))
  const landscapes = aboutPhotos.filter((p) => p.orientation === 'landscape')
  const portraits  = aboutPhotos.filter((p) => p.orientation === 'portrait')

  return (
    <main className="max-w-6xl mx-auto px-5 py-12">
      <div style={{ fontFamily: font.mono, color: T.glow }} className="text-xs tracking-widest mb-4">
        ABOUT THE PHOTOGRAPHER
      </div>
      <h1
        style={{ fontFamily: font.display, color: T.bone, lineHeight: 0.95 }}
        className="text-4xl sm:text-6xl tracking-wide max-w-3xl"
      >
        DAWN. TWILIGHT.{' '}
        <span style={{ color: T.glow }}>REPEAT.</span>
      </h1>

      {/* Bio row */}
      <div className="grid md:grid-cols-3 gap-8 mt-10 mb-10 items-start">
        <div className="md:col-span-2 space-y-4">
          <p style={{ fontFamily: font.body, color: T.muted }} className="leading-relaxed">
            My name is Isaac. Most of these frames started as a forecast worth chasing. A storm cycle, a clearing window, dawn patrol. I am constantly chasing the edges of day, storms, and the people in between.
          </p>
          <p style={{ fontFamily: font.body, color: T.muted }} className="leading-relaxed">
            Winters are spent in the Colorado backcountry and Eastern Sierras. Summers are reserved for the surf and the vertical realm.
          </p>
          <p style={{ fontFamily: font.body, color: T.muted }} className="leading-relaxed">
            Contact me for inquiries and print special requests: support@isaacyap.us
          </p>
        </div>
        <div className="space-y-4">
          <div
            className="rounded p-4"
            style={{ background: T.panel, border: `1px solid ${T.panelEdge}` }}
          >
            <div style={{ fontFamily: font.mono, color: T.bone }} className="text-xs tracking-widest mb-3">
              FIELD KIT
            </div>
            <ul style={{ fontFamily: font.mono, color: T.muted }} className="text-xs space-y-2 leading-relaxed">
              <li>▮ Fujifilm X-series + 16-55 / 70-300</li>
              <li>▮ Ski-to-camera ratio: perpetually unresolved</li>
            </ul>
          </div>
          <button
            onClick={onGoShop}
            className="w-full px-5 py-3 text-sm rounded focus:outline-none"
            style={{ fontFamily: font.body, background: T.glow, color: T.ink, fontWeight: 600 }}
          >
            Take a frame home
          </button>
        </div>
      </div>

      {/* Photo grid — landscape spans 2 cols, portrait spans 1 col */}
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-3 gap-3">
          {landscapes.flatMap((land, i) => {
            const port = portraits[i]
            const reversed = i === 1

            const landFig = (
              <figure
                key={land.id}
                className="col-span-2 rounded overflow-hidden"
                style={{ height: 220, background: T.panel, border: `1px solid ${T.panelEdge}` }}
              >
                <img src={land.src} alt={land.title} className="w-full h-full object-cover" />
              </figure>
            )
            const portFig = port ? (
              <figure
                key={port.id}
                className="col-span-1 rounded overflow-hidden"
                style={{ height: 220, background: T.panel, border: `1px solid ${T.panelEdge}` }}
              >
                <img src={port.src} alt={port.title} className="w-full h-full object-cover" />
              </figure>
            ) : null

            return reversed && portFig ? [portFig, landFig] : portFig ? [landFig, portFig] : [landFig]
          })}
          {portraits.slice(landscapes.length).map((port) => (
            <figure
              key={port.id}
              className="col-span-1 rounded overflow-hidden"
              style={{ height: 220, background: T.panel, border: `1px solid ${T.panelEdge}` }}
            >
              <img src={port.src} alt={port.title} className="w-full h-full object-cover" />
            </figure>
          ))}
        </div>
      </div>
    </main>
  )
}
