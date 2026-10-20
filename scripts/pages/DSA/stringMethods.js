//
const root = document.getElementById("root");
//

const stringMethods = () => {
  root.innerHTML = `
<article class="content">
<h2>String Methods</h2>


<div class="blockquote-wrapper">
<blockquote>
    <p>"Speed was Napoleon's greatest weapon — the ability to move faster than his opponents could react."</p>
    <footer>— David G. Chandler, The Campaigns of Napoleon 🦅</footer>
    <p class="quote-twist">
     Higher-order methods are faster not because they execute quicker — but because they express intent in a single line. <br>
     Less code. Less to debug. Speed of thought.
    </p>
</blockquote>
</div>


<br>



<pre><code>STRING METHODS PAGE
├── Introduction (Strings are immutable)
│
├── 1. Basic Manipulation
│   ├── toLowerCase() / toUpperCase()
│   ├── trim()
│   └── concat()
│
├── 2. Searching & Matching
│   ├── includes()
│   ├── indexOf()
│   ├── lastIndexOf()
│   └── search()
│
├── 3. Extracting Substrings
│   ├── slice()
│   ├── split()
│   └── charAt()
│
├── 4. Replacing & Modifying
│   ├── replace()
│   └── replaceAll()</code></pre>

<br>


<br>
<p>
  <strong>Higher-order methods</strong> are methods that take a function as an argument (or return a function).
</p>
<p>

  Instead of writing the loop manually, a rule is handed to the method — and it applies that rule to every element.
  The method handles the iteration. The thinking stays with the developer.
</p>

<hr>

<h3>String Methods</h3>

<p>
Strings are immutable in JavaScript. String methods never modify the original string.
Some return a new string (slice, replace, toUpperCase). 
Others return a number, boolean, or array (indexOf, includes, split).String methods work on text. They search, slice, transform, and split strings — without changing the original (most of them).
</p>

<br>


<h4>1. Basic Manipulation</h4>

<h5>toLowerCase() / toUpperCase()</h5>
<p>
Converts all characters in a string to lowercase or uppercase.
<br>
<strong>Syntax:</strong> str.toLowerCase() / str.toUpperCase()
<br>
<strong>Returns:</strong> A new string
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "Hello World".toLowerCase() → "hello world" | "Hello World".toUpperCase() → "HELLO WORLD"
<br>
<strong>Use when:</strong> comparing strings case-insensitively, normalizing input, displaying text in uppercase
</p>

<br>

<h5>trim()</h5>
<p>
Removes whitespace from both ends of a string.
<br>
<strong>Syntax:</strong> str.trim()
<br>
<strong>Returns:</strong> A new string
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "  hello  ".trim() → "hello"
<br>
<strong>Use when:</strong> cleaning user input, removing unwanted spaces
</p>

<br>

<h5>concat()</h5>
<p>
Joins two or more strings together.
<br>
<strong>Syntax:</strong> str.concat(str1, str2, ...)
<br>
<strong>Returns:</strong> A new string
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "hello".concat(" ", "world") → "hello world"
<br>
<strong>Use when:</strong> combining strings (though + or template literals are more common)
</p>

<br>




<h4>2. Searching & Matching</h4>

<h5>includes()</h5>
<p>
Checks if a string contains a substring.
<br>
<strong>Syntax:</strong> str.includes(searchString, startIndex)
<br>
<strong>Returns:</strong> Boolean
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "hello world".includes("world") → true | "hello".includes("l") → true
<br>
<strong>Use when:</strong> checking if a substring exists, simple existence checks
</p>

<br>

<h5>indexOf()</h5>
<p>
Returns the first index of a substring, or -1 if not found.
<br>
<strong>Syntax:</strong> str.indexOf(searchString, startIndex)
<br>
<strong>Returns:</strong> Number
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "hello world".indexOf("o") → 4 | "hello".indexOf("l") → 2
<br>
<strong>Use when:</strong> finding position of a substring, checking existence via -1
</p>

<br>

<h5>lastIndexOf()</h5>
<p>
Returns the last index of a substring, or -1 if not found.
<br>
<strong>Syntax:</strong> str.lastIndexOf(searchString, startIndex)
<br>
<strong>Returns:</strong> Number
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "hello world".lastIndexOf("o") → 7 | "hello".lastIndexOf("l") → 3
<br>
<strong>Use when:</strong> finding the last occurrence of a substring
</p>


<br>

<h5>search()</h5>
<p>
Returns the index of the first match of a regular expression, or -1.
<br>
<strong>Syntax:</strong> str.search(regexp)
<br>
<strong>Returns:</strong> Number
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "hello world".search(/world/) → 6 | "hello".search(/l/) → 2
<br>
<strong>Use when:</strong> finding position using a regex pattern
</p>

<br>



<h4>3. Extracting Substrings (Getting Parts of a String)</h4>


<h5>slice()</h5>
<p>
Extracts a section of a string and returns it as a new string.
<br>
<strong>Syntax:</strong> str.slice(startIndex, endIndex)
<br>
<strong>Returns:</strong> A new string
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "hello world".slice(0, 5) → "hello" | "hello world".slice(-5) → "world"
<br>
<strong>Use when:</strong> extracting a portion of a string by position; supports negative indexes
</p>

<br>

<p class="attention">
<strong>slice()</strong> — Works on both strings and arrays. Same behavior: takes start and end indexes, supports negative indexes, returns a new value without mutating the original.
</p>

<pre><code>"hello".slice(1, 4)      → "ell"
[1, 2, 3, 4].slice(1, 3)  → [2, 3]</code></pre>

<br>

<br>

<h5>split()</h5>
<p>
Splits a string into an array of substrings based on a separator.
<br>
<strong>Syntax:</strong> str.split(separator, limit)
<br>
<strong>Returns:</strong> An array of strings
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "hello world".split(" ") → ["hello", "world"] | "a,b,c".split(",") → ["a", "b", "c"]
<br>
<strong>Use when:</strong> converting a string into an array, parsing CSV-like data, splitting by delimiter
</p>

<br>

<h5>charAt()</h5>
<p>
Returns the character at a specified index.
<br>
<strong>Syntax:</strong> str.charAt(index)
<br>
<strong>Returns:</strong> A single character (string)
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "hello".charAt(0) → "h" | "hello".charAt(4) → "o"
<br>
<strong>Use when:</strong> accessing a single character by index; returns an empty string if the index is out of range
</p>

<br>


<h4>4. Replacing & Modifying</h4>

<h5>replace()</h5>
<p>
Replaces the first occurrence of a substring or pattern with a new string.
<br>
<strong>Syntax:</strong> str.replace(searchValue, replaceValue)
<br>
<strong>Returns:</strong> A new string
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "hello world".replace("world", "there") → "hello there" | "aaa".replace("a", "b") → "baa"
<br>
<strong>Use when:</strong> replacing a single occurrence; supports strings and regular expressions
</p>

<br>

<h5>replaceAll()</h5>
<p>
Replaces all occurrences of a substring or pattern with a new string.
<br>
<strong>Syntax:</strong> str.replaceAll(searchValue, replaceValue)
<br>
<strong>Returns:</strong> A new string
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> "aaa".replaceAll("a", "b") → "bbb" | "hello world".replaceAll("o", "0") → "hell0 w0rld"
<br>
<strong>Use when:</strong> replacing every occurrence; simpler than a global regex
</p>

<br>



</article>`;
};

export default stringMethods;
