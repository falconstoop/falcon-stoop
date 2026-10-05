//
const root = document.getElementById("root");
//
const reusableLayoutComponents = () => {
  root.innerHTML = `
<article class="content">

<h2>Reusable Layout Components</h2>


<div class="blockquote-wrapper">
<blockquote>
    <p>"Do nothing that is of no use." </p>
    <footer>— Miyamoto Musashi ⚔️ —</footer>
    <p class="quote-twist">
     Writing the same CSS twice is of no use. <br>
     One component, adjusted with data attributes, serves every section.
    </p>
</blockquote>
</div>


<pre><code>REUSABLE LAYOUT COMPONENTS PAGE
├── One Component, Many Variations
│   ├── Consistency
│   ├── Responsiveness
│   └── Variable Card Counts
│
├── The Layout Components
│   ├── .section — Vertical Space Between Sections
│   │   ├── Custom Property (--section-padding)
│   │   ├── Default Behavior
│   │   ├── Modifier — data-padding-block="large"
│   │   └── Custom Modifiers (small, large, x-large)
│   │
│   └── .wrapper — Width and Horizontal Padding
│       ├── Default Behavior
│       ├── Modifier — data-width="wide"
│       ├── Modifier — data-width="narrow"
│       └── Modifier — data-padding-inline="none"
│
├── The Grid Components
│   ├── 1. .grid-equal-cols (Static — Switches at Breakpoint)
│   │   ├── How It Works
│   │   ├── How It Responds
│   │   └── When to Use It
│   │
│   ├── 2. .grid-auto-fit (Dynamic — Adapts Continuously)
│   │   ├── How It Works
│   │   ├── How It Responds
│   │   └── When to Use It
│   │
│   └── The Difference in One Line
│
├── Deep Dive — The Full Components
│   ├── 1. .grid-equal-cols
│   │   ├── Understanding grid-auto-flow
│   │   ├── Understanding grid-auto-columns
│   │   ├── Why Not grid-template-columns
│   │   ├── Important Note — Variable Card Counts
│   │   └── Modifiers
│   │
│   └── 2. .grid-auto-fit
│       ├── auto-fit vs. auto-fill
│       ├── Understanding the grid-template-columns Line
│       ├── Why This Replaces Media Queries
│       └── Modifiers
│
├── Data Attributes vs. Classes
│   ├── 1. Modifier Classes (Pros & Cons)
│   ├── 2. Data Attributes (Pros & Cons)
│   ├── Side-by-Side Comparison
│   └── Why This Page Uses Data Attributes
│
└── The JavaScript Side
    ├── Selecting by Class
    ├── Selecting by Data Attribute
    ├── Why Data Attributes Are Often Better
    └── Event Delegation with Data Attributes</code></pre>


<h3>One Component, Many Variations</h3>

<p>
Every website has many sections. Each section has its own padding, margins, width etc. Writing them one by one wastes half your CSS time on repetition — and the other half fixing what drifted out of sync
</p>

<p>
This page documents a different approach — one I learned from <strong>Kevin Powell's: <em>"Build a Website from Scratch"</em></strong> course on <strong>FrontendMasters</strong>. 
<br>
Instead of styling each section separately, I wrote a small set of reusable layout components: <strong>.section</strong> handles the vertical space between sections, and <strong>.wrapper</strong> handles the width and horizontal padding of the content inside. Adjusting them with data attributes based on what each section needs — and every part of the site stays consistent without ever repeating the same CSS twice.
</p>
<br>
<p>
There are three reasons this approach works:
</p>
<br>
<p>
<strong>1. Consistency:</strong>
<br>
Writing the component once. Using it everywhere. No drift between sections, no forgotten padding, no "why does this one look different?" moments six months later.
</p>
<br>
<p>
<strong>2. Responsiveness:</strong>
<br>
Instead of writing separate media queries for every section, the components handle breakpoints internally. <strong>Data attributes</strong> control the behavior at each viewport — a <strong>grid</strong> stacks on mobile, becomes columns on desktop, and adjusts its gap without a single new CSS rule. One component, responsive by default, adjusted per use case.
</p>
<br>
<p>
<strong>3. Variable card counts:</strong>
<br>
Different parts of a site hold different numbers of cards — a hero with two, a features section with four, a gallery with any number at all. Instead of writing a new grid rule for each count, <strong>.grid-auto-fit</strong> and <strong>.grid-equal-cols</strong> let the browser decide how many columns fit. <strong>Data attributes</strong> control the minimum column size and the gap between them. One component. Any number of cards. No repeated CSS.
</p>

<hr>

<h3>The Layout Components</h3>
<h4>.section — Vertical Space Between Sections</h4>

<p>
Every section of a page needs breathing room — space above and below so content doesn't crowd together. Instead of writing <strong>padding-block</strong> on every section, one component handles it.
</p>

<pre><code>.section {
  /* default vertical padding */
  --section-padding: 2rem;
  padding-block: var(--section-padding);

  /* larger padding on bigger screens */
  &amp;[data-padding-block="large"] {
    @media (width &gt; 760px) {
      --section-padding: 6rem;
    }
  }
}</code></pre>

<p>
<strong>--section-padding</strong> is a <strong>custom property (CSS variable)</strong> — a named value that the rest of the component reads from. Instead of hardcoding <strong>2rem</strong> directly into <strong>padding-block</strong>, the value lives in one place. Change the variable, and everything that uses it updates.
</p>

<br>

<p><strong>1. Default behavior:</strong></p>
<p>
2rem of vertical padding. Works out of the box — just add the class.
</p>

<p><strong>2. Modifier — data-padding-block="large":</strong></p>
<p>
Bumps the padding to 6rem on screens wider than 760px. On mobile, it stays modest so content isn't pushed off-screen.
</p>

<br>

<p><strong>Usage:</strong></p>

<pre><code>&lt;section class="section"&gt;...&lt;/section&gt;
&lt;section class="section" data-padding-block="large"&gt;...&lt;/section&gt;</code></pre>

<p>
The media query lives inside the modifier — not scattered across the stylesheet. Larger screens get more space. Small screens stay compact. One rule. Two behaviors. No repetition.
</p>

<br>

<p>
This is the real power of the pattern. If a section needs different spacing — smaller, larger, or something in between — we don't touch the base component. We just add a new modifier:
</p>

<pre><code>.section {
  --section-padding: 2rem;
  padding-block: var(--section-padding);

  &amp;[data-padding-block="small"] {
    --section-padding: 1rem;
  }

  &amp;[data-padding-block="large"] {
    @media (width &gt; 760px) {
      --section-padding: 6rem;
    }
  }

  &amp;[data-padding-block="x-large"] {
    @media (width &gt; 760px) {
      --section-padding: 10rem;
    }
  }
}</code></pre>

<p>
Then in the HTML, apply only what each section needs:
</p>

<pre><code>&lt;section class="section"&gt;...&lt;/section&gt;                          &lt;!-- default 2rem --&gt;
&lt;section class="section" data-padding-block="small"&gt;...&lt;/section&gt;  &lt;!-- 1rem --&gt;
&lt;section class="section" data-padding-block="large"&gt;...&lt;/section&gt;  &lt;!-- 6rem on desktop --&gt;
&lt;section class="section" data-padding-block="x-large"&gt;...&lt;/section&gt; &lt;!-- 10rem on desktop --&gt;</code></pre>

<p>
No new classes. No new components. Just data attributes — each one a variation. The section itself stays unchanged. The HTML decides how much space it needs.
</p>

<br>


<h4>.wrapper — Width and Horizontal Padding</h4>

<p>
While <strong>.section</strong> controls vertical space, <strong>.wrapper</strong> controls horizontal space. It centers content, limits how wide it can stretch, and adds padding from the screen edges on small screens.
</p>

<pre><code>.wrapper {
  /* default max width */
  --wrapper-max-width: 1100px;
  /* default horizontal padding */
  --padding-inline: 1rem;

  max-width: var(--wrapper-max-width);
  margin-inline: auto;
  padding-inline: var(--padding-inline);

  /* full-width variant */
  &amp;[data-width="wide"] {
    --wrapper-max-width: 100%;
  }

  /* narrow variant */
  &amp;[data-width="narrow"] {
    --wrapper-max-width: 600px;
  }

  /* remove horizontal padding */
  &amp;[data-padding-inline="none"] {
    --padding-inline: none;
  }
}</code></pre>

<br>

<p><strong>1. Default behavior:</strong></p>
<p>
1100px maximum width, centered with <strong>margin-inline: auto</strong>, plus 1rem of horizontal padding so content never touches the screen edge on mobile.
</p>

<p><strong>2. Modifier — data-width="wide":</strong></p>
<p>
Removes the max-width constraint. The wrapper stretches to fill its parent. Useful for full-bleed sections — hero banners, image galleries, or anything that should touch the edges.
</p>

<p><strong>3. Modifier — data-width="narrow":</strong></p>
<p>
Tightens the max-width to 600px. Perfect for text-heavy sections — articles, forms, or content that reads better in a narrow column.
</p>

<p><strong>4. Modifier — data-padding-inline="none":</strong></p>
<p>
Removes the horizontal padding entirely. Useful when a section already handles its own spacing, or when you want content to touch the edges without the default 1rem buffer.
</p>

<br>

<p><strong>Usage:</strong></p>

<pre><code>&lt;div class="wrapper"&gt;...&lt;/div&gt;                         &lt;!-- default 1100px --&gt;
&lt;div class="wrapper" data-width="wide"&gt;...&lt;/div&gt;        &lt;!-- full width --&gt;
&lt;div class="wrapper" data-width="narrow"&gt;...&lt;/div&gt;      &lt;!-- 600px --&gt;
&lt;div class="wrapper" data-padding-inline="none"&gt;...&lt;/div&gt; &lt;!-- no side padding --&gt;</code></pre>

<p>
Same component. Four variations. Each one controlled by a data attribute — no new classes, no new rules. The HTML decides which layout each section needs.
</p>

<br>

<hr>



<h3>The Grid Components</h3>

<p>
Two grid components. Both responsive. Both create columns. The difference is <strong>how they decide how many columns to create</strong>.
</p>

<br>

<h5>1- .grid-equal-cols (Static — Switches at Breakpoint)</h5>

<p>
<strong>How it works:</strong>
<br>
On mobile, items stack vertically — one per row. When the viewport crosses a specific width — 760px in this case — the grid switches to equal columns. The number of columns equals the number of items placed inside. Two items → two columns. Four items → four columns. Each column takes an equal share of the width.
</p>

<p>
<strong>How it responds:</strong>
<br>
This grid does not react to every window resize. It reacts to <strong>one specific breakpoint</strong> — a media query set at 760px. Below 760px, it stays stacked. Above 760px, it switches to columns. Nothing happens in between. The grid only has two states, and it moves between them when the viewport crosses that exact width. Change the breakpoint, and the behavior changes. But at any given viewport, the grid is in one of two fixed states.
</p>

<p>
<strong>When to use it:</strong>
<br>
Layouts where the item count is known and fixed. Feature lists, comparison sections, three-column content blocks, or any design where the number of items won't change.
</p>

<br>

<h5>2- .grid-auto-fit (Dynamic — Adapts Continuously to Window Resize)</h5>

<p>
<strong>How it works:</strong>
<br>
A minimum column width is set — for example, 260px. The browser fits as many columns as the container allows, each at least that wide. A wide screen fits more columns. A narrow screen fits fewer. The item count can be anything — 3 items or 30 — the grid adapts to the space, not the count.
</p>

<p>
<strong>How it responds:</strong>
<br>
This grid does not wait for a breakpoint. It recalculates <strong>on every single pixel of window resize</strong>. As the viewport grows, more columns fit into the row. As it shrinks, columns drop off. There are no media queries. There are no fixed states. The grid is in a constant, continuous state of adapting to whatever space is available — and it never stops adjusting until the window stops moving.
</p>

<p>
<strong>When to use it:</strong>
<br>
Card grids, galleries, dashboards, or any layout where the item count is variable and the viewport should decide how many columns fit.
</p>

<br>

<h5>The Difference in One Line</h5>

<pre><code>.grid-equal-cols → switches only when the viewport crosses a defined media query width
.grid-auto-fit  → recalculates continuously as the viewport resizes</code></pre>

<br>

<h5>Deep Dive — The Full Components</h5>

<h4>1- .grid-equal-cols</h4>

<pre><code>.grid-equal-cols {
  /* default gap between items */
  gap: var(--equal-cols-gap, 1rem);

  display: grid;

  /* switch to equal columns on desktop */
  @media (width &gt; 760px) {
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
  }

  &amp;[data-gap="large"] {
    --equal-cols-gap: 2rem;

    @media (width &gt; 760px) {
      --equal-cols-gap: 6rem;
    }
  }

  &amp;[data-gap="none"] {
    --equal-cols-gap: 0;
  }

  &amp;[data-align="center"] {
    align-items: center;
  }

  &amp;[data-justify-content="center"] {
    justify-content: center;
  }
}</code></pre>

<br>

<h5>Understanding the Two Grid Properties</h5>

<p>
Most CSS grid uses <strong>grid-template-columns</strong> to define columns explicitly:
</p>

<pre><code>grid-template-columns: 1fr 1fr 1fr;  /* 3 equal columns */</code></pre>

<p>
That works — until the item count becomes unknown. Two items? Four items? Six? A different rule would be needed for every count.
</p>

<p>
This component uses a different approach — two properties that let the grid figure out its own columns:
</p>

<br>

<p><strong>grid-auto-flow: column</strong></p>
<p>
Tells the grid to place items <strong>across columns</strong> instead of down rows. By default, grid fills rows first — item 1 goes to row 1, item 2 to row 2, and so on. With <strong>grid-auto-flow: column</strong>, items flow left to right instead.
</p>

<pre><code>/* Default flow (row) */          /* grid-auto-flow: column */
┌───┐                              ┌───┬───┬───┐
│ 1 │                              │ 1 │ 2 │ 3 │
├───┤                              └───┴───┴───┘
│ 2 │
├───┤
│ 3 │
└───┘</code></pre>

<br>

<p><strong>grid-auto-columns: 1fr</strong></p>
<p>
Defines how wide each auto-generated column should be. <strong>1fr</strong> means "one fraction of the available space." With three items, each column gets one-third. With four items, each gets one-fourth.
</p>

<pre><code>/* 3 items → 3 columns of 1fr each = 33.3% per column */
/* 4 items → 4 columns of 1fr each = 25% per column */</code></pre>

<p>
Together, these two properties mean: <strong>"Place items across columns, and make every column equal width — whatever the count."</strong>
</p>

<br>

<h5>Why Not Just Use grid-template-columns?</h5>

<p>
Because <strong>grid-template-columns</strong> requires a fixed number of columns:
</p>

<pre><code>grid-template-columns: repeat(3, 1fr);  /* Always 3 */</code></pre>

<p>
With 2 items, there are 3 columns — one stays empty. With 5 items, one wraps to a second row. The CSS would need to be rewritten every time the count changes.
</p>

<p>
With <strong>grid-auto-flow + grid-auto-columns</strong>, the grid adapts to whatever it receives. Two items? Two equal columns. Five items? Five equal columns. The CSS never changes.
</p>
<br>

<h5>Important note:</h5>
<p>
 This is what makes the component best suited for sites where each section holds a different number of cards. One rule. Every section. No repetition.
</p>


<br>

<h5>Modifiers</h5>

<p><strong>1. Default behavior:</strong></p>
<p>
Stacked on mobile, equal columns on desktop. 1rem gap between items.
</p>

<p><strong>2. data-gap="large":</strong></p>
<p>
Increases the gap to 2rem on mobile, 6rem on desktop. Useful for spacious layouts with fewer items.
</p>

<p><strong>3. data-gap="none":</strong></p>
<p>
Removes the gap entirely. Useful when items have their own padding or borders.
</p>

<p><strong>4. data-align="center":</strong></p>
<p>
Vertically centers items within their columns. Useful when items have different heights.
</p>

<p><strong>5. data-justify-content="center":</strong></p>
<p>
Horizontally centers the grid's content within its container. Useful when the grid doesn't fill the full width.
</p>

<br>

<p><strong>Usage:</strong></p>

<pre><code>&lt;div class="grid-equal-cols"&gt;...&lt;/div&gt;                          &lt;!-- default --&gt;
&lt;div class="grid-equal-cols" data-gap="large"&gt;...&lt;/div&gt;          &lt;!-- larger gap --&gt;
&lt;div class="grid-equal-cols" data-align="center"&gt;...&lt;/div&gt;       &lt;!-- center items --&gt;</code></pre>

<br>
<br>
<h4>2- .grid-auto-fit</h4>

<pre><code>.grid-auto-fit {
  /* minimum width each column can shrink to */
  --auto-fit-min-col-size: 260px;
  /* default gap */
  gap: var(--grid-auto-fit-gap, 2rem);

  display: grid;

  grid-template-columns: repeat(
    auto-fit,
    minmax(min(var(--auto-fit-min-col-size), 100%), 1fr)
  );

  &amp;[data-gap="no-gap"] {
    --grid-auto-fit-gap: 0;
  }

  &amp;[data-col-size="large"] {
    --auto-fit-min-col-size: 300px;
  }
}</code></pre>

<br>

<h5>auto-fit vs. auto-fill — The Difference That Matters</h5>

<p>
Both keywords tell the grid to generate as many columns as will fit. The difference is what happens to the <strong>empty space</strong> when there are fewer items than columns.
</p>

<p>
<strong>auto-fill</strong> creates as many columns as fit — even empty ones. The items stay in their original columns, and any leftover space remains as empty tracks.
</p>

<pre><code>/* auto-fill with 2 items in a wide container */
┌─────┬─────┬─────┬─────┐
│  1  │  2  │     │     │
└─────┴─────┴─────┴─────┘
        ↑ empty tracks remain</code></pre>

<p>
<strong>auto-fit</strong> also creates as many columns as fit — but <strong>collapses the empty ones</strong>. The remaining items stretch to fill the full width.
</p>

<pre><code>/* auto-fit with 2 items in a wide container */
┌───────────┬───────────┐
│     1     │     2     │
└───────────┴───────────┘
     ↑ items stretch to fill</code></pre>

<p>
For layout components like this, <strong>auto-fit</strong> is almost always the right choice. Three cards → they spread across the width. Five cards → they spread across the width. No awkward empty space. No items bunched to the left.
</p>

<br>

<h5>Understanding the grid-template-columns Line</h5>

<p>
This is the core of the component — and it looks intimidating at first. Breaking it down:
</p>

<pre><code>grid-template-columns: repeat(
  auto-fit,
  minmax(min(var(--auto-fit-min-col-size), 100%), 1fr)
);</code></pre>

<p><strong>repeat(auto-fit, ...)</strong></p>
<p>
"Repeat the column pattern as many times as it fits." The grid decides the count — not the developer.
</p>

<p><strong>minmax(...)</strong></p>
<p>
Each column has a minimum and maximum size. The column shrinks down to the minimum, then grows up to the maximum.
</p>

<p><strong>min(var(--auto-fit-min-col-size), 100%)</strong></p>
<p>
The minimum is either 260px — or 100% of the container, whichever is smaller. This prevents horizontal overflow on very small screens. If the screen is narrower than 260px, the column becomes 100% instead of forcing a scroll.
</p>

<p><strong>1fr</strong></p>
<p>
The maximum is one fraction of the available space. Columns share the space equally once they've all fit.
</p>

<p>
Together, this line means: <strong>"Fit as many columns as possible, each at least 260px wide, then share the remaining space equally."</strong>
</p>

<br>

<h5>Why This Replaces Media Queries</h5>

<p>
A traditional approach would require:
</p>

<pre><code>/* mobile */
grid-template-columns: 1fr;

/* tablet */
@media (width &gt; 500px) {
  grid-template-columns: 1fr 1fr;
}

/* desktop */
@media (width &gt; 900px) {
  grid-template-columns: 1fr 1fr 1fr;
}</code></pre>

<p>
Three rules. Two breakpoints. And more would be needed if the design changes. With <strong>auto-fit</strong> and <strong>minmax</strong>, the same behavior happens in one line — and it adapts to any screen without a single breakpoint being defined.
</p>

<br>

<h5>Modifiers</h5>

<p><strong>1. Default behavior:</strong></p>
<p>
Columns are at least 260px wide, 2rem gap. The grid fits as many columns as possible.
</p>

<p><strong>2. data-gap="no-gap":</strong></p>
<p>
Removes the gap between columns. Useful when items already have their own spacing.
</p>

<p><strong>3. data-col-size="large":</strong></p>
<p>
Increases the minimum column size to 300px. Useful for layouts with larger cards, images, or content that needs more breathing room.
</p>

<br>

<p><strong>Usage:</strong></p>

<pre><code>&lt;div class="grid-auto-fit"&gt;...&lt;/div&gt;                        &lt;!-- default 260px --&gt;
&lt;div class="grid-auto-fit" data-col-size="large"&gt;...&lt;/div&gt; &lt;!-- 300px minimum --&gt;
&lt;div class="grid-auto-fit" data-gap="no-gap"&gt;...&lt;/div&gt;     &lt;!-- no gap --&gt;</code></pre>

<hr>



<h3>The Rule</h3>
<p>
<strong>Write the component once. Adjust with data attributes. Never repeat the same layout twice.</strong>
</p>


<hr>




<h3>Data Attributes vs. Classes</h3>

<p>
When a component needs a variation — a narrower width, a larger gap, a different padding — there's more than one way to apply it. The two most common are <strong>modifier classes</strong> and <strong>data attributes</strong>. Both work. Both are used in production. But they behave differently in ways that matter as a project grows.
</p>

<br>

<h4>1. Modifier Classes</h4>

<pre><code>&lt;div class="wrapper wrapper--narrow"&gt;...&lt;/div&gt;</code></pre>

<pre><code>.wrapper {
  --wrapper-max-width: 1100px;
  max-width: var(--wrapper-max-width);
}

.wrapper--narrow {
  --wrapper-max-width: 600px;
}</code></pre>

<p>
<strong>How it works:</strong> A second class is added alongside the base class. The modifier class overrides the custom property.
</p>

<br>

<p><strong>Pros:</strong></p>
<p>
<strong>• Familiar</strong> — every CSS developer knows this pattern.
<br>
<strong>• Works everywhere</strong> — no browser quirks, no setup needed.
<br>
<strong>• Fine for small projects</strong> — one or two modifiers per component is manageable.
</p>

<br>

<p><strong>Cons — and they're significant:</strong></p>

<p>
<strong>• Class order matters, and the order is invisible.</strong> CSS specificity is not always about the order in the stylesheet — but modifier classes depend on it. If <strong>.wrapper--narrow</strong> is defined <em>above</em> <strong>.wrapper</strong> in the CSS file, the base class wins — and the modifier silently does nothing. The HTML looks correct. The CSS looks correct. But the variation never applies. Debugging this wastes hours.
</p>

<p>
<strong>• Specificity battles begin.</strong> When two modifier classes are used together — say <strong>.wrapper--narrow</strong> and <strong>.wrapper--padding-none</strong> — the order they're declared in the CSS file decides which one wins. As more modifiers are added, the rules start fighting each other. Developers reach for <strong>!important</strong> or deeper selectors to force a winner — and the CSS becomes fragile.
</p>

<p>
<strong>• The HTML gets noisy.</strong> A component with two variations carries three classes: <strong>wrapper wrapper--narrow wrapper--padding-none</strong>. Every additional variation adds another class. The base class is buried.
</p>

<p>
<strong>• Naming drifts.</strong> Is it <strong>wrapper--narrow</strong> or <strong>wrapper--small</strong>? <strong>wrapper--tight</strong> or <strong>wrapper--compact</strong>? Every team invents its own conventions, and every project invents different ones. The HTML becomes harder to scan over time.
</p>

<p>
<strong>• Hard to tell what's applied.</strong> Looking at <strong>class="wrapper wrapper--narrow wrapper--padding-none"</strong>, there's no clean way to see the settings at a glance. Classes blend together visually in the markup.
</p>

<br>

<h4>2. Data Attributes</h4>

<pre><code>&lt;div class="wrapper" data-width="narrow"&gt;...&lt;/div&gt;</code></pre>

<pre><code>.wrapper {
  --wrapper-max-width: 1100px;
  max-width: var(--wrapper-max-width);

  &amp;[data-width="narrow"] {
    --wrapper-max-width: 600px;
  }
}</code></pre>

<p>
<strong>How it works:</strong> The base class stays alone. A data attribute holds the variation. The CSS reads the attribute and applies the override — scoped inside the base class.
</p>

<br>

<p><strong>Pros:</strong></p>

<p>
<strong>• No class order problem.</strong> The modifier is nested inside the base class — <strong>&amp;[data-width="narrow"]</strong>. It only applies when the base class is present. There's no way for one modifier to override another unintentionally.
</p>

<p>
<strong>• No specificity battles.</strong> Each modifier is scoped to the base class. Two modifiers can coexist without fighting. The rules don't compete — they each adjust their own custom property.
</p>

<p>
<strong>• The HTML stays clean.</strong> One class for identity, data attributes for configuration. <strong>class="wrapper" data-width="narrow" data-padding-inline="none"</strong>. The base class stands out. Each setting is visible.
</p>

<p>
<strong>• Reads like configuration.</strong> <strong>data-width="narrow"</strong> is a setting — not another class. It's clearer and easier to scan than a stack of modifier classes.
</p>

<p>
<strong>• Easy to add more variations.</strong> A new setting means a new data attribute value — no new class name to invent, no naming decisions, no convention drift.
</p>

<br>

<p><strong>Cons:</strong></p>
<p>
<strong>• Less familiar</strong> to developers who've only worked with modifier classes.
<br>
<strong>• Not as common</strong> in older codebases or framework-generated CSS.
</p>

<br>

<h4>Side-by-Side Comparison</h4>

<pre><code>┌──────────────────────┬────────────────────────────────┬────────────────────────────────┐
│                      │ Modifier Classes               │ Data Attributes                │
├──────────────────────┼────────────────────────────────┼────────────────────────────────┤
│ Class order risk     │ High — order decides winner    │ None — nested in base class    │
│ Specificity battles  │ Likely as modifiers grow       │ None — each modifier scoped    │
│ HTML readability     │ Classes blend together         │ Attributes stand out           │
│ Naming drift         │ High — conventions vary        │ Low — values, not names        │
│ Scalability          │ More variants → more classes   │ More variants → more values    │
│ Familiarity          │ Universal                      │ Less common                    │
└──────────────────────┴────────────────────────────────┴────────────────────────────────┘</code></pre>

<br>

<h4>Why This Page Uses Data Attributes</h4>

<p>
The data attribute pattern treats variations as <strong>settings</strong>, not new components. A wrapper with <strong>data-width="narrow"</strong> is still the wrapper — just configured differently. The base class never changes, so the component stays the same. Only the attribute changes.
</p>

<p>
This matches how the components are structured. Each one declares its own custom properties with defaults. Each modifier — a data attribute — simply overrides one of those properties. The system stays consistent: <strong>one component, many settings.</strong>
</p>

<p>
Modifier classes work — for small projects. But as the number of variations grows, the class order problem and specificity battles start to appear. Data attributes avoid both by design.
</p>

<br>

<h4>The Rule</h4>

<p>
<strong>Use classes for identity. Use data attributes for configuration.</strong>
</p>

<pre><code>class="wrapper"                → this element is a wrapper
data-width="narrow"            → configured as narrow
data-padding-inline="none"     → configured without side padding</code></pre>

<br>

<hr>
<h3>The JavaScript Side</h3>

<p>
Data attributes aren't just for CSS. They're also useful selectors in JavaScript — and often a better choice than classes for interactive elements.
</p>

<br>

<h4>Selecting by Class</h4>

<pre><code>&lt;button class="btn-delete"&gt;Delete&lt;/button&gt;</code></pre>

<pre><code>document.querySelector(".btn-delete");</code></pre>

<p>
Works fine. But the class serves two purposes at once — styling and behavior. If the design changes and the class is renamed, the JavaScript breaks silently.
</p>

<br>

<h4>Selecting by Data Attribute</h4>

<pre><code>&lt;button data-action="delete"&gt;Delete&lt;/button&gt;</code></pre>

<pre><code>document.querySelector('[data-action="delete"]');</code></pre>

<p>
The data attribute exists purely for behavior. Styling lives in classes. The two concerns stay separate. When the design changes, the JavaScript selector stays untouched.
</p>

<br>

<h4>Why Data Attributes Are Often Better for JavaScript</h4>

<p>
<strong>• Separation of concerns</strong> — classes style, data attributes define behavior.
<br>
<strong>• No accidental renames</strong> — designers can change classes freely without breaking scripts.
<br>
<strong>• Self-documenting</strong> — <strong>data-action="delete"</strong> tells exactly what the element does.
<br>
<strong>• Easy to query</strong> — <strong>querySelectorAll('[data-action]')</strong> finds every interactive element at once.
</p>

<br>

<h4>Event Delegation with Data Attributes</h4>

<p>
Imagine a grid with 50 cards. Each card has a delete button. Attaching a click listener to every button works — but it means 50 listeners, and new cards need new listeners added every time.
</p>

<pre><code>document.querySelectorAll(".btn-delete").forEach(btn => {
  btn.addEventListener("click", handleDelete);
});</code></pre>

<p>
A cleaner approach: attach <strong>one listener</strong> to the grid — the parent that holds all the cards. Clicks on any child bubble up to the parent, and the parent handles them all.
</p>

<pre><code>grid.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  if (action === "delete") {
    // handle delete
  }
});</code></pre>

<br>

<p><strong>How it works:</strong></p>

<p>
<strong>1.</strong> User clicks a delete button inside the grid.
<br>
<strong>2.</strong> The click bubbles up from the button to the grid.
<br>
<strong>3.</strong> The grid's listener fires.
<br>
<strong>4. e.target</strong> is the element actually clicked — the delete button.
<br>
<strong>5. e.target.dataset.action</strong> reads <strong>data-action="delete"</strong> from that button.
<br>
<strong>6.</strong> If the action matches, handle it.
</p>

<br>

<pre><code>┌─────────────────────────────┐
│  grid (listener here)       │
│  ┌─────────┐  ┌─────────┐  │
│  │  card   │  │  card   │  │
│  │  [🗑️]  │  │  [🗑️]  │  │ ← click lands here
│  └─────────┘  └─────────┘  │
│         ↑                   │
│    bubbles up to grid       │
└─────────────────────────────┘</code></pre>

<br>

<p>
<strong>One listener. Any number of cards.</strong> New cards added later work automatically — no need to attach anything to them.
</p>

<p>
<strong>dataset.action</strong> reads the data attribute directly. No class checking, no <strong>classList.contains</strong>. The code is shorter and the intent is clearer.
</p>

<br>

<h4>The Rule</h4>

<p>
<strong>Use classes for styling. Use data attributes for behavior.</strong>
</p>

<pre><code>class="btn btn-primary"       → how it looks
data-action="delete"          → what it does</code></pre>

<hr>




<h3>Where This Pattern Was Used</h3>

<p>
These layout components were built and refined across several projects. Each one uses the same <strong>.section</strong>, <strong>.wrapper</strong>, and grid components — adjusted with data attributes for each section's needs.
</p>

<div class="accent-links-container ">

<a class="accent-link" href="https://github.com/falconstoop/fungifinders-ui" target="_blank" rel="noopener noreferrer">→ Fungifinders UI</a>

<a class="accent-link" href="https://github.com/falconstoop/tea-station-landing" target="_blank" rel="noopener noreferrer">→ Tea Station Landing</a>

<a class="accent-link" href="https://github.com/falconstoop/grand-hotel-website" target="_blank" rel="noopener noreferrer">→ Grand Hotel Website</a>

<a class="accent-link" href="https://github.com/falconstoop/furniture-store-website" target="_blank" rel="noopener noreferrer">→ Furniture Store Website</a>

<a class="accent-link" href="https://github.com/falconstoop/tour-company-landing" target="_blank" rel="noopener noreferrer">→ Tour Company Landing</a>

</div>

</article>
  `;
};

export default reusableLayoutComponents;
