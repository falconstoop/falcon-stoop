//
const root = document.getElementById("root");
//
const whatIsJavascript = () => {
  root.innerHTML = `
    <article class="content">
  <h2>What Is JavaScript?</h2>

  <div class="blockquote-wrapper">
<blockquote>
    <p>"If you know the enemy and know yourself, you need not fear the result of a hundred battles." </p>
    <footer>— Sun Tzu ⚔️ —</footer>
    <p class="quote-twist">
     The browser is not magic. It's three engines, one thread, and a pipeline of pixels. 
     <br>
     Know them, and you know JavaScript...
    </p>
</blockquote>
</div>



  <h3>What JavaScript Actually Does behind the scene!</h3>
  <p>To Understand JavaScript deeply, one should first know What it does behind the scene.
  Most frontend developers work with the DOM and JavaScript daily, yet fundamental misconceptions persist about how these systems actually interact. This document provides an in-depth technical explanation of the browser's internal architecture, specifically the relationship between the DOM (a live C++ data structure), JavaScript (a separate memory space and controller), and the Render Engine (the pixel painter). Understanding this separation is critical for building performant, predictable web applications.
  </p>
  
  <h3>1. The Three Pillars of the Browser</h3>
<p>
  <strong>DOM (Document Object Model):</strong> A live data structure created by the browser when parsing HTML. It exists in memory as a tree of objects (typically implemented in C++ inside browser engines) representing the document structure. The DOM is mutable, meaning JavaScript can read it and directly modify, add, or remove nodes throughout the lifetime of the page.<br><br>


<strong>JavaScript Engine:</strong> A runtime environment responsible for executing JavaScript code, managing variables, functions, and execution contexts. It runs in its own memory space but interacts with browser-provided Web APIs that expose access to objects like the DOM. When JavaScript modifies a page, it directly updates DOM objects through these APIs. The browser then detects these DOM changes and updates the rendering output accordingly.<br><br>

<strong>Render Engine:</strong> The render engine is responsible for taking the current DOM and CSSOM and converting them into pixels on the screen. When the DOM is updated, the render engine recalculates styles if needed, performs layout (to determine element size and position), paints the pixels for each element, and then composites them into the final image displayed to the user. This entire process is what produces the visual output that the user sees in the browser.
</p>


  <h3>2. What the DOM Actually Is</h3>

  <h4>2.1 The DOM Is Not What You See</h4>
  <p>The DOM is a live data structure—a tree of objects stored in memory. It is not pixels, not a visual representation, and not the rendered page. It can be thought of as a structured object model created by the browser from the initial HTML document, but unlike the original HTML file, the DOM remains dynamic and can be changed at any time during the lifecycle of the page through JavaScript.</p>


  <h4>2.2 The DOM Is Constructed Once</h4>
  <p>
I've heard Will Sentance (Frontend Masters, "UI Development Hard Parts") refers to the DOM being "fixed" after parsing, he means the DOM is constructed once from the HTML document and then persists in memory for the lifetime of the page. It is not continuously rebuilt from the original HTML. However, the DOM is not immutable — it remains a live, mutable object graph that JavaScript can modify at runtime through browser APIs. The "fixed" aspect refers only to its origin (built once from HTML), not its behavior (mutable throughout the page lifecycle).
</p>

<pre><code>Browser parses HTML → DOM is constructed (initial build step)</code></pre>

<p>After this step, the DOM remains a live structure that JavaScript can modify at any time through browser APIs, and those modifications are reflected in the rendering output.</p>


<h4>2.3 What Happens When You "Change" the DOM</h4>

<p>When JavaScript executes DOM manipulation code such as:</p>

<pre><code>// The HTML file initially contains a price of "7", 
// but the server now returns the updated value "8"
document.getElementById('price').textContent = '8';</code></pre>

<p>What actually happens is:</p>

<p>
1. JavaScript obtains a reference to a real DOM node object<br>
2. The <code>textContent</code> property setter directly mutates that DOM node in memory<br>
3. The browser marks the affected element as needing a style/layout update if required<br>
4. The rendering pipeline runs when necessary:
   - style recalculation<br>
   - layout (reflow if geometry changes)<br>
   - paint<br>
   - compositing<br>
5. The updated pixels are displayed on the screen
</p>

<p>There is no separate messaging layer between JavaScript, the DOM, and the render engine. JavaScript directly mutates DOM objects, and the browser’s rendering system reacts internally to those changes.</p>



<h3>3. JavaScript's Role in the Browser</h3>

<h4>3.1 JavaScript Has Its Own Memory</h4>
<p>
JavaScript executes inside a runtime environment that manages its own memory (heap) and execution context stack. Variables, objects, and functions created in JavaScript are stored in this memory space and managed by the JavaScript engine's garbage collector.
<br><br>
For example:
</p>

<pre><code>let number = 8;</code></pre>

<p>This value exists in JavaScript memory and is independent of the DOM until JavaScript explicitly interacts with DOM APIs.</p>

<h4>3.2 JavaScript and the DOM Relationship</h4>
<p>
JavaScript does not act as a visual layer over the DOM. Instead, it interacts with DOM objects through browser-provided APIs. When JavaScript updates the DOM, it is directly modifying DOM nodes in memory.
<br><br>
The browser’s rendering system then uses the current state of the DOM and CSSOM to produce the visual output on screen.
</p>

<h4>3.3 Two Common Application Models</h4>

<p><strong>Scenario A: Traditional SSR / MPA</strong></p>

<pre><code>HTML is rendered on the server
→ Browser builds DOM from HTML
→ JavaScript enhances interactivity
→ DOM remains the primary representation of page structure
</code></pre>

<p><strong>Scenario B: SPA (React, Vue, etc.)</strong></p>

<pre><code>JavaScript application state
→ updates DOM via framework rendering logic
→ DOM is kept in sync with application state
→ browser renders updated output
</code></pre>

<p>
In both cases, the DOM is the structure used by the browser to determine what is rendered. JavaScript’s role is to manipulate application state and/or DOM structures, not to act as a separate visual layer.
</p>


  
<h3>4. The Render Engine: The Actual Painter</h3>

    <h4>4.1 What the Render Engine Does</h4>
  <p>The Render Engine (Blink in Chrome, WebKit in Safari, Gecko in Firefox) is responsible for:<br>
1. Reading the DOM tree<br>
2. Computing CSS styles (the CSSOM)<br>
3. Building the Render Tree (combining DOM + CSSOM)<br>
4. Calculating layout (position and size of every element)<br>
5. Painting pixels to the screen</p>

    <h4>4.2 The Critical Separation</h4>
    <pre><code>DOM (Data Structure)          Render Engine (Painter)
─────────────────────        ─────────────────────
Stores what to show          Decides how to show it
Built once from HTML         Can repaint based on signals
Tree of objects              Pixel output
No visual existence          Visual existence
</code></pre>
  <p>The DOM itself has zero visual representation. It is purely data. Only the Render Engine creates what users actually see.</p>

    <h4>4.3 Repaint vs. Reflow</h4>

<p>
1. Repaint: Only pixels change (e.g., color, visibility) — fast<br>
2. Reflow: Layout changes (e.g., width, position, content size) — slower because it affects layout calculations of surrounding elements<br>
• Understanding this distinction is important for performance optimization. Some DOM changes, including textContent updates, may trigger both reflow and repaint depending on whether layout is affected.
</p>


<h3>5. The Full Data Flow</h3>

      <h4>5.1 Initial Page Load</h4>
  <p>
  1. Browser requests HTML from server<br>
2. HTML is parsed character by character<br>
3. DOM tree is constructed in C++ memory<br>
4. Render Engine reads the DOM<br>
5. Render Engine paints pixels<br>
6. User sees the page
  </p>



  <h4>5.2 User Interaction (Data Change)</h4>
<p>
1. User triggers event (click, input, etc.)<br>
2. JavaScript executes handler<br>
3. JS stores or computes a new value (e.g. 8)<br>
4. JS updates application state or passes the value (e.g. 8) to a DOM API (e.g. textContent, value, etc.)<br>
5. The DOM node is updated in memory with the new value (e.g. 8)<br>
6. The browser marks the affected part of the document as needing a rendering update and schedules the rendering pipeline<br>
7. Render engine processes style, layout, paint, and compositing as needed<br>
8. User sees updated content on screen (e.g. 8)<br>
9. Previous HTML file remains unchanged
</p>


      <h4>5.3 Submitting Data to Backend</h4>
  <p>  
  Correct path:<br>
JS State (8) → fetch('/api/save') → Backend/Server<br>
<br>
Incorrect path (anti-pattern):<br>
DOM value → JS reads DOM → fetch()<br>
<br>
The JavaScript state is the source of truth. Reading from the DOM to submit data is an anti-pattern because the DOM may contain formatted, localized, or masked values, not the raw data.
</p>

      <h4>5.4 Next Day Page Load</h4>
  <p>
  1. Browser requests HTML again (same file, still contains '7')<br>
2. DOM is built from HTML (contains '7')<br>
3. JavaScript loads and initializes<br>
4. JS fetches current data from server → gets '8'<br>
5. JS updates the DOM node with the new value (e.g., '8')<br>
6. User sees '8'<br>
7. Brief flash may occur (7 briefly visible before JS runs)<br><br>
• This flash is the core challenge of frontend engineering.
  </p>

  <h3>6. The Flash Problem (Flash of Incorrect Content)</h3>

<h4>6.1 What Causes It</h4>
<p>
The flash happens because of a timing gap between initial HTML rendering and JavaScript execution:
<br><br>
1. The browser parses the HTML and constructs the DOM<br>
2. The render engine performs the initial paint based on the DOM (e.g. value '7' coming from HTML)<br>
3. The page becomes visible to the user<br>
4. JavaScript loads and executes after (or during) initial rendering<br>
5. JavaScript updates application state and then updates the DOM via DOM APIs (e.g. '8')<br>
6. The render engine reacts to the DOM change and updates the pixels on screen<br>
<br>
During the time between step 3 and step 6, the user may briefly see outdated or uninitialized content.
</p>



<h4>6.2 Solutions by Architecture</h4>
<p>
  <strong>SSR with current data (Next.js, Nuxt)</strong> — Server renders HTML with '8' already. DOM contains '8' from the start. No flash.<br>
  <strong>Static Generation with Revalidation (ISR)</strong> — Page is pre-built and served instantly from cache. Regeneration happens in the background for future visitors.<br>
  <strong>Loading skeleton</strong> — Show placeholder shapes until JS populates data. User knows data is loading.<br>
  <strong>Optimistic UI</strong> — Assume new data will succeed. Show '8' immediately, rollback if server errors.<br>
  <strong>Suspense boundaries (React)</strong> — Display a loading fallback while data or components load. Old UI can be preserved using libraries like React Query (placeholderData) or React's useDeferredValue.
</p>
  

<h3>7. Implications for Professional Frontend Development</h3>

  <h4>7.1 State Management</h4>
<p>
Understanding browser architecture leads to a clearer separation of state responsibilities in modern applications:
<br><br>
• Server State: Data that originates from APIs or backend systems (managed via tools like React Query or SWR for caching and synchronization)<br>
• Client State: UI-related state such as modals, themes, and temporary UI interactions (managed via Context, Zustand, Redux, etc.)<br>
• Form State: Short-lived user input state during interaction (often managed by libraries like React Hook Form or Formik)<br><br>

The key idea is not that JavaScript "must own everything", but that application state should be clearly separated from DOM representation to avoid inconsistent or unreliable data flow.
</p>

    <h4>7.2 Performance</h4>
  <p>
  Understanding the DOM/Render Engine separation informs performance decisions:<br>
•  Batch DOM reads/writes to minimize reflows<br>
•  Use will-change CSS property to hint at upcoming animations<br>
•  Avoid layout thrashing (interleaving reads and writes)<br>
•  Implement virtual scrolling for large lists (only render visible nodes)<br>
  </p>

    <h4>7.3 User Experience Patterns</h4>
  <p>Every async operation must handle four states:<br>
•  Loading: Skeleton, spinner, or shimmer<br>
•  Error: Retry options, friendly messages<br>
•  Empty: Guidance when no data exists<br>
•  Success: The actual content</p>

      <h4>7.4 Testing Strategy</h4>
  <p>Unit tests: Test JS state transformations and logic<br>
Component tests: Test rendered output for given state (Testing Library)<br>
E2E tests: Test complete user flows including server interactions (Playwright, Cypress)<br>
Don't test pixels. Test data and behavior. Pixels are the Render Engine's responsibility.</p>

<h3>8. The Complete Mental Model</h3>

<pre><code>
┌─────────────────────────────────────────────────────────┐
│                      HTML File                          │
│              (static text, never changes)               │
│              contains: <p id="price">7</p>              │
└────────────────────┬────────────────────────────────────┘
                     │ Parsing
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   DOM (C++ Heap)                        │
│         Live data structure from initial parse          │
│         { tag: "p", id: "price", textContent: "7" }     │
│         This data is a live in-memory structure         |
|          and can be modified during runtime             │
└────────┬────────────────────────────────┬───────────────┘
         │                                │
         │ DOM API (Bindings)              │ Direct reading
         ▼                                ▼
┌────────────────────┐          ┌─────────────────────────┐
│  JavaScript Heap   │          │    Render Engine (C++)  │
│                    │          │                         │
│  let price = 8     │──Updates──▶  Reads updated DOM     │
│  (source of truth  │ DOM nodes│   and prints 8          │
│   in SPAs)         │          │   (What user sees)      │
└────────┬───────────┘          └─────────────────────────┘
         │
         │ fetch('/api/save')
         ▼
┌─────────────────────┐
│   Backend Server    │
│   Persistent Store  │
└─────────────────────┘
</code></pre>

      <h4>References</h4>
  <p>
• Will Sentance, Frontend Masters - UI Development Hard Parts<br>
• W3C DOM Specification<br>
• Chrome Blink Rendering Engine Documentation<br>
• V8 JavaScript Engine Internals<br>
• React Documentation on Reconciliation and Virtual DOM<br>
<br>
  </p>


  <p><strong>Author's Note:</strong> This document represents a synthesis of practical experience, expert teaching (particularly Will Sentance's precise technical explanations), and browser internals documentation. The distinction between the DOM as live mutable data (constructed once from HTML), JavaScript as the controller that manipulates it, and the Render Engine as the visual painter is rarely taught explicitly but forms the foundation of all modern frontend framework design.</p>

<br>
<p>
<em>This is the foundation. Next: see how these pillars behave under real user interaction — 
exploring the event loop, microtasks, and what really happens when you click a button.</em>
</p>

  
</article>
  `;
};

export default whatIsJavascript;
