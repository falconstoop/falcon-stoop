//
const root = document.getElementById("root");
//

const clientsideStorage = () => {
  root.innerHTML = `
    <article class="content">
  <h2>Client-Side Storage</h2>


<div class="blockquote-wrapper">
<blockquote>
    <p>"Everything in war is very simple, but the simplest thing is difficult."</p>
    <footer>— Carl von Clausewitz —</footer>
    <p class="quote-twist">
     Storing data in the browser sounds simple — just setItem() and getItem(). But origin restrictions, synchronous blocking, quota limits, and deprecated APIs make the simplest thing surprisingly difficult.
    </p>
</blockquote>
</div>

<br>




<h3>Before we Start</h3>

<p>
The entire <strong>Browser Storage APIs</strong> section is inspired by <strong>Maximiliano Firtman's "Web Storage APIs"</strong> course on Frontend Masters, combined with my own research, hands-on testing, and real-world debugging across different browsers and devices. The goal is to bridge the gap between theory and what actually happens when you ship code to production.
</p>

<h4>You're Already Using These APIs — You Just Don't Know It</h4>
<p>
You might already be using browser storage <strong>without realizing it</strong>. Tools like Firebase, Apollo Client, TanStack Query, and Supabase all use IndexedDB and Cache Storage under the hood. When you save data offline in a React app, there's a good chance IndexedDB is doing the work — you just don't see it.
</p>

<hr>

<h3>What Is an Origin?</h3>

<p>
At its simplest, an origin is the <strong><em>domain</em></strong>. But technically, it's the combination of three parts:
</p>

<p>
<strong>Scheme</strong> (protocol) + <strong>Host</strong> (domain) + <strong>Port</strong>
</p>

<pre><code>https://example.com:443
  ↑       ↑        ↑
scheme   host     port</code></pre>

<p>
Storage is <strong>scoped to a single origin</strong>. Even seemingly small variations create entirely separate origins — and separate storage buckets. All of these are different origins:
</p>

<pre><code>http://falcon-stoop.dev
https://falcon-stoop.dev
http://www.falcon-stoop.dev
http://falcon-stoop.dev:3000</code></pre>

<p>
Data stored on one origin is completely invisible to another. This is a security feature, not a bug.
</p>



<hr>


<h3>Types of Browser Storage</h3>

<p>
All browser storage mechanisms ultimately do the same thing: <strong>save data on the user's device</strong>. The differences between them come down to three things:
</p>

<p>
<strong>The API</strong> — how you save and retrieve data<br>
<strong>The format</strong> — key-value strings, objects, or request/response pairs<br>
<strong>The use case</strong> — simple settings, structured data, or offline network responses
</p>
<br>
<p>
Browsers expose multiple storage mechanisms — each with its own API, capacity, persistence model, and use case. Some are old and deprecated, some are new and experimental. Knowing which one to reach for depends on <strong>what</strong> you're storing, <strong>how long</strong> it needs to live, and <strong>who</strong> should have access to it.
</p>
<br>
<h4>1. Cookies   <span class="deprecated">(Avoid using for storage)</span></h4>

<p>
Cookies are the oldest client-side storage mechanism. They're small pieces of data (up to 4KB) stored as key-value pairs and <strong>automatically sent to the server with every HTTP request</strong>.
</p>

<p>
This is exactly why cookies are <strong>not suitable for general storage</strong>: anything you put in a cookie gets attached to every request — headers, images, API calls — whether the server needs it or not and that impact the <strong>performance</strong>. It wastes bandwidth and exposes data unnecessarily.
</p>
<br>

<h4>2. Web Storage (localStorage & sessionStorage)  <span class="deprecated">(Avoid using for storage)</span></h4>

<p>
Web Storage is the collective name for <code>localStorage</code> and <code>sessionStorage</code>. Unlike cookies, this data <strong>stays on the client</strong> — it's never automatically sent to the server with requests.
</p>

<p>
Both APIs are <strong>synchronous</strong>: when you call <code>getItem()</code> or <code>setItem()</code>, the browser blocks the main thread until the operation completes. For small reads and writes this is negligible. But for larger data or frequent access, it can freeze the UI — which is the main reason newer storage APIs were introduced.
</p>

<pre><code>// Synchronous: the thread waits
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme"); 
// blocks thread until done</code></pre>


<h4>3. WebSQL <span class="deprecated">(deprecated)</span></h4>

<p>
WebSQL was an early attempt to bring a full relational database to the browser, using SQLite under the hood. Developers could write actual SQL queries directly against client-side data.
</p>

<p>
It was <strong>deprecated in 2010</strong> and never standardized across browsers. Only Chrome and Safari ever implemented it. Firefox and Internet Explorer refused, and the W3C officially abandoned the specification. It's still available in some browsers for backward compatibility, but <strong>should not be used in new projects</strong>.
</p>


<h4>4. Application Cache <span class="deprecated">(deprecated)</span></h4>

<p>
Application Cache (AppCache) was an early attempt at making web apps work offline. It used a <strong>cache manifest file</strong> to tell the browser which resources to store locally.
</p>

<pre><code>&lt;html manifest="app.appcache"&gt;</code></pre>

<p>
It was <strong>deprecated in favor of Service Workers and the Cache API</strong>. AppCache was notoriously difficult to work with — its caching behavior was aggressive and unpredictable, often leaving developers unable to update their own apps without clearing the browser cache manually.
</p>

<h4>5. IndexedDB</h4>
<p>
IndexedDB is a <strong>full-featured, asynchronous, NoSQL object database</strong> built into the browser — think of it as a <strong>MongoDB-like database running natively in the browser</strong>. It organizes data into <strong>object stores</strong> (similar to MongoDB collections), where each record is a full object — not just a simple key-value pair.
</p>

<p>
Unlike Web Storage, IndexedDB is <strong>asynchronous</strong>: operations don't block the main thread. It supports transactions, indexes, and complex queries — making it the go-to choice for storing structured client-side data at scale.
</p>

<h4>6. File and Directory APIs <span class="deprecated">(deprecated)</span></h4>

<p>
The original File and Directory APIs allowed web apps to read and write to a sandboxed section of the user's file system. It was <strong>never widely adopted</strong> and has since been deprecated.
</p>

<p>
The modern replacement is the <strong>File System Access API</strong> — currently only supported in Chromium-based browsers. The original API should not be used in new projects.
</p>
<h4>7. Cache Storage</h4>

<p>
The Cache API stores data on the user's device just like other storage mechanisms — but it's specifically designed for <strong>offline web experiences</strong>. It's the storage layer behind <strong>Service Workers</strong> and powers Progressive Web Apps (PWAs).
</p>
<br>
<p>
The key difference is <strong>how you access the data</strong>: unlike other storage where you retrieve data with a simple key, Cache Storage requires an HTTP request to look up a saved HTTP response. You make a request — if the response is cached, you get it instantly without touching the network. In short: it's HTTP responses served without a network connection.
</p>
<br>

<pre><code>// Saving a response to cache
const cache = await caches.open('my-cache');
cache.put(request, response.clone());

// Retrieving from cache
const cachedResponse = await cache.match(request);</code></pre>

<p>
<strong>Use for:</strong> offline pages, static assets, API responses you want available without internet.
</p>


<h4>8. File System Access API</h4>

<p>
The File System Access API is the <strong>modern replacement for the deprecated File and Directory APIs</strong>. It allows web applications to read, write, and manage files and folders directly on the user's local file system — with the user's explicit permission.
</p>

<p>
Unlike the old sandboxed approach, this API gives access to the <strong>real file system</strong>. Users grant access to a specific file or directory via a native file picker, and the app can then read, edit, and save files just like a native application.
</p>

<p>
<strong>Note:</strong> currently only supported in Chromium-based browsers (Chrome, Edge, Opera).
</p>

<br>

<hr>

<h4>What We'll Cover in Detail</h4>

<p>
Out of these eight, we'll focus on the 3 that matter for modern web development:
</p>
<br>
<p>
<strong>IndexedDB</strong> — the NoSQL database for structured client-side data.<br>
<strong>Cache Storage</strong> — the request-response cache powering offline PWAs.<br>
<strong>File System Access</strong> — the native file system API for desktop-class web apps.
</p>
<br>


<h4>How They Compare</h4>

<p>
<strong>IndexedDB</strong> — API: asynchronous transactions | Format: structured objects | Use case: structured data at scale<br>
<strong>Cache Storage</strong> — API: request/response matching | Format: HTTP responses | Use case: offline assets & responses<br>
<strong>File System Access</strong> — API: file handles & pickers | Format: raw files | Use case: native file read/write
</p>



</article>
  `;
};

export default clientsideStorage;
