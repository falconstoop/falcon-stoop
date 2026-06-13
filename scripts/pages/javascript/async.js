//
const root = document.getElementById("root");
//

const async = () => {
  root.innerHTML = `
<article class="content">
<h2>Async JavaScript</h2>


<h3>Before We Start — The Bug That Forced Me Here</h3>

<p>
While building the Dashboard for my Car Configurator project, I wrote an <strong>async</strong> function to load saved configurations from IndexedDB. I called <strong>fetchConfigs()</strong> and expected the data to be there when I needed it.
</p>

<p>
It wasn't.
</p>

<p>
The dashboard rendered empty. No errors. No warnings. Just missing data. At the time, I thought <strong>async</strong> meant: <em>"Run this in the background and give me the data when it's ready."</em>
</p>

<p>
What I didn't understand was that without <strong>await</strong>, an <strong>async</strong> function doesn't pause. It returns a promise and keeps running. The data wasn't waiting for me — my code had already moved on.
</p>

<p>
This page exists because of that bug. Everything here comes from tracing that mistake until I understood what <strong>async</strong> does, what <strong>await</strong> does, and why the difference matters.
</p>

<p>
<em>This bug was encountered in V4 — the Dashboard. See the full case study: <a class="accent-link" href="#/projects/car-configurator">Car Configurator</a></em>
</p>
<br>


<pre><code>
Async JavaScript Page
├── Web APIs
│
├── Callback / Callback Queue / Event Loop
│
├── Promise
│   └── Fetch / .then vs. await
│
├── Callback Queue vs. Macrotask Queue
│
└── Dashboard Problem (Car Configurator)
    ├── async data loaded (fetchConfigs)
    ├── UI rendered before data arrived
    ├── .then caused timing mismatch
    └── await fixed execution order
</code></pre>

<hr>

<h3>Where Async Actually Comes From</h3>

<p>
JavaScript is <strong>single-threaded</strong>. It can only execute one line of code at a time on the <strong>call stack</strong>.
</p>

<p>
But the <strong>browser</strong> is not limited in the same way. It exposes features like <strong>timers</strong>, <strong>network requests</strong>, and <strong>DOM events</strong> that live outside the JavaScript engine.
</p>

<p>
When we use something like <strong>setTimeout</strong> or <strong>fetch</strong>, we are not executing that work inside JavaScript itself. We are handing it off to the <strong>browser environment</strong>.
</p>

<p>
While the browser handles it in the background, JavaScript continues executing the rest of the code without waiting.
</p>

<p>
When the browser finishes the task, it does not return the result directly into the running code. Instead, it schedules a <strong>callback</strong> to be pushed back into JavaScript through a <strong>queue</strong>.
</p>

<p>
That gap between “delegating work to the browser” and “receiving the result later” is what creates <strong>asynchronous behavior</strong> in JavaScript.
</p>
<br>
<p>
These capabilities provided by the browser are called <strong>Web APIs</strong>.
</p>

<p>
<em>For a deeper breakdown of what an API actually is and the different types of APIs, see: <a class="accent-link" href="#/browserStorage/what-is-api">What is API</a></em>
</p>

<hr>


<h3>The Browser’s Async Toolbox (Web APIs)</h3>

<p>
When JavaScript needs to perform something that takes time, it doesn’t handle it directly.
It hands the work to the <strong>browser</strong>.
</p>

<p>
The browser provides a set of built-in features called <strong>Web APIs</strong> that can run outside the JavaScript call stack.
These are what make asynchronous behavior possible.
</p>
<br>
<p>
The main ones involved in async JavaScript are:
</p>
<p>
<strong>Timers</strong> — used by things like <strong>setTimeout</strong> and <strong>setInterval</strong> to delay execution.
</p>
<p>
<strong>Network requests</strong> — used by <strong>fetch</strong> to communicate with servers and wait for data.
</p>
<p>
<strong>DOM events</strong> — like clicks, inputs, and scrolls that wait for user interaction.
</p>
<p>
These Web APIs run in the background while JavaScript continues executing the rest of the code.
</p>

<br>
<pre><code>
function printHello() {
  console.log("hello");
}

setTimeout(printHello, 1000);

console.log("me first");
</code></pre>

<p>
At first glance, it feels like JavaScript will wait 1 second and then continue.
But that's not what happens.
</p>

<p>
JavaScript immediately gives <strong>setTimeout</strong> to the <strong>browser Web APIs</strong> and continues executing the next line.
</p>

<p>
So <strong>console.log("me first")</strong> runs immediately on the <strong>call stack</strong>.
</p>

<p>
Meanwhile, the browser handles the timer in the background. After 1 second, Browser does not run the function directly. Browser sends <strong>printHello</strong> to a <strong>queue</strong> to be picked up later by JavaScript(After the timer finishes, the callback is placed into the Macrotask Queue.).
</p>

<p>
That’s why the order is not based on when we write the code — it’s based on when JavaScript actually receives the task back.
</p>

<br>

<p><strong>Execution Flow Diagram:</strong></p>

<pre><code>
CALL STACK:
1. setTimeout(printHello, 1000)  → sent to Web API
2. console.log("me first")        → runs immediately

BROWSER (Web API):
- waits 1000ms
- sends printHello → Queue

QUEUE:
- printHello waits here

CALL STACK (later):
- printHello runs
</code></pre>

<div class="img-container">
<img class="content-img" src="./assets/async/1.JavaScript-vs-browser.jpg" alt="JS vs. browser API">
</div>

<hr>

<h3>Callback & Callback Queue & Event Loop</h3>

<h4>What is Callback?</h4>
<p>
A <strong>callback</strong> is a function we pass into another system with the expectation that it will be executed later.
</p>

<p>
In the context of asynchronous JavaScript, a callback usually means:
we give a function to the <strong>browser</strong> (via Web APIs), and the browser "calls it back" once the task is finished.
</p>

<p>
This is where the name comes from — <strong>call back later</strong>.
</p>

<p>
However, the word <strong>callback</strong> is also used in another context: higher-order array methods like <strong>map</strong>, <strong>filter</strong>, and <strong>forEach</strong>.
</p>

<p>
For example:
</p>

<pre><code>
[1, 2, 3].map(function(x) {
  return x * 2;
});
</code></pre>

<p>
In this case, the function is also called a “callback”, but it is not asynchronous and it is not handled by the browser.
It is executed immediately during the iteration.
</p>

<p>
So the term <strong>callback</strong> is overloaded:
<ul>
  <li>In async JS → function handed to the browser to run later</li>
  <li>In array methods → function executed immediately by JavaScript</li>
</ul>
</p>

<h4>The Callback Queue</h4>


<p>
When the browser finishes an async task, it does not run the function immediately.
Instead, it places the callback into something called the <strong>Callback Queue</strong>.
</p>

<p>
The <strong>Callback Queue</strong> is a waiting area for functions that are ready to be executed, but cannot run until the <strong>call stack</strong> is free.
</p>

<br>

<p>
Now let's look at a simple example that breaks intuition:
</p>

<pre><code>
function printHello() {
  console.log("Hello");
}

function blockFor1Sec() {
  // blocks the JS thread for 1 second
}

setTimeout(printHello, 0);

blockFor1Sec();

console.log("me first");
</code></pre>

<p>
Even though <strong>setTimeout</strong> is set to 0ms, <strong>printHello</strong> does not run immediately.
</p>

<p>
It first goes to the <strong>browser Web API</strong>, then is moved into the <strong>Callback Queue</strong>.
But it cannot execute yet.
</p>

<p>
Why?
Because JavaScript is still busy executing <strong>blockFor1Sec()</strong> and <strong>console.log("me first")</strong> on the <strong>call stack</strong>.
</p>

<p>
Only when the call stack becomes empty, JavaScript start pulling functions from the <strong>Callback Queue</strong>.
</p>

<br>

<p><strong>Execution Order:</strong></p>

<pre><code>
1. setTimeout(printHello, 0)
   → goes to Web API

2. blockFor1Sec()
   → blocks call stack

3. console.log("me first")
   → runs immediately

4. printHello
   → waits in Callback Queue

5. Call stack becomes free
   → printHello runs
</code></pre>


<div class="img-container">
<img class="content-img" src="./assets/async/2.Callback-Queue.png" alt="JS vs. browser API">
</div>



<h4>The Event Loop</h4>

<p>
So far we have three pieces:
<strong>Web APIs</strong>, <strong>Callback Queue</strong>, and the <strong>Call Stack</strong>.
But something is still missing — something that actually connects them.
</p>

<p>
That missing piece is the <strong>Event Loop</strong>.
</p>

<p>
The <strong>Event Loop</strong> is a simple but critical process that constantly checks:
</p>

<p>
Is the <strong>Call Stack</strong> empty?
</p>

<p>
If yes → it takes the first function from the <strong>Callback Queue</strong> and pushes it into the Call Stack to run.
</p>

<p>
If no → it does nothing and keeps waiting.
</p>

<br>

<p>
This is the mechanism that allows asynchronous code to eventually run.
Not the browser.
Not the queue.
But the Event Loop deciding when JavaScript is ready to accept new work.
</p>

<br>

<p><strong>Putting it all together:</strong></p>

<pre><code>
1. Async task starts (setTimeout, fetch, event)
   → sent to Web APIs

2. Web API finishes task
   → sends callback to Callback Queue

3. Event Loop continuously checks:
   → Is Call Stack empty?

4. If empty:
   → move callback from Queue → Call Stack

5. Callback runs in JavaScript
</code></pre>


<hr>


<h3>Promises</h3>

<p>
A <strong>Promise</strong> is a modern replacement for the old callback-based way of handling async operations.
</p>

<p>
Instead of giving a function directly to the browser and hoping it gets called at the right time, a Promise gives us a <strong>structured object</strong> that represents a task that will finish in the future.
</p>

<p>
This gives JavaScript a cleaner way to track async work without nesting callbacks inside callbacks.
</p>
<br>
<p>
In the callback approach, we pass a function to the <strong>browser</strong> and JavaScript effectively "hands it off" and forgets about it(JavaScript does not wait for the operation. It continues execution while the browser handles the work.).
The browser runs the task, and only later sends the function back into JavaScript through the queue when it's ready to be executed.
</p>

<p>
With a <strong>Promise</strong>, JavaScript does not completely lose track of the operation.
Instead of only giving a function away, <strong>the async operation immediately returns a <em><u>Promise object</u></em> into JavaScript memory</strong>.
</p>

<p>
That Promise acts as a live reference to the ongoing work happening in the browser.(Promise is a JavaScript object that tracks the state of an async operation.)
JavaScript can attach reactions to it (<strong>.then</strong>) while the operation is still running, instead of waiting for it to come back as a callback.
</p>

<p>
So the key difference is:
callbacks are “sent away and forgotten until returned,” while Promises are “tracked objects that stay in JavaScript memory while the work happens in the background.”
</p>

<br>

<h4>Fetch — How Modern Async Starts</h4>


<p>
When we call <strong>fetch</strong>, two important things happen immediately:
</p>

<p>
<strong>1.</strong> JavaScript instantly creates and returns a <strong><u>Promise object</u></strong> into memory. This gives JavaScript a way to track the operation while it is still in progress.
</p>

<p>
<strong>2.</strong> The browser starts a <strong>network request</strong> in the background to retrieve the data.
</p>

<pre><code>
1. JS creates Promise immediately
2. Browser starts network request
3. Browser resolves/rejects Promise later
</code></pre>

<p>
These two things happen together. JavaScript gets the Promise immediately, while the browser continues working on the request.
</p>

<p>
Later, when the data arrives, the Promise is updated and the associated functions are scheduled to run through a separate queue called the <strong>Microtask Queue</strong>, which we'll explore shortly.
</p>

<br>

<pre><code>
function display(data) {
  console.log(data);
}

const futureData = fetch("https://tiktok.com/x");

futureData.then(display);

console.log("me first");
</code></pre>

<p>
The variable <strong>futureData</strong> does not contain the fetched data.
It contains the <strong><u>Promise object</u></strong> that was returned immediately by <strong>fetch</strong>.
</p>

<p>
When JavaScript reaches <strong>futureData.then(display)</strong>, it does not run <strong>display</strong>.
Instead, it registers <strong>display</strong> to run when the Promise eventually receives its data.
</p>

<p>
Since the network request is still in progress, JavaScript continues executing the next line.
</p>

<p>
Therefore:
</p>

<pre><code>
me first
</code></pre>

<p>
appears before the fetched data.
</p>

<br>

<p><strong>Mental Model:</strong></p>

<pre><code>
fetch(...)
│
├─ Creates Promise object in JS memory
│
└─ Starts network request in Browser

.then(display)
│
└─ Registers display for later

console.log("me first")
│
└─ Runs immediately

Data arrives later
│
└─ display(data) eventually runs
</code></pre>



<div class="img-container">
<img class="content-img" src="./assets/async/3.Promise-Functionality.jpg" alt="JS vs. browser API">
</div>

<h4>.then() & await</h4>

<p>
Both <strong>.then()</strong> and <strong>await</strong> are mechanisms for accessing the eventual result of a <strong>Promise</strong>.
They do not create Promises — they consume them.
</p>

<p>
The key difference is not <em>what</em> they get, but <em>how</em> they wait for it.
</p>

<p>
<strong>.then()</strong> does not pause execution. It registers a function to be run later when the Promise settles, then JavaScript immediately continues executing the next line of code.
</p>

<pre><code>
fetch(url).then(display);

console.log("me first");
</code></pre>

<p>
Here, <strong>display</strong> is scheduled for the future, while <strong>console.log("me first")</strong> runs immediately.
</p>

<br>

<p>
<strong>await</strong> behaves differently. Instead of scheduling a separate function, it pauses the execution of the current <strong>async function</strong> until the Promise settles.
</p>

<pre><code>
async function getData() {
  const data = await fetch(url);

  console.log(data);
  console.log("after");
}
</code></pre>

<p>
When JavaScript reaches <strong>await</strong>, it pauses <strong>getData</strong> and waits for the Promise to produce a value. Once the Promise settles, execution resumes from the exact point where it was paused.
</p>

<p>
Importantly, <strong>await</strong> does not block JavaScript itself. It only pauses the execution flow that contains it. Other code, timers, events, and async operations can continue running normally.
</p>

<br>

<p>
<strong>Mental Model:</strong>
</p>

<pre><code>
.then()
│
├─ Register callback
└─ Continue immediately

await
│
├─ Pause current async function
└─ Resume later from the same spot
</code></pre>


<h4>Await (Inside a Function vs. Global Scope)</h4>

<p>
When <strong>await</strong> is used inside an <strong>async function</strong>, only that function is paused until the Promise settles. The rest of JavaScript can continue running normally.
</p>

<pre><code>
async function getData() {
  const data = await fetch(url);
  console.log(data);
}

console.log("I can still run");
</code></pre>

<p>
When <strong>await</strong> is used at the top level of a module, the code that follows it is paused until the Promise settles.
</p>

<pre><code>
const data = await fetch(url);

console.log(data);
console.log("runs later");
</code></pre>

<p>
In both cases, JavaScript itself is not blocked. The difference is simply <strong>which execution flow is paused</strong>.
</p>
<br>
<p>
If you need to use <strong>await</strong> in an environment that does not support top-level await, a common solution is to wrap the code inside an <strong>async IIFE (Immediately Invoked Function Expression)</strong>.
</p>

<pre><code>
(async () => {
  const data = await fetch(url);
  console.log(data);
})();
</code></pre>

<p>
This creates an async function, executes it immediately, and gives us a place where <strong>await</strong> can be used.
</p>


<hr>



<h3>Callback Queue vs Macrotask Queue</h3>

<p>
At first, we referred to it as the <strong>Callback Queue</strong> because it stores callbacks waiting to run.
</p>

<p>
As our mental model becomes more precise, we usually call it the <strong>Macrotask Queue</strong>.
In practice, these names often refer to the same queue.
</p>

<p>
The distinction becomes important once JavaScript introduces another queue: the <strong>Microtask Queue</strong>.
</p>

<br>

<p>
The <strong>Macrotask Queue</strong> mainly stores traditional callback-based work such as <strong>setTimeout</strong>, <strong>setInterval</strong>, and <strong>DOM events</strong>.
</p>
<p>
The <strong>Microtask Queue</strong> is primarily used by <strong>Promises</strong> and the mechanisms built on top of them, such as <strong>.then()</strong> and <strong>await</strong>.
</p>


<pre><code>
Queues
│
├─ Macrotask Queue (callback Queue)
│   ├─ setTimeout
│   ├─ setInterval
│   └─ DOM Events
│
└─ Microtask Queue
    ├─ Promise.then
    ├─ Promise.catch
    ├─ Promise.finally
    └─ async function continuation (from await)
</code></pre>

<p>
The Event Loop can now choose between two queues, it always gives priority to the <strong>Microtask Queue</strong>.
</p>


<h4>Microtask Queue: .then() vs await</h4>

<p>
Both <strong>.then()</strong> and <strong>await</strong> are connected to the <strong>Microtask Queue</strong>, but they interact with it in different ways.
</p>

<p>
<strong>.then()</strong> directly schedules a callback into the Microtask Queue when the Promise resolves.
</p>

<pre><code>
promise.then(handler)

→ when promise resolves
→ handler goes into Microtask Queue
</code></pre>

<p>
<strong>await</strong> does not itself enter the queue. Instead, it pauses the execution of an <strong>async function</strong>. When the Promise resolves, the remaining part of that function is resumed through a Microtask.
</p>

<pre><code>
const data = await promise;

→ function pauses here
→ when promise resolves
→ function resumes via Microtask Queue
</code></pre>

<p>
So the key difference is:
</p>

<p>
<strong>.then()</strong> schedules a callback directly, while <strong>await</strong> pauses execution and resumes the function later using the Microtask Queue under the hood.
</p>


<div class="img-container">
<img class="content-img" src="./assets/async/4.Microtask-Queue.jpg" alt="macro task queue">
</div>

<hr>

<h3>Back to the Dashboard Problem (Car Configurator)</h3>

<p>
This entire breakdown came from a bug I hit while building the Dashboard in the Car Configurator project mentioned at the start.
</p>

<p>
At that time, I didn’t understand why the UI was rendering before the data arrived — now the reason should be clear.
</p>

<p>
The fix was simple: control the timing of data access using <strong>await</strong>.
</p>



<h4>Why I MUST use await in the Dashboard</h4>

<p>
In the dashboard, I need to load saved configurations before rendering the UI.
That data comes from <strong>fetchConfigs()</strong>, which returns a <strong>Promise</strong>.
</p>

<pre><code>
const createDashboard = async () => {
  const configs = await fetchConfigs();

  div.innerHTML =
    configs.map(config => createConfigCard(config)).join("");
};
</code></pre>

<p>
The key point here is order of execution.
</p>

<p>
With <strong>await</strong>, JavaScript pauses inside this function until the Promise resolves.
That means <strong>configs is guaranteed to exist</strong> before it is used in <strong>innerHTML</strong>.
</p>

<p>
So the data flow is linear:
fetch data → wait → render UI.
</p>

<br>

<p>
If I used <strong>.then()</strong> instead, the execution would not pause.
JavaScript would continue immediately to the next line, and the UI rendering logic would run before the data is ready.
</p>
<br>
<p>
❌ This is wrong because the code outside the <strong>.then()</strong> runs immediately, before the async data arrives, which breaks the rendering flow.
</p>

<pre><code>
fetchConfigs().then(configs => {
  div.innerHTML = 
  configs.map((config) => createConfigCard(config)).join("")
});

div.innerHTML = "..."; // runs immediately
</code></pre>

<p>
In this structure, the rendering logic must be moved inside the callback, breaking the linear flow of the function.
</p>

<br>

<p>
So in this case, <strong>await is not optional</strong> — it is what allows the function to behave in a predictable top-to-bottom flow while still being asynchronous under the hood.
</p>
<br>
<p>
This entire flow started as a real bug in the Dashboard of the Car Configurator project — the same system that forced me to understand async behavior properly.
</p>

<p>
<a class="accent-link" href="#/projects/car-configurator">View the Car Configurator project</a>
</p>


<hr>

<h3>Final Mental Model</h3>

<p>
Async JavaScript is not about choosing between <strong>.then()</strong> and <strong>await</strong> in terms of capability — both handle Promises.
</p>

<p>
The real difference is how you structure control flow.
</p>

<p>
Use <strong>.then()</strong> when you are treating an async result as an event and you don’t care about linear flow.
</p>

<p>
Use <strong>await</strong> when the next lines of code depend on the result and you want execution to behave like a top-to-bottom sequence.
</p>

<br>

<p>
In other words:
</p>

<p>
If your logic must wait for data before continuing, <strong>await gives you sequential control inside an async function</strong>.
</p>

<p>
If your logic can continue immediately and react later, <strong>.then() attaches that reaction without blocking the flow</strong>.
</p>


</article>
`;
};

export default async;
