//
const root = document.getElementById("root");
//
const home = () => {
  root.innerHTML = `

<main class="main">

<!-- HERO / INTRO -->
<section class="hero">
   
    <h1>Falcon Stoop</h1>
    <p class="hero-subtitle">
    A JavaScript Engineer who knows React
    </p>
    <a class="projects-page-link" href="https://github.com/falconstoop" target="_blank" rel="noopener noreferrer">Projects Page: GitHub</a>
</section>

<!-- JAVASCRIPT SECTION -->
<section class="stack-section">
    <h2 class="section-title">JavaScript</h2>
    <p class="section-subtitle">Walking through the machinery of JavaScript ... shaped by applications I've shipped, informed by courses and technical blogs I've studied, and explained only after the pieces finally clicked.</p>  

<div class="grid-auto-fit">
  <a href="#/javascript/what-is-javascript" class="card">
  <h2>What is JavaScript?</h2>
  <p>Understanding How JavaScript works by knowing Who actually owns the data? </br>
  The DOM, JS Engine & Render Engine explained.</p>
  </a>

  <a href="#/javascript/closure" class="card">
  <h2>Closure</h2>
  <p>
  Walking through the callstack, local memory, and the scope chain.
  <br>
  How a function's birthplace defines what data it can access, not where it's called.
  <br>
  We'll explore the "C.O.V.E" And take a quiet glance at the Garbage Collector.
  </p>
  </a>

<a href="#/javascript/form-submission" class="card">
  <h2>HTML Form Submission</h2>
  <p>
  Why your form submits when it shouldn't, and doesn't when it should. The rules, finally explained.
  <br>
  One input. Two inputs. A submit button. A button that isn't. The difference is everything.
  <br>
  Every scenario. Every combination. Every silent rule.
  </p>
</a>

<a href="#/javascript/state-management" class="card">
  <h2>State Management</h2>
  <p>
    State types in React & JS
  <br>
  Data State vs. UI State — two types of state, two cases for passing to children.
  <br>
  The mental model that emerged across Form (V1, V2) and Car Configurator
  <br>
  3 Dependency Patterns.
  </p>
</a>

  <a href="#/" class="card">
  <h2>Coming Soon...</h2>
  <p>...</p>
  </a>


  <!-- future cards copy this exact structure -->
</div>

</section>
<!-- End of JAVASCRIPT SECTION -->

<hr>

<!-- PROJECT CASE STUDIES SECTION -->
<section class="stack-section">
    <h2 class="section-title">Project Case Studies</h2>
    <p class="section-subtitle">Real problems, multiple solutions, and the decisions that shaped the final code.</p>

<div class="grid-auto-fit">
  <a href="#/projects/form" class="card">
  <h2>Single-View Form</h2>
  <p>
  <strong>(Login/Signup Switch)</strong>
  </p>
  <br>
  <p>
  SPA, parent-child communication, state, circular dependency, callbacks, shadowing, closure, custom events, and shared state.
  <br>
  The architecture beneath every modern framework, built in vanilla JavaScript.
  </p>
  </a>

  <a href="#/projects/multi-steps-form" class="card">
  <h2>Multi-Steps Form</h2>
  <p>
  <strong>(Signup with steps, no browser back handling)</strong>
  </p>
  <br>
   <p>
  <strong>Navigation:</strong> centralized vs. decentralized navigation, Using Context API concept by Named Export, dependency injection.
  <br>
  <br>
  <strong>Data:</strong> state separation,data management Controlled Circular Dependency(Advanced)
  </p>
  </a>


  <a href="#/projects/car-configurator" class="card">
    <h2>Car Configurator</h2>
    <p>
    <strong>(Bridge Project — Proof of Transfer)</strong>
    </p>
    <br>
    <p>
    A BMW-inspired car configuration tool with conditional data flow, route-based navigation, and a CRUD dashboard.
    <br>
    The patterns from V1 and V2, applied to a new challenge — built to prove the architecture was understood.
    </p>
  </a>


  <a href="#/" class="card">
  <h2>Persistent Multi-Steps Form</h2>
  <p>
  <strong>(hash-synced steps with browser back support)</strong>
  <br>
  
  ...
  </p>
  </a>

      <a href="#/" class="card">
  <h2>Coming Soon...</h2>
  <p>...</p>
  </a>
</div>

</section>
<!-- End of PROJECT CASE STUDIES SECTION -->

<hr>
<!-- BROWSER STORAGE APIs SECTION -->
<section class="stack-section">
    <h2 class="section-title">Browser Storage APIs</h2>
    <p class="section-subtitle">The complete guide to client-side data.</p>

<div class="grid-auto-fit">


  <a href="#/browserStorage/what-is-api" class="card">
  <h2> What Is API</h2>
  <br>
  <p>
  The API concept, demystified. 
  <br>
  What every developer should know before using any API.
  </p>
  </a>

  <a href="#/browserStorage/client-side-storage" class="card">
  <h2> Client-Side Storage</h2>
  <br>
  <p>
  Every way the browser can save data.
  <br>
  From cookies to IndexedDB — all in one place.
  </p>
  </a>


  <a href="#/browserStorage/storage-quota-persistence" class="card">
  <h2>Storage Quota & Persistence  </h2>
  <br>
  <p>
  Best Effort vs. Persistent.
  <br>
   How much you can store,  
  <br>
  and how to keep it from being evicted.
  
  </p>
  </a>



  <a href="#/browserStorage/indexedDB" class="card">
  <h2>IndexedDB</h2>
  <br>
  <p>
  idb & 
  <br>
    
  
  </p>
  </a>


  <a href="#/" class="card">
  <h2>Coming Soon...</h2>
  <p>...</p>
  </a>

  <a href="#/" class="card">
  <h2>Coming Soon...</h2>
  <p>...</p>
  </a>
</div>

</section>

<!-- End of BROWSER STORAGE APIs SECTION -->
<hr>


<!-- TESTING SECTION (Future) -->
<section class="stack-section">
    <h2 class="section-title">SDET</h2>
    <p class="section-subtitle">Coming soon ...</p>
</section>
<!-- End of TESTING SECTION (Future) -->

<hr>

<!-- SECURITY SECTION (Future) -->
<section class="stack-section">
    <h2 class="section-title">Web Security</h2>
    <p class="section-subtitle">Coming soon ...</p>
</section>
<!-- End of SECURITY SECTION (Future) -->
<br>
</main>

<footer class="site-footer">
  
<div class="blockquote-wrapper">
  <blockquote>
    <p>"The general who wins a battle makes many calculations in his temple before the battle is fought."</p>
    <footer>— Sun Tzu, The Art of War ⚔️ —</footer>
    <p class="quote-twist">
     This site is where the calculations happen. The projects are where they're fought.
    </p>
  </blockquote>
</div>

  <!-- Future contact info here -->
  <div class="contacts">
  <p>📧 falcons.stoop@gmail.com</p>
  <p>📞 +98XXX</p>
  </div>
</footer>

  `;
};

export default home;
