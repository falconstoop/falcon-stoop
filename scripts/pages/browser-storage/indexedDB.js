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


<p><strong>When Upgrade callback Runs</strong></p>

<p>
The <strong>upgrade</strong> callback fires in two situations:
</p>

<p>
<strong>1. The database is created for the first time</strong> — This is technically an upgrade from nothing to version 1. You need a place to set up your initial object stores.
</p>

<p>
<strong>2. The version number changes</strong> — You're modifying an existing database. Perhaps you're adding a new object store, deleting an old one, or adding an index to an existing store.
</p>
<br>

<p><strong>Why Both Cases Use the Same Callback</strong></p>

<p>
The logic is identical in both situations: <em>"The database structure needs to be set up or changed."</em> Instead of having two separate callbacks (<strong>onCreate</strong> and <strong>onUpgrade</strong>), IndexedDB uses one unified <strong>upgrade</strong> callback. When the database is brand new, it's simply upgrading from version 0 to version 1.
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


<br>

<h3>Indexes</h3>

<p>
Indexes let you query object stores by properties <strong>other than the primary key</strong>. Without an index, you can only look up records by their <strong>keyPath</strong>. With an index, you can search by any property you've indexed.
</p>

<pre><code>// Create an index inside the upgrade callback
objectStore.createIndex('indexName', 'property', { unique: false });

// Query using the index
const result = await db.getFromIndex(storeName, 'indexName', value);
</code></pre>
  

<br>

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

<hr>


<h3>Common Confusion: The Role of upgrade vs. Saving Data</h3>

<p>
When learning IndexedDB, a common confusion is: <em>"I create my object store inside upgrade, so shouldn't I save my data there too?"</em> The answer is no — and here's why.
</p>

<br>

<h4>1. First Time — Database Doesn't Exist</h4>

<p>
<strong>idb.openDB</strong> creates a brand new database called <strong>"BMWConfigurator"</strong>, version 1.
</p>

<p>
The <strong>upgrade</strong> callback runs — this is where you build the structure: creating object stores, setting keys, adding indexes.
</p>

<p>
Think of it as <strong>building the shelves in an empty warehouse</strong>.
</p>

<pre><code>// Template: First-time setup
const db = await idb.openDB("MyDB", 1, {
  upgrade(db) {
    db.createObjectStore("storeName", { keyPath: "id", autoIncrement: true });
  }
});</code></pre>

<br>

<h4>2. Every Time After — Database Already Exists</h4>

<p>
<strong>idb.openDB</strong> simply opens a connection to the existing database.
</p>

<p>
The <strong>upgrade</strong> callback is <strong>skipped</strong> — the shelves are already built, nothing structural needs to change.
</p>

<p>
You get the same database, with all previously saved data still inside.
</p>

<pre><code>// Template: Opening existing database (upgrade is skipped)
const db = await idb.openDB("MyDB", 1);</code></pre>

<br>

<h4>3. Saving Data Happens Outside upgrade</h4>

<p>
Once the database is open, you use <strong>db.add()</strong>, <strong>db.put()</strong>, <strong>db.get()</strong> to actually save and retrieve data.
</p>

<p>
These run <strong>every time</strong> the user submits a configuration — completely separate from <strong>upgrade</strong>.
</p>

<p>
Think of it as <strong>placing items on the shelves that were already built</strong>.
</p>

<pre><code>// Template: Saving data (runs every time, outside upgrade)
await db.add("storeName", { field: "value" });</code></pre>

<p>
<strong>db.add()</strong> sits alongside <strong>idb.openDB</strong> — not inside <strong>upgrade</strong>. This is because <strong>idb.openDB</strong> handles opening the database (creating it once if needed, then simply opening it every time after). Once the database is open, you can save data on every call. <strong>upgrade</strong> only handles structural setup and is skipped automatically on subsequent calls.
</p>

<pre><code>// Both creation and saving in one function — safe and clean
const saveToIndexedDB = async (data) => {

  // 1. Open database (creates if first time, opens if exists(CRUD))
  const db = await idb.openDB("MyDB", 1, {

    // 2. Structure setup — runs only on creation or version change
    upgrade(db) {
      db.createObjectStore("storeName", { keyPath: "id", autoIncrement: true });
    }
  });

  // 3. CRUD operation — runs every time, after the DB is open
  await db.add("storeName", data); // Works every time
};</code></pre>


<h4>⚠️ Important: You Must Open the Database Every Time</h4>

<p>
You cannot call <strong>db.add()</strong> alone. Every CRUD operation requires an open database connection first.
</p>

<pre><code>// ❌ Won't work — no database connection
await db.add("storeName", data);

// ✅ Works — open connection first, then save
const db = await idb.openDB("MyDB", 1);
await db.add("storeName", data);</code></pre>

<p>
Think of it like a file on your computer — you can't write to a file without opening it first. IndexedDB works the same way. Every interaction follows the same pattern:
</p>

<pre><code>Open connection → Perform CRUD → Done.</code></pre>

<p>
The good news: <strong>idb.openDB</strong> is smart. It creates the database if it's the first time, or simply opens it if it already exists. Either way, you get back a <strong>db</strong> connection ready for CRUD operations. You just need to call it every time.
</p>



<br>

<h4>The Golden Rule</h4>

<p>
<strong>upgrade builds the shelves (once). CRUD operations fill them (every time). They are never in the same place.</strong>
</p>
<br>

<h4>4. Why Does db Appear Both Inside and Outside upgrade?</h4>

<p>
A common point of confusion: you see <strong>db</strong> in two places and wonder if they're connected or if you need to pass something between them.
</p>

<p>
The <strong>db</strong> inside <strong>upgrade</strong> is provided automatically by <strong>idb</strong> — you never pass it yourself.
</p>

<pre><code>const db = await idb.openDB("MyDB", 1, {
  upgrade(db) {  // ← This 'db' is GIVEN to you by idb automatically

    db.createObjectStore("storeName", { keyPath: "id", autoIncrement: true });
  }
});

await db.add("storeName", data); // ← This 'db' is what openDB returns</code></pre>

<p>
<strong>Here's the internal flow:</strong>
</p>

<p>
<strong>1.</strong> <strong>idb.openDB</strong> creates or opens the database
<br>
<strong>2.</strong> If the database is new, <strong>idb</strong> calls your <strong>upgrade</strong> function and passes the database into it as the <strong>db</strong> parameter — you don't do this manually 
</p>
<p class="attention">
(Note: The 'db' parameter name inside upgrade is just a convention. You can call it anything — 'database', 'myDB', etc.)
</p>

<p>
<strong>3.</strong> You use that <strong>db</strong> inside <strong>upgrade</strong> to set up the structure (create object stores, indexes)
<br>
<strong>4.</strong> <strong>idb.openDB</strong> then returns the same database, which you store in <strong>const db</strong>
<br>
<strong>5.</strong> You use that returned <strong>db</strong> for CRUD operations
</p>

<p>
Both <strong>db</strong> references point to the same database. The one inside <strong>upgrade</strong> is an automatic parameter from <strong>idb</strong>. The one outside is the return value you capture. You never connect them — <strong>idb</strong> handles that internally.
</p>

<br>
<h4>5. How Does autoIncrement Work If upgrade Only Runs Once?</h4>

<p>
A common point of confusion: I set <strong>autoIncrement: true</strong> inside <strong>upgrade</strong>, but <strong>upgrade</strong> only runs once. How do later configs get auto-generated IDs?
</p>

<p>
<strong>The rule is stored permanently in the database structure.</strong>
</p>

<pre><code>upgrade(db) {
  db.createObjectStore("configs", { keyPath: "id", autoIncrement: true });
}</code></pre>

<br>

<p><strong>What is keyPath: "id"?</strong></p>
<p>
It tells IndexedDB: <em>"Each record in this store has a unique identifier called id."</em> This is the primary key — like a row number in a spreadsheet. Every record must have one.
</p>

<br>

<p><strong>What is autoIncrement: true?</strong></p>
<p>
It tells IndexedDB: <em>"If no id is provided when adding data, generate one automatically."</em> The first record gets <strong>id: 1</strong>, the second gets <strong>id: 2</strong>, and so on. I never need to create or manage these IDs myself.
</p>

<br>

<p><strong>What if you don't set autoIncrement?</strong></p>
<p>
Without <strong>autoIncrement</strong>, IndexedDB will not generate an ID for you. I must manually provide an <strong>id</strong> every time I add a record:
</p>

<pre><code>// Without autoIncrement — you must provide the id manually
await db.add("configs", { id: "config-123", model: "3 Series" });</code></pre>

<p>
If I forget to include an <strong>id</strong>, the operation fails with an error. <strong>autoIncrement: true</strong> simply automates this — IndexedDB handles the ID generation so I don't have to.
</p>

<br>

<p><strong>Why it works forever, not just during upgrade:</strong></p>
<p>
When I create the object store with these settings, they become part of the database schema permanently. Think of it like configuring software during installation — I set it once, but it applies every time I use the software afterward.
</p>

<pre><code>// upgrade set the rule once...
// ...but it applies to every add forever
await db.add("configs", { model: "3 Series" }); // id: 1 (auto-generated)
await db.add("configs", { model: "X5" });       // id: 2 (auto-generated)
await db.add("configs", { model: "M4" });       // id: 3 (auto-generated)</code></pre>

<p>
Each record automatically receives a unique <strong>id</strong>. I'll use this <strong>id</strong> later to read, update, or delete specific configurations from the Dashboard.
</p>

<br>

<h3>Summary</h3>

<h4>The Full Flow</h4>

<pre><code>First time:
  openDB → creates DB → runs upgrade → db.add() saves data → function ends

Every time after:
  openDB → opens existing DB → skips upgrade → db.add() saves data → 
  function ends</code></pre>


<h4>IDB's API Syntax</h4>

<p>
The <strong>idb</strong> library expects the upgrade callback as the third parameter, wrapped inside an object:
</p>

<pre><code>idb.openDB(name, version, {
  upgrade(db) { ... }
});</code></pre>

<p>
That's just how <strong>idb</strong> is designed — you cannot pass <strong>upgrade</strong> any other way.
</p>

<p>
If the database already exists, <strong>idb</strong> simply ignores that object — <strong>upgrade</strong> never runs. But syntactically, you still pass it every time. There's no way around it.
</p>

<hr>


<p>
<em>See the full Implementation Project at <a class="accent-link" href="#/projects/car-configurator">Project Case Studies (Car Configurator)</a></em>
</p>

</article>
  `;
};

export default indexedDB;
