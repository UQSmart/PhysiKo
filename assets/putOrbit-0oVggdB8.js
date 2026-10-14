import"./style-C1ra3R5z.js";import{S as Pt,C as kt,P as Rt,W as Nt,b as Bt,A as It,O as $t,s as Ht,D as X,M as V,g as Z,d as Y,h as Ot,t as Dt,l as G,u as Ft,v as Vt,w as Ut,f as tt,B as et,x as Gt,V as O,m as zt,q as qt}from"./OrbitControls-BbhHxB-y.js";const z=398600.4418,C=6371,j=400,D=C+j,Yt=Math.sqrt(z/D),e={speed:7.2,flightAngle:0,running:!1,attempts:[],hints:0,solved:!1},jt=document.querySelector("#app");jt.innerHTML=`
<main class="shell">
  <header class="topbar">
    <div class="brand-wrap">
      <div class="logo-mark">Φ</div>
      <div><div class="brand">PHYSICS PLAY</div><div class="tagline">Predict it. Play it. Understand it.</div></div>
    </div>
    <a class="back-link" href="/">← All challenges</a>
    <div class="prototype-badge">CHALLENGE 03</div>
  </header>

  <section class="hero">
    <div>
      <div class="eyebrow">GRAVITATION · ORBITAL MOTION</div>
      <h1>Put It in Orbit</h1>
      <p>Launch a satellite from 400 km above Earth. Choose its speed and direction so gravity bends its path into a stable orbit — not a crash and not an escape.</p>
    </div>
    <div class="challenge-meta">
      <div><span>Earth radius</span><strong>${C.toLocaleString()} km</strong></div>
      <div><span>Start altitude</span><strong>${j} km</strong></div>
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
</main>`;const n=t=>document.querySelector(t),E=n("#speedRange"),P=n("#speedNumber"),st=n("#speedOutput"),k=n("#angleRange"),R=n("#angleNumber"),nt=n("#angleOutput"),w=n("#launchBtn"),Wt=n("#resetBtn"),_t=n("#resetViewBtn"),F=n("#resultBox"),at=n("#attemptsList"),$=n("#statusText"),H=n("#statusDot"),it=n("#sceneOverlay"),M=n("#hintBtn"),ot=n("#hintContent"),rt=n("#hintCounter"),lt=n("#liveAltitude"),ct=n("#liveSpeed"),dt=n("#liveTime"),q=n("#livePath"),ut=n("#scoreValue"),pt=n("#stabilityScore"),ht=n("#efficiencyScore"),vt=n("#understandingScore"),mt=n("#scoreCopy"),Q=["<strong>Hint 1 · Sideways is the key.</strong><br>An orbit is continuous free fall. The satellite needs enough tangential speed that Earth curves away beneath it as fast as it falls.",'<strong>Hint 2 · Circular-orbit condition.</strong><br><span class="formula">v² / r = GM / r²</span><br>For a circular orbit, centripetal acceleration must equal gravitational acceleration.',`<strong>Hint 3 · Solve for speed.</strong><br><span class="formula">v = √(GM/r)</span><br>At ${j} km altitude, the circular-orbit speed is about <strong>${Yt.toFixed(2)} km/s</strong>. Keep the direction close to tangent.`];function Kt(t,s,i){return Math.min(i,Math.max(s,t))}function bt(t,s,i,a,r){const d=o=>{const u=Number(o);e[a]=Number.isFinite(u)?Kt(u,Number(t.min),Number(t.max)):e[a],t.value=e[a],s.value=e[a],i.value=r(e[a]),Mt()};t.addEventListener("input",o=>d(o.target.value)),s.addEventListener("input",o=>{o.target.value!==""&&d(o.target.value)}),s.addEventListener("blur",()=>d(s.value||e[a]))}const W=8,N=t=>t/C*W,c=new Pt;c.background=new kt(330004);const y=new Rt(45,1,.1,120);y.position.set(15,11,18);const p=new Nt({antialias:!0,powerPreference:"high-performance"});p.setPixelRatio(Math.min(devicePixelRatio||1,2));p.outputColorSpace=Bt;p.toneMapping=It;p.toneMappingExposure=1.08;p.shadowMap.enabled=!0;n("#orbitScene").appendChild(p.domElement);const b=new $t(y,p.domElement);b.enableDamping=!0;b.minDistance=10;b.maxDistance=45;b.enablePan=!1;b.target.set(0,0,0);c.add(new Ht(5465738,.8));const gt=new X(16777215,3.2);gt.position.set(12,10,8);c.add(gt);const ft=new X(5470207,1.7);ft.position.set(-10,-2,-8);c.add(ft);const U=new V(new Z(W,72,48),new Y({color:2383784,roughness:.78,metalness:.04,emissive:463915,emissiveIntensity:.35}));U.castShadow=!0;U.receiveShadow=!0;c.add(U);const Jt=new V(new Z(W*1.025,72,48),new Ot({color:8111359,transparent:!0,opacity:.09,side:Dt}));c.add(Jt);const xt=new G,wt=[];for(let t=0;t<500;t++){const s=45+Math.random()*20,i=Math.random()*Math.PI*2,a=Math.random()*2-1,r=Math.sqrt(1-a*a);wt.push(s*r*Math.cos(i),s*a,s*r*Math.sin(i))}xt.setAttribute("position",new Ft(wt,3));c.add(new Vt(xt,new Ut({color:11188440,size:.08,transparent:!0,opacity:.8})));const S=new tt,Qt=new V(new et(.36,.28,.36),new Y({color:15265272,metalness:.65,roughness:.25}));S.add(Qt);const Xt=new Y({color:4283345,metalness:.35,roughness:.4});for(const t of[-.52,.52]){const s=new V(new et(.16,.05,.65),Xt);s.position.z=t,S.add(s)}c.add(S);const m=new Gt(new O(0,0,1),new O,2,16740254,.45,.25);c.add(m);const L=new tt;c.add(L);let x=null;function _(){S.position.set(N(D),0,0),Mt()}function Mt(){if(!m)return;const t=e.flightAngle*Math.PI/180,s=new O(Math.sin(t),0,Math.cos(t)).normalize();m.position.copy(S.position),m.setDirection(s),m.setLength(1.7+(e.speed-5.5)*.18,.42,.22)}function Ct(){for(;L.children.length;){const t=L.children[0];L.remove(t),t.geometry?.dispose(),t.material?.dispose()}x=null}function yt(){y.position.set(15,11,18),b.target.set(0,0,0),b.update()}_t.addEventListener("click",yt);function St(){const t=n("#orbitScene"),s=Math.max(1,t.clientWidth),i=Math.max(1,t.clientHeight);p.setSize(s,i,!1),y.aspect=s/i,y.updateProjectionMatrix()}new ResizeObserver(St).observe(n("#orbitScene"));St();function At(){b.update(),U.rotation.y+=35e-5,p.render(c,y),requestAnimationFrame(At)}requestAnimationFrame(At);function Zt(t,s){let i=D,a=0;const r=s*Math.PI/180;let d=t*Math.sin(r),o=t*Math.cos(r),u=0,B=0,A=Math.atan2(a,i),f=1/0,g=0;const h=5,v=16e3,K=[];let I="timeout";for(;u<v;){const l=Math.hypot(i,a);if(f=Math.min(f,l),g=Math.max(g,l),l<=C){I="crash";break}if(l>C*4){I="escape";break}K.push({x:i,z:a,t:u,r:l,speed:Math.hypot(d,o)});const Lt=-z*i/(l*l*l),Et=-z*a/(l*l*l);d+=Lt*h,o+=Et*h,i+=d*h,a+=o*h,u+=h;const J=Math.atan2(a,i);let T=J-A;if(T>Math.PI&&(T-=2*Math.PI),T<-Math.PI&&(T+=2*Math.PI),B+=Math.abs(T),A=J,B>=Math.PI*2){I="orbit";break}}const Tt=(g-f)/D;return{pts:K,outcome:I,t:u,minR:f,maxR:g,radialVariation:Tt}}function te(t,s=t.length){const i=t.slice(0,s).map(a=>new O(N(a.x),0,N(a.z)));i.length<2||(x||(x=new zt(new G,new qt({color:10135551,transparent:!0,opacity:.95})),L.add(x)),x.geometry.dispose(),x.geometry=new G().setFromPoints(i))}function ee(){at.innerHTML=e.attempts.length?`<div class="attempts-title">Attempts</div>${e.attempts.map((t,s)=>`<div class="attempt-row"><div class="attempt-index">${s+1}</div><div class="attempt-values">${t.speed.toFixed(2)} km/s · ${t.angle.toFixed(1)}°</div><div class="attempt-outcome ${t.outcome==="orbit"?"hit":""}">${t.outcome.toUpperCase()}</div></div>`).join("")}`:""}function se(t){return t.outcome==="orbit"?["ORBIT ACHIEVED","The satellite completed a full revolution without touching Earth.",`Radial variation: ${(t.radialVariation*100).toFixed(1)}%.`,"success"]:t.outcome==="crash"?["CRASH","Gravity bent the path into Earth.","Try more tangential speed or a less inward direction.","miss"]:t.outcome==="escape"?["ESCAPE","The satellite is leaving the Earth system.","Reduce speed or redirect closer to the tangent.","miss"]:["UNSTABLE","No full stable revolution was completed.","Adjust speed and direction.","miss"]}function ne(t){const s=Math.max(60,Math.round(100-Math.min(40,t.radialVariation*180))),i=Math.max(30,100-(e.attempts.length-1)*12-e.hints*8),a=Math.max(55,100-e.hints*15),r=Math.round(s*.5+i*.3+a*.2);ut.textContent=r,pt.textContent=`${s}%`,ht.textContent=`${i}%`,vt.textContent=`${a}%`,mt.textContent=`Stable orbit in ${e.attempts.length} attempt${e.attempts.length===1?"":"s"}.`}async function ae(){if(e.running||e.solved)return;e.running=!0,w.disabled=!0,E.disabled=P.disabled=k.disabled=R.disabled=!0,it.classList.add("hidden"),$.textContent="Satellite in flight",H.className="status-dot active",Ct();const t=Zt(e.speed,e.flightAngle),s=t.pts,i=Math.min(6500,Math.max(3200,s.length*5)),a=performance.now();await new Promise(B=>{function A(f){const g=Math.min(1,(f-a)/i),h=Math.min(s.length-1,Math.floor(g*(s.length-1))),v=s[Math.max(0,h)];v&&(S.position.set(N(v.x),0,N(v.z)),m.visible=!1,te(s,h+1),lt.textContent=`${Math.max(0,v.r-C).toFixed(0)} km`,ct.textContent=`${v.speed.toFixed(2)} km/s`,dt.textContent=`${(v.t/60).toFixed(0)} min`,q.textContent=t.outcome==="orbit"?"Closing orbit":"Integrating"),g<1?requestAnimationFrame(A):B()}requestAnimationFrame(A)});const[r,d,o,u]=se(t);F.className=`result-box ${u}`,F.innerHTML=`<div class="result-kicker">${r}</div><div class="result-main">${d}</div><div class="result-sub">${o}</div>`,q.textContent=t.outcome.toUpperCase(),e.attempts.push({speed:e.speed,angle:e.flightAngle,outcome:t.outcome}),ee(),t.outcome==="orbit"?(e.solved=!0,$.textContent="Stable orbit achieved",H.className="status-dot success",w.innerHTML="<span>ORBIT ACHIEVED</span><span>✓</span>",ne(t)):($.textContent="Adjust your launch",H.className="status-dot",w.disabled=!1,E.disabled=P.disabled=k.disabled=R.disabled=!1,m.visible=!0,_()),e.running=!1}function ie(){e.speed=7.2,e.flightAngle=0,e.running=!1,e.attempts=[],e.hints=0,e.solved=!1,E.value=P.value=7.2,st.value="7.20 km/s",k.value=R.value=0,nt.value="0.0°",w.disabled=!1,w.innerHTML='<span>LAUNCH</span><span class="fire-icon">◉</span>',E.disabled=P.disabled=k.disabled=R.disabled=!1,F.className="result-box",F.innerHTML=`<div class="result-kicker">NO LAUNCH YET</div><div class="result-main">Choose the satellite's initial velocity.</div><div class="result-sub">The trajectory is hidden until you launch.</div>`,at.innerHTML="",$.textContent="Ready for launch",H.className="status-dot",it.classList.remove("hidden"),lt.textContent="400 km",ct.textContent="7.20 km/s",dt.textContent="0 min",q.textContent="Waiting",ot.innerHTML="Try a launch first. Too slow falls inward; too fast can escape.",rt.textContent="0 / 3",M.textContent="Show hint 1",M.disabled=!1,ut.textContent="—",pt.textContent="—",ht.textContent="—",vt.textContent="100%",mt.textContent="Create a stable orbit to generate your score.",Ct(),m.visible=!0,_(),yt()}function oe(){e.hints>=Q.length||(ot.innerHTML=Q[e.hints],e.hints++,rt.textContent=`${e.hints} / 3`,e.hints===3?(M.textContent="All hints shown",M.disabled=!0):M.textContent=`Show hint ${e.hints+1}`)}bt(E,P,st,"speed",t=>`${t.toFixed(2)} km/s`);bt(k,R,nt,"flightAngle",t=>`${t.toFixed(1)}°`);w.addEventListener("click",ae);Wt.addEventListener("click",ie);M.addEventListener("click",oe);_();
