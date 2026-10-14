import"./style-DgUJRaTf.js";var e=document.querySelector(`#app`);e.innerHTML=`
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
`;var t=`http://www.w3.org/2000/svg`,n=75,r={x:80,y:110},i=38,a={large1:[[4,4],[4,0],[2,2]],large2:[[0,4],[4,4],[2,2]],medium:[[0,0],[2,0],[0,2]],square:[[2,0],[3,1],[2,2],[1,1]],parallelogram:[[0,2],[0,4],[1,3],[1,1]],small1:[[4,0],[2,0],[3,1]],small2:[[1,1],[2,2],[1,3]]},o={large1:{label:`Large triangle A`,color:`#7888ff`},large2:{label:`Large triangle B`,color:`#55c7c1`},medium:{label:`Medium triangle`,color:`#f2c65e`},square:{label:`Square`,color:`#ff668c`},parallelogram:{label:`Parallelogram`,color:`#ff9f5a`},small1:{label:`Small triangle A`,color:`#65d59b`},small2:{label:`Small triangle B`,color:`#d982e8`}},s={large1:{x:555,y:185,rotation:135,flip:!1},large2:{x:720,y:185,rotation:225,flip:!1},medium:{x:530,y:330,rotation:90,flip:!1},square:{x:655,y:320,rotation:45,flip:!1},parallelogram:{x:785,y:330,rotation:135,flip:!0},small1:{x:575,y:400,rotation:270,flip:!1},small2:{x:735,y:405,rotation:90,flip:!1}};function c(e){let t=e.reduce((e,t)=>({x:e.x+t.x,y:e.y+t.y}),{x:0,y:0});return{x:t.x/e.length,y:t.y/e.length}}function l(e){return a[e].map(([e,t])=>({x:r.x+e*n,y:r.y+t*n}))}var u=Object.fromEntries(Object.keys(a).map(e=>{let t=l(e);return[e,{points:t,center:c(t)}]}));function ee(e){let t=l(e),n=c(t);return t.map(e=>({x:e.x-n.x,y:e.y-n.y}))}var d=Object.fromEntries(Object.keys(a).map(e=>[e,{name:e,...s[e],local:ee(e),locked:!1,element:null}])),f=document.querySelector(`#pieceLayer`),p=document.querySelector(`#ghostLayer`),m=document.querySelector(`#tangramStage`),h=document.querySelector(`#statusText`),g=document.querySelector(`#statusDot`),_=document.querySelector(`#selectedName`),te=document.querySelector(`#selectedCopy`),v=document.querySelector(`#rotateLeftBtn`),y=document.querySelector(`#rotateRightBtn`),b=document.querySelector(`#flipBtn`),x=document.querySelector(`#ghostBtn`),ne=document.querySelector(`#resetBtn`),re=document.querySelector(`#placedCount`),ie=document.querySelector(`#progressBar`),S=document.querySelector(`#movesValue`),C=document.querySelector(`#timeValue`),w=document.querySelector(`#bestValue`),T=document.querySelector(`#resultBox`),E=document.querySelector(`#scoreValue`),D=document.querySelector(`#scoreMoves`),O=document.querySelector(`#scoreTime`),k=document.querySelector(`#scoreHints`),A=document.querySelector(`#scoreCopy`),j=null,M=null,N=0,P=0,F=null,I=null,L=!1,R=!1;function z(e){return e.map(e=>`${e.x},${e.y}`).join(` `)}function ae(){p.innerHTML=``,Object.entries(u).forEach(([e,n])=>{let r=document.createElementNS(t,`polygon`);r.setAttribute(`points`,z(n.points)),r.setAttribute(`class`,`tangram-ghost-piece`),r.dataset.name=e,p.appendChild(r)})}function oe(e){return`translate(${e.x} ${e.y}) rotate(${e.rotation}) scale(${e.flip?-1:1} 1)`}function B(e){e.element.setAttribute(`transform`,oe(e)),e.element.classList.toggle(`selected`,j===e.name&&!e.locked),e.element.classList.toggle(`locked`,e.locked)}function se(){f.innerHTML=``,Object.values(d).forEach(e=>{let n=document.createElementNS(t,`g`);n.classList.add(`tangram-piece`),n.dataset.name=e.name,n.setAttribute(`tabindex`,`0`),n.setAttribute(`role`,`button`),n.setAttribute(`aria-label`,o[e.name].label);let r=document.createElementNS(t,`polygon`);r.setAttribute(`points`,z(e.local)),r.setAttribute(`fill`,o[e.name].color),r.setAttribute(`filter`,`url(#pieceShadow)`),n.appendChild(r),n.addEventListener(`pointerdown`,t=>ce(t,e.name)),n.addEventListener(`keydown`,t=>ue(t,e.name)),e.element=n,f.appendChild(n),B(e)})}function V(e){let t=m.createSVGPoint();return t.x=e.clientX,t.y=e.clientY,t.matrixTransform(m.getScreenCTM().inverse())}function H(){F||L||(F=Date.now(),I=window.setInterval(G,250))}function U(){return F?Math.max(0,Math.floor((Date.now()-F)/1e3)):0}function W(e){return`${Math.floor(e/60).toString().padStart(2,`0`)}:${(e%60).toString().padStart(2,`0`)}`}function G(){C.textContent=W(U())}function ce(e,t){let n=d[t];if(n.locked||L)return;e.preventDefault(),H(),X(t);let r=V(e);M={name:t,dx:r.x-n.x,dy:r.y-n.y,pointerId:e.pointerId},n.element.setPointerCapture(e.pointerId),n.element.addEventListener(`pointermove`,K),n.element.addEventListener(`pointerup`,q,{once:!0}),n.element.addEventListener(`pointercancel`,q,{once:!0})}function K(e){if(!M)return;let t=d[M.name],n=V(e);t.x=n.x-M.dx,t.y=n.y-M.dy,B(t)}function q(e){if(!M)return;let t=d[M.name];t.element.removeEventListener(`pointermove`,K);try{t.element.releasePointerCapture(M.pointerId)}catch{}M=null,N+=1,S.textContent=N,Y(t)}function J(e){return(e%360+360)%360}function Y(e){let t=u[e.name],n=Math.hypot(e.x-t.center.x,e.y-t.center.y),r=J(e.rotation)===0,a=!e.flip;n<=i&&r&&a?(e.x=t.center.x,e.y=t.center.y,e.rotation=0,e.flip=!1,e.locked=!0,B(e),h.textContent=`${o[e.name].label} locked in place`,g.className=`status-dot active`,X(null),Q()):(h.textContent=n<=i?`Position is close — check rotation or reflection`:`Keep arranging the pieces`,g.className=`status-dot`)}function X(e){if(j=e,Object.values(d).forEach(B),!e){_.textContent=`None`,te.textContent=`Click or drag a piece to select it.`,v.disabled=!0,y.disabled=!0,b.disabled=!0;return}let t=d[e];_.textContent=o[e].label,te.textContent=`Rotation ${J(t.rotation)}°${t.flip?` · flipped`:``}`,v.disabled=t.locked,y.disabled=t.locked,b.disabled=t.locked||e!==`parallelogram`}function Z(e){if(!j)return;let t=d[j];t.locked||(H(),t.rotation=J(t.rotation+e),N+=1,S.textContent=N,B(t),X(j),Y(t))}function le(){if(!j||j!==`parallelogram`)return;let e=d[j];e.locked||(H(),e.flip=!e.flip,N+=1,S.textContent=N,B(e),X(j),Y(e))}function ue(e,t){if(d[t].locked)return;X(t);let n=d[t],r=!0;switch(H(),e.key){case`ArrowLeft`:n.x-=8;break;case`ArrowRight`:n.x+=8;break;case`ArrowUp`:n.y-=8;break;case`ArrowDown`:n.y+=8;break;case`r`:case`R`:n.rotation=J(n.rotation+45);break;case`f`:case`F`:t===`parallelogram`?n.flip=!n.flip:r=!1;break;default:r=!1}r&&(e.preventDefault(),N+=1,S.textContent=N,B(n),X(t),Y(n))}function Q(){let e=Object.values(d).filter(e=>e.locked).length;re.textContent=e,ie.style.width=`${e/7*100}%`,e===7&&de()}function de(){L=!0,I&&clearInterval(I),G();let e=U();h.textContent=`Shape completed`,g.className=`status-dot success`,T.className=`result-box success`,T.innerHTML=`<div class="result-kicker">SHAPE COMPLETE</div><div class="result-main">All seven pieces fit.</div><div class="result-sub">${N} moves · ${W(e)}${P?` · ${P} hint used`:` · no hints`}</div>`;let t=Math.max(35,100-Math.max(0,N-7)*3),n=Math.max(35,100-Math.floor(e/8)*3),r=P?70:100,i=Math.round(t*.4+n*.4+r*.2);E.textContent=i,D.textContent=N,O.textContent=W(e),k.textContent=P,A.textContent=i>=90?`Excellent spatial efficiency.`:`Solved. Try again with fewer moves or without outlines.`;let a=Number(localStorage.getItem(`physicsPlayTangramBest`)||0);(!a||e<a)&&(localStorage.setItem(`physicsPlayTangramBest`,String(e)),w.textContent=W(e))}function fe(){R=!R,p.classList.toggle(`visible`,R),x.textContent=R?`Hide outlines`:`Show outlines`,R&&(P=1,k.textContent=P)}function pe(){I&&clearInterval(I),F=null,I=null,L=!1,N=0,P=0,R=!1,p.classList.remove(`visible`),x.textContent=`Show outlines`,h.textContent=`Arrange all 7 pieces inside the silhouette`,g.className=`status-dot`,S.textContent=`0`,C.textContent=`00:00`,T.className=`result-box`,T.innerHTML=`<div class="result-kicker">SPATIAL CHALLENGE</div><div class="result-main">Rebuild the square using every piece.</div><div class="result-sub">No overlaps, no missing pieces. Use the silhouette first; reveal outlines only if you need a hint.</div>`,E.textContent=`—`,D.textContent=`—`,O.textContent=`—`,k.textContent=`0`,A.textContent=`Complete the square to generate your score.`,Object.entries(d).forEach(([e,t])=>{Object.assign(t,s[e]),t.locked=!1,B(t)}),X(null),Q()}v.addEventListener(`click`,()=>Z(-45)),y.addEventListener(`click`,()=>Z(45)),b.addEventListener(`click`,le),x.addEventListener(`click`,fe),ne.addEventListener(`click`,pe),ae(),se();var $=Number(localStorage.getItem(`physicsPlayTangramBest`)||0);$&&(w.textContent=W($)),Q();