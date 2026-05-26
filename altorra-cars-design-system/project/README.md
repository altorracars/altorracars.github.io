# Altorra Cars — Design System

## Company Overview

**Altorra Cars** (ALTORRA COMPANY SAS) is a premium used-car marketplace based in **Cartagena, Bolívar, Colombia**. The platform connects buyers and sellers of pre-owned vehicles, emphasizing trust, quality, and professional guidance. The tagline is:

> *"Donde la calidad y la confianza convergen."*
> ("Where quality and trust converge.")

The brand is part of the broader Altorra ecosystem (Altorra Inmobiliaria, etc.) and operates at the intersection of luxury presentation and accessible used-car commerce.

### Products / Surfaces
1. **Marketing Website** — `altorracars.github.io` — the primary consumer-facing product. Spanish-language. Includes home, search/catalog, vehicle detail, brand pages, contact, about us, financing, favorites, auth, admin panel, and a financiamiento simulator.
2. **Admin Panel** — accessible via `/admin` — for managing inventory, dealers, users, reviews, banners, and appointments.

### Sources
- **Codebase**: `altorracars.github.io/` (mounted via File System Access API)
- **GitHub Repo**: `altorracars/altorracars.github.io`
- **Logo file**: `uploads/logo-placeholder (1).png`
- **Live site**: https://altorracars.github.io

---

## CONTENT FUNDAMENTALS

### Language
All copy is in **Spanish (Colombian, es_CO)**. The product targets Colombian consumers, primarily in Cartagena and surroundings.

### Tone
- **Professional but warm.** Formal enough for a financial/vehicle purchase, approachable enough to feel human.
- **Trust-first.** Every message emphasizes reliability, transparency, and expertise: *"estratégica, profesional y orientada a generar valor."*
- **Not flashy.** No exclamation points in headlines. Confident and composed.
- **Concise.** CTAs are short: *"Ver Vehículos"*, *"Registrarse"*, *"Ingresar"*, *"Ver todos"*.

### Casing
- Brand name: **ALL CAPS** — `ALTORRA CARS`, `ALTORRA`, `CARS`
- Nav items: **Title Case** in Spanish — *"Vehículos"*, *"Marcas"*, *"Servicios"*
- Badges/labels: **ALL CAPS** with wide letter-spacing — `PLATAFORMA PREMIUM`, `NUEVO`, `USADO`
- Button copy: **Title Case** — *"Ver Detalles"*, *"Cotizar Financiación"*

### Voice
- Speaks TO the user using **"tú"** (informal second-person): *"Vende tu Auto"*, *"Encuentra el vehículo de tus sueños"*
- Uses **"Nosotros"** for company identity: *"¿Por qué nosotros?"*
- No emoji in UI copy. No slang. No abbreviations.

### Key Copy Examples
- Hero headline: *"Encuentra el Vehículo de tus Sueños"*
- Hero subtext: *"Más de 100 vehículos disponibles. Compra o vende con confianza."*
- Footer tagline: *"Donde la calidad y la confianza convergen. Conectamos oportunidades sobre ruedas..."*
- CTA primary: *"Ver Vehículos"*
- Section badge: *"PLATAFORMA PREMIUM · ALTORRA CARS"*
- Trust stats: *"100+ Vehículos"*, *"18 Marcas"*, *"4.9★ Reseñas"*

---

## VISUAL FOUNDATIONS

### Color System
| Role | Name | Hex |
|------|------|-----|
| Brand gold (primary) | `--gold-primary` | `#d4af37` |
| Brand gold (secondary) | `--gold-secondary` / `--primary-gold` | `#b89658` |
| Gold dark | `--gold-dark` | `#8b6f47` |
| Background deep black | `--black-deep` | `#0a0a0a` |
| Background medium | `--black-medium` | `#1a1a1a` |
| Background light | `--black-light` | `#242424` |
| Text white | `--white-pure` | `#ffffff` |
| Text soft white | `--white-soft` | `#f8f8f8` |
| Text gray | `--gray-medium` | `#b0b0b0` |
| Light bg (alt theme) | `--secondary-light` | `#fafafa` |
| Accent green | `--accent-green` | `#38a28e` |
| Brown (hover state) | `--primary-brown` | `#916652` |

**Color vibe**: Dark-first (near black backgrounds with gold accents). Warm, not cool. No blues used as a primary color. Gold is used for ALL interactive elements, prices, highlights, and CTAs. The gold palette shifts from bright `#d4af37` (attention) to muted `#b89658` (secondary) to dark `#8b6f47` (hover/pressed).

### Typography
**Primary font**: `Poppins` (Google Fonts — loaded from CDN)  
Weights used: 400, 500, 600, 700, 800, 900

- **Display/Hero**: `font-size: clamp(2.4rem, 5.5vw, 4.5rem)`, `font-weight: 900`, `letter-spacing: -0.03em`, `line-height: 1.06`
- **Section titles**: `clamp(1.8rem, 4vw, 2.5rem)`, `font-weight: 700`
- **Body**: `1rem`, `font-weight: 400`, `line-height: 1.6`
- **Labels/badges**: `0.65–0.82rem`, `font-weight: 600–700`, `letter-spacing: 0.08–0.12em`, `text-transform: uppercase`
- **Prices**: `1.3–1.5rem`, `font-weight: 700–800`, gold color
- **Nav**: `0.95rem`, `font-weight: 500`
- **Buttons**: `font-weight: 600–700`, uppercase for header buttons, title-case for CTAs

No serif or monospace fonts used anywhere.

### Spacing Scale
```
xs:  0.5rem  (8px)
sm:  1rem    (16px)
md:  2rem    (32px)
lg:  3rem    (48px)
xl:  4rem    (64px)
```
Container max-width: `1200px`, padding: `0 2rem`.

### Border Radius
```
sm:  4px   (small buttons, tags)
md:  8px   (inputs, standard cards)
lg:  12px  (section cards)
xl:  20px  (glassmorphism cards, category cards)
pill: 100px (hero buttons, search bar, badges)
```

### Shadows
```
sm:  0 2px 4px rgba(29,27,25,0.10)
md:  0 4px 12px rgba(29,27,25,0.15)
lg:  0 8px 24px rgba(29,27,25,0.20)
gold-glow: 0 8px 30px rgba(212,175,55,0.40)
glass:     0 8px 32px rgba(0,0,0,0.37), inset 0 1px 0 rgba(255,255,255,0.15)
```
Hover on dark cards adds a gold outer glow + a `0 0 0 2px var(--gold-secondary)` border ring.

### Backgrounds & Imagery
- **Hero sections**: Full-bleed photography with a dark gradient overlay (`rgba(0,0,0,0.78)` → transparent → `rgba(0,0,0,0.85)`) and subtle gold ambient orb animations.
- **Body background (dark theme)**: `#0a0a0a` — near-pure black.
- **Section dividers**: Gold gradient lines (`linear-gradient(90deg, transparent, #b89658, transparent)`) at 50% opacity between sections.
- **Footer watermark**: Large barely-visible "ALTORRA" text behind content.
- **Imagery vibe**: Warm-toned. Real car photography. No illustrations or hand-drawn elements. Images are `object-fit: cover` with progressive lazy-load fade-in.
- **Gradients**: Used sparingly — only on hero overlays, shimmer effects, and card inner glows. Never as a standalone background color.

### Glassmorphism (Dark Cards)
Dark vehicle cards use:
- `background: rgba(255,255,255,0.08)`
- `backdrop-filter: blur(20px) saturate(180%)`
- `border: 1px solid rgba(255,255,255,0.18)`
- Border turns gold on hover
- Radial gold glow overlay sweeps on hover

### Animations & Motion
- **Entry**: `fadeInUp` — `opacity 0 → 1` + `translateY(28px → 0)` — `0.9s cubic-bezier(0.22, 1, 0.36, 1)` — used on hero content, search bar, badges
- **Hover lift**: `transform: translateY(-5px)` on cards, `-8px` on dark cards; `scale(1.015)` on glass cards
- **Gold shimmer**: `background-position` animation on text gradients, 4s infinite
- **CTA sweep**: Pseudo-element white gradient sweeps left→right on hover (`0.55s ease`)
- **Pulse badge**: Small dot pulses opacity + scale on 2.2s loop
- **Floating particles**: Tiny gold dots rise from bottom on 10–17s loops
- **Ambient orbs**: Blurred gold circles drift slowly in hero corners (16s)
- **Transition default**: `all 0.3s ease`
- **Premium transition**: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`
- No bouncy spring animations. Everything is smooth and deliberate.

### Hover States
- Nav links: gold text + `rgba(184,150,88,0.10)` background tint
- Cards: lift (`translateY`) + enhanced shadow + gold border ring
- Buttons: darken gold (`#b89658`), slight lift, gold glow shadow
- Brand cards: scale up + gold pulse ring radiates outward
- Footer links: gold text + `padding-left: 0.5rem` shift

### Press / Active States
- Buttons: no shrink. Color darkens to `--primary-brown`.
- Mobile tap activates the same hover states (brand cards, etc.)

### Corner Radii Summary
Cards: `12–20px`. Buttons: `4–8px` (outlined) or `100px` (pill). Dropdowns: `8px`. Search bar: `100px`. Badges: `100px`. Favorite button: `50%` (circle).

### Use of Blur & Transparency
- Header: `backdrop-filter: blur(10px)` on white bg; `blur(15px) saturate(180%)` in dark mode
- Dropdowns (dark): `blur(20px) saturate(180%)`
- Hero search bar: `blur(20px)` with `rgba(18,18,18,0.88)` solid fallback
- WhatsApp float button: not blurred, solid gold

---

## ICONOGRAPHY

Icons are **inline SVG** throughout — no external icon font or sprite sheet is used. All icons follow these conventions:

- **Style**: Stroke-based, `stroke-width: 1.6–2`, `stroke-linecap: round`, `stroke-linejoin: round`
- **Size**: Typically `14×14` to `24×24` px in UI elements; larger in feature/service cards
- **Color**: Inherits from parent (`currentColor`) in most cases; gold (`#d4af37`) for decorative use
- **No icon font** (no FontAwesome, no Lucide CDN, etc.)
- **No emoji** in UI — only inline SVG
- **Custom animated SVGs** used in "commercial cards" (car, finance, money icons with CSS keyframe animations)

Key icons used across the site:
- Heart (favorites) — `M20.84 4.61a5.5 5.5...`
- Login arrow — logout/in direction arrow
- Mail, Phone, Pin — footer contact
- WhatsApp — footer + floating button (brand filled SVG)
- Instagram, Facebook — footer social
- Search magnifier — hero search
- Chevron/dropdown arrow — nav (`▾` unicode char)

### Brand Logos
Automaker logos live in `assets/logos/` as `.webp` files:
Toyota, Chevrolet, Nissan, Kia, Mazda, BMW, Hyundai, Ford (+ Audi, Honda, Jeep, Mitsubishi, Renault, Suzuki, VW, Peugeot, FIAT in codebase)

### Category Images
`assets/categories/` — SUV, SEDAN, HATCHBACK, PICKUP (full-bleed `.jpg`)

---

## FILE INDEX

```
/
├── README.md                   ← This file
├── SKILL.md                    ← Agent skill descriptor
├── colors_and_type.css         ← CSS custom properties: colors, type, spacing, shadows
├── assets/
│   ├── logo.png                ← Primary logo (golden wheel with "A")
│   ├── logo-wheel.png          ← High-res isolated wheel logo (transparent bg)
│   ├── heroindex.webp          ← Homepage hero background
│   ├── hero-car.jpg            ← Alt hero car image
│   ├── nosotros-hero.webp      ← About page hero
│   ├── marcas-hero.jpg         ← Brands page hero
│   ├── placeholder-car.jpg     ← Vehicle card placeholder image
│   ├── categories/             ← SUV.jpg, SEDAN.jpg, HATCHBACK.jpg, PICKUP.jpg
│   └── logos/                  ← Automaker .webp logos
├── preview/                    ← Design System tab cards (registered assets)
│   ├── colors-brand.html
│   ├── colors-neutral.html
│   ├── colors-semantic.html
│   ├── type-scale.html
│   ├── type-specimens.html
│   ├── spacing-tokens.html
│   ├── shadows-radii.html
│   ├── buttons.html
│   ├── cards-vehicle.html
│   ├── cards-glass.html
│   ├── nav-header.html
│   ├── badges-tags.html
│   ├── inputs-search.html
│   ├── logo-brand.html
│   └── animations.html
└── ui_kits/
    └── website/
        ├── README.md
        ├── index.html          ← Interactive website prototype
        ├── Header.jsx
        ├── Footer.jsx
        ├── HeroSection.jsx
        ├── VehicleCard.jsx
        ├── SearchBar.jsx
        └── VehicleDetail.jsx
```
