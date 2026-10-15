import"./style-C1ra3R5z.js";import{S as he,C as ge,F as ye,P as be,V as S,W as Se,b as xe,A as fe,O as we,H as Te,D as Ce,M as x,e as E,d as P,r as Me,k as $e,f as Ee,g as Pe}from"./OrbitControls-BbhHxB-y.js";const ke=8.314,B=2.5,m=180,M=2,y=390,D=220,e={volume:.055,temperature:320,attempts:[],hintsUsed:0,currentHint:0,solved:!1},He=document.querySelector("#app");He.innerHTML=`
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
        <div><span>Gas amount</span><strong>${B.toFixed(1)} mol</strong></div>
        <div><span>Target pressure</span><strong>${m} kPa</strong></div>
        <div><span>Safety limit</span><strong>${y} K</strong></div>
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
          <div><span>Temperature</span><strong id="liveTemp">${e.temperature} K</strong></div>
          <div><span>Volume</span><strong id="liveVolume">${e.volume.toFixed(3)} m³</strong></div>
        </div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR SETTINGS</div>

        <div class="control-block">
          <div class="control-head"><label for="volumeRange">Volume</label><output id="volumeOutput">${e.volume.toFixed(3)} m³</output></div>
          <input id="volumeRange" type="range" min="0.030" max="0.080" step="0.001" value="${e.volume}" />
          <input id="volumeNumber" class="number-input" type="number" min="0.030" max="0.080" step="0.001" value="${e.volume}" />
        </div>

        <div class="control-block">
          <div class="control-head"><label for="temperatureRange">Temperature</label><output id="temperatureOutput">${e.temperature} K</output></div>
          <input id="temperatureRange" type="range" min="280" max="430" step="1" value="${e.temperature}" />
          <input id="temperatureNumber" class="number-input" type="number" min="280" max="430" step="1" value="${e.temperature}" />
        </div>

        <button class="fire-btn" id="testBtn" type="button"><span>TEST STATE</span><span class="fire-icon">⏱</span></button>

        <div class="result-box" id="resultBox">
          <div class="result-kicker">NO TESTS YET</div>
          <div class="result-main">Set volume and temperature.</div>
          <div class="result-sub">Your goal is ${m} ± ${M} kPa while staying below ${y} K.</div>
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
`;const $=document.querySelector("#threeScene"),z=document.querySelector("#sceneOverlay"),G=document.querySelector("#volumeRange"),K=document.querySelector("#volumeNumber"),U=document.querySelector("#volumeOutput"),I=document.querySelector("#temperatureRange"),Y=document.querySelector("#temperatureNumber"),W=document.querySelector("#temperatureOutput"),b=document.querySelector("#testBtn"),Re=document.querySelector("#resetBtn"),Le=document.querySelector("#resetViewBtn"),Ae=document.querySelector("#zoomInBtn"),qe=document.querySelector("#zoomOutBtn"),d=document.querySelector("#resultBox"),_=document.querySelector("#attemptsList"),h=document.querySelector("#hintBtn"),j=document.querySelector("#hintContent"),X=document.querySelector("#hintCounter"),T=document.querySelector("#statusText"),C=document.querySelector("#statusDot"),L=document.querySelector("#livePressure"),Z=document.querySelector("#liveTemp"),J=document.querySelector("#liveVolume"),Q=document.querySelector("#scoreValue"),ee=document.querySelector("#accuracyScore"),te=document.querySelector("#safetyScore"),se=document.querySelector("#understandingScore"),ne=document.querySelector("#scoreCopy"),w=["<strong>Hint 1 · Compression raises pressure.</strong><br>For the same amount of gas and temperature, reducing the volume makes pressure rise.","<strong>Hint 2 · Heating also raises pressure.</strong><br>The ideal-gas relation is proportional to absolute temperature, so work in kelvin, not Celsius.",`<strong>Hint 3 · Use the ideal gas law.</strong><br><span class="formula">PV = nRT</span><br>So <span class="formula">P = nRT / V</span>. Your challenge is to choose T and V so that P ≈ ${m} kPa while T ≤ ${y} K.`];function k(t,s){return B*ke*s/t/1e3}function Fe(t,s,o){return Math.min(Math.max(t,s),o)}const c=new he;c.background=new ge(791332);c.fog=new ye(791332,25,60);const v=new be(48,1,.1,120),oe=new S(10,8,15),ae=new S(0,3.6,0);v.position.copy(oe);const l=new Se({antialias:!0,powerPreference:"high-performance"});l.setPixelRatio(Math.min(window.devicePixelRatio||1,2));l.shadowMap.enabled=!0;l.outputColorSpace=xe;l.toneMapping=fe;l.toneMappingExposure=1.05;$.appendChild(l.domElement);const a=new we(v,l.domElement);a.enableDamping=!0;a.enablePan=!1;a.minDistance=8;a.maxDistance=36;a.target.copy(ae);a.update();c.add(new Te(11188991,1318937,1.7));const A=new Ce(16777215,2.3);A.position.set(8,15,10);A.castShadow=!0;c.add(A);const q=new x(new E(4.4,4.8,.6,48),new P({color:1779261,roughness:.6,metalness:.35}));q.position.y=.3;q.receiveShadow=!0;c.add(q);const p=2.7,re=8.4,ie=new x(new E(p,p,re,48,1,!0),new Me({color:9217535,transparent:!0,opacity:.12,roughness:.1,metalness:.05,side:$e}));ie.position.y=.6+re/2;c.add(ie);const g=new x(new E(p*1.02,p*1.02,.45,48),new P({color:12108249,roughness:.35,metalness:.65}));g.castShadow=!0;c.add(g);const F=new x(new E(.22,.22,4,20),new P({color:8227236,roughness:.35,metalness:.7}));F.castShadow=!0;c.add(F);const H=new Ee;c.add(H);const R=[];for(let t=0;t<48;t+=1){const s=new x(new Pe(.11,10,8),new P({color:t%3===0?16748469:10990335,emissive:2371679,emissiveIntensity:.45})),o=new S(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize();H.add(s),R.push({mesh:s,velocity:o})}function Ve(t){return 3.1+(t-.03)/(.08-.03)*5}function V(){const t=Ve(e.volume);g.position.y=.65+t,F.position.y=g.position.y+2;const s=.9+(e.temperature-280)/150*2;H.userData.speed=s;for(const o of R)(Math.hypot(o.mesh.position.x,o.mesh.position.z)>p-.25||o.mesh.position.y<.9||o.mesh.position.y>g.position.y-.3)&&o.mesh.position.set((Math.random()-.5)*4.2,1+Math.random()*Math.max(.5,t-.8),(Math.random()-.5)*4.2)}R.forEach(t=>{t.mesh.position.set((Math.random()-.5)*4.2,1+Math.random()*5.5,(Math.random()-.5)*4.2)});V();function ce(){v.position.copy(oe),a.target.copy(ae),a.update()}function le(t){const s=new S().subVectors(v.position,a.target).multiplyScalar(t);s.length()<a.minDistance||s.length()>a.maxDistance||v.position.copy(a.target.clone().add(s))}function ue(){const t=Math.max(1,$.clientWidth),s=Math.max(1,$.clientHeight);l.setSize(t,s,!1),v.aspect=t/s,v.updateProjectionMatrix()}new ResizeObserver(ue).observe($);ue();let O=performance.now();function de(t){const s=Math.min(.04,(t-O)/1e3);O=t;const o=g.position.y-.28,r=H.userData.speed||1.2;for(const n of R){if(n.mesh.position.addScaledVector(n.velocity,s*r*3),Math.hypot(n.mesh.position.x,n.mesh.position.z)>p-.18){const i=new S(n.mesh.position.x,0,n.mesh.position.z).normalize();n.velocity.reflect(i),n.mesh.position.x=i.x*(p-.2),n.mesh.position.z=i.z*(p-.2)}n.mesh.position.y>o&&(n.mesh.position.y=o,n.velocity.y*=-1),n.mesh.position.y<.85&&(n.mesh.position.y=.85,n.velocity.y*=-1)}a.update(),l.render(c,v),requestAnimationFrame(de)}requestAnimationFrame(de);function me(t,s,o,r,n){const u=i=>{const pe=Number(t.min),ve=Number(t.max),N=Number(i),f=Number.isFinite(N)?Fe(N,pe,ve):e[r];e[r]=f,t.value=f,s.value=f,o.value=n(f),Z.textContent=`${Math.round(e.temperature)} K`,J.textContent=`${e.volume.toFixed(3)} m³`,L.textContent=`${k(e.volume,e.temperature).toFixed(1)} kPa`,V()};t.addEventListener("input",i=>u(i.target.value)),s.addEventListener("input",i=>{i.target.value!==""&&u(i.target.value)}),s.addEventListener("blur",()=>u(s.value||e[r]))}me(G,K,U,"volume",t=>`${t.toFixed(3)} m³`);me(I,Y,W,"temperature",t=>`${Math.round(t)} K`);function Ne(){_.innerHTML=e.attempts.length?`
    <div class="attempts-title">Attempts</div>
    ${e.attempts.map((t,s)=>`
      <div class="attempt-row">
        <div class="attempt-index">${s+1}</div>
        <div class="attempt-values">${t.volume.toFixed(3)} m³ · ${Math.round(t.temperature)} K</div>
        <div class="attempt-outcome ${t.success?"hit":""}">${t.pressure.toFixed(1)} kPa</div>
      </div>
    `).join("")}
  `:""}function Oe(t){const s=Math.max(0,Math.round(100-Math.abs(t.pressure-m)*8)),o=t.temperature<=y&&t.pressure<=D?100:0,r=Math.max(55,100-e.hintsUsed*15),n=Math.max(40,100-(e.attempts.length-1)*10),u=Math.round(s*.45+o*.25+r*.15+n*.15);Q.textContent=u,ee.textContent=`${s}%`,te.textContent=`${o}%`,se.textContent=`${r}%`,ne.textContent=`Solved in ${e.attempts.length} attempt${e.attempts.length===1?"":"s"}.`}function Be(){if(e.solved)return;z.classList.add("hidden");const t=k(e.volume,e.temperature),s=e.temperature<=y&&t<=D,o=Math.abs(t-m)<=M,r=s&&o,n={volume:e.volume,temperature:e.temperature,pressure:t,success:r};if(e.attempts.push(n),Ne(),!s)d.className="result-box miss",d.innerHTML=`<div class="result-kicker">UNSAFE STATE</div><div class="result-main">The gas crossed a safety limit.</div><div class="result-sub">P = ${t.toFixed(1)} kPa · T = ${Math.round(e.temperature)} K. Reduce heating or decompress the chamber.</div>`,T.textContent="Safety limit exceeded",C.className="status-dot active";else if(r)e.solved=!0,d.className="result-box success",d.innerHTML=`<div class="result-kicker">TARGET REACHED</div><div class="result-main">The chamber is stable at ${t.toFixed(1)} kPa.</div><div class="result-sub">You reached the target without violating the safety envelope.</div>`,T.textContent="Gas stable · challenge solved",C.className="status-dot success",b.disabled=!0,b.innerHTML='<span>SOLVED</span><span class="fire-icon">✓</span>',Oe(n);else{const u=t<m?"Pressure is too low.":"Pressure is too high.";d.className="result-box miss",d.innerHTML=`<div class="result-kicker">SAFE, BUT OFF TARGET</div><div class="result-main">${u}</div><div class="result-sub">Measured pressure: ${t.toFixed(1)} kPa. Target: ${m} ± ${M} kPa.</div>`,T.textContent="Adjust the state",C.className="status-dot"}}function De(){e.currentHint>=w.length||(j.innerHTML=w[e.currentHint],e.currentHint+=1,e.hintsUsed=e.currentHint,X.textContent=`${e.currentHint} / ${w.length}`,e.currentHint>=w.length?(h.disabled=!0,h.textContent="All hints shown"):h.textContent=`Show hint ${e.currentHint+1}`)}function ze(){e.volume=.055,e.temperature=320,e.attempts=[],e.hintsUsed=0,e.currentHint=0,e.solved=!1,G.value=K.value=e.volume,I.value=Y.value=e.temperature,U.value=`${e.volume.toFixed(3)} m³`,W.value=`${e.temperature} K`,L.textContent=`${k(e.volume,e.temperature).toFixed(1)} kPa`,Z.textContent=`${e.temperature} K`,J.textContent=`${e.volume.toFixed(3)} m³`,_.innerHTML="",z.classList.remove("hidden"),d.className="result-box",d.innerHTML=`<div class="result-kicker">NO TESTS YET</div><div class="result-main">Set volume and temperature.</div><div class="result-sub">Your goal is ${m} ± ${M} kPa while staying below ${y} K.</div>`,T.textContent="System stable",C.className="status-dot",b.disabled=!1,b.innerHTML='<span>TEST STATE</span><span class="fire-icon">⏱</span>',j.textContent="Try one state first. Watch how pressure changes when you compress or heat the gas.",X.textContent="0 / 3",h.disabled=!1,h.textContent="Show hint 1",Q.textContent="—",ee.textContent="—",te.textContent="—",se.textContent="100%",ne.textContent="Hit the target pressure safely to generate your score.",V(),ce()}Ae.addEventListener("click",()=>le(.88));qe.addEventListener("click",()=>le(1.14));Le.addEventListener("click",ce);Re.addEventListener("click",ze);b.addEventListener("click",Be);h.addEventListener("click",De);L.textContent=`${k(e.volume,e.temperature).toFixed(1)} kPa`;
