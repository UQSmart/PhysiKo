# Physics Play — Prototype 0.1

A static, no-backend prototype of the **Hit The Target** playable physics challenge.

## Features

- Projectile-motion simulation rendered with HTML Canvas
- Launch angle and initial velocity controls
- No preview trajectory before firing
- Animated projectile flight
- Hit/miss classification
- Previous-attempt trajectories
- Progressive hints
- Physics score after solving
- Local browser storage only
- Responsive layout
- No backend, database, login, analytics, or external runtime dependency

## Requirements

- Node.js 20+ recommended
- npm
- VS Code (optional, but recommended)

## Run locally

```bash
npm install
npm run dev
```

Vite will print a local URL, normally:

```text
http://localhost:5173
```

Open it in the browser.

## Production build

```bash
npm run build
```

The static production site will be generated in:

```text
dist/
```

You can test the production build locally with:

```bash
npm run preview
```

## Deploy on Cloudflare Pages

### GitHub workflow

1. Create a GitHub repository.
2. Upload/push this whole project.
3. In Cloudflare Dashboard open **Workers & Pages**.
4. Create a new **Pages** project and connect the GitHub repository.
5. Use these build settings:

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
```

6. Deploy.

No environment variables are required.

### Direct Upload

You can also run:

```bash
npm install
npm run build
```

and upload the generated `dist` directory to Cloudflare Pages using Direct Upload.

## Main source files

```text
physics-play-prototype-0.1/
├─ index.html
├─ package.json
├─ README.md
└─ src/
   ├─ main.js
   └─ style.css
```

### `src/main.js`

Contains:

- game state
- projectile physics
- trajectory generation
- Canvas rendering
- controls
- shot animation
- hit detection
- hints
- scoring

Core equations:

```text
x(t) = v cos(theta) t
y(t) = v sin(theta) t - 1/2 g t^2
```

### `src/style.css`

Contains the full responsive UI and visual design.

## Physics constants used in Prototype 0.1

```text
Gravity = 9.81 m/s²
Target distance = 40 m
Target height = 8 m
Hit tolerance = 1.25 m
```

These are constants at the top of `src/main.js` and can be changed easily.

## Next logical iteration — Prototype 0.2

Suggested additions:

- Over The Wall challenge
- Several predefined levels
- Daily Challenge generated from a deterministic date seed
- shareable result card
- encoded challenge parameters in the URL
- high/low trajectory alternate-solution detection

All of those can still work without a backend.
