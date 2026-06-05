//
const root = document.getElementById("root");
//

const whatIsApi = () => {
  root.innerHTML = `
    <article class="content">
  <h2>What Is API?</h2>

  <div class="blockquote-wrapper">
<blockquote>
    <p>"Most men do not think; they only think they think."</p>
    <footer>— Bertrand Russell —</footer>
    <p class="quote-twist">
     Most developers don't understand APIs; they only think they do. They use them daily — fetch(), localStorage, Stripe — but can't define the term. This page changes that.
    </p>
</blockquote>
</div>




<h3>API</h3>

<p>
<strong>API</strong> stands for <strong>Application Programming Interface</strong>. Breaking it down:
</p>

<p>
<strong>Application</strong> — the software (not the person)<br>
<strong>Programming</strong> — related to code and functions<br>
<strong>Interface</strong> — the door, the rules, the contract
</p>
<br>
<p>
So an API is an <strong>interface for programming an application</strong> — a way for other software to talk to it.
</p>

<hr>

<h3>The Big Picture</h3>

<p>
1. Programmers build an entire application (like Twitter, a calculator, a weather service).<br>
That application has many internal parts: database, logic, security, etc.
</p>

<p>
2. Inside that application, they build an <strong>API</strong> — a set of rules and functions. The API is a <strong>small part</strong> of the application, not the whole app.
</p>

<p>
3. The API alone cannot run or do anything without the rest of the application behind it.
</p>

<p>
Programmers build <strong>Application B</strong>. Inside it, they create an API — a set of rules and functions. That API sits on platform B, accepts requests from <strong>Application A</strong>, and sends back responses to Application A.
</p>

<p>
<strong>In short:</strong> An API is a set of rules and functions inside an application that lets other applications talk to it. It receives requests and sends back responses.
</p>

<hr>

<h3>Two Main Groups of APIs</h3>

<h4>Group 1: Web APIs</h4>
<p>
Live on a remote server, called over HTTP / internet.
</p>

<p>
Examples: Google Maps API, Stripe API, Twitter API, OpenWeatherMap API, YouTube API, OpenAI API, PayPal API, Twilio API, Spotify API, GitHub API, AWS API, Facebook Graph API, WhatsApp API.
</p>

<h4>Group 2: Local APIs</h4>
<p>
Live on your local machine, no internet required.
</p>

<p>
Examples: Windows API, Java API, Python Standard Library API, DirectX API, Vulkan API, Camera API, Bluetooth API, File System API, USB API.
</p>
<br>
<p>
<strong>Browser APIs</strong> fall here too: <code>localStorage</code>, <code>geolocation</code>, <code>alert</code>, <code>console.log</code>, <code>fetch</code>, <code>document.querySelector</code>, <code>addEventListener</code>, <code>setTimeout</code>, <code>setInterval</code>, <code>WebSocket</code>, IndexedDB, Clipboard API, History API, Fullscreen API, Drag and Drop API, Web Storage API.
</p>

<hr>

<h3>A Separate Category: API Design Styles</h3>

<p>
<strong>REST</strong>, <strong>SOAP</strong>, and <strong>GraphQL</strong> are <strong>not APIs</strong>. They are sets of rules — design styles, protocols, or query languages — that tell you <strong>how to build</strong> a Web API.
</p>

<p>
<strong>REST</strong> — a style using simple HTTP commands (GET, POST, PUT, DELETE)<br>
<strong>SOAP</strong> — a strict protocol using XML messages<br>
<strong>GraphQL</strong> — a language that lets you ask for exactly the data you need
</p>

<hr>

<h3>Browser API vs. Web API</h3>

<pre><code>Browser API — Built into your browser.
              Lets JavaScript control the browser.
              Examples: localStorage, alert(), fetch.

Web API     — Lives on a remote server.
              Lets any app send requests over the internet.
              Examples: Google Maps API, Stripe API.</code></pre>

<p>
<strong>The difference in one line:</strong> Browser API talks to the browser. Web API talks to a server.
</p>

<hr>

<h3>REST API</h3>

<p>
A <strong>REST API</strong> is a specific style of building a Web API — it's a set of design rules, not a technology itself.
</p>

<h4>REST vs. GraphQL</h4>

<p>
<strong>REST</strong> — a design pattern (rules) only. No special syntax.<br>
<strong>GraphQL</strong> — a design pattern (rules) + its own special syntax (query language).
</p>

<hr>

<br>
<p><strong>Author's Note:</strong> The term "API" gets thrown around loosely. In conversations, "API" often means "Web API." But understanding the broader definition — that <code>console.log()</code> and Stripe are both APIs, just at different levels — is what separates memorization from real understanding.</p>




  </article>
  `;
};

export default whatIsApi;
