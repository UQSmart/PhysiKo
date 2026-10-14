import"./style-DgUJRaTf.js";import{C as e,E as t,F as n,I as r,M as i,N as a,P as o,T as s,a as c,b as l,c as u,d as ee,g as te,h as ne,j as re,l as ie,m as ae,n as oe,p as se,t as ce,u as le,x as ue}from"./OrbitControls-C2p2WYaR.js";var d=9.81,f=5,p=9,m=f,h=500,de=2.5*f,g={height:10,attempts:[],isAnimating:!1,hintsUsed:0,currentHint:0,completed:!1},fe=document.querySelector(`#app`);fe.innerHTML=`
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
      <div class="prototype-badge">CHALLENGE #002 · 3D</div>
    </header>

    <section class="hero loop-hero">
      <div>
        <div class="eyebrow">ENERGY + CIRCULAR MOTION</div>
        <h1>Complete The Loop</h1>
        <p>The cart starts from rest. Choose its starting height and release it. Your goal is to complete the loop while using as little starting height as possible.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Loop radius</span><strong>${f} m</strong></div>
        <div><span>Cart mass</span><strong>${h} kg</strong></div>
        <div><span>Gravity</span><strong>${d} m/s²</strong></div>
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
          <div><span>Height</span><strong id="liveHeight">${g.height.toFixed(1)} m</strong></div>
        </div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR PREDICTION</div>

        <div class="control-block">
          <div class="control-head">
            <label for="heightRange">Starting height</label>
            <output id="heightOutput">${g.height.toFixed(1)} m</output>
          </div>
          <input id="heightRange" type="range" min="6" max="18" step="0.1" value="${g.height}" />
          <input id="heightNumber" class="number-input" type="number" min="6" max="18" step="0.1" value="${g.height}" />
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
`;var _=document.querySelector(`#threeScene`),pe=document.querySelector(`#sceneOverlay`),v=document.querySelector(`#heightRange`),y=document.querySelector(`#heightNumber`),me=document.querySelector(`#heightOutput`),b=document.querySelector(`#releaseBtn`),he=document.querySelector(`#resetBtn`),ge=document.querySelector(`#resetViewBtn`),_e=document.querySelector(`#zoomInBtn`),ve=document.querySelector(`#zoomOutBtn`),x=document.querySelector(`#resultBox`),ye=document.querySelector(`#attemptsList`),S=document.querySelector(`#hintBtn`),be=document.querySelector(`#hintContent`),xe=document.querySelector(`#hintCounter`),C=document.querySelector(`#statusText`),w=document.querySelector(`#statusDot`),T=document.querySelector(`#scoreValue`),E=document.querySelector(`#completionScore`),D=document.querySelector(`#efficiencyScore`),O=document.querySelector(`#understandingScore`),k=document.querySelector(`#scoreCopy`),A=document.querySelector(`#liveSpeed`),j=document.querySelector(`#liveNormal`),M=document.querySelector(`#liveHeight`),N=[`<strong>Hint 1 · Energy gets you to the top.</strong><br>As the cart loses height, gravitational potential energy becomes kinetic energy. Reaching the top requires enough initial potential energy.`,`<strong>Hint 2 · Reaching the top is not enough.</strong><br>At the top of the loop, the cart needs centripetal acceleration. At the limiting case the normal force is zero:<br><span class="formula">v² / R = g</span>`,`<strong>Hint 3 · Combine the two conditions.</strong><br>Energy from the start to the top gives:<br><span class="formula">mgh = mg(2R) + ½mv²</span><br>At the limit <span class="formula">v² = gR</span>, therefore:<br><span class="formula">hₘᵢₙ = 2.5R</span>`];function Se(e,t,n){return Math.min(Math.max(e,t),n)}var P=new i;P.background=new u(791332),P.fog=new se(791332,38,85);var F=new s(48,1,.1,160),I=new r(2,13,31),Ce=new r(2,5.5,0);F.position.copy(I);var L=new oe({antialias:!0,powerPreference:`high-performance`});L.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),L.shadowMap.enabled=!0,L.shadowMap.type=2,L.outputColorSpace=re,L.toneMapping=4,L.toneMappingExposure=1.08,_.appendChild(L.domElement);var R=new ce(F,L.domElement);R.enableDamping=!0,R.dampingFactor=.08,R.enablePan=!1,R.minDistance=11,R.maxDistance=65,R.minPolarAngle=.35,R.maxPolarAngle=Math.PI/2.04,R.target.copy(Ce),R.update(),P.add(new te(11188991,1384473,1.55));var z=new ee(16777215,2.5);z.position.set(-8,24,15),z.castShadow=!0,z.shadow.mapSize.set(2048,2048),z.shadow.camera.left=-35,z.shadow.camera.right=35,z.shadow.camera.top=35,z.shadow.camera.bottom=-20,P.add(z);var we=new ee(8359167,1);we.position.set(20,10,-15),P.add(we);var B=new l(new t(64,34),new e({color:1516088,roughness:.96}));B.rotation.x=-Math.PI/2,B.position.set(0,-.05,0),B.receiveShadow=!0,P.add(B);var V=new ae(64,24,5070206,2503759);V.material.opacity=.28,V.material.transparent=!0,P.add(V);var Te=new e({color:10070271,roughness:.34,metalness:.55}),Ee=new e({color:2832469,roughness:.7,metalness:.25}),H=new l(new o(f,.16,14,128),Te);H.position.set(p,m,0),H.castShadow=!0,H.receiveShadow=!0,P.add(H);for(let e of[4,p,14]){let t=new l(new le(.08,.12,10,12),Ee);t.position.set(e,f,-.65),t.castShadow=!0,P.add(t)}var U=null,W=null;function G(e){U&&(P.remove(U),U.geometry.dispose()),W=new ie(new r(-17,e,0),new r(-9,e*.98,0),new r(-2,.4,0),new r(p,0,0)),U=new l(new n(W,80,.16,10,!1),Te),U.castShadow=!0,U.receiveShadow=!0,P.add(U)}var K=new ne,q=new l(new c(1.15,.48,.9),new e({color:16739741,roughness:.4,metalness:.25}));q.position.y=.38,q.castShadow=!0,K.add(q);for(let t of[-.38,.38])for(let n of[-.42,.42]){let r=new l(new le(.16,.16,.13,16),new e({color:1054245,roughness:.65}));r.rotation.x=Math.PI/2,r.position.set(t,.13,n),K.add(r)}P.add(K);var J=new l(new a(.26,18,12),new ue({color:16765030,transparent:!0,opacity:0}));P.add(J);function Y(){let e=W.getPoint(0),t=W.getTangent(0).normalize();K.position.copy(e),K.rotation.z=Math.atan2(t.y,t.x),A.textContent=`0.0 m/s`,j.textContent=`—`,M.textContent=`${g.height.toFixed(1)} m`}function De(e,t=0){K.position.copy(e),K.rotation.z=t}G(g.height),Y();function X(){F.position.copy(I),R.target.copy(Ce),R.update()}function Oe(e){let t=new r().subVectors(F.position,R.target).multiplyScalar(e),n=t.length();n<R.minDistance||n>R.maxDistance||(F.position.copy(R.target.clone().add(t)),R.update())}function ke(){let e=Math.max(1,_.clientWidth),t=Math.max(1,_.clientHeight);L.setSize(e,t,!1),F.aspect=e/t,F.updateProjectionMatrix()}new ResizeObserver(ke).observe(_),ke();function Z(){R.update(),L.render(P,F),requestAnimationFrame(Z)}requestAnimationFrame(Z);function Ae(e){let t=[],n=!1,r=null;for(let i=0;i<=Math.PI*2+.001;i+=.01){let a=f*(1-Math.cos(i)),o=2*d*(e-a);if(o<0){n=!0,r={theta:i,y:a,speed:0,normal:0};break}let s=Math.sqrt(o),c=h*(o/f+d*Math.cos(i)),l=p+f*Math.sin(i),u=m-f*Math.cos(i);if(t.push({theta:i,x:l,y:u,speed:s,normal:c}),c<0){n=!0,r={theta:i,x:l,y:u,speed:s,normal:c};break}}return{success:!n&&t.length>0&&t[t.length-1].theta>=Math.PI*1.99,steps:t,loss:r}}function je(e){if(!e)return[];let t=[],n=e.speed*Math.cos(e.theta),r=e.speed*Math.sin(e.theta);for(let i=0;i<4;i+=.025){let a=e.x+n*i,o=e.y+r*i-.5*d*i*i;if(o<0)break;t.push({x:a,y:o})}return t}function Q(e){let t=Number(e);g.height=Number.isFinite(t)?Se(t,6,18):g.height,v.value=g.height,y.value=g.height,me.value=`${g.height.toFixed(1)} m`,g.isAnimating||(G(g.height),Y())}v.addEventListener(`input`,e=>Q(e.target.value)),y.addEventListener(`input`,e=>{e.target.value!==``&&Q(e.target.value)}),y.addEventListener(`blur`,()=>Q(y.value||g.height)),_e.addEventListener(`click`,()=>Oe(.88)),ve.addEventListener(`click`,()=>Oe(1.14)),ge.addEventListener(`click`,X);function $(e){v.disabled=e,y.disabled=e}function Me(){ye.innerHTML=g.attempts.length?`
    <div class="attempts-title">Runs</div>
    ${g.attempts.map((e,t)=>`
      <div class="attempt-row">
        <div class="attempt-index">${t+1}</div>
        <div class="attempt-values">h = ${e.height.toFixed(1)} m</div>
        <div class="attempt-outcome ${e.success?`hit`:``}">${e.success?`COMPLETE`:`LOST @ ${e.lossAngle.toFixed(0)}°`}</div>
      </div>`).join(``)}
  `:``}function Ne(e){let t=Math.max(0,e-de),n=Math.max(30,Math.round(100-t*18)),r=Math.max(55,100-g.hintsUsed*15),i=Math.round(45+n*.35+r*.2);T.textContent=i,E.textContent=`100%`,D.textContent=`${n}%`,O.textContent=`${r}%`,k.textContent=t<=.15?`Near the theoretical minimum. Excellent.`:`Loop completed. You used ${t.toFixed(1)} m more height than the theoretical minimum.`,localStorage.setItem(`physicsPlayCompleteLoopScore`,JSON.stringify({total:i,height:e,hints:g.hintsUsed}))}async function Pe(e=1450){let t=performance.now();return new Promise(n=>{function r(i){let a=Math.min(1,(i-t)/e),o=a*a*(3-2*a),s=W.getPoint(o),c=W.getTangent(o).normalize();De(s,Math.atan2(c.y,c.x)),A.textContent=`${Math.sqrt(Math.max(0,2*d*(g.height-s.y))).toFixed(1)} m/s`,j.textContent=`—`,M.textContent=`${s.y.toFixed(1)} m`,a<1?requestAnimationFrame(r):n()}requestAnimationFrame(r)})}async function Fe(e){let t=e.steps,n=e.success?2200:1600,i=performance.now();return new Promise(e=>{function a(o){let s=Math.min(1,(o-i)/n),c=Math.min(t.length-1,Math.floor(s*(t.length-1))),l=t[Math.max(0,c)];De(new r(l.x,l.y,0),l.theta),A.textContent=`${l.speed.toFixed(1)} m/s`,j.textContent=`${Math.max(0,l.normal/1e3).toFixed(1)} kN`,M.textContent=`${l.y.toFixed(1)} m`,s<1?requestAnimationFrame(a):e()}requestAnimationFrame(a)})}async function Ie(e){let t=je(e);if(!t.length)return;J.position.set(e.x,e.y,0),J.material.opacity=.95;let n=performance.now();return new Promise(e=>{function r(i){let a=Math.min(1,(i-n)/900),o=Math.min(t.length-1,Math.floor(a*(t.length-1))),s=t[o];K.position.set(s.x,s.y,0),K.rotation.z+=.045,j.textContent=`0.0 kN`,M.textContent=`${Math.max(0,s.y).toFixed(1)} m`,a<1?requestAnimationFrame(r):e()}requestAnimationFrame(r)})}async function Le(){if(g.isAnimating)return;g.isAnimating=!0,b.disabled=!0,$(!0),pe.classList.add(`hidden`),C.textContent=`Cart in motion`,w.className=`status-dot active`,J.material.opacity=0,G(g.height),Y();let e=Ae(g.height);await Pe(),await Fe(e),!e.success&&e.loss&&await Ie(e.loss);let t=e.loss?e.loss.theta*180/Math.PI:360;g.attempts.push({height:g.height,success:e.success,lossAngle:t}),Me(),e.success?(g.completed=!0,C.textContent=`Loop completed`,w.className=`status-dot success`,x.className=`result-box success`,x.innerHTML=`<div class="result-kicker">LOOP COMPLETE</div><div class="result-main">The cart stayed on the track all the way around.</div><div class="result-sub">Starting height: ${g.height.toFixed(1)} m. Can you complete it from an even lower height?</div>`,Ne(g.height)):(C.textContent=`Contact lost — adjust the height`,w.className=`status-dot`,x.className=`result-box miss`,x.innerHTML=`<div class="result-kicker">CONTACT LOST</div><div class="result-main">The cart left the track at ${t.toFixed(0)}° around the loop.</div><div class="result-sub">At that point the normal force reached zero. Increase the starting height and try again.</div>`),g.isAnimating=!1,b.disabled=!1,$(!1)}function Re(){g.height=10,g.attempts=[],g.isAnimating=!1,g.hintsUsed=0,g.currentHint=0,g.completed=!1,v.value=y.value=g.height,me.value=`${g.height.toFixed(1)} m`,G(g.height),Y(),J.material.opacity=0,$(!1),b.disabled=!1,pe.classList.remove(`hidden`),C.textContent=`Ready for prediction`,w.className=`status-dot`,x.className=`result-box`,x.innerHTML=`<div class="result-kicker">NO RUNS YET</div><div class="result-main">Choose a starting height.</div><div class="result-sub">The key is not only reaching the top: the cart must still have enough speed to maintain contact.</div>`,ye.innerHTML=``,be.textContent=`Try a run first. Watch what happens near the top of the loop.`,S.textContent=`Show hint 1`,S.disabled=!1,xe.textContent=`0 / 3`,T.textContent=`—`,E.textContent=`—`,D.textContent=`—`,O.textContent=`100%`,k.textContent=`Complete the loop to generate your score.`,X()}function ze(){g.currentHint>=N.length||(be.innerHTML=N[g.currentHint],g.currentHint+=1,g.hintsUsed=Math.max(g.hintsUsed,g.currentHint),xe.textContent=`${g.currentHint} / ${N.length}`,g.currentHint>=N.length?(S.textContent=`All hints shown`,S.disabled=!0):S.textContent=`Show hint ${g.currentHint+1}`)}b.addEventListener(`click`,Le),he.addEventListener(`click`,Re),S.addEventListener(`click`,ze),X();