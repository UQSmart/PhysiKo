import './style.css';

const G = 9.81;
const TARGET_X = 40;
const TARGET_Y = 8;
const HIT_RADIUS_M = 1.25;
const MAX_ATTEMPTS_FOR_SCORE = 8;

const state = {
  angle: 35,
  velocity: 20,
  attempts: [],
  isAnimating: false,
  solved: false,
  hintsUsed: 0,
  currentHint: 0,
};

const app = document.querySelector('#app');

app.innerHTML = `
  <main class="shell">
    <header class="topbar">
      <div class="brand-wrap">
        <div class="logo-mark">Φ</div>
        <div>
          <div class="brand">PHYSICS PLAY</div>
          <div class="tagline">Predict it. Play it. Understand it.</div>
        </div>
      </div>
      <div class="prototype-badge">PROTOTYPE 0.1</div>
    </header>

    <section class="hero">
      <div>
        <div class="eyebrow">CHALLENGE #001 · PROJECTILE MOTION</div>
        <h1>Hit The Target</h1>
        <p>Choose an angle and launch speed. Commit to your prediction, then fire and let physics decide.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Distance</span><strong>${TARGET_X} m</strong></div>
        <div><span>Target height</span><strong>${TARGET_Y} m</strong></div>
        <div><span>Gravity</span><strong>${G} m/s²</strong></div>
      </div>
    </section>

    <section class="workspace">
      <article class="sim-card">
        <div class="sim-toolbar">
          <div>
            <span class="status-dot" id="statusDot"></span>
            <span id="statusText">Ready for prediction</span>
          </div>
          <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
        </div>

        <div class="canvas-wrap">
          <canvas id="simCanvas" aria-label="Projectile motion simulation"></canvas>
          <div class="canvas-overlay" id="canvasOverlay">
            <div class="overlay-kicker">YOUR MISSION</div>
            <div class="overlay-title">Hit the center of the target</div>
            <div class="overlay-copy">No preview trajectory. Pick your values first.</div>
          </div>
        </div>

        <div class="legend">
          <span><i class="legend-line previous"></i> Previous attempts</span>
          <span><i class="legend-line current"></i> Current shot</span>
        </div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR PREDICTION</div>

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
            <output id="velocityOutput">20.0 m/s</output>
          </div>
          <input id="velocityRange" type="range" min="8" max="40" step="0.1" value="20" />
          <input id="velocityNumber" class="number-input" type="number" min="8" max="40" step="0.1" value="20" />
        </div>

        <button class="fire-btn" id="fireBtn" type="button">
          <span>FIRE</span>
          <span class="fire-icon">↗</span>
        </button>

        <div class="result-box" id="resultBox">
          <div class="result-kicker">NO SHOTS YET</div>
          <div class="result-main">Make your prediction.</div>
          <div class="result-sub">Your trajectory will only appear after you fire.</div>
        </div>

        <div class="attempts" id="attemptsList"></div>
      </aside>
    </section>

    <section class="learning-grid">
      <article class="panel hint-panel">
        <div class="panel-head">
          <div>
            <div class="section-label">STUCK?</div>
            <h2>Progressive hints</h2>
          </div>
          <div class="hint-counter" id="hintCounter">0 / 3</div>
        </div>
        <div id="hintContent" class="hint-content">
          Try once before opening a hint. The fewer hints you use, the better your score.
        </div>
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

    <footer>
      Prototype 0.1 · Runs entirely in your browser · No backend · No login
    </footer>
  </main>
`;

const canvas = document.querySelector('#simCanvas');
const ctx = canvas.getContext('2d');
const angleRange = document.querySelector('#angleRange');
const angleNumber = document.querySelector('#angleNumber');
const angleOutput = document.querySelector('#angleOutput');
const velocityRange = document.querySelector('#velocityRange');
const velocityNumber = document.querySelector('#velocityNumber');
const velocityOutput = document.querySelector('#velocityOutput');
const fireBtn = document.querySelector('#fireBtn');
const resetBtn = document.querySelector('#resetBtn');
const resultBox = document.querySelector('#resultBox');
const attemptsList = document.querySelector('#attemptsList');
const canvasOverlay = document.querySelector('#canvasOverlay');
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

const hints = [
  `<strong>Hint 1 · Split the motion.</strong><br>The projectile moves horizontally at constant speed while gravity changes only the vertical motion. Think in two independent directions.`,
  `<strong>Hint 2 · Resolve the launch velocity.</strong><br><span class="formula">Vx = V cos θ</span><br><span class="formula">Vy = V sin θ</span>`,
  `<strong>Hint 3 · Use the trajectory equations.</strong><br><span class="formula">x(t) = V cos θ · t</span><br><span class="formula">y(t) = V sin θ · t − ½gt²</span><br>At the target, x = ${TARGET_X} m and y = ${TARGET_Y} m.`
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function bindPair(rangeEl, numberEl, outputEl, key, format) {
  const sync = (value) => {
    const min = Number(rangeEl.min);
    const max = Number(rangeEl.max);
    const next = clamp(Number(value), min, max);
    state[key] = next;
    rangeEl.value = next;
    numberEl.value = next;
    outputEl.value = format(next);
    drawScene();
  };

  rangeEl.addEventListener('input', (event) => sync(event.target.value));
  numberEl.addEventListener('input', (event) => {
    if (event.target.value !== '') sync(event.target.value);
  });
  numberEl.addEventListener('blur', () => sync(numberEl.value || state[key]));
}

bindPair(angleRange, angleNumber, angleOutput, 'angle', (v) => `${Math.round(v)}°`);
bindPair(velocityRange, velocityNumber, velocityOutput, 'velocity', (v) => `${Number(v).toFixed(1)} m/s`);

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(rect.width * ratio);
  canvas.height = Math.floor(rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  drawScene();
}

window.addEventListener('resize', resizeCanvas);

function worldConfig() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const maxX = 55;
  const maxY = 22;
  const margin = { left: 50, right: 28, top: 28, bottom: 48 };
  return {
    width,
    height,
    margin,
    xScale: (width - margin.left - margin.right) / maxX,
    yScale: (height - margin.top - margin.bottom) / maxY,
    maxX,
    maxY,
  };
}

function toCanvas(x, y, cfg) {
  return {
    x: cfg.margin.left + x * cfg.xScale,
    y: cfg.height - cfg.margin.bottom - y * cfg.yScale,
  };
}

function trajectory(angleDeg, velocity, maxTime = 10) {
  const angleRad = angleDeg * Math.PI / 180;
  const vx = velocity * Math.cos(angleRad);
  const vy = velocity * Math.sin(angleRad);
  const points = [];
  let closest = { distance: Infinity, x: 0, y: 0, t: 0 };
  let impactX = null;
  let flightTime = null;
  let maxHeight = 0;

  for (let t = 0; t <= maxTime; t += 0.0125) {
    const x = vx * t;
    const y = vy * t - 0.5 * G * t * t;
    if (y > maxHeight) maxHeight = y;

    if (x >= 0 && y >= 0) points.push({ x, y, t });

    const dist = Math.hypot(x - TARGET_X, y - TARGET_Y);
    if (dist < closest.distance) closest = { distance: dist, x, y, t };

    if (y < 0 && t > 0.03) {
      const prevT = t - 0.0125;
      const prevY = vy * prevT - 0.5 * G * prevT * prevT;
      const prevX = vx * prevT;
      const ratio = prevY / (prevY - y);
      impactX = prevX + (x - prevX) * ratio;
      flightTime = prevT + 0.0125 * ratio;
      break;
    }
  }

  const hit = closest.distance <= HIT_RADIUS_M;
  return { points, closest, impactX, flightTime, maxHeight, hit, vx, vy };
}

function drawGrid(cfg) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.055)';
  ctx.lineWidth = 1;

  for (let x = 0; x <= cfg.maxX; x += 5) {
    const p1 = toCanvas(x, 0, cfg);
    const p2 = toCanvas(x, cfg.maxY, cfg);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  for (let y = 0; y <= cfg.maxY; y += 5) {
    const p1 = toCanvas(0, y, cfg);
    const p2 = toCanvas(cfg.maxX, y, cfg);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawGround(cfg) {
  const left = toCanvas(0, 0, cfg);
  const right = toCanvas(cfg.maxX, 0, cfg);
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(left.x, left.y);
  ctx.lineTo(right.x, right.y);
  ctx.stroke();
  ctx.restore();
}

function drawCannon(cfg) {
  const base = toCanvas(0.7, 0, cfg);
  const angleRad = state.angle * Math.PI / 180;
  ctx.save();
  ctx.translate(base.x, base.y);

  ctx.fillStyle = '#eef2ff';
  ctx.beginPath();
  ctx.arc(0, -8, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(-angleRad);
  ctx.fillStyle = '#9ca9ff';
  ctx.fillRect(0, -13, 46, 12);
  ctx.restore();
}

function drawTarget(cfg) {
  const p = toCanvas(TARGET_X, TARGET_Y, cfg);
  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(p.x, toCanvas(TARGET_X, 0, cfg).y);
  ctx.stroke();

  [22, 15, 8].forEach((r, index) => {
    ctx.fillStyle = index % 2 === 0 ? '#ff5d8f' : '#ffffff';
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = '12px Inter, system-ui, sans-serif';
  ctx.fillText(`${TARGET_X} m`, p.x - 12, toCanvas(TARGET_X, 0, cfg).y + 24);
  ctx.fillText(`${TARGET_Y} m`, p.x + 28, p.y + 4);
  ctx.restore();
}

function drawPath(points, cfg, options = {}) {
  if (!points.length) return;
  ctx.save();
  ctx.strokeStyle = options.strokeStyle || 'rgba(255,255,255,0.3)';
  ctx.lineWidth = options.lineWidth || 2;
  ctx.setLineDash(options.dash || []);
  ctx.beginPath();
  points.forEach((point, index) => {
    const p = toCanvas(point.x, point.y, cfg);
    if (index === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
  ctx.restore();
}

function drawProjectile(point, cfg) {
  const p = toCanvas(point.x, point.y, cfg);
  ctx.save();
  ctx.shadowColor = 'rgba(255,255,255,0.75)';
  ctx.shadowBlur = 16;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawScene(activeShot = null) {
  const cfg = worldConfig();
  ctx.clearRect(0, 0, cfg.width, cfg.height);

  const gradient = ctx.createLinearGradient(0, 0, 0, cfg.height);
  gradient.addColorStop(0, '#10182c');
  gradient.addColorStop(1, '#0a0f1e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, cfg.width, cfg.height);

  drawGrid(cfg);
  drawGround(cfg);

  state.attempts.forEach((attempt) => {
    drawPath(attempt.path, cfg, {
      strokeStyle: 'rgba(160,170,205,0.24)',
      lineWidth: 1.5,
      dash: [6, 8],
    });
  });

  if (activeShot) {
    drawPath(activeShot.visiblePoints, cfg, { strokeStyle: '#7f8cff', lineWidth: 3 });
    if (activeShot.currentPoint) drawProjectile(activeShot.currentPoint, cfg);
  }

  drawTarget(cfg);
  drawCannon(cfg);
}

function classifyShot(result) {
  if (result.hit) {
    return {
      kicker: 'TARGET HIT',
      main: 'Perfect. Physics agrees with you.',
      sub: `Closest approach: ${result.closest.distance.toFixed(2)} m from the center.`,
      tone: 'success',
    };
  }

  const yAtTarget = (() => {
    const angle = state.angle * Math.PI / 180;
    const vx = state.velocity * Math.cos(angle);
    const vy = state.velocity * Math.sin(angle);
    const t = TARGET_X / vx;
    return vy * t - 0.5 * G * t * t;
  })();

  let main;
  if (result.impactX !== null && result.impactX < TARGET_X - 0.5) {
    main = `Too short by ${(TARGET_X - result.impactX).toFixed(1)} m.`;
  } else if (yAtTarget > TARGET_Y) {
    main = `Too high by ${(yAtTarget - TARGET_Y).toFixed(1)} m at the target.`;
  } else {
    main = `Too low by ${(TARGET_Y - yAtTarget).toFixed(1)} m at the target.`;
  }

  return {
    kicker: 'MISS',
    main,
    sub: `Closest approach: ${result.closest.distance.toFixed(2)} m from the center.`,
    tone: 'miss',
  };
}

function updateResultUI(result) {
  const classification = classifyShot(result);
  resultBox.className = `result-box ${classification.tone}`;
  resultBox.innerHTML = `
    <div class="result-kicker">${classification.kicker}</div>
    <div class="result-main">${classification.main}</div>
    <div class="result-sub">${classification.sub}</div>
  `;
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
        <div class="attempt-values">${attempt.angle}° · ${attempt.velocity.toFixed(1)} m/s</div>
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

  localStorage.setItem('physicsPlayPrototypeScore', JSON.stringify({ total, attempts, hints: state.hintsUsed }));
}

async function fire() {
  if (state.isAnimating || state.solved) return;

  state.isAnimating = true;
  fireBtn.disabled = true;
  angleRange.disabled = true;
  angleNumber.disabled = true;
  velocityRange.disabled = true;
  velocityNumber.disabled = true;
  canvasOverlay.classList.add('hidden');
  statusText.textContent = 'Projectile in flight';
  statusDot.className = 'status-dot active';

  const result = trajectory(state.angle, state.velocity);
  const points = result.points;
  const duration = Math.max(850, Math.min(2200, (result.flightTime || 2.5) * 550));
  const start = performance.now();

  await new Promise((resolve) => {
    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      const pointIndex = Math.min(points.length - 1, Math.floor(progress * (points.length - 1)));
      drawScene({
        visiblePoints: points.slice(0, pointIndex + 1),
        currentPoint: points[pointIndex],
      });
      if (progress < 1) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });

  state.attempts.push({
    angle: state.angle,
    velocity: state.velocity,
    path: points,
    hit: result.hit,
    closestDistance: result.closest.distance,
    flightTime: result.flightTime,
    maxHeight: result.maxHeight,
  });

  updateResultUI(result);
  updateAttemptsUI();
  drawScene();

  if (result.hit) {
    state.solved = true;
    statusText.textContent = 'Challenge solved';
    statusDot.className = 'status-dot success';
    fireBtn.innerHTML = '<span>SOLVED</span><span class="fire-icon">✓</span>';
    calculateScore();
  } else {
    statusText.textContent = 'Adjust your prediction';
    statusDot.className = 'status-dot';
    fireBtn.disabled = false;
    angleRange.disabled = false;
    angleNumber.disabled = false;
    velocityRange.disabled = false;
    velocityNumber.disabled = false;
  }

  state.isAnimating = false;
}

function reset() {
  state.angle = 35;
  state.velocity = 20;
  state.attempts = [];
  state.isAnimating = false;
  state.solved = false;
  state.hintsUsed = 0;
  state.currentHint = 0;

  angleRange.value = angleNumber.value = 35;
  velocityRange.value = velocityNumber.value = 20;
  angleOutput.value = '35°';
  velocityOutput.value = '20.0 m/s';

  [angleRange, angleNumber, velocityRange, velocityNumber, fireBtn].forEach((el) => el.disabled = false);
  fireBtn.innerHTML = '<span>FIRE</span><span class="fire-icon">↗</span>';
  resultBox.className = 'result-box';
  resultBox.innerHTML = `
    <div class="result-kicker">NO SHOTS YET</div>
    <div class="result-main">Make your prediction.</div>
    <div class="result-sub">Your trajectory will only appear after you fire.</div>
  `;
  attemptsList.innerHTML = '';
  canvasOverlay.classList.remove('hidden');
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
  drawScene();
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

resizeCanvas();
