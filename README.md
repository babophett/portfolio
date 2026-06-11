# North of Treeline — Adventure Portfolio

A Vite + React + TypeScript + Tailwind portfolio site with a print shop.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

---

## Adding a new photo (30 seconds)

**Step 1 — Drop the image into `public/photos/`**

```
public/
  photos/
    sierra.jpg       ← existing
    your-new-photo.jpg   ← add here
```

Any filename works. JPG or WebP recommended. The original resolution is fine —
browsers will load it lazily.

**Step 2 — Add one object to `src/data/photos.ts`**

Open that file and paste a new entry anywhere in the `PHOTOS` array:

```ts
{
  id: 'my-unique-id',          // kebab-case, never reuse an id
  src: '/photos/your-new-photo.jpg',
  title: 'Your Title',
  location: 'Telluride, Colorado',
  coords: '37.93 N, 107.81 W', // or '—' to keep it private
  elevation: '3,100 m',
  season: 'Early winter',
  orientation: 'landscape',    // 'portrait' if taller than wide
  tags: ['ski', 'alpine'],     // pick from: landscape ski alpine desert storm
  collection: ['work'],        // 'work' = gallery, 'about' = About page, or both
  forSale: true,               // false = hides from shop
  priceFrom: 95,               // lowest price (12×18" matte), in USD
},
```

Save. The dev server hot-reloads and the photo appears instantly.

**That's it.** No imports, no component edits — just the data file.

---

## Customise

| What | Where |
|---|---|
| Colours & fonts | `src/types/tokens.ts` |
| Your name / tagline | `src/components/Nav.tsx` and `index.html` `<title>` |
| Bio text | `src/pages/AboutPage.tsx` |
| Print sizes & prices | `src/data/photos.ts` → `PRINT_SIZES` / `PRINT_PAPERS` |
| Hero photo | First item in `PHOTOS` with `collection: ['work']` |
| About photos | Set `collection: ['about']` or `['work', 'about']` on any photo |

---

## Connect a real payment processor

The cart and checkout button are wired up but don't call any payment API.
When you're ready, replace the `onClear()` call in `CartDrawer.tsx` with a
[Stripe Checkout](https://stripe.com/docs/checkout) or
[Shopify Storefront API](https://shopify.dev/docs/api/storefront) request.

---

## Project layout

```
public/
  photos/          ← drop images here
  favicon.svg

src/
  data/
    photos.ts      ← THE file you edit to add photos
  types/
    index.ts       ← CartItem, Page types
    tokens.ts      ← colour + font tokens
  components/
    Nav.tsx
    FieldNote.tsx
    Lightbox.tsx
    CartDrawer.tsx
  pages/
    WorkPage.tsx
    AboutPage.tsx
    ShopPage.tsx
  App.tsx
  main.tsx
  index.css
```
