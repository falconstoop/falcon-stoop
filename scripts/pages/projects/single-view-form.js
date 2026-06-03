//
const root = document.getElementById("root");
//
const form = () => {
  root.innerHTML = `
<article class="content">

<h2>Single-View Form</h2>

<div class="blockquote-wrapper">
<blockquote>
    <p>"I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times." </p>
    <footer>— Bruce Lee 🥋 —</footer>
    <p class="quote-twist">
     You have no idea how many times I tore this form down and built it back up — until it had nothing left to teach me. 
     <br>
     While others were busy building their tenth app, I was still here. Still learning. Still rebuilding.
    </p>
</blockquote>
</div>




<h3>SPA Parent-Child Communication Patterns</h3>

<p>
Every frontend framework — React, Vue, Svelte — is built on one unbreakable loop: <strong>state flows down, notifications flow up.</strong> This isn't a library feature. It's an architectural truth. And I learned it by building a multi-step authentication form in plain JavaScript — where I had to solve the most fundamental problem in any SPA: how does a child tell its parent something happened?
</p>

<p>
This case study walks through the problem I faced, the three patterns I explored, and the metrics that guided my final decision.
</p>

<hr>

<h4> The Roadmap:
<br>
Problem → Circular Dependency → Callback → Shadowing → Closure → Custom Events → Shared State → Decision.
</h4>

<h3>The Problem</h3>

<h4>Context:</h4>
<p>
I was building a multi-step form inside a Single Page Application with a hash router. The auth page lives at <code>#/home</code>. It contains two form-creation functions: <strong>createLogin()</strong> and <strong>createSignup()</strong>. The goal: show one form at a time, switch between them via buttons, and never change the URL.
</p>

<h4>What Went Wrong — The First Attempt:</h4>
<p>
My initial code had two functions. Each built a form and appended it to the DOM. Each button called the other function directly — the login button called <strong>createSignup()</strong>, the signup button called <strong>createLogin()</strong>.
<br>
The result? <strong>Forms stacked on top of each other.</strong> Nothing was ever cleared. The DOM grew with every click.
</p>

<h4>What Was Missing:</h4>
<p>
I needed three things I hadn't yet understood:
<br>
1. A <strong>state variable</strong> — to remember which form is currently shown.
<br>
2. A <strong>render function</strong> — to clear the container before appending.
<br>
3. A <strong>notification path</strong> — so children could tell the parent to change state without calling each other directly.
</p>

<hr>

<h3>The Misunderstanding: Switch vs. Swap</h3>

<p>
Early on, I thought switching forms was like <em>swapping variable values</em> — exchanging A and B using a temporary C. That's wrong. What we're doing is <strong>view switching</strong>: one container holds one item at a time. Remove the old. Insert the new. No temp variable. No exchange.
</p>

<pre><code>// This is SWITCHING (what we want):
let x = "blue";
let y = "red";
x = y;  // x becomes "red", "blue" is gone

// This is SWAPPING (not what we need):
[x, y] = [y, x];  // both values preserved, exchanged</code></pre>

<p>
<strong>Core difference:</strong> Switch is a one-way overwrite. Swap is a two-way exchange. Form is View switching.
</p>

<hr>

<h3>The Universal Pattern</h3>

<p>
Once I understood the problem, a pattern emerged — one that exists in every component-based architecture:
<br>
<strong>1. State variable</strong> → remembers current view ("login" or "signup")
<br>
<strong>2. Render function</strong> → clears container, reads state, draws the correct form
<br>
<strong>3. Triggers</strong> → update state, then call render
</p>

<p>
<strong>The Golden Rule:</strong> Forms never call each other directly. They only tell the state to change and let the central render function handle the rest.
</p>

<hr>

<h3>The Architectural Question: How Does the Child Notify the Parent?</h3>

<p>
Now came the deeper problem. The parent (<strong>auth</strong>) owns the state. The children (<strong>createLogin</strong>, <strong>createSignup</strong>) are just builders. When a user clicks a button inside a child, the parent needs to know. But the click happens inside the child. How does the message travel upward?
</p>

<p>
I explored three approaches:
</p>

<br>

<h4>The First Attempt — And Why It Failed: (circular dependency)</h4>

<p>
<strong>Circular Dependency:</strong> When two functions call each other directly — parent calls child, child calls parent back, neither knows who's in charge — control becomes tangled. The loop has no clear end. And debugging means chasing your own tail, not knowing where the cycle even began.
</p>
<br>
<p>
Before the callback pattern, I tried something simpler — or so I thought. I passed <strong>auth</strong> directly into each child, and inside the child's click handler, I changed the state variable and called <strong>auth()</strong> again:
</p>

<pre><code>// ❌ The flawed first attempt
const auth = () => {
  root.innerHTML = "";
  if (formType === "login") createLogin();  
  else if (formType === "signup") createSignup();
};

// Inside the child:
form.querySelector(".signup-link").addEventListener("click", () => {
  formType = "signup";   // child mutates state directly
  auth();                // child calls parent
});</code></pre>

<p>
At first, it worked. But something felt wrong. The parent called the child, and the child called the parent back — a <strong>circular dependency</strong> disguised as code. Every click triggered a full re-render cascade with no clear boundary between who owned what.
</p>

<p>
<strong>Two problems emerged:</strong>
<br>
<strong>1. The child knew too much.</strong> It knew about <strong>auth</strong>. It knew about the global state. It was making decisions that belonged to the parent.
<br>
<strong>2. Tracing bugs became a nightmare.</strong> When something broke, the callstack looked like a mirror facing a mirror — parent → child → parent → child, with no clear entry or exit point.
</p>

<p>
The <strong>handleSwitch</strong> function was the answer. It's a thin middle layer — a messenger. The child doesn't call <strong>auth</strong> directly. It calls <strong>handleSwitch</strong>, which updates the state and then calls <strong>auth</strong>. The child only says <em>"something happened."</em> The parent decides what to do about it.
</p>

<pre><code>// ✅ The fix: a middle function that breaks the circular chain
const auth = () => {
  root.innerHTML = "";
  const handleSwitch = (type) => {
    formType = type;   // parent owns the state change
    auth();            // parent decides to re-render
  };
  if (formType === "login") createLogin(handleSwitch);
  else if (formType === "signup") createSignup(handleSwitch);
};</code></pre>

<p>
<strong>The lesson:</strong> A circular call between parent and child is a warning sign. A middle function — a messenger — breaks the loop and restores clarity. The parent stays in control. The child stays innocent. The flow becomes traceable again.
</p>

<p>
<strong>And that's exactly what the callback method is. </strong> It's not a complex pattern. It's just that middle function — a messenger with two clear responsibilities:
<br>
<strong>1.</strong> It prevents the child from ever calling the parent directly, breaking the circular chain.
<br>
<strong>2.</strong> It keeps the parent responsible for managing all state changes and re-renders.
</p>

<p>
The callback pattern doesn't add complexity. It <em>removes</em> it — by giving the parent back its authority and the child back its innocence.
</p>

<hr>

<h3>Method 1: Callback Function (Props Drilling in React)</h3>
<p>
The parent passes a function to the child as a parameter. The child stores it. When the user clicks, the child calls it. The parent receives the call, updates state, and re-renders.
</p>

<pre><code>const root = document.getElementById("root");
let formType = "login";

// Children receive a callback and use it
const createLogin = (onSwitch) => {
  const form = document.createElement("form");
  form.className = "form";
  form.innerHTML = \`
    <h2>Login Page</h2>
    <label>Email</label>
    <input type="email"/>
    <label>Password</label>
    <input type="password"/>
    <p>Don't have an account? 
      <button class="signup-link">Sign Up</button>
    </p>
  \`;
  form.querySelector(".signup-link").addEventListener("click", () => {
    onSwitch("signup");
  });
  root.append(form);
};

const createSignup = (onSwitch) => {
  const form = document.createElement("form");
  form.className = "form";
  form.innerHTML = \`
    <h2>Sign Up Page</h2>
    <label>Full Name</label>
    <input type="text"/>
    <label>Email</label>
    <input type="email"/>
    <label>Password</label>
    <input type="password"/>
    <p>Already have an account? 
      <button class="login-link">Log In</button>
    </p>
  \`;
  form.querySelector(".login-link").addEventListener("click", () => {
    onSwitch("login");
  });
  root.append(form);
};

// Parent owns state and creates the callback
const auth = () => {
  root.innerHTML = "";
  const handleSwitch = (type) => {
    formType = type;
    auth();
  };
  if (formType === "login") createLogin(handleSwitch);
  else if (formType === "signup") createSignup(handleSwitch);
};</code></pre>


<h4>Two Mistakes I Made Along the Way</h4>

<p>
Before the callback pattern clicked, I ran into two subtle bugs that taught me more than the working code ever did.
</p>

<p>
<strong>First mistake: I shadowed the global state.</strong> I named the callback parameter the same as the global <strong>formType</strong> variable:
</p>

<pre><code>let formType = "login";  // global state

const handleSwitch = (formType) => {  
  // ❌ parameter shadows global
                 
  auth(formType);
};</code></pre>

<p>
The code ran without an error. No red warnings. No stack trace. It just... didn't work. The state never changed, and I stared at the screen confused. This is what makes <strong>shadowing silent</strong> — it doesn't break loudly. It breaks quietly. The parameter masks the outer variable, and the assignment writes to the parameter, not the global. JavaScript gives you no warning. You're left wondering why nothing happens.
</p>
<br>
<p>
<strong>Why does this happen?</strong> There's a subtle truth about JavaScript functions that no one talks about: <strong>when a function has a parameter, behind the scenes, that function creates a local variable with that exact name inside its own execution context.</strong>
</p>

<p>
So when I wrote:
</p>

<pre><code>const handleSwitch = (formType) => { ... }</code></pre>

<p>
JavaScript silently did this inside <strong>handleSwitch</strong>'s local memory:
</p>

<pre><code>// Behind the scenes — JS creates this automatically:
let formType = "signup";  // the argument value, stored locally</code></pre>

<p>
Now there are <em>two</em> variables named <strong>formType</strong>: one in the global <em>execution context</em>, and one in <strong>handleSwitch</strong>'s local memory. When I invoke <strong>formType</strong> inside the <strong>auth</strong> function, JavaScript looked for <strong>formType</strong> in the local memory first — found it — and assigned the local variable to itself. The global variable sat there, untouched, in the dark.
</p>

<p>
<strong>Shadowing is silent because it's not a bug — it's JavaScript doing exactly what it was told to do.</strong> The language created a local variable. You used it. The global one was never part of the conversation. No error. No warning. Just a quiet misunderstanding between you and the engine.
</p>

<p>
<strong>The fix:</strong> Give the parameter a different name — <strong>type</strong> instead of <strong>formType</strong>. The shadow lifts. The two variables stop fighting for the same name. The global becomes visible again.
</p>

<br>

<p>
<strong>Second mistake: I didn't realize closure was at work.</strong> The arrow function inside <strong>addEventListener</strong> closes over <strong>onSwitch</strong>. Even after <strong>createLogin</strong> finishes running and returns, that little arrow function still holds onto <strong>onSwitch</strong> in its backpack. When the user clicks the button days later, it still works — because <strong>closure never forgot.</strong>
</p>

<p>
That moment — watching <strong>onSwitch</strong> survive long after <strong>createLogin</strong> had finished — was the exact moment I knew I had to understand closure deeply. Not just memorize a definition. Not just nod along to a tutorial. I needed to trace it through the callstack, through local memory, through the invisible backpack, until I could <em>see</em> it.
</p>

<p>
So I built an entire page dedicated to it — walking through the machinery of JavaScript, step by patient step, until closure revealed itself. If you want to solidify your understanding — to go from <em>"I've heard of closure"</em> to <em>"I can trace it with my eyes closed"</em> — you can find it in link below or just head back. You'll find it tucked inside the JavaScript section.
</p>

<br>
<p>
<a class="accent-link" href="#/javascript/closure">→ The Closure Deep Dive: Walking through the callstack, local memory, and the scope chain — until the backpack reveals itself.</a>
</p>

<hr>



<h3>Method 2: Custom Events (Event-Based)</h3>
<br>
<p>
A custom event is an event you name and fire yourself. Unlike native events (<strong>click</strong>, <strong>submit</strong>) that the browser fires automatically, custom events are fired manually. The child dispatches an event into the air. The parent listens for it. They are <strong>fully decoupled</strong> — neither knows the other exists.
</p>

<pre><code>// Child: fire the event on button click
element.addEventListener("click", () => {
  document.dispatchEvent(new CustomEvent("form-switch", {
    detail: { formType: "signup" }
  }));
});

// Parent: listen for the event
document.addEventListener("form-switch", (e) => {
  const newType = e.detail.formType;
  // update state and re-render
});</code></pre>

<p>
<strong>Three steps:</strong>
<br>
<strong>1. Name the event</strong> — any string, like "form-switch"
<br>
<strong>2. Attach data</strong> — use the <strong>detail</strong> property
<br>
<strong>3. Dispatch it</strong> — fire it on an element, usually <strong>document</strong>
</p>

<p>
<strong>Important:</strong> Custom events have no built-in behavior. They don't know about keys, forms, or mouse positions. They only carry the name and data you give them. Custom events <em>ride on top of</em> native events — they never replace them.
</p>

<pre><code>Native event (click, submit, input...)
  └── Your custom event (form-switch, data-changed...)</code></pre>

<p>
<strong>A note on Custom Events:</strong> In practice, this pattern is used less frequently in modern JavaScript — and even more rarely in frameworks like React or Vue, which have their own built-in communication systems. I explored it once, built a working version, and filed it away.
</p>
<p>
I didn't go deep. I didn't need to. <strong>Knowing a concept exists — and knowing when <em>not</em> to use it — is just as valuable as mastering it.</strong> If a project ever demands fully decoupled modules communicating through events, I know exactly where to reach.
</p>

<hr>






<h3>Method 3: Shared State Object — Mini-Redux from Scratch (Redux System in React)</h3>
<br>
<p>
This is the architecture behind <strong>Redux</strong>, <strong>Zustand</strong>, and nearly every state management library. At its heart, it's beautifully simple: <strong>one object holds all the state and all the logic to change it.</strong> Every part of the app talks to that single object. No callbacks. No events. Just one source of truth.
</p>

<h4>Why This Pattern Exists</h4>
<p>
In the callback pattern, parent and child are connected by a function passed between them. In custom events, they communicate through the DOM. Both work — but as the app grows, state scatters across modules, dependencies tangle, and tracing changes becomes hard.
</p>
<p>
The Shared State Object solves this: <strong>one place for all state. One set of rules to change it.</strong> Anyone can read. Anyone can request a change. The store is the single source of truth.
</p>
<br>
<h4>The Structure</h4>
<pre><code>store/
  └── store.js    ← One object holding everything</code></pre>
<p>
The store is a plain object containing:
<br>
<strong>• state</strong> — the data (e.g., { formType: "login" })
<br>
<strong>• listeners</strong> — an array of functions waiting to be called on state change
<br>
<strong>• Methods</strong> — functions that update state and notify listeners
</p>
<p>
No classes. No libraries. Just an object with methods you write.
</p>
<br>
<h4>The Methods I Built</h4>
<p>
<strong>• subscribe(listener)</strong> — registers a function to be called whenever state changes
<br>
<strong>• setState(newState)</strong> — updates the state and calls every registered listener
</p>
<p>
The outside world never touches <strong>listeners</strong> directly. It uses <strong>subscribe</strong>. The internals stay hidden. The API stays clean.
</p>
<br>
<h4>How It Works — The Cycle</h4>

<pre><code>1. Store holds state and a list of listeners
2. Components subscribe to the store (register functions to re-render)
3. On user interaction, a child calls store.setState("signup")
4. Store updates its internal state
5. Store loops through listeners and calls each one
6. Subscribed components re-render with the new state</code></pre>

<p>
The child doesn't know about the parent. The parent doesn't pass callbacks. <strong>Everyone just speaks to the store.</strong>
</p>
<br>
<h4>The Redux Connection</h4>
<p>
Redux does exactly this — with more structure. It gives you:
<br>
<strong>• createStore()</strong> — builds the store
<br>
<strong>• getState()</strong> — reads state
<br>
<strong>• dispatch(action)</strong> — requests a change
<br>
<strong>• subscribe(listener)</strong> — registers for updates
</p>
<p>
What I built manually, Redux wraps up. But the pattern is identical. <strong>Build it once, and Redux is no longer magic — it's just a well-made version of what I already understand.</strong>
</p>
<br>
<h4>Two Problems I Hit While Building the Store</h4>
<p>
<strong>Problem 1 — Why use subscribe when I could just push directly?</strong>
</p>

<pre><code>// Why this:
store.subscribe(auth);

// Instead of this:
store.listeners.push(auth);</code></pre>

<p>
For a tiny app, direct push works fine. But <strong>subscribe</strong> hides the internals. If I later change <strong>listeners</strong> to an object, or add logic to prevent duplicates, every piece of code that used <strong>store.listeners.push()</strong> would break. <strong>subscribe</strong> protects against that. Plus, <strong>store.subscribe(auth)</strong> reads cleaner — and matches Redux's API, making the real library feel familiar.
</p>
<br>
<p>
<strong>Problem 2 — Why use store.listeners instead of this.listeners?</strong>
</p>

<pre><code>const store = {
  state: { formType: "login" },
  listeners: [],
  subscribe(listener) {
    store.listeners.push(listener);   // ✅ safe
    // this.listeners.push(listener); ← risky
  }
};</code></pre>

<p>
<strong>this</strong> in JavaScript depends on how a function is called, not where it's defined. If someone extracts the method:
</p>

<pre><code>const fn = store.subscribe;
fn(someListener);  // 'this' is now undefined — broken</code></pre>

<p>
<strong>store</strong> is a constant. It never changes. Using <strong>store.listeners</strong> guarantees you're always pointing to the right object, no matter how the method is invoked. This is a subtle trap with plain objects — and now I know how to avoid it.
</p>
<br>
<p>
<strong>The Rule:</strong>
<br>
<strong>• Plain object →</strong> use the object's direct name (<strong>store.listeners</strong>). There's no <strong>new</strong>, no instance binding. The direct reference never breaks.
<br>
<strong>• Class with new →</strong> use <strong>this</strong>. When you call <strong>new MyClass()</strong>, JavaScript creates a fresh object and locks <strong>this</strong> to it permanently. Every method on that instance can safely use <strong>this</strong>.
<br>
<strong>• Factory function returning an object →</strong> use the direct reference or a closure variable. Same reason — no <strong>new</strong>, no automatic <strong>this</strong> binding.
</p>
<br>
<p>
That's the whole reason. With a class and <strong>new</strong>, <strong>this</strong> is safe. With a plain object, <strong>store.listeners</strong> is safe. Now I know which one to use and why.
</p>


<br>
<h4>Why setState Is the Gatekeeper</h4>
<p>
We need <strong>setState</strong> because it does two things at once:
</p>

<pre><code>setState(newType) {
  store.state.formType = newType;     
  // 1. Updates the state
  store.listeners.forEach(fn => fn()); 
  // 2. Notifies everyone
}</code></pre>

<p>
Without it, you'd have to do both manually every time state changes — and one day, you'd forget to notify subscribers. The app would silently break. <strong>setState</strong> bundles them together. It's the gatekeeper. The only way state changes. That guarantees subscribers are always notified.
</p>
<br>
<h4>Implementing the Shared State Object — Step by Step</h4>
<p>
<strong>store.js — The Single Source of Truth:</strong>
</p>

<pre><code>const store = {
  state: { formType: "login" },
  listeners: [],
  subscribe(listener) {
    store.listeners.push(listener);
  },
  setState(newType) {
    store.state.formType = newType;
    store.listeners.forEach(fn => fn());
  }
};</code></pre>

<p>
<strong>auth.js (Parent) — Subscribes to Store:</strong>
</p>

<pre><code>import store from "./store.js";

const auth = () => {
  root.innerHTML = "";
  if (store.state.formType === "login") createLogin();
  else createSignup();
};

store.subscribe(auth);</code></pre>

<p>
<strong>login.js (Child) — Calls store.setState:</strong>
</p>

<pre><code>import store from "./store.js";

// Inside button click handler:
store.setState("signup");</code></pre>

<p>
<strong>signup.js (Child) — Calls store.setState:</strong>
</p>

<pre><code>import store from "./store.js";

// Inside button click handler:
store.setState("login");</code></pre>

<br>
<h4>The Honest Truth: We Didn't Need All of This</h4>
<p>
For our small auth app — with only <strong>one</strong> subscriber — a simpler <strong>setState</strong> would have been enough:
</p>

<pre><code>setState(newType) {
  store.state.formType = newType;
  auth();  // Only one component needs to re-render
}</code></pre>

<p>
No array. No loop. No subscribe. For this app, that's all that's needed. <strong>And knowing that — knowing when simplicity is enough — is the real skill.</strong>
</p>
<br>
<h4>Why We Built It the Redux Way Anyway</h4>
<p>
In real applications, state changes affect many components — not just one. A user logging out might need to update the header, the sidebar, the main content, and the cart. That's many subscribers, not one.
</p>
<p>
The listener array and <strong>subscribe</strong> method exist for that scenario. They allow any number of components to register and be notified without the store knowing who they are.
</p>
<p>
<strong>We built the scalable version from the start — not because our app needs it, but to understand what Redux does under the hood.</strong> Now when I use Redux or Zustand, I don't see magic. I see a well-made version of something I've already built.
</p>
<br>


<h4>Two Ways to Share State: Redux vs. Context</h4>
<p>
Both solve the same problem. <strong>Same purpose, different location.</strong> Outside the tree vs. inside the tree. That's the core distinction.
</p>
<p>
<strong>Redux / Zustand — Outside the Tree:</strong>
<br>
State lives in a plain JavaScript object, completely separate from the component tree. Import it anywhere. No Provider wrapper needed. Components opt in — only those that need the state import it. A component five levels deep can access the store without its parent knowing. This scales. Large apps with many features, pages, and deeply nested components stay clean.
</p>
<br>
<p>
<strong>The flow:</strong> Component → calls store method → store updates → subscribed components re-render.
</p>
<br>
<p>
<strong>Context API — Inside the Tree:</strong>
<br>
State lives inside a React component — the Provider. It wraps everything that needs access. When you wrap components in a Provider, every component inside gains access to the state — whether it uses it or not. This is fine for small, focused groups: a form section, a sidebar, a theme wrapper. The overhead is small because the group is small.
</p>
<br>
<p>
<strong>The flow:</strong> Component → calls setter from context → Provider re-renders → consumers re-render.
</p>
<br>
<p>
<strong>The Real Difference — How State Is Shared:</strong>
<br>
Context gives state to <strong>everyone in the room</strong> — blanket coverage. Redux lets each component <strong>walk up and take only what it needs</strong> — opt-in access.
</p>
<p>
In a large app with deeply nested trees and hundreds of components, blanket coverage becomes wasteful. State reaches components that never needed it. The wrapper grows. Re-renders spread. Redux avoids this entirely — state is available globally, but only claimed by those who need it.
</p>
<br>
<p>
<strong>The Rule of Thumb:</strong>
<br>
• <strong>Context</strong> = small scope, few consumers, blanket sharing is harmless
<br>
• <strong>Redux / Zustand</strong> = large scope, many consumers, opt-in sharing keeps things clean
</p>
<p>
It's not about complexity. It's about <strong>how far the state travels</strong> and <strong>how many components don't need it but would receive it anyway.</strong> Choose the tool that matches the size of the room.
</p>
<br>
<br>
<h4>Which Pattern for Which Form?</h4>
<p>
For a multi-step form in React — the kind I'll build next — here's how I'd choose:
</p>
<p>
<strong>• Props drilling</strong> — fine for 2-3 steps. Simple parent-child. No extra tools. No overhead.
<br>
<strong>• Context</strong> — good for 4+ steps, or when state is shared across many form components. The Provider wraps the form section. Clean enough.
<br>
<strong>• Redux / Zustand</strong> — overkill for a single form. Too much setup. Only reach for it if the form data is needed globally — across many pages, many features, or the entire app.
</p>
<br>
<p>
<strong>The real skill isn't knowing every pattern. It's knowing which one fits the problem in front of you.</strong> For this form — one parent, two children, clear boundaries — the callback was enough.
</p>
<p>
<strong>I didn't apply all these patterns because the form needed them.</strong> I applied them because <em>I</em> needed to understand them. Each method — callback, custom events, shared state — was a layer peeled back, revealing what React, Redux, and Zustand do behind the scenes. Not because this form demanded it. Because my future projects will.
</p>
<p>
Now when I reach for a pattern, I reach with understanding — not guesswork. The form was small. The lessons were large.
</p>





<hr>


<h4>My Decision</h4>
<p>
<strong>I chose the Callback pattern.</strong> Clean. Traceable. Direct. For a small form with clear parent-child boundaries, it was the right tool — and it's exactly how React handles child-to-parent communication under the hood.
</p>
<p>
But now I know the full landscape. If the component tree grows deep and tangled, <strong>Custom Events</strong> are waiting. If state becomes truly global, <strong>Shared State</strong> is the natural evolution. <strong>I no longer guess which pattern to use — I know.</strong>
</p>

<hr>

<h3>The Core SPA Loop</h3>

<p>
Every visual change in an SPA follows one unbreakable cycle:
</p>

<pre><code>User interacts with child
        ↓
Child notifies parent 
(callback / event / state update)
        ↓
Parent updates state
        ↓
Parent re-renders
        ↓
New state flows down to children
        ↓
New view appears</code></pre>

<p>
<strong>The Golden Rule of SPA Architecture:</strong> State flows down. Notifications flow up. Children never talk to children. The parent is the single source of truth.
</p>

<p>
This is not a React concept. It's not a Vue concept. It's <em>the</em> architectural pattern beneath all modern frameworks — and I learned it by building a form in plain JavaScript.
</p>

<hr>

<h4>What This Taught Me</h4>
<p>
A form that switches between two views seems simple. But buried inside it is the engine of every SPA ever built. Solving it in vanilla JavaScript — without a framework to hide the details — forced me to understand state, circular dependency, shadowing, closure, callbacks, custom events, shared state, rendering, and parent-child communication at a level no tutorial could give me.
</p>

<p>
Now when I use React, Vue, or Svelte, I don't just use their patterns. I see the architecture beneath them.
</p>

<hr>

<p>
<em>See the full working code on <a href="https://github.com/falconstoop" target="_blank" rel="noopener noreferrer">GitHub →</a></em>
</p>





</article>
  `;
};

export default form;
