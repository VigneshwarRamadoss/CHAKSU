# CHAKSU (சென்னை / CHENNAI)

> **High-Performance E-Commerce Engine & Editorial Brand Experience**  
> *Statement silhouettes. Engineered for high-density urban movement.*

---

## ⚡ Tech Stack & Architecture

- **Framework:** Next.js 15 (App Router, Server & Client Components)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** CSS Modules with Vanilla Tokens (HSL Color Palettes, Responsive Clamp Units)
- **Commerce Engine:** Dual-Mode Architecture (Shopify Storefront GraphQL API 2026-04 with Mock Fixtures Fallback)
- **Motion & Preloader:** Hardware-accelerated CSS keyframes, Parallax Observer, and K-Cut Cinematic preloader sequence
- **Design Rights & Direction:** **The Dot** Company

---

## 📁 Repository Directory Structure

```
CHAKSU/
├── src/
│   ├── app/                    # Next.js App Router (Pages & Layouts)
│   │   ├── about/              # Brand Philosophy & Creative Rights
│   │   ├── cart/               # Standalone Bag & Checkout handoff
│   │   ├── collections/[handle]# Dynamic Collection Grid
│   │   ├── products/[handle]   # Product Detail Page (PDP)
│   │   ├── search/             # Real-time Client Search Archive
│   │   ├── shop/               # Full Inventory Index
│   │   ├── stories/            # Brand Narrative & Chapters
│   │   ├── icon.svg            # Premium Vector Favicon (The Dot Logo)
│   │   ├── layout.tsx          # Root Layout (CartProvider, ParallaxProvider, Header, Footer)
│   │   └── page.tsx            # Cinematic Homepage Entry
│   ├── components/             # Reusable UI & Motion System
│   │   ├── cart/               # CartDrawer & Checkout UI
│   │   ├── common/             # Common SVG Assets & Branding (TheDotLogo)
│   │   ├── home/               # CinematicPreloader, HeroScene, WordmarkBridge, FeaturedGrid
│   │   ├── layout/             # Navigation Header & Footer
│   │   ├── motion/             # Parallax & Intersection Observer Wrappers
│   │   ├── product/            # MediaGallery, VariantSelector, SizeGuideDialog, PDP
│   │   └── shop/               # FilterDrawer, FilterSidebar, ProductCard, ProductGrid
│   └── lib/                    # Commerce & Data Layers
│       ├── commerce/           # Adapter Interface & Cart Operations (Dual-Mode)
│       ├── data/               # Local Fixtures & Editorial Content
│       ├── motion/             # Preloader Tokens & Parallax Providers
│       └── shopify/            # Storefront GraphQL Client, Queries & Mutations
├── docs/                       # Technical Specifications & Research Reports
│   ├── specs/                  # PRD, TRD, UI/UX Briefs, Typography & Implementation Guides
│   └── reports/                # Cinematic Preloader Direction & Quality Audits
└── public/                     # High-Resolution Product & Editorial Imagery
```

---

## 🔌 Dual-Mode Commerce Architecture

CHAKSU is engineered with an **Adapter Pattern** (`src/lib/commerce/adapter.ts`), ensuring zero coupling between front-end UI components and the commerce backend.

| Environment Mode | Activation Condition | Data Provider | Cart Behavior |
| :--- | :--- | :--- | :--- |
| **Mock Mode (Default)** | Shopify credentials unconfigured | `src/lib/data/fixtures.ts` | LocalStorage state |
| **Live Shopify Mode** | `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` present | Shopify Storefront GraphQL API (2026-04) | Shopify Cart API (`cartId` persisted) |

### Setting Up Shopify Live Credentials
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in your Storefront API credentials:
   ```env
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token_here
   ```

---

## 🎬 K-Cut Cinematic Preloader Controls

The homepage features a 60fps laser/split entry motion sequence.
- **Production Session Persistence:** Plays on initial load; subsequent navigations store a `sessionStorage` flag to prevent repetitive delays.
- **Developer Debug Query Parameters:**
  - `http://localhost:3000/?intro=replay` — Forces the intro animation on every reload (Default in dev mode).
  - `http://localhost:3000/?intro=once` — Test real production single-session behavior.
  - `http://localhost:3000/?intro=hold` — Freezes the laser split stage for visual inspection.
  - `http://localhost:3000/?intro=static` — Bypasses animation for accessibility testing.

---

## 🚀 Quickstart & Development

### Prerequisites
- Node.js `^18.18.0` or `>=20.0.0`
- npm, pnpm, or yarn

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Run TypeScript validation
npx tsc --noEmit

# 4. Build production bundle
npm run build
```

---

## 🎨 Creative Rights & Art Direction

All visual identity systems, art direction, and design rights for **CHAKSU** belong exclusively to **The Dot** company.

```
       ■
     ■ ■ ■
   ■ ■ ■ ■ ■
 ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■
 ■ ■ ■ ■ ■ ■ ■
   ■ ■ ■ ■ ■
     ■ ■ ■
       ■
  T H E   D O T
```
