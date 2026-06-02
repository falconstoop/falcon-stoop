//
const root = document.getElementById("root");

//

const stateManagement = () => {
  root.innerHTML = `
<article class="content">

<h2>State Management</h2>



<h3>Before We start</h3>

<p>
<em>The content of this page emerged from building three projects — the Single-View Form, the Multi-Step Form, and Car Configurator. What started as trial and error became a repeatable mental model for state management in any component-based architecture.</em> You can visit the links below.
</p>
<br>

<div class="accent-links-container">
<a class="accent-link" href="#/projects/form">Single View Form</a>

<a class="accent-link" href="#/projects/multi-steps-form">Multi-steps Form</a>

<a class="accent-link" href="#/projects/car-configurator">Car Configurator (mini BMW Configurator)</a>

</div>
<br>


<pre><code>State Management Page
├── Before We Start (origin story + 3 project links)
├── Two Types of State (Data State + UI State)
├── Data State — Why Pass via Callback?
│   ├── The Problem with Passing Directly
│   ├── The Callback Solution
│   ├── When Passing Directly Doesn't Cause Issues
│   └── Cross-Child Communication
├── UI State — Two Cases
│   ├── Case 1: Child doesn't see state
│   ├── Case 2: Child needs to see state
│   ├── Why Case 2 Is More Common
│   └── Summary Table
├── 3 Dependency Patterns
│   ├── Dependency Injection
│   ├── Dependency Inversion
│   ├── Circular Dependency
│   ├── What Children Receive
│   └── ! Attention ! note
└── The Rule</code></pre>

<hr>

<h3>State Management — Two Types of State in Parent-Child Communication</h3>

<p>
Both vanilla JS and React have two types of state that flow between parent and child. They are both just variables holding values — one controls what the user sees <strong>(UI state)</strong>, the other controls what data the application collects <strong>Data State</strong>.
</p>

<br>


<h4>1. Data State</h4>
<p>
A variable that determines <strong>what data the parent collects</strong> from the user. It holds the committed values — what the user typed, selected, or submitted.
</p>
<p>
<strong>Examples:</strong> <strong>configData</strong> (car configuration), <strong>signupData</strong> (multi-steps form).
</p>


<h4>2. UI State</h4>
<p>
A variable that determines <strong>what the UI shows</strong>. Changing it triggers a re-render. The child may need to display it, act on it, or both.
</p>
<p>
<strong>Examples:</strong> <strong>currentStep</strong> (which step is visible), <strong>formType</strong> (login or signup).
</p>

<br>


<br>

<h4>How Both Flow</h4>
<p>
Both UI State and Data State live in the parent. Both can be passed down to children. Both change via callbacks that flow upward. The direction is always the same: <strong>state down, notifications up.</strong>
</p>

<hr>

<h3>Data State — Why Pass It via Callback?</h3>

<p>
Data state must be passed from child to parent via <strong>callback</strong>, not by passing the raw data object directly for the child to mutate.
</p>

<br>

<h4>The Problem with Passing Data Directly</h4>
<p>
If the parent passes the raw data object to the child and the child modifies it, the updated data must somehow get back to the parent. The parent may need to pass it to another child later. This creates a problem: the child now owns an update that the parent needs. To return it, the child would have to import the parent — creating a <strong>circular dependency</strong>.
</p>

<br>

<h4>The Callback Solution</h4>
<p>
Instead of passing the data object directly, the parent passes a <strong>callback</strong> like <strong>saveStepData(key, value)</strong>. The child calls it with the field name and value. The parent — which already owns the data object — handles the update internally.
</p>

<pre><code>// Parent: owns data, provides callback
let configData = {};

const saveStepData = (key, value) => {
  configData[key] = value;          // Parent updates its own state
};

step1Model(saveStepData, form);     // Pass callback, not data object

// Child: calls callback with data
const step1Model = (saveStepData, form) => {
  btnNext.addEventListener("click", () => {
    saveStepData("model", selectedModel);  // Child sends data upward
  });
};</code></pre>

<p>
Project Reference:  
<a class="accent-link" href="#/projects/car-configurator">Car Configurator</a>
</p>

<p>
The child never imports the parent. The child never touches the data object directly. The parent retains full control. <strong>No circular dependency.</strong>
</p>

<br>

<h4>When Passing Data Directly Doesn't Cause Issues</h4>
<p>
If children appear one after another in sequence (like steps in a multi-step form), passing the data object directly may work without immediate problems — because each step naturally hands off to the next. But if children are independent and each should modify different parts of the data, passing the raw object becomes hard to manage and risks one child overwriting another's data. The callback wrapper solves this regardless of the child structure.
</p>


<h4>Cross-Child Communication — When Sibling "A" Needs to Send Data to Sibling "B"</h4>

<p>
A child never communicates with another child directly. If Child "A" needs to send data to Child "B", the flow goes through the parent: 
<br>
<strong>Child A → callback → Parent → state update → re-render → Child B receives the data.</strong>
</p>
<br>
<p>
<strong>Example:</strong> In the Configurator, Step 2 (Engine) may need to know what model was selected in Step 1. Step 1 saves it via callback. The parent updates the data object. Step 2 reads it because the parent passes the updated state down.
</p>
<br>
<p>
<strong>In React:</strong> Child "A" uses <strong>setState or Callback</strong> to send data up. The parent re-renders. Child B receives the updated value as a prop. <strong>
<br>
The parent is always the middleman — the two children never know about each other.</strong>
</p>

<hr>

<h3>UI State — Two Cases for Passing to Children</h3>

<p>
UI State follows a different rule than Data State. Whether the child receives the state directly depends on <strong>how the child interacts with it</strong>.
</p>

<br>

<h4>Case 1: Child Does NOT Need to See the State</h4>
<p>
The child triggers a single action that changes the UI state. It doesn't display the state. It doesn't make decisions based on it. It just calls a callback on user interaction.
</p>
<p>
<strong>Solution:</strong> Embed the state inside the callback. Pass only the callback to the child.
</p>

<pre><code>// Parent: state is inside the callback
const switchForm = (type) => {
  formType = type;
  auth();                             // Re-render with new state
};

createLogin(switchForm);             // Pass callback only — not formType

// Child: calls callback on click
btnSignup.addEventListener("click", () => {
  switchForm("signup");              // Child never sees formType
});</code></pre>

<p>
Project Reference:  
<a class="accent-link" href="#/projects/form">Single View Form</a>
</p>

<p>
<strong>Example:</strong> A login form has a "Sign Up" link. The child doesn't need to know which form is currently shown — it just fires the switch.
</p>

<br>

<h4>Case 2: Child NEEDS to See the State</h4>
<p>
The child displays the state. Or it has multiple buttons that change the state differently. Or it makes decisions based on the current state value. In these cases, the child needs both the state and the callback.
</p>
<p>
<strong>Solution:</strong> Pass both the state variable and the callback to the child.
</p>

<pre><code>// Parent: passes both state and callback
step2Engine(navigateStep, currentStep, totalSteps, form);

// Child: uses state for display, callback for action
const step2Engine = (navigateStep, currentStep, totalSteps, form) => {
  // Display state
  progressText.textContent = \`Step \${currentStep} of \${totalSteps}\`;
  
  // Use state for logic
  if (currentStep === 2) {
    btnBack.disabled = false;
  }
  
  // Call callback to change state
  btnNext.addEventListener("click", () => navigateStep(currentStep + 1));
  btnBack.addEventListener("click", () => navigateStep(currentStep - 1));
};</code></pre>

<p>

<p>
Project Reference:  
<a class="accent-link" href="#/projects/car-configurator">Car Configurator</a>
</p>

<p>
<strong>Examples:</strong> Progress bar ("Step 2 of 7"), disabling Back button on step 1, multiple buttons that navigate to different steps.
</p>

<br>

<h4>Why Case 2 Is More Common</h4>
<p>
Most real-world components both display state and interact with it. A step shows its number. A form shows which view is active. A toggle shows its on/off state. <strong>Case 2 — passing both state and callback — is the standard pattern in component-based development.</strong>
</p>

<br>

<h4>Summary — Data State vs. UI State</h4>

<pre><code>┌──────────────────────┬────────────────────────────────┬─────────────────────────────────────┐
│                      │ Data State                     │ UI State                            │
├──────────────────────┼────────────────────────────────┼─────────────────────────────────────┤
│ What it holds        │ User input values              │ What the UI displays                │
│ Passed to child?     │ ❌ No — via callback wrapper   │ ✅ Yes (if child needs to display)  │
│ Child modifies?      │ ❌ Never directly              │ ❌ Never directly — via callback    │
│ Return flow          │ Callback → parent updates      │ Callback → parent updates           │
│ Risk if passed direct│ Circular dependency            │ Child mutating state it doesn't own │
└──────────────────────┴────────────────────────────────┴─────────────────────────────────────┘</code></pre>

<hr>






<h3>3 Dependency Patterns, In One Place</h3>

<h4>What Is a Dependency?</h4>
<p>
When module "A" imports module "B", "A" depends on "B". "A" cannot work without "B". <strong>The import statement creates this relationship.</strong>
</p>
<br>
<p><strong>What Is NOT a Dependency?</strong></p>
<p>
When a value is passed from one module to another through a function parameter, no dependency is created. The receiving module just gets data — it doesn't know or care which module sent it. <strong>Only import statements create dependencies between modules.</strong>
</p>

<br>

<h4>1. Dependency Injection</h4>

<p>
Instead of each child importing or creating  something it needs, the parent creates it once and passes it to all children as a parameter. All children use it and don't return it — the parent retains ownership.
</p>

<p>
This avoids duplication — multiple children needing the same element don't each create their own. The parent creates it once, injects it, and all children work with the same instance.
</p>

<p>
Dependency Injection is about injecting an object or element that the child needs to work with. The child modifies it in place, but the parent still owns it.
</p>
<br>
<p>
In <a class="accent-link" href="#/projects/car-configurator">Car Configurator</a>  project: The parent creates the <strong>form</strong> element once and passes it to all 6 steps as an argument. If each step created its own form, there would be 6 separate forms duplication. Children write their HTML into it via <strong>innerHTML</strong>. They don't return it — the parent already has it.
</p>
<br>

<pre><code>// Parent: creates form once, injects into all children
const form = document.createElement("form");

step1Model(navigateStep, form);   // Injected
step2Engine(navigateStep, form);  // Same form, injected again
step3Color(navigateStep, form);   // Same form, injected again

// Child: receives form, uses it, doesn't return it
const step1Model = (navigateStep, form) => {
  form.innerHTML = \`...\`;         // Child writes into the borrowed form
};</code></pre>


<br>
<p>
<em>(Note: the <strong>navigateStep</strong> callback is NOT dependency injection — that's the callback pattern, used for child-to-parent communication. Dependency Injection is specifically about passing an object or element for the child to use and modify.) </em>
</p>
<br>
<p>
<em>(Note: parent importing children is Dependency Inversion, not Dependency Injection.)</em>
</p>
<br>

<p class="attention">
! Attention !  In Some project pages I categorized the callback method under "controlled circular dependency" — parent and child communicating without import loops. I now separate the two: callbacks are just child-to-parent communication with clean one-way imports. Circular dependency specifically means import loops between modules. However some developers see callback method as Dependency Injection.... 
</p>

<br>

<h4>2. Dependency Inversion</h4>
<p>
Parent imports children. Children never import parent. Children only receive parameters <strong>(Dependency Injection)</strong> — they don't know the parent exists. But only Parent knows children exist cause they <strong>Import</strong> it(them).
</p>
<br>
<p>
In <a class="accent-link" href="#/projects/car-configurator">Car Configurator</a> project: Parent the <strong>Configurator</strong> module imported children (the 7 steps). Children receive <strong>navigateStep (Callback Pattern)</strong> and <strong>form (Dependency Injection)</strong> as arguments but never import <strong>configurator.js</strong>. They don't know who called them.
</p>
<br>

<pre><code>// configurator.js (Parent) — imports children
import  step1Model  from "./step1Model.js";
import  step2Engine  from "./step2Engine.js";

// step1Model.js (Child) — does NOT import configurator.js
// Receives navigateStep and form as parameters instead</code>
// step1Model(navigateStep, form);</pre>

<br>
<p>
<em>(Note: Dependency Inversion is about the import direction — parent knows children, children don't know parent.)</em>
</p>

<br>

<h4>3. Circular Dependency (Avoided)</h4>
<p>
Two modules importing each other. Parent imports children & children import Parent. this Creates a loop that breaks the application.
</p>

<p>
<strong>In this project:</strong> Parent imports children. Children never import parent. No loops.
</p>
<br>
<p>
<em>(Note: even a one-way upward import — child importing parent — would violate Dependency Inversion.)</em>
</p>

<br>

<h4>What Children Receive: Dependencies vs. Communication Channels</h4>

<p><strong>1. Form injected, not returned (Dependency Injection):</strong></p>
<p>
Parent creates the form, passes it to child. Child writes HTML into it. Parent already has the reference — no return needed. The form is a dependency the child needs to do its job. That's <strong>Dependency Injection</strong>.
</p>

<br>

<p><strong>2. Form injected, then returned via callback (DI + Callback Pattern):</strong></p>
<p>
Parent creates the form, passes it to child. Child writes HTML into it. Child then sends it back to parent by calling a callback like <strong>onComplete(form)</strong>. Two things happen: the injection (<strong>DI</strong>) and the return communication (<strong>callback pattern</strong>). They are separate processes.
</p>

<br>

<p><strong>3. Callback alone, no injection (Callback Pattern):</strong></p>
<p>
Child receives a function like <strong>navigateStep</strong>. <em>Child <strong>doesn't use it</strong> to build its UI</em> — it just stores it in a button handler. When the user clicks, child calls it to notify the parent. <strong><em>The child doesn't depend on it to function</em></strong>. This is purely the <strong>callback pattern</strong>, not DI.
</p>


<br>

<p><strong>Summary:</strong></p>
<p>
<strong>DI</strong> is about what the child needs and actively uses. The <strong>callback pattern</strong> is about child notifying the parent. They can happen together (form injected, then returned via callback) or separately.
</p>

<br>

<h4>The Rule</h4>

<p>
<strong>State + Navigation logic + Data management → Parent</strong>
<br>
<strong>UI elements (inputs, buttons) → Child</strong>
<br>
<strong>Wiring (event listeners) → Child, using callbacks received from Parent</strong>
</p>



</article>
  `;
};

export default stateManagement;
