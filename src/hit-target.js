import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const G = 9.81;
const TARGET = { x: 40, y: 8, z: 10 };
const TARGET_HORIZONTAL_DISTANCE = Math.hypot(TARGET.x, TARGET.z);
const TARGET_AZIMUTH = Math.atan2(TARGET.z, TARGET.x) * 180 / Math.PI;
const HIT_RADIUS_M = 1.25;

const state = {
  angle: 35,
  azimuth: Number(TARGET_AZIMUTH.toFixed(1)),
  velocity: 23,
  attempts: [],
  isAnimating: false,
  solved: false,
  hintsUsed: 0,
  currentHint: 0,
  cameraMode: 'overview',
};

const app = document.querySelector('#app');

app.innerHTML = `
  <main class="shell">
    <header class="topbar">
      <a class="back-link" href="./index.html">← Challenges</a>
      <div class="brand-wrap">
        <div class="logo-mark">Φ</div>
        <div>
          <div class="brand">PHYSICS PLAY</div>
          <div class="tagline">Predict it. Play it. Understand it.</div>
        </div>
      </div>
      <div class="prototype-badge">PROTOTYPE 0.1 · 3D+ AIM / ZOOM</div>
    </header>

    <section class="hero">
      <div>
        <div class="eyebrow">CHALLENGE #001 · PROJECTILE MOTION</div>
        <h1>Hit The Target</h1>
        <p>Now the cannon can rotate horizontally and vertically. Aim in full 3D, then fire. In overview mode you can drag to orbit the scene and zoom in or out.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Forward distance</span><strong>${TARGET.x} m</strong></div>
        <div><span>Lateral offset</span><strong>${TARGET.z} m</strong></div>
        <div><span>Target height</span><strong>${TARGET.y} m</strong></div>
      </div>
    </section>

    <section class="workspace">
      <article class="sim-card">
        <div class="sim-toolbar">
          <div class="status-wrap">
            <span class="status-dot" id="statusDot"></span>
            <span id="statusText">Ready for prediction</span>
          </div>
          <div class="toolbar-actions">
            <div class="camera-switch" aria-label="Camera mode">
              <button class="camera-btn active" id="overviewBtn" type="button">Overview</button>
              <button class="camera-btn" id="followBtn" type="button">Follow</button>
            </div>
            <div class="zoom-switch" aria-label="Zoom controls">
              <button class="camera-btn" id="zoomOutBtn" type="button">−</button>
              <button class="camera-btn" id="zoomInBtn" type="button">+</button>
            </div>
            <button class="ghost-btn" id="resetViewBtn" type="button">Reset view</button>
            <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
          </div>
        </div>

        <div class="scene-wrap" id="sceneWrap">
          <div id="threeScene" class="three-scene" aria-label="3D projectile motion simulation"></div>
          <div class="scene-overlay" id="sceneOverlay">
            <div class="overlay-kicker">YOUR MISSION</div>
            <div class="overlay-title">Hit the center of the target</div>
            <div class="overlay-copy">Drag to orbit, scroll to zoom. No preview trajectory before the shot.</div>
          </div>
          <div class="scene-readout">
            <span>3D VIEW</span>
            <strong id="cameraLabel">OVERVIEW</strong>
          </div>
          <div class="camera-hint">Overview mode: drag to orbit · scroll / buttons to zoom</div>
        </div>

        <div class="legend">
          <span><i class="legend-line previous"></i> Previous attempts</span>
          <span><i class="legend-line current"></i> Current shot</span>
          <span class="legend-note">Physics is now fully 3D in space: horizontal aim + launch elevation.</span>
        </div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR PREDICTION</div>

        <div class="control-block">
          <div class="control-head">
            <label for="azimuthRange">Horizontal direction</label>
            <output id="azimuthOutput">${TARGET_AZIMUTH.toFixed(1)}°</output>
          </div>
          <input id="azimuthRange" type="range" min="-30" max="30" step="0.1" value="${TARGET_AZIMUTH.toFixed(1)}" />
          <input id="azimuthNumber" class="number-input" type="number" min="-30" max="30" step="0.1" value="${TARGET_AZIMUTH.toFixed(1)}" />
        </div>

        <div class="control-block">
          <div class="control-head">
            <label for="angleRange">Launch angle</label>
            <output id="angleOutput">35°</output>
          </div>
          <input id="angleRange" type="range" min="10" max="80" step="1" value="35" />
          <input id="angleNumber" class="number-input" type="number" min="10" max="80" step="1" value="35" />
        </div>

        <div class="control-block">
          <div class="control-head">
            <label for="velocityRange">Launch speed</label>
            <output id="velocityOutput">23.0 m/s</output>
          </div>
          <input id="velocityRange" type="range" min="8" max="45" step="0.1" value="23" />
          <input id="velocityNumber" class="number-input" type="number" min="8" max="45" step="0.1" value="23" />
        </div>

        <button class="fire-btn" id="fireBtn" type="button">
          <span>FIRE</span><span class="fire-icon">↗</span>
        </button>

        <div class="result-box" id="resultBox">
          <div class="result-kicker">NO SHOTS YET</div>
          <div class="result-main">Aim in 3D and make your prediction.</div>
          <div class="result-sub">Set direction, angle and speed. Your trajectory will appear only after you fire.</div>
        </div>

        <div class="attempts" id="attemptsList"></div>
      </aside>
    </section>

    <section class="learning-grid">
      <article class="panel hint-panel">
        <div class="panel-head">
          <div><div class="section-label">STUCK?</div><h2>Progressive hints</h2></div>
          <div class="hint-counter" id="hintCounter">0 / 3</div>
        </div>
        <div id="hintContent" class="hint-content">Try once before opening a hint. The fewer hints you use, the better your score.</div>
        <button class="secondary-btn" id="hintBtn" type="button">Show hint 1</button>
      </article>

      <article class="panel score-panel">
        <div class="section-label">PHYSICS SCORE</div>
        <div class="score-value" id="scoreValue">—</div>
        <div class="score-breakdown">
          <div><span>Accuracy</span><strong id="accuracyScore">—</strong></div>
          <div><span>Efficiency</span><strong id="efficiencyScore">—</strong></div>
          <div><span>Understanding</span><strong id="understandingScore">100%</strong></div>
        </div>
        <p id="scoreCopy">Solve the challenge to generate your score.</p>
      </article>
    </section>

    <footer>Prototype 0.1 · Three.js + OrbitControls · Static frontend · No backend · Cloudflare Pages ready</footer>
  </main>
`;

const sceneHost = document.querySelector('#threeScene');
const sceneOverlay = document.querySelector('#sceneOverlay');
const azimuthRange = document.querySelector('#azimuthRange');
const azimuthNumber = document.querySelector('#azimuthNumber');
const azimuthOutput = document.querySelector('#azimuthOutput');
const angleRange = document.querySelector('#angleRange');
const angleNumber = document.querySelector('#angleNumber');
const angleOutput = document.querySelector('#angleOutput');
const velocityRange = document.querySelector('#velocityRange');
const velocityNumber = document.querySelector('#velocityNumber');
const velocityOutput = document.querySelector('#velocityOutput');
const fireBtn = document.querySelector('#fireBtn');
const resetBtn = document.querySelector('#resetBtn');
const resetViewBtn = document.querySelector('#resetViewBtn');
const zoomInBtn = document.querySelector('#zoomInBtn');
const zoomOutBtn = document.querySelector('#zoomOutBtn');
const resultBox = document.querySelector('#resultBox');
const attemptsList = document.querySelector('#attemptsList');
const hintBtn = document.querySelector('#hintBtn');
const hintContent = document.querySelector('#hintContent');
const hintCounter = document.querySelector('#hintCounter');
const statusText = document.querySelector('#statusText');
const statusDot = document.querySelector('#statusDot');
const scoreValue = document.querySelector('#scoreValue');
const accuracyScore = document.querySelector('#accuracyScore');
const efficiencyScore = document.querySelector('#efficiencyScore');
const understandingScore = document.querySelector('#understandingScore');
const scoreCopy = document.querySelector('#scoreCopy');
const overviewBtn = document.querySelector('#overviewBtn');
const followBtn = document.querySelector('#followBtn');
const cameraLabel = document.querySelector('#cameraLabel');

const hints = [
  `<strong>Hint 1 · Split the motion in 3D.</strong><br>Think of the shot as horizontal direction + vertical motion. The cannon must point toward the target in the ground plane, while gravity only acts on height.`,
  `<strong>Hint 2 · Resolve the launch velocity.</strong><br><span class="formula">Vh = V cos θ</span><br><span class="formula">Vy = V sin θ</span><br><span class="formula">Vx = Vh cos φ</span><br><span class="formula">Vz = Vh sin φ</span>`,
  `<strong>Hint 3 · Use the 3D projectile equations.</strong><br><span class="formula">x(t) = V cos θ cos φ · t</span><br><span class="formula">z(t) = V cos θ sin φ · t</span><br><span class="formula">y(t) = V sin θ · t − ½gt²</span><br>At the target, x = ${TARGET.x} m, z = ${TARGET.z} m and y = ${TARGET.y} m.`
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatSigned(value) {
  const n = Number(value);
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}°`;
}

// ---------- Physics ----------
function trajectory(angleDeg, azimuthDeg, velocity, maxTime = 10) {
  const angleRad = angleDeg * Math.PI / 180;
  const azimuthRad = azimuthDeg * Math.PI / 180;
  const vh = velocity * Math.cos(angleRad);
  const vx = vh * Math.cos(azimuthRad);
  const vz = vh * Math.sin(azimuthRad);
  const vy = velocity * Math.sin(angleRad);

  const points = [];
  let closest = { distance: Infinity, x: 0, y: 0, z: 0, t: 0 };
  let impact = null;
  let flightTime = null;
  let maxHeight = 0;

  for (let t = 0; t <= maxTime; t += 0.0125) {
    const x = vx * t;
    const z = vz * t;
    const y = vy * t - 0.5 * G * t * t;
    maxHeight = Math.max(maxHeight, y);

    if (x >= 0 && y >= 0) points.push({ x, y, z, t });

    const dist = Math.hypot(x - TARGET.x, y - TARGET.y, z - TARGET.z);
    if (dist < closest.distance) closest = { distance: dist, x, y, z, t };

    if (y < 0 && t > 0.03) {
      const prevT = t - 0.0125;
      const prevX = vx * prevT;
      const prevZ = vz * prevT;
      const prevY = vy * prevT - 0.5 * G * prevT * prevT;
      const ratio = prevY / (prevY - y);
      const impactX = prevX + (x - prevX) * ratio;
      const impactZ = prevZ + (z - prevZ) * ratio;
      impact = {
        x: impactX,
        y: 0,
        z: impactZ,
        horizontal: Math.hypot(impactX, impactZ),
      };
      flightTime = prevT + 0.0125 * ratio;
      break;
    }
  }

  return {
    points,
    closest,
    impact,
    flightTime,
    maxHeight,
    hit: closest.distance <= HIT_RADIUS_M,
    vx,
    vy,
    vz,
  };
}

// ---------- Three.js scene ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0c1324);
scene.fog = new THREE.Fog(0x0c1324, 48, 100);

const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 220);
const overviewPosition = new THREE.Vector3(20, 18, 34);
const overviewTarget = new THREE.Vector3(20, 5, 4);
camera.position.copy(overviewPosition);
camera.lookAt(overviewTarget);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
sceneHost.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 12;
controls.maxDistance = 85;
controls.minPolarAngle = 0.35;
controls.maxPolarAngle = Math.PI / 2.05;
controls.target.copy(overviewTarget);
controls.update();

const hemi = new THREE.HemisphereLight(0xaabaff, 0x142019, 1.6);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffffff, 2.4);
 sun.position.set(18, 28, 16);
 sun.castShadow = true;
 sun.shadow.mapSize.set(2048, 2048);
 sun.shadow.camera.left = -40;
 sun.shadow.camera.right = 40;
 sun.shadow.camera.top = 40;
 sun.shadow.camera.bottom = -30;
 scene.add(sun);

const rim = new THREE.DirectionalLight(0x7887ff, 1.2);
rim.position.set(-10, 10, -20);
scene.add(rim);

const groundMat = new THREE.MeshStandardMaterial({ color: 0x172238, roughness: 0.96, metalness: 0.02 });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(92, 56), groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.set(28, -0.04, 4);
ground.receiveShadow = true;
scene.add(ground);

const grid = new THREE.GridHelper(92, 30, 0x4d5d7e, 0x26344f);
grid.position.set(28, 0, 4);
grid.material.opacity = 0.32;
grid.material.transparent = true;
scene.add(grid);

function makeCannon() {
  const root = new THREE.Group();

  const dark = new THREE.MeshStandardMaterial({ color: 0x222c40, roughness: 0.65, metalness: 0.45 });
  const metal = new THREE.MeshStandardMaterial({ color: 0x9ca9ff, roughness: 0.32, metalness: 0.65 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.7, metalness: 0.35 });

  const turnTable = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.15, 0.35, 24), dark);
  turnTable.position.set(0.15, 0.26, 0);
  turnTable.castShadow = true;
  turnTable.receiveShadow = true;
  root.add(turnTable);

  const base = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.55, 2.0), dark);
  base.position.set(0.3, 0.55, 0);
  base.castShadow = true;
  base.receiveShadow = true;
  root.add(base);

  for (const z of [-1.15, 1.15]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.35, 24), wheelMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(0.1, 0.62, z);
    wheel.castShadow = true;
    root.add(wheel);
  }

  const pivot = new THREE.Group();
  pivot.position.set(0.3, 1.08, 0);
  root.add(pivot);

  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.32, 4.2, 20), metal);
  barrel.rotation.z = -Math.PI / 2;
  barrel.position.x = 2.0;
  barrel.castShadow = true;
  pivot.add(barrel);

  const breech = new THREE.Mesh(new THREE.SphereGeometry(0.48, 24, 16), dark);
  breech.castShadow = true;
  pivot.add(breech);

  const muzzle = new THREE.Object3D();
  muzzle.position.set(4.05, 0, 0);
  pivot.add(muzzle);

  root.userData.pivot = pivot;
  root.userData.muzzle = muzzle;
  return root;
}

const cannon = makeCannon();
scene.add(cannon);

function makeTarget() {
  const group = new THREE.Group();
  group.position.set(TARGET.x, TARGET.y, TARGET.z);

  const poleMat = new THREE.MeshStandardMaterial({ color: 0xd9deeb, roughness: 0.45, metalness: 0.55 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, TARGET.y, 16), poleMat);
  pole.position.set(0.25, -TARGET.y / 2, 0);
  pole.castShadow = true;
  group.add(pole);

  const colors = [0xff5d8f, 0xf5f7ff, 0xff5d8f];
  const radii = [1.55, 1.02, 0.48];
  radii.forEach((radius, index) => {
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 48),
      new THREE.MeshStandardMaterial({ color: colors[index], roughness: 0.55, metalness: 0.08, side: THREE.DoubleSide })
    );
    disc.rotation.y = Math.PI / 2;
    disc.position.x = -0.025 * index;
    disc.castShadow = true;
    group.add(disc);
  });

  const rimMesh = new THREE.Mesh(
    new THREE.TorusGeometry(1.58, 0.07, 12, 48),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.35 })
  );
  rimMesh.rotation.y = Math.PI / 2;
  rimMesh.position.x = -0.08;
  group.add(rimMesh);

  return group;
}

const target = makeTarget();
scene.add(target);

const targetGroundMarker = new THREE.Mesh(
  new THREE.RingGeometry(1.2, 1.55, 36),
  new THREE.MeshBasicMaterial({ color: 0xff5d8f, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
);
targetGroundMarker.rotation.x = -Math.PI / 2;
targetGroundMarker.position.set(TARGET.x, 0.02, TARGET.z);
scene.add(targetGroundMarker);

const distanceLineMaterial = new THREE.LineDashedMaterial({ color: 0x8f9ab5, dashSize: 0.55, gapSize: 0.38, transparent: true, opacity: 0.55 });
const distanceLineGeometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, 0.03, 0),
  new THREE.Vector3(TARGET.x, 0.03, TARGET.z),
]);
const distanceLine = new THREE.Line(distanceLineGeometry, distanceLineMaterial);
distanceLine.computeLineDistances();
scene.add(distanceLine);

const projectile = new THREE.Mesh(
  new THREE.SphereGeometry(0.33, 28, 18),
  new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x4854b8, emissiveIntensity: 0.55, roughness: 0.25, metalness: 0.25 })
);
projectile.castShadow = true;
projectile.visible = false;
scene.add(projectile);

const projectileLight = new THREE.PointLight(0x7f8cff, 2.2, 7, 2);
projectileLight.visible = false;
scene.add(projectileLight);

const muzzleFlash = new THREE.Mesh(
  new THREE.SphereGeometry(0.42, 16, 12),
  new THREE.MeshBasicMaterial({ color: 0xffd77a, transparent: true, opacity: 0.0 })
);
scene.add(muzzleFlash);

const trajectoryGroup = new THREE.Group();
scene.add(trajectoryGroup);
let activeLine = null;

function pointsToVectors(points) {
  return points.map((p) => new THREE.Vector3(p.x, p.y + 0.16, p.z));
}

function makeTrajectoryLine(points, previous = false) {
  const geometry = new THREE.BufferGeometry().setFromPoints(pointsToVectors(points));
  const material = previous
    ? new THREE.LineDashedMaterial({ color: 0x98a5c4, dashSize: 0.6, gapSize: 0.42, transparent: true, opacity: 0.34 })
    : new THREE.LineBasicMaterial({ color: 0x8f9cff, transparent: true, opacity: 0.95 });
  const line = new THREE.Line(geometry, material);
  if (previous) line.computeLineDistances();
  return line;
}

function clearTrajectoryObjects() {
  while (trajectoryGroup.children.length) {
    const obj = trajectoryGroup.children[0];
    trajectoryGroup.remove(obj);
    obj.geometry?.dispose?.();
    obj.material?.dispose?.();
  }
  activeLine = null;
}

function rebuildPreviousTrajectories() {
  clearTrajectoryObjects();
  state.attempts.forEach((attempt) => trajectoryGroup.add(makeTrajectoryLine(attempt.path, true)));
}

function updateCannonAim() {
  const angleRad = state.angle * Math.PI / 180;
  const azimuthRad = state.azimuth * Math.PI / 180;
  cannon.rotation.y = azimuthRad;
  cannon.userData.pivot.rotation.z = angleRad;
}

function barrelMuzzlePosition() {
  const pos = new THREE.Vector3();
  cannon.userData.muzzle.getWorldPosition(pos);
  return pos;
}

function resetOverviewCamera() {
  camera.position.copy(overviewPosition);
  controls.target.copy(overviewTarget);
  controls.update();
}

function setCameraMode(mode) {
  state.cameraMode = mode;
  const overview = mode === 'overview';
  overviewBtn.classList.toggle('active', overview);
  followBtn.classList.toggle('active', !overview);
  cameraLabel.textContent = mode.toUpperCase();
  controls.enabled = overview;
  if (overview) resetOverviewCamera();
}

function zoomCamera(scale) {
  if (state.cameraMode !== 'overview') return;
  const offset = new THREE.Vector3().subVectors(camera.position, controls.target).multiplyScalar(scale);
  const nextDistance = offset.length();
  if (nextDistance < controls.minDistance || nextDistance > controls.maxDistance) return;
  camera.position.copy(controls.target.clone().add(offset));
  controls.update();
}

function updateFollowCamera(point) {
  const azimuthRad = state.azimuth * Math.PI / 180;
  const forward = new THREE.Vector3(Math.cos(azimuthRad), 0, Math.sin(azimuthRad));
  const side = new THREE.Vector3(-forward.z, 0, forward.x);
  const desired = new THREE.Vector3(point.x, point.y, point.z)
    .addScaledVector(forward, -8)
    .addScaledVector(side, 5.5)
    .add(new THREE.Vector3(0, 4.5, 0));
  camera.position.lerp(desired, 0.12);
  camera.lookAt(new THREE.Vector3(point.x + forward.x * 4.8, Math.max(2.0, point.y + 0.5), point.z + forward.z * 4.8));
}

function pulseTarget() {
  target.scale.set(1.12, 1.12, 1.12);
  const start = performance.now();
  function animate(now) {
    const p = Math.min(1, (now - start) / 420);
    const s = 1.12 - 0.12 * p;
    target.scale.set(s, s, s);
    if (p < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

function resizeRenderer() {
  const width = Math.max(1, sceneHost.clientWidth);
  const height = Math.max(1, sceneHost.clientHeight);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

const resizeObserver = new ResizeObserver(resizeRenderer);
resizeObserver.observe(sceneHost);
resizeRenderer();
updateCannonAim();

let lastFrame = performance.now();
function renderLoop(now) {
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  if (state.cameraMode === 'overview') {
    controls.update();
  } else if (!state.isAnimating) {
    camera.position.lerp(overviewPosition, 1 - Math.pow(0.001, dt));
    camera.lookAt(overviewTarget);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);

// ---------- Controls ----------
function bindPair(rangeEl, numberEl, outputEl, key, format) {
  const sync = (value) => {
    const min = Number(rangeEl.min);
    const max = Number(rangeEl.max);
    const numeric = Number(value);
    const next = Number.isFinite(numeric) ? clamp(numeric, min, max) : state[key];
    state[key] = next;
    rangeEl.value = next;
    numberEl.value = next;
    outputEl.value = format(next);
    updateCannonAim();
  };

  rangeEl.addEventListener('input', (event) => sync(event.target.value));
  numberEl.addEventListener('input', (event) => {
    if (event.target.value !== '') sync(event.target.value);
  });
  numberEl.addEventListener('blur', () => sync(numberEl.value || state[key]));
}

bindPair(azimuthRange, azimuthNumber, azimuthOutput, 'azimuth', formatSigned);
bindPair(angleRange, angleNumber, angleOutput, 'angle', (v) => `${Math.round(v)}°`);
bindPair(velocityRange, velocityNumber, velocityOutput, 'velocity', (v) => `${Number(v).toFixed(1)} m/s`);

overviewBtn.addEventListener('click', () => setCameraMode('overview'));
followBtn.addEventListener('click', () => setCameraMode('follow'));
zoomInBtn.addEventListener('click', () => zoomCamera(0.88));
zoomOutBtn.addEventListener('click', () => zoomCamera(1.14));
resetViewBtn.addEventListener('click', resetOverviewCamera);

function classifyShot(result) {
  if (result.hit) {
    return {
      kicker: 'TARGET HIT',
      main: 'Perfect. Physics agrees with you.',
      sub: `Closest approach: ${result.closest.distance.toFixed(2)} m from the center.`,
      tone: 'success',
    };
  }

  const dx = result.closest.x - TARGET.x;
  const dy = result.closest.y - TARGET.y;
  const dz = result.closest.z - TARGET.z;
  const impactRange = result.impact?.horizontal ?? 0;

  let main;
  if (impactRange < TARGET_HORIZONTAL_DISTANCE - 0.75) {
    main = `Too short by ${(TARGET_HORIZONTAL_DISTANCE - impactRange).toFixed(1)} m on the ground.`;
  } else if (Math.abs(dz) > Math.abs(dy) && Math.abs(dz) > 0.8) {
    main = dz > 0 ? `Too far right by ${Math.abs(dz).toFixed(1)} m.` : `Too far left by ${Math.abs(dz).toFixed(1)} m.`;
  } else if (dy > 0) {
    main = `Too high by ${Math.abs(dy).toFixed(1)} m.`;
  } else if (dy < -0.8) {
    main = `Too low by ${Math.abs(dy).toFixed(1)} m.`;
  } else {
    main = dx > 0 ? `You overshot by ${Math.abs(dx).toFixed(1)} m.` : `You undershot by ${Math.abs(dx).toFixed(1)} m.`;
  }

  return {
    kicker: 'MISS',
    main,
    sub: `Closest approach: ${result.closest.distance.toFixed(2)} m from the center.`,
    tone: 'miss',
  };
}

function updateResultUI(result) {
  const c = classifyShot(result);
  resultBox.className = `result-box ${c.tone}`;
  resultBox.innerHTML = `<div class="result-kicker">${c.kicker}</div><div class="result-main">${c.main}</div><div class="result-sub">${c.sub}</div>`;
}

function updateAttemptsUI() {
  if (!state.attempts.length) {
    attemptsList.innerHTML = '';
    return;
  }
  attemptsList.innerHTML = `
    <div class="attempts-title">Attempts</div>
    ${state.attempts.map((attempt, index) => `
      <div class="attempt-row">
        <div class="attempt-index">${index + 1}</div>
        <div class="attempt-values">${formatSigned(attempt.azimuth)} · ${attempt.angle}° · ${attempt.velocity.toFixed(1)} m/s</div>
        <div class="attempt-outcome ${attempt.hit ? 'hit' : ''}">${attempt.hit ? 'HIT' : `${attempt.closestDistance.toFixed(2)} m`}</div>
      </div>
    `).join('')}
  `;
}

function calculateScore() {
  if (!state.solved) return;
  const attempts = state.attempts.length;
  const final = state.attempts[state.attempts.length - 1];
  const accuracy = Math.max(0, Math.round(100 - (final.closestDistance / HIT_RADIUS_M) * 15));
  const efficiency = Math.max(25, Math.round(100 - (attempts - 1) * 12 - state.hintsUsed * 8));
  const understanding = Math.max(55, 100 - state.hintsUsed * 15);
  const total = Math.round(accuracy * 0.45 + efficiency * 0.35 + understanding * 0.20);

  scoreValue.textContent = total;
  accuracyScore.textContent = `${accuracy}%`;
  efficiencyScore.textContent = `${efficiency}%`;
  understandingScore.textContent = `${understanding}%`;
  scoreCopy.textContent = attempts === 1
    ? 'One-shot solution. Excellent prediction.'
    : `Solved in ${attempts} attempts with ${state.hintsUsed} hint${state.hintsUsed === 1 ? '' : 's'}.`;

  localStorage.setItem('physicsPlayPrototype3DAimZoomScore', JSON.stringify({ total, attempts, hints: state.hintsUsed }));
}

function setControlsDisabled(disabled) {
  [azimuthRange, azimuthNumber, angleRange, angleNumber, velocityRange, velocityNumber].forEach((el) => {
    el.disabled = disabled;
  });
}

async function fire() {
  if (state.isAnimating || state.solved) return;

  state.isAnimating = true;
  fireBtn.disabled = true;
  setControlsDisabled(true);
  sceneOverlay.classList.add('hidden');
  statusText.textContent = 'Projectile in flight';
  statusDot.className = 'status-dot active';

  rebuildPreviousTrajectories();
  const result = trajectory(state.angle, state.azimuth, state.velocity);
  const points = result.points;
  const duration = Math.max(1100, Math.min(2800, (result.flightTime || 2.5) * 650));
  const start = performance.now();
  const muzzle = barrelMuzzlePosition();
  projectile.position.copy(muzzle);
  projectileLight.position.copy(muzzle);
  muzzleFlash.position.copy(muzzle);
  projectile.visible = true;
  projectileLight.visible = true;
  muzzleFlash.material.opacity = 0.95;

  activeLine = makeTrajectoryLine([points[0] || { x: 0, y: 0, z: 0 }], false);
  trajectoryGroup.add(activeLine);

  await new Promise((resolve) => {
    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      const idx = Math.min(points.length - 1, Math.floor(progress * (points.length - 1)));
      const point = points[Math.max(0, idx)];

      if (point) {
        projectile.position.set(point.x, point.y + 0.16, point.z);
        projectileLight.position.copy(projectile.position);
        if (state.cameraMode === 'follow') updateFollowCamera(point);

        activeLine.geometry.dispose();
        activeLine.geometry = new THREE.BufferGeometry().setFromPoints(pointsToVectors(points.slice(0, idx + 1)));
      }

      muzzleFlash.material.opacity = Math.max(0, 0.95 - progress * 8);

      if (progress < 1) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });

  projectile.visible = false;
  projectileLight.visible = false;
  muzzleFlash.material.opacity = 0;

  state.attempts.push({
    azimuth: state.azimuth,
    angle: state.angle,
    velocity: state.velocity,
    path: points,
    hit: result.hit,
    closestDistance: result.closest.distance,
    flightTime: result.flightTime,
    maxHeight: result.maxHeight,
  });

  rebuildPreviousTrajectories();
  updateResultUI(result);
  updateAttemptsUI();

  if (result.hit) {
    state.solved = true;
    pulseTarget();
    statusText.textContent = 'Challenge solved';
    statusDot.className = 'status-dot success';
    fireBtn.innerHTML = '<span>SOLVED</span><span class="fire-icon">✓</span>';
    calculateScore();
  } else {
    statusText.textContent = 'Adjust your prediction';
    statusDot.className = 'status-dot';
    fireBtn.disabled = false;
    setControlsDisabled(false);
  }

  state.isAnimating = false;
  if (state.cameraMode === 'overview') controls.update();
}

function reset() {
  state.angle = 35;
  state.azimuth = Number(TARGET_AZIMUTH.toFixed(1));
  state.velocity = 23;
  state.attempts = [];
  state.isAnimating = false;
  state.solved = false;
  state.hintsUsed = 0;
  state.currentHint = 0;

  azimuthRange.value = azimuthNumber.value = state.azimuth;
  angleRange.value = angleNumber.value = state.angle;
  velocityRange.value = velocityNumber.value = state.velocity;
  azimuthOutput.value = formatSigned(state.azimuth);
  angleOutput.value = `${state.angle}°`;
  velocityOutput.value = `${state.velocity.toFixed(1)} m/s`;
  updateCannonAim();

  setControlsDisabled(false);
  fireBtn.disabled = false;
  fireBtn.innerHTML = '<span>FIRE</span><span class="fire-icon">↗</span>';
  resultBox.className = 'result-box';
  resultBox.innerHTML = '<div class="result-kicker">NO SHOTS YET</div><div class="result-main">Aim in 3D and make your prediction.</div><div class="result-sub">Set direction, angle and speed. Your trajectory will appear only after you fire.</div>';
  attemptsList.innerHTML = '';
  sceneOverlay.classList.remove('hidden');
  statusText.textContent = 'Ready for prediction';
  statusDot.className = 'status-dot';

  hintContent.textContent = 'Try once before opening a hint. The fewer hints you use, the better your score.';
  hintBtn.textContent = 'Show hint 1';
  hintBtn.disabled = false;
  hintCounter.textContent = '0 / 3';

  scoreValue.textContent = '—';
  accuracyScore.textContent = '—';
  efficiencyScore.textContent = '—';
  understandingScore.textContent = '100%';
  scoreCopy.textContent = 'Solve the challenge to generate your score.';

  projectile.visible = false;
  projectileLight.visible = false;
  rebuildPreviousTrajectories();
  setCameraMode('overview');
}

function showHint() {
  if (state.currentHint >= hints.length) return;
  hintContent.innerHTML = hints[state.currentHint];
  state.currentHint += 1;
  state.hintsUsed = Math.max(state.hintsUsed, state.currentHint);
  hintCounter.textContent = `${state.currentHint} / ${hints.length}`;
  if (state.currentHint >= hints.length) {
    hintBtn.textContent = 'All hints shown';
    hintBtn.disabled = true;
  } else {
    hintBtn.textContent = `Show hint ${state.currentHint + 1}`;
  }
}

fireBtn.addEventListener('click', fire);
resetBtn.addEventListener('click', reset);
hintBtn.addEventListener('click', showHint);
setCameraMode('overview');
