import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const K = 8.9875517923e9;
const Q1 = 4e-6; // +4 µC at x=-4 m
const Q2 = 1e-6; // +1 µC movable on positive x
const Q1_X = -4;
const PROBE_X = 0;
const ZERO_X = 2;
const TOLERANCE = 70; // N/C

const state = { q2x: 5, attempts: [], hints: 0, solved: false, measured: false };
const app = document.querySelector('#app');
app.innerHTML = `
<main class="shell">
  <header class="topbar">
    <div class="brand-wrap"><div class="logo-mark">Φ</div><div><div class="brand">PHYSICS PLAY</div><div class="tagline">Predict it. Play it. Understand it.</div></div></div>
    <a class="back-link" href="/">← All challenges</a>
    <div class="prototype-badge">CHALLENGE 04</div>
  </header>

  <section class="hero">
    <div>
      <div class="eyebrow">ELECTROSTATICS · SUPERPOSITION</div>
      <h1>Zero The Field</h1>
      <p>Move the smaller positive charge until the electric fields from the two charges cancel exactly at the probe. Predict first, then measure.</p>
    </div>
    <div class="challenge-meta">
      <div><span>Fixed charge</span><strong>+4 μC</strong></div>
      <div><span>Movable charge</span><strong>+1 μC</strong></div>
      <div><span>Probe</span><strong>x = 0 m</strong></div>
    </div>
  </section>

  <section class="workspace">
    <article class="sim-card">
      <div class="sim-toolbar">
        <div class="status-wrap"><span class="status-dot" id="statusDot"></span><span id="statusText">Place the movable charge</span></div>
        <div class="toolbar-actions"><button class="ghost-btn" id="resetViewBtn" type="button">Reset view</button><button class="ghost-btn" id="resetBtn" type="button">Reset</button></div>
      </div>
      <div class="scene-wrap field-scene-wrap">
        <div id="fieldScene" class="three-scene" aria-label="3D electrostatics field scene"></div>
        <div class="scene-overlay" id="sceneOverlay"><div class="overlay-kicker">YOUR MISSION</div><div class="overlay-title">Make E = 0 at the probe</div><div class="overlay-copy">Move +1 μC, then measure. Drag to orbit · scroll to zoom.</div></div>
        <div class="scene-readout"><span>PROBE</span><strong>x = 0 m</strong></div>
      </div>
      <div class="field-live-strip">
        <div><span>Field from +4 μC</span><strong id="e1Readout">Hidden</strong></div>
        <div><span>Field from +1 μC</span><strong id="e2Readout">Hidden</strong></div>
        <div><span>Net field at probe</span><strong id="netReadout">Hidden</strong></div>
      </div>
    </article>

    <aside class="control-card">
      <div class="section-label">YOUR PREDICTION</div>
      <div class="control-block">
        <div class="control-head"><label for="positionRange">Movable charge position</label><output id="positionOutput">+5.00 m</output></div>
        <input id="positionRange" type="range" min="1" max="8" step="0.01" value="5" />
        <input id="positionNumber" class="number-input" type="number" min="1" max="8" step="0.01" value="5" />
      </div>
      <div class="field-question"><span>Target</span><strong>Make the vector sum of the two electric fields equal zero at P.</strong></div>
      <button class="fire-btn" id="measureBtn" type="button"><span>MEASURE FIELD</span><span class="fire-icon">E</span></button>
      <div class="result-box" id="resultBox"><div class="result-kicker">NO MEASUREMENT YET</div><div class="result-main">Position the +1 μC charge.</div><div class="result-sub">The field values remain hidden until you commit to a measurement.</div></div>
      <div class="attempts" id="attemptsList"></div>
    </aside>
  </section>

  <section class="learning-grid">
    <article class="panel hint-panel">
      <div class="panel-head"><div><div class="section-label">STUCK?</div><h2>Progressive hints</h2></div><div class="hint-counter" id="hintCounter">0 / 3</div></div>
      <div id="hintContent" class="hint-content">Remember: fields are vectors. At the probe the two positive charges push in opposite directions.</div>
      <button class="secondary-btn" id="hintBtn" type="button">Show hint 1</button>
    </article>
    <article class="panel score-panel">
      <div class="section-label">PHYSICS SCORE</div><div class="score-value" id="scoreValue">—</div>
      <div class="score-breakdown"><div><span>Accuracy</span><strong id="accuracyScore">—</strong></div><div><span>Efficiency</span><strong id="efficiencyScore">—</strong></div><div><span>Understanding</span><strong id="understandingScore">100%</strong></div></div>
      <p id="scoreCopy">Zero the field to generate your score.</p>
    </article>
  </section>
  <footer>Physics Play · Challenge 04 · Coulomb's law + superposition · Static frontend</footer>
</main>`;

const $ = s => document.querySelector(s);
const positionRange=$('#positionRange'),positionNumber=$('#positionNumber'),positionOutput=$('#positionOutput');
const measureBtn=$('#measureBtn'),resetBtn=$('#resetBtn'),resetViewBtn=$('#resetViewBtn');
const resultBox=$('#resultBox'),attemptsList=$('#attemptsList'),statusText=$('#statusText'),statusDot=$('#statusDot');
const sceneOverlay=$('#sceneOverlay'),e1Readout=$('#e1Readout'),e2Readout=$('#e2Readout'),netReadout=$('#netReadout');
const hintBtn=$('#hintBtn'),hintContent=$('#hintContent'),hintCounter=$('#hintCounter');
const scoreValue=$('#scoreValue'),accuracyScore=$('#accuracyScore'),efficiencyScore=$('#efficiencyScore'),understandingScore=$('#understandingScore'),scoreCopy=$('#scoreCopy');

const hints=[
  `<strong>Hint 1 · Direction first.</strong><br>At P, the +4 μC charge on the left produces a field toward +x. The movable +1 μC charge on the right produces a field toward −x. For zero net field, their magnitudes must match.`,
  `<strong>Hint 2 · Coulomb field.</strong><br><span class="formula">E = k|Q| / r²</span><br>The larger charge can be farther away and still create the same field.`,
  `<strong>Hint 3 · Equate the magnitudes.</strong><br><span class="formula">k·4/(4²) = k·1/x²</span><br>The constants cancel. Solve for the movable charge distance from P.`
];

function clamp(v,min,max){return Math.min(max,Math.max(min,v));}
function fieldAtProbe(q,qx){
  const dx=PROBE_X-qx;
  const r=Math.abs(dx);
  const magnitude=K*Math.abs(q)/(r*r);
  const direction=q>0?Math.sign(dx): -Math.sign(dx);
  return magnitude*direction;
}
function fields(){const e1=fieldAtProbe(Q1,Q1_X),e2=fieldAtProbe(Q2,state.q2x);return {e1,e2,net:e1+e2};}

// ---------- 3D lab ----------
const scene=new THREE.Scene(); scene.background=new THREE.Color(0x091020); scene.fog=new THREE.Fog(0x091020,22,55);
const camera=new THREE.PerspectiveCamera(46,1,.1,100); camera.position.set(2,10,18);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;$('#fieldScene').appendChild(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=8;controls.maxDistance=35;controls.target.set(1,0,0);controls.update();
scene.add(new THREE.HemisphereLight(0xb7c7ff,0x101727,1.5));const light=new THREE.DirectionalLight(0xffffff,2.2);light.position.set(7,12,9);light.castShadow=true;scene.add(light);
const plane=new THREE.Mesh(new THREE.PlaneGeometry(24,14),new THREE.MeshStandardMaterial({color:0x141f35,roughness:.95}));plane.rotation.x=-Math.PI/2;plane.position.y=-.8;plane.receiveShadow=true;scene.add(plane);
const grid=new THREE.GridHelper(24,24,0x53688f,0x26344f);grid.position.y=-.78;grid.material.opacity=.32;grid.material.transparent=true;scene.add(grid);

function makeCharge(radius,color,labelScale=1){
  const g=new THREE.Group();
  const ball=new THREE.Mesh(new THREE.SphereGeometry(radius,36,24),new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.18,roughness:.3,metalness:.1}));ball.castShadow=true;g.add(ball);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(radius*1.35,.04,12,48),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.65}));ring.rotation.x=Math.PI/2;g.add(ring);
  return g;
}
const fixedCharge=makeCharge(.62,0xff668f);fixedCharge.position.set(Q1_X,0,0);scene.add(fixedCharge);
const movingCharge=makeCharge(.48,0x7f8cff);movingCharge.position.set(state.q2x,0,0);scene.add(movingCharge);
const probe=new THREE.Mesh(new THREE.SphereGeometry(.28,30,18),new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xa8b2ff,emissiveIntensity:.7,roughness:.2}));probe.position.set(0,0,0);scene.add(probe);
const probeRing=new THREE.Mesh(new THREE.TorusGeometry(.65,.055,12,48),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.7}));probeRing.rotation.x=Math.PI/2;probeRing.position.copy(probe.position);scene.add(probeRing);

// x axis
const axisGeo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-9,-.1,0),new THREE.Vector3(9,-.1,0)]);scene.add(new THREE.Line(axisGeo,new THREE.LineBasicMaterial({color:0x7d89a5,transparent:true,opacity:.65})));
for(let x=-8;x<=8;x+=2){const tick=new THREE.Mesh(new THREE.BoxGeometry(.035,.24,.24),new THREE.MeshBasicMaterial({color:0x8794ad}));tick.position.set(x,-.1,0);scene.add(tick);}

const arrows=new THREE.Group();scene.add(arrows);
function clearArrows(){while(arrows.children.length)arrows.remove(arrows.children[0]);}
function addFieldArrow(value,z,color){
  const mag=Math.min(4,Math.max(.2,Math.abs(value)/700));const dir=new THREE.Vector3(Math.sign(value)||1,0,0);const origin=new THREE.Vector3(PROBE_X,.45,z);
  const a=new THREE.ArrowHelper(dir,origin,mag,color,.38,.22);arrows.add(a);
}
function showFieldVectors(e1,e2,net){clearArrows();addFieldArrow(e1,.65,0xff668f);addFieldArrow(e2,-.65,0x7f8cff);if(Math.abs(net)>5)addFieldArrow(net,0,0x68e0ad);}
function hideFieldVectors(){clearArrows();}

function resetView(){camera.position.set(2,10,18);controls.target.set(1,0,0);controls.update();}resetViewBtn.addEventListener('click',resetView);
function resize(){const host=$('#fieldScene'),w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe($('#fieldScene'));resize();
function render(){controls.update();fixedCharge.rotation.y+=.003;movingCharge.rotation.y-=.003;renderer.render(scene,camera);requestAnimationFrame(render);}requestAnimationFrame(render);

function syncPosition(raw){const n=Number(raw);state.q2x=Number.isFinite(n)?clamp(n,1,8):state.q2x;positionRange.value=state.q2x;positionNumber.value=state.q2x;positionOutput.value=`+${state.q2x.toFixed(2)} m`;movingCharge.position.x=state.q2x;state.measured=false;hideFieldVectors();e1Readout.textContent=e2Readout.textContent=netReadout.textContent='Hidden';if(!state.solved){statusText.textContent='Place the movable charge';statusDot.className='status-dot';}}
positionRange.addEventListener('input',e=>syncPosition(e.target.value));positionNumber.addEventListener('input',e=>{if(e.target.value!=='')syncPosition(e.target.value)});positionNumber.addEventListener('blur',()=>syncPosition(positionNumber.value||state.q2x));

function formatField(v){const sign=v>0?'+':v<0?'−':'';return `${sign}${Math.abs(v).toFixed(0)} N/C`;}
function updateAttempts(){attemptsList.innerHTML=state.attempts.length?`<div class="attempts-title">Measurements</div>${state.attempts.map((a,i)=>`<div class="attempt-row"><div class="attempt-index">${i+1}</div><div class="attempt-values">x = +${a.x.toFixed(2)} m</div><div class="attempt-outcome ${a.hit?'hit':''}">${a.hit?'ZERO':`${Math.abs(a.net).toFixed(0)} N/C`}</div></div>`).join('')}`:'';}
function calculateScore(net){const accuracy=Math.max(0,Math.round(100-Math.min(100,Math.abs(net)/18)));const efficiency=Math.max(30,100-(state.attempts.length-1)*12-state.hints*8);const understanding=Math.max(55,100-state.hints*15);const total=Math.round(accuracy*.5+efficiency*.3+understanding*.2);scoreValue.textContent=total;accuracyScore.textContent=`${accuracy}%`;efficiencyScore.textContent=`${efficiency}%`;understandingScore.textContent=`${understanding}%`;scoreCopy.textContent=`Field zeroed in ${state.attempts.length} measurement${state.attempts.length===1?'':'s'}.`;}

function measure(){
  if(state.solved)return;
  sceneOverlay.classList.add('hidden');const {e1,e2,net}=fields();state.measured=true;showFieldVectors(e1,e2,net);e1Readout.textContent=formatField(e1);e2Readout.textContent=formatField(e2);netReadout.textContent=formatField(net);
  const hit=Math.abs(net)<=TOLERANCE;state.attempts.push({x:state.q2x,net,hit});updateAttempts();
  if(hit){state.solved=true;statusText.textContent='Field cancelled';statusDot.className='status-dot success';resultBox.className='result-box success';resultBox.innerHTML=`<div class="result-kicker">FIELD ZEROED</div><div class="result-main">The two field vectors cancel at P.</div><div class="result-sub">Net field: ${formatField(net)}. Position: +${state.q2x.toFixed(2)} m.</div>`;measureBtn.disabled=true;measureBtn.innerHTML='<span>ZERO FIELD</span><span>✓</span>';calculateScore(net);}
  else {statusText.textContent='Adjust the charge position';statusDot.className='status-dot';const direction=net>0?'The +4 μC field is stronger. Move the +1 μC charge closer to P.':'The +1 μC field is stronger. Move it farther from P.';resultBox.className='result-box miss';resultBox.innerHTML=`<div class="result-kicker">NOT ZERO YET</div><div class="result-main">${formatField(net)}</div><div class="result-sub">${direction}</div>`;}
}

function showHint(){if(state.hints>=3)return;hintContent.innerHTML=hints[state.hints];state.hints++;hintCounter.textContent=`${state.hints} / 3`;if(state.hints===3){hintBtn.textContent='All hints shown';hintBtn.disabled=true;}else hintBtn.textContent=`Show hint ${state.hints+1}`;}
function reset(){state.q2x=5;state.attempts=[];state.hints=0;state.solved=false;state.measured=false;positionRange.value=positionNumber.value=5;positionOutput.value='+5.00 m';movingCharge.position.x=5;measureBtn.disabled=false;measureBtn.innerHTML='<span>MEASURE FIELD</span><span class="fire-icon">E</span>';resultBox.className='result-box';resultBox.innerHTML='<div class="result-kicker">NO MEASUREMENT YET</div><div class="result-main">Position the +1 μC charge.</div><div class="result-sub">The field values remain hidden until you commit to a measurement.</div>';attemptsList.innerHTML='';statusText.textContent='Place the movable charge';statusDot.className='status-dot';sceneOverlay.classList.remove('hidden');e1Readout.textContent=e2Readout.textContent=netReadout.textContent='Hidden';hideFieldVectors();hintContent.innerHTML='Remember: fields are vectors. At the probe the two positive charges push in opposite directions.';hintCounter.textContent='0 / 3';hintBtn.textContent='Show hint 1';hintBtn.disabled=false;scoreValue.textContent='—';accuracyScore.textContent='—';efficiencyScore.textContent='—';understandingScore.textContent='100%';scoreCopy.textContent='Zero the field to generate your score.';resetView();}

measureBtn.addEventListener('click',measure);resetBtn.addEventListener('click',reset);hintBtn.addEventListener('click',showHint);
