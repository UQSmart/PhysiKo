import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <main class="shell">
    <header class="topbar">
      <div class="brand-wrap">
        <a class="logo-mark logo-link" href="/" aria-label="Back to challenges">Φ</a>
        <div>
          <div class="brand">PHYSICS PLAY</div>
          <div class="tagline">Predict it. Play it. Understand it.</div>
        </div>
      </div>
      <a class="prototype-badge home-link" href="/">← ALL CHALLENGES</a>
    </header>

    <section class="hero tangram-hero">
      <div>
        <div class="eyebrow">CHALLENGE #007 · SPATIAL GEOMETRY</div>
        <h1>Build The Shape</h1>
        <p>Use all seven tangram pieces to rebuild the square. Drag the pieces, rotate them in 45° steps and flip the parallelogram when needed.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Pieces</span><strong>7</strong></div>
        <div><span>Rotation step</span><strong>45°</strong></div>
        <div><span>Goal</span><strong>1 square</strong></div>
      </div>
    </section>

    <section class="tangram-layout">
      <article class="sim-card tangram-card">
        <div class="sim-toolbar">
          <div class="status-wrap">
            <span class="status-dot" id="statusDot"></span>
            <span id="statusText">Arrange all 7 pieces inside the silhouette</span>
          </div>
          <div class="toolbar-actions">
            <button class="ghost-btn" id="ghostBtn" type="button">Show outlines</button>
            <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
          </div>
        </div>

        <div class="tangram-stage-wrap">
          <svg id="tangramStage" class="tangram-stage" viewBox="0 0 900 520" role="img" aria-label="Interactive seven-piece tangram board">
            <defs>
              <filter id="pieceShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000" flood-opacity=".28"/>
              </filter>
            </defs>
            <rect x="52" y="66" width="356" height="368" rx="28" class="tangram-board-panel" />
            <text x="80" y="95" class="svg-label">TARGET</text>
            <rect x="80" y="110" width="300" height="300" rx="3" class="target-silhouette" />
            <g id="ghostLayer" class="ghost-layer"></g>

            <rect x="445" y="66" width="405" height="368" rx="28" class="tangram-tray-panel" />
            <text x="475" y="95" class="svg-label">YOUR PIECES</text>
            <g id="pieceLayer"></g>
          </svg>
        </div>

        <div class="tangram-instructions">
          <span><strong>Drag</strong> to move</span>
          <span><strong>Rotate</strong> selected piece by 45°</span>
          <span><strong>Flip</strong> the parallelogram</span>
          <span>Pieces snap when correctly placed</span>
        </div>
      </article>

      <aside class="control-card tangram-controls">
        <div class="section-label">SELECTED PIECE</div>
        <div class="selected-piece-name" id="selectedName">None</div>
        <div class="selected-piece-copy" id="selectedCopy">Click or drag a piece to select it.</div>

        <div class="tangram-action-grid">
          <button class="secondary-btn" id="rotateLeftBtn" type="button" disabled>↺ −45°</button>
          <button class="secondary-btn" id="rotateRightBtn" type="button" disabled>+45° ↻</button>
          <button class="secondary-btn tangram-flip-btn" id="flipBtn" type="button" disabled>⇋ Flip</button>
        </div>

        <div class="result-box tangram-progress-box">
          <div class="result-kicker">PROGRESS</div>
          <div class="tangram-progress-main"><strong id="placedCount">0</strong><span>/ 7 pieces</span></div>
          <div class="tangram-progress-track"><i id="progressBar"></i></div>
        </div>

        <div class="tangram-stats">
          <div><span>Moves</span><strong id="movesValue">0</strong></div>
          <div><span>Time</span><strong id="timeValue">00:00</strong></div>
          <div><span>Best</span><strong id="bestValue">—</strong></div>
        </div>

        <div class="result-box" id="resultBox">
          <div class="result-kicker">SPATIAL CHALLENGE</div>
          <div class="result-main">Rebuild the square using every piece.</div>
          <div class="result-sub">No overlaps, no missing pieces. Use the silhouette first; reveal outlines only if you need a hint.</div>
        </div>
      </aside>
    </section>

    <section class="learning-grid">
      <article class="panel hint-panel">
        <div class="panel-head">
          <div><div class="section-label">GEOMETRY INSIGHT</div><h2>What are you training?</h2></div>
        </div>
        <div class="hint-content">
          Tangram is a composition problem: translations, rotations, reflection, congruence and area all work together. The seven pieces always keep their shape and area — only their pose changes.
        </div>
      </article>

      <article class="panel score-panel">
        <div class="section-label">SPATIAL SCORE</div>
        <div class="score-value" id="scoreValue">—</div>
        <div class="score-breakdown">
          <div><span>Moves</span><strong id="scoreMoves">—</strong></div>
          <div><span>Time</span><strong id="scoreTime">—</strong></div>
          <div><span>Hints</span><strong id="scoreHints">0</strong></div>
        </div>
        <p id="scoreCopy">Complete the square to generate your score.</p>
      </article>
    </section>

    <footer>Prototype 0.5 · Tangram 2D · Vite + Vanilla JavaScript · Static frontend · No backend</footer>
  </main>
`;

const SVG_NS = 'http://www.w3.org/2000/svg';
const SCALE = 75;
const ORIGIN = { x: 80, y: 110 };
const SNAP_DISTANCE = 38;

const canonical = {
  large1: [[4,4],[4,0],[2,2]],
  large2: [[0,4],[4,4],[2,2]],
  medium: [[0,0],[2,0],[0,2]],
  square: [[2,0],[3,1],[2,2],[1,1]],
  parallelogram: [[0,2],[0,4],[1,3],[1,1]],
  small1: [[4,0],[2,0],[3,1]],
  small2: [[1,1],[2,2],[1,3]],
};

const pieceInfo = {
  large1: { label: 'Large triangle A', color: '#7888ff' },
  large2: { label: 'Large triangle B', color: '#55c7c1' },
  medium: { label: 'Medium triangle', color: '#f2c65e' },
  square: { label: 'Square', color: '#ff668c' },
  parallelogram: { label: 'Parallelogram', color: '#ff9f5a' },
  small1: { label: 'Small triangle A', color: '#65d59b' },
  small2: { label: 'Small triangle B', color: '#d982e8' },
};

const initial = {
  large1: { x: 555, y: 185, rotation: 135, flip: false },
  large2: { x: 720, y: 185, rotation: 225, flip: false },
  medium: { x: 530, y: 330, rotation: 90, flip: false },
  square: { x: 655, y: 320, rotation: 45, flip: false },
  parallelogram: { x: 785, y: 330, rotation: 135, flip: true },
  small1: { x: 575, y: 400, rotation: 270, flip: false },
  small2: { x: 735, y: 405, rotation: 90, flip: false },
};

function centroid(points) {
  const sum = points.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y }), { x: 0, y: 0 });
  return { x: sum.x / points.length, y: sum.y / points.length };
}

function canonicalPixels(name) {
  return canonical[name].map(([x,y]) => ({ x: ORIGIN.x + x * SCALE, y: ORIGIN.y + y * SCALE }));
}

const targets = Object.fromEntries(Object.keys(canonical).map((name) => {
  const pts = canonicalPixels(name);
  return [name, { points: pts, center: centroid(pts) }];
}));

function localPoints(name) {
  const pts = canonicalPixels(name);
  const c = centroid(pts);
  return pts.map((p) => ({ x: p.x - c.x, y: p.y - c.y }));
}

const pieces = Object.fromEntries(Object.keys(canonical).map((name) => [name, {
  name,
  ...initial[name],
  local: localPoints(name),
  locked: false,
  element: null,
} ]));

const pieceLayer = document.querySelector('#pieceLayer');
const ghostLayer = document.querySelector('#ghostLayer');
const stage = document.querySelector('#tangramStage');
const statusText = document.querySelector('#statusText');
const statusDot = document.querySelector('#statusDot');
const selectedName = document.querySelector('#selectedName');
const selectedCopy = document.querySelector('#selectedCopy');
const rotateLeftBtn = document.querySelector('#rotateLeftBtn');
const rotateRightBtn = document.querySelector('#rotateRightBtn');
const flipBtn = document.querySelector('#flipBtn');
const ghostBtn = document.querySelector('#ghostBtn');
const resetBtn = document.querySelector('#resetBtn');
const placedCount = document.querySelector('#placedCount');
const progressBar = document.querySelector('#progressBar');
const movesValue = document.querySelector('#movesValue');
const timeValue = document.querySelector('#timeValue');
const bestValue = document.querySelector('#bestValue');
const resultBox = document.querySelector('#resultBox');
const scoreValue = document.querySelector('#scoreValue');
const scoreMoves = document.querySelector('#scoreMoves');
const scoreTime = document.querySelector('#scoreTime');
const scoreHints = document.querySelector('#scoreHints');
const scoreCopy = document.querySelector('#scoreCopy');

let selected = null;
let dragging = null;
let moves = 0;
let hintsUsed = 0;
let startedAt = null;
let timerId = null;
let solved = false;
let ghostVisible = false;

function polygonPoints(points) {
  return points.map((p) => `${p.x},${p.y}`).join(' ');
}

function createGhosts() {
  ghostLayer.innerHTML = '';
  Object.entries(targets).forEach(([name, target]) => {
    const poly = document.createElementNS(SVG_NS, 'polygon');
    poly.setAttribute('points', polygonPoints(target.points));
    poly.setAttribute('class', 'tangram-ghost-piece');
    poly.dataset.name = name;
    ghostLayer.appendChild(poly);
  });
}

function pieceTransform(piece) {
  return `translate(${piece.x} ${piece.y}) rotate(${piece.rotation}) scale(${piece.flip ? -1 : 1} 1)`;
}

function renderPiece(piece) {
  piece.element.setAttribute('transform', pieceTransform(piece));
  piece.element.classList.toggle('selected', selected === piece.name && !piece.locked);
  piece.element.classList.toggle('locked', piece.locked);
}

function createPieces() {
  pieceLayer.innerHTML = '';
  Object.values(pieces).forEach((piece) => {
    const g = document.createElementNS(SVG_NS, 'g');
    g.classList.add('tangram-piece');
    g.dataset.name = piece.name;
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', pieceInfo[piece.name].label);

    const poly = document.createElementNS(SVG_NS, 'polygon');
    poly.setAttribute('points', polygonPoints(piece.local));
    poly.setAttribute('fill', pieceInfo[piece.name].color);
    poly.setAttribute('filter', 'url(#pieceShadow)');
    g.appendChild(poly);

    g.addEventListener('pointerdown', (event) => startDrag(event, piece.name));
    g.addEventListener('keydown', (event) => handlePieceKey(event, piece.name));
    piece.element = g;
    pieceLayer.appendChild(g);
    renderPiece(piece);
  });
}

function svgPoint(event) {
  const pt = stage.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  return pt.matrixTransform(stage.getScreenCTM().inverse());
}

function startTimer() {
  if (startedAt || solved) return;
  startedAt = Date.now();
  timerId = window.setInterval(updateTimer, 250);
}

function elapsedSeconds() {
  return startedAt ? Math.max(0, Math.floor((Date.now() - startedAt) / 1000)) : 0;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateTimer() {
  timeValue.textContent = formatTime(elapsedSeconds());
}

function startDrag(event, name) {
  const piece = pieces[name];
  if (piece.locked || solved) return;
  event.preventDefault();
  startTimer();
  selectPiece(name);
  const point = svgPoint(event);
  dragging = { name, dx: point.x - piece.x, dy: point.y - piece.y, pointerId: event.pointerId };
  piece.element.setPointerCapture(event.pointerId);
  piece.element.addEventListener('pointermove', onDrag);
  piece.element.addEventListener('pointerup', endDrag, { once: true });
  piece.element.addEventListener('pointercancel', endDrag, { once: true });
}

function onDrag(event) {
  if (!dragging) return;
  const piece = pieces[dragging.name];
  const p = svgPoint(event);
  piece.x = p.x - dragging.dx;
  piece.y = p.y - dragging.dy;
  renderPiece(piece);
}

function endDrag(event) {
  if (!dragging) return;
  const name = dragging.name;
  const piece = pieces[name];
  piece.element.removeEventListener('pointermove', onDrag);
  try { piece.element.releasePointerCapture(dragging.pointerId); } catch {}
  dragging = null;
  moves += 1;
  movesValue.textContent = moves;
  trySnap(piece);
}

function normalizedRotation(rotation) {
  return ((rotation % 360) + 360) % 360;
}

function trySnap(piece) {
  const target = targets[piece.name];
  const dist = Math.hypot(piece.x - target.center.x, piece.y - target.center.y);
  const rotationCorrect = normalizedRotation(piece.rotation) === 0;
  const flipCorrect = !piece.flip;

  if (dist <= SNAP_DISTANCE && rotationCorrect && flipCorrect) {
    piece.x = target.center.x;
    piece.y = target.center.y;
    piece.rotation = 0;
    piece.flip = false;
    piece.locked = true;
    renderPiece(piece);
    statusText.textContent = `${pieceInfo[piece.name].label} locked in place`;
    statusDot.className = 'status-dot active';
    selectPiece(null);
    updateProgress();
  } else {
    statusText.textContent = dist <= SNAP_DISTANCE
      ? 'Position is close — check rotation or reflection'
      : 'Keep arranging the pieces';
    statusDot.className = 'status-dot';
  }
}

function selectPiece(name) {
  selected = name;
  Object.values(pieces).forEach(renderPiece);
  if (!name) {
    selectedName.textContent = 'None';
    selectedCopy.textContent = 'Click or drag a piece to select it.';
    rotateLeftBtn.disabled = true;
    rotateRightBtn.disabled = true;
    flipBtn.disabled = true;
    return;
  }
  const piece = pieces[name];
  selectedName.textContent = pieceInfo[name].label;
  selectedCopy.textContent = `Rotation ${normalizedRotation(piece.rotation)}°${piece.flip ? ' · flipped' : ''}`;
  rotateLeftBtn.disabled = piece.locked;
  rotateRightBtn.disabled = piece.locked;
  flipBtn.disabled = piece.locked || name !== 'parallelogram';
}

function rotateSelected(delta) {
  if (!selected) return;
  const piece = pieces[selected];
  if (piece.locked) return;
  startTimer();
  piece.rotation = normalizedRotation(piece.rotation + delta);
  moves += 1;
  movesValue.textContent = moves;
  renderPiece(piece);
  selectPiece(selected);
  trySnap(piece);
}

function flipSelected() {
  if (!selected || selected !== 'parallelogram') return;
  const piece = pieces[selected];
  if (piece.locked) return;
  startTimer();
  piece.flip = !piece.flip;
  moves += 1;
  movesValue.textContent = moves;
  renderPiece(piece);
  selectPiece(selected);
  trySnap(piece);
}

function handlePieceKey(event, name) {
  if (pieces[name].locked) return;
  selectPiece(name);
  const piece = pieces[name];
  let handled = true;
  startTimer();
  switch (event.key) {
    case 'ArrowLeft': piece.x -= 8; break;
    case 'ArrowRight': piece.x += 8; break;
    case 'ArrowUp': piece.y -= 8; break;
    case 'ArrowDown': piece.y += 8; break;
    case 'r': case 'R': piece.rotation = normalizedRotation(piece.rotation + 45); break;
    case 'f': case 'F': if (name === 'parallelogram') piece.flip = !piece.flip; else handled = false; break;
    default: handled = false;
  }
  if (!handled) return;
  event.preventDefault();
  moves += 1;
  movesValue.textContent = moves;
  renderPiece(piece);
  selectPiece(name);
  trySnap(piece);
}

function updateProgress() {
  const count = Object.values(pieces).filter((p) => p.locked).length;
  placedCount.textContent = count;
  progressBar.style.width = `${count / 7 * 100}%`;
  if (count === 7) completePuzzle();
}

function completePuzzle() {
  solved = true;
  if (timerId) clearInterval(timerId);
  updateTimer();
  const seconds = elapsedSeconds();
  statusText.textContent = 'Shape completed';
  statusDot.className = 'status-dot success';
  resultBox.className = 'result-box success';
  resultBox.innerHTML = `<div class="result-kicker">SHAPE COMPLETE</div><div class="result-main">All seven pieces fit.</div><div class="result-sub">${moves} moves · ${formatTime(seconds)}${hintsUsed ? ` · ${hintsUsed} hint used` : ' · no hints'}</div>`;

  const moveScore = Math.max(35, 100 - Math.max(0, moves - 7) * 3);
  const timeScore = Math.max(35, 100 - Math.floor(seconds / 8) * 3);
  const hintScore = hintsUsed ? 70 : 100;
  const total = Math.round(moveScore * .4 + timeScore * .4 + hintScore * .2);
  scoreValue.textContent = total;
  scoreMoves.textContent = moves;
  scoreTime.textContent = formatTime(seconds);
  scoreHints.textContent = hintsUsed;
  scoreCopy.textContent = total >= 90 ? 'Excellent spatial efficiency.' : 'Solved. Try again with fewer moves or without outlines.';

  const currentBest = Number(localStorage.getItem('physicsPlayTangramBest') || 0);
  if (!currentBest || seconds < currentBest) {
    localStorage.setItem('physicsPlayTangramBest', String(seconds));
    bestValue.textContent = formatTime(seconds);
  }
}

function toggleGhosts() {
  ghostVisible = !ghostVisible;
  ghostLayer.classList.toggle('visible', ghostVisible);
  ghostBtn.textContent = ghostVisible ? 'Hide outlines' : 'Show outlines';
  if (ghostVisible) {
    hintsUsed = 1;
    scoreHints.textContent = hintsUsed;
  }
}

function reset() {
  if (timerId) clearInterval(timerId);
  startedAt = null;
  timerId = null;
  solved = false;
  moves = 0;
  hintsUsed = 0;
  ghostVisible = false;
  ghostLayer.classList.remove('visible');
  ghostBtn.textContent = 'Show outlines';
  statusText.textContent = 'Arrange all 7 pieces inside the silhouette';
  statusDot.className = 'status-dot';
  movesValue.textContent = '0';
  timeValue.textContent = '00:00';
  resultBox.className = 'result-box';
  resultBox.innerHTML = '<div class="result-kicker">SPATIAL CHALLENGE</div><div class="result-main">Rebuild the square using every piece.</div><div class="result-sub">No overlaps, no missing pieces. Use the silhouette first; reveal outlines only if you need a hint.</div>';
  scoreValue.textContent = '—';
  scoreMoves.textContent = '—';
  scoreTime.textContent = '—';
  scoreHints.textContent = '0';
  scoreCopy.textContent = 'Complete the square to generate your score.';

  Object.entries(pieces).forEach(([name, piece]) => {
    Object.assign(piece, initial[name]);
    piece.locked = false;
    renderPiece(piece);
  });
  selectPiece(null);
  updateProgress();
}

rotateLeftBtn.addEventListener('click', () => rotateSelected(-45));
rotateRightBtn.addEventListener('click', () => rotateSelected(45));
flipBtn.addEventListener('click', flipSelected);
ghostBtn.addEventListener('click', toggleGhosts);
resetBtn.addEventListener('click', reset);

createGhosts();
createPieces();
const savedBest = Number(localStorage.getItem('physicsPlayTangramBest') || 0);
if (savedBest) bestValue.textContent = formatTime(savedBest);
updateProgress();
