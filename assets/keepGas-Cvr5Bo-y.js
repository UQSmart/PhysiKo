import"./style-DgUJRaTf.js";import{C as e,I as t,M as n,N as r,S as i,T as a,b as o,c as ee,d as s,g as c,h as te,j as ne,n as re,p as ie,t as ae,u as l}from"./OrbitControls-Cvsnw4M8.js";var oe=8.314,u=2.5,d=180,f=2,p=390,m=220,h={volume:.055,temperature:320,attempts:[],hintsUsed:0,currentHint:0,solved:!1},se=document.querySelector(`#app`);se.innerHTML=`
  <main class="shell">
    <header class="topbar">
      <a class="back-link" href="/">← Challenges</a>
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
        <div><span>Gas amount</span><strong>${u.toFixed(1)} mol</strong></div>
        <div><span>Target pressure</span><strong>${d} kPa</strong></div>
        <div><span>Safety limit</span><strong>${p} K</strong></div>
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
          <div><span>Temperature</span><strong id="liveTemp">${h.temperature} K</strong></div>
          <div><span>Volume</span><strong id="liveVolume">${h.volume.toFixed(3)} m³</strong></div>
        </div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR SETTINGS</div>

        <div class="control-block">
          <div class="control-head"><label for="volumeRange">Volume</label><output id="volumeOutput">${h.volume.toFixed(3)} m³</output></div>
          <input id="volumeRange" type="range" min="0.030" max="0.080" step="0.001" value="${h.volume}" />
          <input id="volumeNumber" class="number-input" type="number" min="0.030" max="0.080" step="0.001" value="${h.volume}" />
        </div>

        <div class="control-block">
          <div class="control-head"><label for="temperatureRange">Temperature</label><output id="temperatureOutput">${h.temperature} K</output></div>
          <input id="temperatureRange" type="range" min="280" max="430" step="1" value="${h.temperature}" />
          <input id="temperatureNumber" class="number-input" type="number" min="280" max="430" step="1" value="${h.temperature}" />
        </div>

        <button class="fire-btn" id="testBtn" type="button"><span>TEST STATE</span><span class="fire-icon">⏱</span></button>

        <div class="result-box" id="resultBox">
          <div class="result-kicker">NO TESTS YET</div>
          <div class="result-main">Set volume and temperature.</div>
          <div class="result-sub">Your goal is ${d} ± ${f} kPa while staying below ${p} K.</div>
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
`;var g=document.querySelector(`#threeScene`),_=document.querySelector(`#sceneOverlay`),v=document.querySelector(`#volumeRange`),y=document.querySelector(`#volumeNumber`),ce=document.querySelector(`#volumeOutput`),le=document.querySelector(`#temperatureRange`),ue=document.querySelector(`#temperatureNumber`),de=document.querySelector(`#temperatureOutput`),b=document.querySelector(`#testBtn`),fe=document.querySelector(`#resetBtn`),pe=document.querySelector(`#resetViewBtn`),me=document.querySelector(`#zoomInBtn`),he=document.querySelector(`#zoomOutBtn`),x=document.querySelector(`#resultBox`),S=document.querySelector(`#attemptsList`),C=document.querySelector(`#hintBtn`),w=document.querySelector(`#hintContent`),T=document.querySelector(`#hintCounter`),E=document.querySelector(`#statusText`),D=document.querySelector(`#statusDot`),O=document.querySelector(`#livePressure`),k=document.querySelector(`#liveTemp`),A=document.querySelector(`#liveVolume`),j=document.querySelector(`#scoreValue`),M=document.querySelector(`#accuracyScore`),N=document.querySelector(`#safetyScore`),P=document.querySelector(`#understandingScore`),F=document.querySelector(`#scoreCopy`),I=[`<strong>Hint 1 · Compression raises pressure.</strong><br>For the same amount of gas and temperature, reducing the volume makes pressure rise.`,`<strong>Hint 2 · Heating also raises pressure.</strong><br>The ideal-gas relation is proportional to absolute temperature, so work in kelvin, not Celsius.`,`<strong>Hint 3 · Use the ideal gas law.</strong><br><span class="formula">PV = nRT</span><br>So <span class="formula">P = nRT / V</span>. Your challenge is to choose T and V so that P ≈ ${d} kPa while T ≤ ${p} K.`];function L(e,t){return u*oe*t/e/1e3}function ge(e,t,n){return Math.min(Math.max(e,t),n)}var R=new n;R.background=new ee(791332),R.fog=new ie(791332,25,60);var z=new a(48,1,.1,120),B=new t(10,8,15),V=new t(0,3.6,0);z.position.copy(B);var H=new re({antialias:!0,powerPreference:`high-performance`});H.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),H.shadowMap.enabled=!0,H.outputColorSpace=ne,H.toneMapping=4,H.toneMappingExposure=1.05,g.appendChild(H.domElement);var U=new ae(z,H.domElement);U.enableDamping=!0,U.enablePan=!1,U.minDistance=8,U.maxDistance=36,U.target.copy(V),U.update(),R.add(new c(11188991,1318937,1.7));var W=new s(16777215,2.3);W.position.set(8,15,10),W.castShadow=!0,R.add(W);var G=new o(new l(4.4,4.8,.6,48),new e({color:1779261,roughness:.6,metalness:.35}));G.position.y=.3,G.receiveShadow=!0,R.add(G);var K=2.7,_e=new o(new l(K,K,8.4,48,1,!0),new i({color:9217535,transparent:!0,opacity:.12,roughness:.1,metalness:.05,side:2}));_e.position.y=4.8,R.add(_e);var q=new o(new l(K*1.02,K*1.02,.45,48),new e({color:12108249,roughness:.35,metalness:.65}));q.castShadow=!0,R.add(q);var J=new o(new l(.22,.22,4,20),new e({color:8227236,roughness:.35,metalness:.7}));J.castShadow=!0,R.add(J);var Y=new te;R.add(Y);var X=[];for(let n=0;n<48;n+=1){let i=new o(new r(.11,10,8),new e({color:n%3==0?16748469:10990335,emissive:2371679,emissiveIntensity:.45})),a=new t(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize();Y.add(i),X.push({mesh:i,velocity:a})}function ve(e){return 3.1+(e-.03)/.05*5}function Z(){let e=ve(h.volume);q.position.y=.65+e,J.position.y=q.position.y+2;let t=.9+(h.temperature-280)/150*2;Y.userData.speed=t;for(let t of X)(Math.hypot(t.mesh.position.x,t.mesh.position.z)>2.45||t.mesh.position.y<.9||t.mesh.position.y>q.position.y-.3)&&t.mesh.position.set((Math.random()-.5)*4.2,1+Math.random()*Math.max(.5,e-.8),(Math.random()-.5)*4.2)}X.forEach(e=>{e.mesh.position.set((Math.random()-.5)*4.2,1+Math.random()*5.5,(Math.random()-.5)*4.2)}),Z();function ye(){z.position.copy(B),U.target.copy(V),U.update()}function be(e){let n=new t().subVectors(z.position,U.target).multiplyScalar(e);n.length()<U.minDistance||n.length()>U.maxDistance||z.position.copy(U.target.clone().add(n))}function xe(){let e=Math.max(1,g.clientWidth),t=Math.max(1,g.clientHeight);H.setSize(e,t,!1),z.aspect=e/t,z.updateProjectionMatrix()}new ResizeObserver(xe).observe(g),xe();var Q=performance.now();function Se(e){let n=Math.min(.04,(e-Q)/1e3);Q=e;let r=q.position.y-.28,i=Y.userData.speed||1.2;for(let e of X){if(e.mesh.position.addScaledVector(e.velocity,n*i*3),Math.hypot(e.mesh.position.x,e.mesh.position.z)>2.52){let n=new t(e.mesh.position.x,0,e.mesh.position.z).normalize();e.velocity.reflect(n),e.mesh.position.x=n.x*2.5,e.mesh.position.z=n.z*2.5}e.mesh.position.y>r&&(e.mesh.position.y=r,e.velocity.y*=-1),e.mesh.position.y<.85&&(e.mesh.position.y=.85,e.velocity.y*=-1)}U.update(),H.render(R,z),requestAnimationFrame(Se)}requestAnimationFrame(Se);function $(e,t,n,r,i){let a=a=>{let o=Number(e.min),ee=Number(e.max),s=Number(a),c=Number.isFinite(s)?ge(s,o,ee):h[r];h[r]=c,e.value=c,t.value=c,n.value=i(c),k.textContent=`${Math.round(h.temperature)} K`,A.textContent=`${h.volume.toFixed(3)} m³`,O.textContent=`${L(h.volume,h.temperature).toFixed(1)} kPa`,Z()};e.addEventListener(`input`,e=>a(e.target.value)),t.addEventListener(`input`,e=>{e.target.value!==``&&a(e.target.value)}),t.addEventListener(`blur`,()=>a(t.value||h[r]))}$(v,y,ce,`volume`,e=>`${e.toFixed(3)} m³`),$(le,ue,de,`temperature`,e=>`${Math.round(e)} K`);function Ce(){S.innerHTML=h.attempts.length?`
    <div class="attempts-title">Attempts</div>
    ${h.attempts.map((e,t)=>`
      <div class="attempt-row">
        <div class="attempt-index">${t+1}</div>
        <div class="attempt-values">${e.volume.toFixed(3)} m³ · ${Math.round(e.temperature)} K</div>
        <div class="attempt-outcome ${e.success?`hit`:``}">${e.pressure.toFixed(1)} kPa</div>
      </div>
    `).join(``)}
  `:``}function we(e){let t=Math.max(0,Math.round(100-Math.abs(e.pressure-d)*8)),n=e.temperature<=p&&e.pressure<=m?100:0,r=Math.max(55,100-h.hintsUsed*15),i=Math.max(40,100-(h.attempts.length-1)*10);j.textContent=Math.round(t*.45+n*.25+r*.15+i*.15),M.textContent=`${t}%`,N.textContent=`${n}%`,P.textContent=`${r}%`,F.textContent=`Solved in ${h.attempts.length} attempt${h.attempts.length===1?``:`s`}.`}function Te(){if(h.solved)return;_.classList.add(`hidden`);let e=L(h.volume,h.temperature),t=h.temperature<=p&&e<=m,n=Math.abs(e-d)<=f,r=t&&n,i={volume:h.volume,temperature:h.temperature,pressure:e,success:r};if(h.attempts.push(i),Ce(),!t)x.className=`result-box miss`,x.innerHTML=`<div class="result-kicker">UNSAFE STATE</div><div class="result-main">The gas crossed a safety limit.</div><div class="result-sub">P = ${e.toFixed(1)} kPa · T = ${Math.round(h.temperature)} K. Reduce heating or decompress the chamber.</div>`,E.textContent=`Safety limit exceeded`,D.className=`status-dot active`;else if(r)h.solved=!0,x.className=`result-box success`,x.innerHTML=`<div class="result-kicker">TARGET REACHED</div><div class="result-main">The chamber is stable at ${e.toFixed(1)} kPa.</div><div class="result-sub">You reached the target without violating the safety envelope.</div>`,E.textContent=`Gas stable · challenge solved`,D.className=`status-dot success`,b.disabled=!0,b.innerHTML=`<span>SOLVED</span><span class="fire-icon">✓</span>`,we(i);else{let t=e<d?`Pressure is too low.`:`Pressure is too high.`;x.className=`result-box miss`,x.innerHTML=`<div class="result-kicker">SAFE, BUT OFF TARGET</div><div class="result-main">${t}</div><div class="result-sub">Measured pressure: ${e.toFixed(1)} kPa. Target: ${d} ± ${f} kPa.</div>`,E.textContent=`Adjust the state`,D.className=`status-dot`}}function Ee(){h.currentHint>=I.length||(w.innerHTML=I[h.currentHint],h.currentHint+=1,h.hintsUsed=h.currentHint,T.textContent=`${h.currentHint} / ${I.length}`,h.currentHint>=I.length?(C.disabled=!0,C.textContent=`All hints shown`):C.textContent=`Show hint ${h.currentHint+1}`)}function De(){h.volume=.055,h.temperature=320,h.attempts=[],h.hintsUsed=0,h.currentHint=0,h.solved=!1,v.value=y.value=h.volume,le.value=ue.value=h.temperature,ce.value=`${h.volume.toFixed(3)} m³`,de.value=`${h.temperature} K`,O.textContent=`${L(h.volume,h.temperature).toFixed(1)} kPa`,k.textContent=`${h.temperature} K`,A.textContent=`${h.volume.toFixed(3)} m³`,S.innerHTML=``,_.classList.remove(`hidden`),x.className=`result-box`,x.innerHTML=`<div class="result-kicker">NO TESTS YET</div><div class="result-main">Set volume and temperature.</div><div class="result-sub">Your goal is ${d} ± ${f} kPa while staying below ${p} K.</div>`,E.textContent=`System stable`,D.className=`status-dot`,b.disabled=!1,b.innerHTML=`<span>TEST STATE</span><span class="fire-icon">⏱</span>`,w.textContent=`Try one state first. Watch how pressure changes when you compress or heat the gas.`,T.textContent=`0 / 3`,C.disabled=!1,C.textContent=`Show hint 1`,j.textContent=`—`,M.textContent=`—`,N.textContent=`—`,P.textContent=`100%`,F.textContent=`Hit the target pressure safely to generate your score.`,Z(),ye()}me.addEventListener(`click`,()=>be(.88)),he.addEventListener(`click`,()=>be(1.14)),pe.addEventListener(`click`,ye),fe.addEventListener(`click`,De),b.addEventListener(`click`,Te),C.addEventListener(`click`,Ee),O.textContent=`${L(h.volume,h.temperature).toFixed(1)} kPa`;