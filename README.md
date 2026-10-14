# Physics Play — Prototype 0.5

Static multi-page frontend with seven interactive challenges.

## Challenges

1. **Hit The Target** — projectile motion in 3D
2. **Complete The Loop** — energy + circular motion
3. **Put It in Orbit** — gravitation / orbital mechanics
4. **Zero The Field** — electrostatics
5. **Keep The Gas Alive** — ideal gas law
6. **Cool The Coffee** — Newton cooling + thermal mixing
7. **Build The Shape** — 2D Tangram / spatial geometry

## Tangram features

- Seven traditional tangram pieces
- Classic square target
- Drag and drop
- 45° rotation controls
- Parallelogram flip
- Keyboard movement / rotate / flip support
- Snap-to-solution feedback
- Optional ghost outlines as a hint
- Move counter and timer
- Best-time persistence with `localStorage`
- Spatial score based on moves, time and hints

## Stack

- Vite
- Vanilla JavaScript
- Three.js for the 3D physics challenges
- SVG for Tangram
- HTML/CSS
- No backend
- No database

## Run locally in VS Code

```bash
npm install
npm run dev
```

Open the URL shown by Vite, normally:

```text
http://localhost:5173/
```

## Production build

```bash
npm run build
```

The static output is generated in:

```text
dist/
```

## Cloudflare Pages

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`

No environment variables or backend services are required.
