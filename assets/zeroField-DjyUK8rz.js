import"./style-C1ra3R5z.js";import{S as oe,C as re,F as ce,P as de,W as le,b as ue,A as pe,O as he,H as ve,D as me,M as h,c as fe,d as P,G as ge,g as q,T as I,h as R,l as xe,V as w,m as be,q as we,B as Ce,f as D,x as Me}from"./OrbitControls-BbhHxB-y.js";const ye=89875517923e-1,Ee=4e-6,Se=1e-6,G=-4,V=0,Pe=70,t={q2x:5,attempts:[],hints:0,solved:!1,measured:!1},Re=document.querySelector("#app");Re.innerHTML=`
<main class="shell">
  <header class="topbar">
    <div class="brand-wrap"><div class="logo-mark">Φ</div><div><div class="brand">PHYSICS PLAY</div><div class="tagline">Predict it. Play it. Understand it.</div></div></div>
    <a class="back-link" href="./index.html">← All challenges</a>
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
</main>`;const i=e=>document.querySelector(e),T=i("#positionRange"),g=i("#positionNumber"),U=i("#positionOutput"),x=i("#measureBtn"),Te=i("#resetBtn"),Le=i("#resetViewBtn"),u=i("#resultBox"),Y=i("#attemptsList"),C=i("#statusText"),M=i("#statusDot"),z=i("#sceneOverlay"),L=i("#e1Readout"),k=i("#e2Readout"),F=i("#netReadout"),p=i("#hintBtn"),Z=i("#hintContent"),Q=i("#hintCounter"),j=i("#scoreValue"),W=i("#accuracyScore"),K=i("#efficiencyScore"),X=i("#understandingScore"),_=i("#scoreCopy"),ke=["<strong>Hint 1 · Direction first.</strong><br>At P, the +4 μC charge on the left produces a field toward +x. The movable +1 μC charge on the right produces a field toward −x. For zero net field, their magnitudes must match.",'<strong>Hint 2 · Coulomb field.</strong><br><span class="formula">E = k|Q| / r²</span><br>The larger charge can be farther away and still create the same field.','<strong>Hint 3 · Equate the magnitudes.</strong><br><span class="formula">k·4/(4²) = k·1/x²</span><br>The constants cancel. Solve for the movable charge distance from P.'];function Fe(e,s,n){return Math.min(n,Math.max(s,e))}function $(e,s){const n=V-s,a=Math.abs(n),r=ye*Math.abs(e)/(a*a),l=e>0?Math.sign(n):-Math.sign(n);return r*l}function He(){const e=$(Ee,G),s=$(Se,t.q2x);return{e1:e,e2:s,net:e+s}}const o=new oe;o.background=new re(593952);o.fog=new ce(593952,22,55);const v=new de(46,1,.1,100);v.position.set(2,10,18);const d=new le({antialias:!0,powerPreference:"high-performance"});d.setPixelRatio(Math.min(devicePixelRatio||1,2));d.outputColorSpace=ue;d.toneMapping=pe;d.toneMappingExposure=1.05;d.shadowMap.enabled=!0;i("#fieldScene").appendChild(d.domElement);const c=new he(v,d.domElement);c.enableDamping=!0;c.enablePan=!1;c.minDistance=8;c.maxDistance=35;c.target.set(1,0,0);c.update();o.add(new ve(12044287,1054503,1.5));const H=new me(16777215,2.2);H.position.set(7,12,9);H.castShadow=!0;o.add(H);const y=new h(new fe(24,14),new P({color:1318709,roughness:.95}));y.rotation.x=-Math.PI/2;y.position.y=-.8;y.receiveShadow=!0;o.add(y);const E=new ge(24,24,5466255,2503759);E.position.y=-.78;E.material.opacity=.32;E.material.transparent=!0;o.add(E);function J(e,s,n=1){const a=new D,r=new h(new q(e,36,24),new P({color:s,emissive:s,emissiveIntensity:.18,roughness:.3,metalness:.1}));r.castShadow=!0,a.add(r);const l=new h(new I(e*1.35,.04,12,48),new R({color:s,transparent:!0,opacity:.65}));return l.rotation.x=Math.PI/2,a.add(l),a}const O=J(.62,16737935);O.position.set(G,0,0);o.add(O);const b=J(.48,8359167);b.position.set(t.q2x,0,0);o.add(b);const N=new h(new q(.28,30,18),new P({color:16777215,emissive:11055871,emissiveIntensity:.7,roughness:.2}));N.position.set(0,0,0);o.add(N);const A=new h(new I(.65,.055,12,48),new R({color:16777215,transparent:!0,opacity:.7}));A.rotation.x=Math.PI/2;A.position.copy(N.position);o.add(A);const Oe=new xe().setFromPoints([new w(-9,-.1,0),new w(9,-.1,0)]);o.add(new be(Oe,new we({color:8227237,transparent:!0,opacity:.65})));for(let e=-8;e<=8;e+=2){const s=new h(new Ce(.035,.24,.24),new R({color:8885421}));s.position.set(e,-.1,0),o.add(s)}const f=new D;o.add(f);function ee(){for(;f.children.length;)f.remove(f.children[0])}function S(e,s,n){const a=Math.min(4,Math.max(.2,Math.abs(e)/700)),r=new w(Math.sign(e)||1,0,0),l=new w(V,.45,s),ae=new Me(r,l,a,n,.38,.22);f.add(ae)}function Ne(e,s,n){ee(),S(e,.65,16737935),S(s,-.65,8359167),Math.abs(n)>5&&S(n,0,6873261)}function te(){ee()}function se(){v.position.set(2,10,18),c.target.set(1,0,0),c.update()}Le.addEventListener("click",se);function ne(){const e=i("#fieldScene"),s=Math.max(1,e.clientWidth),n=Math.max(1,e.clientHeight);d.setSize(s,n,!1),v.aspect=s/n,v.updateProjectionMatrix()}new ResizeObserver(ne).observe(i("#fieldScene"));ne();function ie(){c.update(),O.rotation.y+=.003,b.rotation.y-=.003,d.render(o,v),requestAnimationFrame(ie)}requestAnimationFrame(ie);function B(e){const s=Number(e);t.q2x=Number.isFinite(s)?Fe(s,1,8):t.q2x,T.value=t.q2x,g.value=t.q2x,U.value=`+${t.q2x.toFixed(2)} m`,b.position.x=t.q2x,t.measured=!1,te(),L.textContent=k.textContent=F.textContent="Hidden",t.solved||(C.textContent="Place the movable charge",M.className="status-dot")}T.addEventListener("input",e=>B(e.target.value));g.addEventListener("input",e=>{e.target.value!==""&&B(e.target.value)});g.addEventListener("blur",()=>B(g.value||t.q2x));function m(e){return`${e>0?"+":e<0?"−":""}${Math.abs(e).toFixed(0)} N/C`}function Ae(){Y.innerHTML=t.attempts.length?`<div class="attempts-title">Measurements</div>${t.attempts.map((e,s)=>`<div class="attempt-row"><div class="attempt-index">${s+1}</div><div class="attempt-values">x = +${e.x.toFixed(2)} m</div><div class="attempt-outcome ${e.hit?"hit":""}">${e.hit?"ZERO":`${Math.abs(e.net).toFixed(0)} N/C`}</div></div>`).join("")}`:""}function Be(e){const s=Math.max(0,Math.round(100-Math.min(100,Math.abs(e)/18))),n=Math.max(30,100-(t.attempts.length-1)*12-t.hints*8),a=Math.max(55,100-t.hints*15),r=Math.round(s*.5+n*.3+a*.2);j.textContent=r,W.textContent=`${s}%`,K.textContent=`${n}%`,X.textContent=`${a}%`,_.textContent=`Field zeroed in ${t.attempts.length} measurement${t.attempts.length===1?"":"s"}.`}function $e(){if(t.solved)return;z.classList.add("hidden");const{e1:e,e2:s,net:n}=He();t.measured=!0,Ne(e,s,n),L.textContent=m(e),k.textContent=m(s),F.textContent=m(n);const a=Math.abs(n)<=Pe;if(t.attempts.push({x:t.q2x,net:n,hit:a}),Ae(),a)t.solved=!0,C.textContent="Field cancelled",M.className="status-dot success",u.className="result-box success",u.innerHTML=`<div class="result-kicker">FIELD ZEROED</div><div class="result-main">The two field vectors cancel at P.</div><div class="result-sub">Net field: ${m(n)}. Position: +${t.q2x.toFixed(2)} m.</div>`,x.disabled=!0,x.innerHTML="<span>ZERO FIELD</span><span>✓</span>",Be(n);else{C.textContent="Adjust the charge position",M.className="status-dot";const r=n>0?"The +4 μC field is stronger. Move the +1 μC charge closer to P.":"The +1 μC field is stronger. Move it farther from P.";u.className="result-box miss",u.innerHTML=`<div class="result-kicker">NOT ZERO YET</div><div class="result-main">${m(n)}</div><div class="result-sub">${r}</div>`}}function qe(){t.hints>=3||(Z.innerHTML=ke[t.hints],t.hints++,Q.textContent=`${t.hints} / 3`,t.hints===3?(p.textContent="All hints shown",p.disabled=!0):p.textContent=`Show hint ${t.hints+1}`)}function Ie(){t.q2x=5,t.attempts=[],t.hints=0,t.solved=!1,t.measured=!1,T.value=g.value=5,U.value="+5.00 m",b.position.x=5,x.disabled=!1,x.innerHTML='<span>MEASURE FIELD</span><span class="fire-icon">E</span>',u.className="result-box",u.innerHTML='<div class="result-kicker">NO MEASUREMENT YET</div><div class="result-main">Position the +1 μC charge.</div><div class="result-sub">The field values remain hidden until you commit to a measurement.</div>',Y.innerHTML="",C.textContent="Place the movable charge",M.className="status-dot",z.classList.remove("hidden"),L.textContent=k.textContent=F.textContent="Hidden",te(),Z.innerHTML="Remember: fields are vectors. At the probe the two positive charges push in opposite directions.",Q.textContent="0 / 3",p.textContent="Show hint 1",p.disabled=!1,j.textContent="—",W.textContent="—",K.textContent="—",X.textContent="100%",_.textContent="Zero the field to generate your score.",se()}x.addEventListener("click",$e);Te.addEventListener("click",Ie);p.addEventListener("click",qe);
