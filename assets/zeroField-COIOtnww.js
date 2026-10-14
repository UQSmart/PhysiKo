import"./style-DgUJRaTf.js";import{C as e,E as t,I as n,M as r,N as i,P as a,T as o,_ as s,a as c,b as l,c as ee,d as te,g as ne,h as u,i as re,j as ie,m as ae,n as oe,o as se,p as ce,t as le,v as ue,x as d}from"./OrbitControls-Cvsnw4M8.js";var de=8987551792.3,fe=4e-6,pe=1e-6,f=-4,p=0,me=70,m={q2x:5,attempts:[],hints:0,solved:!1,measured:!1},he=document.querySelector(`#app`);he.innerHTML=`
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
</main>`;var h=e=>document.querySelector(e),g=h(`#positionRange`),_=h(`#positionNumber`),v=h(`#positionOutput`),y=h(`#measureBtn`),ge=h(`#resetBtn`),_e=h(`#resetViewBtn`),b=h(`#resultBox`),x=h(`#attemptsList`),S=h(`#statusText`),C=h(`#statusDot`),w=h(`#sceneOverlay`),T=h(`#e1Readout`),E=h(`#e2Readout`),D=h(`#netReadout`),O=h(`#hintBtn`),k=h(`#hintContent`),A=h(`#hintCounter`),ve=h(`#scoreValue`),j=h(`#accuracyScore`),M=h(`#efficiencyScore`),N=h(`#understandingScore`),P=h(`#scoreCopy`),ye=[`<strong>Hint 1 · Direction first.</strong><br>At P, the +4 μC charge on the left produces a field toward +x. The movable +1 μC charge on the right produces a field toward −x. For zero net field, their magnitudes must match.`,`<strong>Hint 2 · Coulomb field.</strong><br><span class="formula">E = k|Q| / r²</span><br>The larger charge can be farther away and still create the same field.`,`<strong>Hint 3 · Equate the magnitudes.</strong><br><span class="formula">k·4/(4²) = k·1/x²</span><br>The constants cancel. Solve for the movable charge distance from P.`];function be(e,t,n){return Math.min(n,Math.max(t,e))}function F(e,t){let n=p-t,r=Math.abs(n);return de*Math.abs(e)/(r*r)*(e>0?Math.sign(n):-Math.sign(n))}function xe(){let e=F(fe,f),t=F(pe,m.q2x);return{e1:e,e2:t,net:e+t}}var I=new r;I.background=new ee(593952),I.fog=new ce(593952,22,55);var L=new o(46,1,.1,100);L.position.set(2,10,18);var R=new oe({antialias:!0,powerPreference:`high-performance`});R.setPixelRatio(Math.min(devicePixelRatio||1,2)),R.outputColorSpace=ie,R.toneMapping=4,R.toneMappingExposure=1.05,R.shadowMap.enabled=!0,h(`#fieldScene`).appendChild(R.domElement);var z=new le(L,R.domElement);z.enableDamping=!0,z.enablePan=!1,z.minDistance=8,z.maxDistance=35,z.target.set(1,0,0),z.update(),I.add(new ne(12044287,1054503,1.5));var B=new te(16777215,2.2);B.position.set(7,12,9),B.castShadow=!0,I.add(B);var V=new l(new t(24,14),new e({color:1318709,roughness:.95}));V.rotation.x=-Math.PI/2,V.position.y=-.8,V.receiveShadow=!0,I.add(V);var H=new ae(24,24,5466255,2503759);H.position.y=-.78,H.material.opacity=.32,H.material.transparent=!0,I.add(H);function U(t,n,r=1){let o=new u,s=new l(new i(t,36,24),new e({color:n,emissive:n,emissiveIntensity:.18,roughness:.3,metalness:.1}));s.castShadow=!0,o.add(s);let c=new l(new a(t*1.35,.04,12,48),new d({color:n,transparent:!0,opacity:.65}));return c.rotation.x=Math.PI/2,o.add(c),o}var W=U(.62,16737935);W.position.set(f,0,0),I.add(W);var G=U(.48,8359167);G.position.set(m.q2x,0,0),I.add(G);var K=new l(new i(.28,30,18),new e({color:16777215,emissive:11055871,emissiveIntensity:.7,roughness:.2}));K.position.set(0,0,0),I.add(K);var q=new l(new a(.65,.055,12,48),new d({color:16777215,transparent:!0,opacity:.7}));q.rotation.x=Math.PI/2,q.position.copy(K.position),I.add(q);var Se=new se().setFromPoints([new n(-9,-.1,0),new n(9,-.1,0)]);I.add(new s(Se,new ue({color:8227237,transparent:!0,opacity:.65})));for(let e=-8;e<=8;e+=2){let t=new l(new c(.035,.24,.24),new d({color:8885421}));t.position.set(e,-.1,0),I.add(t)}var J=new u;I.add(J);function Y(){for(;J.children.length;)J.remove(J.children[0])}function X(e,t,r){let i=Math.min(4,Math.max(.2,Math.abs(e)/700)),a=new n(Math.sign(e)||1,0,0),o=new n(p,.45,t),s=new re(a,o,i,r,.38,.22);J.add(s)}function Ce(e,t,n){Y(),X(e,.65,16737935),X(t,-.65,8359167),Math.abs(n)>5&&X(n,0,6873261)}function Z(){Y()}function we(){L.position.set(2,10,18),z.target.set(1,0,0),z.update()}_e.addEventListener(`click`,we);function Te(){let e=h(`#fieldScene`),t=Math.max(1,e.clientWidth),n=Math.max(1,e.clientHeight);R.setSize(t,n,!1),L.aspect=t/n,L.updateProjectionMatrix()}new ResizeObserver(Te).observe(h(`#fieldScene`)),Te();function Ee(){z.update(),W.rotation.y+=.003,G.rotation.y-=.003,R.render(I,L),requestAnimationFrame(Ee)}requestAnimationFrame(Ee);function Q(e){let t=Number(e);m.q2x=Number.isFinite(t)?be(t,1,8):m.q2x,g.value=m.q2x,_.value=m.q2x,v.value=`+${m.q2x.toFixed(2)} m`,G.position.x=m.q2x,m.measured=!1,Z(),T.textContent=E.textContent=D.textContent=`Hidden`,m.solved||(S.textContent=`Place the movable charge`,C.className=`status-dot`)}g.addEventListener(`input`,e=>Q(e.target.value)),_.addEventListener(`input`,e=>{e.target.value!==``&&Q(e.target.value)}),_.addEventListener(`blur`,()=>Q(_.value||m.q2x));function $(e){return`${e>0?`+`:e<0?`−`:``}${Math.abs(e).toFixed(0)} N/C`}function De(){x.innerHTML=m.attempts.length?`<div class="attempts-title">Measurements</div>${m.attempts.map((e,t)=>`<div class="attempt-row"><div class="attempt-index">${t+1}</div><div class="attempt-values">x = +${e.x.toFixed(2)} m</div><div class="attempt-outcome ${e.hit?`hit`:``}">${e.hit?`ZERO`:`${Math.abs(e.net).toFixed(0)} N/C`}</div></div>`).join(``)}`:``}function Oe(e){let t=Math.max(0,Math.round(100-Math.min(100,Math.abs(e)/18))),n=Math.max(30,100-(m.attempts.length-1)*12-m.hints*8),r=Math.max(55,100-m.hints*15);ve.textContent=Math.round(t*.5+n*.3+r*.2),j.textContent=`${t}%`,M.textContent=`${n}%`,N.textContent=`${r}%`,P.textContent=`Field zeroed in ${m.attempts.length} measurement${m.attempts.length===1?``:`s`}.`}function ke(){if(m.solved)return;w.classList.add(`hidden`);let{e1:e,e2:t,net:n}=xe();m.measured=!0,Ce(e,t,n),T.textContent=$(e),E.textContent=$(t),D.textContent=$(n);let r=Math.abs(n)<=me;if(m.attempts.push({x:m.q2x,net:n,hit:r}),De(),r)m.solved=!0,S.textContent=`Field cancelled`,C.className=`status-dot success`,b.className=`result-box success`,b.innerHTML=`<div class="result-kicker">FIELD ZEROED</div><div class="result-main">The two field vectors cancel at P.</div><div class="result-sub">Net field: ${$(n)}. Position: +${m.q2x.toFixed(2)} m.</div>`,y.disabled=!0,y.innerHTML=`<span>ZERO FIELD</span><span>✓</span>`,Oe(n);else{S.textContent=`Adjust the charge position`,C.className=`status-dot`;let e=n>0?`The +4 μC field is stronger. Move the +1 μC charge closer to P.`:`The +1 μC field is stronger. Move it farther from P.`;b.className=`result-box miss`,b.innerHTML=`<div class="result-kicker">NOT ZERO YET</div><div class="result-main">${$(n)}</div><div class="result-sub">${e}</div>`}}function Ae(){m.hints>=3||(k.innerHTML=ye[m.hints],m.hints++,A.textContent=`${m.hints} / 3`,m.hints===3?(O.textContent=`All hints shown`,O.disabled=!0):O.textContent=`Show hint ${m.hints+1}`)}function je(){m.q2x=5,m.attempts=[],m.hints=0,m.solved=!1,m.measured=!1,g.value=_.value=5,v.value=`+5.00 m`,G.position.x=5,y.disabled=!1,y.innerHTML=`<span>MEASURE FIELD</span><span class="fire-icon">E</span>`,b.className=`result-box`,b.innerHTML=`<div class="result-kicker">NO MEASUREMENT YET</div><div class="result-main">Position the +1 μC charge.</div><div class="result-sub">The field values remain hidden until you commit to a measurement.</div>`,x.innerHTML=``,S.textContent=`Place the movable charge`,C.className=`status-dot`,w.classList.remove(`hidden`),T.textContent=E.textContent=D.textContent=`Hidden`,Z(),k.innerHTML=`Remember: fields are vectors. At the probe the two positive charges push in opposite directions.`,A.textContent=`0 / 3`,O.textContent=`Show hint 1`,O.disabled=!1,ve.textContent=`—`,j.textContent=`—`,M.textContent=`—`,N.textContent=`100%`,P.textContent=`Zero the field to generate your score.`,we()}y.addEventListener(`click`,ke),ge.addEventListener(`click`,je),O.addEventListener(`click`,Ae);