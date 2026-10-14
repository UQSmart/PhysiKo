import"./style-DgUJRaTf.js";import{C as e,I as t,M as n,N as r,O as i,T as a,_ as o,a as s,b as c,c as l,d as u,f as d,h as f,i as p,j as m,k as h,n as ee,o as g,r as te,t as ne,v as re,x as ie}from"./OrbitControls-C2p2WYaR.js";var ae=398600.4418,_=6371,oe=400,v=6771,se=Math.sqrt(ae/v),y={speed:7.2,flightAngle:0,running:!1,attempts:[],hints:0,solved:!1},ce=document.querySelector(`#app`);ce.innerHTML=`
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
      <div><span>Earth radius</span><strong>${_.toLocaleString()} km</strong></div>
      <div><span>Start altitude</span><strong>${oe} km</strong></div>
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
</main>`;var b=e=>document.querySelector(e),x=b(`#speedRange`),S=b(`#speedNumber`),le=b(`#speedOutput`),C=b(`#angleRange`),w=b(`#angleNumber`),ue=b(`#angleOutput`),T=b(`#launchBtn`),de=b(`#resetBtn`),fe=b(`#resetViewBtn`),E=b(`#resultBox`),pe=b(`#attemptsList`),D=b(`#statusText`),O=b(`#statusDot`),me=b(`#sceneOverlay`),k=b(`#hintBtn`),A=b(`#hintContent`),j=b(`#hintCounter`),M=b(`#liveAltitude`),N=b(`#liveSpeed`),P=b(`#liveTime`),F=b(`#livePath`),I=b(`#scoreValue`),L=b(`#stabilityScore`),R=b(`#efficiencyScore`),z=b(`#understandingScore`),B=b(`#scoreCopy`),he=[`<strong>Hint 1 · Sideways is the key.</strong><br>An orbit is continuous free fall. The satellite needs enough tangential speed that Earth curves away beneath it as fast as it falls.`,`<strong>Hint 2 · Circular-orbit condition.</strong><br><span class="formula">v² / r = GM / r²</span><br>For a circular orbit, centripetal acceleration must equal gravitational acceleration.`,`<strong>Hint 3 · Solve for speed.</strong><br><span class="formula">v = √(GM/r)</span><br>At ${oe} km altitude, the circular-orbit speed is about <strong>${se.toFixed(2)} km/s</strong>. Keep the direction close to tangent.`];function ge(e,t,n){return Math.min(n,Math.max(t,e))}function _e(e,t,n,r,i){let a=a=>{let o=Number(a);y[r]=Number.isFinite(o)?ge(o,Number(e.min),Number(e.max)):y[r],e.value=y[r],t.value=y[r],n.value=i(y[r]),Te()};e.addEventListener(`input`,e=>a(e.target.value)),t.addEventListener(`input`,e=>{e.target.value!==``&&a(e.target.value)}),t.addEventListener(`blur`,()=>a(t.value||y[r]))}var V=8,H=e=>e/_*V,U=new n;U.background=new l(330004);var W=new a(45,1,.1,120);W.position.set(15,11,18);var G=new ee({antialias:!0,powerPreference:`high-performance`});G.setPixelRatio(Math.min(devicePixelRatio||1,2)),G.outputColorSpace=m,G.toneMapping=4,G.toneMappingExposure=1.08,G.shadowMap.enabled=!0,b(`#orbitScene`).appendChild(G.domElement);var K=new ne(W,G.domElement);K.enableDamping=!0,K.minDistance=10,K.maxDistance=45,K.enablePan=!1,K.target.set(0,0,0),U.add(new te(5465738,.8));var ve=new u(16777215,3.2);ve.position.set(12,10,8),U.add(ve);var ye=new u(5470207,1.7);ye.position.set(-10,-2,-8),U.add(ye);var q=new c(new r(V,72,48),new e({color:2383784,roughness:.78,metalness:.04,emissive:463915,emissiveIntensity:.35}));q.castShadow=!0,q.receiveShadow=!0,U.add(q);var be=new c(new r(V*1.025,72,48),new ie({color:8111359,transparent:!0,opacity:.09,side:1}));U.add(be);var xe=new g,Se=[];for(let e=0;e<500;e++){let e=45+Math.random()*20,t=Math.random()*Math.PI*2,n=Math.random()*2-1,r=Math.sqrt(1-n*n);Se.push(e*r*Math.cos(t),e*n,e*r*Math.sin(t))}xe.setAttribute(`position`,new d(Se,3)),U.add(new i(xe,new h({color:11188440,size:.08,transparent:!0,opacity:.8})));var J=new f,Ce=new c(new s(.36,.28,.36),new e({color:15265272,metalness:.65,roughness:.25}));J.add(Ce);var we=new e({color:4283345,metalness:.35,roughness:.4});for(let e of[-.52,.52]){let t=new c(new s(.16,.05,.65),we);t.position.z=e,J.add(t)}U.add(J);var Y=new p(new t(0,0,1),new t,2,16740254,.45,.25);U.add(Y);var X=new f;U.add(X);var Z=null;function Q(){J.position.set(H(v),0,0),Te()}function Te(){if(!Y)return;let e=y.flightAngle*Math.PI/180,n=new t(Math.sin(e),0,Math.cos(e)).normalize();Y.position.copy(J.position),Y.setDirection(n),Y.setLength(1.7+(y.speed-5.5)*.18,.42,.22)}function Ee(){for(;X.children.length;){let e=X.children[0];X.remove(e),e.geometry?.dispose(),e.material?.dispose()}Z=null}function De(){W.position.set(15,11,18),K.target.set(0,0,0),K.update()}fe.addEventListener(`click`,De);function $(){let e=b(`#orbitScene`),t=Math.max(1,e.clientWidth),n=Math.max(1,e.clientHeight);G.setSize(t,n,!1),W.aspect=t/n,W.updateProjectionMatrix()}new ResizeObserver($).observe(b(`#orbitScene`)),$();function Oe(){K.update(),q.rotation.y+=35e-5,G.render(U,W),requestAnimationFrame(Oe)}requestAnimationFrame(Oe);function ke(e,t){let n=v,r=0,i=t*Math.PI/180,a=e*Math.sin(i),o=e*Math.cos(i),s=0,c=0,l=Math.atan2(r,n),u=1/0,d=0,f=[],p=`timeout`;for(;s<16e3;){let e=Math.hypot(n,r);if(u=Math.min(u,e),d=Math.max(d,e),e<=_){p=`crash`;break}if(e>_*4){p=`escape`;break}f.push({x:n,z:r,t:s,r:e,speed:Math.hypot(a,o)});let t=-398600.4418*n/(e*e*e),i=-398600.4418*r/(e*e*e);a+=t*5,o+=i*5,n+=a*5,r+=o*5,s+=5;let m=Math.atan2(r,n),h=m-l;if(h>Math.PI&&(h-=2*Math.PI),h<-Math.PI&&(h+=2*Math.PI),c+=Math.abs(h),l=m,c>=Math.PI*2){p=`orbit`;break}}let m=(d-u)/v;return{pts:f,outcome:p,t:s,minR:u,maxR:d,radialVariation:m}}function Ae(e,n=e.length){let r=e.slice(0,n).map(e=>new t(H(e.x),0,H(e.z)));r.length<2||(Z||(Z=new o(new g,new re({color:10135551,transparent:!0,opacity:.95})),X.add(Z)),Z.geometry.dispose(),Z.geometry=new g().setFromPoints(r))}function je(){pe.innerHTML=y.attempts.length?`<div class="attempts-title">Attempts</div>${y.attempts.map((e,t)=>`<div class="attempt-row"><div class="attempt-index">${t+1}</div><div class="attempt-values">${e.speed.toFixed(2)} km/s · ${e.angle.toFixed(1)}°</div><div class="attempt-outcome ${e.outcome===`orbit`?`hit`:``}">${e.outcome.toUpperCase()}</div></div>`).join(``)}`:``}function Me(e){return e.outcome===`orbit`?[`ORBIT ACHIEVED`,`The satellite completed a full revolution without touching Earth.`,`Radial variation: ${(e.radialVariation*100).toFixed(1)}%.`,`success`]:e.outcome===`crash`?[`CRASH`,`Gravity bent the path into Earth.`,`Try more tangential speed or a less inward direction.`,`miss`]:e.outcome===`escape`?[`ESCAPE`,`The satellite is leaving the Earth system.`,`Reduce speed or redirect closer to the tangent.`,`miss`]:[`UNSTABLE`,`No full stable revolution was completed.`,`Adjust speed and direction.`,`miss`]}function Ne(e){let t=Math.max(60,Math.round(100-Math.min(40,e.radialVariation*180))),n=Math.max(30,100-(y.attempts.length-1)*12-y.hints*8),r=Math.max(55,100-y.hints*15);I.textContent=Math.round(t*.5+n*.3+r*.2),L.textContent=`${t}%`,R.textContent=`${n}%`,z.textContent=`${r}%`,B.textContent=`Stable orbit in ${y.attempts.length} attempt${y.attempts.length===1?``:`s`}.`}async function Pe(){if(y.running||y.solved)return;y.running=!0,T.disabled=!0,x.disabled=S.disabled=C.disabled=w.disabled=!0,me.classList.add(`hidden`),D.textContent=`Satellite in flight`,O.className=`status-dot active`,Ee();let e=ke(y.speed,y.flightAngle),t=e.pts,n=Math.min(6500,Math.max(3200,t.length*5)),r=performance.now();await new Promise(i=>{function a(o){let s=Math.min(1,(o-r)/n),c=Math.min(t.length-1,Math.floor(s*(t.length-1))),l=t[Math.max(0,c)];l&&(J.position.set(H(l.x),0,H(l.z)),Y.visible=!1,Ae(t,c+1),M.textContent=`${Math.max(0,l.r-_).toFixed(0)} km`,N.textContent=`${l.speed.toFixed(2)} km/s`,P.textContent=`${(l.t/60).toFixed(0)} min`,F.textContent=e.outcome===`orbit`?`Closing orbit`:`Integrating`),s<1?requestAnimationFrame(a):i()}requestAnimationFrame(a)});let[i,a,o,s]=Me(e);E.className=`result-box ${s}`,E.innerHTML=`<div class="result-kicker">${i}</div><div class="result-main">${a}</div><div class="result-sub">${o}</div>`,F.textContent=e.outcome.toUpperCase(),y.attempts.push({speed:y.speed,angle:y.flightAngle,outcome:e.outcome}),je(),e.outcome===`orbit`?(y.solved=!0,D.textContent=`Stable orbit achieved`,O.className=`status-dot success`,T.innerHTML=`<span>ORBIT ACHIEVED</span><span>✓</span>`,Ne(e)):(D.textContent=`Adjust your launch`,O.className=`status-dot`,T.disabled=!1,x.disabled=S.disabled=C.disabled=w.disabled=!1,Y.visible=!0,Q()),y.running=!1}function Fe(){y.speed=7.2,y.flightAngle=0,y.running=!1,y.attempts=[],y.hints=0,y.solved=!1,x.value=S.value=7.2,le.value=`7.20 km/s`,C.value=w.value=0,ue.value=`0.0°`,T.disabled=!1,T.innerHTML=`<span>LAUNCH</span><span class="fire-icon">◉</span>`,x.disabled=S.disabled=C.disabled=w.disabled=!1,E.className=`result-box`,E.innerHTML=`<div class="result-kicker">NO LAUNCH YET</div><div class="result-main">Choose the satellite's initial velocity.</div><div class="result-sub">The trajectory is hidden until you launch.</div>`,pe.innerHTML=``,D.textContent=`Ready for launch`,O.className=`status-dot`,me.classList.remove(`hidden`),M.textContent=`400 km`,N.textContent=`7.20 km/s`,P.textContent=`0 min`,F.textContent=`Waiting`,A.innerHTML=`Try a launch first. Too slow falls inward; too fast can escape.`,j.textContent=`0 / 3`,k.textContent=`Show hint 1`,k.disabled=!1,I.textContent=`—`,L.textContent=`—`,R.textContent=`—`,z.textContent=`100%`,B.textContent=`Create a stable orbit to generate your score.`,Ee(),Y.visible=!0,Q(),De()}function Ie(){y.hints>=he.length||(A.innerHTML=he[y.hints],y.hints++,j.textContent=`${y.hints} / 3`,y.hints===3?(k.textContent=`All hints shown`,k.disabled=!0):k.textContent=`Show hint ${y.hints+1}`)}_e(x,S,le,`speed`,e=>`${e.toFixed(2)} km/s`),_e(C,w,ue,`flightAngle`,e=>`${e.toFixed(1)}°`),T.addEventListener(`click`,Pe),de.addEventListener(`click`,Fe),k.addEventListener(`click`,Ie),Q();