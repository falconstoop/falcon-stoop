//
const root = document.getElementById("root");
//
const multiStepsForm = () => {
  root.innerHTML = `
<article class="content">

<h2>Multi-Steps Form</h2>


<div class="blockquote-wrapper">
<blockquote>
    <p>"Plan for what is difficult while it is easy, do what is great while it is small." </p>
    <footer>— Sun Tzu ⚔️ —</footer>
    <p class="quote-twist">
     I started with two steps. Then six. <br>
     The architecture held — because the foundation was built before the complexity arrived...
    </p>
</blockquote>
</div>





<h3>Steps, Buttons, and the Browser's Hidden Rules</h3>

<p>
A form that spans multiple steps seems like a simple extension of a single-view form. Just add more views, track which step the user is on, and move forward. But buried inside that progression is a set of browser behaviors most developers don't discover until something breaks — the Enter key submits when it shouldn't, buttons fire without being clicked, and a yellow console warning appears with no clear cause.
</p>

<p>
This case study walks through the two types of multi-step forms, the architecture behind each, and the exact bugs I hit while building mine — and how the browser's form submission rules explained everything.
</p>

<hr>


<p>
<strong>The problems fell into two groups:</strong>
</p>

<p>
<strong>Navigation Group:</strong>
<br>
Problem 2: How to control steps (centralized)
<br>
Problem 3: How to communicate across modules (named exports)
<br>
Problem 4: How to handle the Enter key (dependency injection)
</p>

<p>
<strong>Data Group:</strong>
<br>
Problem 5: How to separate navigation from data
<br>
Problem 6: How to save data across steps
<br>
Problem 7: How to display saved data
</p>


<hr>

<h3>Two Types of Multi-Step Forms</h3>

<p>
Not all multi-step forms are the same. The architecture depends on how long the user will spend inside the form — and whether they expect the browser's back button to work:
</p>

<br>

<h4>Type 1: Short Forms (Signup, Login, Contact)</h4>

<p>
<strong>• 2-3 steps, completed in minutes.</strong>
<br>
<strong>• Linear flow —</strong> no need to pause, save, or resume.
<br>
<strong>• Browser back =</strong> exit the form entirely. The user expects to leave.
<br>
<strong>• Internal Back button</strong> handles step navigation.
<br>
<strong>• No URL syncing needed.</strong> Steps live in component state, not the URL.
</p>

<br>

<h4>Type 2: Long Wizards (Loan Applications, Tax Filing, Onboarding)</h4>

<p>
<strong>• Many steps, complex data —</strong> may take hours or even days.
<br>
<strong>• Users may pause, leave, and resume.</strong>
<br>
<strong>• Browser back =</strong> go to the previous step. This is expected behavior.
<br>
<strong>• Steps synced to URL hash</strong> (#/loan/step-2) so the router can restore the correct step.
<br>
<strong>• Data persists in a store</strong> across sessions — Redux, Zustand, or localStorage.
</p>

<br>

<h4>How to Handle Browser Back in Wizards</h4>

<p>
<strong>Approach 1: Sync Steps to Hash</strong>
<br>
Each step updates the URL. The router reads the step from the hash on load. Browser back changes the hash, the router catches it, and re-renders the correct step. State survives in the store — the user never loses progress.
</p>


<p>
<strong>Approach 2: Warn Before Leaving</strong>
<br>
Add a <strong>beforeunload</strong> event listener. If the user tries to close the tab or navigate away, show a warning: <em>"You have unsaved progress. Are you sure you want to leave?"</em>
</p>

<p>
<strong>The Rule:</strong> Short, quick forms → internal Back button only. Long, complex wizards → sync with URL so browser back works naturally. Match the behavior to the user's expectation — not the developer's convenience.
</p>

<hr>

<h3>Problem 1: The Bug: A Yellow Console Warning</h3>

<p>
While building my multi-step form, I noticed a yellow warning in the console:
</p>

<pre><code>Form submission canceled because the form is not connected.</code></pre>

<p>
The form switching still worked. The buttons did what I programmed them to do. But the warning was there — and warnings mean something is wrong, even if the app hasn't crashed yet.
</p>

<br>

<h4>What Was Happening</h4>

<p>
Buttons inside a <strong>&lt;form&gt;</strong> have a default type of <strong>submit</strong>. When you click any button without explicitly setting its type, the browser assumes you want to submit the form. Since my form wasn't connected to a server — it was a client-side SPA with no action attribute — the submission was canceled by the browser. Hence the warning.
</p>
<br>
<p>
But it got worse: <strong>I had two buttons, both type="submit"</strong> (buttons by default have type="submit"). Both tried to submit on click. Pressing Enter in any input field had no single clear target. The browser attempted submission twice — once for each button — and canceled both times.
</p>

<pre><code>  form.innerHTML = \`
    <label>Email</label>
    <input type="email">
    <label>Password</label>
    <input type="password">
    <button class="btn">Sign In</button>
    <p>
    Dont Have an Account? 
    <button class="signup-link">Log In</button></p>\`;</code></pre>


<br>

<h4>The Solution</h4>

<p>
Only <strong>one</strong> button should have <strong>type="submit"</strong> — the one that actually submits the form. Every other button must have <strong>type="button"</strong>:
</p>

<pre><code>&lt;button type="submit"&gt;Create Account&lt;/button&gt;  &lt;!-- Submits the form --&gt;
&lt;button type="button"&gt;Back&lt;/button&gt;             &lt;!-- Only runs click handler --&gt;
&lt;button type="button"&gt;Sign Up&lt;/button&gt;          &lt;!-- Only runs click handler --&gt;</code></pre>

<p>
<strong>One form = one submit button.</strong> Every other button gets <strong>type="button"</strong>. This gives you full control:
</p>

<p>
<strong>• Enter key →</strong> triggers the single submit button — predictable, intentional.
<br>
<strong>• Other buttons →</strong> only do what you program them to do — no accidental submissions.
<br>
<strong>• No warnings.</strong> No unexpected behavior. Clean.
</p>

<br>

<h4>Why Enter Triggers the Submit Button</h4>

<p>
This isn't JavaScript. It's the browser. When you press Enter inside any <strong>&lt;input&gt;</strong> within a <strong>&lt;form&gt;</strong>, the browser automatically finds the <strong>&lt;button type="submit"&gt;</strong> and triggers it. No event listener required. No framework. Just an old web standard — because users expect Enter to submit forms.
</p>

<p>
<strong>The behavior:</strong>
<br>
<strong>• One submit button →</strong> Enter triggers it.
<br>
<strong>• Multiple submit buttons →</strong> Enter triggers the first one in HTML order.
<br>
<strong>• No submit button →</strong> Enter does nothing (unless there's exactly 1 input — a separate rule).
</p>

<p>
This is the exact set of rules I documented in full — every scenario, every combination — on the separate <strong>Form Submission</strong> reference page. That page exists because this bug forced me to learn the rules. Once I understood them, the warning disappeared and the behavior became predictable.
</p>

<br>
<p>
<a class="accent-link" href="#/javascript/form-submission">→ HTML Form Submission: Every scenario, every combination, every silent rule — fully documented.</a>
</p>

<br>

<h4>The Mistake in My Code</h4>

<p>
Both my "Sign Up" and "Log In" buttons — the ones that switch between views — were <strong>type="submit"</strong>. They weren't meant to submit anything. They were meant to call a callback and re-render. But the browser didn't know that.
</p>

<p>
<strong>The fix:</strong> Navigation buttons become <strong>type="button"</strong>. Only the final form submission button — the one that actually sends data — gets <strong>type="submit"</strong>. Warning gone. Behavior clean. One rule, applied consistently.
</p>
<br>
<h4>What This Taught Me</h4>
<p>
The browser has rules. Silent rules. Rules that don't throw errors — they just leave warnings in the console and behavior you can't explain. I learned them the hard way: by building a form that worked but warned, that submitted when it shouldn't, and that took hours to debug because I didn't know the difference between <strong>type="submit"</strong> and <strong>type="button"</strong>.
</p>

<p>
Now I know. One submit button per form. Every other button is a button. The Enter key is not magic — it's a spec. And when the rules are followed, the form behaves exactly as expected — every time.
</p>

<hr>




<h3>Problem 2: Navigating Between Steps — Centralized vs. Decentralized</h3>

<p>
In a multi-step form, steps must appear one at a time. <strong>How do I control which step is visible and handle Next/Back navigation?</strong>
</p>

<br>

<h4>Two Approaches</h4>

<p>
<strong>Method 1: Centralized (currentStep Variable)</strong>
<br>
A single variable — <strong>currentStep</strong> — tracks which step is visible. The parent checks this variable and renders the matching step. Buttons update the variable and trigger a re-render.
</p>

<pre><code>let currentStep = 1;

const renderStep = () => {
  if (currentStep === 1) form.append(step1FullName(1, 6));
  else if (currentStep === 2) form.append(step2Email(2, 6));
  // ...
};

// Next button: currentStep++; renderStep();
// Back button: currentStep--; renderStep();</code></pre>

<p>
<strong>• Pros:</strong> Clean, scalable. Same pattern for any number of steps. Easy to jump between non-adjacent steps.
<br>
<strong>• Cons:</strong> Slightly more setup than the decentralized approach.
</p>

<br>

<p>
<strong>Method 2: Decentralized (Invoke Inside Handler)</strong>
<br>
Each step's button directly calls the next or previous step function. No central variable.
</p>

<pre><code>// Inside Step 1's Next button:
form.innerHTML = "";
form.append(step2Email(2, 6));</code></pre>

<p>
<strong>• Pros:</strong> Simple for 2-3 steps.
<br>
<strong>• Cons:</strong> Each step must know about the next and previous step. Hard to reorder. Becomes messy with 6+ steps.
</p>

<br>

<h4>The Choice</h4>

<p>
<strong>Method 1</strong> follows the same pattern learned in the Single-View Form — one parent with multiple children, each child sending a signal to the parent to update state and re-render. The <strong>currentStep</strong> variable replaces <strong>formType</strong>. The architecture stays identical. For 6 steps, centralized is cleaner, maintainable, and scalable.
</p>

<p>
Decentralized brings back the circular dependency already solved and discussed in the Single-View Form project. Centralized builds directly on proven skills.
</p>





<hr>

<h3>Problem 3: Solving Prop Drilling with Named Exports</h3>
<p><strong><em>(Refactoring Callbacks into a Named Export — A Micro Shared State Object Pattern Discovery Within the Callback Method — The Idea Behind Context API)</em></strong></p>
<br>
<p>
I built a lightweight implementation of the same idea behind <strong>Context API</strong> — a function available to any component without prop drilling. In vanilla JS, I used a <strong>named export</strong>. React formalizes this into Context with automatic re-rendering and Provider scoping.
</p>

<br>

<h4>The Problem: Prop Drilling</h4>

<p>
In a multi-step signup form inside an auth page, Step 1 has a "Log in" link — a back link for users who want to leave the signup process and return to the login form. This link must call <strong>switchForm</strong> to return to the login form. But <strong>switchForm</strong> lives in <strong>auth.js</strong>. To reach Step 1, it had to be passed through modules that don't need it:
</p>

<pre><code>auth.js → createSignup.js → step1FullName.js</code></pre>

<p>
<strong>createSignup</strong> doesn't use <strong>switchForm</strong> — it just forwards it. This is <strong>prop drilling</strong>: threading a function through components that don't need it, just to reach one that does.
</p>

<p>
Two layers of drilling isn't the real issue. The real issue is that <strong>createSignup</strong> re-renders on every step navigation (Next/Back). Each re-render must pass <strong>switchForm</strong> as an argument — otherwise it becomes <strong>undefined</strong>.
</p>

<br>

<h4>The Breaking Point</h4>

<pre><code>// Inside createSignup's navigateStep:
const navigateStep = (step) => {
  currentStep = step;
  createSignup(switchForm); // Must pass every time (so every re-render takes it)
};</code></pre>

<p>
Every step change forces <strong>switchForm</strong> through the function call. Steps 2 to 6 receive it in every re-render despite never using it. One missed argument anywhere breaks the entire back link.
</p>

<br>

<h4>The Root Cause:</h4>

<p>
<strong>switchForm</strong> was a closure inside <strong>auth.js</strong>. Only <strong>auth</strong> itself and whoever received it as a parameter could call it. Step 1 was dependent on the chain staying intact.
</p>

<br>

<h4>The Solution: Named Export</h4>

<p>
Instead of defining <strong>switchForm</strong> inside the <strong>auth</strong> function as a closure, I moved it outside <strong>auth</strong> and exported it as a <strong>named export</strong>. Now <strong>auth.js</strong> has two exports: a <strong>default export</strong> (auth, the render function) and a <strong>named export</strong> (switchForm, for switching between login and signup). <strong>switchForm</strong> has its own identity — separate from the render function. Any child that needs it simply imports it directly. No more forwarding. No more drilling. It also means future steps (like the final review) can add a back-to-login link with zero changes to other modules — just import and use.
</p>

<br>

<h4>Before (Prop Drilling)</h4>

<pre><code>// auth.js — switchForm is trapped inside
const auth = () => {
  const switchForm = (type) => { formType = type; auth(); };
  createSignup(switchForm);
};

// signup.js — receives it, doesn't use it, must forward it
const createSignup = (switchForm) => {
  step1FullName(navigateStep, 1, 6, switchForm);
};

// step1FullName.js — finally receives what it needed all along
const step1FullName = (navigateStep, current, total, switchForm) => {
  // uses switchForm
};</code></pre>

<br>

<h4>After (Named Export)</h4>

<pre><code>// auth.js — switchForm is a first-class export
export const switchForm = (type) => {
  formType = type;
  auth();
};

const auth = () => {
  createLogin();
  createSignup(); // No argument needed
};

// login.js — imports directly
import { switchForm } from "./auth.js";

// step1FullName.js — imports directly, no parameter needed
import { switchForm } from "../auth.js";</code></pre>

<p>
<strong>switchForm</strong> is now a first-class citizen of the module. Anyone who needs it imports it. No one forwards it. No one passes it through re-renders.
</p>

<br>

<h4>Why This Works</h4>

<p>
<strong>• switchForm</strong> is defined at module scope in <strong>auth.js</strong>
<br>
<strong>•</strong> It updates <strong>formType</strong> and calls <strong>auth()</strong> — both accessible via closure
<br>
<strong>•</strong> It's exported as a named export — any module can import it directly
<br>
<strong>•</strong> Step 1 imports it directly — no middlemen, no chain to maintain
<br>
<strong>• createSignup</strong> never touches it — no drilling, no forgotten arguments on re-render
<br>
<strong>•</strong> Adding a login link to any future step requires only an import — no other code changes
</p>

<br>

<h4>Comparison of All Approaches</h4>

<pre><code>┌────────────────────┬──────────────┬────────────┬──────────────────────────────┐
│ Approach           │ Coupling     │ Complexity │ Best For                     │
├────────────────────┼──────────────┼────────────┼──────────────────────────────┤
│ Prop Drilling      │ Medium       │ Low        │ 1-2 layers, few re-renders   │
│ Named Export       │ Low-Medium   │ Low        │ Few consumers, small app     │
│ Custom Events      │ None         │ Medium     │ Fully decoupled modules      │
│ Shared Store(Redux)│ None         │ Higher     │ Many consumers, large app    │
└────────────────────┴──────────────┴────────────┴──────────────────────────────┘</code></pre>

<br>

<h4>The Choice</h4>

<p>
<strong>Named Export</strong> was chosen because:
<br>
<strong>•</strong> Only two modules need <strong>switchForm</strong> (login.js, step1FullName.js)
<br>
<strong>•</strong> It's explicit, easy to trace, and simple to understand
<br>
<strong>•</strong> No extra modules, events, or store setup required
<br>
<strong>•</strong> The coupling is visible and manageable at this scale
<br>
<strong>•</strong> It naturally supports future steps needing the same functionality
</p>

<p>
If more children needed <strong>switchForm</strong>, a Shared Store would be the next step. For now, Named Export is the right tool for the job.
</p>

<br>

<h4>The Lesson</h4>

<p>
<strong>Prop drilling is a signal — not a crisis.</strong> When only 1-2 layers deep with no re-render pressure, it's fine. When it forces arguments through modules that don't care on every re-render, it's time to refactor. Named exports are a lightweight step before reaching for full state management. Choose the tool that matches the problem size.
</p>

<br>

<h4>From Callback to Micro Shared State Object Pattern: An Accidental Discovery</h4>

<p>
<strong>A Micro-Store by Accident</strong>
<br>
By moving <strong>switchForm</strong> outside <strong>auth</strong> and exporting it as a named export, I unintentionally built a miniature version of the Shared State Object pattern. Like a full store, <strong>switchForm</strong> is a single function that updates state and triggers re-render. Any module can import it directly — no drilling, no forwarding.
</p>

<p>
The full store pattern lives in its own module with state, listeners, and multiple methods. This named export is the smallest possible version of that idea: <strong>one function, one state update, one re-render.</strong> A micro-store. Not planned — discovered through refactoring.
</p>

<p>
From now on, the callback method has a new variant: <strong>Named Export Callback</strong> — a lightweight alternative to a full store when only one or two components need the same state-changing function. Built by necessity. Recognized by pattern.
</p>

<br>

<h4>The React Parallel: Context API as a Named Export</h4>

<p>
What was built here with a named export is what React's Context API provides out of the box — a function defined once, accessible to any component that needs it, without prop drilling.
</p>

<pre><code>// Vanilla JS (This Project):
// auth.js
export const switchForm = (type) => { formType = type; auth(); };

// Any component
import { switchForm } from "../auth.js";

// React Context API:
// AuthContext.js
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Any component
const { switchForm } = useAuth();</code></pre>

<p>
Both achieve the same goal: a shared function available to any component without threading it through intermediate layers. The named export is the lightweight vanilla version. Context API is React's built-in solution. <strong>The principle is identical — define once, consume anywhere.</strong>
</p>

<p>
React Context doesn't use JavaScript export under the hood. It uses React's internal component tree and <strong>useContext</strong> to share values. But conceptually, it achieves the same result: define once, consume anywhere without drilling. The named export is the vanilla JS pattern that mimics what Context does. Context is more powerful (reacts to state changes automatically, handles Provider value updates). My named export is the simplest possible version of that idea. <strong>They are conceptually parallel, not the same implementation. The named export is the idea. Context API is the engineered version of that idea.</strong>
</p>

<br>

<h4>Context API — The Castle and the Envoy</h4>

<p>
Context API operates as a strategic stronghold with two key roles:
</p>

<p>
<strong>Provider (the castle)</strong> — the seat of power. It holds the state as the single source of truth. All components within its walls fall under its rule.
</p>

<p>
<strong>useContext (the envoy)</strong> — a direct line from the castle to any component that requires intelligence. The envoy rides straight to the target. No relay through every village. No permission from every gatekeeper. Prop drilling is a supply-line problem — Context solves it with direct access.
</p>

<p>
I built the same strategic architecture in vanilla JS. My <strong>auth.js</strong> was the castle — it commanded the state and the render function. My named export <strong>switchForm</strong> was the envoy — summoned directly where needed, delivering orders to update state and commanding the castle to re-render. React automates the re-render. I issued the command manually. Same strategy. Same castle. Same envoy.
</p>

<br>

<h4>The Broader Kingdom — Three Communication Strategies</h4>

<p>
<strong>• Props Drilling (the village relay):</strong> A message passed hand-to-hand through every village along the road, even those with no use for it. Simple for short distances. A burden for long campaigns.
</p>

<p>
<strong>• Context API / Named Export (the castle envoy):</strong> A direct rider from the castle to any outpost that needs orders. No unnecessary stops. No wasted messengers. Built for targeted, mid-range command.
</p>

<p>
<strong>• Redux / Shared State Object (the war room):</strong> A separate fortress, independent of any single castle. Any unit can send a report. Any unit can receive orders. The war room holds the master strategy. Built for vast kingdoms with many fronts.
</p>









<hr>

<h3>Problem 4: Dependency Injection — Handling Form Data Across Steps After Navigation</h3>
<p><em>(The Enter Key & Form Structure Problem)</em></p>

<p>
The multi-step form works with button clicks. Navigation — Next and Back — is successfully implemented. But a real form should also respond to the Enter key. The user types in an input, presses Enter, and expects to move to the next step. Without <strong>&lt;form&gt;</strong> elements wrapping the inputs, the browser ignores the Enter key — there's nothing to submit.
</p>

<p>
At the start, I wasn't thinking about data handling or form submission. The focus was on navigation — getting Next and Back buttons working. The parent <strong>createSignup</strong> had one <strong>&lt;form&gt;</strong> wrapping all steps. Each step returned a <strong>&lt;div&gt;</strong> with inputs and buttons. It looked like this:
</p>

<pre><code>// Parent — one form wrapping everything
const createSignup = (switchForm) => {
  const form = document.createElement("form");
  if (currentStep === 1) form.append(step1FullName(...));
  if (currentStep === 2) form.append(step2Email(...));
};

// Step — just a div, no form
const step1FullName = (navigateStep, currentStep, totalSteps) => {
  const div = document.createElement("div");
  div.innerHTML = \`<input ...><button>Next</button>\`;
  return div;
};</code></pre>

<p>
Enter key did nothing. The parent form existed in the DOM, but no submit handler was attached. I could have added two separate handlers — a submit listener for the Enter key on inputs and a click listener for the Next button — but that's duplication. Two handlers doing the same logical job: validate, save, and move forward. <strong>One action, one handler.</strong> That's the cleaner path.
</p>

<br>

<h4>The Obvious Solution (And Why I Paused)</h4>

<p>
The straightforward fix: remove the form from the parent. Give each step its own <strong>&lt;form&gt;</strong>. Each step handles its own submit event.
</p>

<pre><code>// Parent — no form
const createSignup = (switchForm) => {
  const container = document.createElement("div");
  if (currentStep === 1) container.append(step1FullName(...));
};

// Step — wraps itself in a form
const step1FullName = (navigateStep, currentStep, totalSteps) => {
  const form = document.createElement("form");
  form.innerHTML = \`<input ...><button>Next</button>\`;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    navigateStep(currentStep + 1);
  });
  return form;
};</code></pre>

<p>
Clean. Simple. Each step owns its form. Enter key works. Five minutes of refactoring.
</p>

<p>
But I paused. The existing architecture — one parent form — was already in place. It worked for navigation. Changing it meant touching every step. I asked: <strong>Can I solve this without restructuring everything?</strong>
</p>

<br>

<h4>The First Attempt: closest() (And Why It Failed)</h4>

<p>
<strong>Idea:</strong> Don't touch the existing architecture. The parent form already wraps all steps. Each child step is a <strong>&lt;div&gt;</strong> inside that form. Use <strong>closest("form")</strong> from inside the child's div to reach up and grab the parent form. Then attach the submit handler directly.
</p>

<pre><code>const step1FullName = (navigateStep, currentStep, totalSteps) => {
  const div = document.createElement("div");
  div.innerHTML = \`...\`;

  const form = div.closest("form"); // Find parent form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    navigateStep(currentStep + 1);
  });

  return div;
};</code></pre>

<p>
No restructuring. No new parameters. The child finds the form itself. Elegant in theory. <strong>Failed in practice.</strong>
</p>

<p>
<strong>Failure:</strong> <strong>div.closest("form")</strong> returns <strong>null</strong>. The div hasn't been appended to the DOM yet. It's a detached element. <strong>closest()</strong> only traverses upward through the DOM tree — and the div isn't in the tree. The form exists in memory, but the div can't see it yet.
</p>

<br>

<h4>The Engineer's Solution: Dependency Injection</h4>

<p>
The parent already creates the form before calling the step. So pass the form to the child — just like <strong>navigateStep</strong>. The child doesn't need to find it. It receives it.
</p>

<pre><code>Parent creates form → passes form to child → child adds listener → child returns div → parent appends div to form.</code></pre>

<pre><code>// Parent — passes form to step
const form = document.createElement("form");
if (currentStep === 1) {
  form.append(step1FullName(navigateStep, 1, 6, form)); // pass form
}

// Step — receives form, uses it
const step1FullName = (navigateStep, currentStep, totalSteps, form) => {
  const div = document.createElement("div");
  div.innerHTML = \`...\`;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    navigateStep(currentStep + 1);
  });

  return div;
};</code></pre>

<br>

<h4>Why It Works</h4>

<p>
<strong>•</strong> Parent creates form → passes it to child
<br>
<strong>•</strong> Child attaches submit listener → returns its div
<br>
<strong>•</strong> Parent appends div to form → assembly complete
<br>
<strong>•</strong> Enter key triggers submit → listener fires → navigation happens
</p>

<p>
No restructuring. No DOM searching. No new modules. One extra parameter. The architecture stays intact.
</p>

<br>

<h4>Circular Dependency vs. Dependency Injection — A Clear Distinction</h4>

<p>
This looks similar to the prop drilling problem solved earlier — parent passing something to child, child using it. But the nature of what's exchanged changes everything.
</p>

<p>
<strong>Circular Dependency:</strong> Parent depends on child. Child depends on parent. They're locked in a loop — each one needs the other to function. Parent passes itself (or a function that re-executes the parent) to the child. Child calls it. Parent runs again. Parent calls child again. Round and round. A closed circle with no exit. Module A imports B. Module B imports A. They can't load without each other. <strong>A design flaw.</strong>
</p>

<p>
<strong>Dependency Injection:</strong> Parent creates a simple resource — a DOM element, a plain value, a tool. Parent injects that resource into the child. The child receives it, uses it — attaches a listener, reads a value, modifies the element — and returns. The child never calls the parent. Never triggers a re-render. The parent and child remain independent of each other. No loop. No circle. Just a one-way handoff. A one-time assembly during rendering.
</p>

<p>
<strong>The distinction is not "whole parent vs. part of parent." It's:</strong>
<br>
<strong>•</strong> Does the child call back into the parent? → Callback (controlled) or Circular (uncontrolled loop)
<br>
<strong>•</strong> Does the child just use what it was handed? → Dependency Injection
<br>
<strong>•</strong> In this solution, the form element was a tool. The parent injected it. The child used it. No callback loop. No circular dependency. Just a clean, one-way handoff.
</p>

<br>

<h4>The Flow</h4>

<pre><code>1. Parent creates form
2. Parent gives form to child
3. Child attaches a submit listener to form
4. Child returns its div (inputs + buttons)
5. Parent appends the returned div to form</code></pre>

<p>
The form stays with the parent the whole time. The child borrows it to add a listener, then returns its own content. The parent assembles everything. No passing back. Just borrowing.
</p>

<br>

<h4>Note on Button Types</h4>

<p>
Next buttons changed to <strong>type="submit"</strong> — they now trigger the form's submit event, covering both click and Enter key with one handler. Back buttons explicitly set to <strong>type="button"</strong> — they trigger navigation only, never submission. The bug from the Single-View Form (yellow console warning) is avoided entirely. <strong>One handler. Two behaviors. Clear intent.</strong>
</p>

<br>

<h4>How the Parent Knows the Form Has a Listener (It Doesn't Need To)</h4>

<p>
The parent never checks if the listener is attached. It doesn't need to know. Here's what actually happens:
</p>

<pre><code>1. Parent creates a blank form element in memory
2. Parent hands that form to the child
3. Child attaches a submit event listener directly to the form element — the listener is bound to the form and stored in memory
4. Child returns its own div (inputs and buttons)
5. Parent appends the returned div into the form it already owns</code></pre>

<p>
The form element now carries both the listener (attached by the child, held in memory) and the content (appended by the parent). They live together on the same DOM element.
</p>

<p>
If the child returned the form back to the parent — meaning the parent had to wait for the child to give it something before continuing — that would create mutual dependency. The parent couldn't finish without the child. The child couldn't function without the parent. Loop.
</p>

<p>
But here, the child doesn't return the form. It returns its own content (the div). The form stays with the parent the entire time. The parent lends it. The child uses it briefly. The parent keeps owning it. No waiting. No depending. No circle.
</p>

<br>

<h4>To Remember</h4>

<p>
<strong>• Circular Dependency:</strong> Two things (parent & children) locked in a circle (loop) — each depends on (calls) the other. No independence.
</p>

<p>
<strong>• Dependency Injection:</strong> One thing (parent) gives a tool (variable, obj, ...) to another (children). The receiver (child/ren) uses it. No calling back. No loop. Just a one-way handoff.
</p>

<br>

<h4>Dependency Injection — The Simple Version (Single Module)</h4>

<p>
Strip away modules, imports, and exports. At its core, Dependency Injection is just <strong>one function lending a resource to another.</strong>
</p>

<pre><code>// Function A (Parent)
const functionA = () => {
  const element = document.createElement("form"); // Create resource
  
  functionB(element); // Lend it to Function B
  
  // Function B has finished. The element now carries its modifications.
  // Function A continues using the updated element.
  element.append(someContent);
};

// Function B (Child)
const functionB = (element) => {
  element.addEventListener("submit", handler); // Modify the borrowed resource
  // No return needed. The element was modified in memory.
};</code></pre>

<p>
<strong>What happens:</strong>
<br>
<strong>1.</strong> Function A creates an element — it lives in A's memory
<br>
<strong>2.</strong> Function A calls Function B, passing the element
<br>
<strong>3.</strong> Function B modifies the element (adds a listener) and finishes
<br>
<strong>4.</strong> Function A continues, now using the updated element
<br>
<strong>5.</strong> The element never left A's ownership. B just borrowed it.
</p>

<p>
No modules. No imports. No circularity. One function lends a resource. Another modifies it. The lender continues with the modified version. <strong>That's Dependency Injection — stripped to its essence.</strong> Everything else is just structure around this simple idea.
</p>

<br>

<h4>Controlled Circular Dependency vs. Uncontrolled Circular Dependency</h4>

<p>
<strong>Circular Dependency Has Two Faces</strong>
<br>
A circle between two components — parent and child communicating — is not automatically bad. It depends entirely on control. The same circular shape can be a dangerous trap or a clean pattern. The difference is the middleman (the callback) — the bridge that keeps both sides from touching directly while still allowing communication.
</p>

<br>

<p>
<strong>Uncontrolled Circular Dependency (The Bad Loop)</strong>
<br>
Parent depends on child. Child depends on parent. They call each other directly with no middleman (the callback), no boundary, no clear exit. Parent calls child. Child calls parent back. Parent calls child again. Round and round. The loop is unintended, unbounded, and dangerous.
</p>

<pre><code>// Parent
const parent = () => { child(); };

// Child
const child = () => { parent(); }; // Calls parent directly — loop</code></pre>

<p>
<strong>•</strong> No middle function
<br>
<strong>•</strong> No control over the cycle
<br>
<strong>•</strong> Components are inseparable
<br>
<strong>•</strong> A design flaw
</p>

<br>

<p>
<strong>Controlled Circular Dependency (The Callback Pattern)</strong>
<br>
Parent creates a middle function (the callback). Parent passes it to child. Child calls the middle function — not the parent. The middle function calls the parent on the child's behalf. One cycle. Intentional. Bounded. The loop exists but it's managed.
</p>

<pre><code>// Parent
const parent = () => {
  const middleFunction = () => { parent(); }; // Controlled re-entry
  child(middleFunction);
};

// Child
const child = (callback) => {
  callback(); // Calls middle function, not parent directly
};</code></pre>

<p>
<strong>•</strong> A middle function acts as the bridge
<br>
<strong>•</strong> The loop is intentional and bounded (one cycle)
<br>
<strong>•</strong> Components remain independent of each other
<br>
<strong>•</strong> Clean architecture — this is the callback pattern
</p>

<br>

<h4>The Difference</h4>

<pre><code>┌──────────────────────────────┬──────────────────────────────────────────────┐
│ Uncontrolled Circular        │ Controlled Circular (Callback)               │
├──────────────────────────────┼──────────────────────────────────────────────┤
│ Middleman: None              │ Middleman: Middle function                   │
│ Who child calls: Parent      │ Who child calls: Middle function (bridge)    │
│ Control: Unintended loop     │ Control: Intentional, one cycle             │
│ Design: Flaw                 │ Design: Pattern                             │
│ child() calls parent()       │ callback() calls parent() on child's behalf │
└──────────────────────────────┴──────────────────────────────────────────────┘</code></pre>

<br>

<h4>The Same Shape, Different Intent</h4>

<p>
Both are circles. One is a trap. The other is a pattern. <strong>The middle function (the callback) is what makes the difference</strong> — it's the bridge that keeps parent and child from touching directly while still allowing communication.
</p>

<p>
<strong>In My Projects:</strong>
<br>
<strong>• navigateStep</strong> = controlled circular dependency (callback pattern)
<br>
<strong>• switchForm</strong> = controlled circular dependency (callback pattern)
<br>
<strong>• Passing form to child</strong> = dependency injection (no circle at all)
</p>

<p>
Every pattern I've used falls into one of these categories. I now understand the architecture behind each choice.
</p>

<br>

<h4>Controlled Circular Dependency in React — Callbacks, Props, and Injection</h4>

<p>
React uses Controlled Circular Dependency by default — that's props drilling. Parent passes a callback as a prop. Child calls it. Parent re-renders. Controlled. Intentional. The standard React pattern.
</p>

<p>
React does not have built-in Dependency Injection like Angular does. But we can absolutely apply it ourselves in React:
<br>
<strong>•</strong> Passing a ref (useRef) to a child to let it manipulate a DOM element
<br>
<strong>•</strong> Passing a configuration object for the child to use
<br>
<strong>•</strong> Using Context API to provide a value without drilling (arguably a form of injection)
</p>

<p>
<strong>So:</strong>
<br>
<strong>•</strong> Props/Callbacks = Controlled Circular Dependency (React's default)
<br>
<strong>•</strong> Dependency Injection = Possible in React, but you bring the pattern yourself
</p>

<p>
I now understand both. When I see props drilling in React, I'll think: <em>"That's controlled circular dependency — the same pattern I built in vanilla JS."</em> No mystery left.
</p>

<br>

<h4>The Lesson</h4>

<p>
The obvious solution (form per step) was simpler and equally valid. I chose to preserve the existing architecture and solve the problem with dependency injection — not because it was necessary, but to practice engineering thinking.
</p>

<p>
Sometimes the best solution is the quick refactor. Sometimes it's the elegant injection. <strong>Knowing both and choosing deliberately is what separates coding from engineering.</strong>
</p>









<hr>

<h3>Problem 5: Separating Navigation State from Data State</h3>

<p>
I was mixing two things: <strong>step navigation logic</strong> and <strong>data persistence</strong>. I needed a clean way to track which step is visible — separately from the user's form data.
</p>

<br>

<h4>State Variables in Multi-Step Forms</h4>

<p>
Two separate things to track:
<br>
<strong>• currentStep</strong> — navigation position (which step is visible, 1-6)
<br>
<strong>• data object</strong> — user input values (fullName, email, etc.)
</p>

<p>
One controls visibility. One holds data. Both persist across re-renders.
</p>

<br>

<h4>Why Separate the Logic</h4>

<p>
It's not just about avoiding repetition — it's about <strong>separation of concerns</strong>:
</p>

<p>
<strong>• data Object →</strong> Holds the committed state — the saved, validated truth.
<br>
<strong>• DOM Fields →</strong> Hold the transient state — what the user is currently typing, which might be invalid or undone.
<br>
<strong>• currentStep →</strong> Holds the navigation state — where they are in the flow.
</p>

<p>
<strong>Risks of combining them:</strong> If I use <strong>currentStep</strong> and field values together in one render, I might accidentally clear fields when just changing steps, or persist invalid data as the "truth." Keeping them separate means:
</p>

<p>
<strong>• Navigation (Back/Next) never touches the data object directly</strong> — only "Save & Validate" does.
<br>
<strong>• The data object is always a clean, validated snapshot of progress.</strong>
</p>

<p>
This architecture is exactly how React state management — and stores like Redux — work under the hood: separate state slices for UI control vs. data persistence.
</p>

<br>

<h4>What This Project Solidified</h4>

<p>
The multi-step form is the single-view form scaled up. <strong>currentStep</strong> replaces <strong>formType</strong>. <strong>navigateStep</strong> replaces <strong>switchForm</strong>. One parent, many children, one callback passed to all. The same pattern learned in the first project handles 6 views as easily as 2.
</p>

<pre><code>// Parent: owns state, passes callback
const createSignup = () => {
  const navigateStep = (step) => { 
    currentStep = step; 
    createSignup(); 
  };
  if (currentStep === 1) form.append(step1FullName(navigateStep, 1, 6));
  if (currentStep === 2) form.append(step2Email(navigateStep, 2, 6));
};

// Child 1: receives callback, calls it
const step1FullName = (navigateStep) => {
  btnNext.addEventListener("click", () => navigateStep(2));
};

// Child 2: receives same callback, calls it
const step2Email = (navigateStep) => {
  btnBack.addEventListener("click", () => navigateStep(1));
  btnNext.addEventListener("click", () => navigateStep(3));
};</code></pre>

<br>

<h4>The React Connection</h4>

<p>
<strong>useState</strong> is exactly what was built here manually:
</p>

<pre><code>// Vanilla JS (this project):
let currentStep = 1;
const navigateStep = (step) => { currentStep = step; render(); };

// React:
const [currentStep, setCurrentStep] = useState(1);</code></pre>

<p>
<strong>currentStep</strong> is the state variable. <strong>setCurrentStep</strong> is the callback. <strong>useState(1)</strong> is the initial value. React bundles it into one line and handles the re-render automatically — but the logic underneath is identical. What was built across two projects by hand is what React gives you in one line. The mystery is gone. The foundation is solid.
</p>













<hr>

<h3>Problem 6: Saving Data Across Steps — The data Object</h3>

<p>
I defined a global object called <strong>data</strong> inside the parent module (<strong>signup.js</strong>), but outside the <strong>createSignup</strong> function. If it's inside <strong>createSignup</strong>, every re-render resets it to empty.
</p>

<br>

<h4>Outside (correct)</h4>

<pre><code>const data = { fullName: "", email: "", username: "", password: "", confirmPassword: "" };
const createSignup = (switchForm) => {
  // data survives re-renders
};</code></pre>

<br>

<h4>Inside (wrong)</h4>

<pre><code>const createSignup = (switchForm) => {
  const data = { fullName: "", email: "", username: "", password: "", confirmPassword: "" };
  // data resets to empty on every re-render
};</code></pre>

<p>
Same lesson as <strong>currentStep</strong> and <strong>formType</strong> — state variables must live outside the render function. Module scope. Persist across re-renders.
</p>

<br>

<h4>Passing data to Steps — Four Approaches</h4>

<p>
<strong>1. Approach 1: Pass as Argument</strong>
<br>
<strong>2. Approach 2: Named Export</strong>
<br>
<strong>3. Approach 3: Callback Wrapper</strong>
<br>
<strong>4. Approach 4: Mixed into navigateStep (Anti-Pattern)</strong>
</p>

<br>

<h4>Approach 1: Pass as Argument (Like form)</h4>

<pre><code>// Parent
form.append(step1FullName(navigateStep, 1, 5, form, data));

// Child
const step1FullName = (navigateStep, currentStep, totalSteps, form, data) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    data.fullName = document.getElementById("fullname").value;
    navigateStep(currentStep + 1);
  });
};</code></pre>

<p>
<strong>• Pros:</strong> Explicit, clear dependency visible in parameters
<br>
<strong>• Cons:</strong> Prop drilling — every step receives data even if it doesn't save, parameter list grows
</p>

<br>

<h4>Approach 2: Named Export (Separate data.js Module)</h4>

<pre><code>// data.js
export const data = { fullName: "", email: "", username: "", password: "", confirmPassword: "" };

// step1FullName.js
import { data } from "../data.js";

const step1FullName = (navigateStep, currentStep, totalSteps, form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    data.fullName = document.getElementById("fullname").value;
    navigateStep(currentStep + 1);
  });
};</code></pre>

<p>
<strong>• Pros:</strong> No drilling, import only where needed, same pattern as <strong>switchForm</strong> named export
<br>
<strong>• Cons:</strong> Implicit dependency (not visible in function signature), step still handles saving and navigating
</p>

<br>

<h4>Approach 3: Callback Wrapper (Middle Function — Like navigateStep)</h4>

<p>
<strong>Callback Wrapper (Save + Validate + Navigate)</strong>
</p>

<pre><code>// Parent
const saveAndNext = (stepNumber, fieldName) => {
  const input = document.getElementById(fieldName);
  data[fieldName] = input.value;
  navigateStep(stepNumber + 1);
};

form.append(step1FullName(saveAndNext, 1, 5, form));

// Child
const step1FullName = (saveAndNext, currentStep, totalSteps, form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    saveAndNext(currentStep, "fullName"); // Child doesn't touch data directly
  });
};</code></pre>

<p>
<strong>• Pros:</strong> Child never touches data directly — follows single responsibility, most encapsulated. Saving, validating, and navigating are centralized in the callback.
<br>
<strong>• Cons:</strong> More code, callback must know which field to save
</p>

<br>

<h4>Approach 4: Mix into navigateStep (Anti-Pattern — Not Recommended)</h4>

<pre><code>const navigateStep = (step, fieldName) => {
  if (fieldName) data[fieldName] = document.getElementById(fieldName).value;
  currentStep = step;
  createSignup(switchForm);
};</code></pre>

<p>
<strong>• Pros:</strong> One function, fewer parameters
<br>
<strong>• Cons:</strong> Violates Single Responsibility Principle — navigation now handles data saving. Messy. Hard to maintain.
</p>

<br>

<h4>Comparison</h4>

<pre><code>┌────────────────────────┬──────────┬─────────────┬─────────────┬──────────────────┐
│ Approach               │ Drilling │ SRP         │ Complexity  │ Validation-Ready │
├────────────────────────┼──────────┼─────────────┼─────────────┼──────────────────┤
│ Pass as Argument       │ Yes      │ Medium      │ Low         │ No               │
│ Named Export           │ No       │ Low-Medium  │ Low         │ No               │
│ Callback Wrapper       │ No       │ High        │ Medium      │ Yes              │
│ Mixed in navigateStep  │ No       │ Broken      │ Low         │ No               │
└────────────────────────┴──────────┴─────────────┴─────────────┴──────────────────┘</code></pre>

<br>

<h4>My Choice: Approach 3 — Callback Wrapper</h4>

<p>
When validation is added later, <strong>Approach 3</strong> shines. Validation logic lives inside the callback — one place to update, one place to test. Steps don't import validation functions. Steps don't know about data. Steps just call <strong>saveAndNext</strong> and trust the callback to handle the rest.
</p>

<p>
Centralized control. Clean separation. Ready for the future. That's why I chose the callback method.
</p>

<p>
<em>"The step just calls saveAndNext. The callback handles the rest. That's the power of centralization."</em>
</p>

<br>

<h4>Why signupData Keys Are Defined Upfront</h4>

<p>
The form has a fixed structure — 5 steps with known fields. Defining all keys upfront with empty strings ensures:
</p>

<p>
<strong>•</strong> Back button always works — <strong>signupData.fullName</strong> exists even if the user hasn't reached that step yet (returns "", not undefined)
<br>
<strong>•</strong> Review step is safe — iterating over all keys won't crash on missing properties
<br>
<strong>•</strong> Shape is predictable — every part of the app knows exactly what <strong>signupData</strong> looks like
<br>
<strong>•</strong> No runtime key creation — keys are declared, not discovered; easier to debug
</p>

<p>
The skeleton is fixed. The values fill in as the user progresses. Predictable. Safe. Clean.
</p>

<pre><code>const signupData = {
  fullName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
};</code></pre>










<hr>

<h3>Problem 7: Displaying Saved Data in the Review Step</h3>

<h4>The Problem</h4>

<p>
Steps 1–4 save data to <strong>signupData</strong>. Step 5 (Review) must display all collected data for the user to review before final submission. But <strong>signupData</strong> lives in <strong>signup.js</strong> — the parent module. How does Step 5 access it?
</p>

<br>

<h4>Three Approaches</h4>

<p>
<strong>Approach 1: Named Export (Import signupData Directly)</strong>
</p>

<pre><code>// signup.js
export const signupData = { fullName: "", email: "", username: "", password: "", confirmPassword: "" };

// step5Review.js
import { signupData } from "../signup.js";</code></pre>

<p>
<strong>• Pros:</strong> Same pattern as <strong>switchForm</strong> named export — consistent, import only where needed, scales to future modules (dashboard)
<br>
<strong>• Cons:</strong> Step 5 coupled to <strong>signup.js</strong> module
</p>

<br>

<p>
<strong>Approach 2: Pass as Argument (Replace saveStepData with signupData)</strong>
</p>

<pre><code>// Parent
if (currentStep === 5) form.append(step5Review(form, navigateStep, signupData, 5, 5));

// Step 5
const step5Review = (form, navigateStep, signupData, currentStep, totalSteps) => {
  // Read from signupData parameter
};</code></pre>

<p>
<strong>• Pros:</strong> Explicit dependency in function signature, no extra imports, Step 5 doesn't need <strong>saveStepData</strong> — swap it for <strong>signupData</strong>
<br>
<strong>• Cons:</strong> Prop drilling if other modules need the data later; parameter swapping is a short-term solution
</p>

<br>

<p>
<strong>Approach 3: Getter Callback</strong>
</p>

<pre><code>const getSignupData = () => signupData;
form.append(step5Review(form, navigateStep, getSignupData, 5, 5));</code></pre>

<p>
<strong>• Pros:</strong> Read-only — Step 5 can't modify <strong>signupData</strong>
<br>
<strong>• Cons:</strong> Overkill for a simple read operation
</p>

<br>

<h4>Comparison</h4>

<pre><code>┌────────────────────────────┬──────────────┬────────────┬──────────────────────┬───────────┐
│ Approach                   │ Coupling     │ Complexity │ Scales to Dashboard  │ Read-Only │
├────────────────────────────┼──────────────┼────────────┼──────────────────────┼───────────┤
│ Named Export               │ Low-Medium   │ Low        │ Yes                  │ No        │
│ Pass as Argument (swap)    │ Medium       │ Low        │ No                   │ No        │
│ Getter Callback            │ Low          │ Medium     │ Yes                  │ Yes       │
└────────────────────────────┴──────────────┴────────────┴──────────────────────┴───────────┘</code></pre>

<br>

<h4>My Choice: Approach 2 — Pass as Argument (For This Project)</h4>

<p>
This project has no dashboard. No other module needs <strong>signupData</strong>. Step 5 is the only consumer. Swapping <strong>saveStepData</strong> for <strong>signupData</strong> is simple, explicit, and appropriate for the current scale.
</p>

<br>

<h4>The Trade-Off</h4>

<p>
If a dashboard is added in Version 3 (Persistent Wizard), <strong>Approach 2</strong> becomes a liability — <strong>signupData</strong> would need to be drilled through every intermediate module. At that point, I'll refactor to <strong>Approach 1 (Named Export)</strong> or a full <strong>Shared State Object</strong>. The refactor is intentional, not accidental — matching the solution to the problem size.
</p>



<hr>


<p>
<em>See the full working code on <a href="https://github.com/falconstoop" target="_blank" rel="noopener noreferrer">GitHub →</a></em>
</p>



</article>
  `;
};

export default multiStepsForm;
