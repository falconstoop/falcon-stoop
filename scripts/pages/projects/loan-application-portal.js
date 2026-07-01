//
const root = document.getElementById("root");
//
const loanApplicationPortal = () => {
  root.innerHTML = `
<article class="content">

<h2>Loan Application Portal</h2>


<h3>Before We Start</h3>

<p>
As the scope of this project grew, I decided to structure it using <strong>Component-Based Architecture</strong>, <strong>Modular Architecture</strong>, and a custom <strong>Redux-like Global State Management</strong> system.
</p>

<p>
My goal was not only to build a scalable and maintainable application, but also to gain a deeper understanding of the architectural principles behind modern frontend frameworks such as React. By implementing these concepts in Vanilla JavaScript first, I wanted to understand how they work behind the scenes before relying on a framework.
</p>


<h3>Engineering Documentation</h3>

<p>
This document serves as both a <strong>Software Design Document</strong> and an <strong>Architecture Guide</strong> for the project.
</p>

<p>
Rather than simply showcasing the final result, it documents the engineering process behind the application—from architectural decisions and design patterns to implementation strategies and system design.

It also explores the challenges encountered during development, the reasoning behind key technical decisions, the trade-offs considered, and how different parts of the application evolved to form a scalable and maintainable architecture.
</p>


<br>

<pre><code>Documentation Overview
|
├── Architectural Concepts
│   ├── Component-Based Architecture
│   ├── Modular Architecture
│   └── Component vs Modular
|
├── State Management Architecture
│   ├── Why Global State?
│   ├── Redux-like Store
│   ├── Store Structure
│   └── Data Flow
|
├── Auth Page - UI & Routing Decisions
│   ├── Auth Page Navigation
│   ├── a tag vs. button in an SPA
│   ├── Single Route vs. Separate Routes
│   └── Lessons Learned
│
├── Dashboard Pages
│   ├── Dashboard Architecture (Component Design)
│   ├── Component Reusability
│   ├── Configuration over Duplication
│   └── Vanilla JS vs. React Approach
└── 
│   
└── ....</code></pre>




<hr>


<h4>Component-Based Architecture</h4>

<p>
Component-Based Architecture serves as the <strong>blueprint</strong> for structuring the application. Instead of building the UI as one large page, the interface is divided into small, independent, and self-contained components.
</p>

<p>
A component is more than just a visual element. It encapsulates everything related to a specific part of the interface, including:
</p>

<p>
<strong>•</strong> Its own UI
<br>
<strong>•</strong> Its own functionality
<br>
<strong>•</strong> Its own event handling
<br>
<strong>•</strong> Its own local state (when needed)
</p>

<p>
For example, instead of treating the dashboard as one large page, it is divided into independent components:
</p>

<pre><code>Dashboard
│
├── LoanSection
├── ReportSection
├── ProfileSection
└── Notifications</code></pre>

<p>
Each component has a single responsibility and can be developed, tested, maintained, reused, and updated independently without affecting unrelated parts of the application.
</p>

<p>
This approach improves scalability, maintainability, readability, and reusability while making the application much easier to evolve over time.
</p>

<br>
<h5>Advantages of Component-Based Architecture:</h5>

<p>
This architectural approach provides several important advantages:
</p>

<p>
<strong>• Reusability</strong> — Components can be reused across different parts of the application.
<br>
<strong>• Maintainability</strong> — Changes remain isolated, making the codebase easier to maintain.
<br>
<strong>• Testability</strong> — Smaller, independent components are easier to test.
<br>
<strong>• Scalability</strong> — New features can be added without significantly affecting existing components.
<br>
<strong>• Loose Coupling</strong> — Components have minimal dependencies on one another, reducing the impact of changes.
</p>

<br>

<h4>Modular Architecture</h4>

<p>
Once the application's structure has been defined through components, each component is internally organized using Modular Architecture.
</p>

<p>
Instead of placing all of a component's logic into one large file, every responsibility is separated into its own module.
</p>

<p>
For example, the <strong>LoanSection</strong> component can be organized like this:
</p>

<pre><code>LoanSection/
├── template.js
├── validation.js
├── events.js
├── api.js
└── state.js</code></pre>

<p>
Each module has a single responsibility:
</p>

<p>
<strong>• template.js</strong> → Renders the user interface.
<br>
<strong>• validation.js</strong> → Handles form validation.
<br>
<strong>• events.js</strong> → Manages user interactions and event listeners.
<br>
<strong>• api.js</strong> → Handles communication with external services.
<br>
<strong>• state.js</strong> → Manages the component's local state.
</p>

<p>
By separating responsibilities into focused modules, the code becomes easier to read, debug, test, maintain, and extend.
</p>

<br>

<h5>Advantages of Modular Architecture:</h5>

<p>
Organizing each component into smaller modules also provides several benefits:
</p>

<p>
<strong>• Single Responsibility</strong> — Each module focuses on one specific task.
<br>
<strong>• Readability</strong> — Smaller files make the code easier to understand and navigate.
<br>
<strong>• Maintainability</strong> — Individual modules can be modified without affecting unrelated logic.
<br>
<strong>• Debugging</strong> — Isolating responsibilities makes issues easier to locate and fix.
<br>
<strong>• Reusability</strong> — Utility modules can often be reused by multiple components.
<br>
<strong>• Extensibility</strong> — New functionality can be added with minimal changes to existing modules.
</p>

<br>

<h4>Component-Based vs. Modular Architecture</h4>

<p>
Although these two architectural approaches are closely related, they solve different problems and complement each other.
</p>

<p>
The application is <strong>first divided into components</strong> based on the user interface. Each component represents a complete feature or section of the UI with its own responsibility.
</p>

<p>
After a component has been defined, its internal implementation is <strong>organized into smaller modules</strong>, where each module is responsible for a single concern.
</p>

<p>
A simplified structure looks like this:
</p>

<pre><code>Dashboard
│
├── LoanSection
│   ├── template.js
│   ├── validation.js
│   ├── events.js
│   ├── api.js
│   └── state.js
│
├── ReportSection
│   ├── chart.js
│   ├── statistics.js
│   └── export.js
│
└── ProfileSection
    ├── profileApi.js
    ├── render.js
    └── events.js</code></pre>

<p>
In other words:
</p>

<p>
<strong>• Component-Based Architecture</strong> organizes the application's <strong>user interface</strong> into independent, reusable, and self-contained building blocks.
<br>
<strong>• Modular Architecture</strong> organizes the <strong>implementation</strong> of those building blocks into smaller, focused modules with clear responsibilities.
</p>

<p>
Components define <strong>what the application is made of</strong>.
</p>

<p>
Modules define <strong>how each component is implemented internally</strong>.
</p>

<p>
Together, these two architectural approaches create a clean, scalable, and maintainable codebase that is significantly easier to understand, debug, and extend as the application grows.
</p>

<br>

<h4>Learning Goal</h4>

<p>
Beyond building a realistic loan application platform, this project served as an opportunity to strengthen my software architecture and problem-solving skills.
</p>

<p>
Throughout its development, I focused on applying architectural principles, organizing a scalable codebase, and writing maintainable, production-oriented code. Building these patterns from scratch in Vanilla JavaScript allowed me to develop a deeper understanding of the concepts that modern frontend frameworks abstract away.
</p>

<p>
The result is not only a functional application, but also a practical exploration of scalable frontend architecture and engineering best practices.
</p>


<hr>


<h3>State Management Architecture</h3>

<p>
As the application grew, managing shared data between multiple components became increasingly complex. Relying solely on local component state would have led to duplicated logic, inconsistent data, and unnecessary communication between unrelated components.
</p>

<p>
To address these challenges, I implemented a custom <strong>Redux-like Global State Management</strong> system. While inspired by Redux, it was built entirely from scratch in Vanilla JavaScript to better understand the underlying principles of centralized state management.
</p>

<br>

<h4>Why Global State?</h4>

<p>
Initially, each component managed its own local state. This approach worked well for isolated features, but became difficult once multiple components needed access to the same data.
</p>

<p>
Examples include:
</p>

<p>
<strong>•</strong> User authentication
<br>
<strong>•</strong> Current user information
<br>
<strong>•</strong> Loan applications
<br>
<strong>•</strong> Notification updates
<br>
<strong>•</strong> Theme preferences
<br>
<strong>•</strong> Global loading and error states
</p>

<p>
Passing data through multiple components quickly became difficult to maintain. A centralized global store eliminated this problem by providing a <strong>single source of truth</strong> that every component could access when needed.
</p>

<br>

<h4>Redux-like Store</h4>

<p>
Instead of using Redux directly, I implemented a lightweight Redux-inspired store to better understand how global state management works internally.
</p>

<p>
The store is responsible for:
</p>

<p>
<strong>•</strong> Holding the application's global state
<br>
<strong>•</strong> Updating state through dispatched actions
<br>
<strong>•</strong> Notifying subscribed components when the state changes
<br>
<strong>•</strong> Keeping data predictable and synchronized across the application
</p>

<p>
This implementation focuses on understanding the core concepts rather than replicating every Redux feature.
</p>

<br>

<h4>Store Structure</h4>

<p>
The global state is organized into logical domains instead of one large object.
</p>

<p>
A simplified example looks like this:
</p>

<pre><code>store
├── auth
├── user
├── loan
├── notifications
├── ui
└── settings</code></pre>

<p>
Each domain manages a specific part of the application, making the state easier to understand, maintain, and extend.
</p>

<p>
Keeping related data grouped together also helps reduce complexity as new features are added.
</p>

<br>

<h4>Data Flow</h4>

<p>
The application follows a predictable, one-way data flow.
</p>

<p>
Whenever a user performs an action, the request follows the same lifecycle:
</p>

<pre><code>User Interaction
        │
        ▼
Dispatch Action
        │
        ▼
Business Logic
        │
        ▼
Update Global Store
        │
        ▼
Notify Subscribers
        │
        ▼
Re-render UI</code></pre>

<p>
By centralizing state updates, every component always reflects the latest application state without manually synchronizing data between different parts of the interface.
</p>

<p>
This predictable flow makes the application easier to debug, reason about, and scale as additional features are introduced.
</p>


<br>

<h4>Related Case Study</h4>

<p>
This project uses the same Redux-like shared state architecture explored in my <strong>Single-View Form</strong> case study.
</p>

<p>
While that project introduces the concept through a much smaller application and explains the implementation step by step, this project applies the same architectural principles on a larger scale.
</p>

<p>
If you're interested in how the store was designed and why this pattern was chosen, you can read the full case study here.
</p>

<p>
<a class="accent-link" href="#/projects/form">→ Single-View Form: Building a Redux-like Shared State from Scratch</a>
</p>



<hr>


<h3>Auth Page — Design & Architecture Decisions</h3>

<h4>a tag vs. button tag for SPA Navigation</h4>

<h5>— Does It Matter?</h5>

<p>
<strong>Context:</strong> While building the auth flow for my Loan Application Portal, I had to decide how users navigate between the Login and Sign Up pages. Two options:
</p>

<p>
<strong>Option 1: a tag with hash route</strong>
<br>
<strong>•</strong> Uses <strong>href="#/auth/signup"</strong>
<br>
<strong>•</strong> Semantic, accessible by default
<br>
<strong>•</strong> No JavaScript required
<br>
<strong>•</strong> Browser handles it natively
</p>
<br>
<p>
<strong>Option 2: button with click handler</strong>
<br>
<strong>•</strong> Manually updates <strong>location.hash</strong>
<br>
<strong>•</strong> Gives full control — can run logic before navigation
<br>
<strong>•</strong> But adds unnecessary complexity for simple page-to-page links
</p>

<p>
<strong>What I chose:</strong> a tags for page-to-page navigation (separate routes), reserving button elements for actions that submit data or trigger behavior. This keeps my router simple and my HTML semantic.
</p>

<p>
<strong>Takeaway:</strong> SPAs don't mean abandoning native browser features. Sometimes the simplest HTML element is the right tool.
</p>

<br>

<h4>Learning Through Contrast — Two Approaches Across Projects</h4>

<p>
In previous form projects, I used a <strong>single route (#/auth)</strong> for both Login and Sign Up, with an <strong>auth.js</strong> parent module controlling the toggle between them via JavaScript. Navigation between the two forms was handled with <strong>button</strong> elements and click handlers that updated the UI state.
</p>

<p>
For this project, I took a different approach: <strong>separate routes (#/auth/login and #/auth/signup)</strong>, each with its own standalone page module. This eliminated the need for a parent controller — the router handles switching, not a toggle. And instead of button click handlers for navigation, I used simple a tags with hash routes. It's simpler, more semantic, and a good reminder that SPAs don't need to over-engineer basic browser behavior.
</p>

<p>
Trying different approaches across projects helps me understand the trade-offs firsthand. Single-route with toggle feels more app-like; separate routes with anchor tags are more web-native. <strong>Neither is wrong — context decides.</strong>
</p>

<hr>


<h3>Dashboard Architecture: Component Reusability Without React</h3>

<h4>The Problem</h4>
<p>
The app has two dashboards — <strong>User</strong> and <strong>Admin</strong>. Both share the same layout skeleton (header + sidebar + main content), but the content inside each is completely different. The number of navigation items, their labels, and their destinations vary between the two roles.
</p>

<br>

<h4>Two Approaches</h4>

<p>
<strong>Method 1: Individual Dashboards</strong> — Build each dashboard separately. Simple and direct, but duplicates the header and sidebar structure across files.
</p>

<p>
<strong>Method 2: Shared Components with Configuration</strong> — Create a single <strong>Header.js</strong> and <strong>Sidebar.js</strong> that accept a configuration object. Each dashboard calls them with its own data. The component handles layout and styling; the data defines the content.
</p>

<br>

<h4>The React Approach (as reference)</h4>
<p>
React solves this with <strong>props</strong> — one <strong>&lt;Sidebar&gt;</strong> component receives an array of menu items and renders whatever it's given.
</p>

<br>

<h4>What I Chose</h4>
<p>
<strong>Method 2 — shared components with configuration.</strong> I applied the same pattern without React, passing JavaScript objects instead of props.
</p>

<p>
Method 1 would have been faster to implement — just two independent files, no abstraction to think through. But Method 2 forced me to design a clean interface between the dashboard and its components, think about what data each component needs, and handle the rendering dynamically. It's more work upfront, but the result is a reusable architecture that won't need refactoring as either dashboard grows.
</p>

<p>
Building it manually deepened my understanding of what frameworks abstract away.
</p>




<hr>

<h4>Source Code</h4>

<p>

The complete implementation, including all architectural concepts discussed throughout this document, is available on GitHub.


</p>
<br>
<div class="accent-links-container">
<em>View the Source Code <a href="https://github.com/falconstoop/loan-application-portal" class="accent-link" target="_blank" rel="noopener noreferrer">GitHub → Loan Application Portal</a></em>
</div>

</article>
  `;
};

export default loanApplicationPortal;
