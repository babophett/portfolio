import { Photo } from '../data/photos'
import { T, font } from '../types/tokens'

interface Props {
  photo: Photo
}

export function FieldNote({ photo }: Props) {
  return (
    <div
      style={{ fontFamily: font.mono, color: T.muted }}
      className="text-[11px] leading-relaxed tracking-wide"
    >
      <span style={{ color: T.glow }}>▮ </span>
      {photo.location} · {photo.coords} · {photo.elevation} · {photo.season}
    </div>
  )
}
