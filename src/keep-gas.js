import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const R = 8.314;
const N_MOLES = 2.5;
const TARGET_PRESSURE = 180;
const TARGET_TOLERANCE = 2;
const MAX_SAFE_TEMP = 390;
const MAX_SAFE_PRESSURE = 220;

const state = {
  volume: 0.055,
  temperature: 320,
  attempts: [],
  hintsUsed: 0,
  currentHint: 0,
  solved: false,
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
      <div class="prototype-badge">CHALLENGE #005 · 3D</div>
    </header>

    <section class="hero">
      <div>
        <div class="eyebrow">IDEAL GAS LAW</div>
        <h1>Keep The Gas Alive</h1>
        <p>Control the piston volume and the gas temperature. Reach the target pressure without overheating or over-pressurising the chamber.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Gas amount</span><strong>${N_MOLES.toFixed(1)} mol</strong></div>
        <div><span>Target pressure</span><strong>${TARGET_PRESSURE} kPa</strong></div>
        <div><span>Safety limit</span><strong>${MAX_SAFE_TEMP} K</strong></div>
      </div>
    </section>

    <section class="workspace">
      <article class="sim-card">
        <div class="sim-toolbar">
          <div class="status-wrap"><span class="status-dot" id="statusDot"></span><span id="statusText">System stable</span></div>
          <div class="toolbar-actions">
            <div class="zoom-switch" aria-label="Zoom controls">
              <button class="camera-btn" id="zoomOutBtn" type="button">−</button>
              <button class="camera-btn" id="zoomInBtn" type="button">+</button>
            </div>
            <button class="ghost-btn" id="resetViewBtn" type="button">Reset view</button>
            <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
          </div>
        </div>

        <div class="scene-wrap gas-scene-wrap">
          <div id="threeScene" class="three-scene" aria-label="3D ideal gas cylinder simulation"></div>
          <div class="scene-overlay" id="sceneOverlay">
            <div class="overlay-kicker">YOUR MISSION</div>
            <div class="overlay-title">Reach 180 kPa safely</div>
            <div class="overlay-copy">Adjust volume and temperature, then test your state.</div>
          </div>
          <div class="scene-readout"><span>3D VIEW</span><strong>GAS CHAMBER</strong></div>
          <div class="camera-hint">Drag to orbit · scroll / buttons to zoom</div>
        </div>

        <div class="loop-live-strip">
          <div><span>Pressure</span><strong id="livePressure">—</strong></div>
          <div><span>Temperature</span><strong id="liveTemp">${state.temperature} K</strong></div>
          <div><span>Volume</span><strong id="liveVolume">${state.volume.toFixed(3)} m³</strong></div>
        </div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR SETTINGS</div>

        <div class="control-block">
          <div class="control-head"><label for="volumeRange">Volume</label><output id="volumeOutput">${state.volume.toFixed(3)} m³</output></div>
          <input id="volumeRange" type="range" min="0.030" max="0.080" step="0.001" value="${state.volume}" />
          <input id="volumeNumber" class="number-input" type="number" min="0.030" max="0.080" step="0.001" value="${state.volume}" />
        </div>

        <div class="control-block">
          <div class="control-head"><label for="temperatureRange">Temperature</label><output id="temperatureOutput">${state.temperature} K</output></div>
          <input id="temperatureRange" type="range" min="280" max="430" step="1" value="${state.temperature}" />
          <input id="temperatureNumber" class="number-input" type="number" min="280" max="430" step="1" value="${state.temperature}" />
        </div>

        <button class="fire-btn" id="testBtn" type="button"><span>TEST STATE</span><span class="fire-icon">⏱</span></button>

        <div class="result-box" id="resultBox">
          <div class="result-kicker">NO TESTS YET</div>
          <div class="result-main">Set volume and temperature.</div>
          <div class="result-sub">Your goal is ${TARGET_PRESSURE} ± ${TARGET_TOLERANCE} kPa while staying below ${MAX_SAFE_TEMP} K.</div>
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
        <div id="hintContent" class="hint-content">Try one state first. Watch how pressure changes when you compress or heat the gas.</div>
        <button class="secondary-btn" id="hintBtn" type="button">Show hint 1</button>
      </article>

      <article class="panel score-panel">
        <div class="section-label">PHYSICS SCORE</div>
        <div class="score-value" id="scoreValue">—</div>
        <div class="score-breakdown">
          <div><span>Accuracy</span><strong id="accuracyScore">—</strong></div>
          <div><span>Safety</span><strong id="safetyScore">—</strong></div>
          <div><span>Understanding</span><strong id="understandingScore">100%</strong></div>
        </div>
        <p id="scoreCopy">Hit the target pressure safely to generate your score.</p>
      </article>
    </section>

    <footer>Challenge #005 · Ideal gas law · Three.js + Vite · Static frontend</footer>
  </main>
`;

const sceneHost = document.querySelector('#threeScene');
const sceneOverlay = document.querySelector('#sceneOverlay');
const volumeRange = document.querySelector('#volumeRange');
const volumeNumber = document.querySelector('#volumeNumber');
const volumeOutput = document.querySelector('#volumeOutput');
const temperatureRange = document.querySelector('#temperatureRange');
const temperatureNumber = document.querySelector('#temperatureNumber');
const temperatureOutput = document.querySelector('#temperatureOutput');
const testBtn = document.querySelector('#testBtn');
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
const livePressure = document.querySelector('#livePressure');
const liveTemp = document.querySelector('#liveTemp');
const liveVolume = document.querySelector('#liveVolume');
const scoreValue = document.querySelector('#scoreValue');
const accuracyScore = document.querySelector('#accuracyScore');
const safetyScore = document.querySelector('#safetyScore');
const understandingScore = document.querySelector('#understandingScore');
const scoreCopy = document.querySelector('#scoreCopy');

const hints = [
  `<strong>Hint 1 · Compression raises pressure.</strong><br>For the same amount of gas and temperature, reducing the volume makes pressure rise.`,
  `<strong>Hint 2 · Heating also raises pressure.</strong><br>The ideal-gas relation is proportional to absolute temperature, so work in kelvin, not Celsius.`,
  `<strong>Hint 3 · Use the ideal gas law.</strong><br><span class="formula">PV = nRT</span><br>So <span class="formula">P = nRT / V</span>. Your challenge is to choose T and V so that P ≈ ${TARGET_PRESSURE} kPa while T ≤ ${MAX_SAFE_TEMP} K.`
];

function pressureKPa(volume, temperature) {
  return (N_MOLES * R * temperature / volume) / 1000;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// ---------- 3D scene ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0c1324);
scene.fog = new THREE.Fog(0x0c1324, 25, 60);

const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
const overviewPosition = new THREE.Vector3(10, 8, 15);
const overviewTarget = new THREE.Vector3(0, 3.6, 0);
camera.position.copy(overviewPosition);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
sceneHost.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 8;
controls.maxDistance = 36;
controls.target.copy(overviewTarget);
controls.update();

scene.add(new THREE.HemisphereLight(0xaabaff, 0x142019, 1.7));
const sun = new THREE.DirectionalLight(0xffffff, 2.3);
sun.position.set(8, 15, 10);
sun.castShadow = true;
scene.add(sun);

const base = new THREE.Mesh(
  new THREE.CylinderGeometry(4.4, 4.8, 0.6, 48),
  new THREE.MeshStandardMaterial({ color: 0x1b263d, roughness: 0.6, metalness: 0.35 })
);
base.position.y = 0.3;
base.receiveShadow = true;
scene.add(base);

const chamberRadius = 2.7;
const chamberMaxHeight = 8.4;
const glass = new THREE.Mesh(
  new THREE.CylinderGeometry(chamberRadius, chamberRadius, chamberMaxHeight, 48, 1, true),
  new THREE.MeshPhysicalMaterial({ color: 0x8ca5ff, transparent: true, opacity: 0.12, roughness: 0.1, metalness: 0.05, side: THREE.DoubleSide })
);
glass.position.y = 0.6 + chamberMaxHeight / 2;
scene.add(glass);

const piston = new THREE.Mesh(
  new THREE.CylinderGeometry(chamberRadius * 1.02, chamberRadius * 1.02, 0.45, 48),
  new THREE.MeshStandardMaterial({ color: 0xb8c1d9, roughness: 0.35, metalness: 0.65 })
);
piston.castShadow = true;
scene.add(piston);

const rod = new THREE.Mesh(
  new THREE.CylinderGeometry(0.22, 0.22, 4.0, 20),
  new THREE.MeshStandardMaterial({ color: 0x7d89a4, roughness: 0.35, metalness: 0.7 })
);
rod.castShadow = true;
scene.add(rod);

const particleGroup = new THREE.Group();
scene.add(particleGroup);
const particles = [];
for (let i = 0; i < 48; i += 1) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 10, 8),
    new THREE.MeshStandardMaterial({ color: i % 3 === 0 ? 0xff8fb5 : 0xa7b2ff, emissive: 0x24305f, emissiveIntensity: 0.45 })
  );
  const velocity = new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)).normalize();
  particleGroup.add(mesh);
  particles.push({ mesh, velocity });
}

function chamberHeightFromVolume(volume) {
  const minV = 0.03;
  const maxV = 0.08;
  return 3.1 + ((volume - minV) / (maxV - minV)) * 5.0;
}

function updateChamberVisuals() {
  const h = chamberHeightFromVolume(state.volume);
  piston.position.y = 0.65 + h;
  rod.position.y = piston.position.y + 2.0;
  const speed = 0.9 + (state.temperature - 280) / 150 * 2.0;
  particleGroup.userData.speed = speed;

  for (const p of particles) {
    const radial = Math.hypot(p.mesh.position.x, p.mesh.position.z);
    if (radial > chamberRadius - 0.25 || p.mesh.position.y < 0.9 || p.mesh.position.y > piston.position.y - 0.3) {
      p.mesh.position.set(
        (Math.random() - 0.5) * 4.2,
        1.0 + Math.random() * Math.max(0.5, h - 0.8),
        (Math.random() - 0.5) * 4.2
      );
    }
  }
}

particles.forEach((p) => {
  p.mesh.position.set((Math.random() - 0.5) * 4.2, 1 + Math.random() * 5.5, (Math.random() - 0.5) * 4.2);
});
updateChamberVisuals();

function resetView() {
  camera.position.copy(overviewPosition);
  controls.target.copy(overviewTarget);
  controls.update();
}
function zoom(scale) {
  const offset = new THREE.Vector3().subVectors(camera.position, controls.target).multiplyScalar(scale);
  if (offset.length() < controls.minDistance || offset.length() > controls.maxDistance) return;
  camera.position.copy(controls.target.clone().add(offset));
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

let last = performance.now();
function animate(now) {
  const dt = Math.min(0.04, (now - last) / 1000);
  last = now;
  const hTop = piston.position.y - 0.28;
  const speed = particleGroup.userData.speed || 1.2;
  for (const p of particles) {
    p.mesh.position.addScaledVector(p.velocity, dt * speed * 3.0);
    const r = Math.hypot(p.mesh.position.x, p.mesh.position.z);
    if (r > chamberRadius - 0.18) {
      const normal = new THREE.Vector3(p.mesh.position.x, 0, p.mesh.position.z).normalize();
      p.velocity.reflect(normal);
      p.mesh.position.x = normal.x * (chamberRadius - 0.2);
      p.mesh.position.z = normal.z * (chamberRadius - 0.2);
    }
    if (p.mesh.position.y > hTop) { p.mesh.position.y = hTop; p.velocity.y *= -1; }
    if (p.mesh.position.y < 0.85) { p.mesh.position.y = 0.85; p.velocity.y *= -1; }
  }
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

function bindPair(range, number, output, key, formatter) {
  const sync = (raw) => {
    const min = Number(range.min);
    const max = Number(range.max);
    const n = Number(raw);
    const value = Number.isFinite(n) ? clamp(n, min, max) : state[key];
    state[key] = value;
    range.value = value;
    number.value = value;
    output.value = formatter(value);
    liveTemp.textContent = `${Math.round(state.temperature)} K`;
    liveVolume.textContent = `${state.volume.toFixed(3)} m³`;
    livePressure.textContent = `${pressureKPa(state.volume, state.temperature).toFixed(1)} kPa`;
    updateChamberVisuals();
  };
  range.addEventListener('input', (e) => sync(e.target.value));
  number.addEventListener('input', (e) => { if (e.target.value !== '') sync(e.target.value); });
  number.addEventListener('blur', () => sync(number.value || state[key]));
}

bindPair(volumeRange, volumeNumber, volumeOutput, 'volume', (v) => `${v.toFixed(3)} m³`);
bindPair(temperatureRange, temperatureNumber, temperatureOutput, 'temperature', (v) => `${Math.round(v)} K`);

function updateAttempts() {
  attemptsList.innerHTML = state.attempts.length ? `
    <div class="attempts-title">Attempts</div>
    ${state.attempts.map((a, i) => `
      <div class="attempt-row">
        <div class="attempt-index">${i + 1}</div>
        <div class="attempt-values">${a.volume.toFixed(3)} m³ · ${Math.round(a.temperature)} K</div>
        <div class="attempt-outcome ${a.success ? 'hit' : ''}">${a.pressure.toFixed(1)} kPa</div>
      </div>
    `).join('')}
  ` : '';
}

function calculateScore(attempt) {
  const accuracy = Math.max(0, Math.round(100 - Math.abs(attempt.pressure - TARGET_PRESSURE) * 8));
  const safety = attempt.temperature <= MAX_SAFE_TEMP && attempt.pressure <= MAX_SAFE_PRESSURE ? 100 : 0;
  const understanding = Math.max(55, 100 - state.hintsUsed * 15);
  const efficiency = Math.max(40, 100 - (state.attempts.length - 1) * 10);
  const total = Math.round(accuracy * 0.45 + safety * 0.25 + understanding * 0.15 + efficiency * 0.15);
  scoreValue.textContent = total;
  accuracyScore.textContent = `${accuracy}%`;
  safetyScore.textContent = `${safety}%`;
  understandingScore.textContent = `${understanding}%`;
  scoreCopy.textContent = `Solved in ${state.attempts.length} attempt${state.attempts.length === 1 ? '' : 's'}.`;
}

function testState() {
  if (state.solved) return;
  sceneOverlay.classList.add('hidden');
  const p = pressureKPa(state.volume, state.temperature);
  const safe = state.temperature <= MAX_SAFE_TEMP && p <= MAX_SAFE_PRESSURE;
  const onTarget = Math.abs(p - TARGET_PRESSURE) <= TARGET_TOLERANCE;
  const success = safe && onTarget;
  const attempt = { volume: state.volume, temperature: state.temperature, pressure: p, success };
  state.attempts.push(attempt);
  updateAttempts();

  if (!safe) {
    resultBox.className = 'result-box miss';
    resultBox.innerHTML = `<div class="result-kicker">UNSAFE STATE</div><div class="result-main">The gas crossed a safety limit.</div><div class="result-sub">P = ${p.toFixed(1)} kPa · T = ${Math.round(state.temperature)} K. Reduce heating or decompress the chamber.</div>`;
    statusText.textContent = 'Safety limit exceeded';
    statusDot.className = 'status-dot active';
  } else if (success) {
    state.solved = true;
    resultBox.className = 'result-box success';
    resultBox.innerHTML = `<div class="result-kicker">TARGET REACHED</div><div class="result-main">The chamber is stable at ${p.toFixed(1)} kPa.</div><div class="result-sub">You reached the target without violating the safety envelope.</div>`;
    statusText.textContent = 'Gas stable · challenge solved';
    statusDot.className = 'status-dot success';
    testBtn.disabled = true;
    testBtn.innerHTML = '<span>SOLVED</span><span class="fire-icon">✓</span>';
    calculateScore(attempt);
  } else {
    const direction = p < TARGET_PRESSURE ? 'Pressure is too low.' : 'Pressure is too high.';
    resultBox.className = 'result-box miss';
    resultBox.innerHTML = `<div class="result-kicker">SAFE, BUT OFF TARGET</div><div class="result-main">${direction}</div><div class="result-sub">Measured pressure: ${p.toFixed(1)} kPa. Target: ${TARGET_PRESSURE} ± ${TARGET_TOLERANCE} kPa.</div>`;
    statusText.textContent = 'Adjust the state';
    statusDot.className = 'status-dot';
  }
}

function showHint() {
  if (state.currentHint >= hints.length) return;
  hintContent.innerHTML = hints[state.currentHint];
  state.currentHint += 1;
  state.hintsUsed = state.currentHint;
  hintCounter.textContent = `${state.currentHint} / ${hints.length}`;
  if (state.currentHint >= hints.length) {
    hintBtn.disabled = true;
    hintBtn.textContent = 'All hints shown';
  } else {
    hintBtn.textContent = `Show hint ${state.currentHint + 1}`;
  }
}

function reset() {
  state.volume = 0.055;
  state.temperature = 320;
  state.attempts = [];
  state.hintsUsed = 0;
  state.currentHint = 0;
  state.solved = false;
  volumeRange.value = volumeNumber.value = state.volume;
  temperatureRange.value = temperatureNumber.value = state.temperature;
  volumeOutput.value = `${state.volume.toFixed(3)} m³`;
  temperatureOutput.value = `${state.temperature} K`;
  livePressure.textContent = `${pressureKPa(state.volume, state.temperature).toFixed(1)} kPa`;
  liveTemp.textContent = `${state.temperature} K`;
  liveVolume.textContent = `${state.volume.toFixed(3)} m³`;
  attemptsList.innerHTML = '';
  sceneOverlay.classList.remove('hidden');
  resultBox.className = 'result-box';
  resultBox.innerHTML = `<div class="result-kicker">NO TESTS YET</div><div class="result-main">Set volume and temperature.</div><div class="result-sub">Your goal is ${TARGET_PRESSURE} ± ${TARGET_TOLERANCE} kPa while staying below ${MAX_SAFE_TEMP} K.</div>`;
  statusText.textContent = 'System stable';
  statusDot.className = 'status-dot';
  testBtn.disabled = false;
  testBtn.innerHTML = '<span>TEST STATE</span><span class="fire-icon">⏱</span>';
  hintContent.textContent = 'Try one state first. Watch how pressure changes when you compress or heat the gas.';
  hintCounter.textContent = '0 / 3';
  hintBtn.disabled = false;
  hintBtn.textContent = 'Show hint 1';
  scoreValue.textContent = '—';
  accuracyScore.textContent = '—';
  safetyScore.textContent = '—';
  understandingScore.textContent = '100%';
  scoreCopy.textContent = 'Hit the target pressure safely to generate your score.';
  updateChamberVisuals();
  resetView();
}

zoomInBtn.addEventListener('click', () => zoom(0.88));
zoomOutBtn.addEventListener('click', () => zoom(1.14));
resetViewBtn.addEventListener('click', resetView);
resetBtn.addEventListener('click', reset);
testBtn.addEventListener('click', testState);
hintBtn.addEventListener('click', showHint);
livePressure.textContent = `${pressureKPa(state.volume, state.temperature).toFixed(1)} kPa`;
