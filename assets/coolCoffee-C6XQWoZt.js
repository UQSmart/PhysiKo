import"./style-DgUJRaTf.js";import{C as e,I as t,M as n,N as r,P as i,T as a,b as o,c as s,d as c,g as l,h as u,j as ee,n as te,p as ne,t as re,u as d,x as ie}from"./OrbitControls-C2p2WYaR.js";var f=90,p=22,ae=5,oe=250,se=50,m=8,h=60.5,g=.2,_={addMilkAt:3,attempts:[],hintsUsed:0,currentHint:0,solved:!1,running:!1},ce=document.querySelector(`#app`);ce.innerHTML=`
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
      <div class="prototype-badge">CHALLENGE #006 · 3D</div>
    </header>

    <section class="hero">
      <div>
        <div class="eyebrow">THERMAL TRANSFER</div>
        <h1>Cool The Coffee</h1>
        <p>You will drink the coffee in exactly 8 minutes. Choose when to add cold milk so that the final temperature is as close as possible to the perfect serving temperature.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Coffee starts</span><strong>${f} °C</strong></div>
        <div><span>Room</span><strong>${p} °C</strong></div>
        <div><span>Target at 8 min</span><strong>${h} °C</strong></div>
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
            <div class="overlay-title">Serve it at ${h} °C</div>
            <div class="overlay-copy">Choose when to add the milk. The coffee keeps exchanging heat with the room.</div>
          </div>
          <div class="scene-readout"><span>3D VIEW</span><strong>COOLING MODE</strong></div>
          <div class="camera-hint">Drag to orbit · scroll / buttons to zoom</div>
        </div>

        <div class="loop-live-strip">
          <div><span>Time</span><strong id="liveTime">0.0 min</strong></div>
          <div><span>Coffee temperature</span><strong id="liveTemp">${f.toFixed(1)} °C</strong></div>
          <div><span>Milk</span><strong id="liveMilk">Not added</strong></div>
        </div>
        <div class="thermal-chart-wrap"><canvas id="thermalChart" width="900" height="220" aria-label="Temperature versus time chart"></canvas></div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR PREDICTION</div>
        <div class="control-block">
          <div class="control-head"><label for="milkTimeRange">Add milk at</label><output id="milkTimeOutput">${_.addMilkAt.toFixed(1)} min</output></div>
          <input id="milkTimeRange" type="range" min="0" max="8" step="0.1" value="${_.addMilkAt}" />
          <input id="milkTimeNumber" class="number-input" type="number" min="0" max="8" step="0.1" value="${_.addMilkAt}" />
        </div>

        <div class="loop-question">
          <span>Fixed conditions</span>
          <strong>${oe} g coffee + ${se} g milk at ${ae} °C</strong>
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
`;var v=document.querySelector(`#threeScene`),le=document.querySelector(`#sceneOverlay`),y=document.querySelector(`#milkTimeRange`),b=document.querySelector(`#milkTimeNumber`),ue=document.querySelector(`#milkTimeOutput`),x=document.querySelector(`#runBtn`),de=document.querySelector(`#resetBtn`),fe=document.querySelector(`#resetViewBtn`),pe=document.querySelector(`#zoomInBtn`),me=document.querySelector(`#zoomOutBtn`),S=document.querySelector(`#resultBox`),he=document.querySelector(`#attemptsList`),C=document.querySelector(`#hintBtn`),ge=document.querySelector(`#hintContent`),_e=document.querySelector(`#hintCounter`),w=document.querySelector(`#statusText`),T=document.querySelector(`#statusDot`),ve=document.querySelector(`#liveTime`),E=document.querySelector(`#liveTemp`),D=document.querySelector(`#liveMilk`),O=document.querySelector(`#scoreValue`),k=document.querySelector(`#accuracyScore`),A=document.querySelector(`#efficiencyScore`),j=document.querySelector(`#understandingScore`),M=document.querySelector(`#scoreCopy`),N=document.querySelector(`#thermalChart`),P=N.getContext(`2d`),F=[`<strong>Hint 1 · Hotter coffee cools faster.</strong><br>Newton's law says the cooling rate is proportional to the temperature difference between coffee and room.`,`<strong>Hint 2 · Milk causes an instant mixing step.</strong><br>If both liquids have roughly the same specific heat:<br><span class="formula">Tmix = (m₁T₁ + m₂T₂) / (m₁ + m₂)</span>`,`<strong>Hint 3 · Combine cooling and mixing.</strong><br>Before and after adding milk, use:<br><span class="formula">T(t) = Troom + (T₀ − Troom)e^(−kt)</span><br>The timing changes how long the coffee stays far above room temperature.`];function I(e,t,n){return Math.min(Math.max(e,t),n)}function L(e){return p+68*Math.exp(-.04*e)}function ye(e){return(oe*e+250)/300}function be(e){return p+(ye(L(e))-p)*Math.exp(-.04*(m-e))}function xe(e,t){return e<t?L(e):p+(ye(L(t))-p)*Math.exp(-.04*(e-t))}var R=new n;R.background=new s(791332),R.fog=new ne(791332,20,48);var z=new a(48,1,.1,100),Se=new t(9,7,12),Ce=new t(0,2.5,0);z.position.copy(Se);var B=new te({antialias:!0,powerPreference:`high-performance`});B.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),B.shadowMap.enabled=!0,B.outputColorSpace=ee,B.toneMapping=4,B.toneMappingExposure=1.05,v.appendChild(B.domElement);var V=new re(z,B.domElement);V.enableDamping=!0,V.enablePan=!1,V.minDistance=7,V.maxDistance=30,V.target.copy(Ce),V.update(),R.add(new l(1677e4,1515835,1.5));var H=new c(16777215,2.1);H.position.set(8,12,8),H.castShadow=!0,R.add(H);var U=new o(new d(6,6,.55,48),new e({color:1581882,roughness:.82}));U.position.y=.15,U.receiveShadow=!0,R.add(U);var W=new u;R.add(W);var G=new o(new d(2.35,2.15,4.2,48,1,!0),new e({color:15922431,roughness:.42,metalness:.03,side:2}));G.position.y=2.45,G.castShadow=!0,W.add(G);var we=new o(new d(2.15,2.15,.18,48),new e({color:15330552,roughness:.5}));we.position.y=.42,W.add(we);var K=new o(new i(1.35,.25,14,40,Math.PI*1.55),new e({color:15922431,roughness:.42}));K.rotation.y=Math.PI/2,K.rotation.z=Math.PI/4,K.position.set(2.25,2.55,0),W.add(K);var q=new o(new d(2.02,2.02,.18,48),new e({color:7288093,roughness:.52,metalness:0}));q.position.y=4.42,R.add(q);var J=new o(new d(.13,.13,3,16),new e({color:16250090,roughness:.4}));J.position.set(-1,6.1,0),J.visible=!1,R.add(J);var Y=new u;R.add(Y);for(let e=0;e<8;e+=1){let e=new o(new r(.18+Math.random()*.12,12,10),new ie({color:14147310,transparent:!0,opacity:.18}));e.position.set((Math.random()-.5)*2.6,5+Math.random()*3,(Math.random()-.5)*1.6),Y.add(e)}function Te(){z.position.copy(Se),V.target.copy(Ce),V.update()}function Ee(e){let n=new t().subVectors(z.position,V.target).multiplyScalar(e);n.length()<V.minDistance||n.length()>V.maxDistance||z.position.copy(V.target.clone().add(n))}function X(){let e=Math.max(1,v.clientWidth),t=Math.max(1,v.clientHeight);B.setSize(e,t,!1),z.aspect=e/t,z.updateProjectionMatrix()}new ResizeObserver(X).observe(v),X();function Z(e,t){let n=I((e-p)/68,0,1),r=new s,i=new s(9125151),a=new s(t?10841933:5123361);r.lerpColors(a,i,n),q.material.color.copy(r),Y.children.forEach((e,t)=>{e.material.opacity=.03+n*(.12+t*.004)})}var De=performance.now();function Oe(e){let t=Math.min(.04,(e-De)/1e3);De=e,Y.children.forEach((n,r)=>{n.position.y+=t*(.25+r*.015),n.position.x+=Math.sin(e*.001+r)*t*.08,n.position.y>8.4&&(n.position.y=5.1+Math.random()*.5)}),V.update(),B.render(R,z),requestAnimationFrame(Oe)}requestAnimationFrame(Oe),Z(f,!1);function Q(e=[],t=null){let n=N.width,r=N.height;P.clearRect(0,0,n,r),P.fillStyle=`#0b1221`,P.fillRect(0,0,n,r);let i={l:48,r:24,t:20,b:34},a=e=>i.l+e/m*(n-i.l-i.r),o=e=>i.t+(95-e)/75*(r-i.t-i.b);P.strokeStyle=`rgba(255,255,255,.12)`,P.lineWidth=1,[20,40,60,80].forEach(e=>{P.beginPath(),P.moveTo(i.l,o(e)),P.lineTo(n-i.r,o(e)),P.stroke(),P.fillStyle=`#7f899f`,P.font=`12px system-ui`,P.fillText(`${e}°`,8,o(e)+4)});for(let e=0;e<=m;e+=2)P.fillStyle=`#7f899f`,P.fillText(`${e}m`,a(e)-8,r-10);P.strokeStyle=`rgba(104,224,173,.65)`,P.setLineDash([6,5]),P.beginPath(),P.moveTo(i.l,o(h)),P.lineTo(n-i.r,o(h)),P.stroke(),P.setLineDash([]),t!==null&&(P.strokeStyle=`rgba(255,255,255,.16)`,P.setLineDash([4,4]),P.beginPath(),P.moveTo(a(t),i.t),P.lineTo(a(t),r-i.b),P.stroke(),P.setLineDash([])),e.length&&(P.strokeStyle=`#9aa7ff`,P.lineWidth=3,P.beginPath(),e.forEach((e,t)=>{t===0?P.moveTo(a(e.t),o(e.temp)):P.lineTo(a(e.t),o(e.temp))}),P.stroke())}Q();function $(e){let t=I(Number(e),0,m);_.addMilkAt=Number.isFinite(t)?t:_.addMilkAt,y.value=_.addMilkAt,b.value=_.addMilkAt,ue.value=`${_.addMilkAt.toFixed(1)} min`}y.addEventListener(`input`,e=>$(e.target.value)),b.addEventListener(`input`,e=>{e.target.value!==``&&$(e.target.value)}),b.addEventListener(`blur`,()=>$(b.value||_.addMilkAt));function ke(){he.innerHTML=_.attempts.length?`
    <div class="attempts-title">Attempts</div>
    ${_.attempts.map((e,t)=>`
      <div class="attempt-row">
        <div class="attempt-index">${t+1}</div>
        <div class="attempt-values">Milk at ${e.addMilkAt.toFixed(1)} min</div>
        <div class="attempt-outcome ${e.success?`hit`:``}">${e.finalTemp.toFixed(2)} °C</div>
      </div>
    `).join(``)}
  `:``}function Ae(e){let t=Math.max(0,Math.round(100-Math.abs(e.finalTemp-h)*50)),n=Math.max(40,100-(_.attempts.length-1)*12),r=Math.max(55,100-_.hintsUsed*15);O.textContent=Math.round(t*.55+n*.25+r*.2),k.textContent=`${t}%`,A.textContent=`${n}%`,j.textContent=`${r}%`,M.textContent=`Solved in ${_.attempts.length} attempt${_.attempts.length===1?``:`s`}.`}async function je(){if(_.running||_.solved)return;_.running=!0,x.disabled=!0,y.disabled=!0,b.disabled=!0,le.classList.add(`hidden`),w.textContent=`Cooling in progress`,T.className=`status-dot active`;let e=[],t=performance.now(),n=!1;await new Promise(r=>{function i(a){let o=Math.min(1,(a-t)/5500),s=o*m,c=s>=_.addMilkAt,l=xe(s,_.addMilkAt);e.push({t:s,temp:l}),ve.textContent=`${s.toFixed(1)} min`,E.textContent=`${l.toFixed(1)} °C`,D.textContent=c?`Added at ${_.addMilkAt.toFixed(1)} min`:`Not added`,Z(l,c),Q(e,_.addMilkAt),c&&!n&&(n=!0,J.visible=!0,setTimeout(()=>{J.visible=!1},450)),o<1?requestAnimationFrame(i):r()}requestAnimationFrame(i)});let r=be(_.addMilkAt),i=Math.abs(r-h)<=g,a={addMilkAt:_.addMilkAt,finalTemp:r,success:i};if(_.attempts.push(a),ke(),i)_.solved=!0,S.className=`result-box success`,S.innerHTML=`<div class="result-kicker">PERFECT SERVE</div><div class="result-main">${r.toFixed(2)} °C after ${m} minutes.</div><div class="result-sub">Your milk timing landed inside the ±${g.toFixed(1)} °C target band.</div>`,w.textContent=`Coffee ready · challenge solved`,T.className=`status-dot success`,x.innerHTML=`<span>SOLVED</span><span class="fire-icon">✓</span>`,Ae(a);else{let e=r>h?`Still too hot.`:`Too cold.`;S.className=`result-box miss`,S.innerHTML=`<div class="result-kicker">NOT QUITE</div><div class="result-main">${e}</div><div class="result-sub">Final temperature: ${r.toFixed(2)} °C. Target: ${h.toFixed(1)} °C.</div>`,w.textContent=`Adjust milk timing`,T.className=`status-dot`,x.disabled=!1,y.disabled=!1,b.disabled=!1}_.running=!1}function Me(){_.currentHint>=F.length||(ge.innerHTML=F[_.currentHint],_.currentHint+=1,_.hintsUsed=_.currentHint,_e.textContent=`${_.currentHint} / ${F.length}`,_.currentHint>=F.length?(C.disabled=!0,C.textContent=`All hints shown`):C.textContent=`Show hint ${_.currentHint+1}`)}function Ne(){_.addMilkAt=3,_.attempts=[],_.hintsUsed=0,_.currentHint=0,_.solved=!1,_.running=!1,y.value=b.value=_.addMilkAt,ue.value=`${_.addMilkAt.toFixed(1)} min`,x.disabled=!1,x.innerHTML=`<span>RUN EXPERIMENT</span><span class="fire-icon">▶</span>`,y.disabled=!1,b.disabled=!1,S.className=`result-box`,S.innerHTML=`<div class="result-kicker">NO RUNS YET</div><div class="result-main">When should you add the milk?</div><div class="result-sub">The answer is not just mixing: the cooling rate depends on how far the coffee is from room temperature.</div>`,he.innerHTML=``,ve.textContent=`0.0 min`,E.textContent=`${f.toFixed(1)} °C`,D.textContent=`Not added`,le.classList.remove(`hidden`),w.textContent=`Coffee is hot`,T.className=`status-dot`,ge.textContent=`Try one run first. Compare what happens if the coffee stays hotter for longer before you add the milk.`,_e.textContent=`0 / 3`,C.disabled=!1,C.textContent=`Show hint 1`,O.textContent=`—`,k.textContent=`—`,A.textContent=`—`,j.textContent=`100%`,M.textContent=`Reach the serving target to generate your score.`,Z(f,!1),Q(),Te()}pe.addEventListener(`click`,()=>Ee(.88)),me.addEventListener(`click`,()=>Ee(1.14)),fe.addEventListener(`click`,Te),de.addEventListener(`click`,Ne),x.addEventListener(`click`,je),C.addEventListener(`click`,Me);