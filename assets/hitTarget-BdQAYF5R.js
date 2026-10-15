import"./style-C1ra3R5z.js";import{S as Je,C as Xe,F as Ke,P as Qe,V as f,W as et,a as tt,b as nt,A as ot,O as st,H as at,D as Me,d as S,M as y,c as it,G as rt,R as ct,h as ze,k as Te,L as Ce,l as Q,m as Le,g as ee,n as lt,f as N,e as F,B as dt,o as ut,p as mt,T as pt,q as ht}from"./OrbitControls-BbhHxB-y.js";const we=9.81,r={x:40,y:8,z:10},xe=Math.hypot(r.x,r.z),H=Math.atan2(r.z,r.x)*180/Math.PI,Pe=1.25,n={angle:35,azimuth:Number(H.toFixed(1)),velocity:23,attempts:[],isAnimating:!1,solved:!1,hintsUsed:0,currentHint:0,cameraMode:"overview"},vt=document.querySelector("#app");vt.innerHTML=`
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
      <div class="prototype-badge">PROTOTYPE 0.1 · 3D+ AIM / ZOOM</div>
    </header>

    <section class="hero">
      <div>
        <div class="eyebrow">CHALLENGE #001 · PROJECTILE MOTION</div>
        <h1>Hit The Target</h1>
        <p>Now the cannon can rotate horizontally and vertically. Aim in full 3D, then fire. In overview mode you can drag to orbit the scene and zoom in or out.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Forward distance</span><strong>${r.x} m</strong></div>
        <div><span>Lateral offset</span><strong>${r.z} m</strong></div>
        <div><span>Target height</span><strong>${r.y} m</strong></div>
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
            <output id="azimuthOutput">${H.toFixed(1)}°</output>
          </div>
          <input id="azimuthRange" type="range" min="-30" max="30" step="0.1" value="${H.toFixed(1)}" />
          <input id="azimuthNumber" class="number-input" type="number" min="-30" max="30" step="0.1" value="${H.toFixed(1)}" />
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
`;const E=document.querySelector("#threeScene"),Oe=document.querySelector("#sceneOverlay"),te=document.querySelector("#azimuthRange"),ne=document.querySelector("#azimuthNumber"),Re=document.querySelector("#azimuthOutput"),oe=document.querySelector("#angleRange"),se=document.querySelector("#angleNumber"),$e=document.querySelector("#angleOutput"),ae=document.querySelector("#velocityRange"),ie=document.querySelector("#velocityNumber"),ke=document.querySelector("#velocityOutput"),L=document.querySelector("#fireBtn"),ft=document.querySelector("#resetBtn"),yt=document.querySelector("#resetViewBtn"),gt=document.querySelector("#zoomInBtn"),bt=document.querySelector("#zoomOutBtn"),B=document.querySelector("#resultBox"),_=document.querySelector("#attemptsList"),P=document.querySelector("#hintBtn"),He=document.querySelector("#hintContent"),Ie=document.querySelector("#hintCounter"),q=document.querySelector("#statusText"),D=document.querySelector("#statusDot"),Ae=document.querySelector("#scoreValue"),Fe=document.querySelector("#accuracyScore"),qe=document.querySelector("#efficiencyScore"),De=document.querySelector("#understandingScore"),Ne=document.querySelector("#scoreCopy"),Ee=document.querySelector("#overviewBtn"),Be=document.querySelector("#followBtn"),wt=document.querySelector("#cameraLabel"),A=["<strong>Hint 1 · Split the motion in 3D.</strong><br>Think of the shot as horizontal direction + vertical motion. The cannon must point toward the target in the ground plane, while gravity only acts on height.",'<strong>Hint 2 · Resolve the launch velocity.</strong><br><span class="formula">Vh = V cos θ</span><br><span class="formula">Vy = V sin θ</span><br><span class="formula">Vx = Vh cos φ</span><br><span class="formula">Vz = Vh sin φ</span>',`<strong>Hint 3 · Use the 3D projectile equations.</strong><br><span class="formula">x(t) = V cos θ cos φ · t</span><br><span class="formula">z(t) = V cos θ sin φ · t</span><br><span class="formula">y(t) = V sin θ · t − ½gt²</span><br>At the target, x = ${r.x} m, z = ${r.z} m and y = ${r.y} m.`];function xt(e,t,o){return Math.min(Math.max(e,t),o)}function re(e){const t=Number(e);return`${t>0?"+":""}${t.toFixed(1)}°`}function St(e,t,o,a=10){const s=e*Math.PI/180,i=t*Math.PI/180,c=o*Math.cos(s),m=c*Math.cos(i),d=c*Math.sin(i),h=o*Math.sin(s),p=[];let w={distance:1/0,x:0,y:0,z:0,t:0},me=null,pe=null,W=0;for(let g=0;g<=a;g+=.0125){const R=m*g,I=d*g,z=h*g-.5*we*g*g;W=Math.max(W,z),R>=0&&z>=0&&p.push({x:R,y:z,z:I,t:g});const he=Math.hypot(R-r.x,z-r.y,I-r.z);if(he<w.distance&&(w={distance:he,x:R,y:z,z:I,t:g}),z<0&&g>.03){const C=g-.0125,ve=m*C,fe=d*C,ye=h*C-.5*we*C*C,Z=ye/(ye-z),ge=ve+(R-ve)*Z,be=fe+(I-fe)*Z;me={x:ge,y:0,z:be,horizontal:Math.hypot(ge,be)},pe=C+.0125*Z;break}}return{points:p,closest:w,impact:me,flightTime:pe,maxHeight:W,hit:w.distance<=Pe,vx:m,vy:h,vz:d}}const u=new Je;u.background=new Xe(791332);u.fog=new Ke(791332,48,100);const v=new Qe(48,1,.1,220),ce=new f(20,18,34),G=new f(20,5,4);v.position.copy(ce);v.lookAt(G);const b=new et({antialias:!0,powerPreference:"high-performance"});b.setPixelRatio(Math.min(window.devicePixelRatio||1,2));b.shadowMap.enabled=!0;b.shadowMap.type=tt;b.outputColorSpace=nt;b.toneMapping=ot;b.toneMappingExposure=1.05;E.appendChild(b.domElement);const l=new st(v,b.domElement);l.enableDamping=!0;l.dampingFactor=.08;l.enablePan=!1;l.minDistance=12;l.maxDistance=85;l.minPolarAngle=.35;l.maxPolarAngle=Math.PI/2.05;l.target.copy(G);l.update();const Mt=new at(11188991,1318937,1.6);u.add(Mt);const M=new Me(16777215,2.4);M.position.set(18,28,16);M.castShadow=!0;M.shadow.mapSize.set(2048,2048);M.shadow.camera.left=-40;M.shadow.camera.right=40;M.shadow.camera.top=40;M.shadow.camera.bottom=-30;u.add(M);const Ve=new Me(7899135,1.2);Ve.position.set(-10,10,-20);u.add(Ve);const zt=new S({color:1516088,roughness:.96,metalness:.02}),j=new y(new it(92,56),zt);j.rotation.x=-Math.PI/2;j.position.set(28,-.04,4);j.receiveShadow=!0;u.add(j);const U=new rt(92,30,5070206,2503759);U.position.set(28,0,4);U.material.opacity=.32;U.material.transparent=!0;u.add(U);function Tt(){const e=new N,t=new S({color:2239552,roughness:.65,metalness:.45}),o=new S({color:10267135,roughness:.32,metalness:.65}),a=new S({color:1120295,roughness:.7,metalness:.35}),s=new y(new F(.95,1.15,.35,24),t);s.position.set(.15,.26,0),s.castShadow=!0,s.receiveShadow=!0,e.add(s);const i=new y(new dt(2.7,.55,2),t);i.position.set(.3,.55,0),i.castShadow=!0,i.receiveShadow=!0,e.add(i);for(const p of[-1.15,1.15]){const w=new y(new F(.62,.62,.35,24),a);w.rotation.x=Math.PI/2,w.position.set(.1,.62,p),w.castShadow=!0,e.add(w)}const c=new N;c.position.set(.3,1.08,0),e.add(c);const m=new y(new F(.26,.32,4.2,20),o);m.rotation.z=-Math.PI/2,m.position.x=2,m.castShadow=!0,c.add(m);const d=new y(new ee(.48,24,16),t);d.castShadow=!0,c.add(d);const h=new ut;return h.position.set(4.05,0,0),c.add(h),e.userData.pivot=c,e.userData.muzzle=h,e}const V=Tt();u.add(V);function Ct(){const e=new N;e.position.set(r.x,r.y,r.z);const t=new S({color:14278379,roughness:.45,metalness:.55}),o=new y(new F(.1,.1,r.y,16),t);o.position.set(.25,-8/2,0),o.castShadow=!0,e.add(o);const a=[16735631,16119807,16735631];[1.55,1.02,.48].forEach((c,m)=>{const d=new y(new mt(c,48),new S({color:a[m],roughness:.55,metalness:.08,side:Te}));d.rotation.y=Math.PI/2,d.position.x=-.025*m,d.castShadow=!0,e.add(d)});const i=new y(new pt(1.58,.07,12,48),new S({color:16777215,roughness:.35,metalness:.35}));return i.rotation.y=Math.PI/2,i.position.x=-.08,e.add(i),e}const J=Ct();u.add(J);const le=new y(new ct(1.2,1.55,36),new ze({color:16735631,transparent:!0,opacity:.55,side:Te}));le.rotation.x=-Math.PI/2;le.position.set(r.x,.02,r.z);u.add(le);const Lt=new Ce({color:9411253,dashSize:.55,gapSize:.38,transparent:!0,opacity:.55}),Pt=new Q().setFromPoints([new f(0,.03,0),new f(r.x,.03,r.z)]),Ge=new Le(Pt,Lt);Ge.computeLineDistances();u.add(Ge);const x=new y(new ee(.33,28,18),new S({color:16777215,emissive:4740280,emissiveIntensity:.55,roughness:.25,metalness:.25}));x.castShadow=!0;x.visible=!1;u.add(x);const T=new lt(8359167,2.2,7,2);T.visible=!1;u.add(T);const $=new y(new ee(.42,16,12),new ze({color:16766842,transparent:!0,opacity:0}));u.add($);const O=new N;u.add(O);let k=null;function je(e){return e.map(t=>new f(t.x,t.y+.16,t.z))}function Ue(e,t=!1){const o=new Q().setFromPoints(je(e)),a=t?new Ce({color:10003908,dashSize:.6,gapSize:.42,transparent:!0,opacity:.34}):new ht({color:9411839,transparent:!0,opacity:.95}),s=new Le(o,a);return t&&s.computeLineDistances(),s}function Ot(){for(;O.children.length;){const e=O.children[0];O.remove(e),e.geometry?.dispose?.(),e.material?.dispose?.()}k=null}function X(){Ot(),n.attempts.forEach(e=>O.add(Ue(e.path,!0)))}function de(){const e=n.angle*Math.PI/180,t=n.azimuth*Math.PI/180;V.rotation.y=t,V.userData.pivot.rotation.z=e}function Rt(){const e=new f;return V.userData.muzzle.getWorldPosition(e),e}function Ye(){v.position.copy(ce),l.target.copy(G),l.update()}function Y(e){n.cameraMode=e;const t=e==="overview";Ee.classList.toggle("active",t),Be.classList.toggle("active",!t),wt.textContent=e.toUpperCase(),l.enabled=t,t&&Ye()}function We(e){if(n.cameraMode!=="overview")return;const t=new f().subVectors(v.position,l.target).multiplyScalar(e),o=t.length();o<l.minDistance||o>l.maxDistance||(v.position.copy(l.target.clone().add(t)),l.update())}function $t(e){const t=n.azimuth*Math.PI/180,o=new f(Math.cos(t),0,Math.sin(t)),a=new f(-o.z,0,o.x),s=new f(e.x,e.y,e.z).addScaledVector(o,-8).addScaledVector(a,5.5).add(new f(0,4.5,0));v.position.lerp(s,.12),v.lookAt(new f(e.x+o.x*4.8,Math.max(2,e.y+.5),e.z+o.z*4.8))}function kt(){J.scale.set(1.12,1.12,1.12);const e=performance.now();function t(o){const a=Math.min(1,(o-e)/420),s=1.12-.12*a;J.scale.set(s,s,s),a<1&&requestAnimationFrame(t)}requestAnimationFrame(t)}function Ze(){const e=Math.max(1,E.clientWidth),t=Math.max(1,E.clientHeight);b.setSize(e,t,!1),v.aspect=e/t,v.updateProjectionMatrix()}const Ht=new ResizeObserver(Ze);Ht.observe(E);Ze();de();let Se=performance.now();function _e(e){const t=Math.min(.05,(e-Se)/1e3);Se=e,n.cameraMode==="overview"?l.update():n.isAnimating||(v.position.lerp(ce,1-Math.pow(.001,t)),v.lookAt(G)),b.render(u,v),requestAnimationFrame(_e)}requestAnimationFrame(_e);function ue(e,t,o,a,s){const i=c=>{const m=Number(e.min),d=Number(e.max),h=Number(c),p=Number.isFinite(h)?xt(h,m,d):n[a];n[a]=p,e.value=p,t.value=p,o.value=s(p),de()};e.addEventListener("input",c=>i(c.target.value)),t.addEventListener("input",c=>{c.target.value!==""&&i(c.target.value)}),t.addEventListener("blur",()=>i(t.value||n[a]))}ue(te,ne,Re,"azimuth",re);ue(oe,se,$e,"angle",e=>`${Math.round(e)}°`);ue(ae,ie,ke,"velocity",e=>`${Number(e).toFixed(1)} m/s`);Ee.addEventListener("click",()=>Y("overview"));Be.addEventListener("click",()=>Y("follow"));gt.addEventListener("click",()=>We(.88));bt.addEventListener("click",()=>We(1.14));yt.addEventListener("click",Ye);function It(e){if(e.hit)return{kicker:"TARGET HIT",main:"Perfect. Physics agrees with you.",sub:`Closest approach: ${e.closest.distance.toFixed(2)} m from the center.`,tone:"success"};const t=e.closest.x-r.x,o=e.closest.y-r.y,a=e.closest.z-r.z,s=e.impact?.horizontal??0;let i;return s<xe-.75?i=`Too short by ${(xe-s).toFixed(1)} m on the ground.`:Math.abs(a)>Math.abs(o)&&Math.abs(a)>.8?i=a>0?`Too far right by ${Math.abs(a).toFixed(1)} m.`:`Too far left by ${Math.abs(a).toFixed(1)} m.`:o>0?i=`Too high by ${Math.abs(o).toFixed(1)} m.`:o<-.8?i=`Too low by ${Math.abs(o).toFixed(1)} m.`:i=t>0?`You overshot by ${Math.abs(t).toFixed(1)} m.`:`You undershot by ${Math.abs(t).toFixed(1)} m.`,{kicker:"MISS",main:i,sub:`Closest approach: ${e.closest.distance.toFixed(2)} m from the center.`,tone:"miss"}}function At(e){const t=It(e);B.className=`result-box ${t.tone}`,B.innerHTML=`<div class="result-kicker">${t.kicker}</div><div class="result-main">${t.main}</div><div class="result-sub">${t.sub}</div>`}function Ft(){if(!n.attempts.length){_.innerHTML="";return}_.innerHTML=`
    <div class="attempts-title">Attempts</div>
    ${n.attempts.map((e,t)=>`
      <div class="attempt-row">
        <div class="attempt-index">${t+1}</div>
        <div class="attempt-values">${re(e.azimuth)} · ${e.angle}° · ${e.velocity.toFixed(1)} m/s</div>
        <div class="attempt-outcome ${e.hit?"hit":""}">${e.hit?"HIT":`${e.closestDistance.toFixed(2)} m`}</div>
      </div>
    `).join("")}
  `}function qt(){if(!n.solved)return;const e=n.attempts.length,t=n.attempts[n.attempts.length-1],o=Math.max(0,Math.round(100-t.closestDistance/Pe*15)),a=Math.max(25,Math.round(100-(e-1)*12-n.hintsUsed*8)),s=Math.max(55,100-n.hintsUsed*15),i=Math.round(o*.45+a*.35+s*.2);Ae.textContent=i,Fe.textContent=`${o}%`,qe.textContent=`${a}%`,De.textContent=`${s}%`,Ne.textContent=e===1?"One-shot solution. Excellent prediction.":`Solved in ${e} attempts with ${n.hintsUsed} hint${n.hintsUsed===1?"":"s"}.`,localStorage.setItem("physicsPlayPrototype3DAimZoomScore",JSON.stringify({total:i,attempts:e,hints:n.hintsUsed}))}function K(e){[te,ne,oe,se,ae,ie].forEach(t=>{t.disabled=e})}async function Dt(){if(n.isAnimating||n.solved)return;n.isAnimating=!0,L.disabled=!0,K(!0),Oe.classList.add("hidden"),q.textContent="Projectile in flight",D.className="status-dot active",X();const e=St(n.angle,n.azimuth,n.velocity),t=e.points,o=Math.max(1100,Math.min(2800,(e.flightTime||2.5)*650)),a=performance.now(),s=Rt();x.position.copy(s),T.position.copy(s),$.position.copy(s),x.visible=!0,T.visible=!0,$.material.opacity=.95,k=Ue([t[0]||{x:0,y:0,z:0}],!1),O.add(k),await new Promise(i=>{function c(m){const d=Math.min(1,(m-a)/o),h=Math.min(t.length-1,Math.floor(d*(t.length-1))),p=t[Math.max(0,h)];p&&(x.position.set(p.x,p.y+.16,p.z),T.position.copy(x.position),n.cameraMode==="follow"&&$t(p),k.geometry.dispose(),k.geometry=new Q().setFromPoints(je(t.slice(0,h+1)))),$.material.opacity=Math.max(0,.95-d*8),d<1?requestAnimationFrame(c):i()}requestAnimationFrame(c)}),x.visible=!1,T.visible=!1,$.material.opacity=0,n.attempts.push({azimuth:n.azimuth,angle:n.angle,velocity:n.velocity,path:t,hit:e.hit,closestDistance:e.closest.distance,flightTime:e.flightTime,maxHeight:e.maxHeight}),X(),At(e),Ft(),e.hit?(n.solved=!0,kt(),q.textContent="Challenge solved",D.className="status-dot success",L.innerHTML='<span>SOLVED</span><span class="fire-icon">✓</span>',qt()):(q.textContent="Adjust your prediction",D.className="status-dot",L.disabled=!1,K(!1)),n.isAnimating=!1,n.cameraMode==="overview"&&l.update()}function Nt(){n.angle=35,n.azimuth=Number(H.toFixed(1)),n.velocity=23,n.attempts=[],n.isAnimating=!1,n.solved=!1,n.hintsUsed=0,n.currentHint=0,te.value=ne.value=n.azimuth,oe.value=se.value=n.angle,ae.value=ie.value=n.velocity,Re.value=re(n.azimuth),$e.value=`${n.angle}°`,ke.value=`${n.velocity.toFixed(1)} m/s`,de(),K(!1),L.disabled=!1,L.innerHTML='<span>FIRE</span><span class="fire-icon">↗</span>',B.className="result-box",B.innerHTML='<div class="result-kicker">NO SHOTS YET</div><div class="result-main">Aim in 3D and make your prediction.</div><div class="result-sub">Set direction, angle and speed. Your trajectory will appear only after you fire.</div>',_.innerHTML="",Oe.classList.remove("hidden"),q.textContent="Ready for prediction",D.className="status-dot",He.textContent="Try once before opening a hint. The fewer hints you use, the better your score.",P.textContent="Show hint 1",P.disabled=!1,Ie.textContent="0 / 3",Ae.textContent="—",Fe.textContent="—",qe.textContent="—",De.textContent="100%",Ne.textContent="Solve the challenge to generate your score.",x.visible=!1,T.visible=!1,X(),Y("overview")}function Et(){n.currentHint>=A.length||(He.innerHTML=A[n.currentHint],n.currentHint+=1,n.hintsUsed=Math.max(n.hintsUsed,n.currentHint),Ie.textContent=`${n.currentHint} / ${A.length}`,n.currentHint>=A.length?(P.textContent="All hints shown",P.disabled=!0):P.textContent=`Show hint ${n.currentHint+1}`)}L.addEventListener("click",Dt);ft.addEventListener("click",Nt);P.addEventListener("click",Et);Y("overview");
