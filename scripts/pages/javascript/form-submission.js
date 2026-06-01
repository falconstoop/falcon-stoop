//
const root = document.getElementById("root");
//

const formSubmission = () => {
  root.innerHTML = `
<article class="content">

<h2>HTML Form Submission</h2>

<div class="blockquote-wrapper">
<blockquote>
    <p>"He who fears being conquered is sure to defeat." </p>
    <footer>— Napoleon Bonaparte ⚔️ —</footer>
    <p class="quote-twist">
     I didn't fear the bugs. I documented them...
    </p>
</blockquote>
</div>


<h3>What Really Happens When You Press Enter</h3>

<p>
Form submission seems simple. You fill in some fields. You press Enter. The form submits. But buried inside that single keystroke is a set of rules most developers never stop to learn — rules that determine <strong>whether</strong> a form submits, <strong>which</strong> button triggers it, and <strong>what</strong> data gets sent to the server.
</p>

<p>
This page is a complete reference — every scenario, every combination, every silent rule the browser follows when you press Enter or click a button inside a form.
</p>

<hr>


<p>
This page exists because of a bug. While building my <a class="accent-link" href="#/projects/multi-steps-form">Multi-Steps Form</a>, a yellow warning appeared in the console: 
</p>
<br>
<pre><code>Form submission canceled because the form is not connected.</code></pre>
<br>
<p>
The form worked, but the warning bothered me. I traced it back to a set of rules I had never learned — rules about input counts, button types, and what the Enter key actually does inside a form.
</p>

<p>
What follows is everything I learned. I couldn't find a single place that explained all of this clearly — not MDN, not tutorials, not blogs. So I became that place. Every scenario tested. Every rule documented. This is the reference I wish I had when the warning first appeared.
</p>


<hr>

<h3>The Foundational Rule: Input Count Matters</h3>

<p>
Before we add any buttons, there's a rule baked into the HTML specification that catches most developers off guard:
</p>

<p>
<strong>• Exactly 1 input → Enter key submits the form.</strong>
<br>
<strong>• 2 or more inputs → Enter key does nothing.</strong>
</p>

<p>
This rule applies regardless of input type — text, password, email, number — it doesn't matter. The browser counts the inputs. One input? Enter works. Two or more? It doesn't.
</p>

<pre><code>&lt;!-- 1 input → Enter submits --&gt;
&lt;form&gt;
  &lt;input type="text" /&gt;
&lt;/form&gt;

&lt;!-- 2+ inputs → Enter does nothing --&gt;
&lt;form&gt;
  &lt;input type="text" /&gt;
  &lt;input type="password" /&gt;
&lt;/form&gt;</code></pre>

<p>
<strong>Why?</strong> The browser assumes a single input means a search box or quick entry — just type and go. Multiple inputs imply a more complex form that might not be ready until the user clicks a deliberate button. It's a heuristic, not a bug.
</p>

<hr>

<h3>Inputs + One Button: The Four Scenarios</h3>

<p>
Add a button to the form, and the rules shift. The button's <strong>type</strong> attribute — <strong>submit</strong> vs. <strong>button</strong> — changes everything:
</p>

<br>

<h4>Scenario 1: 1 input + 1 submit button</h4>

<pre><code>&lt;form&gt;
  &lt;input type="text" /&gt;
  &lt;button type="submit"&gt;Send&lt;/button&gt;
&lt;/form&gt;</code></pre>

<p>
<strong>Enter on input →</strong> Submits.
<br>
<strong>Click on button →</strong> Submits.
</p>

<br>

<h4>Scenario 2: 2+ inputs + 1 submit button</h4>

<pre><code>&lt;form&gt;
  &lt;input type="text" /&gt;
  &lt;input type="password" /&gt;
  &lt;button type="submit"&gt;Send&lt;/button&gt;
&lt;/form&gt;</code></pre>

<p>
<strong>Enter on any input →</strong> Submits.
<br>
<strong>Click on button →</strong> Submits.
</p>

<p>
<strong>Key insight:</strong> A submit button overrides the input count rule. Even with 2+ inputs, Enter now submits — because the browser sees a submit button and assumes you're ready.
</p>

<br>

<h4>Scenario 3: 1 input + 1 button (type="button")</h4>

<pre><code>&lt;form&gt;
  &lt;input type="text" /&gt;
  &lt;button type="button"&gt;Cancel&lt;/button&gt;
&lt;/form&gt;</code></pre>

<p>
<strong>Enter on input →</strong> Submits (the 1-input rule still applies).
<br>
<strong>Click on button →</strong> Nothing. <strong>type="button"</strong> never submits.
</p>

<br>

<h4>Scenario 4: 2+ inputs + 1 button (type="button")</h4>

<pre><code>&lt;form&gt;
  &lt;input type="text" /&gt;
  &lt;input type="password" /&gt;
  &lt;button type="button"&gt;Cancel&lt;/button&gt;
&lt;/form&gt;</code></pre>

<p>
<strong>Enter on any input →</strong> Nothing.
<br>
<strong>Click on button →</strong> Nothing.
</p>

<p>
With 2+ inputs and no submit button, the form has no way to submit through Enter or click. The form is effectively inert — waiting for JavaScript to trigger submission manually.
</p>

<br>

<h4>Quick Reference: Inputs + 1 Button</h4>

<pre><code>┌────────┬──────────────┬──────────────────┬──────────────────┐
│ Inputs │ Button Type  │ Enter on Input   │ Click on Button  │
├────────┼──────────────┼──────────────────┼──────────────────┤
│   1    │   submit     │    ✅ Submits    │    ✅ Submits    │
│   2+   │   submit     │    ✅ Submits    │    ✅ Submits    │
│   1    │   button     │    ✅ Submits    │    ❌ Nothing    │
│   2+   │   button     │    ❌ Nothing    │    ❌ Nothing    │
└────────┴──────────────┴──────────────────┴──────────────────┘</code></pre>

<hr>

<h3>Inputs + Multiple Buttons: The Hidden Rule</h3>

<p>
When a form contains multiple submit buttons, a subtle rule emerges — one that determines <strong>which</strong> button gets triggered on Enter:
</p>

<p>
<strong>If any submit button exists, Enter always submits using the first submit button in the DOM order.</strong>
</p>

<p>
This rule holds regardless of how many inputs, how many buttons, or where the user is focused. The first submit button in the HTML is the one that fires on Enter. Always.
</p>

<br>

<h4>Scenario 1: 1 input + multiple submit buttons</h4>

<pre><code>&lt;form&gt;
  &lt;input type="text" /&gt;
  &lt;button type="submit" name="action" value="save"&gt;Save&lt;/button&gt;
  &lt;button type="submit" name="action" value="delete"&gt;Delete&lt;/button&gt;
&lt;/form&gt;</code></pre>

<p>
<strong>Enter on input →</strong> Submits with <strong>Save</strong> (the first submit button).
<br>
<strong>Click on Save →</strong> Submits with <strong>Save</strong>.
<br>
<strong>Click on Delete →</strong> Submits with <strong>Delete</strong>.
</p>

<br>

<h4>Scenario 2: 2+ inputs + multiple submit buttons</h4>

<p>
Same behavior as Scenario 1. Enter always uses the first submit button. Clicks use whichever button was clicked.
</p>

<br>

<h4>Scenario 3: 1 input + mix of submit and button types</h4>

<pre><code>&lt;form&gt;
  &lt;input type="text" /&gt;
  &lt;button type="submit"&gt;Save&lt;/button&gt;
  &lt;button type="button"&gt;Cancel&lt;/button&gt;
&lt;/form&gt;</code></pre>

<p>
<strong>Enter on input →</strong> Submits (uses Save — the first submit).
<br>
<strong>Click on Save →</strong> Submits.
<br>
<strong>Click on Cancel →</strong> Nothing. <strong>type="button"</strong> never submits.
</p>

<br>

<h4>Scenario 4: 2+ inputs + mix of submit and button types</h4>

<p>
Same as Scenario 3. Enter uses the first submit button. Button types remain inert.
</p>

<br>

<h4>Scenario 5: Inputs + only button types (no submit button)</h4>

<pre><code>&lt;form&gt;
  &lt;input type="text" /&gt;
  &lt;button type="button"&gt;Do Something&lt;/button&gt;
  &lt;button type="button"&gt;Cancel&lt;/button&gt;
&lt;/form&gt;</code></pre>

<p>
<strong>1 input →</strong> Enter submits (the 1-input rule kicks in), but click does nothing on any button.
<br>
<strong>2+ inputs →</strong> Enter does nothing. Click does nothing. The form is completely inert — only JavaScript can trigger submission.
</p>

<br>

<h4>Quick Reference: Inputs + Multiple Buttons</h4>

<pre><code>┌────────┬─────────────────┬──────────────────────┬──────────────────┬──────────────────────┐
│ Inputs │ Button Types    │ Enter on Input       │ Click on Submit  │ Click on Button      │
├────────┼─────────────────┼──────────────────────┼──────────────────┼──────────────────────┤
│   1    │ Submit only     │ ✅ First submit      │ ✅ Submits       │         -            │
│   2+   │ Submit only     │ ✅ First submit      │ ✅ Submits       │         -            │
│   1    │ Mix of both     │ ✅ First submit      │ ✅ Submits       │     ❌ Nothing       │
│   2+   │ Mix of both     │ ✅ First submit      │ ✅ Submits       │     ❌ Nothing       │
│   1    │ Button only     │ ✅ Submits (1 input) │        -         │     ❌ Nothing       │
│   2+   │ Button only     │ ❌ Nothing           │        -         │     ❌ Nothing       │
└────────┴─────────────────┴──────────────────────┴──────────────────┴──────────────────────┘</code></pre>

<hr>

<h3>The Five Core Rules</h3>

<p>
Everything on this page reduces to five unbreakable rules:
</p>

<p>
<strong>1. 1 input alone →</strong> Enter always submits.
<br>
<strong>2. 2+ inputs alone →</strong> Enter never submits.
<br>
<strong>3. Submit button present →</strong> Enter always submits — using the <strong>first</strong> submit button in DOM order.
<br>
<strong>4. type="button" →</strong> Never submits. Not on click. Not on Enter. Not ever.
<br>
<strong>5. Click on submit button →</strong> Always submits with that specific button's name and value.
</p>

<hr>

<h4>What This Taught Me</h4>
<p>
Form submission is not magic. It's a deterministic set of rules baked into the HTML specification — rules most developers never take the time to learn. I learned them because my multi-step form broke in ways I couldn't explain. The Enter key submitted when it shouldn't have. Buttons fired when they weren't supposed to. I traced every bug back to one of these five rules.
</p>

<p>
Now when I build a form — any form — I know exactly what will happen when the user presses Enter. That's not attention to detail. That's the bare minimum, finally understood.
</p>

<hr>

<p>
<em>This reference was built while debugging form behavior in my <a class="accent-link" href="#/projects/multi-steps-form">Multi-Steps Form</a> case study.</em>
</p>



</article>
  `;
};

export default formSubmission;
