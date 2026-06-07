//
const root = document.getElementById("root");
//
const carConfigurator = () => {
  root.innerHTML = `
<article class="content">

<h2>Car Konfigurator</h2>


<div class="blockquote-wrapper">
<blockquote>
    <p>"Knowing is not enough, we must apply. Willing is not enough, we must do." </p>
    <footer>— Bruce Lee 🥋 —</footer>
    <p class="quote-twist">
     I knew the patterns from V1 and V2. Car Configurator proved I could apply them, to a different domain, a different navigation model, a different set of problems.
    </p>
</blockquote>
</div>




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


<p>
<em>See the full working code on <a class="accent-link" href="https://github.com/falconstoop/bmw-configurator" target="_blank" rel="noopener noreferrer">GitHub → BMW Configurator</a></em>

</p>


</article>
  `;
};

export default carConfigurator;
