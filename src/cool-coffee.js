import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const INITIAL_COFFEE_TEMP = 90;
const ROOM_TEMP = 22;
const MILK_TEMP = 5;
const COFFEE_MASS = 250;
const MILK_MASS = 50;
const K = 0.04;
const SERVE_TIME = 8;
const TARGET_TEMP = 60.5;
const TARGET_TOLERANCE = 0.2;

const state = {
  addMilkAt: 3.0,
  attempts: [],
  hintsUsed: 0,
  currentHint: 0,
  solved: false,
  running: false,
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
      <div class="prototype-badge">CHALLENGE #006 · 3D</div>
    </header>

    <section class="hero">
      <div>
        <div class="eyebrow">THERMAL TRANSFER</div>
        <h1>Cool The Coffee</h1>
        <p>You will drink the coffee in exactly 8 minutes. Choose when to add cold milk so that the final temperature is as close as possible to the perfect serving temperature.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Coffee starts</span><strong>${INITIAL_COFFEE_TEMP} °C</strong></div>
        <div><span>Room</span><strong>${ROOM_TEMP} °C</strong></div>
        <div><span>Target at 8 min</span><strong>${TARGET_TEMP} °C</strong></div>
      </div>
    </section>

    <section class="workspace">
      <article class="sim-card">
        <div class="sim-toolbar">
          <div class="status-wrap"><span class="status-dot" id="statusDot"></span><span id="statusText">Coffee is hot</span></div>
          <div class="toolbar-actions">
            <div class="zoom-switch" aria-label="Zoom controls">
              <button class="camera-btn" id="zoomOutBtn" type="button">−</button>
              <button class="camera-btn" id="zoomInBtn" type="button">+</button>
            </div>
            <button class="ghost-btn" id="resetViewBtn" type="button">Reset view</button>
            <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
          </div>
        </div>

        <div class="scene-wrap coffee-scene-wrap">
          <div id="threeScene" class="three-scene" aria-label="3D coffee cooling simulation"></div>
          <div class="scene-overlay" id="sceneOverlay">
            <div class="overlay-kicker">YOUR MISSION</div>
            <div class="overlay-title">Serve it at ${TARGET_TEMP} °C</div>
            <div class="overlay-copy">Choose when to add the milk. The coffee keeps exchanging heat with the room.</div>
          </div>
          <div class="scene-readout"><span>3D VIEW</span><strong>COOLING MODE</strong></div>
          <div class="camera-hint">Drag to orbit · scroll / buttons to zoom</div>
        </div>

        <div class="loop-live-strip">
          <div><span>Time</span><strong id="liveTime">0.0 min</strong></div>
          <div><span>Coffee temperature</span><strong id="liveTemp">${INITIAL_COFFEE_TEMP.toFixed(1)} °C</strong></div>
          <div><span>Milk</span><strong id="liveMilk">Not added</strong></div>
        </div>
        <div class="thermal-chart-wrap"><canvas id="thermalChart" width="900" height="220" aria-label="Temperature versus time chart"></canvas></div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR PREDICTION</div>
        <div class="control-block">
          <div class="control-head"><label for="milkTimeRange">Add milk at</label><output id="milkTimeOutput">${state.addMilkAt.toFixed(1)} min</output></div>
          <input id="milkTimeRange" type="range" min="0" max="8" step="0.1" value="${state.addMilkAt}" />
          <input id="milkTimeNumber" class="number-input" type="number" min="0" max="8" step="0.1" value="${state.addMilkAt}" />
        </div>

        <div class="loop-question">
          <span>Fixed conditions</span>
          <strong>${COFFEE_MASS} g coffee + ${MILK_MASS} g milk at ${MILK_TEMP} °C</strong>
        </div>

        <button class="fire-btn" id="runBtn" type="button"><span>RUN EXPERIMENT</span><span class="fire-icon">▶</span></button>

        <div class="result-box" id="resultBox">
          <div class="result-kicker">NO RUNS YET</div>
          <div class="result-main">When should you add the milk?</div>
          <div class="result-sub">The answer is not just mixing: the cooling rate depends on how far the coffee is from room temperature.</div>
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
        <div id="hintContent" class="hint-content">Try one run first. Compare what happens if the coffee stays hotter for longer before you add the milk.</div>
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
        <p id="scoreCopy">Reach the serving target to generate your score.</p>
      </article>
    </section>

    <footer>Challenge #006 · Newton cooling + calorimetry · Three.js + Vite · Static frontend</footer>
  </main>
`;

const sceneHost = document.querySelector('#threeScene');
const sceneOverlay = document.querySelector('#sceneOverlay');
const milkTimeRange = document.querySelector('#milkTimeRange');
const milkTimeNumber = document.querySelector('#milkTimeNumber');
const milkTimeOutput = document.querySelector('#milkTimeOutput');
const runBtn = document.querySelector('#runBtn');
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
const liveTime = document.querySelector('#liveTime');
const liveTemp = document.querySelector('#liveTemp');
const liveMilk = document.querySelector('#liveMilk');
const scoreValue = document.querySelector('#scoreValue');
const accuracyScore = document.querySelector('#accuracyScore');
const efficiencyScore = document.querySelector('#efficiencyScore');
const understandingScore = document.querySelector('#understandingScore');
const scoreCopy = document.querySelector('#scoreCopy');
const chart = document.querySelector('#thermalChart');
const ctx = chart.getContext('2d');

const hints = [
  `<strong>Hint 1 · Hotter coffee cools faster.</strong><br>Newton's law says the cooling rate is proportional to the temperature difference between coffee and room.`,
  `<strong>Hint 2 · Milk causes an instant mixing step.</strong><br>If both liquids have roughly the same specific heat:<br><span class="formula">Tmix = (m₁T₁ + m₂T₂) / (m₁ + m₂)</span>`,
  `<strong>Hint 3 · Combine cooling and mixing.</strong><br>Before and after adding milk, use:<br><span class="formula">T(t) = Troom + (T₀ − Troom)e^(−kt)</span><br>The timing changes how long the coffee stays far above room temperature.`
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function coffeeTempBeforeMilk(t) {
  return ROOM_TEMP + (INITIAL_COFFEE_TEMP - ROOM_TEMP) * Math.exp(-K * t);
}

function mixTemperature(coffeeTemp) {
  return (COFFEE_MASS * coffeeTemp + MILK_MASS * MILK_TEMP) / (COFFEE_MASS + MILK_MASS);
}

function finalTemperature(addMilkAt) {
  const before = coffeeTempBeforeMilk(addMilkAt);
  const mixed = mixTemperature(before);
  return ROOM_TEMP + (mixed - ROOM_TEMP) * Math.exp(-K * (SERVE_TIME - addMilkAt));
}

function temperatureAt(t, addMilkAt) {
  if (t < addMilkAt) return coffeeTempBeforeMilk(t);
  const atAdd = coffeeTempBeforeMilk(addMilkAt);
  const mixed = mixTemperature(atAdd);
  return ROOM_TEMP + (mixed - ROOM_TEMP) * Math.exp(-K * (t - addMilkAt));
}

// ---------- Three.js scene ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0c1324);
scene.fog = new THREE.Fog(0x0c1324, 20, 48);

const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
const overviewPosition = new THREE.Vector3(9, 7, 12);
const overviewTarget = new THREE.Vector3(0, 2.5, 0);
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
controls.minDistance = 7;
controls.maxDistance = 30;
controls.target.copy(overviewTarget);
controls.update();

scene.add(new THREE.HemisphereLight(0xffe3d0, 0x17213b, 1.5));
const sun = new THREE.DirectionalLight(0xffffff, 2.1);
sun.position.set(8, 12, 8);
sun.castShadow = true;
scene.add(sun);

const table = new THREE.Mesh(
  new THREE.CylinderGeometry(6, 6, 0.55, 48),
  new THREE.MeshStandardMaterial({ color: 0x18233a, roughness: 0.82 })
);
table.position.y = 0.15;
table.receiveShadow = true;
scene.add(table);

const mugGroup = new THREE.Group();
scene.add(mugGroup);
const mug = new THREE.Mesh(
  new THREE.CylinderGeometry(2.35, 2.15, 4.2, 48, 1, true),
  new THREE.MeshStandardMaterial({ color: 0xf2f4ff, roughness: 0.42, metalness: 0.03, side: THREE.DoubleSide })
);
mug.position.y = 2.45;
mug.castShadow = true;
mugGroup.add(mug);
const bottom = new THREE.Mesh(
  new THREE.CylinderGeometry(2.15, 2.15, 0.18, 48),
  new THREE.MeshStandardMaterial({ color: 0xe9ecf8, roughness: 0.5 })
);
bottom.position.y = 0.42;
mugGroup.add(bottom);
const handle = new THREE.Mesh(
  new THREE.TorusGeometry(1.35, 0.25, 14, 40, Math.PI * 1.55),
  new THREE.MeshStandardMaterial({ color: 0xf2f4ff, roughness: 0.42 })
);
handle.rotation.y = Math.PI / 2;
handle.rotation.z = Math.PI / 4;
handle.position.set(2.25, 2.55, 0);
mugGroup.add(handle);

const liquid = new THREE.Mesh(
  new THREE.CylinderGeometry(2.02, 2.02, 0.18, 48),
  new THREE.MeshStandardMaterial({ color: 0x6f351d, roughness: 0.52, metalness: 0.0 })
);
liquid.position.y = 4.42;
scene.add(liquid);

const milkStream = new THREE.Mesh(
  new THREE.CylinderGeometry(0.13, 0.13, 3.0, 16),
  new THREE.MeshStandardMaterial({ color: 0xf7f4ea, roughness: 0.4 })
);
milkStream.position.set(-1.0, 6.1, 0);
milkStream.visible = false;
scene.add(milkStream);

const steamGroup = new THREE.Group();
scene.add(steamGroup);
for (let i = 0; i < 8; i += 1) {
  const puff = new THREE.Mesh(
    new THREE.SphereGeometry(0.18 + Math.random() * 0.12, 12, 10),
    new THREE.MeshBasicMaterial({ color: 0xd7deee, transparent: true, opacity: 0.18 })
  );
  puff.position.set((Math.random() - 0.5) * 2.6, 5.0 + Math.random() * 3.0, (Math.random() - 0.5) * 1.6);
  steamGroup.add(puff);
}

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

function setLiquidTempVisual(temp, milkAdded) {
  const hotness = clamp((temp - ROOM_TEMP) / (INITIAL_COFFEE_TEMP - ROOM_TEMP), 0, 1);
  const c = new THREE.Color();
  const hot = new THREE.Color(0x8b3d1f);
  const cool = new THREE.Color(milkAdded ? 0xa56f4d : 0x4e2d21);
  c.lerpColors(cool, hot, hotness);
  liquid.material.color.copy(c);
  steamGroup.children.forEach((puff, i) => {
    puff.material.opacity = 0.03 + hotness * (0.12 + i * 0.004);
  });
}

let last = performance.now();
function animate3D(now) {
  const dt = Math.min(0.04, (now - last) / 1000);
  last = now;
  steamGroup.children.forEach((puff, i) => {
    puff.position.y += dt * (0.25 + i * 0.015);
    puff.position.x += Math.sin(now * 0.001 + i) * dt * 0.08;
    if (puff.position.y > 8.4) puff.position.y = 5.1 + Math.random() * 0.5;
  });
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate3D);
}
requestAnimationFrame(animate3D);
setLiquidTempVisual(INITIAL_COFFEE_TEMP, false);

// ---------- chart ----------
function drawChart(points = [], milkAt = null) {
  const w = chart.width;
  const h = chart.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#0b1221';
  ctx.fillRect(0, 0, w, h);
  const pad = { l: 48, r: 24, t: 20, b: 34 };
  const x = (t) => pad.l + (t / SERVE_TIME) * (w - pad.l - pad.r);
  const y = (temp) => pad.t + ((95 - temp) / (95 - 20)) * (h - pad.t - pad.b);

  ctx.strokeStyle = 'rgba(255,255,255,.12)';
  ctx.lineWidth = 1;
  [20, 40, 60, 80].forEach((temp) => {
    ctx.beginPath(); ctx.moveTo(pad.l, y(temp)); ctx.lineTo(w - pad.r, y(temp)); ctx.stroke();
    ctx.fillStyle = '#7f899f'; ctx.font = '12px system-ui'; ctx.fillText(`${temp}°`, 8, y(temp) + 4);
  });
  for (let t = 0; t <= SERVE_TIME; t += 2) {
    ctx.fillStyle = '#7f899f'; ctx.fillText(`${t}m`, x(t) - 8, h - 10);
  }

  ctx.strokeStyle = 'rgba(104,224,173,.65)';
  ctx.setLineDash([6, 5]);
  ctx.beginPath(); ctx.moveTo(pad.l, y(TARGET_TEMP)); ctx.lineTo(w - pad.r, y(TARGET_TEMP)); ctx.stroke();
  ctx.setLineDash([]);

  if (milkAt !== null) {
    ctx.strokeStyle = 'rgba(255,255,255,.16)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(x(milkAt), pad.t); ctx.lineTo(x(milkAt), h - pad.b); ctx.stroke();
    ctx.setLineDash([]);
  }

  if (points.length) {
    ctx.strokeStyle = '#9aa7ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((p, i) => { if (i === 0) ctx.moveTo(x(p.t), y(p.temp)); else ctx.lineTo(x(p.t), y(p.temp)); });
    ctx.stroke();
  }
}
drawChart();

function bindMilkInput(raw) {
  const value = clamp(Number(raw), 0, SERVE_TIME);
  state.addMilkAt = Number.isFinite(value) ? value : state.addMilkAt;
  milkTimeRange.value = state.addMilkAt;
  milkTimeNumber.value = state.addMilkAt;
  milkTimeOutput.value = `${state.addMilkAt.toFixed(1)} min`;
}
milkTimeRange.addEventListener('input', (e) => bindMilkInput(e.target.value));
milkTimeNumber.addEventListener('input', (e) => { if (e.target.value !== '') bindMilkInput(e.target.value); });
milkTimeNumber.addEventListener('blur', () => bindMilkInput(milkTimeNumber.value || state.addMilkAt));

function updateAttempts() {
  attemptsList.innerHTML = state.attempts.length ? `
    <div class="attempts-title">Attempts</div>
    ${state.attempts.map((a, i) => `
      <div class="attempt-row">
        <div class="attempt-index">${i + 1}</div>
        <div class="attempt-values">Milk at ${a.addMilkAt.toFixed(1)} min</div>
        <div class="attempt-outcome ${a.success ? 'hit' : ''}">${a.finalTemp.toFixed(2)} °C</div>
      </div>
    `).join('')}
  ` : '';
}

function calculateScore(attempt) {
  const accuracy = Math.max(0, Math.round(100 - Math.abs(attempt.finalTemp - TARGET_TEMP) * 50));
  const efficiency = Math.max(40, 100 - (state.attempts.length - 1) * 12);
  const understanding = Math.max(55, 100 - state.hintsUsed * 15);
  const total = Math.round(accuracy * 0.55 + efficiency * 0.25 + understanding * 0.20);
  scoreValue.textContent = total;
  accuracyScore.textContent = `${accuracy}%`;
  efficiencyScore.textContent = `${efficiency}%`;
  understandingScore.textContent = `${understanding}%`;
  scoreCopy.textContent = `Solved in ${state.attempts.length} attempt${state.attempts.length === 1 ? '' : 's'}.`;
}

async function runExperiment() {
  if (state.running || state.solved) return;
  state.running = true;
  runBtn.disabled = true;
  milkTimeRange.disabled = true;
  milkTimeNumber.disabled = true;
  sceneOverlay.classList.add('hidden');
  statusText.textContent = 'Cooling in progress';
  statusDot.className = 'status-dot active';
  const points = [];
  const start = performance.now();
  const duration = 5500;
  let milkShown = false;

  await new Promise((resolve) => {
    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      const t = progress * SERVE_TIME;
      const milkAdded = t >= state.addMilkAt;
      const temp = temperatureAt(t, state.addMilkAt);
      points.push({ t, temp });
      liveTime.textContent = `${t.toFixed(1)} min`;
      liveTemp.textContent = `${temp.toFixed(1)} °C`;
      liveMilk.textContent = milkAdded ? `Added at ${state.addMilkAt.toFixed(1)} min` : 'Not added';
      setLiquidTempVisual(temp, milkAdded);
      drawChart(points, state.addMilkAt);

      if (milkAdded && !milkShown) {
        milkShown = true;
        milkStream.visible = true;
        setTimeout(() => { milkStream.visible = false; }, 450);
      }

      if (progress < 1) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });

  const finalTemp = finalTemperature(state.addMilkAt);
  const success = Math.abs(finalTemp - TARGET_TEMP) <= TARGET_TOLERANCE;
  const attempt = { addMilkAt: state.addMilkAt, finalTemp, success };
  state.attempts.push(attempt);
  updateAttempts();

  if (success) {
    state.solved = true;
    resultBox.className = 'result-box success';
    resultBox.innerHTML = `<div class="result-kicker">PERFECT SERVE</div><div class="result-main">${finalTemp.toFixed(2)} °C after ${SERVE_TIME} minutes.</div><div class="result-sub">Your milk timing landed inside the ±${TARGET_TOLERANCE.toFixed(1)} °C target band.</div>`;
    statusText.textContent = 'Coffee ready · challenge solved';
    statusDot.className = 'status-dot success';
    runBtn.innerHTML = '<span>SOLVED</span><span class="fire-icon">✓</span>';
    calculateScore(attempt);
  } else {
    const direction = finalTemp > TARGET_TEMP ? 'Still too hot.' : 'Too cold.';
    resultBox.className = 'result-box miss';
    resultBox.innerHTML = `<div class="result-kicker">NOT QUITE</div><div class="result-main">${direction}</div><div class="result-sub">Final temperature: ${finalTemp.toFixed(2)} °C. Target: ${TARGET_TEMP.toFixed(1)} °C.</div>`;
    statusText.textContent = 'Adjust milk timing';
    statusDot.className = 'status-dot';
    runBtn.disabled = false;
    milkTimeRange.disabled = false;
    milkTimeNumber.disabled = false;
  }
  state.running = false;
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
  state.addMilkAt = 3.0;
  state.attempts = [];
  state.hintsUsed = 0;
  state.currentHint = 0;
  state.solved = false;
  state.running = false;
  milkTimeRange.value = milkTimeNumber.value = state.addMilkAt;
  milkTimeOutput.value = `${state.addMilkAt.toFixed(1)} min`;
  runBtn.disabled = false;
  runBtn.innerHTML = '<span>RUN EXPERIMENT</span><span class="fire-icon">▶</span>';
  milkTimeRange.disabled = false;
  milkTimeNumber.disabled = false;
  resultBox.className = 'result-box';
  resultBox.innerHTML = '<div class="result-kicker">NO RUNS YET</div><div class="result-main">When should you add the milk?</div><div class="result-sub">The answer is not just mixing: the cooling rate depends on how far the coffee is from room temperature.</div>';
  attemptsList.innerHTML = '';
  liveTime.textContent = '0.0 min';
  liveTemp.textContent = `${INITIAL_COFFEE_TEMP.toFixed(1)} °C`;
  liveMilk.textContent = 'Not added';
  sceneOverlay.classList.remove('hidden');
  statusText.textContent = 'Coffee is hot';
  statusDot.className = 'status-dot';
  hintContent.textContent = 'Try one run first. Compare what happens if the coffee stays hotter for longer before you add the milk.';
  hintCounter.textContent = '0 / 3';
  hintBtn.disabled = false;
  hintBtn.textContent = 'Show hint 1';
  scoreValue.textContent = '—';
  accuracyScore.textContent = '—';
  efficiencyScore.textContent = '—';
  understandingScore.textContent = '100%';
  scoreCopy.textContent = 'Reach the serving target to generate your score.';
  setLiquidTempVisual(INITIAL_COFFEE_TEMP, false);
  drawChart();
  resetView();
}

zoomInBtn.addEventListener('click', () => zoom(0.88));
zoomOutBtn.addEventListener('click', () => zoom(1.14));
resetViewBtn.addEventListener('click', resetView);
resetBtn.addEventListener('click', reset);
runBtn.addEventListener('click', runExperiment);
hintBtn.addEventListener('click', showHint);
