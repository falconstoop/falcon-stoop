//
const root = document.getElementById("root");
//

const closure = () => {
  root.innerHTML = `
<article class="content">
<h2>CLOSURE</h2>

<div class="blockquote-wrapper">
<blockquote>
    <p>
    "Absorb what is useful, discard what is useless, add what is specifically your own." 
    </p>
    <footer>— Bruce Lee 🥋 —</footer>
    <p class="quote-twist">
     I absorbed from Courses and from my own errors. I discarded the noise. The backpack became specifically my own.
    </p>
</blockquote>
</div>



<h3>What is Closure!?</h3>
<p>
A function born inside another function never forgets where it came from. If the inner function reaches out and uses a variable from its parent, that bond becomes a closure — and it holds onto that variable even after the parent is gone. If the inner function never touches a parent variable, no closure is formed. It's just a function that happened to be born inside.
<br>
<strong>The difference:</strong> Closure is not about being inside. It's about needing something from the outside. Reach out → closure. Stay self-contained → no closure.
</p>

<hr>

<h4>Below are some functions from my <strong><em><u> Multiple-steps Form app</u></em></strong>. The link to access the app is provided below.</h4>

<p>For example, let's say we're building an auth page that switches between login and signup forms in one route. We create a parent function called auth that controls which form is shown.</p>
<p><strong>No closure here:</strong></p>
<pre><code>const auth = () => {
  root.innerHTML = "";

  const switchForm = (type) => {
    formType = type;
    auth();
  };

  if (formType === "login") createLogin(switchForm);
  else if (formType === "signup") createSignup(switchForm);
};</code></pre>

<p>
switchForm is born inside auth, but it doesn't reach out to any variable from auth. Everything it uses (formType, auth) is from the global scope, not from auth's local scope. So no closure is formed. It's just a function that happens to be inside another.
</p>
<br>
<p>But in the same module of that app, we have another function that applied closure</p>
<p><strong>Now closure applied:</strong></p>
<pre><code>const createLogin = (onSwitch) => {
  const form = document.createElement("form");

  form.innerHTML = \`
    <p>Don't have an account? <button class="signup-link">Sign Up Button</button></p>
  \`;

  form.querySelector(".signup-link").addEventListener("click", () => {
    onSwitch("signup");
  });
};
</code></pre>

<p>
The arrow function inside addEventListener is born inside createLogin. It reaches out and uses onSwitch — a variable from its parent createLogin. That creates a closure. Even after createLogin finishes running and returns, that little arrow function still holds onto onSwitch. When the user clicks the button, it calls onSwitch perfectly — because closure never forgot.
</p>

<h3>When Does Closure Apply?</h3>
<p>Closure applies whenever a function is defined inside another function and references variables from the outer scope. It doesn't matter what type the outer function is — higher-order, callback, module, or plain function. If an inner function uses outer variables, a closure is created.
<br>
<strong>The Rule:</strong> Inner functions always remember the scope they were born in. That's closure. Always, no exceptions.
</p>
<br>
<p>For the full code and to see this pattern in action, visit:</p>

<hr>

<h3>Let's dive deeper, inspired by examples from "Will Sentance, FrontendMasters course".</h3>

<p>
When a function is called, JavaScript breathes life into something remarkable — a living, breathing data store known as <strong>local memory</strong>. You might hear it called the <strong>variable environment</strong>, and that name is wonderfully descriptive. Think of <strong>"environment"</strong> as the world that surrounds you — in this case, it's the universe of variables, the content, the data that exists and hums with life around every line of code inside that function.

Some call it the function's <strong>state</strong> — a snapshot of the application's data in that very moment, the living pulse of information that the function holds and carries. It's the now of your data, the current reality that exists exclusively within the function's execution context, waiting to be shaped, read, or transformed. This local memory is temporary, intimate, and profoundly alive — born the instant the function is called, and gently released when its work is done.
</p>
<br>
<h4>Let's step into the world of a function:</h4>

<pre><code>function createFunction() {
  function multiplyBy2(num) {
    return num * 2;
  }
  return multiplyBy2
}

const generatedFunc = createFunction();
const result = generatedFunc(3)
</code></pre>

<p>
Now, here's where the magic — and the common misconception — lives. When we reach that final line and call <strong>generatedFunc(3)</strong>, most of us don't feel even a flicker of connection back to <strong>createFunction</strong>. Why would we? Look at the line before it: <strong>generatedFunc</strong> is simply the output of running <strong>createFunction</strong> one single time. Whatever came out of that one-time execution — that's what gets stored. That's what <strong>generatedFunc</strong> becomes. Nothing more, nothing less.
<br>
Something in us instinctively feels a lingering connection between <strong>generatedFunc(3)</strong> and <strong>createFunc</strong> — as if it still somehow knows the world it came from.
<br>
Surely, <strong>generatedFunc(3)</strong> has cut all ties with <strong>createFunction</strong> forever. It will never reach back. It will never remember. It will never know anything about where it came from.
</p>
<br>
<p>
The line <strong>generatedFunc</strong> is the output of running <strong>createFunction</strong>, created an <strong>execution context</strong> for running <strong>createFunction</strong>, a new local memory in which we define <strong>multiplyBy2</strong>. We then grab that function's code, returned it out to <strong>generatedFunc</strong> and literally in memory will be stored the code <strong>(num) => num * 2</strong>.
So when JS looks at <strong>generatedFunc</strong>, it completely forgot <strong>createFunction</strong> ran. All it's doing is seeing that function definition: <strong>(num) => num * 2</strong>. 
</p>
<p>
But we go up and look up the page, Because it gives us the impression that in some way <strong>generatedFunc</strong> is connected to  <strong>createFunction</strong>. If we truly understand there is no relation and it's not the case, we'll help us understand closure under the hood.
</p>
<br>

<h4>Let's explore another function from the inside, where the seeds of closure are quietly planted</h4>
<pre><code>function outer () {
  let counter = 0;
  function add1 () {
    counter ++;
  }
  add1() 
  // where you define your functions 
  // determines what data 
  // it has access to when you call it

  }
  outer()
</code></pre>

<p>Let's go deep behind the scenes of this function.
<br>
1. We declare a function called <strong>outer</strong> in the global <em>execution context</em>. JavaScript doesn't peek inside — it simply registers the label and moves on, leaving the inner code untouched for now.
<br>
2. Then JavaScript spots those parentheses — a call to <strong>outer()</strong> (last line) — and springs into action. A brand new <em>execution context</em> is born. <strong>outer</strong> is placed gently onto the <em>callstack</em>.
<br>
3. The Thread of execution weaves its way inside.
<br>
4. The first thing stitched into the local memory of this fresh <em>execution context</em> is a variable called counter, cradling the value 0.
<br>
5. Still within local memory, JavaScript declares a function called <strong>add1</strong>. Again, JavaScript does not wander inside — it simply notes the definition and waits.
<br>
6. Then <strong>add1()</strong> is called — those parentheses again — and JavaScript creates yet another <em>execution context</em>, nested within <strong>outer</strong>'s. <strong>add1</strong> is placed on top of <strong>outer</strong> in the <em>callstack</em>. The Thread of execution now weaves into <strong>add1</strong>. We know that when <strong>add1</strong> finishes, it will be popped off the <em>callstack</em> and we'll return back to <strong>outer</strong>.
<br>
7. Inside <strong>add1</strong>, we face counter. It's time to add 1 to its current value. But first, JavaScript searches <strong>add1</strong>'s own local memory — and finds nothing. So it looks outward, climbing up to <strong>outer</strong>'s local memory, and there it is: the counter variable, waiting.
<br>
8. <strong>add1</strong> finishes its work. Its <em>execution context</em> quietly closes, and it's popped off the <em>callstack</em>.
<br>
9. We fall back into <strong>outer</strong>, but there's nothing left to do. <strong>outer</strong>, too, is popped off the <em>callstack</em>, and we return home — back to the global <em>execution context</em>.
</p>
<br>
<p> But now a quiet question whispers in: how does <strong>add1</strong> know to look upward into <strong>outer</strong> to find the <strong>counter</strong> variable? 
<br> 
Is it because it was <em>defined</em> inside <strong>outer</strong>? Or because it was <em>invoked</em> inside <strong>outer</strong>? 
<br> 
The clue is hidden in a small but profound shift — instead of invoking <strong>add1</strong> inside <strong>outer</strong>, we <em>return</em> it. Then we invoke it in global, far away from its birthplace. 
<br> 
We'll take a deep dive into this mystery in the next function. The answer changes everything. 
</p>

<img class="outerFunction-img-closure" src="./assets/closure/outer-function.svg" alt="img of the process in outer function">

<h4>
Here, a function will do something remarkable — it will leave home and take home with it:
</h4>
<p>
The same <strong>outer</strong>  function, but now we return <strong>add1</strong> instead of invoking it...
</p>

<pre><code>function outer () {
  let counter = 0;
  function add1 () {counter ++}
  return add1;
}
const newFunc = outer();
newFunc()
newFunc()
</code></pre>

<p>
1. We declare a function called <strong>outer</strong> in the global <em>execution context</em>. JavaScript registers the function label and moves on — the code inside remains untouched, waiting.
<br>
2. Then JavaScript hits const newFunc = outer(). Those parentheses spark a brand new <em>execution context</em>. <strong>outer</strong> is placed gently onto the <em>callstack</em>.
<br>
3. The Thread of execution weaves its way inside <strong>outer</strong>.
<br>
4. First into <strong>outer</strong>'s local memory: a variable called counter, cradling the value 0.
<br>
5. Still within local memory, JavaScript declares a function called <strong>add1</strong>. Again, JavaScript does not wander inside — it simply stores the definition and waits.
<br>
6. Now the critical moment: return <strong>add1</strong>. JavaScript reaches for <strong>add1</strong> and hands it back. Not the result of calling it — the function itself. <strong>outer</strong>'s <em>execution context</em> has finished its work.
<br>
7. But here's the breathtaking part — when <strong>outer</strong> is popped off the <em>callstack</em> and its <em>execution context</em> closes, <strong>add1</strong> doesn't walk away empty-handed. It quietly packs a backpack. Inside that backpack? The entire local memory of <strong>outer</strong> — including counter: 0.
<br>
8. Back in global, newFunc now holds <strong>add1</strong> — and its hidden backpack. The counter value lives on, even though <strong>outer</strong> is long gone.
<br>
9. We call newFunc(). A fresh <em>execution context</em> is born for <strong>add1</strong>. It's placed onto the <em>callstack</em>.
<br>
10. Inside <strong>add1</strong>, we face counter++. JavaScript searches <strong>add1</strong>'s own local memory — nothing. But then it doesn't climb upward in the <em>callstack</em> (which is empty below global). It reaches into the backpack — <strong>outer</strong>'s preserved local memory — and finds counter. 0 becomes 1.
<br>
11. <strong>add1</strong> finishes. Its <em>execution context</em> closes. It's popped off the <em>callstack</em>. But the backpack remains.
<br>
12. We call newFunc() again. Same dance — but now counter in the backpack is 1. so 1 becomes 2.
<br>
13. <strong>add1</strong> finishes again. The backpack endures. Quietly. Faithfully. Forever.

</p>
<br>



<h4>
What is the Garbage Collector? + The <strong>"C.O.V.E"</strong> | <strong>"P.L.S.R.D"</strong>
</h4>
<p> Now is the perfect moment to meet the <strong>Garbage Collector</strong>. 
<br> 
If <strong>outer</strong> held other variables inside it — ones that <strong>add1</strong> never even glances at — <strong>add1</strong> doesn't care about them. It only takes what it needs. The variables references are the ones that quietly slip into the backpack. The rest? They are gently swept away, erased from memory. This is the work of the <strong>Garbage Collector</strong> — a silent janitor that clears out anything no longer needed. 
</p>
<pre><code>function outer () { 
let counter = 0; 
const amount = 10; 
let sum = 5; 
function add1 () {counter ++} return add1 } 
const newFunc = outer(); 
newFunc() 
</code></pre>
<p> 
The function above is a perfect portrait of the <strong>Garbage Collector</strong> at work. 
<br> 
Only the <em>counter</em> variable goes with <strong>add1</strong> — because it's the only one used inside <strong>add1</strong>. The other variables — <em>amount</em> and <em>sum</em> — are left behind. The <strong>Garbage Collector</strong> sees them, knows no one needs them anymore, and quietly removes them from memory. 
<br> 
The variable that survives — the one carried into the backpack — has two beautiful names: <strong>"C.O.V.E"</strong> (Closed Over Variable Environment) or <strong>"P.L.S.R.D"</strong> (Persistent Lexical Scoped Reference Data). 
</p>
<br> 
<p> <strong>"C.O.V.E"</strong> = <strong>"P.L.S.R.D"</strong> = Backpack 🎒 
<br> 
They all point to the same hidden treasure. The overarching concept is called <em>Closure</em> — though some people use "closure" to mean the backpack itself, the data it carries, or the entire mechanism. All roads lead to the same breathtaking truth. 
</p>

<h4>Lexical Scope vs. Dynamic Scope</h4> 
<p> 
<strong>Lexical (Static) Scoping:</strong> A function has access to data from where it was <em>born</em> — where it was defined, not where it was called. 
<br> <strong>Dynamic Scoping:</strong> A function only has access to data from where it was <em>invoked</em>. The call site determines everything. The birthplace — irrelevant. 
</p> 
<p>
 JavaScript uses <strong>Lexical Scoping</strong>. This is precisely why closure exists — the bond is to the birthplace, not the call site. That is everything. 
</p>
<hr>

<h4>In the End, Closure Is a Kind of Memory</h4>
<p>
A function born inside another, reaching outward for something it needs — and holding on long after the parent has gone. That's closure. Not magic. Just JavaScript doing something profoundly human: remembering.
<br>
Where you're born defines what you can reach. Not where you end up.
</p>


</article>
`;
};

export default closure;
