import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const G = 9.81;
const R = 5;
const LOOP_CENTER_X = 9;
const LOOP_CENTER_Y = R;
const MASS = 500;
const MIN_HEIGHT = 2.5 * R;

const state = {
  height: 10,
  attempts: [],
  isAnimating: false,
  hintsUsed: 0,
  currentHint: 0,
  completed: false,
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
      <div class="prototype-badge">CHALLENGE #002 · 3D</div>
    </header>

    <section class="hero loop-hero">
      <div>
        <div class="eyebrow">ENERGY + CIRCULAR MOTION</div>
        <h1>Complete The Loop</h1>
        <p>The cart starts from rest. Choose its starting height and release it. Your goal is to complete the loop while using as little starting height as possible.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Loop radius</span><strong>${R} m</strong></div>
        <div><span>Cart mass</span><strong>${MASS} kg</strong></div>
        <div><span>Gravity</span><strong>${G} m/s²</strong></div>
      </div>
    </section>

    <section class="workspace">
      <article class="sim-card">
        <div class="sim-toolbar">
          <div class="status-wrap"><span class="status-dot" id="statusDot"></span><span id="statusText">Ready for prediction</span></div>
          <div class="toolbar-actions">
            <div class="zoom-switch" aria-label="Zoom controls">
              <button class="camera-btn" id="zoomOutBtn" type="button">−</button>
              <button class="camera-btn" id="zoomInBtn" type="button">+</button>
            </div>
            <button class="ghost-btn" id="resetViewBtn" type="button">Reset view</button>
            <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
          </div>
        </div>

        <div class="scene-wrap loop-scene-wrap">
          <div id="threeScene" class="three-scene" aria-label="3D roller coaster loop simulation"></div>
          <div class="scene-overlay" id="sceneOverlay">
            <div class="overlay-kicker">YOUR MISSION</div>
            <div class="overlay-title">Find the minimum safe starting height</div>
            <div class="overlay-copy">The cart starts from rest. No friction. Will it stay on the track at the top?</div>
          </div>
          <div class="scene-readout"><span>3D VIEW</span><strong>ENERGY MODE</strong></div>
          <div class="camera-hint">Drag to orbit · scroll / buttons to zoom</div>
        </div>

        <div class="loop-live-strip">
          <div><span>Speed</span><strong id="liveSpeed">0.0 m/s</strong></div>
          <div><span>Normal force</span><strong id="liveNormal">—</strong></div>
          <div><span>Height</span><strong id="liveHeight">${state.height.toFixed(1)} m</strong></div>
        </div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR PREDICTION</div>

        <div class="control-block">
          <div class="control-head">
            <label for="heightRange">Starting height</label>
            <output id="heightOutput">${state.height.toFixed(1)} m</output>
          </div>
          <input id="heightRange" type="range" min="6" max="18" step="0.1" value="${state.height}" />
          <input id="heightNumber" class="number-input" type="number" min="6" max="18" step="0.1" value="${state.height}" />
        </div>

        <div class="loop-question">
          <span>Prediction</span>
          <strong>Will the cart complete the loop?</strong>
        </div>

        <button class="fire-btn" id="releaseBtn" type="button"><span>RELEASE</span><span class="fire-icon">▶</span></button>

        <div class="result-box" id="resultBox">
          <div class="result-kicker">NO RUNS YET</div>
          <div class="result-main">Choose a starting height.</div>
          <div class="result-sub">The key is not only reaching the top: the cart must still have enough speed to maintain contact.</div>
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
        <div id="hintContent" class="hint-content">Try a run first. Watch what happens near the top of the loop.</div>
        <button class="secondary-btn" id="hintBtn" type="button">Show hint 1</button>
      </article>

      <article class="panel score-panel">
        <div class="section-label">PHYSICS SCORE</div>
        <div class="score-value" id="scoreValue">—</div>
        <div class="score-breakdown">
          <div><span>Completion</span><strong id="completionScore">—</strong></div>
          <div><span>Efficiency</span><strong id="efficiencyScore">—</strong></div>
          <div><span>Understanding</span><strong id="understandingScore">100%</strong></div>
        </div>
        <p id="scoreCopy">Complete the loop to generate your score.</p>
      </article>
    </section>

    <footer>Challenge #002 · Three.js + Vite · Static frontend · No backend · Cloudflare Pages ready</footer>
  </main>
`;

const sceneHost = document.querySelector('#threeScene');
const sceneOverlay = document.querySelector('#sceneOverlay');
const heightRange = document.querySelector('#heightRange');
const heightNumber = document.querySelector('#heightNumber');
const heightOutput = document.querySelector('#heightOutput');
const releaseBtn = document.querySelector('#releaseBtn');
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
const completionScore = document.querySelector('#completionScore');
const efficiencyScore = document.querySelector('#efficiencyScore');
const understandingScore = document.querySelector('#understandingScore');
const scoreCopy = document.querySelector('#scoreCopy');
const liveSpeed = document.querySelector('#liveSpeed');
const liveNormal = document.querySelector('#liveNormal');
const liveHeight = document.querySelector('#liveHeight');

const hints = [
  `<strong>Hint 1 · Energy gets you to the top.</strong><br>As the cart loses height, gravitational potential energy becomes kinetic energy. Reaching the top requires enough initial potential energy.`,
  `<strong>Hint 2 · Reaching the top is not enough.</strong><br>At the top of the loop, the cart needs centripetal acceleration. At the limiting case the normal force is zero:<br><span class="formula">v² / R = g</span>`,
  `<strong>Hint 3 · Combine the two conditions.</strong><br>Energy from the start to the top gives:<br><span class="formula">mgh = mg(2R) + ½mv²</span><br>At the limit <span class="formula">v² = gR</span>, therefore:<br><span class="formula">hₘᵢₙ = 2.5R</span>`
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// ---------- Three.js ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0c1324);
scene.fog = new THREE.Fog(0x0c1324, 38, 85);

const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 160);
const overviewPosition = new THREE.Vector3(2, 13, 31);
const overviewTarget = new THREE.Vector3(2, 5.5, 0);
camera.position.copy(overviewPosition);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
sceneHost.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 11;
controls.maxDistance = 65;
controls.minPolarAngle = 0.35;
controls.maxPolarAngle = Math.PI / 2.04;
controls.target.copy(overviewTarget);
controls.update();

scene.add(new THREE.HemisphereLight(0xaabaff, 0x152019, 1.55));
const sun = new THREE.DirectionalLight(0xffffff, 2.5);
sun.position.set(-8, 24, 15);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -35;
sun.shadow.camera.right = 35;
sun.shadow.camera.top = 35;
sun.shadow.camera.bottom = -20;
scene.add(sun);
const rim = new THREE.DirectionalLight(0x7f8cff, 1.0);
rim.position.set(20, 10, -15);
scene.add(rim);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(64, 34),
  new THREE.MeshStandardMaterial({ color: 0x172238, roughness: 0.96 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.set(0, -0.05, 0);
ground.receiveShadow = true;
scene.add(ground);

const grid = new THREE.GridHelper(64, 24, 0x4d5d7e, 0x26344f);
grid.material.opacity = 0.28;
grid.material.transparent = true;
scene.add(grid);

const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x99a8ff, roughness: 0.34, metalness: 0.55 });
const supportMaterial = new THREE.MeshStandardMaterial({ color: 0x2b3855, roughness: 0.7, metalness: 0.25 });

const loopTrack = new THREE.Mesh(new THREE.TorusGeometry(R, 0.16, 14, 128), trackMaterial);
loopTrack.position.set(LOOP_CENTER_X, LOOP_CENTER_Y, 0);
loopTrack.castShadow = true;
loopTrack.receiveShadow = true;
scene.add(loopTrack);

for (const x of [LOOP_CENTER_X - R, LOOP_CENTER_X, LOOP_CENTER_X + R]) {
  const support = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, R * 2, 12), supportMaterial);
  support.position.set(x, R, -0.65);
  support.castShadow = true;
  scene.add(support);
}

let rampMesh = null;
let rampCurve = null;

function buildRamp(height) {
  if (rampMesh) {
    scene.remove(rampMesh);
    rampMesh.geometry.dispose();
  }
  rampCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-17, height, 0),
    new THREE.Vector3(-9, height * 0.98, 0),
    new THREE.Vector3(-2, 0.4, 0),
    new THREE.Vector3(LOOP_CENTER_X, 0, 0)
  );
  rampMesh = new THREE.Mesh(new THREE.TubeGeometry(rampCurve, 80, 0.16, 10, false), trackMaterial);
  rampMesh.castShadow = true;
  rampMesh.receiveShadow = true;
  scene.add(rampMesh);
}

const cart = new THREE.Group();
const cartBody = new THREE.Mesh(
  new THREE.BoxGeometry(1.15, 0.48, 0.9),
  new THREE.MeshStandardMaterial({ color: 0xff6d9d, roughness: 0.4, metalness: 0.25 })
);
cartBody.position.y = 0.38;
cartBody.castShadow = true;
cart.add(cartBody);
for (const x of [-0.38, 0.38]) {
  for (const z of [-0.42, 0.42]) {
    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.13, 16),
      new THREE.MeshStandardMaterial({ color: 0x101625, roughness: 0.65 })
    );
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(x, 0.13, z);
    cart.add(wheel);
  }
}
scene.add(cart);

const lossMarker = new THREE.Mesh(
  new THREE.SphereGeometry(0.26, 18, 12),
  new THREE.MeshBasicMaterial({ color: 0xffd066, transparent: true, opacity: 0 })
);
scene.add(lossMarker);

function placeCartAtStart() {
  const p = rampCurve.getPoint(0);
  const tangent = rampCurve.getTangent(0).normalize();
  cart.position.copy(p);
  cart.rotation.z = Math.atan2(tangent.y, tangent.x);
  liveSpeed.textContent = '0.0 m/s';
  liveNormal.textContent = '—';
  liveHeight.textContent = `${state.height.toFixed(1)} m`;
}

function setCartPose(position, tangentAngle = 0) {
  cart.position.copy(position);
  cart.rotation.z = tangentAngle;
}

buildRamp(state.height);
placeCartAtStart();

function resetView() {
  camera.position.copy(overviewPosition);
  controls.target.copy(overviewTarget);
  controls.update();
}

function zoomCamera(scale) {
  const offset = new THREE.Vector3().subVectors(camera.position, controls.target).multiplyScalar(scale);
  const d = offset.length();
  if (d < controls.minDistance || d > controls.maxDistance) return;
  camera.position.copy(controls.target.clone().add(offset));
  controls.update();
}

function resizeRenderer() {
  const width = Math.max(1, sceneHost.clientWidth);
  const height = Math.max(1, sceneHost.clientHeight);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resizeRenderer).observe(sceneHost);
resizeRenderer();

function renderLoop() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);

// ---------- Physics ----------
function evaluateLoop(height) {
  const steps = [];
  let lost = false;
  let loss = null;

  for (let theta = 0; theta <= Math.PI * 2 + 0.001; theta += 0.01) {
    const y = R * (1 - Math.cos(theta));
    const v2 = 2 * G * (height - y);
    if (v2 < 0) {
      lost = true;
      loss = { theta, y, speed: 0, normal: 0 };
      break;
    }
    const speed = Math.sqrt(v2);
    const normal = MASS * (v2 / R + G * Math.cos(theta));
    const x = LOOP_CENTER_X + R * Math.sin(theta);
    const worldY = LOOP_CENTER_Y - R * Math.cos(theta);
    steps.push({ theta, x, y: worldY, speed, normal });
    if (normal < 0) {
      lost = true;
      loss = { theta, x, y: worldY, speed, normal };
      break;
    }
  }

  return {
    success: !lost && steps.length > 0 && steps[steps.length - 1].theta >= Math.PI * 1.99,
    steps,
    loss,
  };
}

function detachedFlight(loss) {
  if (!loss) return [];
  const points = [];
  const vx = loss.speed * Math.cos(loss.theta);
  const vy = loss.speed * Math.sin(loss.theta);
  for (let t = 0; t < 4; t += 0.025) {
    const x = loss.x + vx * t;
    const y = loss.y + vy * t - 0.5 * G * t * t;
    if (y < 0) break;
    points.push({ x, y });
  }
  return points;
}

// ---------- UI ----------
function syncHeight(value) {
  const numeric = Number(value);
  state.height = Number.isFinite(numeric) ? clamp(numeric, 6, 18) : state.height;
  heightRange.value = state.height;
  heightNumber.value = state.height;
  heightOutput.value = `${state.height.toFixed(1)} m`;
  if (!state.isAnimating) {
    buildRamp(state.height);
    placeCartAtStart();
  }
}

heightRange.addEventListener('input', (e) => syncHeight(e.target.value));
heightNumber.addEventListener('input', (e) => { if (e.target.value !== '') syncHeight(e.target.value); });
heightNumber.addEventListener('blur', () => syncHeight(heightNumber.value || state.height));
zoomInBtn.addEventListener('click', () => zoomCamera(0.88));
zoomOutBtn.addEventListener('click', () => zoomCamera(1.14));
resetViewBtn.addEventListener('click', resetView);

function setInputDisabled(disabled) {
  heightRange.disabled = disabled;
  heightNumber.disabled = disabled;
}

function updateAttempts() {
  attemptsList.innerHTML = state.attempts.length ? `
    <div class="attempts-title">Runs</div>
    ${state.attempts.map((a, i) => `
      <div class="attempt-row">
        <div class="attempt-index">${i + 1}</div>
        <div class="attempt-values">h = ${a.height.toFixed(1)} m</div>
        <div class="attempt-outcome ${a.success ? 'hit' : ''}">${a.success ? 'COMPLETE' : `LOST @ ${a.lossAngle.toFixed(0)}°`}</div>
      </div>`).join('')}
  ` : '';
}

function updateScore(height) {
  const excess = Math.max(0, height - MIN_HEIGHT);
  const efficiency = Math.max(30, Math.round(100 - excess * 18));
  const understanding = Math.max(55, 100 - state.hintsUsed * 15);
  const completion = 100;
  const total = Math.round(completion * 0.45 + efficiency * 0.35 + understanding * 0.20);
  scoreValue.textContent = total;
  completionScore.textContent = '100%';
  efficiencyScore.textContent = `${efficiency}%`;
  understandingScore.textContent = `${understanding}%`;
  scoreCopy.textContent = excess <= 0.15
    ? 'Near the theoretical minimum. Excellent.'
    : `Loop completed. You used ${excess.toFixed(1)} m more height than the theoretical minimum.`;
  localStorage.setItem('physicsPlayCompleteLoopScore', JSON.stringify({ total, height, hints: state.hintsUsed }));
}

async function animateRamp(duration = 1450) {
  const start = performance.now();
  return new Promise((resolve) => {
    function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = p * p * (3 - 2 * p);
      const point = rampCurve.getPoint(eased);
      const tangent = rampCurve.getTangent(eased).normalize();
      setCartPose(point, Math.atan2(tangent.y, tangent.x));
      const speed = Math.sqrt(Math.max(0, 2 * G * (state.height - point.y)));
      liveSpeed.textContent = `${speed.toFixed(1)} m/s`;
      liveNormal.textContent = '—';
      liveHeight.textContent = `${point.y.toFixed(1)} m`;
      if (p < 1) requestAnimationFrame(frame); else resolve();
    }
    requestAnimationFrame(frame);
  });
}

async function animateLoopRun(result) {
  const steps = result.steps;
  const duration = result.success ? 2200 : 1600;
  const start = performance.now();
  return new Promise((resolve) => {
    function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      const idx = Math.min(steps.length - 1, Math.floor(p * (steps.length - 1)));
      const s = steps[Math.max(0, idx)];
      setCartPose(new THREE.Vector3(s.x, s.y, 0), s.theta);
      liveSpeed.textContent = `${s.speed.toFixed(1)} m/s`;
      liveNormal.textContent = `${Math.max(0, s.normal / 1000).toFixed(1)} kN`;
      liveHeight.textContent = `${s.y.toFixed(1)} m`;
      if (p < 1) requestAnimationFrame(frame); else resolve();
    }
    requestAnimationFrame(frame);
  });
}

async function animateDetach(loss) {
  const path = detachedFlight(loss);
  if (!path.length) return;
  lossMarker.position.set(loss.x, loss.y, 0);
  lossMarker.material.opacity = 0.95;
  const start = performance.now();
  return new Promise((resolve) => {
    function frame(now) {
      const p = Math.min(1, (now - start) / 900);
      const idx = Math.min(path.length - 1, Math.floor(p * (path.length - 1)));
      const point = path[idx];
      cart.position.set(point.x, point.y, 0);
      cart.rotation.z += 0.045;
      liveNormal.textContent = '0.0 kN';
      liveHeight.textContent = `${Math.max(0, point.y).toFixed(1)} m`;
      if (p < 1) requestAnimationFrame(frame); else resolve();
    }
    requestAnimationFrame(frame);
  });
}

async function release() {
  if (state.isAnimating) return;
  state.isAnimating = true;
  releaseBtn.disabled = true;
  setInputDisabled(true);
  sceneOverlay.classList.add('hidden');
  statusText.textContent = 'Cart in motion';
  statusDot.className = 'status-dot active';
  lossMarker.material.opacity = 0;
  buildRamp(state.height);
  placeCartAtStart();

  const result = evaluateLoop(state.height);
  await animateRamp();
  await animateLoopRun(result);

  if (!result.success && result.loss) {
    await animateDetach(result.loss);
  }

  const lossAngle = result.loss ? result.loss.theta * 180 / Math.PI : 360;
  state.attempts.push({ height: state.height, success: result.success, lossAngle });
  updateAttempts();

  if (result.success) {
    state.completed = true;
    statusText.textContent = 'Loop completed';
    statusDot.className = 'status-dot success';
    resultBox.className = 'result-box success';
    resultBox.innerHTML = `<div class="result-kicker">LOOP COMPLETE</div><div class="result-main">The cart stayed on the track all the way around.</div><div class="result-sub">Starting height: ${state.height.toFixed(1)} m. Can you complete it from an even lower height?</div>`;
    updateScore(state.height);
  } else {
    statusText.textContent = 'Contact lost — adjust the height';
    statusDot.className = 'status-dot';
    resultBox.className = 'result-box miss';
    resultBox.innerHTML = `<div class="result-kicker">CONTACT LOST</div><div class="result-main">The cart left the track at ${lossAngle.toFixed(0)}° around the loop.</div><div class="result-sub">At that point the normal force reached zero. Increase the starting height and try again.</div>`;
  }

  state.isAnimating = false;
  releaseBtn.disabled = false;
  setInputDisabled(false);
}

function reset() {
  state.height = 10;
  state.attempts = [];
  state.isAnimating = false;
  state.hintsUsed = 0;
  state.currentHint = 0;
  state.completed = false;
  heightRange.value = heightNumber.value = state.height;
  heightOutput.value = `${state.height.toFixed(1)} m`;
  buildRamp(state.height);
  placeCartAtStart();
  lossMarker.material.opacity = 0;
  setInputDisabled(false);
  releaseBtn.disabled = false;
  sceneOverlay.classList.remove('hidden');
  statusText.textContent = 'Ready for prediction';
  statusDot.className = 'status-dot';
  resultBox.className = 'result-box';
  resultBox.innerHTML = '<div class="result-kicker">NO RUNS YET</div><div class="result-main">Choose a starting height.</div><div class="result-sub">The key is not only reaching the top: the cart must still have enough speed to maintain contact.</div>';
  attemptsList.innerHTML = '';
  hintContent.textContent = 'Try a run first. Watch what happens near the top of the loop.';
  hintBtn.textContent = 'Show hint 1';
  hintBtn.disabled = false;
  hintCounter.textContent = '0 / 3';
  scoreValue.textContent = '—';
  completionScore.textContent = '—';
  efficiencyScore.textContent = '—';
  understandingScore.textContent = '100%';
  scoreCopy.textContent = 'Complete the loop to generate your score.';
  resetView();
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

releaseBtn.addEventListener('click', release);
resetBtn.addEventListener('click', reset);
hintBtn.addEventListener('click', showHint);
resetView();
