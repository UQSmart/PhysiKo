import"./style-C1ra3R5z.js";import{S as Se,C as $,F as ke,P as Ee,V as z,W as Ae,b as Le,A as $e,O as Re,H as qe,D as Ne,M as b,e as k,d as M,f as ee,k as He,T as Fe,g as Pe,h as Oe}from"./OrbitControls-BbhHxB-y.js";const g=90,m=22,te=5,I=250,D=50,w=8,h=60.5,Z=.2,t={addMilkAt:3,attempts:[],hintsUsed:0,currentHint:0,solved:!1,running:!1},Be=document.querySelector("#app");Be.innerHTML=`
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
        <div><span>Coffee starts</span><strong>${g} °C</strong></div>
        <div><span>Room</span><strong>${m} °C</strong></div>
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
          <div><span>Coffee temperature</span><strong id="liveTemp">${g.toFixed(1)} °C</strong></div>
          <div><span>Milk</span><strong id="liveMilk">Not added</strong></div>
        </div>
        <div class="thermal-chart-wrap"><canvas id="thermalChart" width="900" height="220" aria-label="Temperature versus time chart"></canvas></div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR PREDICTION</div>
        <div class="control-block">
          <div class="control-head"><label for="milkTimeRange">Add milk at</label><output id="milkTimeOutput">${t.addMilkAt.toFixed(1)} min</output></div>
          <input id="milkTimeRange" type="range" min="0" max="8" step="0.1" value="${t.addMilkAt}" />
          <input id="milkTimeNumber" class="number-input" type="number" min="0" max="8" step="0.1" value="${t.addMilkAt}" />
        </div>

        <div class="loop-question">
          <span>Fixed conditions</span>
          <strong>${I} g coffee + ${D} g milk at ${te} °C</strong>
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
`;const N=document.querySelector("#threeScene"),ne=document.querySelector("#sceneOverlay"),C=document.querySelector("#milkTimeRange"),v=document.querySelector("#milkTimeNumber"),se=document.querySelector("#milkTimeOutput"),x=document.querySelector("#runBtn"),Ie=document.querySelector("#resetBtn"),De=document.querySelector("#resetViewBtn"),Ve=document.querySelector("#zoomInBtn"),Ue=document.querySelector("#zoomOutBtn"),y=document.querySelector("#resultBox"),oe=document.querySelector("#attemptsList"),T=document.querySelector("#hintBtn"),ie=document.querySelector("#hintContent"),ae=document.querySelector("#hintCounter"),R=document.querySelector("#statusText"),q=document.querySelector("#statusDot"),re=document.querySelector("#liveTime"),ce=document.querySelector("#liveTemp"),le=document.querySelector("#liveMilk"),de=document.querySelector("#scoreValue"),ue=document.querySelector("#accuracyScore"),me=document.querySelector("#efficiencyScore"),pe=document.querySelector("#understandingScore"),he=document.querySelector("#scoreCopy"),V=document.querySelector("#thermalChart"),s=V.getContext("2d"),L=["<strong>Hint 1 · Hotter coffee cools faster.</strong><br>Newton's law says the cooling rate is proportional to the temperature difference between coffee and room.",'<strong>Hint 2 · Milk causes an instant mixing step.</strong><br>If both liquids have roughly the same specific heat:<br><span class="formula">Tmix = (m₁T₁ + m₂T₂) / (m₁ + m₂)</span>','<strong>Hint 3 · Combine cooling and mixing.</strong><br>Before and after adding milk, use:<br><span class="formula">T(t) = Troom + (T₀ − Troom)e^(−kt)</span><br>The timing changes how long the coffee stays far above room temperature.'];function ve(e,n,o){return Math.min(Math.max(e,n),o)}function U(e){return m+(g-m)*Math.exp(-.04*e)}function fe(e){return(I*e+D*te)/(I+D)}function ze(e){const n=U(e),o=fe(n);return m+(o-m)*Math.exp(-.04*(w-e))}function Ge(e,n){if(e<n)return U(e);const o=U(n),r=fe(o);return m+(r-m)*Math.exp(-.04*(e-n))}const u=new Se;u.background=new $(791332);u.fog=new ke(791332,20,48);const f=new Ee(48,1,.1,100),ge=new z(9,7,12),be=new z(0,2.5,0);f.position.copy(ge);const p=new Ae({antialias:!0,powerPreference:"high-performance"});p.setPixelRatio(Math.min(window.devicePixelRatio||1,2));p.shadowMap.enabled=!0;p.outputColorSpace=Le;p.toneMapping=$e;p.toneMappingExposure=1.05;N.appendChild(p.domElement);const c=new Re(f,p.domElement);c.enableDamping=!0;c.enablePan=!1;c.minDistance=7;c.maxDistance=30;c.target.copy(be);c.update();u.add(new qe(1677e4,1515835,1.5));const G=new Ne(16777215,2.1);G.position.set(8,12,8);G.castShadow=!0;u.add(G);const Y=new b(new k(6,6,.55,48),new M({color:1581882,roughness:.82}));Y.position.y=.15;Y.receiveShadow=!0;u.add(Y);const H=new ee;u.add(H);const _=new b(new k(2.35,2.15,4.2,48,1,!0),new M({color:15922431,roughness:.42,metalness:.03,side:He}));_.position.y=2.45;_.castShadow=!0;H.add(_);const ye=new b(new k(2.15,2.15,.18,48),new M({color:15330552,roughness:.5}));ye.position.y=.42;H.add(ye);const F=new b(new Fe(1.35,.25,14,40,Math.PI*1.55),new M({color:15922431,roughness:.42}));F.rotation.y=Math.PI/2;F.rotation.z=Math.PI/4;F.position.set(2.25,2.55,0);H.add(F);const W=new b(new k(2.02,2.02,.18,48),new M({color:7288093,roughness:.52,metalness:0}));W.position.y=4.42;u.add(W);const S=new b(new k(.13,.13,3,16),new M({color:16250090,roughness:.4}));S.position.set(-1,6.1,0);S.visible=!1;u.add(S);const P=new ee;u.add(P);for(let e=0;e<8;e+=1){const n=new b(new Pe(.18+Math.random()*.12,12,10),new Oe({color:14147310,transparent:!0,opacity:.18}));n.position.set((Math.random()-.5)*2.6,5+Math.random()*3,(Math.random()-.5)*1.6),P.add(n)}function xe(){f.position.copy(ge),c.target.copy(be),c.update()}function Te(e){const n=new z().subVectors(f.position,c.target).multiplyScalar(e);n.length()<c.minDistance||n.length()>c.maxDistance||f.position.copy(c.target.clone().add(n))}function we(){const e=Math.max(1,N.clientWidth),n=Math.max(1,N.clientHeight);p.setSize(e,n,!1),f.aspect=e/n,f.updateProjectionMatrix()}new ResizeObserver(we).observe(N);we();function j(e,n){const o=ve((e-m)/(g-m),0,1),r=new $,a=new $(9125151),d=new $(n?10841933:5123361);r.lerpColors(d,a,o),W.material.color.copy(r),P.children.forEach((l,i)=>{l.material.opacity=.03+o*(.12+i*.004)})}let J=performance.now();function Ce(e){const n=Math.min(.04,(e-J)/1e3);J=e,P.children.forEach((o,r)=>{o.position.y+=n*(.25+r*.015),o.position.x+=Math.sin(e*.001+r)*n*.08,o.position.y>8.4&&(o.position.y=5.1+Math.random()*.5)}),c.update(),p.render(u,f),requestAnimationFrame(Ce)}requestAnimationFrame(Ce);j(g,!1);function K(e=[],n=null){const o=V.width,r=V.height;s.clearRect(0,0,o,r),s.fillStyle="#0b1221",s.fillRect(0,0,o,r);const a={l:48,r:24,t:20,b:34},d=i=>a.l+i/w*(o-a.l-a.r),l=i=>a.t+(95-i)/75*(r-a.t-a.b);s.strokeStyle="rgba(255,255,255,.12)",s.lineWidth=1,[20,40,60,80].forEach(i=>{s.beginPath(),s.moveTo(a.l,l(i)),s.lineTo(o-a.r,l(i)),s.stroke(),s.fillStyle="#7f899f",s.font="12px system-ui",s.fillText(`${i}°`,8,l(i)+4)});for(let i=0;i<=w;i+=2)s.fillStyle="#7f899f",s.fillText(`${i}m`,d(i)-8,r-10);s.strokeStyle="rgba(104,224,173,.65)",s.setLineDash([6,5]),s.beginPath(),s.moveTo(a.l,l(h)),s.lineTo(o-a.r,l(h)),s.stroke(),s.setLineDash([]),n!==null&&(s.strokeStyle="rgba(255,255,255,.16)",s.setLineDash([4,4]),s.beginPath(),s.moveTo(d(n),a.t),s.lineTo(d(n),r-a.b),s.stroke(),s.setLineDash([])),e.length&&(s.strokeStyle="#9aa7ff",s.lineWidth=3,s.beginPath(),e.forEach((i,E)=>{E===0?s.moveTo(d(i.t),l(i.temp)):s.lineTo(d(i.t),l(i.temp))}),s.stroke())}K();function X(e){const n=ve(Number(e),0,w);t.addMilkAt=Number.isFinite(n)?n:t.addMilkAt,C.value=t.addMilkAt,v.value=t.addMilkAt,se.value=`${t.addMilkAt.toFixed(1)} min`}C.addEventListener("input",e=>X(e.target.value));v.addEventListener("input",e=>{e.target.value!==""&&X(e.target.value)});v.addEventListener("blur",()=>X(v.value||t.addMilkAt));function Ye(){oe.innerHTML=t.attempts.length?`
    <div class="attempts-title">Attempts</div>
    ${t.attempts.map((e,n)=>`
      <div class="attempt-row">
        <div class="attempt-index">${n+1}</div>
        <div class="attempt-values">Milk at ${e.addMilkAt.toFixed(1)} min</div>
        <div class="attempt-outcome ${e.success?"hit":""}">${e.finalTemp.toFixed(2)} °C</div>
      </div>
    `).join("")}
  `:""}function _e(e){const n=Math.max(0,Math.round(100-Math.abs(e.finalTemp-h)*50)),o=Math.max(40,100-(t.attempts.length-1)*12),r=Math.max(55,100-t.hintsUsed*15),a=Math.round(n*.55+o*.25+r*.2);de.textContent=a,ue.textContent=`${n}%`,me.textContent=`${o}%`,pe.textContent=`${r}%`,he.textContent=`Solved in ${t.attempts.length} attempt${t.attempts.length===1?"":"s"}.`}async function We(){if(t.running||t.solved)return;t.running=!0,x.disabled=!0,C.disabled=!0,v.disabled=!0,ne.classList.add("hidden"),R.textContent="Cooling in progress",q.className="status-dot active";const e=[],n=performance.now(),o=5500;let r=!1;await new Promise(i=>{function E(Me){const Q=Math.min(1,(Me-n)/o),A=Q*w,O=A>=t.addMilkAt,B=Ge(A,t.addMilkAt);e.push({t:A,temp:B}),re.textContent=`${A.toFixed(1)} min`,ce.textContent=`${B.toFixed(1)} °C`,le.textContent=O?`Added at ${t.addMilkAt.toFixed(1)} min`:"Not added",j(B,O),K(e,t.addMilkAt),O&&!r&&(r=!0,S.visible=!0,setTimeout(()=>{S.visible=!1},450)),Q<1?requestAnimationFrame(E):i()}requestAnimationFrame(E)});const a=ze(t.addMilkAt),d=Math.abs(a-h)<=Z,l={addMilkAt:t.addMilkAt,finalTemp:a,success:d};if(t.attempts.push(l),Ye(),d)t.solved=!0,y.className="result-box success",y.innerHTML=`<div class="result-kicker">PERFECT SERVE</div><div class="result-main">${a.toFixed(2)} °C after ${w} minutes.</div><div class="result-sub">Your milk timing landed inside the ±${Z.toFixed(1)} °C target band.</div>`,R.textContent="Coffee ready · challenge solved",q.className="status-dot success",x.innerHTML='<span>SOLVED</span><span class="fire-icon">✓</span>',_e(l);else{const i=a>h?"Still too hot.":"Too cold.";y.className="result-box miss",y.innerHTML=`<div class="result-kicker">NOT QUITE</div><div class="result-main">${i}</div><div class="result-sub">Final temperature: ${a.toFixed(2)} °C. Target: ${h.toFixed(1)} °C.</div>`,R.textContent="Adjust milk timing",q.className="status-dot",x.disabled=!1,C.disabled=!1,v.disabled=!1}t.running=!1}function je(){t.currentHint>=L.length||(ie.innerHTML=L[t.currentHint],t.currentHint+=1,t.hintsUsed=t.currentHint,ae.textContent=`${t.currentHint} / ${L.length}`,t.currentHint>=L.length?(T.disabled=!0,T.textContent="All hints shown"):T.textContent=`Show hint ${t.currentHint+1}`)}function Ke(){t.addMilkAt=3,t.attempts=[],t.hintsUsed=0,t.currentHint=0,t.solved=!1,t.running=!1,C.value=v.value=t.addMilkAt,se.value=`${t.addMilkAt.toFixed(1)} min`,x.disabled=!1,x.innerHTML='<span>RUN EXPERIMENT</span><span class="fire-icon">▶</span>',C.disabled=!1,v.disabled=!1,y.className="result-box",y.innerHTML='<div class="result-kicker">NO RUNS YET</div><div class="result-main">When should you add the milk?</div><div class="result-sub">The answer is not just mixing: the cooling rate depends on how far the coffee is from room temperature.</div>',oe.innerHTML="",re.textContent="0.0 min",ce.textContent=`${g.toFixed(1)} °C`,le.textContent="Not added",ne.classList.remove("hidden"),R.textContent="Coffee is hot",q.className="status-dot",ie.textContent="Try one run first. Compare what happens if the coffee stays hotter for longer before you add the milk.",ae.textContent="0 / 3",T.disabled=!1,T.textContent="Show hint 1",de.textContent="—",ue.textContent="—",me.textContent="—",pe.textContent="100%",he.textContent="Reach the serving target to generate your score.",j(g,!1),K(),xe()}Ve.addEventListener("click",()=>Te(.88));Ue.addEventListener("click",()=>Te(1.14));De.addEventListener("click",xe);Ie.addEventListener("click",Ke);x.addEventListener("click",We);T.addEventListener("click",je);
