//
const root = document.getElementById("root");
//
const mobileNavToggle = () => {
  root.innerHTML = `
<article class="content">

<h2>mobile Navigation Toggle</h2>


<div class="blockquote-wrapper">
<blockquote>
    <p>"Plan for what is difficult while it is easy." </p>
    <footer>— Sun Tzu ⚔️ —</footer>
    <p class="quote-twist">
     Desktop navigation is easy. Mobile navigation is where the real decisions live. This page is the plan.
    </p>
</blockquote>
</div>

<br>

<p>
<strong>Mobile Navigation Toggle</strong> is a responsive navigation pattern that hides the primary navigation on small screens and reveals it when the user taps a toggle button (commonly a hamburger icon). It improves usability by preserving screen space while keeping navigation easily accessible.
</p>

<br>

<pre><code>Mobile Navigation Toggle Page
├── Component Structure
│   ├── Structure Overview
│   ├── Separation of Responsibilities
│   └── Desktop Layout
├── Mobile Navigation Approaches
│   ├── Height-Based Approach
│   ├── Transform-Based Approach
│   └── Comparing the Two Approaches
├── Common CSS Pitfalls
│   ├── Issue 1: display Cannot Be Animated
│   ├── Issue 2: height: auto / fit-content Cannot Be Animated
│   ├── Issue 3: Fixed Height Is Not Scalable
│   ├── Issue 4: Hidden Content Still Overflowed
│   ├── Issue 5: transform Without Positioning
│   └── Issue 6: position: absolute vs. position: fixed
├── Final Mental Model
└── Final Summary
</code></pre>

<hr>

<h3>Structure Overview</h3>


<pre><code>┌───────────────────────────────────────────────────────────────┐
│                         .site-header                          │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                      .wrapper                           │  │
│  │                                                         │  │
│  │  ┌───────────────────────────────────────────────────┐  │  │
│  │  │              .site-header--inner                  │  │  │
│  │  │                                                   │  │  │
│  │  │  ┌───────────────────┐  ┌──────────────────────┐  │  │  │
│  │  │  │    .nav-header    │  │    .primary-nav      │  │  │  │
│  │  │  │                   │  │                      │  │  │  │
│  │  │  │  Logo      ☰     │  │  Home                │  │  │  │
│  │  │  │            Menu   │  │  Projects            │  │  │  │
│  │  │  │                   │  │  Contacts            │  │  │  │
│  │  │  └───────────────────┘  │  About               │  │  │  │
│  │  │                         └──────────────────────┘  │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘</code></pre>

<br>



<h4>.site-header</h4>
<p>
The outermost container of the navigation.
</p>
<p>
<strong>Responsibilities:</strong>
</p>
<p>
Defines the header's visual appearance.
<br>
Controls full-width styling such as:
<br>
<strong>•</strong> background color
<br>
<strong>•</strong> border
<br>
<strong>•</strong> box-shadow
<br>
<strong>•</strong> overall spacing
</p>
<p>
It represents the entire header section.
</p>

<br>

<h4>.wrapper</h4>
<p>
Keeps the content aligned with the rest of the website.
</p>
<p>
<strong>Responsibilities:</strong>
</p>
<p>
<strong>•</strong> Limits the maximum width.
<br>
<strong>•</strong> Adds horizontal padding.
<br>
<strong>•</strong> Centers the content within the viewport.
</p>
<p>
The wrapper ensures the header content doesn't stretch from edge to edge on large screens.
</p>

<br>

<h4>.site-header--inner</h4>
<p>
The main layout container.
</p>
<p>
<strong>Responsibilities:</strong>
</p>
<p>
<strong>•</strong> Creates the desktop layout using Flexbox.
<br>
<strong>•</strong> Places the branding and navigation on opposite sides using <strong>justify-content: space-between</strong>.
<br>
<strong>•</strong> Vertically aligns items with <strong>align-items: center</strong>.
</p>
<p>
This container controls the overall layout of the header.
</p>

<br>

<h4>.nav-header</h4>
<p>
Contains the logo and the mobile navigation toggle.
</p>
<p>
<strong>Why is this wrapped in its own container?</strong>
</p>
<p>
On desktop, the hamburger button is hidden, so this wrapper doesn't do much.
</p>
<p>
On mobile, however, it becomes important. It is turned into a flex container so the logo stays on the left while the hamburger button stays on the right.
</p>
<p>
Without this separate wrapper, it would be much harder to create a clean mobile header layout.
</p>

<br>

<h4>.primary-nav</h4>
<p>
Contains the navigation links.
</p>
<p>
It has two different responsibilities depending on the viewport.
</p>

<p><strong>Desktop</strong></p>
<p>
<strong>•</strong> Displays the navigation links as a horizontal flex row.
<br>
<strong>•</strong> Controls spacing between links using <strong>gap</strong>.
</p>

<p><strong>Mobile</strong></p>
<p>
The navigation becomes independent from <strong>.nav-header</strong>.
</p>
<p>
Because it is a separate container, it can be:
<br>
<strong>•</strong> positioned with <strong>position: fixed</strong> or <strong>position: absolute</strong>
<br>
<strong>•</strong> animated with <strong>transform: translateX()</strong>
<br>
<strong>•</strong> displayed as a slide-in navigation drawer
</p>
<p>
Keeping the navigation separate from <strong>.nav-header</strong> allows the header (logo + hamburger) to remain fixed while the navigation panel opens and closes independently.
</p>

<br>

<h4>Separation of Responsibilities</h4>

<p>
This structure follows a clear separation of responsibilities:
</p>

<pre><code>.site-header       → visual container
.wrapper           → width and horizontal spacing
.site-header--inner → overall desktop layout
.nav-header        → branding and mobile header controls
.primary-nav       → navigation layout and mobile drawer behavior</code></pre>

<p>
This separation makes the component easier to maintain, more responsive, and simpler to adapt to different navigation patterns in the future.
</p>


<hr>


<h4>Desktop Layout (Base State)</h4>

<pre><code>.site-header {
  background-color: #eee;
}

.wrapper {
  padding: 1rem;
}

.site-header--inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.2rem 1rem;
  flex-wrap: wrap;
}

.nav-toggle {
  @media (width > 760px) {
    display: none;
  }
}

.primary-nav {
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
}</code></pre>

<br>

<h4>Notes (Desktop Only)</h4>

<p>
<strong>• .site-header</strong> → sets header background
<br>
<strong>• .wrapper</strong> → adds spacing from screen edges
<br>
<strong>• .site-header--inner</strong> → horizontal flex layout (logo left, nav right)
<br>
<strong>• .nav-toggle</strong> → hidden on desktop
<br>
<strong>• .primary-nav ul</strong> → horizontal menu using flex
</p>

<p>
✔ This is the default desktop navigation layout before any mobile behavior is applied.
</p>


<hr>


<h4>Mobile Navigation (Base Idea)</h4>

<h4>Approach 1 — Hide/Show Using Height (Flow-Based)</h4>

<pre><code>@media (width < 760px) {

  .primary-nav {
    height: 0;
    overflow: hidden;
    transition: height 300ms ease;
  }

  .primary-nav ul {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  .primary-nav.active {
    height: 300px;
  }
}</code></pre>

<p><strong>Idea:</strong></p>
<p>
<strong>•</strong> Menu stays in document flow
<br>
<strong>•</strong> We collapse it using <strong>height: 0</strong>
<br>
<strong>•</strong> Expand it using a fixed height
<br>
<strong>•</strong> Animation works via <strong>transition</strong>
</p>
<br>

<p><strong>Best suited for:</strong></p>

<p>
<strong>•</strong> Dropdown menus
<br>
<strong>•</strong> Accordions
<br>
<strong>•</strong> Expandable sections
</p>

<p>
Since the element expands within the normal document flow, this approach works well when the content should push the layout downward.
</p>

<p>
It is <strong>not recommended</strong> for mobile navigation drawers or dashboard sidebars, where the navigation should slide over the page independently without affecting the surrounding layout.
</p>

<p>
This naturally leads into your next section about the transform approach.
</p>

<br>

<h4>Approach 2 — Slide Menu Using Transform (Overlay-Based)</h4>

<pre><code>@media (width < 760px) {

  .primary-nav {
    position: fixed;
    top: 0;
    right: 0;

    width: 260px; 
     /* or 100% */
    height: 100vh; 
    /* or no height - content takes care of it */

    background: #eee;

    transform: translateX(100%);
    transition: transform 300ms ease;
  }

  .primary-nav.active {
    transform: translateX(0);
  }

  .primary-nav ul {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
}</code></pre>

<p><strong>Idea:</strong></p>
<p>
<strong>•</strong> Menu is removed from layout flow
<br>
<strong>•</strong> It behaves like a sliding panel
<br>
<strong>•</strong> Animation is smooth and GPU-based
<br>
<strong>•</strong> No layout shifting
</p>

<br>

<p><strong>Best suited for:</strong></p>

<p>
<strong>•</strong> Mobile navigation drawers
<br>
<strong>•</strong> Dashboard sidebars
<br>
<strong>•</strong> Off-canvas menus
<br>
<strong>•</strong> Overlay panels
</p>

<p>
Since the element is removed from the normal document flow, it can slide over the page independently without causing layout shifts.
</p>

<p>
This is the <strong>recommended approach</strong> for modern mobile navigation patterns because it provides smoother animations and a more stable layout.
</p>

<br>

<p class="attention">
<strong>Note:</strong> Using transform alone only changes the element's visual position—it does not remove it from the normal layout flow. This can lead to unexpected layout behavior. (unexpected spacing and scrolling.)
</p>

<p>
For mobile navigation drawers, <strong>transform</strong> is typically combined with <strong>position: fixed</strong> (or, in some cases, <strong>position: absolute</strong>) so the navigation can move independently without affecting the page layout.
</p>

<p>
We'll explore why this happens and when to use <strong>fixed</strong> versus <strong>absolute</strong> in the <strong>Issues Faced</strong> section below.
</p>
<p><strong>
(Issue 5 — transform Caused Layout Confusion)
</strong></p>
<br>

<h4>Summary (Mobile Behavior)</h4>

<p>
<strong>Method 1</strong> → expands inside layout (height-based)
<br>
<strong>Method 2</strong> → overlays screen (transform-based)
</p>

<p>
Both approaches are valid, but they solve different problems.
</p>

<p>
<strong>height:</strong> simple, but less scalable because it changes the layout.
<br>
<strong>transform:</strong> modern drawer pattern that keeps the layout stable and provides smoother animations.
</p>


<hr>



<h3>Issues Faced — Why Things Broke and How They Were Solved</h3>


<h4>Issue 1 — <code>display</code> Cannot Be Animated</h4>

<h5>Problem:</h5>

<pre><code>.primary-nav {
  display: none;
}

.primary-nav.active {
  display: block;
}</code></pre>

<p>
I used <strong>display: none</strong> to hide the mobile navigation and <strong>display: block</strong> to show it when the toggle button was clicked. I expected the menu to smoothly open and close using a CSS transition, but it instantly appeared and disappeared instead.
</p>

<h5>Why?</h5>

<p>
The <strong>display</strong> property is not animatable. Changing from <strong>display: none</strong> to <strong>display: block</strong> completely removes the element from the document and then adds it back. Since there are no intermediate values between these two states, the browser has nothing to animate.
</p>
<br>
<h5>Solution:</h5>

<p>
Keep the element rendered and animate a property that supports transitions, such as <strong>transform</strong>, <strong>height</strong>, or <strong>opacity</strong>, instead of animating <strong>display</strong>.
</p>

<br>

<h5>When is display appropriate?</h5>

<p>
The <strong>display</strong> property is perfectly suitable when you simply need to show or hide an element instantly. For example, it is commonly used for modals, tooltips, loading indicators, or other UI elements that do not require a smooth opening or closing animation.
</p>

<p>
Use <strong>display</strong> when an instant state change is acceptable. If you want a smooth transition, animate properties such as <strong>transform</strong>, <strong>opacity</strong>, or <strong>height</strong> instead.
</p>

<br>


<h4>Issue 2 — <code>height: auto</code> / <code>fit-content</code> Cannot Be Animated</h4>

<h5>Problem:</h5>

<pre><code>.primary-nav {
  height: 0;
  transition: height 300ms ease;
}

.primary-nav.active {
  height: fit-content;
}</code></pre>

<p>
A common approach for building a collapsible navigation is to set the initial height to <strong>0</strong> and change it to <strong>fit-content</strong> (or <strong>auto</strong>) when the menu becomes active, expecting a smooth expansion.
</p>

<p>
Instead of animating smoothly, the menu immediately jumps to its final height.
</p>

<h5>Why?</h5>

<p>
CSS transitions can only animate between <strong>numeric values</strong>. During a transition, the browser calculates intermediate values between the starting and ending states.
</p>

<p>
The value <strong>0</strong> is numeric, but <strong>auto</strong> and <strong>fit-content</strong> are not. These values depend on the element's content rather than representing a fixed numeric height.
</p>

<p>
Because no intermediate values can be calculated between <strong>0</strong> and <strong>auto</strong> (or <strong>fit-content</strong>), the browser skips the animation and immediately applies the final value.
</p>

<h5>Solution:</h5>

<p>
Animating the <strong>height</strong> property requires both the starting and ending values to be numeric. For example, transitioning from <strong>height: 0</strong> to <strong>height: 300px</strong> produces a smooth animation.
</p>

<p>
When the final height is unknown or depends on the content, alternative techniques such as <strong>transform</strong> or <strong>max-height</strong> are generally more appropriate.
</p>

<h5>When are <code>auto</code> and <code>fit-content</code> appropriate?</h5>

<p>
The values <strong>auto</strong> and <strong>fit-content</strong> are intended for layouts where the browser should determine the element's natural size based on its content.
</p>

<p>
They are excellent for responsive layouts, but they should not be used as the start or end values of a CSS transition.
</p>


<br>


<h4>Issue 3 — Fixed Height Is Not Scalable</h4>

<h5>Problem:</h5>

<pre><code>.primary-nav {
  height: 0;
  overflow: hidden;
  transition: height 300ms ease;
}

.primary-nav.active {
  height: 300px;
}</code></pre>

<p>
After discovering that <strong>auto</strong> and <strong>fit-content</strong> cannot be animated, a common workaround is to replace them with a fixed height, such as <strong>300px</strong>.
</p>

<p>
This produces the expected animation, but introduces a new limitation.
</p>

<h5>Why?</h5>

<p>
A fixed height does not adapt to the content inside the element. The browser always expands the element to the specified height, regardless of how much content it contains.
</p>

<p>
If additional navigation items are added, the content may overflow or become clipped. If items are removed, unnecessary empty space remains inside the menu.
</p>

<p>
As the content changes, the fixed height must be updated manually, making the component difficult to maintain and scale.
</p>

<h5>Solution:</h5>

<p>
Instead of relying on a fixed <strong>height</strong>, several approaches can be used depending on the component:
</p>
<br>
<p>
<strong>Option 1:</strong> Increase the fixed <strong>height</strong> so it is large enough to fit all content. This works only when the content size is known and rarely changes.
</p>

<p>
<strong>Option 2:</strong> Animate <strong>max-height</strong> instead of <strong>height</strong>. This allows the element to expand naturally up to a specified maximum height, although a suitable maximum value is still required.
</p>

<p>
<strong>Option 3 (Recommended for navigation drawers):</strong> Use a <strong>transform</strong>-based animation instead of animating <strong>height</strong>. Since the animation moves the element rather than resizing it, the component is no longer limited by its content height.
</p>

<br>

<h5>When is a fixed height appropriate?</h5>

<p>
A fixed height is appropriate for components with a predictable size, such as banners, cards, buttons, or other UI elements whose dimensions remain constant.
</p>

<p>
It is generally not recommended for expandable components whose content may grow or shrink over time.
</p>


<br>
<h4>Issue 4 — Hidden Content Still Overflowed</h4>

<h5>Problem:</h5>

<pre><code>.primary-nav {
  height: 0;
}</code></pre>

<p>
The navigation container was collapsed by setting <strong>height: 0</strong>, with the expectation that the entire menu would become invisible.
</p>

<p>
Instead, the navigation links were still visible outside the container.
</p>

<h5>Why?</h5>

<p>
Setting <strong>height: 0</strong> only reduces the height of the container. It does not automatically hide the content inside it.
</p>

<p>
By default, elements use <strong>overflow: visible</strong>, which allows child elements to render outside their parent's boundaries. As a result, even though the container has no visible height, its content can still be displayed.
</p>

<h5>Solution:</h5>

<p>
Add <strong>overflow: hidden</strong> to the container. This clips any content that extends beyond the element's boundaries, ensuring the navigation remains completely hidden while collapsed.
</p>

<pre><code>.primary-nav {
  height: 0;
  overflow: hidden;
}</code></pre>

<h5>When is <code>overflow: hidden</code> appropriate?</h5>

<p>
Use <strong>overflow: hidden</strong> whenever content should be clipped to the boundaries of its container. It is commonly used for collapsible menus, accordions, image containers, sliders, and other components where content should not be visible outside the element.
</p>


<br>
<h4>Issue 5 — <code>transform</code> Caused Layout Confusion (First Attempt)</h4>

<h5>Problem:</h5>

<pre><code>.primary-nav {
  transform: translateX(100%);
  transition: transform 300ms ease;
}</code></pre>

<p>
A sliding navigation was implemented using <strong>transform: translateX(100%)</strong>, expecting a smooth off-canvas menu behavior.
</p>

<p>
Instead, the navigation caused unexpected horizontal scrolling and did not behave like an off-canvas menu. Although the menu was visually moved off-screen, it was not positioned independently from the page layout.
</p>

<p>
However, the layout behavior appeared confusing during testing.
</p>

<h5>Why?</h5>

<p>
The <strong>transform</strong> property only changes an element's visual position. It does not change how the element is positioned within the page.
</p>

<p>
When the navigation remains in the normal document layout, moving it with <strong>translateX()</strong> simply shifts it to the side. The element is still considered part of the page, which can lead to unwanted horizontal scrolling and a menu that does not behave like a true off-canvas drawer.
</p>

<h5>Solution:</h5>

<p>
Before using <strong>transform</strong> to create a sliding menu, remove the navigation from the normal document flow by applying <strong>position: absolute</strong> or <strong>position: fixed</strong>.
</p>

<p>
Once the navigation is positioned independently, <strong>translateX()</strong> can move it on and off the screen without affecting the rest of the page, producing the expected drawer behavior.
</p>

<h5>Key Takeaway — Transform + Position</h5>

<p>
<strong>transform</strong> is designed to move an element visually, not to control its layout behavior.
</p>

<p>
When building off-canvas components such as mobile navigation drawers or dashboard sidebars, <strong>transform</strong> should almost always be combined with <strong>position: absolute</strong> or <strong>position: fixed</strong>. Positioning removes the element from the normal document flow, while <strong>transform</strong> provides the animation.
</p>

<p>
In other words, <strong>position</strong> determines <em>where the element lives</em>, and <strong>transform</strong> determines <em>how it moves</em>.
</p>

<br>

<h4>Issue 6 — <code>position: absolute</code> vs. <code>position: fixed</code></h4>

<h5>Core Difference:</h5>

<p>
Both <strong>position: absolute</strong> and <strong>position: fixed</strong> remove an element from the <strong>normal document flow</strong>.
</p>

<p>
In normal document flow, elements are laid out one after another and affect the position and size of surrounding elements. When an element is removed from this flow, it no longer occupies layout space or pushes other elements around. Instead, it can be positioned independently using properties such as <strong>top</strong>, <strong>right</strong>, <strong>bottom</strong>, and <strong>left</strong>.
</p>

<p>
This is especially useful for UI components that should float above the page rather than become part of the layout, such as navigation drawers, dropdown menus, modals, tooltips, and floating action buttons.
</p>
<br>
<p>
The difference between the two positioning methods is their reference point:
</p>

<p>
<strong>position: absolute</strong> is positioned relative to its nearest positioned ancestor.
</p>

<p>
<strong>position: fixed</strong> is positioned relative to the viewport and remains in the same position while the page is scrolled.
</p>
<br>

<h5>Problem:</h5>

<p>
After deciding to combine <strong>transform</strong> with positioning, the next question is which positioning method should be used: <strong>position: absolute</strong> or <strong>position: fixed</strong>.
</p>

<p>
Both remove the navigation from the normal document flow and allow it to be animated with <strong>transform</strong>, but they produce different behaviors.
</p>

<h5>Why?</h5>

<p>
An element with <strong>position: absolute</strong> is positioned relative to its nearest positioned ancestor (or the viewport if no positioned ancestor exists). It remains part of that section of the page.
</p>

<p>
An element with <strong>position: fixed</strong> is positioned relative to the viewport. It is completely independent of the document and remains in the same place even when the page is scrolled.
</p>

<p>
Because of this difference, the navigation drawer can either be attached to the header or become a full-screen overlay, depending on which positioning method is used.
</p>

<h5>Solution:</h5>

<p>
Choose the positioning method based on the desired navigation behavior.
</p>

<p>
<strong>Use <code>position: absolute</code></strong> when the navigation should appear directly below the header or remain attached to a specific container. This is suitable for small dropdown menus or simple mobile navigation that expands beneath the header.
</p>

<p>
<strong>Use <code>position: fixed</code></strong> when the navigation should behave as an off-canvas drawer that overlays the page. This allows the menu to cover part or all of the viewport, remain visible while scrolling, and work naturally with overlays or backdrop blur effects.
</p>

<h5>Key Takeaway</h5>

<p>
Both <strong>position: absolute</strong> and <strong>position: fixed</strong> work with <strong>transform</strong>. The difference is not the animation—it is where the element is positioned.
</p>

<p>
<strong>position: absolute</strong> attaches the navigation to a container.<br>
<strong>position: fixed</strong> attaches the navigation to the viewport.
</p>

<p>
As a general rule:
</p>

<p>
<strong>Dropdown menu below the header</strong> → <strong>position: absolute</strong><br>
<strong>Slide-in navigation drawer</strong> → <strong>position: fixed</strong><br>
<strong>Dashboard sidebar</strong> → <strong>position: fixed</strong>
</p>

<br>


<hr>




<h3>Final Mental Model</h3>

<h4>1. Height-Based Approach (Normal Flow)</h4>

<p>
<strong>•</strong> Element remains in the normal document flow
<br>
<strong>•</strong> Expanding or collapsing the menu changes the page layout
<br>
<strong>•</strong> Requires <strong>overflow: hidden</strong> to hide collapsed content
<br>
<strong>•</strong> Best suited for content that expands within the page, such as accordions and dropdowns
</p>

<br>

<h4>2. Transform-Based Approach (Overlay)</h4>

<p>
<strong>•</strong> Menu is removed from the normal document flow using <strong>position: absolute</strong> or <strong>position: fixed</strong>
<br>
<strong>•</strong> <strong>transform</strong> animates the menu's visual position without affecting the layout
<br>
<strong>•</strong> Surrounding elements remain in place during the animation
<br>
<strong>•</strong> Produces smooth, GPU-accelerated animations
</p>

<br>



<hr>

<h3>Final Summary — Mobile Navigation Toggle</h3>

<h4>What This Pattern Is</h4>

<p>
A Mobile Navigation Toggle is a responsive navigation pattern where:
<br>
<strong>•</strong> Navigation is always visible on larger screens.
<br>
<strong>•</strong> Navigation is hidden behind a toggle button on smaller screens.
<br>
<strong>•</strong> Selecting the toggle reveals the navigation as a dropdown or sliding drawer.
</p>

<br>

<h4>Available Approaches</h4>

<p><strong>1. Height-Based Approach</strong></p>

<p>
<strong>•</strong> Keeps the navigation in the normal document flow
<br>
<strong>•</strong> Expands and collapses by animating <strong>height</strong>
<br>
<strong>•</strong> Requires <strong>overflow: hidden</strong>
<br>
<strong>•</strong> Better suited for dropdown-style components than sliding drawers
</p>

<p><strong>2. Transform-Based Approach (Recommended)</strong></p>

<p>
<strong>•</strong> Removes the navigation from the normal document flow using <strong>position: absolute</strong> or <strong>position: fixed</strong>
<br>
<strong>•</strong> Uses <strong>transform: translateX()</strong> to slide the menu into view
<br>
<strong>•</strong> Does not change the surrounding layout
<br>
<strong>•</strong> Best suited for modern navigation drawers and mobile side menus
</p>

<br>

<h4>Core Rule</h4>

<pre><code>If the component should expand inside the page → animate height.

If the component should slide over the page → use
position + transform.</code></pre>

<br>

<h4>Recommended Patterns</h4>

<pre><code>Navbar drawer            → position + transform
Dashboard sidebar        → position + transform
Accordion                → height / max-height
Dropdown content         → height / max-height
Modal / Dialog           → position + opacity / transform
Tooltip / Popover        → position: absolute</code></pre>

<br>

<h4>Final Takeaway</h4>

<p>
Building a mobile navigation is not simply about hiding and showing links. It is about choosing the appropriate interaction pattern for the available screen space.
</p>

<p>
On desktop, navigation is typically displayed inline as part of the page layout.
</p>

<p>
On mobile, navigation commonly becomes an independent component that appears only when requested, usually as a dropdown or an off-canvas drawer.
</p>

<p>
Understanding the difference between <strong>normal document flow</strong>, <strong>positioning</strong>, and <strong>transform-based animation</strong> makes it much easier to build responsive navigation, sidebars, drawers, modals, and many other interactive UI components.
</p>


<hr>

<p>
See the full working code and Live Demo of the Project:
</p>

<div class="accent-links-container">


<a class="accent-link" href="https://github.com/falconstoop/JS_DOM-mini-projects" target="_blank" rel="noopener noreferrer">Live Demo</a>


 <a class="accent-link" href="https://js-dom-mini-projects.netlify.app/" target="_blank" rel="noopener noreferrer">GitHub → JS Mini DOM Projects</a>

</div>


</article>
  `;
};

export default mobileNavToggle;
