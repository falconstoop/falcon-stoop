//
const root = document.getElementById("root");
//
const dashboardDesign = () => {
  root.innerHTML = `
<article class="content">

<h2>Dashboard Layout</h2>


<div class="blockquote-wrapper">
<blockquote>
    <p>"Give me a firm place to stand, and I shall move the earth."</p>
    <footer>— Archimedes 🔧 —</footer>
    <p class="quote-twist">
        Give me a CSS Grid container, and I shall build any dashboard layout.
    </p>
</blockquote>
</div>



<br>

<pre><code>Dashboard Layout Page
├── Dashboard Layout Structure
├── .dashboard
│   ├── Responsibilities
│   ├── Why It Matters (Responsive Benefit)
│   ├── Basic Implementation
│   └── Understanding the Grid
│       ├── grid-template-columns: auto 1fr;
│       ├── grid-template-rows: auto 1fr;
│       └── grid-template-areas
        └── The Gist
├── .dashboard-header
│   ├── Responsibilities
│   ├── Desktop View
│   │   ├── Header Height: Fixed vs. Auto
│   │   │   ├── Letting the grid handle it (auto)
│   │   │   └── Setting an explicit height
│   │   ├── What Happens Without the Grid
│   │   │   ├── Fixed positioning
│   │   │   └── Static positioning
│   │   └── Why the Grid Approach Is Preferred
│   └── Mobile View
│       └── Height Flexibility
├── .sidebar
│   ├── Responsibilities
│   ├── Desktop View
│   │   ├── Core Styles
│   │   ├── Navigation Inside the Sidebar
│   │   └── Core Styles for Navigation Items
|   |   └── When the Sidebar Should Not Stretch
|   |   └── align-self in Grid
│   |     └── align-self in Flexbox
│   ├── Sidebar Width: Fixed vs. Auto
│   │   ├── Letting the grid handle it (auto)
│   │   └── Setting an explicit width
│   ├── What Happens Without the Grid
│   │   └── Using Flexbox
│   ├── Why the Grid Approach Is Preferred
│   └── Mobile View
│       ├── How It Works
│       ├── Why Not Keep It in the Grid?
│       ├── Interaction with the Header
│       └── Core Styles
├── .dashboard-main
│   ├── Responsibilities
│   ├── Desktop View
│   │   └── Core Styles
│   ├── Mobile View
│   └── What Happens Without the Grid
├──  Bonus: Dark Mode Toggle 
└── Summary</code></pre>

<br>

<h3>Dashboard Layout Structure</h3>
<p>
The dashboard layout is a common pattern for admin panels, analytics screens, and application interfaces.
</p>
<p>
It divides the page into three core sections:
</p>
<p>
<strong>•</strong> A top header for branding and global actions.
<br>
<strong>•</strong> A left sidebar for navigation.
<br>
<strong>•</strong> A main content area for data and tools.
</p>
<p>
This layout is built using CSS Grid, which provides a clean, two-dimensional structure without relying on complex nesting or hacks.
</p>
<p>
On desktop, the sidebar and main content sit side by side. On mobile, the sidebar collapses off-screen and slides in as an overlay when toggled.
</p>

<pre><code>┌──────────────────────────────────────────────────────────┐
│                     .dashboard                           │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │              .dashboard-header                     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────┬─────────────────────────────────────────┐  │
│  │          │                                         │  │
│  │ .sidebar │            .dashboard-main              │  │
│  │          │                                         │  │
│  └──────────┴─────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘</code></pre>

<hr>


<h3>.dashboard</h3>
<p>
The <strong>.dashboard</strong> class is applied to the outermost element that wraps the entire dashboard interface.
</p>
<p>
It acts as the grid container, defining the overall structure that the header, sidebar, and main content area sit inside.
</p>
<h4>Responsibilities</h4>
<p>
<strong>•</strong> Establishes the CSS Grid context for the layout.
<br>
<strong>•</strong> Divides the page into two columns: one for the sidebar, one for the main content.
<br>
<strong>•</strong> Divides the page into two rows: one for the header, one for the content area below it.
<br>
<strong>•</strong> Sets the dashboard to occupy the full height of the viewport.
</p>

<h4>Why It Matters (Responsive Benefit)</h4>
<p>
Without this container, the three sections (header, sidebar, main) cannot be arranged into the classic dashboard structure. Defining the grid at this top level also makes responsive behavior easier to manage — on mobile, the same grid is reconfigured so the sidebar collapses into an overlay without changing the markup.
</p>

<h4>Basic Implementation</h4>
<pre><code>.dashboard {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}</code></pre>


<h4>Understanding the Grid</h4>

<h5>grid-template-columns: auto 1fr;</h5>
<p>
Defines two columns:
<br>
<strong>•</strong> <strong>auto</strong> — The first column sizes itself to the sidebar's width. If the sidebar is 250px wide, the column is 250px.
<br>
<strong>•</strong> <strong>1fr</strong> — The second column takes up the remaining horizontal space.
</p>
<pre><code>┌──────────┬──────────────────────────────┐
│  auto    │            1fr               │
│ (250px)  │     (rest of the space)      │
└──────────┴──────────────────────────────┘</code></pre>

<h5>grid-template-rows: auto 1fr;</h5>
<p>
Defines two rows:
<br>
<strong>•</strong> <strong>auto</strong> — The first row sizes itself to the header's content. Usually 50-60px based on what's inside.
<br>
<strong>•</strong> <strong>1fr</strong> — The second row takes up the remaining vertical space, containing the sidebar and main content.
</p>
<pre><code>┌─────────────────────────────────────────┐
│              auto (header)              │
├──────────┬──────────────────────────────┤
│          │                              │
│   1fr    │            1fr               │
│ (sidebar)│          (main)              │
│          │                              │
└──────────┴──────────────────────────────┘</code></pre>

<h5>grid-template-areas</h5>
<p>
Assigns names to each cell of the grid, making child placement clearer:
</p>
<pre><code>grid-template-areas:
    "header  header"
    "sidebar main";</code></pre>
<p>
<strong>•</strong> Row 1: header spans both columns.
<br>
<strong>•</strong> Row 2: sidebar sits in the first column, main content in the second.
</p>
<p>
This allows each child to be placed by name instead of line numbers:
</p>
<pre><code>.dashboard-header { grid-area: header; }
.sidebar          { grid-area: sidebar; }
.dashboard-main   { grid-area: main; }</code></pre>


<h4>The Gist</h4>
<p>
In a grid, width is controlled by columns, height by rows. <strong>auto</strong> means "size to your content." <strong>1fr</strong> means "take the remaining space."
</p>

<pre><code>grid-template-columns → width (left / right)
    auto = sidebar width based on content
    1fr  = main content fills remaining width

grid-template-rows    → height (top / bottom)
    auto = header height based on content
    1fr  = sidebar + main fill remaining height</code></pre>

<br>
<p>
Then use <strong>grid-template-areas</strong> to control where each section sits — header spans both columns across the top, sidebar and main sit side by side in the second row.
</p>

<p>
This structure is great for dashboards, admin panels, e-commerce layouts, and any interface with a fixed sidebar and scrollable main content.
</p>

<br>

<p>
For <strong>mobile view</strong>, the sidebar is taken out of the grid flow using <strong>position: fixed</strong> (or <strong>absolute</strong>) combined with <strong>transform: translateX(-100%)</strong> — sliding it off-screen as an overlay instead of occupying a permanent column.
</p>


<hr>


<h3>.dashboard-header</h3>
<p>
The <strong>.dashboard-header</strong> is the top bar of the dashboard. It spans the full width of the layout and sits in the first row of the grid.
</p>
<p>
It typically holds branding, search, notifications, and user profile controls, dark mode, etc.
</p>
<p>
However, in some dashboard designs the header is placed inside the main content area instead of spanning the full width. The structure shown here follows the most common pattern, where the header sits at the top level of the grid, independent from the sidebar and main content.
</p>

<h4>Responsibilities</h4>
<p>
<strong>•</strong> Spans both columns of the grid using <strong>grid-area: header</strong>.
<br>
<strong>•</strong> Provides a fixed-height container for global actions and branding.
<br>
<strong>•</strong> Often made sticky or fixed so it remains visible when the main content scrolls.
</p>

<h3>Desktop View</h3>

<h4>Header Height: Fixed vs. Auto</h4>

<p>
There are two common approaches to sizing the header:
</p>

<h5>Letting the grid handle it (auto)</h5>
<p>
Since <strong>.dashboard</strong> uses <strong>grid-template-rows: auto 1fr</strong>, the header row naturally sizes to its content. The sidebar and main content automatically fill the remaining space below it. No explicit height is needed.
</p>
<p>
<strong>•</strong> Flexible — adapts if content wraps or font size changes.
<br>
<strong>•</strong> Works on both desktop and mobile without adjustment.
<br>
<strong>•</strong> The grid calculates the remaining space, so the sidebar never overlaps the header.
</p>

<h5>Setting an explicit height</h5>
<p>
Some dashboards set a fixed or minimum height for consistency:
</p>
<pre><code>.dashboard-header {
  height: 60px;
  /* or */
  min-height: 60px;
}</code></pre>
<p>
<strong>• height: 60px</strong> — Strictly locks the header. Risk of content overflow on mobile or when text scales.
<br>
<strong>• min-height: 60px</strong> — Sets a baseline but allows the header to grow if needed. Safer choice.
</p>
<p>
In both cases, as long as the header stays inside the grid, the layout remains intact.
</p>

<h4>What Happens Without the Grid</h4>

<p>
If <strong>.dashboard</strong> did not use CSS Grid, a different approach would be needed to place the header, sidebar, and main content together.
</p>

<h5>Fixed positioning</h5>
<p>
Without a grid, the header is often set to <strong>position: fixed</strong> to keep it at the top of the viewport:
</p>
<pre><code>.dashboard-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
}</code></pre>
<p>
<strong>•</strong> The header is removed from the normal document flow.
<br>
<strong>•</strong> The sidebar and main content no longer know where the header ends.
<br>
<strong>•</strong> You must manually offset them with <strong>margin-top</strong> or <strong>padding-top</strong> equal to the header's height.
</p>

<h5>Static positioning</h5>
<p>
Without a grid and without fixed positioning, the header sits as a block-level element. The sidebar and main content would need their own layout method (like flexbox or floats) to sit side by side below it.
</p>
<p>
To make the sidebar fill the remaining height of the viewport, you must manually subtract the header's height:
</p>
<pre><code>.sidebar {
  height: calc(100vh - 60px);
}</code></pre>
<p>
This works, but it's brittle — if the header height changes, every calculation must be updated. The grid approach avoids this entirely.
</p>

<h4>Why the Grid Approach Is Preferred</h4>

<p>
When the header is placed inside the grid:
</p>
<p>
<strong>•</strong> No fixed heights are required.
<br>
<strong>•</strong> No manual offsets or calculations are needed.
<br>
<strong>•</strong> The sidebar and main content automatically fill the correct space.
<br>
<strong>•</strong> Responsive changes are handled by adjusting the grid, not by overriding multiple position values.
</p>
<p>
The grid removes the edge cases entirely — which is why it is the recommended foundation for the dashboard layout.
</p>


<h3>Mobile View</h3>

<p>
On mobile, the header follows the same pattern as the navigation toggle. The hamburger button is placed inside the header, and tapping it opens the sidebar as an overlay.
</p>
<p>
For a detailed breakdown of how the toggle works, visit  <a class="accent-link" href="#/css/mobile-nav-toggle">Mobile Nav Toggle</a>
</p>



<h4>Height Flexibility</h4>
<p>
Since the grid row is set to <strong>auto</strong>, the header can expand if its content wraps — for example, if a search bar expands or the title breaks into two lines. No fixed height means no overflow issues on narrow screens.
</p>


<hr>


<h3>.sidebar</h3>
<p>
The <strong>.sidebar</strong> is the left column of the dashboard. It sits in the second row, first column of the grid and contains the main navigation links.
</p>

<h4>Responsibilities</h4>
<p>
<strong>•</strong> Provides a fixed-width container for navigation items.
<br>
<strong>•</strong> Sits alongside the main content on desktop.
<br>
<strong>•</strong> Collapses into an overlay on mobile, toggled by the hamburger button in the header.
</p>

<h3>Desktop View</h3>


<h5>Core Styles</h5>
<pre><code>.sidebar {
  width: 250px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}</code></pre>

<br>


<h5>Navigation Inside the Sidebar</h5>
<p>
Inside the sidebar, navigation is typically structured as a list:
</p>
<pre><code>&lt;nav&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="#"&gt;Dashboard&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Analytics&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Settings&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Users&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</code></pre>

<h5>Core Styles for Navigation Items</h5>


<pre><code>.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav a {
  display: block;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.sidebar nav a:hover {
  background-color: #f0f0f0;
}</code></pre>


<br>

<h5>When the Sidebar Should Not Stretch</h5>
<p>
In some layouts — like e-commerce filters or category menus — the sidebar should only take the height of its content, not fill the entire row. Adding <strong>align-self: start</strong> prevents the sidebar from stretching:
</p>

<pre><code>.sidebar {
  align-self: start;
}</code></pre>
<p>
The main content still fills the remaining space with <strong>1fr</strong> and scrolls independently. The empty area below the sidebar remains unused.
</p>

<br>

<h4>Align-Self</h4>

<h5>align-self — Controlling Vertical Position in Grid</h5>
<p>
<strong>align-self</strong> controls how a single grid item positions itself vertically within its cell. By default, grid items stretch to fill the full height of their row (<strong>align-self: stretch</strong>).
</p>

<p>
Common values:
<br>
<strong>• stretch</strong> (default) — Fills the entire height of the row.
<br>
<strong>• start</strong> — Sits at the top. Height is determined by content.
<br>
<strong>• center</strong> — Vertically centered within the row.
<br>
<strong>• end</strong> — Sits at the bottom.
</p>

<pre><code>┌──────────────────────────────────┐
│  start    │  center   │   end    │
│  ┌──┐     │           │          │
│  │  │     │  ┌──┐     │          │
│  │  │     │  │  │     │  ┌──┐    │
│  └──┘     │  └──┘     │  │  │    │
│           │           │  └──┘    │
│           │           │          │
└──────────────────────────────────┘</code></pre>

<p>
In this dashboard, <strong>align-self: start</strong> on the sidebar means it sits at the top of the second row and only takes the height of its content — leaving unused space below it. The main content still fills the full row height.
</p>

<h5>align-self in Flexbox</h5>
<p>
In Flexbox, <strong>align-self</strong> works on the <strong>cross axis</strong> — which changes depending on <strong>flex-direction</strong>:
</p>

<p>
<strong>• flex-direction: row</strong> (default) — Cross axis is vertical. <strong>align-self</strong> controls <strong>height</strong> (top/bottom positioning).
<br>
<strong>• flex-direction: column</strong> — Cross axis is horizontal. <strong>align-self</strong> controls <strong>width</strong> (left/right positioning).
</p>

<pre><code>Flexbox (row)          Flexbox (column)
cross axis = vertical  cross axis = horizontal
align-self = height    align-self = width</code></pre>

<p>
In Grid, it's simpler: the cross axis is <strong>always vertical</strong>. <strong>align-self</strong> always controls height. No exceptions.
</p>

<br>

<h4>Sidebar Width: Fixed vs. Auto</h4>

<p>
On desktop, the sidebar needs a consistent width. There are two approaches:
</p>

<h5>Letting the grid handle it (auto)</h5>
<p>
Since <strong>.dashboard</strong> uses <strong>grid-template-columns: auto 1fr</strong>, the first column sizes itself to the sidebar's content. If the sidebar has a set width (like <strong>width: 250px</strong>), the column matches it. If no width is set, the column shrinks to fit the largest unbreakable item inside.
</p>
<p>
<strong>•</strong> Flexible — the sidebar width adapts to its content.
<br>
<strong>•</strong> No explicit column size needed in the grid.
<br>
<strong>•</strong> The main content automatically takes the remaining space.
</p>

<h5>Setting an explicit width</h5>
<p>
Most dashboards set a fixed width on the sidebar for consistency:
</p>
<pre><code>.sidebar {
  width: 250px;
}</code></pre>
<p>
<strong>•</strong> The grid column (<strong>auto</strong>) respects this width and sizes the column accordingly.
<br>
<strong>•</strong> If the sidebar content overflows, <strong>overflow-y: auto</strong> can be added to make it scrollable.
</p>

<h4>What Happens Without the Grid</h4>

<p>
If <strong>.dashboard</strong> did not use CSS Grid, the sidebar and main content would need to be placed side by side manually.
</p>

<h5>Using Flexbox</h5>
<pre><code>.dashboard {
  display: flex;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
}

.dashboard-main {
  flex: 1;
}</code></pre>
<p>
<strong>• flex-shrink: 0</strong> prevents the sidebar from shrinking when space is tight.
<br>
<strong>• flex: 1</strong> makes the main content fill the remaining width.
</p>
<p>
This works, but combining flexbox for the body with a fixed or sticky header adds complexity. The grid keeps everything in one layout system.
</p>

<h4>Why the Grid Approach Is Preferred</h4>

<p>
When the sidebar is placed inside the grid:
</p>
<p>
<strong>•</strong> The column size is defined in one place (<strong>grid-template-columns</strong>).
<br>
<strong>•</strong> The sidebar and main content automatically sit side by side.
<br>
<strong>•</strong> No need for <strong>flex-shrink</strong> or extra wrappers.
<br>
<strong>•</strong> Responsive changes are handled by adjusting the grid, not by overriding multiple layout properties.
</p>


<h3>Mobile View</h3>

<p>
On mobile, the sidebar moves out of the grid flow and behaves as an overlay. This is achieved by switching from the grid placement to <strong>position: fixed</strong> combined with <strong>transform</strong> for the slide-in animation.
</p>

<h4>How It Works</h4>
<p>
<strong>•</strong> The sidebar is positioned fixed, covering the full height of the screen.
<br>
<strong>•</strong> It is initially translated off-screen using <strong>transform: translateX(-100%)</strong>.
<br>
<strong>•</strong> When toggled open, it slides in with <strong>transform: translateX(0)</strong>.
<br>
<strong>•</strong> A backdrop or overlay is often added behind the sidebar to dim the main content.
</p>

<h4>Why Not Keep It in the Grid?</h4>
<p>
If the sidebar remained in the grid on mobile, it would permanently occupy a column — shrinking the main content into a narrow strip. Taking it out of the grid and placing it as an overlay frees up the full screen width for the main content.
</p>

<h4>Interaction with the Header</h4>
<p>
The sidebar can slide in either below the header or over it. This depends on the <strong>z-index</strong> and whether the header remains in the grid or is also fixed. Both approaches are covered in the header section.
</p>

<br>

<h4>Core Styles</h4>
<pre><code>.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar.open {
  transform: translateX(0);
}</code></pre>

<br>

<p>
Again, This is the same pattern covered in detail on the navigation toggle page. The sidebar uses the same positioning, transform, and transition logic — only the trigger (hamburger button in the header) and the content (navigation links) differ.
</p>
<p>
For a detailed breakdown of how the toggle works, visit <a class="accent-link" href="#/css/mobile-nav-toggle">Mobile Nav Toggle</a>.
</p>


<hr>


<h3>.dashboard-main</h3>
<p>
The <strong>.dashboard-main</strong> is the main content area of the dashboard. It sits in the second row, second column of the grid and displays the primary data, charts, tables, and tools.
</p>

<h4>Responsibilities</h4>
<p>
<strong>•</strong> Occupies the remaining space in the grid using the <strong>1fr</strong> column.
<br>
<strong>•</strong> Acts as a scrollable container for dashboard content.
<br>
<strong>•</strong> On mobile, expands to full width when the sidebar collapses into an overlay.
</p>

<h4>Desktop View</h4>

<h5>Core Styles</h5>
<pre><code>.dashboard-main {
  overflow-y: auto;
  padding: 24px;
}</code></pre>
<p>
<strong>• overflow-y: auto</strong> — Makes the content area scrollable independently from the header and sidebar.
<br>
<strong>• padding</strong> — Provides breathing room around the content.
</p>

<h4>Mobile View</h4>
<p>
On mobile, when the sidebar slides in as an overlay, <strong>.dashboard-main</strong> naturally takes the full width of the screen since the sidebar is no longer occupying a grid column. No additional styles are needed — the grid handles it.
</p>

<h4>What Happens Without the Grid</h4>
<p>
Without the grid, the main content area would need manual width calculations. With a fixed sidebar, it would require something like:
</p>
<pre><code>.dashboard-main {
  margin-left: 250px;
  width: calc(100% - 250px);
}</code></pre>
<p>
On mobile, those values would need to be overridden. The grid avoids this entirely by handling column sizing automatically.
</p>

<br>

<p>
The internal styling of <strong>.dashboard-main</strong> varies significantly between dashboards. Some use a grid of cards, others a single chart, tables, or a combination. The styles shown here cover only the container's role in the overall layout — the content inside is entirely up to the specific design.
</p>

<hr>


<h4>Dark Mode Toggle</h4>

<p>
A dark mode toggle is a common feature in modern dashboards. The implementation follows a simple but clever pattern: a hidden checkbox paired with a styled label.
</p>

<h5>The Checkbox + Label Pattern</h5>

<p>
The checkbox handles the <strong>state</strong> (checked = dark, unchecked = light). The label handles the <strong>appearance</strong> — styled as a toggle switch. When the user clicks the label, the browser automatically toggles the checkbox. No JavaScript required for the visual behavior.
</p>

<pre><code>&lt;input type="checkbox" id="dark-mode-toggle" class="toggle-input"&gt;
&lt;label for="dark-mode-toggle" class="toggle-label"&gt;&lt;/label&gt;</code></pre>

<h5>Why a Label Instead of a Span?</h5>

<p>
A <strong>&lt;label&gt;</strong> with a <strong>for</strong> attribute is natively connected to the checkbox. Clicking the label automatically toggles the checkbox — this is built into the browser. A <strong>&lt;span&gt;</strong> has no such connection. You would need to write a click handler in JavaScript to manually toggle the checkbox state.
</p>

<p>
<strong>• &lt;label&gt;</strong> → click → checkbox toggles automatically (native browser behavior).
<br>
<strong>• &lt;span&gt;</strong> → click → nothing happens (unless you add JavaScript).
</p>

<p>
One line of HTML vs. extra JavaScript. The label wins.
</p>

<h5>Styling the Toggle</h5>

<pre><code>/* Hide the checkbox visually but keep it accessible */
.toggle-input {
  display: none;
}

/* The label becomes the toggle switch */
.toggle-label {
  display: inline-block;
  width: 48px;
  height: 24px;
  background-color: #b2bec3;
  border-radius: 24px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* The circle inside the toggle */
.toggle-label::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

/* When checked: change background and slide the circle */
.toggle-input:checked + .toggle-label {
  background-color: #0f172a;
}

.toggle-input:checked + .toggle-label::after {
  transform: translateX(24px);
}</code></pre>

<h5>The Adjacent Sibling Selector (+)</h5>

<p>
The <strong>+</strong> in CSS is the <strong>adjacent sibling combinator</strong>. It selects an element that comes <strong>directly after</strong> another element, sharing the same parent:
</p>

<pre><code>.toggle-input:checked + .toggle-label</code></pre>

<p>
This means: "Select the <strong>.toggle-label</strong> that is immediately after a checked <strong>.toggle-input</strong>." Not any label — only the one right next to it.
</p>

<p>
In JavaScript, the equivalent is:
</p>

<pre><code>checkbox.nextElementSibling  // the label right after it</code></pre>

<p>
Both grab the very next sibling element. CSS does it in a selector. JavaScript does it in code.
</p>

<h5>What Else Can We Use Instead of +?</h5>

<p>
If the label is not directly after the checkbox (for example, there are other elements between them), the adjacent sibling selector won't work. Alternatives:
</p>

<p>
<strong>• ~ (general sibling combinator)</strong> — Selects <strong>any</strong> sibling after the checkbox, not just the immediate one:
</p>

<pre><code>.toggle-input:checked ~ .toggle-label</code></pre>

<p>
<strong>• :has() (parent selector)</strong> — Selects an ancestor based on its children. Useful if the toggle is wrapped in a container:
</p>

<pre><code>.toggle-wrapper:has(.toggle-input:checked) .toggle-label</code></pre>

<p>
<strong>• JavaScript</strong> — If CSS selectors can't reach the label, add a class manually:
</p>

<pre><code>checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", checkbox.checked);
});</code></pre>

<h5>Alternative: Button with JavaScript</h5>

<p>
Instead of the checkbox + label pattern, some dashboards use a simple <strong>&lt;button&gt;</strong>:
</p>

<pre><code>&lt;button id="dark-mode-toggle" aria-label="Toggle dark mode"&gt;🌙&lt;/button&gt;</code></pre>

<pre><code>const btn = document.getElementById("dark-mode-toggle");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Update icon
  btn.textContent = isDark ? "☀️" : "🌙";
});</code></pre>

<p>
Both approaches are valid. The <strong>checkbox + label</strong> pattern handles the visual toggle with pure CSS. The <strong>button</strong> approach gives more control — you can run additional logic, save preferences, and update icons. Choose based on your needs.
</p>

<h5>Preserving the User's Preference</h5>

<p>
Regardless of the approach, save the user's choice to <strong>localStorage</strong> so it persists across page loads:
</p>

<pre><code>// On page load: read saved preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  checkbox.checked = true;
}

// On toggle: save preference
checkbox.addEventListener("change", () => {
  const isDark = checkbox.checked;
  document.body.classList.toggle("dark-mode", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});</code></pre>

<p>
The toggle is a small detail — but it touches HTML semantics (label vs. span), CSS selectors (+, ~, :has), and JavaScript state management (localStorage). Building it from scratch forces all three to work together.
</p>

<br>

<h4>JavaScript — Connecting the Toggle to the Page</h4>

<p>
The checkbox handles the visual toggle via CSS. JavaScript connects that state to the actual dark mode behavior — applying a class to <strong>&lt;body&gt;</strong> and saving the user's preference.
</p>

<pre><code>const checkbox = document.getElementById("dark-mode-toggle");

// On page load: restore saved preference
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  checkbox.checked = true;
}

// On toggle: apply the class and save the preference
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", checkbox.checked);
  localStorage.setItem("theme", checkbox.checked ? "dark" : "light");
});</code></pre>

<p>
<strong>•</strong> The checkbox is selected — it holds the truth (checked or not). The label is just the visual.
<br>
<strong>•</strong> On page load, <strong>localStorage</strong> is checked. If the user previously chose dark mode, the class and checkbox state are restored.
<br>
<strong>•</strong> On each toggle, the class on <strong>&lt;body&gt;</strong> is updated and the preference is saved.
</p>

<h5>classList.toggle() — The Second Argument</h5>

<p>
<strong>classList.toggle()</strong> accepts an optional second argument — a boolean that forces the class on or off instead of flipping it:
</p>

<pre><code>element.classList.toggle("dark-mode");              // Flips: adds if missing, removes if present
element.classList.toggle("dark-mode", true);        // Force ADD
element.classList.toggle("dark-mode", false);       // Force REMOVE</code></pre>

<p>
In the dark mode toggle:
</p>

<pre><code>document.body.classList.toggle("dark-mode", checkbox.checked);</code></pre>

<p>
This says: "If the checkbox is checked, add <strong>dark-mode</strong>. If unchecked, remove it." The class follows the checkbox state exactly — no risk of the two getting out of sync.
</p>

<p>
Without the second argument, <strong>toggle()</strong> simply flips the class each time it's called. If something else on the page modifies the class independently, the checkbox and the class could mismatch. The boolean argument prevents that entirely.
</p>


<hr>

<h3>Summary</h3>
<p>
The dashboard layout is built on three core containers placed inside a CSS Grid:
</p>
<p>
<strong>• .dashboard</strong> — The grid container that defines the overall structure.
<br>
<strong>• .dashboard-header</strong> — The top bar spanning both columns.
<br>
<strong>• .sidebar</strong> — The left navigation column, which becomes an overlay on mobile.
<br>
<strong>• .dashboard-main</strong> — The scrollable content area that fills the remaining space.
</p>
<p>
The grid handles column and row sizing automatically, avoiding the need for fixed heights, manual <strong>calc()</strong> values, or brittle positioning hacks. On mobile, the sidebar leaves the grid and slides in as an overlay — a pattern covered in detail on the <a class="accent-link" href="#/css/mobile-nav-toggle">Mobile Nav Toggle</a> page.
</p>

<br>

<p>
See the full implementation and live demo:
</p>

<div class="accent-links-container">

  <a class="accent-link" href="https://js-dom-mini-projects.netlify.app/" target="_blank" rel="noopener noreferrer">Live Demo</a>

  <a class="accent-link" href="https://github.com/falconstoop/JS_DOM-mini-projects" target="_blank" rel="noopener noreferrer">GitHub → JS Mini DOM Projects</a>

</div>




</article>
  `;
};

export default dashboardDesign;
