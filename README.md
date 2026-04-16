# Key Resource Group — Website

Modern multilingual redesign of [krgnow.com](https://www.krgnow.com/).

**Languages:** English (default) · Español · Português

## Features

- Scroll-triggered reveal animations
- Animated stat counters
- Parallax gradient orbs in hero
- Custom cursor (desktop)
- Client-side i18n with persistent language preference
- Spotlight on the 2025 "Best Solo Performance" award
- Fully responsive, no build step required

## Run

Just open `index.html`, or serve locally:

```bash
python3 -m http.server 8080
```

## Structure

```
KRG/
├── index.html
├── css/style.css
├── js/
│   ├── main.js    # scroll reveals, counters, cursor
│   └── i18n.js    # EN/ES/PT dictionary + switcher
└── assets/
```
