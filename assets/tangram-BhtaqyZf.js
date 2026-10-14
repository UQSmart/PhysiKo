import"./style-C1ra3R5z.js";const re=document.querySelector("#app");re.innerHTML=`
  <main class="shell">
    <header class="topbar">
      <div class="brand-wrap">
        <a class="logo-mark logo-link" href="/" aria-label="Back to challenges">Φ</a>
        <div>
          <div class="brand">PHYSICS PLAY</div>
          <div class="tagline">Predict it. Play it. Understand it.</div>
        </div>
      </div>
      <a class="prototype-badge home-link" href="/">← ALL CHALLENGES</a>
    </header>

    <section class="hero tangram-hero">
      <div>
        <div class="eyebrow">CHALLENGE #007 · SPATIAL GEOMETRY</div>
        <h1>Build The Shape</h1>
        <p>Use all seven tangram pieces to rebuild the square. Drag the pieces, rotate them in 45° steps and flip the parallelogram when needed.</p>
      </div>
      <div class="challenge-meta">
        <div><span>Pieces</span><strong>7</strong></div>
        <div><span>Rotation step</span><strong>45°</strong></div>
        <div><span>Goal</span><strong>1 square</strong></div>
      </div>
    </section>

    <section class="tangram-layout">
      <article class="sim-card tangram-card">
        <div class="sim-toolbar">
          <div class="status-wrap">
            <span class="status-dot" id="statusDot"></span>
            <span id="statusText">Arrange all 7 pieces inside the silhouette</span>
          </div>
          <div class="toolbar-actions">
            <button class="ghost-btn" id="ghostBtn" type="button">Show outlines</button>
            <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
          </div>
        </div>

        <div class="tangram-stage-wrap">
          <svg id="tangramStage" class="tangram-stage" viewBox="0 0 900 520" role="img" aria-label="Interactive seven-piece tangram board">
            <defs>
              <filter id="pieceShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000" flood-opacity=".28"/>
              </filter>
            </defs>
            <rect x="52" y="66" width="356" height="368" rx="28" class="tangram-board-panel" />
            <text x="80" y="95" class="svg-label">TARGET</text>
            <rect x="80" y="110" width="300" height="300" rx="3" class="target-silhouette" />
            <g id="ghostLayer" class="ghost-layer"></g>

            <rect x="445" y="66" width="405" height="368" rx="28" class="tangram-tray-panel" />
            <text x="475" y="95" class="svg-label">YOUR PIECES</text>
            <g id="pieceLayer"></g>
          </svg>
        </div>

        <div class="tangram-instructions">
          <span><strong>Drag</strong> to move</span>
          <span><strong>Rotate</strong> selected piece by 45°</span>
          <span><strong>Flip</strong> the parallelogram</span>
          <span>Pieces snap when correctly placed</span>
        </div>
      </article>

      <aside class="control-card tangram-controls">
        <div class="section-label">SELECTED PIECE</div>
        <div class="selected-piece-name" id="selectedName">None</div>
        <div class="selected-piece-copy" id="selectedCopy">Click or drag a piece to select it.</div>

        <div class="tangram-action-grid">
          <button class="secondary-btn" id="rotateLeftBtn" type="button" disabled>↺ −45°</button>
          <button class="secondary-btn" id="rotateRightBtn" type="button" disabled>+45° ↻</button>
          <button class="secondary-btn tangram-flip-btn" id="flipBtn" type="button" disabled>⇋ Flip</button>
        </div>

        <div class="result-box tangram-progress-box">
          <div class="result-kicker">PROGRESS</div>
          <div class="tangram-progress-main"><strong id="placedCount">0</strong><span>/ 7 pieces</span></div>
          <div class="tangram-progress-track"><i id="progressBar"></i></div>
        </div>

        <div class="tangram-stats">
          <div><span>Moves</span><strong id="movesValue">0</strong></div>
          <div><span>Time</span><strong id="timeValue">00:00</strong></div>
          <div><span>Best</span><strong id="bestValue">—</strong></div>
        </div>

        <div class="result-box" id="resultBox">
          <div class="result-kicker">SPATIAL CHALLENGE</div>
          <div class="result-main">Rebuild the square using every piece.</div>
          <div class="result-sub">No overlaps, no missing pieces. Use the silhouette first; reveal outlines only if you need a hint.</div>
        </div>
      </aside>
    </section>

    <section class="learning-grid">
      <article class="panel hint-panel">
        <div class="panel-head">
          <div><div class="section-label">GEOMETRY INSIGHT</div><h2>What are you training?</h2></div>
        </div>
        <div class="hint-content">
          Tangram is a composition problem: translations, rotations, reflection, congruence and area all work together. The seven pieces always keep their shape and area — only their pose changes.
        </div>
      </article>

      <article class="panel score-panel">
        <div class="section-label">SPATIAL SCORE</div>
        <div class="score-value" id="scoreValue">—</div>
        <div class="score-breakdown">
          <div><span>Moves</span><strong id="scoreMoves">—</strong></div>
          <div><span>Time</span><strong id="scoreTime">—</strong></div>
          <div><span>Hints</span><strong id="scoreHints">0</strong></div>
        </div>
        <p id="scoreCopy">Complete the square to generate your score.</p>
      </article>
    </section>

    <footer>Prototype 0.5 · Tangram 2D · Vite + Vanilla JavaScript · Static frontend · No backend</footer>
  </main>
`;const w="http://www.w3.org/2000/svg",R=75,D={x:80,y:110},H=38,q={large1:[[4,4],[4,0],[2,2]],large2:[[0,4],[4,4],[2,2]],medium:[[0,0],[2,0],[0,2]],square:[[2,0],[3,1],[2,2],[1,1]],parallelogram:[[0,2],[0,4],[1,3],[1,1]],small1:[[4,0],[2,0],[3,1]],small2:[[1,1],[2,2],[1,3]]},y={large1:{label:"Large triangle A",color:"#7888ff"},large2:{label:"Large triangle B",color:"#55c7c1"},medium:{label:"Medium triangle",color:"#f2c65e"},square:{label:"Square",color:"#ff668c"},parallelogram:{label:"Parallelogram",color:"#ff9f5a"},small1:{label:"Small triangle A",color:"#65d59b"},small2:{label:"Small triangle B",color:"#d982e8"}},Y={large1:{x:555,y:185,rotation:135,flip:!1},large2:{x:720,y:185,rotation:225,flip:!1},medium:{x:530,y:330,rotation:90,flip:!1},square:{x:655,y:320,rotation:45,flip:!1},parallelogram:{x:785,y:330,rotation:135,flip:!0},small1:{x:575,y:400,rotation:270,flip:!1},small2:{x:735,y:405,rotation:90,flip:!1}};function z(e){const t=e.reduce((s,n)=>({x:s.x+n.x,y:s.y+n.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function F(e){return q[e].map(([t,s])=>({x:D.x+t*R,y:D.y+s*R}))}const K=Object.fromEntries(Object.keys(q).map(e=>{const t=F(e);return[e,{points:t,center:z(t)}]}));function le(e){const t=F(e),s=z(t);return t.map(n=>({x:n.x-s.x,y:n.y-s.y}))}const a=Object.fromEntries(Object.keys(q).map(e=>[e,{name:e,...Y[e],local:le(e),locked:!1,element:null}])),O=document.querySelector("#pieceLayer"),h=document.querySelector("#ghostLayer"),V=document.querySelector("#tangramStage"),b=document.querySelector("#statusText"),x=document.querySelector("#statusDot"),$=document.querySelector("#selectedName"),G=document.querySelector("#selectedCopy"),T=document.querySelector("#rotateLeftBtn"),A=document.querySelector("#rotateRightBtn"),P=document.querySelector("#flipBtn"),B=document.querySelector("#ghostBtn"),ie=document.querySelector("#resetBtn"),ce=document.querySelector("#placedCount"),de=document.querySelector("#progressBar"),v=document.querySelector("#movesValue"),_=document.querySelector("#timeValue"),J=document.querySelector("#bestValue"),S=document.querySelector("#resultBox"),W=document.querySelector("#scoreValue"),X=document.querySelector("#scoreMoves"),Q=document.querySelector("#scoreTime"),N=document.querySelector("#scoreHints"),Z=document.querySelector("#scoreCopy");let r=null,l=null,o=0,c=0,m=null,p=null,C=!1,u=!1;function ee(e){return e.map(t=>`${t.x},${t.y}`).join(" ")}function ue(){h.innerHTML="",Object.entries(K).forEach(([e,t])=>{const s=document.createElementNS(w,"polygon");s.setAttribute("points",ee(t.points)),s.setAttribute("class","tangram-ghost-piece"),s.dataset.name=e,h.appendChild(s)})}function pe(e){return`translate(${e.x} ${e.y}) rotate(${e.rotation}) scale(${e.flip?-1:1} 1)`}function i(e){e.element.setAttribute("transform",pe(e)),e.element.classList.toggle("selected",r===e.name&&!e.locked),e.element.classList.toggle("locked",e.locked)}function ge(){O.innerHTML="",Object.values(a).forEach(e=>{const t=document.createElementNS(w,"g");t.classList.add("tangram-piece"),t.dataset.name=e.name,t.setAttribute("tabindex","0"),t.setAttribute("role","button"),t.setAttribute("aria-label",y[e.name].label);const s=document.createElementNS(w,"polygon");s.setAttribute("points",ee(e.local)),s.setAttribute("fill",y[e.name].color),s.setAttribute("filter","url(#pieceShadow)"),t.appendChild(s),t.addEventListener("pointerdown",n=>me(n,e.name)),t.addEventListener("keydown",n=>fe(n,e.name)),e.element=t,O.appendChild(t),i(e)})}function te(e){const t=V.createSVGPoint();return t.x=e.clientX,t.y=e.clientY,t.matrixTransform(V.getScreenCTM().inverse())}function L(){m||C||(m=Date.now(),p=window.setInterval(ne,250))}function se(){return m?Math.max(0,Math.floor((Date.now()-m)/1e3)):0}function g(e){const t=Math.floor(e/60).toString().padStart(2,"0"),s=(e%60).toString().padStart(2,"0");return`${t}:${s}`}function ne(){_.textContent=g(se())}function me(e,t){const s=a[t];if(s.locked||C)return;e.preventDefault(),L(),d(t);const n=te(e);l={name:t,dx:n.x-s.x,dy:n.y-s.y,pointerId:e.pointerId},s.element.setPointerCapture(e.pointerId),s.element.addEventListener("pointermove",oe),s.element.addEventListener("pointerup",j,{once:!0}),s.element.addEventListener("pointercancel",j,{once:!0})}function oe(e){if(!l)return;const t=a[l.name],s=te(e);t.x=s.x-l.dx,t.y=s.y-l.dy,i(t)}function j(e){if(!l)return;const t=l.name,s=a[t];s.element.removeEventListener("pointermove",oe);try{s.element.releasePointerCapture(l.pointerId)}catch{}l=null,o+=1,v.textContent=o,E(s)}function k(e){return(e%360+360)%360}function E(e){const t=K[e.name],s=Math.hypot(e.x-t.center.x,e.y-t.center.y),n=k(e.rotation)===0,f=!e.flip;s<=H&&n&&f?(e.x=t.center.x,e.y=t.center.y,e.rotation=0,e.flip=!1,e.locked=!0,i(e),b.textContent=`${y[e.name].label} locked in place`,x.className="status-dot active",d(null),I()):(b.textContent=s<=H?"Position is close — check rotation or reflection":"Keep arranging the pieces",x.className="status-dot")}function d(e){if(r=e,Object.values(a).forEach(i),!e){$.textContent="None",G.textContent="Click or drag a piece to select it.",T.disabled=!0,A.disabled=!0,P.disabled=!0;return}const t=a[e];$.textContent=y[e].label,G.textContent=`Rotation ${k(t.rotation)}°${t.flip?" · flipped":""}`,T.disabled=t.locked,A.disabled=t.locked,P.disabled=t.locked||e!=="parallelogram"}function ae(e){if(!r)return;const t=a[r];t.locked||(L(),t.rotation=k(t.rotation+e),o+=1,v.textContent=o,i(t),d(r),E(t))}function ve(){if(!r||r!=="parallelogram")return;const e=a[r];e.locked||(L(),e.flip=!e.flip,o+=1,v.textContent=o,i(e),d(r),E(e))}function fe(e,t){if(a[t].locked)return;d(t);const s=a[t];let n=!0;switch(L(),e.key){case"ArrowLeft":s.x-=8;break;case"ArrowRight":s.x+=8;break;case"ArrowUp":s.y-=8;break;case"ArrowDown":s.y+=8;break;case"r":case"R":s.rotation=k(s.rotation+45);break;case"f":case"F":t==="parallelogram"?s.flip=!s.flip:n=!1;break;default:n=!1}n&&(e.preventDefault(),o+=1,v.textContent=o,i(s),d(t),E(s))}function I(){const e=Object.values(a).filter(t=>t.locked).length;ce.textContent=e,de.style.width=`${e/7*100}%`,e===7&&ye()}function ye(){C=!0,p&&clearInterval(p),ne();const e=se();b.textContent="Shape completed",x.className="status-dot success",S.className="result-box success",S.innerHTML=`<div class="result-kicker">SHAPE COMPLETE</div><div class="result-main">All seven pieces fit.</div><div class="result-sub">${o} moves · ${g(e)}${c?` · ${c} hint used`:" · no hints"}</div>`;const t=Math.max(35,100-Math.max(0,o-7)*3),s=Math.max(35,100-Math.floor(e/8)*3),n=c?70:100,f=Math.round(t*.4+s*.4+n*.2);W.textContent=f,X.textContent=o,Q.textContent=g(e),N.textContent=c,Z.textContent=f>=90?"Excellent spatial efficiency.":"Solved. Try again with fewer moves or without outlines.";const M=Number(localStorage.getItem("physicsPlayTangramBest")||0);(!M||e<M)&&(localStorage.setItem("physicsPlayTangramBest",String(e)),J.textContent=g(e))}function he(){u=!u,h.classList.toggle("visible",u),B.textContent=u?"Hide outlines":"Show outlines",u&&(c=1,N.textContent=c)}function be(){p&&clearInterval(p),m=null,p=null,C=!1,o=0,c=0,u=!1,h.classList.remove("visible"),B.textContent="Show outlines",b.textContent="Arrange all 7 pieces inside the silhouette",x.className="status-dot",v.textContent="0",_.textContent="00:00",S.className="result-box",S.innerHTML='<div class="result-kicker">SPATIAL CHALLENGE</div><div class="result-main">Rebuild the square using every piece.</div><div class="result-sub">No overlaps, no missing pieces. Use the silhouette first; reveal outlines only if you need a hint.</div>',W.textContent="—",X.textContent="—",Q.textContent="—",N.textContent="0",Z.textContent="Complete the square to generate your score.",Object.entries(a).forEach(([e,t])=>{Object.assign(t,Y[e]),t.locked=!1,i(t)}),d(null),I()}T.addEventListener("click",()=>ae(-45));A.addEventListener("click",()=>ae(45));P.addEventListener("click",ve);B.addEventListener("click",he);ie.addEventListener("click",be);ue();ge();const U=Number(localStorage.getItem("physicsPlayTangramBest")||0);U&&(J.textContent=g(U));I();
