import './style.css';

const app = document.querySelector('#app');
app.innerHTML = `
  <main class="shell home-shell">
    <header class="topbar home-topbar">
      <div class="brand-wrap">
        <div class="logo-mark">Φ</div>
        <div>
          <div class="brand">PHYSICS PLAY</div>
          <div class="tagline">Predict it. Play it. Understand it.</div>
        </div>
      </div>
      <div class="prototype-badge">PROTOTYPE 0.5</div>
    </header>

    <section class="home-hero">
      <div class="eyebrow">PLAYABLE SCIENCE & GEOMETRY</div>
      <h1>Choose your challenge.</h1>
      <p>Each challenge is something you can manipulate directly. Predict, experiment, rearrange and use the underlying science or geometry to improve your solution.</p>
    </section>

    <section class="challenge-grid" aria-label="Interactive challenges">
      <a class="challenge-card projectile-card" href="/hit-target.html">
        <div class="challenge-card-visual projectile-visual" aria-hidden="true">
          <div class="mini-cannon"></div>
          <div class="mini-arc"></div>
          <div class="mini-target">◎</div>
        </div>
        <div class="challenge-card-body">
          <div class="challenge-card-meta"><span>01</span><span>Projectile motion</span></div>
          <h2>Hit The Target</h2>
          <p>Aim a cannon in 3D. Choose direction, angle and speed, then hit the target without a trajectory preview.</p>
          <div class="challenge-card-footer"><span>PLAY CHALLENGE</span><strong>→</strong></div>
        </div>
      </a>

      <a class="challenge-card loop-card" href="/complete-loop.html">
        <div class="challenge-card-visual loop-visual" aria-hidden="true">
          <div class="mini-ramp"></div>
          <div class="mini-loop"></div>
          <div class="mini-cart"></div>
        </div>
        <div class="challenge-card-body">
          <div class="challenge-card-meta"><span>02</span><span>Energy + circular motion</span></div>
          <h2>Complete The Loop</h2>
          <p>Choose the starting height. Can the cart keep enough speed at the top to stay on the track and finish the loop?</p>
          <div class="challenge-card-footer"><span>PLAY CHALLENGE</span><strong>→</strong></div>
        </div>
      </a>

      <a class="challenge-card orbit-card" href="/put-orbit.html">
        <div class="challenge-card-visual orbit-visual" aria-hidden="true">
          <div class="mini-earth"></div>
          <div class="mini-orbit-ring"></div>
          <div class="mini-satellite"></div>
        </div>
        <div class="challenge-card-body">
          <div class="challenge-card-meta"><span>03</span><span>Gravitation</span></div>
          <h2>Put It in Orbit</h2>
          <p>Choose the satellite's initial speed and direction. Find a stable orbit without crashing into Earth or escaping.</p>
          <div class="challenge-card-footer"><span>PLAY CHALLENGE</span><strong>→</strong></div>
        </div>
      </a>

      <a class="challenge-card field-card" href="/zero-field.html">
        <div class="challenge-card-visual field-visual" aria-hidden="true">
          <div class="mini-charge charge-a">+</div>
          <div class="mini-probe">P</div>
          <div class="mini-charge charge-b">+</div>
          <div class="mini-field-arrow arrow-left"></div>
          <div class="mini-field-arrow arrow-right"></div>
        </div>
        <div class="challenge-card-body">
          <div class="challenge-card-meta"><span>04</span><span>Electrostatics</span></div>
          <h2>Zero The Field</h2>
          <p>Move a charge until two electric-field vectors cancel at the probe. Predict, measure and refine.</p>
          <div class="challenge-card-footer"><span>PLAY CHALLENGE</span><strong>→</strong></div>
        </div>
      </a>

      <a class="challenge-card gas-card" href="/keep-gas.html">
        <div class="challenge-card-visual gas-visual" aria-hidden="true">
          <div class="mini-gas-cylinder"></div>
          <div class="mini-gas-piston"></div>
          <div class="mini-gas-dot gas-dot-a"></div>
          <div class="mini-gas-dot gas-dot-b"></div>
          <div class="mini-gas-dot gas-dot-c"></div>
        </div>
        <div class="challenge-card-body">
          <div class="challenge-card-meta"><span>05</span><span>Ideal gas law</span></div>
          <h2>Keep The Gas Alive</h2>
          <p>Control volume and temperature to hit the target pressure without crossing the chamber's safety limits.</p>
          <div class="challenge-card-footer"><span>PLAY CHALLENGE</span><strong>→</strong></div>
        </div>
      </a>

      <a class="challenge-card coffee-card" href="/cool-coffee.html">
        <div class="challenge-card-visual coffee-visual" aria-hidden="true">
          <div class="mini-cup"></div>
          <div class="mini-steam steam-a"></div>
          <div class="mini-steam steam-b"></div>
          <div class="mini-milk-drop"></div>
        </div>
        <div class="challenge-card-body">
          <div class="challenge-card-meta"><span>06</span><span>Thermal transfer</span></div>
          <h2>Cool The Coffee</h2>
          <p>Choose when to add cold milk so the coffee reaches the perfect serving temperature exactly eight minutes later.</p>
          <div class="challenge-card-footer"><span>PLAY CHALLENGE</span><strong>→</strong></div>
        </div>
      </a>


      <a class="challenge-card tangram-home-card" href="/tangram.html">
        <div class="challenge-card-visual tangram-visual" aria-hidden="true">
          <div class="mini-tangram-square"></div>
          <div class="mini-tangram-line line-a"></div>
          <div class="mini-tangram-line line-b"></div>
        </div>
        <div class="challenge-card-body">
          <div class="challenge-card-meta"><span>07</span><span>Spatial geometry</span></div>
          <h2>Build The Shape</h2>
          <p>Use all seven tangram pieces. Drag, rotate and reflect them until they exactly rebuild the target silhouette.</p>
          <div class="challenge-card-footer"><span>PLAY CHALLENGE</span><strong>→</strong></div>
        </div>
      </a>
    </section>

    <section class="home-principle">
      <div class="section-label">THE RULE</div>
      <p><strong>The concept is the game engine.</strong> Equations, geometry and spatial reasoning are not shown first: they become the tools you need to win.</p>
    </section>
  </main>
`;
