# Physics Play — Prototype 0.3

Static multi-page Vite prototype with four interactive physics challenges.

## Challenges

1. **Hit The Target** — 3D projectile motion. Rotate the cannon, choose elevation and launch speed, zoom/orbit the scene, and hit the target.
2. **Complete The Loop** — energy + circular motion. Choose the cart's starting height and discover the minimum height needed to remain on the loop.
3. **Put It in Orbit** — gravitation. Launch a satellite from 400 km above Earth and choose speed/direction to create a full stable orbit.
4. **Zero The Field** — electrostatics. Move a charge until the two electric-field contributions cancel at a probe point.

## Stack

- Vite
- Vanilla JavaScript
- Three.js / WebGL
- OrbitControls
- HTML/CSS
- No backend
- No database

## Run in VS Code

```bash
npm install
npm run dev
```

Open the local URL displayed by Vite, normally `http://localhost:5173/`.

## Production build

```bash
npm run build
```

Vite generates the static site in `dist/`.

## Cloudflare Pages

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`

No environment variables or backend are required.

## Physics notes

### Hit The Target

3D projectile equations with horizontal azimuth `φ` and elevation `θ`:

```text
x(t) = v₀ cos(θ) cos(φ) t
z(t) = v₀ cos(θ) sin(φ) t
y(t) = v₀ sin(θ) t − ½gt²
```

### Complete The Loop

Uses conservation of energy and the contact condition at the top of the loop. The theoretical minimum release height is:

```text
h_min = 2.5 R
```

### Put It in Orbit

Uses a central Newtonian two-body gravity model with Earth values:

```text
a = −μ r / |r|³
v_circular = √(μ/r)
```

The trajectory is numerically integrated in the orbital plane and classified as crash, orbit, or escape.

### Zero The Field

Uses Coulomb's law and superposition:

```text
E = k |Q| / r²
E_net = E₁ + E₂
```

The fixed charge is +4 μC at `x = −4 m`, the probe is at `x = 0`, and the movable charge is +1 μC. The exact zero-field position is `x = +2 m`.
