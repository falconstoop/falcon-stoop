//
const root = document.getElementById("root");
//
const carConfigurator = () => {
  root.innerHTML = `
<article class="content">

<h2>Car Configurator</h2>


<div class="blockquote-wrapper">
<blockquote>
    <p>"Knowing is not enough, we must apply. Willing is not enough, we must do." </p>
    <footer>— Bruce Lee 🥋 —</footer>
    <p class="quote-twist">
     I knew the patterns from V1 and V2. Car Configurator proved I could apply them, to a different domain, a different navigation model, a different set of problems.
    </p>
</blockquote>
</div>

<br>

<pre><code>Car Configurator Page
├── Bridge Project: Solidifying the Patterns
├── Two Navigation Models in One Project
│   ├── Internal Switching (Single Route) — V1/V2
│   ├── Route-Based Navigation (Multiple Routes) — Car Configurator
│   └── Let the Router Do Its Job
├── Managing State and Navigation
│   ├── Navigation — Inside One Route vs. Between Routes
│   ├── Data — Within a Single Route vs. Across Routes
│   └── Why Named Exports Don't Work Across Routes
├── Two Ways to Change a View — The React Connection
├── Internal State Changes vs. Route Navigation — Building Both in Vanilla JS
├── Clean Engineering Approach: State Updates via Callbacks
├── Separating Data Updates from UI Updates
├── Where Should Conditional Logic Live?
│   ├── Case 1: Logic Inside Step
│   ├── Case 2: Logic Inside Parent
│   └── The Trade-Off
├── V1 — Logic in Children (Dirty-First Approach)
│   └── The Pain Points Discovered
├── V2 — Parent-in-Control: A Clean Architecture
│   ├── Introducing configuratorData.js
│   ├── Two Approaches to Data Flow
│   ├── The Refactor: Centralizing Logic
│   └── Key Architectural Principles
├── V3 — IndexedDB Storage
├── V4 — Dashboard
│   ├── Problem 1: async/await — Why the Function Must Wait
│   ├── Problem 2: DOM Element vs. String in Template Literals
│   └── Problem 3: Rerender vs. Direct DOM Manipulation
├── Conditional Rendering: One Pattern, Many Triggers
│   ├── Case 1: Switch Form — Manual Trigger
│   ├── Case 2: Empty State — Automatic Trigger
│   ├── One Condition, Two Moments
│   └── Summary: Manual vs. Automatic
└── The Data-to-UI Pipeline: A Universal Pattern
    ├── Step 1: Fetch Data + Error Handling
    ├── Step 2: Conditional Rendering (Empty State)
    ├── Step 3: DOM Manipulation
    ├── Step 4: Event Binding + Dynamic Conditional Rendering
    └── This Pattern Is Universal
</code></pre>


<h3>Bridge Project: Car Konfigurator — Solidifying the Patterns</h3>

<p>
Before moving to V3, I decided to build a middle project to test whether I truly understood the architecture.
</p>

<p>
<strong>Car Konfigurator</strong> is a BMW-inspired car configuration tool. Same multi-step form architecture as V2. But Three key additions:
</p>
<br>
<p>
<strong>1. Conditional steps</strong> — each step's options depend on the previous choice. The model affects the engine options. The engine affects the available packages. Data flow becomes <strong>dynamic</strong>, not linear.
</p>
<br>
<p>
<strong>2. Route-based navigation</strong> — unlike V1/V2, where clicking a button called a function directly to switch views inside a single route. CarKonfigurator uses hash-based routing across 3 routes: Home, Configurator, and Dashboard. The Configurator itself contains 7 steps (Model, Engine, Color, Interior, Packages, Review, Success) — the user navigates between them without changing the route. The hash stays at <strong>#/configurator</strong>.
</p>
<br>
<p>
<strong>3. Dashboard with CRUD</strong> — a dashboard displays all configured cars, with full Create, Read, Update, and Delete functionality (CRUD). Users can view their saved configurations and modify or delete them as needed.
</p>

<br>

<hr>

<h3>Two Navigation Models in One Project</h3>

<h4>V1/V2 — Internal Switching (Single Route):</h4>
<p>
In the auth forms, everything happened inside one route (<strong>#/home</strong>). Switching between login and signup, or navigating between signup steps, was done by calling a function directly. No URL change. The parent re-rendered with the new state.
</p>

<pre><code>// V1/V2: Internal switching — direct function call
div.querySelector(".signup-link").addEventListener("click", () => {
  switchForm("signup");        // Calls function → parent re-renders
});

div.querySelector(".btn-next").addEventListener("click", () => {
  navigateStep(currentStep + 1); // Calls function → parent re-renders
});</code></pre>

<br><br>


<h4>CarKonfigurator — Route-Based Navigation (Multiple Routes):</h4>

<p>
The app has 3 distinct routes: <strong>Home</strong>, <strong>Configurator</strong>, and <strong>Dashboard</strong>. Moving between them requires changing the URL. Buttons don't call page functions. They change the hash. The router listens and renders the matching page.
</p>

<pre><code>// CarKonfigurator: Route-based navigation — change the hash
div.querySelector(".btn-configurator").addEventListener("click", () => {
  location.hash = "#/configurator";   // Change URL → router renders page
});

div.querySelector(".btn-home").addEventListener("click", () => {
  location.hash = "#/home";           // Change URL → router renders page
});</code></pre>

<p>
The router listens for <strong>hashchange</strong> and renders the matching page. Components never call page functions directly. <strong>In V1/V2, buttons call functions. In CarKonfigurator, buttons change the URL.</strong>
</p>

<h4>Let the Router Do Its Job</h4>

<p>
When navigating between routes, buttons should only update the hash — never call a module's render function directly.
</p>
<br>
<p>
<strong>Why:</strong> Updating location.hash triggers the hashchange event, which the central router listens to. The router then determines which module to render. Calling a render function directly breaks this flow — the URL doesn't update, browser back/forward navigation fails, and the single point of entry is lost. The router is the gatekeeper; all navigation must go through it.
</p>

<br><br>

<h4>So in CarKonfigurator, navigation works in two layers:</h4>
<p>
<strong>• Between steps (inside Configurator) →</strong> calling the step function directly, just like V1/V2. The URL stays the same. The parent re-renders with the new step.
<br>
<strong>• Between routes (Home, Configurator, Dashboard) →</strong> changing the hash. The router listens and renders the matching page.
</p>

<p>
For route navigation, I created <strong>named exports</strong> — one for each route — so any module that needs to redirect can import them directly, without prop drilling:
</p>

<pre><code>// Shared Route Helpers — import anywhere
export const goToHome = () => {
  location.hash = "#/home";
};

export const goToConfigurator = () => {
  location.hash = "#/configurator";
};

export const goToDashboard = () => {
  location.hash = "#/dashboard";
};</code></pre>


<br><br>

<hr>

<h3>Managing State and Navigation</h3>

<h4>
— (Single-Route vs. Multi-Route) 
<br>
— (Manual Javacript vs. React)
</h4>

<p>
This project forced a clear separation between two concerns that often get blurred:
</p>

<br>



<h4>Navigation — Inside One Route (Configurator Steps):</h4>


<p>
<strong>Manual:</strong> A <strong>currentStep</strong> variable in the parent module, plus a <strong>navigateStep(step)</strong> callback passed to each child. When called, it updates <strong>currentStep</strong> and re-renders.
</p>
<pre><code>// State variables
let currentStep = 1;

const createConfigurator = () => {

  // Navigation callback
  const navigateStep = (step) => {
    currentStep = step;
    createConfigurator();
  };</code></pre>

<br>
<p>
<strong>React:</strong> <strong>useState</strong> — <strong>const [step, setStep] = useState(1)</strong>, passed as props.
<br>
<strong>step</strong> is the state variable (like <strong>currentStep</strong>).
<strong>setStep</strong> is the setter function (like <strong>navigateStep</strong>).
</p>
<br>
<br>

<h4>Navigation — Between Routes (Home → Configurator → Dashboard):</h4>

<p>
<strong>Manual:</strong> location.hash = <strong>"#/configurator"</strong> with a <strong>hashchange</strong> event listener. Named exports like <strong>goToConfigurator()</strong> for reuse. Already mentioned above.
</p>

<pre><code>export const goToConfigurator = () => {
  location.hash = "#/configurator";
};</code></pre>


<p>
<strong>React:</strong> <strong>React Router</strong> — <strong>&lt;Link&gt;</strong> or <strong>useNavigate()</strong>.
</p>

<br>



<h4>Data — Within a Single Route (Form Data Across Steps)</h4>

<p>
<strong>Manual:</strong> A <strong>configData</strong> object in the parent, plus a <strong>saveStepData(key, value)</strong> callback passed to each step. Data persists across step re-renders because the parent module stays alive.
</p>

<p>
<strong>React:</strong> <strong>useState</strong> — <strong>const [data, setData] = useState({})</strong>, passed as props.
</p>

<br>

<h4>Data — Across Routes (Configurator Data in Dashboard)</h4>

<p>
<strong>Manual:</strong> Global variable above the router, <strong>localStorage</strong>, or URL parameters.
</p>

<p>
<strong>React:</strong> <strong>Context API, Redux, Zustand</strong>, or URL parameters.
</p>
<br><h4>Issue to Mention!!!</h4>
<p><strong>Why Named Exports Don't Work Across Routes:</strong></p>
<br>
<p>
A named export like <strong>export let configData = {}</strong> gives the importing module a reference to the value at import time. When <strong>configData</strong> is mutated later (as the user fills out the configurator), the dashboard module doesn't see those changes — <strong>imports are static, not live-reactive.</strong>
</p>

<pre><code>// configurator.js
export let configData = {};

// dashboard.js
import { configData } from "./configurator.js";
// Gets a snapshot at import time — won't see later mutations</code></pre>

<p>
Shared <strong>"DATA"</strong> across routes requires something that both routes can read from at the moment they need it: <strong>a global variable above the router, localStorage, URL parameters</strong>, or (in React) <strong>Context / state management libraries</strong>. The data must live outside module scope to be truly shared.
</p>

<br>

<h4>Two Ways to Change a View — The React Connection</h4>

<p>
This is the same distinction React enforces:
</p>

<p>
<strong>• Internal state change → useState</strong>
<br>
Switching between login and signup(v1/v2), navigating between steps in a multi-step form(v2/CarKonfigurator), toggling a modal — the URL doesn't change. The view changes because <strong>state</strong> changed. React's <strong>useState</strong> handles this. Just like <strong>switchForm</strong> and <strong>navigateStep</strong> in V1/V2 and steps part of <strong>CarKonfigurator</strong>.
</p>

<p>
<strong>• Page navigation → React Router</strong>
<br>
Moving from Home to Configurator, from Configurator to home — the <strong>URL changes</strong>. The router listens, matches the path, and renders the correct page. React Router handles this. Just like <strong>location.hash</strong> and <strong>hashchange</strong> in <strong>CarKonfigurator</strong>.
</p>

<br>

<h4>Internal State Changes vs. Route Navigation — Building Both in Vanilla JS</h4>
<p><em>(How I built useState and React Router from scratch — in vanilla JavaScript)</em></p>
<br>
<p>
<strong>useState</strong> returns an array with two elements: the state variable and a setter function. In my <strong>CarKonfigurator</strong> project, I built this manually — <strong>currentStep</strong> is the state variable, <strong>navigateStep</strong> is the setter. When called, it updates the state and re-renders the parent. React does this automatically. I had to call the render function myself.
</p>

<p>
<strong>useState</strong> is for re-rendering within the same route — internal UI changes like switching steps. For navigating between different pages, React uses <strong>React Router</strong> — which is exactly like my hash-based router. Change the URL. The router renders the matching component.
</p>

<pre><code>// Vanilla JS — Internal state change (like useState):
let currentStep = 1;
const navigateStep = (step) => {
  currentStep = step;
  render();                          // Manual re-render
};

// React equivalent:
const [currentStep, setCurrentStep] = useState(1);  // Automatic re-render


// Vanilla JS — Route navigation (like React Router):
location.hash = "#/configurator";    // Change URL → router renders page

// React equivalent:
<Link to="/configurator">            // Change URL → React Router renders component
</code></pre>

<br>


<h4>The Rule — Internal vs. Route-Based</h4>

<p>
<strong>If the URL should change → change the hash (or use React Router).</strong>
<br>
<strong>If the URL should stay the same → update state and re-render the function (or use useState).</strong>
</p>

<p>
Both patterns exist in every SPA. Knowing which one fits the moment is what separates guessing from engineering.
</p>

<br>

<h4>Clean Engineering Approach: State Updates via Callbacks in React</h4>

<p><strong>The pattern:</strong></p>
<p>
<strong>State stays in the parent</strong> — the parent owns and manages all state.
</p>
<p>
<strong>Child receives only the callback</strong> — the child gets a function, not the state itself.
</p>
<p>
<strong>The callback closes over the state</strong> — the callback has access to the state internally, but the child never sees it or touches it.
</p>

<br>


<h4>Summary</h4>

<pre><code>┌──────────────────────┬───────────────────────────────────────────────┬──────────────────────────────────────────┐
│                      │ Inside One Route                              │ Between Routes                           │
├──────────────────────┼───────────────────────────────────────────────┼──────────────────────────────────────────┤
│ Navigation           │ Variable + callback (manual) / useState (React)│ hashchange (manual) / React Router (React)│
│ Data                 │ Variable + callback (manual) / useState (React)│ Global state, localStorage, Context, Redux│
└──────────────────────┴───────────────────────────────────────────────┴──────────────────────────────────────────┘</code></pre>

<br>


<h4>Why a Bridge Project?</h4>

<p>
I built CarKonfigurator for one reason: to prove the patterns were <strong>internalized</strong>, not just memorized for a signup form. Same architecture. Different domain. Different navigation model. Still held.
</p>

<p>
The patterns learned in V1 and V2 are not form patterns. They are <strong>SPA architecture patterns</strong>. CarKonfigurator proved it — with conditional data flow, route-based navigation, and a CRUD dashboard layered on top.
</p>


<hr>


<h3>Separating Data Updates from UI Updates</h3>

<h4>Navigation State</h4>

<pre><code>let currentStep = 1;
const navigateStep = (step) => {
  currentStep = step;
  createConfigurator(); // re-renders the UI
};</code></pre>

<br>

<h4>Data State</h4>

<pre><code>const configData = { 
model: "", 
engine: "", 
color: "", 
interior: "", 
packages: "" 
};

const saveStepData = (configKey, configValue) => {
  configData[configKey] = configValue; 
  // no re-render
};</code></pre>

<br>

<h4>Why saveStepData Doesn't Re-render</h4>

<p>
<strong>• Single Responsibility</strong> — <strong>saveStepData</strong> has one job: update the data object. It doesn't care about the UI. <strong>Navigation</strong> is responsible for re-rendering.
</p>

<p>
<strong>• Back button doesn't save</strong> — When the user clicks Back, <strong>navigateStep</strong> re-renders without calling <strong>saveStepData</strong>. If saving triggered a re-render, you'd get double re-renders on Next, or unwanted re-renders on save-only actions.
</p>

<p>
<strong>• Flexibility</strong> — If later you add auto-save (save on input change without navigating), you just call <strong>saveStepData</strong> alone. No unnecessary re-render. If you add validation (save but don't proceed), same thing. Clean separation makes both possible.
</p>

<p>
<strong>• Predictable flow</strong> — On Next click: submit handler calls <strong>saveStepData</strong> (update data), then calls <strong>navigateStep</strong> (re-render). One re-render, clear sequence. Easy to debug.
</p>




<hr>


<h3>Where Should Conditional Logic Live?</h3>

<p>
<strong>Problem:</strong> Step 2 (Engine) shows different options based on Step 1 (Model). Where should the logic that decides "which engines belong to which model" live — in the parent or in Step 2?
</p>

<br>

<h4>Case 1: Logic Inside Step 2</h4>

<pre><code>// step2Engine.js

if (selectedModel === "3-series") 
engines = ["2.0L Turbo", "3.0L Hybrid"];

else if (selectedModel === "x5") 
engines = ["3.0L Diesel", "4.4L V8"];

else if (selectedModel === "m4") 
engines = ["3.0L Twin Turbo", "4.0L Competition"];</code></pre>

<p>
Step 2 receives the selected model and uses <strong>if/else</strong> to determine the engine list.
</p>

<p>
<strong>• Scope expands:</strong> Step 2 now knows about models, not just engines.
<br>
<strong>• Duplication:</strong> If Step 3 (Color) also depends on the model, the same <strong>if/else</strong> chain is repeated there.
<br>
<strong>• Hard to maintain:</strong> Adding a new model requires updating every step that depends on it.
<br>
<strong>• Tight coupling:</strong> Step 2 is locked to this specific BMW model list and cannot be reused.
</p>

<br>

<h4>Case 2: Logic Inside the Parent</h4>

<pre><code>// configurator.js (parent)
const engines = engineData[configData.model];
step2Engine(form, navigateStep, saveStepData, currentStep, engines);</code></pre>

<pre><code>// step2Engine.js
// Just receives a list of engines — no model knowledge</code></pre>

<p>
Parent looks up the engines based on <strong>configData.model</strong> and passes only the engine list to Step 2.
</p>

<p>
<strong>• Step 2 stays focused:</strong> it only knows about engines — no model awareness.
<br>
<strong>• No duplication:</strong> the lookup logic lives in one place.
<br>
<strong>• Easy to maintain:</strong> adding a new model only requires updating the central data table.
<br>
<strong>• Reusable:</strong> Step 2 can be used in any configurator — just give it a list of engines.
</p>

<br>

<h4>The Trade-Off</h4>

<p>
<strong>Case 2 is cleaner architecturally</strong>, but the parent module can become crowded if all step dependencies are handled there. The solution: <strong>extract the lookup logic into a separate data module</strong>, keeping the parent thin and focused only on orchestration.
</p>



<hr>



<h3>V1- Logic in Children: Learning Through the Dirty-First Approach</h3>

<p>
Before refactoring to a cleaner architecture, I intentionally implemented the logic the <strong>"dirty" way first</strong>. The goal was to understand the problem firsthand — no better way to learn than feeling the pain yourself.
</p>

<p>
In this approach, the parent passes raw data (<strong>configData.model</strong>) directly to Step 2, and Step 2 handles the conditional logic internally:
</p>

<pre><code>// Parent — passes raw data to the next step
else if (currentStep === 2)
  step2Engine(form, navigateStep, saveStepData, currentStep, configData.model);</code></pre>

<pre><code>const step2Engine = (
  form,
  navigateStep,
  saveStepData,
  currentStep,
  selectedModel,
) => {
  
  let engines = [];

  if (selectedModel === "3-series") {
    engines = ["2.0L Turbo", "3.0L Hybrid"];
  } else if (selectedModel === "x5") {
    engines = ["3.0L Diesel", "4.4L V8"];
  } else if (selectedModel === "m4") {
    engines = ["3.0L Twin Turbo", "4.0L Competition"];
  }

  const engineOptions = engines
    .map((item) => {
      const engineValue = item.replaceAll(" ", "-");

      return \`&lt;option value="\${engineValue}"&gt;\${item}&lt;/option&gt;\`;
    })
    .join("");

  form.innerHTML = \`
        &lt;select id="engine-select"&gt;
          \${engineOptions}
        &lt;/select&gt;
    \`;
};</code></pre>

<br>

<h4>The Pain Points Discovered</h4>

<p>
<strong>• Step 2 now knows about models</strong> — its scope expanded beyond just engines.
<br>
<strong>• Duplication:</strong> If Step 3 also depends on the model, the same <strong>if/else</strong> logic gets duplicated.
<br>
<strong>• Hard to maintain:</strong> Adding a new model means updating every step that has these conditions.
<br>
<strong>• Scattered logic:</strong> The logic is spread across multiple step modules instead of being centralized.
</p>

<br>

<h4>The Lesson</h4>

<p>
This experience made it clear why <strong>conditional logic belongs in the parent</strong> (or a separate data module). Steps should receive <strong>clean, ready-to-use data</strong> — not raw values that require internal lookups.
</p>

<hr>



<h3>V2- Parent in Control: A Clean Architecture</h3>


<h4>The Problem in V1</h4>
<p>
In V1, each step contained its own conditional logic. Step 2 knew about models, Step 3 knew about models and colors, Step 4 knew about models and interiors. This scattered business logic across multiple modules, making the codebase harder to maintain and the steps tightly coupled to the application's data structure.
</p>

<br>

<h4>The Solution: Introducing configuratorData.js</h4>
<p>
To centralize all business logic, V2 introduces a dedicated data module: <strong>configuratorData.js</strong>. The role of this module is to act as the <strong>single source of all conditional logic and lookup data</strong> for the configurator. Instead of each step determining what options to show based on previous selections, <strong>configuratorData</strong> provides pure transformation functions that the parent calls. This module is <strong>stateless</strong> — it receives an input, applies conditions, and returns formatted output. It has no awareness of the DOM, the user, or the application state. Its sole responsibility is answering the question: <em>"Given this selection, what options should be available next?"</em>
</p>

<br>

<h4>Two Approaches to Data Flow</h4>
<p>
When centralizing logic, there are two ways to deliver formatted data to steps:
</p>

<br>

<h5>Approach 1 — Parent-in-Control (Chosen for V2):</h5>
<br>
<p>
The parent imports all transformation functions from <strong>configuratorData</strong>, calls them with the current state, and passes the fully formatted result to each step. Steps receive ready-to-render data and have no knowledge of <strong>configuratorData</strong>. All intelligence lives in the parent.
</p>

<br>

<h5>Approach 2 — Hybrid (Rejected):</h5>
<br>
<p>
The parent passes raw state values (like <strong>configData.model</strong>) directly to each step. Each step then imports the relevant transformation function from <strong>configuratorData</strong> and formats the data internally. This still centralizes the lookup tables but scatters imports and logic across multiple step modules.
</p>

<br>

<p>
V2 follows <strong>Approach 1</strong> to maintain a single point of orchestration and keep steps fully decoupled from the data layer.
</p>

<br>

<h4>The Refactor: Centralizing Logic</h4>
<p>
V2 introduces a strict separation of concerns through a dedicated data module (<strong>configuratorData.js</strong>). The architecture follows a unidirectional data flow with three distinct layers:
</p>

<br>

<p><strong>1. Data Collection (Step → Parent)</strong></p>
<p>
Each step collects user input and sends it upward to the parent via the <strong>saveStepData</strong> callback. The step does not know what happens to this data after submission — it only signals: <em>"Here is the value the user selected for this field."</em>
</p>

<pre><code>Step 1 → saveStepData("model", "x5") → configData.model = "x5"</code></pre>

<br>

<p><strong>2. Data Transformation (Parent + configuratorData)</strong></p>
<p>
The parent holds the raw <strong>configData</strong> object. Before rendering the next step, it does not pass raw data directly. Instead, it invokes pure transformation functions from <strong>configuratorData</strong>, passing the relevant key as an argument:
</p>

<pre><code>Parent → getEngines(configData.model) → ["3.0L Diesel", "4.4L V8"]</code></pre>

<p>
<strong>configuratorData</strong> is a <strong>stateless module</strong> — a collection of pure lookup functions. It receives an input, applies conditional logic, and returns formatted output. It has no awareness of the user, the DOM, or the application state.
</p>

<br>

<p><strong>3. Data Consumption (Parent → Step)</strong></p>
<p>
The parent passes the transformed result to the next step as a parameter. The step receives a <strong>ready-to-render</strong> array of options and displays them. It has no knowledge of which previous step produced the data or what transformations were applied:
</p>

<pre><code>Step 2 ← receives ["3.0L Diesel", "4.4L V8"] ← renders &lt;select&gt;</code></pre>

<br>

<h4>The Unidirectional Flow</h4>

<pre><code>Step N  →  saveStepData(key, value)  →  configData (parent state)
                                            ↓
Parent  →  configuratorData.transform(configData.key)  →  formatted options
                                            ↓
Step N+1  ←  receives formatted options  ←  renders UI</code></pre>

<br>

<h4>Key Architectural Principles</h4>

<p>
<strong>• Single Source of Truth:</strong> <strong>configData</strong> in the parent holds all application state.
<br>
<strong>• Separation of Concerns:</strong> Data logic (<strong>configuratorData</strong>), orchestration (<strong>parent</strong>), and rendering (<strong>steps</strong>) are three independent layers.
<br>
<strong>• Dumb Components:</strong> Steps have no conditional logic, no imports of data modules, and no knowledge of sibling steps.
<br>
<strong>• Pure Transformations:</strong> <strong>configuratorData</strong> functions are stateless — same input always produces the same output.
<br>
<strong>• Unidirectional Data Flow:</strong> Data moves up via callbacks, transforms in the parent, and flows down via parameters. No horizontal communication between steps.
</p>



<hr>

<h3>V3 - IndexedDB storage</h3>

<p>
<em>See the full Expalantion at <a class="accent-link" href="#/browserStorage/indexedDB">Browser Storage (IndexedDB)</a></em>
</p>


<hr>

<h3>V4 - Dashboard</h3>

<h4>Two Common Pitfalls in the Dashboard</h4>

<h4>Problem 1: async/await — Why the Function Must Wait</h4>

<p>
<em>This bug led to a deep dive into async/await and the event loop. The full breakdown is here:</em>
</p>
<p>
<a class="accent-link" href="#/javascript/async">→ Async JavaScript: async/await Under the Hood</a>
</p>

<p><strong>The mistake:</strong></p>
<p>
Assuming <strong>async</strong> means the function continues running while the data loads in the background.
</p>

<pre><code>async function getData() {
  fetchConfigs(); // Fire and forget
  div.innerHTML = "..."; // Runs before data arrives ❌
}</code></pre>

<p><strong>The reality:</strong></p>
<p>
<strong>async</strong> alone doesn't pause anything. It just allows the use of <strong>await</strong>. Without <strong>await</strong>, the promise flies off and the code keeps running. The data isn't ready when you need it.
</p>

<p><strong>The fix:</strong></p>
<p>
Use <strong>await</strong> to freeze the function until the promise resolves:
</p>

<pre><code>async function getData() {
  const configs = await fetchConfigs(); // Pauses here
  div.innerHTML = "..."; // Runs after data is ready ✅
}</code></pre>

<p>
<strong>await</strong> literally means "wait here." The function does NOT continue until the promise is fulfilled.
</p>

<br>
<h4>Problem 2: DOM Element vs. String in Template Literals</h4>

<p><strong>The mistake I made:</strong></p>
<p>
I wrote <strong>createConfigCard</strong> to build a card and return a DOM element. Then I tried to inject it into a template literal using <strong>innerHTML</strong>:
</p>

<pre><code>// This function returns a DOM element — a live object
const createConfigCard = (config) => {
  const card = document.createElement("div");
  card.className = "config-card";

  const { model, engine, color, interior, packages } = config;

  card.innerHTML = \`
    &lt;div class="config-card-header"&gt;
      &lt;span class="config-card-model"&gt;\${model}&lt;/span&gt;
      &lt;button type="button" class="btn-delete"&gt;✕&lt;/button&gt;
    &lt;/div&gt;
    &lt;div class="config-card-details"&gt;
      &lt;p&gt;&lt;strong&gt;Engine:&lt;/strong&gt; \${engine}&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Color:&lt;/strong&gt; \${color}&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Interior:&lt;/strong&gt; \${interior}&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Packages:&lt;/strong&gt; \${packages.join(", ")}&lt;/p&gt;
    &lt;/div&gt;
  \`;

  return card; // ← DOM element, not a string
};

// ❌ This fails — I can't .join() DOM elements into a string
const createDashboard = async () => {
  const configs = await fetchConfigs();

  div.innerHTML = \`
    &lt;h2 class="dashboard-title"&gt;Your Saved Configurations&lt;/h2&gt;
    &lt;div class="configs-grid"&gt;
      \${configs.map((config) => createConfigCard(config)).join("")}
    &lt;/div&gt;
  \`;
};</code></pre>

<p>
<strong>Why it fails:</strong> <strong>\${}</strong> expects a string!  <strong>.join("")</strong> expects an array of strings. But <strong>createConfigCard</strong> returns DOM element objects. JavaScript tries to convert each one to a string and gets <strong>"[object HTMLDivElement]"</strong> — useless garbage in the DOM. The cards never render.
</p>

<br>

<p><strong>The fix — Option A (Simplest): Return a string instead</strong></p>

<pre><code>// ✅ createConfigCard now returns a string
const createConfigCard = (config) => {
  const { model, engine, color, interior, packages } = config;

  return \`
    &lt;div class="config-card"&gt;
      &lt;div class="config-card-header"&gt;
        &lt;span class="config-card-model"&gt;\${model}&lt;/span&gt;
        &lt;button type="button" class="btn-delete"&gt;✕&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class="config-card-details"&gt;
        &lt;p&gt;&lt;strong&gt;Engine:&lt;/strong&gt; \${engine}&lt;/p&gt;
        &lt;p&gt;&lt;strong&gt;Color:&lt;/strong&gt; \${color}&lt;/p&gt;
        &lt;p&gt;&lt;strong&gt;Interior:&lt;/strong&gt; \${interior}&lt;/p&gt;
        &lt;p&gt;&lt;strong&gt;Packages:&lt;/strong&gt; \${packages.join(", ")}&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  \`;
};

// ✅ .join("") now works — everything is a string
div.innerHTML = \`
  &lt;h2&gt;Your Saved Configurations&lt;/h2&gt;
  &lt;div class="configs-grid"&gt;
    \${configs.map((config) => createConfigCard(config)).join("")}
  &lt;/div&gt;
\`;</code></pre>

<br>

<p><strong>The fix — Option B: Keep DOM elements, use append instead</strong></p>

<pre><code>// ✅ Set structure first with innerHTML, then append DOM elements
const createDashboard = async () => {
  const configs = await fetchConfigs();

  div.innerHTML = \`
    &lt;h2&gt;Your Saved Configurations&lt;/h2&gt;
    &lt;div class="configs-grid"&gt;&lt;/div&gt;
  \`;

  const grid = div.querySelector(".configs-grid");
  configs.forEach(config => {
    grid.append(createConfigCard(config)); // ✅ Append live DOM element
  });
};</code></pre>

<p>
<strong>The rule:</strong> <strong>innerHTML</strong> works with strings. <strong>append</strong> works with DOM elements. Don't mix them in the same operation. Choose one path and stay on it.
</p>



<br>

<h3>Problem 3: Rerender vs. Direct DOM Manipulation</h3>

<h4>The Confusion</h4>
<p>
When a user deletes a card, how does the dashboard update? Should the whole dashboard rerender, or should only the deleted card disappear? And where should the delete logic live — in the main dashboard function or inside each card?
</p>

<br>

<h4>Two Approaches</h4>

<p><strong>Method 1 — Direct DOM Manipulation (Surgical Update)</strong></p>

<p>
The delete functionality is placed inside <strong>createConfigCard</strong> — the function that builds a single card. When each card is created, its delete button gets a click handler attached directly to it. The main <strong>createDashboard</strong> function has no knowledge of deletion logic — it only renders cards once and delegates all interaction to the individual cards.
</p>

<pre><code>const createConfigCard = (config) => {
  const card = document.createElement("div");
  // ... set innerHTML ...

  // Delete handler lives INSIDE the card, not the dashboard
  card.querySelector(".btn-delete").addEventListener("click", async () => {
    await deleteConfigFromStorage(config.id); // Remove from IndexedDB
    card.remove(); // Remove from DOM
  });

  return card;
};</code></pre>

<p>
<strong>When a user clicks delete:</strong>
</p>

<p>
<strong>•</strong> That specific card's handler runs
<br>
<strong>•</strong> The config is removed from IndexedDB
<br>
<strong>•</strong> That card element is removed from the DOM
<br>
<strong>•</strong> Only that card disappears — the rest of the dashboard stays untouched
</p>

<p>
<strong>createDashboard</strong> never rerenders. It doesn't even know a deletion happened. Each card manages its own lifecycle.
</p>

<p>
✅ Efficient — only one element changes
<br>
✅ Separation of concerns — dashboard renders, cards handle their own interactions
<br>
✅ No data refetch needed
</p>

<br>

<p><strong>Method 2 — Full Rerender (State-Driven)</strong></p>

<p>
The delete logic lives in the dashboard. After removing data from storage, the entire dashboard is rebuilt:
</p>

<pre><code>await deleteConfigFromStorage(id);
createDashboard(); // Rebuild everything from fresh data</code></pre>

<p>
The whole dashboard renders from scratch with the latest data. The DOM always mirrors the database exactly.
</p>

<p>
✅ Always in sync with storage
<br>
✅ Simpler mental model — one source of truth
<br>
❌ More work for the browser — rebuilds the entire page
</p>

<br>

<h4>Which One Is Better?</h4>

<p>
Both are valid architectural choices:
</p>

<p>
<strong>Method 1</strong> is the classic vanilla JS pattern — imperative, surgical DOM updates. Components manage their own interactions. This is how developers built UIs before frameworks existed.
</p>

<p>
<strong>Method 2</strong> is the React-like declarative pattern — state changes trigger full rerenders. This is how modern frameworks think.
</p>

<br>

<p>
Understanding both approaches is key: <strong>Method 1</strong> teaches DOM mastery. <strong>Method 2</strong> teaches the React mindset.
</p>

<hr>




<h3>Conditional Rendering: One Pattern, Many Triggers</h3>

<h4>The Realization</h4>
<p>
While building the BMW Configurator Dashboard, I noticed two features that felt different but were actually the same pattern:
</p>

<p>
<strong>Switch Form (Login/Register)</strong> — User clicks a button to toggle between two forms (What I had Before)
</p>

<p>
<strong>Empty State (Dashboard)</strong> — When all saved configurations are deleted, show a "No configs saved yet" message; when configs exist, show the grid of cards.
</p>

<p>
At first glance, one is driven by user interaction, the other by data changes. But both use the same logic:
</p>

<pre><code>if (condition) {
  showThingA();
} else {
  showThingB();
}</code></pre>

<br>

<h4>What Is Conditional Rendering:</h4>

<p>
Conditional rendering is <strong>changing what's visible on the page (UI change) without changing the route/URL.</strong>
</p>
<p>
Or Simply: <strong>changing the rendered UI without changing the route.</strong>
</p>
<br>
<p>
<strong>Same URL, different UI:</strong>
</p>

<p>
<strong>• Switch form</strong> — Login form vs. Register form on the same page
<br>
<strong>• Empty state</strong> — Card grid vs. "No items" message on the same dashboard
<br>
<strong>• Loading state</strong> — Spinner vs. content vs. error message on the same view
<br>
<strong>• Accordion</strong> — Expanded section vs. collapsed section on the same page
</p>

<br>

<h4>Case 1: Switch Form — Manual Trigger (User-Initiated)</h4>
<p>
<strong>Trigger:</strong> The user explicitly performs an action (clicks a button). The UI does not change on its own — it waits for the user to decide.
</p>
<p>
<strong>What changes:</strong> One form replaces the other.
</p>

<p><strong>Ways to implement:</strong> I mentioned it completely in single-view form page</p>

<p>
<em><a class="accent-link" href="#/projects/form">Single-View Form Page</a></em>
</p>

<br>

<h4>Case 2: Empty State — Automatic Trigger (Data-Driven)</h4>
<p>
<strong>Trigger:</strong> The UI responds to changes in the underlying data without the user explicitly requesting a view change. When the data array becomes empty (all cards deleted or page loads with no saved configurations), the UI automatically reflects this.
</p>
<p>
<strong>What changes:</strong> The grid of cards hides, and a "No configs saved yet" message appears.
</p>
<br>
<p><strong>Ways to implement:</strong></p>
<br>
<p><strong>1. Append/Remove</strong></p>
<p>
Check if the grid has children. If empty, append an empty state element. Requires cleanup if cards are added back.
</p>

<pre><code>const grid = document.querySelector(".configs-grid");
const card = e.target.closest(".config-card");

deleteFromStorage(card.dataset.id);
card.remove();

if (!grid.children.length) {
  grid.append(emptyStateElement);
}</code></pre>

<br>

<p><strong>2. Toggle CSS Class</strong></p>
<p>
Both grid and empty state exist in the DOM. Toggle visibility by checking children count.
</p>

<pre><code>const updateEmptyState = (grid, emptyState) => {
  if (grid.children.length > 0) {
    emptyState.classList.add("hidden");
  } else {
    emptyState.classList.remove("hidden");
  }
};</code></pre>

<br>

<p><strong>3. Conditional innerHTML</strong></p>
<p>
Replace the entire container's <strong>innerHTML</strong> with either the grid or the message. Simple but destroys event listeners.
</p>

<pre><code>if (configs.length > 0) {
  container.innerHTML = \`&lt;div class="grid"&gt;\${cards}&lt;/div&gt;\`;
} else {
  container.innerHTML = \`&lt;p&gt;No configurations saved yet.&lt;/p&gt;\`;
}</code></pre>

<br>

<p><strong>4. State-Driven Re-render</strong></p>
<p>
Update a state array, re-render the entire dashboard from the new state. The React-like approach — UI always reflects the exact data state.
</p>

<pre><code>let configs = await fetchConfigs();

const deleteConfig = async (id) => {
  await deleteFromStorage(id);
  configs = configs.filter(c => c.id !== id); // Update state
  renderDashboard(configs); // Re-render from new state
};</code></pre>

<br>

<h4>One Condition, Two Moments</h4>

<p>
Regardless of which implementation you choose, the empty state check must run in <strong>two separate moments</strong>:
</p>

<p>
<strong>1. On page load</strong> — When the user first visits the dashboard. If there are no saved configs, the empty state should be visible immediately.
</p>

<p>
<strong>2. After data mutation</strong> — When the user deletes a card. After removal, re-check if the grid is now empty.
</p>

<p>
The logic is identical in both places. The only difference is <strong>when</strong> it executes.
</p>

<br>

<p>
<strong>Exception:</strong> Method 4 (State-Driven Re-render) is the only approach where the check naturally lives in one place. Since every change triggers a full re-render, the condition is evaluated once during rendering and automatically handles both moments. No need to duplicate the check.
</p>

<br>
<br>


<h4>Summary: Manual vs. Automatic — The Key Distinction</h4>

<pre><code>┌──────────────────────┬──────────────────────────────────────┬──────────────────────────────────────┐
│                      │ Case 1: Switch Form                  │ Case 2: Empty State                  │
├──────────────────────┼──────────────────────────────────────┼──────────────────────────────────────┤
│ Trigger              │ User-initiated (explicit action)     │ Data-driven (automatic response)     │
│ When it changes      │ On click / event                     │ On data mutation                     │
│ Who decides          │ The user                             │ The data                             │
│ Implementation feel  │ "Responding to events"               │ "Reflecting state"                   │
└──────────────────────┴──────────────────────────────────────┴──────────────────────────────────────┘</code></pre>

<p>
Both are conditional rendering. The difference is who initiates the change — the user or the data.
</p>

<br>

<h4>Conditional Rendering Is Everywhere</h4>
<p>
Conditional rendering is the umbrella term. The two cases above are just specific instances. The condition can be driven by any type of state:
</p>

<p>
<strong>Data state</strong> — empty vs. populated list
<br>
<strong>User interaction</strong> — login form vs. register form, accordion open vs. closed
<br>
<strong>User role</strong> — admin dashboard vs. regular user view
<br>
<strong>Loading state</strong> — spinner (loading) vs. content (loaded) vs. error message (failed)
<br>
<strong>Feature flag</strong> — new feature vs. old feature, A/B test variant A vs. variant B
</p>

<p>
The implementation always follows the same shape. Only the condition changes.
</p>

<br>

<h4>The Lesson</h4>
<p>
I used to think "switch form" and "empty state" were two unrelated features. They're not. They're both <strong>conditional rendering</strong> — the condition just comes from a different source.
</p>

<p>
Recognizing this pattern means I now see it everywhere. And when I move to React, <strong>{condition ? &lt;A /&gt; : &lt;B /&gt;}</strong> will just be syntax for something I already understand deeply.
</p>

<br>
<p>
<strong>
The syntax changes. The pattern doesn't.
</strong>
</p>




<hr>


<h3>The Data-to-UI Pipeline: A Universal Pattern</h3>

<p>
While rebuilding the BMW Configurator Dashboard, I noticed a repeating sequence. Every time the page loads data, the same steps execute in the same order. It's not unique to IndexedDB — it's the same flow whether you fetch from a database, localStorage, or a REST API.
</p>

<br>

<h4>The Pipeline</h4>

<pre><code>Fetch Data → Error Handling → Conditional Rendering (Empty State) → DOM Manipulation → Event Binding + Dynamic Conditional Rendering</code></pre>

<p>
Here's how each stage plays out in the Dashboard:
</p>

<br>

<h4>Step 1: Fetch the Data</h4>

<p>
The data source doesn't matter. Here it's IndexedDB, but it could be <strong>fetch()</strong> from an API, <strong>localStorage.getItem()</strong>, or any async data source.
</p>

<pre><code>const configsFromStorage = await getAllConfigsFromStorage();</code></pre>

<p>
The function pauses until data arrives. The rest of the pipeline waits.
</p>

<br>

<h4>Step 2: Error Handling</h4>

<p>
If the fetch fails, the UI must degrade gracefully. A failed fetch should not crash the page or leave the user staring at a broken interface.
</p>

<pre><code>try {
  const configsFromStorage = await getAllConfigsFromStorage();
} catch (err) {
  // Show error state or fallback UI
  return [];
}</code></pre>

<p>
In this project, the <strong>catch</strong> returns an empty array <strong>[]</strong>. The pipeline continues — the next step handles the empty array naturally.
</p>

<br>

<h4>Step 3: Conditional Rendering (Empty State — Initial Load)</h4>

<p>
Before building any UI, check if there's even data to display. If the array is empty, show the empty state and exit early. No further code runs.
</p>

<pre><code>if (!configsFromStorage.length) {
  div.append(emptyState());
  root.append(div);
  return; // Stop here — nothing else to do
}</code></pre>

<p>
The early return keeps the code flat. The rest of the function only executes when there IS data. No nested <strong>if/else</strong> wrapping everything.
</p>

<br>

<h4>Step 4: DOM Manipulation (Build the UI from Data)</h4>

<p>
Data exists — now transform it into DOM elements. Map over the array, build an HTML string for each item, join them together, and inject into the container.
</p>

<pre><code>const configsCards = configsFromStorage
  .map(({ id, model, engine, color, interior, packages }) => {
    return \`
      &lt;div class="config-card" data-id="\${id}"&gt;
        &lt;div class="config-card-header"&gt;
          &lt;span class="config-card-model"&gt;\${model}&lt;/span&gt;
          &lt;button type="button" class="btn-delete"&gt;✕&lt;/button&gt;
        &lt;/div&gt;
        &lt;div class="config-card-details"&gt;
          &lt;p&gt;&lt;strong&gt;Engine:&lt;/strong&gt; \${engine}&lt;/p&gt;
          &lt;p&gt;&lt;strong&gt;Color:&lt;/strong&gt; \${color}&lt;/p&gt;
          &lt;p&gt;&lt;strong&gt;Interior:&lt;/strong&gt; \${interior}&lt;/p&gt;
          &lt;p&gt;&lt;strong&gt;Packages:&lt;/strong&gt; \${packages.join(", ")}&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    \`;
  })
  .join("");

div.innerHTML = \`
  &lt;h2&gt;Dashboard&lt;/h2&gt;
  &lt;div class="configs-grid"&gt;\${configsCards}&lt;/div&gt;
\`;</code></pre>

<p>
Raw data → HTML strings → DOM. This is the rendering step.
</p>

<br>

<h4>Step 5: Event Binding + Dynamic Conditional Rendering</h4>

<p>
After the DOM exists, attach interactivity. Instead of adding a click handler to every delete button individually, use <strong>event delegation</strong> — one listener on the parent grid.
</p>

<pre><code>div.querySelector(".configs-grid").addEventListener("click", async (e) => {
  const btnDelete = e.target.classList.contains("btn-delete");

  if (btnDelete) {
    const card = e.target.closest(".config-card");
    const configsGrid = card.parentElement;

    await deleteConfigFromStorage(Number(card.dataset.id));
    card.remove();

    // Dynamic conditional rendering — after data mutation
    if (!configsGrid.children.length) {
      div.append(emptyState());
    }
  }
});</code></pre>

<p>
The handler does three things:
</p>

<p>
<strong>1. Deletes from storage</strong> — the data source is updated
<br>
<strong>2. Removes from DOM</strong> — the UI reflects the change
<br>
<strong>3. Re-checks the empty state</strong> — if the grid is now empty, show the message
</p>

<p>
This is the same conditional rendering from Step 3, but triggered by user interaction instead of page load. Same logic, different moment.
</p>

<br>

<h4>The Complete Pipeline</h4>

<pre><code>const createDashboard = async () => {
  root.innerHTML = "";

  const div = document.createElement("div");
  div.className = "dashboard-container";

  // Step 1 & 2: Fetch data with error handling
  let configsFromStorage = [];
  try {
    configsFromStorage = await getAllConfigsFromStorage();
  } catch (err) {
    console.log("Failed to load configs", err);
    // configsFromStorage stays [] — empty state handles it naturally
  };

  // Step 3: Conditional rendering — empty state on initial load
  if (!configsFromStorage.length) {
    div.append(emptyState());
    root.append(div);
    return; // Early exit
  }

  // Step 4: DOM manipulation — build cards from data
  const configsCards = configsFromStorage.map(/* ... */).join("");
  div.innerHTML = \`
    &lt;h2&gt;Dashboard&lt;/h2&gt;
    &lt;div class="configs-grid"&gt;\${configsCards}&lt;/div&gt;
  \`;

  // Step 5: Event binding + dynamic conditional rendering
  div.querySelector(".configs-grid").addEventListener("click", async (e) => {
    // Delete + re-check empty state
  });

  root.append(div);
};</code></pre>

<br>

<h4>This Pattern Is Universal</h4>

<p>
This pipeline is not specific to IndexedDB or the BMW Configurator. It's the same sequence in nearly every data-driven UI:
</p>

<pre><code>┌──────────────────────────────────┬─────────────────────────────────┬──────────────────────────────────────┐
│ Step                             │ What Happens                    │ Applies To                           │
├──────────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────┤
│ Fetch                            │ Get data from source            │ API, DB, localStorage, file          │
│ Error Handling                   │ Handle failure gracefully       │ Try/catch, fallback UI               │
│ Conditional Rendering            │ Empty state, loading state      │ "No items", spinner, error message   │
│ DOM Manipulation                 │ Build UI from data              │ Map data → HTML elements             │
│ Event Binding                    │ Attach interactivity            │ Click handlers, forms, delete buttons│
│ Dynamic Conditional Rendering    │ Re-check state after mutation   │ Empty after delete, update counters  │
└──────────────────────────────────┴─────────────────────────────────┴──────────────────────────────────────┘</code></pre>

<p>
Fetching from IndexedDB, <strong>fetch()</strong> from a REST API, or reading from <strong>localStorage</strong> — the pipeline is identical. The data source changes. The pattern doesn't.
</p>



<hr>

<p>
<em>See the full working code on <a class="accent-link" href="https://github.com/falconstoop/bmw-configurator" target="_blank" rel="noopener noreferrer">GitHub → BMW Configurator</a></em>
</p>


</article>
  `;
};

export default carConfigurator;
