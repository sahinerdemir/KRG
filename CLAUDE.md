# KRG — Key Resource Group Website

Modern redesign of https://www.krgnow.com/ built as a static multilingual site.

## Project

Client: **Key Resource Group, LLC** — IT, healthcare technology & executive recruiting firm.
Location: Santa Rosa Beach, FL. Founded/led by Kyle Cravens (20-year industry veteran).

**Key selling points emphasized in the design:**
- 2025 **"Best Solo Performance"** award (emerging tech / autonomous vehicles) — given dedicated spotlight section
- 20+ years in IT recruiting, 500+ placements filled
- Strategic partnerships: HireArt, BOSS

## Stack

Pure static site — no build step, no dependencies. Deployable as-is.

- `index.html` — single-page layout with anchor-based navigation
- `css/style.css` — dark theme, gradient orbs, scroll-reveal, custom cursor, marquee
- `js/main.js` — IntersectionObserver reveals, animated stat counters, parallax orbs, custom cursor, mobile menu
- `js/i18n.js` — client-side i18n dictionary + language switcher, persists choice in `localStorage`
- `assets/` — reserved for future imagery

Fonts: Google Fonts (Inter + Space Grotesk) via CDN.

## Languages

Primary: **English**. Also supports Spanish (`es`) and Portuguese (`pt`).
- Dictionary in `js/i18n.js` → `translations`
- All translated nodes use `data-i18n="key.path"`
- Language detection: localStorage → browser lang → English default
- Switcher in the top-right of the nav

To add a new string: add the key to all three language blocks in `i18n.js`, then add `data-i18n="..."` to the corresponding element in `index.html`.

## Running locally

Open `index.html` directly in a browser, or:
```
python3 -m http.server 8080
```

## Design notes

- Hero: animated gradient orbs + grid overlay + animated marquee of tech keywords
- Scroll reveals via `.reveal` / `.reveal-left` / `.reveal-right` classes — IntersectionObserver adds `.visible`
- Stat counter animation fires when `.stat` enters viewport
- Custom cursor (dot + trailing ring) hidden on screens < 901px
- Award section has conic-gradient rotating glow on the trophy card
- Respects `prefers-reduced-motion`

## Content source

All copy was extracted from https://www.krgnow.com/ and rewritten for the English version, then translated to Spanish and Portuguese. No content was invented — awards, stats and services all come from the original site.
