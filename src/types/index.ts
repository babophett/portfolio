export type Page = 'work' | 'about' | 'shop' | 'checkout'

export interface CartItem {
  photoId: string
  photoTitle: string
  photoSrc: string
  size: string
  paper: string
  price: number
}
