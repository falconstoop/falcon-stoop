//
const root = document.getElementById("root");

//

const storageQuotaPersistence = () => {
  root.innerHTML = `
    <article class="content">
  <h2>Storage Quota & Persistence</h2>




<h3>What Is Storage Quota?</h3>

<p>
A <strong>storage quota</strong> is the maximum amount of disk space a browser allows a single origin to use for storing data. It's not a fixed number — it's calculated dynamically based on the device's total disk space and the browser's internal policies.
</p>

<p>
In simple terms: your hard drive belongs to the user, not to your website. The browser decides how much of that drive your origin gets to use. That limit is the quota.
</p>
<br>
<p>
<strong>The quota is shared across most storage APIs:</strong> IndexedDB, Cache Storage, File System Access — they all draw from the same pool. It's not a separate limit per API. (<strong>localStorage</strong> is handled differently — see below.)
</p>

<p>
In Chrome, the quota is roughly <strong>60% of the device's total disk space</strong> per origin. In Firefox, it's around <strong>50%</strong>. On mobile devices with limited storage, these numbers are significantly smaller. When an origin reaches its quota, attempts to store more data will fail.
</p>

<br>

<p>
<strong>The quota is per origin — not per website overall, not per browser, not per API.</strong> Each origin gets its own separate pool. They don't share, they don't affect each other. It's not one big bucket for the entire browser.
</p>
<br>
<p>
Remember: origin is defined by <strong>protocol + host + port</strong> only. The path doesn't matter.
</p>

<pre><code>https://example.com
https://example.com/dev
https://example.com/about/team
→ Same origin — share one quota pool.

http://falcon-stoop.dev
https://falcon-stoop.dev
http://www.falcon-stoop.dev
http://falcon-stoop.dev:3000
→ Different origins — each gets its own separate quota.</code></pre>

<br><br>
<p>
<strong>localStorage</strong> has a separate fixed limit — usually <strong>5-10 MB per origin</strong>, regardless of total disk space. It's not part of the 60% - /50% pool.
</p>

<p>
The <strong>60% (Chrome) / 50% (Firefox)</strong> applies to:
<br>
IndexedDB<br>
Cache Storage<br>
File System Access<br>
Service Workers
</p>

<h3>What Counts Toward Quota</h3>

<p>
Not everything stored in the browser counts against your quota. Here's the breakdown:
</p>

<h4>Counts toward quota:</h4>

<p>
localStorage — Web Storage data (separate 5-10 MB fixed limit)<br>
IndexedDB — structured data<br>
Cache Storage — Service Worker caches<br>
File System Access — saved files and directories<br>
Service Workers — registered scripts
</p>

<h4>Does NOT count toward quota:</h4>

<p>
Cookies — small and managed separately<br>
sessionStorage — cleared when the tab closes<br>
Files cached by the browser — HTTP cache, images, stylesheets (browser-managed, not under your control)
</p>

<hr>


<h3>Storage Modes: Best Effort vs. Persistent</h3>

<p>
For each origin, the browser categorizes storage into two modes:
</p>

<h4>1. Best Effort (default)</h4>
<p>
This is the default mode for all storage. The browser <strong>tries</strong> to keep your data, but makes <strong>no guarantees</strong>. When the device runs low on disk space, the browser can <strong>evict</strong> (delete) your data without warning. Your origin's data is treated as disposable.
</p>

<h4>2. Persistent</h4>
<p>
When storage is marked as <strong>persistent</strong>, the browser will <strong>not evict</strong> your data automatically — even under storage pressure. The user would have to manually clear it. Think of it as upgrading your storage from "borrowed space" to "reserved space."
</p>

<pre><code>Best Effort  → Browser can delete your data anytime.
Persistent   → Browser won't touch it. Only the user can clear it.</code></pre>

<hr>

<h3>How to Activate Persistent Storage</h3>

<p>
Persistent storage is not automatic. You have to <strong>request it</strong> from the browser — and the browser can say no.
</p>

<h4>Checking the Current Status</h4>

<p>
First, check if storage is already persistent:
</p>

<pre><code>const isPersisted = await navigator.storage.persisted();
console.log(isPersisted); // true or false</code></pre>

<h4>Requesting Persistent Storage</h4>

<p>
To request persistence, call the <strong>persist()</strong> method. It returns a promise that resolves to <strong>true</strong> if granted, <strong>false</strong> if denied:
</p>

<pre><code>const granted = await navigator.storage.persist();
if (granted) {
  console.log('Storage is now persistent.');
} else {
  console.log('Persistence denied by browser.');
}</code></pre>

<h4>When Will the Browser Grant It?</h4>

<p>
Browsers don't just hand out persistent storage to anyone. Chrome grants it automatically if the user has <strong>engaged with your site</strong> — bookmarked it, installed it as a PWA, or visited frequently. Firefox shows a <strong>permission prompt</strong> to the user.
</p>

<pre><code>Chrome  → Auto-grants if site is bookmarked, installed (PWA), or frequently visited.
Firefox → Prompts the user for permission.</code></pre>



<h4>persist() vs persisted()</h4>

<p>
These two methods are easy to mix up:
</p>

<pre><code>navigator.storage.persist()   → Request persistence (ask the browser)
navigator.storage.persisted()  → Check if already persistent (no request)</code></pre>

<p>
<strong>persist()</strong> — makes the actual request. The browser decides to grant or deny.<br>
<strong>persisted()</strong> — just checks the current status. Returns <strong>true</strong> or <strong>false</strong> without asking anything.
</p>

<p>
Call <strong>persisted()</strong> first to see where you stand. Only call <strong>persist()</strong> if you need to ask.
</p>

<hr>

<h3>Checking Quota Usage</h3>

<p>
You can check how much storage your origin is using with the <strong>Storage Manager API</strong>:
</p>

<pre><code>const estimate = await navigator.storage.estimate();
console.log(estimate.usage);  // How much you've used (bytes)
console.log(estimate.quota);  // Total available (bytes)</code></pre>

<p>
<strong>estimate()</strong> returns two values:
</p>

<p>
<strong>usage</strong> — how much storage your origin is currently using, in bytes.<br>
<strong>quota</strong> — the total available space for your origin, in bytes.
</p>

<p>
This includes everything: IndexedDB, Cache Storage, File System Access, Service Workers. It does <strong>not</strong> include <strong>localStorage</strong> — that's tracked separately.
</p>
<br>
<p>
<strong>Note:</strong> All Storage Manager API methods return promises — remember to wrap calls in an <strong>async function</strong> or use <strong>.then()</strong>.
</p>


  </article>
  `;
};

export default storageQuotaPersistence;
