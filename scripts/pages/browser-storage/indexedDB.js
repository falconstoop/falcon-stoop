//
const root = document.getElementById("root");
//
const indexedDB = () => {
  root.innerHTML = `
<article class="content">
  <h2>IndexedDB</h2>

<h3>What Is IndexedDB?</h3>

<p>
IndexedDB is a <strong>full-featured, asynchronous, NoSQL object database</strong> built into the browser. It stores structured data — JavaScript objects, files — not just strings. Think of it as a <strong>MongoDB-like database running natively in the browser</strong>. Although it's NoSQL by nature, wrappers can add SQL-like querying on top if needed.
</p>

<br>

<p>
<strong>One important detail:</strong> when you store an object in IndexedDB, the browser <strong>clones</strong> it — and cloning happens <strong>synchronously</strong>. The original object is not stored; a copy is made and saved. This means changes to the original won't affect the stored version, and vice versa. It also means very large objects can briefly block the main thread during cloning — even though the API itself is asynchronous. So when storing large objects, you may encounter performance penalties.
</p>

<br>

<h4>IDB</h4>

<p>
The native IndexedDB API is <strong>verbose and callback-heavy</strong>. Almost nobody uses it directly. Instead, developers use wrapper libraries like <strong>idb, Dexie, localForage, or PouchDB</strong> that make the syntax cleaner with promises. In this guide, we'll use <strong>idb</strong> — the lightest wrapper, with the native API, but with promises instead of callbacks. It's the best choice for learning because you understand what's happening under the hood.
</p>
<br>

<p>
<strong>You can use idb in two ways:</strong>
</p>
<br>
<p>
<strong>1. CDN (UMD build)</strong> — Add the script tag and <strong>idb</strong> becomes a global variable. No imports needed.
</p>
<pre><code>&lt;script src="https://cdn.jsdelivr.net/npm/idb@8/build/umd.js"&gt;&lt;/script&gt;</code></pre>

<p>
<strong>UMD</strong> (Universal Module Definition) means the script works in any environment — browser globals, CommonJS, or AMD — so you don't need modules or a bundler.
</p>
<br>
<p>
<strong>2. npm</strong> — Install with <strong>npm install idb</strong> and import <strong>{ openDB, deleteDB }</strong> in your JS file.
</p>
<pre><code>npm install idb</code></pre>
<br>


<hr>

<h3>The Structure of IndexedDB</h3>

<p>
Regardless of which wrapper you choose, the <strong>underlying structure is always the same</strong>:
</p>

<p>
1. <strong>Open a database</strong> — with a name and version<br>
2. <strong>Create object stores</strong> — in the upgrade callback<br>
3. <strong>Perform CRUD operations</strong> — on those stores
</p>


<h4>1. Open a Database</h4>
<p>
Every IndexedDB project starts with a database. You give it a <strong>name</strong> — one database per project (like <strong>BMWConfigurator</strong>) — and a <strong>version number</strong>, starting at <strong>1</strong>.
</p>

<p>
Inside that database, you create <strong>object stores</strong> for each category of data your project needs:
</p>

<pre><code>"BMWConfigurator" database
  ├── "configs" object store
  ├── "users" object store
  └── "orders" object store</code></pre>

<p>
The <strong>version number is only for changes to the object stores themselves</strong> — adding a new store, removing one, or modifying an existing store's setup. It has nothing to do with the data inside them.
</p>

<p>
Here's how it works: you start with version <strong>1</strong> and create the <strong>configs</strong> store. Later, you realize you also need a <strong>users</strong> store. You bump the version to <strong>2</strong> in your code. The browser sees the higher number and fires the <strong>upgrade callback</strong> — a special function that only runs when the version increases. Inside that callback, you tell the browser what structural changes to make. In this case: "add a <strong>users</strong> store."
</p>
<br>
<p>
Everyday CRUD operations — adding a user to the <strong>users</strong> store, updating a config — <strong>never change the version</strong>. The version only moves when the structure of your database changes.
</p>

<pre><code>// Open a DB
const db = await idb.openDB(name, version);

// Open a DB and handle upgrade
const db = await idb.openDB(name, version, {
  upgrade(db, oldVersion, newVersion) {
    // Create stores here
  }
});</code></pre>
<br>
<pre><code>// Delete a DB
await idb.deleteDB(name);

// Delete a DB and handle block
await idb.deleteDB(name, {
  blocked() {
    // Another tab is blocking the delete
  }
});</code></pre>

<br>
<h4>2. Create Object Stores</h4>

<p>
Object stores are where your data actually lives. Each store holds one type of data — think of them as <strong>tables in SQL or collections in MongoDB</strong>. One store for configs, another for users, another for orders. They're all inside the same database but keep data separate.
</p>

<p>
Object stores are created inside the <strong>upgrade callback</strong> — the same function that fires when the version changes. This is where you define the structure: what stores exist, what <strong>key</strong> each record uses (like an ID), and what <strong>indexes</strong> you need for querying.
</p>

<pre><code>// Inside the upgrade callback
const objectStore = await db.createObjectStore('configs', { keyPath: 'id' });
const objectStore2 = await db.createObjectStore('users', { keyPath: 'id' });
const objectStore3 = await db.createObjectStore('orders', { keyPath: 'id' });</code></pre>

<p>
Once a store is created, you can add, read, update, and delete data inside it — without ever touching the version number again.
</p>

<br>
<h4>3. Perform CRUD Operations</h4>

<p>
Once the database and object stores exist, you can <strong>Create, Read, Update, and Delete</strong> data. All operations in IndexedDB happen inside <strong>transactions</strong> — a group of operations that either all succeed or all fail together.
</p>

<pre><code>// Create / Add
await db.add(storeName, value);

// Read / Get
await db.get(storeName, key);

// Read / Get All
await db.getAll(storeName);

// Update / Put
await db.put(storeName, value);

// Delete one record
await db.delete(storeName, key);

// Clear all records
await db.clear(storeName);

// Get count of value / objects in a store
const count = await db.count(storeName);</code></pre>



<br>
<p>
<strong>What is a transaction?</strong> A safety net. Before you read or write data, you open a transaction on a specific object store. All your operations run inside it. When the transaction ends, everything saves together.
</p>

<p>
Think of it like saving a car configuration: you pick the model, color, engine, interior, and packages. All five choices are saved together. If something goes wrong (internet cuts out halfway), you don't end up with half a config — the whole group is undone.
</p>

<br>
<p>
<strong>With idb, transactions are handled automatically</strong> when you use <strong>db.add()</strong>, <strong>db.put()</strong>, etc. But here's what's happening under the hood with the native API (note: <strong>db</strong> here is the raw IndexedDB database, not the idb wrapper):
</p>

<pre><code>// Open a transaction on the 'configs' store
const tx = db.transaction('configs', 'readwrite');
const store = tx.objectStore('configs');

// Save a complete car config in one group
store.add({ id: 1, model: 'X5', color: 'Black', engine: 'V8', interior: 'Leather', packages: ['M Sport'] });
store.add({ id: 2, model: 'X3', color: 'White', engine: 'V6', interior: 'Alcantara', packages: [] });

// Transaction ends — both configs save together, or neither does.</code></pre>

<p>
<strong>Important:</strong> transactions close automatically when they finish. Once a transaction closes, you can't add more operations to it — you open a new one.
</p>

<p>
This is the part wrappers like <strong>idb</strong> make much cleaner. But the structure — database → store → transaction → operation — is always the same.
</p>


<hr>

<h3>Indexes</h3>

<p>
Indexes let you query object stores by properties <strong>other than the primary key</strong>. Without an index, you can only look up records by their <strong>keyPath</strong>. With an index, you can search by any property you've indexed.
</p>

<pre><code>// Create an index inside the upgrade callback
objectStore.createIndex('indexName', 'property', { unique: false });

// Query using the index
const result = await db.getFromIndex(storeName, 'indexName', value);
</code></pre>
  

<hr>

<h3>Summary</h3>
<p>
 one database per project. Inside it, object stores for each data category. Version number tracks structural changes to stores — not data changes. Transactions wrap your operations so they either all succeed or all fail. CRUD is just: open a transaction, pick a store, do your work.
</p>

<p>
IndexedDB Supports:
<br>
1. <strong>Transactions</strong> — safe, all-or-nothing operations
<br>
2. <strong>Versioning</strong> — structured upgrades without losing data
</p>

<div class="img-container">
<img class="content-img" src="./assets/IDB/IDB1.jpg" alt="IDB img 1">
<img class="content-img" src="./assets/IDB/IDB2.jpg" alt="IDB img 2">
</div>



</article>
  `;
};

export default indexedDB;
