import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const MU = 398600.4418; // km^3/s^2
const EARTH_R = 6371; // km
const ALTITUDE = 400; // km
const START_R = EARTH_R + ALTITUDE;
const CIRCULAR_SPEED = Math.sqrt(MU / START_R);

const state = {
  speed: 7.2,
  flightAngle: 0,
  running: false,
  attempts: [],
  hints: 0,
  solved: false,
};

const app = document.querySelector('#app');
app.innerHTML = `
<main class="shell">
  <header class="topbar">
    <div class="brand-wrap">
      <div class="logo-mark">Φ</div>
      <div><div class="brand">PHYSICS PLAY</div><div class="tagline">Predict it. Play it. Understand it.</div></div>
    </div>
    <a class="back-link" href="./index.html">← All challenges</a>
    <div class="prototype-badge">CHALLENGE 03</div>
  </header>

  <section class="hero">
    <div>
      <div class="eyebrow">GRAVITATION · ORBITAL MOTION</div>
      <h1>Put It in Orbit</h1>
      <p>Launch a satellite from 400 km above Earth. Choose its speed and direction so gravity bends its path into a stable orbit — not a crash and not an escape.</p>
    </div>
    <div class="challenge-meta">
      <div><span>Earth radius</span><strong>${EARTH_R.toLocaleString()} km</strong></div>
      <div><span>Start altitude</span><strong>${ALTITUDE} km</strong></div>
      <div><span>Gravity model</span><strong>Newtonian</strong></div>
    </div>
  </section>

  <section class="workspace">
    <article class="sim-card">
      <div class="sim-toolbar">
        <div class="status-wrap"><span class="status-dot" id="statusDot"></span><span id="statusText">Ready for launch</span></div>
        <div class="toolbar-actions">
          <button class="ghost-btn" id="resetViewBtn" type="button">Reset view</button>
          <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
        </div>
      </div>
      <div class="scene-wrap orbit-scene-wrap">
        <div id="orbitScene" class="three-scene" aria-label="3D Earth orbit simulation"></div>
        <div class="scene-overlay" id="sceneOverlay">
          <div class="overlay-kicker">YOUR MISSION</div>
          <div class="overlay-title">Create a stable orbit</div>
          <div class="overlay-copy">Drag to orbit the camera · scroll to zoom · choose speed before launch</div>
        </div>
        <div class="scene-readout"><span>MODEL</span><strong>2-BODY GRAVITY</strong></div>
      </div>
      <div class="orbit-live-strip">
        <div><span>Altitude</span><strong id="liveAltitude">400 km</strong></div>
        <div><span>Speed</span><strong id="liveSpeed">7.20 km/s</strong></div>
        <div><span>Elapsed</span><strong id="liveTime">0 min</strong></div>
        <div><span>Path</span><strong id="livePath">Waiting</strong></div>
      </div>
    </article>

    <aside class="control-card">
      <div class="section-label">YOUR LAUNCH</div>
      <div class="control-block">
        <div class="control-head"><label for="speedRange">Initial speed</label><output id="speedOutput">7.20 km/s</output></div>
        <input id="speedRange" type="range" min="5.5" max="11.5" step="0.01" value="7.2" />
        <input id="speedNumber" class="number-input" type="number" min="5.5" max="11.5" step="0.01" value="7.2" />
      </div>
      <div class="control-block">
        <div class="control-head"><label for="angleRange">Direction from tangent</label><output id="angleOutput">0.0°</output></div>
        <input id="angleRange" type="range" min="-20" max="20" step="0.1" value="0" />
        <input id="angleNumber" class="number-input" type="number" min="-20" max="20" step="0.1" value="0" />
      </div>
      <div class="orbit-question"><span>Target</span><strong>Survive one full revolution with no collision or escape.</strong></div>
      <button class="fire-btn" id="launchBtn" type="button"><span>LAUNCH</span><span class="fire-icon">◉</span></button>
      <div class="result-box" id="resultBox">
        <div class="result-kicker">NO LAUNCH YET</div><div class="result-main">Choose the satellite's initial velocity.</div><div class="result-sub">The trajectory is hidden until you launch.</div>
      </div>
      <div class="attempts" id="attemptsList"></div>
    </aside>
  </section>

  <section class="learning-grid">
    <article class="panel hint-panel">
      <div class="panel-head"><div><div class="section-label">STUCK?</div><h2>Progressive hints</h2></div><div class="hint-counter" id="hintCounter">0 / 3</div></div>
      <div id="hintContent" class="hint-content">Try a launch first. Too slow falls inward; too fast can escape.</div>
      <button class="secondary-btn" id="hintBtn" type="button">Show hint 1</button>
    </article>
    <article class="panel score-panel">
      <div class="section-label">PHYSICS SCORE</div><div class="score-value" id="scoreValue">—</div>
      <div class="score-breakdown"><div><span>Stability</span><strong id="stabilityScore">—</strong></div><div><span>Efficiency</span><strong id="efficiencyScore">—</strong></div><div><span>Understanding</span><strong id="understandingScore">100%</strong></div></div>
      <p id="scoreCopy">Create a stable orbit to generate your score.</p>
    </article>
  </section>
  <footer>Physics Play · Challenge 03 · Three.js · Static frontend</footer>
</main>`;

const $ = (s) => document.querySelector(s);
const speedRange = $('#speedRange');
const speedNumber = $('#speedNumber');
const speedOutput = $('#speedOutput');
const angleRange = $('#angleRange');
const angleNumber = $('#angleNumber');
const angleOutput = $('#angleOutput');
const launchBtn = $('#launchBtn');
const resetBtn = $('#resetBtn');
const resetViewBtn = $('#resetViewBtn');
const resultBox = $('#resultBox');
const attemptsList = $('#attemptsList');
const statusText = $('#statusText');
const statusDot = $('#statusDot');
const sceneOverlay = $('#sceneOverlay');
const hintBtn = $('#hintBtn');
const hintContent = $('#hintContent');
const hintCounter = $('#hintCounter');
const liveAltitude = $('#liveAltitude');
const liveSpeed = $('#liveSpeed');
const liveTime = $('#liveTime');
const livePath = $('#livePath');
const scoreValue = $('#scoreValue');
const stabilityScore = $('#stabilityScore');
const efficiencyScore = $('#efficiencyScore');
const understandingScore = $('#understandingScore');
const scoreCopy = $('#scoreCopy');

const hints = [
  `<strong>Hint 1 · Sideways is the key.</strong><br>An orbit is continuous free fall. The satellite needs enough tangential speed that Earth curves away beneath it as fast as it falls.`,
  `<strong>Hint 2 · Circular-orbit condition.</strong><br><span class="formula">v² / r = GM / r²</span><br>For a circular orbit, centripetal acceleration must equal gravitational acceleration.`,
  `<strong>Hint 3 · Solve for speed.</strong><br><span class="formula">v = √(GM/r)</span><br>At ${ALTITUDE} km altitude, the circular-orbit speed is about <strong>${CIRCULAR_SPEED.toFixed(2)} km/s</strong>. Keep the direction close to tangent.`
];

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
function bindPair(range, number, output, key, format) {
  const sync = (raw) => {
    const n = Number(raw);
    state[key] = Number.isFinite(n) ? clamp(n, Number(range.min), Number(range.max)) : state[key];
    range.value = state[key]; number.value = state[key]; output.value = format(state[key]);
    updateVelocityArrow();
  };
  range.addEventListener('input', e => sync(e.target.value));
  number.addEventListener('input', e => { if (e.target.value !== '') sync(e.target.value); });
  number.addEventListener('blur', () => sync(number.value || state[key]));
}

// 3D scene uses Earth-radius-normalized coordinates.
const SCALE_R = 8;
const kmToScene = (km) => km / EARTH_R * SCALE_R;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050914);
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 120);
camera.position.set(15, 11, 18);
const renderer = new THREE.WebGLRenderer({ antialias:true, powerPreference:'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
$('#orbitScene').appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 10; controls.maxDistance = 45; controls.enablePan = false;
controls.target.set(0,0,0);

scene.add(new THREE.AmbientLight(0x53668a, 0.8));
const sun = new THREE.DirectionalLight(0xffffff, 3.2); sun.position.set(12,10,8); scene.add(sun);
const rim = new THREE.DirectionalLight(0x5377ff, 1.7); rim.position.set(-10,-2,-8); scene.add(rim);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(SCALE_R, 72, 48),
  new THREE.MeshStandardMaterial({ color:0x245fa8, roughness:0.78, metalness:0.04, emissive:0x07142b, emissiveIntensity:0.35 })
);
earth.castShadow = true; earth.receiveShadow = true; scene.add(earth);
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(SCALE_R*1.025, 72, 48),
  new THREE.MeshBasicMaterial({ color:0x7bc4ff, transparent:true, opacity:0.09, side:THREE.BackSide })
); scene.add(atmosphere);

const starsGeo = new THREE.BufferGeometry();
const starPos = [];
for (let i=0;i<500;i++) {
  const r = 45 + Math.random()*20; const a=Math.random()*Math.PI*2; const u=Math.random()*2-1; const s=Math.sqrt(1-u*u);
  starPos.push(r*s*Math.cos(a), r*u, r*s*Math.sin(a));
}
starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos,3));
scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({ color:0xaab8d8, size:0.08, transparent:true, opacity:0.8 })));

const satellite = new THREE.Group();
const satBody = new THREE.Mesh(new THREE.BoxGeometry(.36,.28,.36), new THREE.MeshStandardMaterial({color:0xe8edf8, metalness:.65, roughness:.25}));
satellite.add(satBody);
const panelMat = new THREE.MeshStandardMaterial({color:0x415bd1, metalness:.35, roughness:.4});
for (const z of [-.52,.52]) { const p=new THREE.Mesh(new THREE.BoxGeometry(.16,.05,.65), panelMat); p.position.z=z; satellite.add(p); }
scene.add(satellite);

const arrow = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(), 2, 0xff6f9e, .45, .25); scene.add(arrow);
const pathGroup = new THREE.Group(); scene.add(pathGroup);
let pathLine = null;

function resetSatelliteVisual() {
  satellite.position.set(kmToScene(START_R),0,0);
  updateVelocityArrow();
}
function updateVelocityArrow() {
  if (!arrow) return;
  const g = state.flightAngle * Math.PI/180;
  const dir = new THREE.Vector3(Math.sin(g),0,Math.cos(g)).normalize();
  arrow.position.copy(satellite.position);
  arrow.setDirection(dir);
  arrow.setLength(1.7 + (state.speed-5.5)*.18, .42, .22);
}
function clearPath() {
  while(pathGroup.children.length){ const o=pathGroup.children[0]; pathGroup.remove(o); o.geometry?.dispose(); o.material?.dispose(); }
  pathLine=null;
}
function resetView(){ camera.position.set(15,11,18); controls.target.set(0,0,0); controls.update(); }
resetViewBtn.addEventListener('click', resetView);

function resize(){ const host=$('#orbitScene'); const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight); renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); }
new ResizeObserver(resize).observe($('#orbitScene')); resize();
function render(){ controls.update(); earth.rotation.y += 0.00035; renderer.render(scene,camera); requestAnimationFrame(render); } requestAnimationFrame(render);

function simulate(speed, flightAngle) {
  // x-z orbital plane, seconds and km.
  let x=START_R, z=0;
  const g=flightAngle*Math.PI/180;
  let vx=speed*Math.sin(g), vz=speed*Math.cos(g);
  let t=0, angleTravel=0, lastAngle=Math.atan2(z,x), minR=Infinity,maxR=0;
  const dt=5; const maxT=16000; const pts=[];
  let outcome='timeout';
  while(t<maxT){
    const r=Math.hypot(x,z); minR=Math.min(minR,r); maxR=Math.max(maxR,r);
    if(r<=EARTH_R){outcome='crash';break;}
    if(r>EARTH_R*4){outcome='escape';break;}
    pts.push({x,z,t,r,speed:Math.hypot(vx,vz)});
    const ax=-MU*x/(r*r*r), az=-MU*z/(r*r*r);
    // velocity Verlet-ish semi-implicit Euler; enough at dt=5 s.
    vx+=ax*dt; vz+=az*dt; x+=vx*dt; z+=vz*dt; t+=dt;
    const a=Math.atan2(z,x); let da=a-lastAngle; if(da>Math.PI)da-=2*Math.PI; if(da<-Math.PI)da+=2*Math.PI; angleTravel+=Math.abs(da); lastAngle=a;
    if(angleTravel>=Math.PI*2){outcome='orbit';break;}
  }
  const radialVariation=(maxR-minR)/START_R;
  return {pts,outcome,t,minR,maxR,radialVariation};
}

function drawPath(points, upto=points.length){
  const vectors=points.slice(0,upto).map(p=>new THREE.Vector3(kmToScene(p.x),0,kmToScene(p.z)));
  if(vectors.length<2)return;
  if(!pathLine){ pathLine=new THREE.Line(new THREE.BufferGeometry(),new THREE.LineBasicMaterial({color:0x9aa7ff,transparent:true,opacity:.95})); pathGroup.add(pathLine); }
  pathLine.geometry.dispose(); pathLine.geometry=new THREE.BufferGeometry().setFromPoints(vectors);
}

function updateAttempts(){ attemptsList.innerHTML = state.attempts.length ? `<div class="attempts-title">Attempts</div>${state.attempts.map((a,i)=>`<div class="attempt-row"><div class="attempt-index">${i+1}</div><div class="attempt-values">${a.speed.toFixed(2)} km/s · ${a.angle.toFixed(1)}°</div><div class="attempt-outcome ${a.outcome==='orbit'?'hit':''}">${a.outcome.toUpperCase()}</div></div>`).join('')}` : ''; }
function resultMessage(sim){
  if(sim.outcome==='orbit') return ['ORBIT ACHIEVED','The satellite completed a full revolution without touching Earth.',`Radial variation: ${(sim.radialVariation*100).toFixed(1)}%.`,'success'];
  if(sim.outcome==='crash') return ['CRASH','Gravity bent the path into Earth.','Try more tangential speed or a less inward direction.','miss'];
  if(sim.outcome==='escape') return ['ESCAPE','The satellite is leaving the Earth system.','Reduce speed or redirect closer to the tangent.','miss'];
  return ['UNSTABLE','No full stable revolution was completed.','Adjust speed and direction.','miss'];
}
function calculateScore(sim){
  const stability=Math.max(60,Math.round(100-Math.min(40,sim.radialVariation*180)));
  const efficiency=Math.max(30,100-(state.attempts.length-1)*12-state.hints*8);
  const understanding=Math.max(55,100-state.hints*15);
  const total=Math.round(stability*.5+efficiency*.3+understanding*.2);
  scoreValue.textContent=total; stabilityScore.textContent=`${stability}%`; efficiencyScore.textContent=`${efficiency}%`; understandingScore.textContent=`${understanding}%`; scoreCopy.textContent=`Stable orbit in ${state.attempts.length} attempt${state.attempts.length===1?'':'s'}.`;
}

async function launch(){
  if(state.running||state.solved)return;
  state.running=true; launchBtn.disabled=true; speedRange.disabled=speedNumber.disabled=angleRange.disabled=angleNumber.disabled=true;
  sceneOverlay.classList.add('hidden'); statusText.textContent='Satellite in flight'; statusDot.className='status-dot active'; clearPath();
  const sim=simulate(state.speed,state.flightAngle);
  const pts=sim.pts; const duration=Math.min(6500,Math.max(3200,pts.length*5)); const start=performance.now();
  await new Promise(resolve=>{
    function frame(now){ const p=Math.min(1,(now-start)/duration); const idx=Math.min(pts.length-1,Math.floor(p*(pts.length-1))); const q=pts[Math.max(0,idx)];
      if(q){ satellite.position.set(kmToScene(q.x),0,kmToScene(q.z)); arrow.visible=false; drawPath(pts,idx+1); liveAltitude.textContent=`${Math.max(0,q.r-EARTH_R).toFixed(0)} km`; liveSpeed.textContent=`${q.speed.toFixed(2)} km/s`; liveTime.textContent=`${(q.t/60).toFixed(0)} min`; livePath.textContent=sim.outcome==='orbit'?'Closing orbit':'Integrating'; }
      if(p<1)requestAnimationFrame(frame); else resolve(); }
    requestAnimationFrame(frame);
  });
  const [k,m,s,tone]=resultMessage(sim); resultBox.className=`result-box ${tone}`; resultBox.innerHTML=`<div class="result-kicker">${k}</div><div class="result-main">${m}</div><div class="result-sub">${s}</div>`;
  livePath.textContent=sim.outcome.toUpperCase();
  state.attempts.push({speed:state.speed,angle:state.flightAngle,outcome:sim.outcome}); updateAttempts();
  if(sim.outcome==='orbit'){ state.solved=true; statusText.textContent='Stable orbit achieved'; statusDot.className='status-dot success'; launchBtn.innerHTML='<span>ORBIT ACHIEVED</span><span>✓</span>'; calculateScore(sim); }
  else { statusText.textContent='Adjust your launch'; statusDot.className='status-dot'; launchBtn.disabled=false; speedRange.disabled=speedNumber.disabled=angleRange.disabled=angleNumber.disabled=false; arrow.visible=true; resetSatelliteVisual(); }
  state.running=false;
}

function reset(){
  state.speed=7.2;state.flightAngle=0;state.running=false;state.attempts=[];state.hints=0;state.solved=false;
  speedRange.value=speedNumber.value=7.2;speedOutput.value='7.20 km/s';angleRange.value=angleNumber.value=0;angleOutput.value='0.0°';
  launchBtn.disabled=false;launchBtn.innerHTML='<span>LAUNCH</span><span class="fire-icon">◉</span>'; speedRange.disabled=speedNumber.disabled=angleRange.disabled=angleNumber.disabled=false;
  resultBox.className='result-box';resultBox.innerHTML='<div class="result-kicker">NO LAUNCH YET</div><div class="result-main">Choose the satellite\'s initial velocity.</div><div class="result-sub">The trajectory is hidden until you launch.</div>';
  attemptsList.innerHTML='';statusText.textContent='Ready for launch';statusDot.className='status-dot';sceneOverlay.classList.remove('hidden');
  liveAltitude.textContent='400 km';liveSpeed.textContent='7.20 km/s';liveTime.textContent='0 min';livePath.textContent='Waiting';
  hintContent.innerHTML='Try a launch first. Too slow falls inward; too fast can escape.';hintCounter.textContent='0 / 3';hintBtn.textContent='Show hint 1';hintBtn.disabled=false;
  scoreValue.textContent='—';stabilityScore.textContent='—';efficiencyScore.textContent='—';understandingScore.textContent='100%';scoreCopy.textContent='Create a stable orbit to generate your score.';
  clearPath();arrow.visible=true;resetSatelliteVisual();resetView();
}

function showHint(){ if(state.hints>=hints.length)return; hintContent.innerHTML=hints[state.hints];state.hints++;hintCounter.textContent=`${state.hints} / 3`; if(state.hints===3){hintBtn.textContent='All hints shown';hintBtn.disabled=true;}else hintBtn.textContent=`Show hint ${state.hints+1}`; }

bindPair(speedRange,speedNumber,speedOutput,'speed',v=>`${v.toFixed(2)} km/s`);
bindPair(angleRange,angleNumber,angleOutput,'flightAngle',v=>`${v.toFixed(1)}°`);
launchBtn.addEventListener('click',launch);resetBtn.addEventListener('click',reset);hintBtn.addEventListener('click',showHint);
resetSatelliteVisual();
