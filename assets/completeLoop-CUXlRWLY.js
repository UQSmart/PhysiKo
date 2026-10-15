import"./style-C1ra3R5z.js";import{S as vt,C as ft,F as yt,P as xt,V as v,W as wt,a as bt,b as St,A as Ct,O as Mt,H as Lt,D as _,M as w,c as Tt,d as k,G as Et,T as kt,e as J,f as Pt,B as qt,g as Rt,h as Nt,i as Ht,j as At}from"./OrbitControls-BbhHxB-y.js";const T=9.81,h=5,S=9,K=h,X=500,Ot=2.5*h,n={height:10,attempts:[],isAnimating:!1,hintsUsed:0,currentHint:0,completed:!1},Ft=document.querySelector("#app");Ft.innerHTML=`
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
      <div class="prototype-badge">CHALLENGE #002 · 3D</div>
    </header>

    <section class="hero loop-hero">
      <div>
        <div class="eyebrow">ENERGY + CIRCULAR MOTION</div>
        <h1>Complete The Loop</h1>
        <p>The cart starts from rest. Choose its starting height and release it. Your goal is to complete the loop while using as little starting height as possible.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Loop radius</span><strong>${h} m</strong></div>
        <div><span>Cart mass</span><strong>${X} kg</strong></div>
        <div><span>Gravity</span><strong>${T} m/s²</strong></div>
      </div>
    </section>

    <section class="workspace">
      <article class="sim-card">
        <div class="sim-toolbar">
          <div class="status-wrap"><span class="status-dot" id="statusDot"></span><span id="statusText">Ready for prediction</span></div>
          <div class="toolbar-actions">
            <div class="zoom-switch" aria-label="Zoom controls">
              <button class="camera-btn" id="zoomOutBtn" type="button">−</button>
              <button class="camera-btn" id="zoomInBtn" type="button">+</button>
            </div>
            <button class="ghost-btn" id="resetViewBtn" type="button">Reset view</button>
            <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
          </div>
        </div>

        <div class="scene-wrap loop-scene-wrap">
          <div id="threeScene" class="three-scene" aria-label="3D roller coaster loop simulation"></div>
          <div class="scene-overlay" id="sceneOverlay">
            <div class="overlay-kicker">YOUR MISSION</div>
            <div class="overlay-title">Find the minimum safe starting height</div>
            <div class="overlay-copy">The cart starts from rest. No friction. Will it stay on the track at the top?</div>
          </div>
          <div class="scene-readout"><span>3D VIEW</span><strong>ENERGY MODE</strong></div>
          <div class="camera-hint">Drag to orbit · scroll / buttons to zoom</div>
        </div>

        <div class="loop-live-strip">
          <div><span>Speed</span><strong id="liveSpeed">0.0 m/s</strong></div>
          <div><span>Normal force</span><strong id="liveNormal">—</strong></div>
          <div><span>Height</span><strong id="liveHeight">${n.height.toFixed(1)} m</strong></div>
        </div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR PREDICTION</div>

        <div class="control-block">
          <div class="control-head">
            <label for="heightRange">Starting height</label>
            <output id="heightOutput">${n.height.toFixed(1)} m</output>
          </div>
          <input id="heightRange" type="range" min="6" max="18" step="0.1" value="${n.height}" />
          <input id="heightNumber" class="number-input" type="number" min="6" max="18" step="0.1" value="${n.height}" />
        </div>

        <div class="loop-question">
          <span>Prediction</span>
          <strong>Will the cart complete the loop?</strong>
        </div>

        <button class="fire-btn" id="releaseBtn" type="button"><span>RELEASE</span><span class="fire-icon">▶</span></button>

        <div class="result-box" id="resultBox">
          <div class="result-kicker">NO RUNS YET</div>
          <div class="result-main">Choose a starting height.</div>
          <div class="result-sub">The key is not only reaching the top: the cart must still have enough speed to maintain contact.</div>
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
        <div id="hintContent" class="hint-content">Try a run first. Watch what happens near the top of the loop.</div>
        <button class="secondary-btn" id="hintBtn" type="button">Show hint 1</button>
      </article>

      <article class="panel score-panel">
        <div class="section-label">PHYSICS SCORE</div>
        <div class="score-value" id="scoreValue">—</div>
        <div class="score-breakdown">
          <div><span>Completion</span><strong id="completionScore">—</strong></div>
          <div><span>Efficiency</span><strong id="efficiencyScore">—</strong></div>
          <div><span>Understanding</span><strong id="understandingScore">100%</strong></div>
        </div>
        <p id="scoreCopy">Complete the loop to generate your score.</p>
      </article>
    </section>

    <footer>Challenge #002 · Three.js + Vite · Static frontend · No backend · Cloudflare Pages ready</footer>
  </main>
`;const N=document.querySelector("#threeScene"),Z=document.querySelector("#sceneOverlay"),A=document.querySelector("#heightRange"),M=document.querySelector("#heightNumber"),Q=document.querySelector("#heightOutput"),H=document.querySelector("#releaseBtn"),$t=document.querySelector("#resetBtn"),Bt=document.querySelector("#resetViewBtn"),It=document.querySelector("#zoomInBtn"),zt=document.querySelector("#zoomOutBtn"),b=document.querySelector("#resultBox"),tt=document.querySelector("#attemptsList"),C=document.querySelector("#hintBtn"),et=document.querySelector("#hintContent"),nt=document.querySelector("#hintCounter"),q=document.querySelector("#statusText"),R=document.querySelector("#statusDot"),st=document.querySelector("#scoreValue"),ot=document.querySelector("#completionScore"),at=document.querySelector("#efficiencyScore"),it=document.querySelector("#understandingScore"),rt=document.querySelector("#scoreCopy"),G=document.querySelector("#liveSpeed"),O=document.querySelector("#liveNormal"),F=document.querySelector("#liveHeight"),P=["<strong>Hint 1 · Energy gets you to the top.</strong><br>As the cart loses height, gravitational potential energy becomes kinetic energy. Reaching the top requires enough initial potential energy.",'<strong>Hint 2 · Reaching the top is not enough.</strong><br>At the top of the loop, the cart needs centripetal acceleration. At the limiting case the normal force is zero:<br><span class="formula">v² / R = g</span>','<strong>Hint 3 · Combine the two conditions.</strong><br>Energy from the start to the top gives:<br><span class="formula">mgh = mg(2R) + ½mv²</span><br>At the limit <span class="formula">v² = gR</span>, therefore:<br><span class="formula">hₘᵢₙ = 2.5R</span>'];function Dt(t,e,o){return Math.min(Math.max(t,e),o)}const l=new vt;l.background=new ft(791332);l.fog=new yt(791332,38,85);const f=new xt(48,1,.1,160),ct=new v(2,13,31),lt=new v(2,5.5,0);f.position.copy(ct);const m=new wt({antialias:!0,powerPreference:"high-performance"});m.setPixelRatio(Math.min(window.devicePixelRatio||1,2));m.shadowMap.enabled=!0;m.shadowMap.type=bt;m.outputColorSpace=St;m.toneMapping=Ct;m.toneMappingExposure=1.08;N.appendChild(m.domElement);const i=new Mt(f,m.domElement);i.enableDamping=!0;i.dampingFactor=.08;i.enablePan=!1;i.minDistance=11;i.maxDistance=65;i.minPolarAngle=.35;i.maxPolarAngle=Math.PI/2.04;i.target.copy(lt);i.update();l.add(new Lt(11188991,1384473,1.55));const y=new _(16777215,2.5);y.position.set(-8,24,15);y.castShadow=!0;y.shadow.mapSize.set(2048,2048);y.shadow.camera.left=-35;y.shadow.camera.right=35;y.shadow.camera.top=35;y.shadow.camera.bottom=-20;l.add(y);const dt=new _(8359167,1);dt.position.set(20,10,-15);l.add(dt);const $=new w(new Tt(64,34),new k({color:1516088,roughness:.96}));$.rotation.x=-Math.PI/2;$.position.set(0,-.05,0);$.receiveShadow=!0;l.add($);const U=new Et(64,24,5070206,2503759);U.material.opacity=.28;U.material.transparent=!0;l.add(U);const ht=new k({color:10070271,roughness:.34,metalness:.55}),Gt=new k({color:2832469,roughness:.7,metalness:.25}),B=new w(new kt(h,.16,14,128),ht);B.position.set(S,K,0);B.castShadow=!0;B.receiveShadow=!0;l.add(B);for(const t of[S-h,S,S+h]){const e=new w(new J(.08,.12,h*2,12),Gt);e.position.set(t,h,-.65),e.castShadow=!0,l.add(e)}let x=null,L=null;function I(t){x&&(l.remove(x),x.geometry.dispose()),L=new Ht(new v(-17,t,0),new v(-9,t*.98,0),new v(-2,.4,0),new v(S,0,0)),x=new w(new At(L,80,.16,10,!1),ht),x.castShadow=!0,x.receiveShadow=!0,l.add(x)}const g=new Pt,Y=new w(new qt(1.15,.48,.9),new k({color:16739741,roughness:.4,metalness:.25}));Y.position.y=.38;Y.castShadow=!0;g.add(Y);for(const t of[-.38,.38])for(const e of[-.42,.42]){const o=new w(new J(.16,.16,.13,16),new k({color:1054245,roughness:.65}));o.rotation.x=Math.PI/2,o.position.set(t,.13,e),g.add(o)}l.add(g);const E=new w(new Rt(.26,18,12),new Nt({color:16765030,transparent:!0,opacity:0}));l.add(E);function z(){const t=L.getPoint(0),e=L.getTangent(0).normalize();g.position.copy(t),g.rotation.z=Math.atan2(e.y,e.x),G.textContent="0.0 m/s",O.textContent="—",F.textContent=`${n.height.toFixed(1)} m`}function ut(t,e=0){g.position.copy(t),g.rotation.z=e}I(n.height);z();function V(){f.position.copy(ct),i.target.copy(lt),i.update()}function pt(t){const e=new v().subVectors(f.position,i.target).multiplyScalar(t),o=e.length();o<i.minDistance||o>i.maxDistance||(f.position.copy(i.target.clone().add(e)),i.update())}function mt(){const t=Math.max(1,N.clientWidth),e=Math.max(1,N.clientHeight);m.setSize(t,e,!1),f.aspect=t/e,f.updateProjectionMatrix()}new ResizeObserver(mt).observe(N);mt();function gt(){i.update(),m.render(l,f),requestAnimationFrame(gt)}requestAnimationFrame(gt);function Ut(t){const e=[];let o=!1,r=null;for(let s=0;s<=Math.PI*2+.001;s+=.01){const a=h*(1-Math.cos(s)),c=2*T*(t-a);if(c<0){o=!0,r={theta:s,y:a,speed:0,normal:0};break}const u=Math.sqrt(c),d=X*(c/h+T*Math.cos(s)),p=S+h*Math.sin(s),j=K-h*Math.cos(s);if(e.push({theta:s,x:p,y:j,speed:u,normal:d}),d<0){o=!0,r={theta:s,x:p,y:j,speed:u,normal:d};break}}return{success:!o&&e.length>0&&e[e.length-1].theta>=Math.PI*1.99,steps:e,loss:r}}function Yt(t){if(!t)return[];const e=[],o=t.speed*Math.cos(t.theta),r=t.speed*Math.sin(t.theta);for(let s=0;s<4;s+=.025){const a=t.x+o*s,c=t.y+r*s-.5*T*s*s;if(c<0)break;e.push({x:a,y:c})}return e}function W(t){const e=Number(t);n.height=Number.isFinite(e)?Dt(e,6,18):n.height,A.value=n.height,M.value=n.height,Q.value=`${n.height.toFixed(1)} m`,n.isAnimating||(I(n.height),z())}A.addEventListener("input",t=>W(t.target.value));M.addEventListener("input",t=>{t.target.value!==""&&W(t.target.value)});M.addEventListener("blur",()=>W(M.value||n.height));It.addEventListener("click",()=>pt(.88));zt.addEventListener("click",()=>pt(1.14));Bt.addEventListener("click",V);function D(t){A.disabled=t,M.disabled=t}function Vt(){tt.innerHTML=n.attempts.length?`
    <div class="attempts-title">Runs</div>
    ${n.attempts.map((t,e)=>`
      <div class="attempt-row">
        <div class="attempt-index">${e+1}</div>
        <div class="attempt-values">h = ${t.height.toFixed(1)} m</div>
        <div class="attempt-outcome ${t.success?"hit":""}">${t.success?"COMPLETE":`LOST @ ${t.lossAngle.toFixed(0)}°`}</div>
      </div>`).join("")}
  `:""}function Wt(t){const e=Math.max(0,t-Ot),o=Math.max(30,Math.round(100-e*18)),r=Math.max(55,100-n.hintsUsed*15),a=Math.round(100*.45+o*.35+r*.2);st.textContent=a,ot.textContent="100%",at.textContent=`${o}%`,it.textContent=`${r}%`,rt.textContent=e<=.15?"Near the theoretical minimum. Excellent.":`Loop completed. You used ${e.toFixed(1)} m more height than the theoretical minimum.`,localStorage.setItem("physicsPlayCompleteLoopScore",JSON.stringify({total:a,height:t,hints:n.hintsUsed}))}async function jt(t=1450){const e=performance.now();return new Promise(o=>{function r(s){const a=Math.min(1,(s-e)/t),c=a*a*(3-2*a),u=L.getPoint(c),d=L.getTangent(c).normalize();ut(u,Math.atan2(d.y,d.x));const p=Math.sqrt(Math.max(0,2*T*(n.height-u.y)));G.textContent=`${p.toFixed(1)} m/s`,O.textContent="—",F.textContent=`${u.y.toFixed(1)} m`,a<1?requestAnimationFrame(r):o()}requestAnimationFrame(r)})}async function _t(t){const e=t.steps,o=t.success?2200:1600,r=performance.now();return new Promise(s=>{function a(c){const u=Math.min(1,(c-r)/o),d=Math.min(e.length-1,Math.floor(u*(e.length-1))),p=e[Math.max(0,d)];ut(new v(p.x,p.y,0),p.theta),G.textContent=`${p.speed.toFixed(1)} m/s`,O.textContent=`${Math.max(0,p.normal/1e3).toFixed(1)} kN`,F.textContent=`${p.y.toFixed(1)} m`,u<1?requestAnimationFrame(a):s()}requestAnimationFrame(a)})}async function Jt(t){const e=Yt(t);if(!e.length)return;E.position.set(t.x,t.y,0),E.material.opacity=.95;const o=performance.now();return new Promise(r=>{function s(a){const c=Math.min(1,(a-o)/900),u=Math.min(e.length-1,Math.floor(c*(e.length-1))),d=e[u];g.position.set(d.x,d.y,0),g.rotation.z+=.045,O.textContent="0.0 kN",F.textContent=`${Math.max(0,d.y).toFixed(1)} m`,c<1?requestAnimationFrame(s):r()}requestAnimationFrame(s)})}async function Kt(){if(n.isAnimating)return;n.isAnimating=!0,H.disabled=!0,D(!0),Z.classList.add("hidden"),q.textContent="Cart in motion",R.className="status-dot active",E.material.opacity=0,I(n.height),z();const t=Ut(n.height);await jt(),await _t(t),!t.success&&t.loss&&await Jt(t.loss);const e=t.loss?t.loss.theta*180/Math.PI:360;n.attempts.push({height:n.height,success:t.success,lossAngle:e}),Vt(),t.success?(n.completed=!0,q.textContent="Loop completed",R.className="status-dot success",b.className="result-box success",b.innerHTML=`<div class="result-kicker">LOOP COMPLETE</div><div class="result-main">The cart stayed on the track all the way around.</div><div class="result-sub">Starting height: ${n.height.toFixed(1)} m. Can you complete it from an even lower height?</div>`,Wt(n.height)):(q.textContent="Contact lost — adjust the height",R.className="status-dot",b.className="result-box miss",b.innerHTML=`<div class="result-kicker">CONTACT LOST</div><div class="result-main">The cart left the track at ${e.toFixed(0)}° around the loop.</div><div class="result-sub">At that point the normal force reached zero. Increase the starting height and try again.</div>`),n.isAnimating=!1,H.disabled=!1,D(!1)}function Xt(){n.height=10,n.attempts=[],n.isAnimating=!1,n.hintsUsed=0,n.currentHint=0,n.completed=!1,A.value=M.value=n.height,Q.value=`${n.height.toFixed(1)} m`,I(n.height),z(),E.material.opacity=0,D(!1),H.disabled=!1,Z.classList.remove("hidden"),q.textContent="Ready for prediction",R.className="status-dot",b.className="result-box",b.innerHTML='<div class="result-kicker">NO RUNS YET</div><div class="result-main">Choose a starting height.</div><div class="result-sub">The key is not only reaching the top: the cart must still have enough speed to maintain contact.</div>',tt.innerHTML="",et.textContent="Try a run first. Watch what happens near the top of the loop.",C.textContent="Show hint 1",C.disabled=!1,nt.textContent="0 / 3",st.textContent="—",ot.textContent="—",at.textContent="—",it.textContent="100%",rt.textContent="Complete the loop to generate your score.",V()}function Zt(){n.currentHint>=P.length||(et.innerHTML=P[n.currentHint],n.currentHint+=1,n.hintsUsed=Math.max(n.hintsUsed,n.currentHint),nt.textContent=`${n.currentHint} / ${P.length}`,n.currentHint>=P.length?(C.textContent="All hints shown",C.disabled=!0):C.textContent=`Show hint ${n.currentHint+1}`)}H.addEventListener("click",Kt);$t.addEventListener("click",Xt);C.addEventListener("click",Zt);V();
