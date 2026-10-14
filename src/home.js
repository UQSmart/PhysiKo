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
      <div class="prototype-badge">PROTOTYPE 0.3</div>
    </header>

    <section class="home-hero">
      <div class="eyebrow">PLAYABLE PHYSICS</div>
      <h1>Choose your challenge.</h1>
      <p>Each problem is a physical system you can manipulate. Make a prediction, run the experiment, then use physics to improve it.</p>
    </section>

    <section class="challenge-grid" aria-label="Physics challenges">
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
    </section>

    <section class="home-principle">
      <div class="section-label">THE RULE</div>
      <p><strong>Physics is the game engine.</strong> The equations are not shown first: they become the tool you need to win.</p>
    </section>
  </main>
`;
