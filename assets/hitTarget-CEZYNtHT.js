import"./style-DgUJRaTf.js";import{A as e,C as t,D as n,E as r,I as i,M as a,N as o,P as s,T as c,_ as l,a as u,b as d,c as f,d as p,g as m,h,j as ee,m as te,n as ne,o as g,p as re,s as ie,t as ae,u as _,v as oe,w as se,x as ce,y as le}from"./OrbitControls-C2p2WYaR.js";var ue=9.81,v={x:40,y:8,z:10},de=Math.hypot(v.x,v.z),y=Math.atan2(v.z,v.x)*180/Math.PI,fe=1.25,b={angle:35,azimuth:Number(y.toFixed(1)),velocity:23,attempts:[],isAnimating:!1,solved:!1,hintsUsed:0,currentHint:0,cameraMode:`overview`},pe=document.querySelector(`#app`);pe.innerHTML=`
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
      <div class="prototype-badge">PROTOTYPE 0.1 · 3D+ AIM / ZOOM</div>
    </header>

    <section class="hero">
      <div>
        <div class="eyebrow">CHALLENGE #001 · PROJECTILE MOTION</div>
        <h1>Hit The Target</h1>
        <p>Now the cannon can rotate horizontally and vertically. Aim in full 3D, then fire. In overview mode you can drag to orbit the scene and zoom in or out.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Forward distance</span><strong>${v.x} m</strong></div>
        <div><span>Lateral offset</span><strong>${v.z} m</strong></div>
        <div><span>Target height</span><strong>${v.y} m</strong></div>
      </div>
    </section>

    <section class="workspace">
      <article class="sim-card">
        <div class="sim-toolbar">
          <div class="status-wrap">
            <span class="status-dot" id="statusDot"></span>
            <span id="statusText">Ready for prediction</span>
          </div>
          <div class="toolbar-actions">
            <div class="camera-switch" aria-label="Camera mode">
              <button class="camera-btn active" id="overviewBtn" type="button">Overview</button>
              <button class="camera-btn" id="followBtn" type="button">Follow</button>
            </div>
            <div class="zoom-switch" aria-label="Zoom controls">
              <button class="camera-btn" id="zoomOutBtn" type="button">−</button>
              <button class="camera-btn" id="zoomInBtn" type="button">+</button>
            </div>
            <button class="ghost-btn" id="resetViewBtn" type="button">Reset view</button>
            <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
          </div>
        </div>

        <div class="scene-wrap" id="sceneWrap">
          <div id="threeScene" class="three-scene" aria-label="3D projectile motion simulation"></div>
          <div class="scene-overlay" id="sceneOverlay">
            <div class="overlay-kicker">YOUR MISSION</div>
            <div class="overlay-title">Hit the center of the target</div>
            <div class="overlay-copy">Drag to orbit, scroll to zoom. No preview trajectory before the shot.</div>
          </div>
          <div class="scene-readout">
            <span>3D VIEW</span>
            <strong id="cameraLabel">OVERVIEW</strong>
          </div>
          <div class="camera-hint">Overview mode: drag to orbit · scroll / buttons to zoom</div>
        </div>

        <div class="legend">
          <span><i class="legend-line previous"></i> Previous attempts</span>
          <span><i class="legend-line current"></i> Current shot</span>
          <span class="legend-note">Physics is now fully 3D in space: horizontal aim + launch elevation.</span>
        </div>
      </article>

      <aside class="control-card">
        <div class="section-label">YOUR PREDICTION</div>

        <div class="control-block">
          <div class="control-head">
            <label for="azimuthRange">Horizontal direction</label>
            <output id="azimuthOutput">${y.toFixed(1)}°</output>
          </div>
          <input id="azimuthRange" type="range" min="-30" max="30" step="0.1" value="${y.toFixed(1)}" />
          <input id="azimuthNumber" class="number-input" type="number" min="-30" max="30" step="0.1" value="${y.toFixed(1)}" />
        </div>

        <div class="control-block">
          <div class="control-head">
            <label for="angleRange">Launch angle</label>
            <output id="angleOutput">35°</output>
          </div>
          <input id="angleRange" type="range" min="10" max="80" step="1" value="35" />
          <input id="angleNumber" class="number-input" type="number" min="10" max="80" step="1" value="35" />
        </div>

        <div class="control-block">
          <div class="control-head">
            <label for="velocityRange">Launch speed</label>
            <output id="velocityOutput">23.0 m/s</output>
          </div>
          <input id="velocityRange" type="range" min="8" max="45" step="0.1" value="23" />
          <input id="velocityNumber" class="number-input" type="number" min="8" max="45" step="0.1" value="23" />
        </div>

        <button class="fire-btn" id="fireBtn" type="button">
          <span>FIRE</span><span class="fire-icon">↗</span>
        </button>

        <div class="result-box" id="resultBox">
          <div class="result-kicker">NO SHOTS YET</div>
          <div class="result-main">Aim in 3D and make your prediction.</div>
          <div class="result-sub">Set direction, angle and speed. Your trajectory will appear only after you fire.</div>
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
        <div id="hintContent" class="hint-content">Try once before opening a hint. The fewer hints you use, the better your score.</div>
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
        <p id="scoreCopy">Solve the challenge to generate your score.</p>
      </article>
    </section>

    <footer>Prototype 0.1 · Three.js + OrbitControls · Static frontend · No backend · Cloudflare Pages ready</footer>
  </main>
`;var x=document.querySelector(`#threeScene`),me=document.querySelector(`#sceneOverlay`),S=document.querySelector(`#azimuthRange`),C=document.querySelector(`#azimuthNumber`),he=document.querySelector(`#azimuthOutput`),w=document.querySelector(`#angleRange`),T=document.querySelector(`#angleNumber`),ge=document.querySelector(`#angleOutput`),E=document.querySelector(`#velocityRange`),_e=document.querySelector(`#velocityNumber`),ve=document.querySelector(`#velocityOutput`),D=document.querySelector(`#fireBtn`),ye=document.querySelector(`#resetBtn`),be=document.querySelector(`#resetViewBtn`),xe=document.querySelector(`#zoomInBtn`),Se=document.querySelector(`#zoomOutBtn`),O=document.querySelector(`#resultBox`),Ce=document.querySelector(`#attemptsList`),k=document.querySelector(`#hintBtn`),we=document.querySelector(`#hintContent`),Te=document.querySelector(`#hintCounter`),A=document.querySelector(`#statusText`),j=document.querySelector(`#statusDot`),Ee=document.querySelector(`#scoreValue`),De=document.querySelector(`#accuracyScore`),Oe=document.querySelector(`#efficiencyScore`),ke=document.querySelector(`#understandingScore`),Ae=document.querySelector(`#scoreCopy`),je=document.querySelector(`#overviewBtn`),Me=document.querySelector(`#followBtn`),Ne=document.querySelector(`#cameraLabel`),M=[`<strong>Hint 1 · Split the motion in 3D.</strong><br>Think of the shot as horizontal direction + vertical motion. The cannon must point toward the target in the ground plane, while gravity only acts on height.`,`<strong>Hint 2 · Resolve the launch velocity.</strong><br><span class="formula">Vh = V cos θ</span><br><span class="formula">Vy = V sin θ</span><br><span class="formula">Vx = Vh cos φ</span><br><span class="formula">Vz = Vh sin φ</span>`,`<strong>Hint 3 · Use the 3D projectile equations.</strong><br><span class="formula">x(t) = V cos θ cos φ · t</span><br><span class="formula">z(t) = V cos θ sin φ · t</span><br><span class="formula">y(t) = V sin θ · t − ½gt²</span><br>At the target, x = ${v.x} m, z = ${v.z} m and y = ${v.y} m.`];function Pe(e,t,n){return Math.min(Math.max(e,t),n)}function N(e){let t=Number(e);return`${t>0?`+`:``}${t.toFixed(1)}°`}function Fe(e,t,n,r=10){let i=e*Math.PI/180,a=t*Math.PI/180,o=n*Math.cos(i),s=o*Math.cos(a),c=o*Math.sin(a),l=n*Math.sin(i),u=[],d={distance:1/0,x:0,y:0,z:0,t:0},f=null,p=null,m=0;for(let e=0;e<=r;e+=.0125){let t=s*e,n=c*e,r=l*e-.5*ue*e*e;m=Math.max(m,r),t>=0&&r>=0&&u.push({x:t,y:r,z:n,t:e});let i=Math.hypot(t-v.x,r-v.y,n-v.z);if(i<d.distance&&(d={distance:i,x:t,y:r,z:n,t:e}),r<0&&e>.03){let i=e-.0125,a=s*i,o=c*i,u=l*i-.5*ue*i*i,d=u/(u-r),m=a+(t-a)*d,h=o+(n-o)*d;f={x:m,y:0,z:h,horizontal:Math.hypot(m,h)},p=i+.0125*d;break}}return{points:u,closest:d,impact:f,flightTime:p,maxHeight:m,hit:d.distance<=fe,vx:s,vy:l,vz:c}}var P=new a;P.background=new f(791332),P.fog=new re(791332,48,100);var F=new c(48,1,.1,220),I=new i(20,18,34),L=new i(20,5,4);F.position.copy(I),F.lookAt(L);var R=new ne({antialias:!0,powerPreference:`high-performance`});R.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),R.shadowMap.enabled=!0,R.shadowMap.type=2,R.outputColorSpace=ee,R.toneMapping=4,R.toneMappingExposure=1.05,x.appendChild(R.domElement);var z=new ae(F,R.domElement);z.enableDamping=!0,z.dampingFactor=.08,z.enablePan=!1,z.minDistance=12,z.maxDistance=85,z.minPolarAngle=.35,z.maxPolarAngle=Math.PI/2.05,z.target.copy(L),z.update();var Ie=new m(11188991,1318937,1.6);P.add(Ie);var B=new p(16777215,2.4);B.position.set(18,28,16),B.castShadow=!0,B.shadow.mapSize.set(2048,2048),B.shadow.camera.left=-40,B.shadow.camera.right=40,B.shadow.camera.top=40,B.shadow.camera.bottom=-30,P.add(B);var Le=new p(7899135,1.2);Le.position.set(-10,10,-20),P.add(Le);var Re=new t({color:1516088,roughness:.96,metalness:.02}),V=new d(new r(92,56),Re);V.rotation.x=-Math.PI/2,V.position.set(28,-.04,4),V.receiveShadow=!0,P.add(V);var H=new te(92,30,5070206,2503759);H.position.set(28,0,4),H.material.opacity=.32,H.material.transparent=!0,P.add(H);function ze(){let e=new h,n=new t({color:2239552,roughness:.65,metalness:.45}),r=new t({color:10267135,roughness:.32,metalness:.65}),i=new t({color:1120295,roughness:.7,metalness:.35}),a=new d(new _(.95,1.15,.35,24),n);a.position.set(.15,.26,0),a.castShadow=!0,a.receiveShadow=!0,e.add(a);let s=new d(new u(2.7,.55,2),n);s.position.set(.3,.55,0),s.castShadow=!0,s.receiveShadow=!0,e.add(s);for(let t of[-1.15,1.15]){let n=new d(new _(.62,.62,.35,24),i);n.rotation.x=Math.PI/2,n.position.set(.1,.62,t),n.castShadow=!0,e.add(n)}let c=new h;c.position.set(.3,1.08,0),e.add(c);let l=new d(new _(.26,.32,4.2,20),r);l.rotation.z=-Math.PI/2,l.position.x=2,l.castShadow=!0,c.add(l);let f=new d(new o(.48,24,16),n);f.castShadow=!0,c.add(f);let p=new se;return p.position.set(4.05,0,0),c.add(p),e.userData.pivot=c,e.userData.muzzle=p,e}var U=ze();P.add(U);function Be(){let e=new h;e.position.set(v.x,v.y,v.z);let n=new t({color:14278379,roughness:.45,metalness:.55}),r=new d(new _(.1,.1,v.y,16),n);r.position.set(.25,-v.y/2,0),r.castShadow=!0,e.add(r);let i=[16735631,16119807,16735631];[1.55,1.02,.48].forEach((n,r)=>{let a=new d(new ie(n,48),new t({color:i[r],roughness:.55,metalness:.08,side:2}));a.rotation.y=Math.PI/2,a.position.x=-.025*r,a.castShadow=!0,e.add(a)});let a=new d(new s(1.58,.07,12,48),new t({color:16777215,roughness:.35,metalness:.35}));return a.rotation.y=Math.PI/2,a.position.x=-.08,e.add(a),e}var W=Be();P.add(W);var G=new d(new e(1.2,1.55,36),new ce({color:16735631,transparent:!0,opacity:.55,side:2}));G.rotation.x=-Math.PI/2,G.position.set(v.x,.02,v.z),P.add(G);var Ve=new le({color:9411253,dashSize:.55,gapSize:.38,transparent:!0,opacity:.55}),He=new g().setFromPoints([new i(0,.03,0),new i(v.x,.03,v.z)]),Ue=new l(He,Ve);Ue.computeLineDistances(),P.add(Ue);var K=new d(new o(.33,28,18),new t({color:16777215,emissive:4740280,emissiveIntensity:.55,roughness:.25,metalness:.25}));K.castShadow=!0,K.visible=!1,P.add(K);var q=new n(8359167,2.2,7,2);q.visible=!1,P.add(q);var J=new d(new o(.42,16,12),new ce({color:16766842,transparent:!0,opacity:0}));P.add(J);var Y=new h;P.add(Y);var X=null;function We(e){return e.map(e=>new i(e.x,e.y+.16,e.z))}function Ge(e,t=!1){let n=new g().setFromPoints(We(e)),r=t?new le({color:10003908,dashSize:.6,gapSize:.42,transparent:!0,opacity:.34}):new oe({color:9411839,transparent:!0,opacity:.95}),i=new l(n,r);return t&&i.computeLineDistances(),i}function Ke(){for(;Y.children.length;){let e=Y.children[0];Y.remove(e),e.geometry?.dispose?.(),e.material?.dispose?.()}X=null}function Z(){Ke(),b.attempts.forEach(e=>Y.add(Ge(e.path,!0)))}function qe(){let e=b.angle*Math.PI/180,t=b.azimuth*Math.PI/180;U.rotation.y=t,U.userData.pivot.rotation.z=e}function Je(){let e=new i;return U.userData.muzzle.getWorldPosition(e),e}function Ye(){F.position.copy(I),z.target.copy(L),z.update()}function Q(e){b.cameraMode=e;let t=e===`overview`;je.classList.toggle(`active`,t),Me.classList.toggle(`active`,!t),Ne.textContent=e.toUpperCase(),z.enabled=t,t&&Ye()}function Xe(e){if(b.cameraMode!==`overview`)return;let t=new i().subVectors(F.position,z.target).multiplyScalar(e),n=t.length();n<z.minDistance||n>z.maxDistance||(F.position.copy(z.target.clone().add(t)),z.update())}function Ze(e){let t=b.azimuth*Math.PI/180,n=new i(Math.cos(t),0,Math.sin(t)),r=new i(-n.z,0,n.x),a=new i(e.x,e.y,e.z).addScaledVector(n,-8).addScaledVector(r,5.5).add(new i(0,4.5,0));F.position.lerp(a,.12),F.lookAt(new i(e.x+n.x*4.8,Math.max(2,e.y+.5),e.z+n.z*4.8))}function Qe(){W.scale.set(1.12,1.12,1.12);let e=performance.now();function t(n){let r=Math.min(1,(n-e)/420),i=1.12-.12*r;W.scale.set(i,i,i),r<1&&requestAnimationFrame(t)}requestAnimationFrame(t)}function $e(){let e=Math.max(1,x.clientWidth),t=Math.max(1,x.clientHeight);R.setSize(e,t,!1),F.aspect=e/t,F.updateProjectionMatrix()}new ResizeObserver($e).observe(x),$e(),qe();var et=performance.now();function tt(e){let t=Math.min(.05,(e-et)/1e3);et=e,b.cameraMode===`overview`?z.update():b.isAnimating||(F.position.lerp(I,1-.001**t),F.lookAt(L)),R.render(P,F),requestAnimationFrame(tt)}requestAnimationFrame(tt);function nt(e,t,n,r,i){let a=a=>{let o=Number(e.min),s=Number(e.max),c=Number(a),l=Number.isFinite(c)?Pe(c,o,s):b[r];b[r]=l,e.value=l,t.value=l,n.value=i(l),qe()};e.addEventListener(`input`,e=>a(e.target.value)),t.addEventListener(`input`,e=>{e.target.value!==``&&a(e.target.value)}),t.addEventListener(`blur`,()=>a(t.value||b[r]))}nt(S,C,he,`azimuth`,N),nt(w,T,ge,`angle`,e=>`${Math.round(e)}°`),nt(E,_e,ve,`velocity`,e=>`${Number(e).toFixed(1)} m/s`),je.addEventListener(`click`,()=>Q(`overview`)),Me.addEventListener(`click`,()=>Q(`follow`)),xe.addEventListener(`click`,()=>Xe(.88)),Se.addEventListener(`click`,()=>Xe(1.14)),be.addEventListener(`click`,Ye);function rt(e){if(e.hit)return{kicker:`TARGET HIT`,main:`Perfect. Physics agrees with you.`,sub:`Closest approach: ${e.closest.distance.toFixed(2)} m from the center.`,tone:`success`};let t=e.closest.x-v.x,n=e.closest.y-v.y,r=e.closest.z-v.z,i=e.impact?.horizontal??0,a;return a=i<de-.75?`Too short by ${(de-i).toFixed(1)} m on the ground.`:Math.abs(r)>Math.abs(n)&&Math.abs(r)>.8?r>0?`Too far right by ${Math.abs(r).toFixed(1)} m.`:`Too far left by ${Math.abs(r).toFixed(1)} m.`:n>0?`Too high by ${Math.abs(n).toFixed(1)} m.`:n<-.8?`Too low by ${Math.abs(n).toFixed(1)} m.`:t>0?`You overshot by ${Math.abs(t).toFixed(1)} m.`:`You undershot by ${Math.abs(t).toFixed(1)} m.`,{kicker:`MISS`,main:a,sub:`Closest approach: ${e.closest.distance.toFixed(2)} m from the center.`,tone:`miss`}}function it(e){let t=rt(e);O.className=`result-box ${t.tone}`,O.innerHTML=`<div class="result-kicker">${t.kicker}</div><div class="result-main">${t.main}</div><div class="result-sub">${t.sub}</div>`}function at(){Ce.innerHTML=b.attempts.length?`
    <div class="attempts-title">Attempts</div>
    ${b.attempts.map((e,t)=>`
      <div class="attempt-row">
        <div class="attempt-index">${t+1}</div>
        <div class="attempt-values">${N(e.azimuth)} · ${e.angle}° · ${e.velocity.toFixed(1)} m/s</div>
        <div class="attempt-outcome ${e.hit?`hit`:``}">${e.hit?`HIT`:`${e.closestDistance.toFixed(2)} m`}</div>
      </div>
    `).join(``)}
  `:``}function ot(){if(!b.solved)return;let e=b.attempts.length,t=b.attempts[b.attempts.length-1],n=Math.max(0,Math.round(100-t.closestDistance/fe*15)),r=Math.max(25,Math.round(100-(e-1)*12-b.hintsUsed*8)),i=Math.max(55,100-b.hintsUsed*15),a=Math.round(n*.45+r*.35+i*.2);Ee.textContent=a,De.textContent=`${n}%`,Oe.textContent=`${r}%`,ke.textContent=`${i}%`,Ae.textContent=e===1?`One-shot solution. Excellent prediction.`:`Solved in ${e} attempts with ${b.hintsUsed} hint${b.hintsUsed===1?``:`s`}.`,localStorage.setItem(`physicsPlayPrototype3DAimZoomScore`,JSON.stringify({total:a,attempts:e,hints:b.hintsUsed}))}function $(e){[S,C,w,T,E,_e].forEach(t=>{t.disabled=e})}async function st(){if(b.isAnimating||b.solved)return;b.isAnimating=!0,D.disabled=!0,$(!0),me.classList.add(`hidden`),A.textContent=`Projectile in flight`,j.className=`status-dot active`,Z();let e=Fe(b.angle,b.azimuth,b.velocity),t=e.points,n=Math.max(1100,Math.min(2800,(e.flightTime||2.5)*650)),r=performance.now(),i=Je();K.position.copy(i),q.position.copy(i),J.position.copy(i),K.visible=!0,q.visible=!0,J.material.opacity=.95,X=Ge([t[0]||{x:0,y:0,z:0}],!1),Y.add(X),await new Promise(e=>{function i(a){let o=Math.min(1,(a-r)/n),s=Math.min(t.length-1,Math.floor(o*(t.length-1))),c=t[Math.max(0,s)];c&&(K.position.set(c.x,c.y+.16,c.z),q.position.copy(K.position),b.cameraMode===`follow`&&Ze(c),X.geometry.dispose(),X.geometry=new g().setFromPoints(We(t.slice(0,s+1)))),J.material.opacity=Math.max(0,.95-o*8),o<1?requestAnimationFrame(i):e()}requestAnimationFrame(i)}),K.visible=!1,q.visible=!1,J.material.opacity=0,b.attempts.push({azimuth:b.azimuth,angle:b.angle,velocity:b.velocity,path:t,hit:e.hit,closestDistance:e.closest.distance,flightTime:e.flightTime,maxHeight:e.maxHeight}),Z(),it(e),at(),e.hit?(b.solved=!0,Qe(),A.textContent=`Challenge solved`,j.className=`status-dot success`,D.innerHTML=`<span>SOLVED</span><span class="fire-icon">✓</span>`,ot()):(A.textContent=`Adjust your prediction`,j.className=`status-dot`,D.disabled=!1,$(!1)),b.isAnimating=!1,b.cameraMode===`overview`&&z.update()}function ct(){b.angle=35,b.azimuth=Number(y.toFixed(1)),b.velocity=23,b.attempts=[],b.isAnimating=!1,b.solved=!1,b.hintsUsed=0,b.currentHint=0,S.value=C.value=b.azimuth,w.value=T.value=b.angle,E.value=_e.value=b.velocity,he.value=N(b.azimuth),ge.value=`${b.angle}°`,ve.value=`${b.velocity.toFixed(1)} m/s`,qe(),$(!1),D.disabled=!1,D.innerHTML=`<span>FIRE</span><span class="fire-icon">↗</span>`,O.className=`result-box`,O.innerHTML=`<div class="result-kicker">NO SHOTS YET</div><div class="result-main">Aim in 3D and make your prediction.</div><div class="result-sub">Set direction, angle and speed. Your trajectory will appear only after you fire.</div>`,Ce.innerHTML=``,me.classList.remove(`hidden`),A.textContent=`Ready for prediction`,j.className=`status-dot`,we.textContent=`Try once before opening a hint. The fewer hints you use, the better your score.`,k.textContent=`Show hint 1`,k.disabled=!1,Te.textContent=`0 / 3`,Ee.textContent=`—`,De.textContent=`—`,Oe.textContent=`—`,ke.textContent=`100%`,Ae.textContent=`Solve the challenge to generate your score.`,K.visible=!1,q.visible=!1,Z(),Q(`overview`)}function lt(){b.currentHint>=M.length||(we.innerHTML=M[b.currentHint],b.currentHint+=1,b.hintsUsed=Math.max(b.hintsUsed,b.currentHint),Te.textContent=`${b.currentHint} / ${M.length}`,b.currentHint>=M.length?(k.textContent=`All hints shown`,k.disabled=!0):k.textContent=`Show hint ${b.currentHint+1}`)}D.addEventListener(`click`,st),ye.addEventListener(`click`,ct),k.addEventListener(`click`,lt),Q(`overview`);