//
const root = document.getElementById("root");
//

const arrayMethods = () => {
  root.innerHTML = `
<article class="content">
<h2>Array Methods</h2>


<div class="blockquote-wrapper">
<blockquote>
    <p>"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."</p>
    <footer>— Martin Fowler 💻</footer>
    <p class="quote-twist">
     Array methods are for humans. The loop is for the computer. <br>
     One describes the transformation. The other describes the mechanics.
    </p>
</blockquote>
</div>

<br>



<pre><code>ARRAY METHODS PAGE
├── Introduction
│
├── Grouped by Return Type (Quick Reference)
│   ├── 1. Returns a New Array: map, filter, slice, concat
│   ├── 2. Returns a Single Value: reduce, find, findIndex, at, indexOf, lastIndexOf
│   ├── 3. Returns a Boolean: some, every, includes
│   ├── 4. Mutates the Original: push, pop, shift, unshift, splice, sort, reverse
│   └── 5. Iterates: forEach
│
├── Grouped by Behavior (Full Breakdown)
│   ├── 1. Transforming: map
│   ├── 2. Filtering & Finding: filter, find, findIndex
│   ├── 3. Reducing: reduce
│   ├── 4. Boolean Checks: some, every, includes
│   ├── 5. Adding & Removing: push, pop, shift, unshift, splice
│   ├── 6. Iterating: forEach
│   ├── 7. Ordering: sort, reverse
│   └── 8. Extracting: slice, concat, at</code></pre>



<br>

<h3>Array Methods — What They Are</h3>

<p>
Array methods are built-in functions that operate on arrays.
</p>

<p>
Unlike a <strong>for</strong> loop — which requires an index, a condition, and an increment — an array method requires only the operation itself. The mechanics are hidden. The intent stays visible.
</p>


<br>
<p>
The methods on this page are organized in two ways:
<br>
<strong>By return type</strong> — 5 groups, a quick reference.
<br>
<strong>By behavior (Usage)</strong> — 8 groups, the full breakdown.
</p>

<hr>

<h3>Array Methods — Grouped by Return Type</h3>

<p>
Every array method on this page belongs to exactly one of five groups. What separates them is what they return — and whether they mutate the original array.
</p>

<br>

<h4>1. Returns a New Array</h4>
<p>
map, filter, slice, concat
</p>

<br>

<h4>2. Returns a Single Value</h4>
<p>
reduce, find, findIndex, at, indexOf, lastIndexOf
</p>

<br>

<h4>3. Returns a Boolean</h4>
<p>
some, every, includes
</p>

<br>

<h4>4. Mutates the Original Array</h4>
<p>
push, pop, shift, unshift, splice, sort, reverse
</p>

<br>

<h4>5. Iterates (Returns Nothing)</h4>
<p>
forEach
</p>

<hr>






<h3>Array Methods — Grouped by Behavior (Usage)</h3>

<p>
Every array method on this page belongs to one of eight behavioral groups. The grouping is based on <strong>what the method does</strong> — not what it returns.
</p>

<br>

<h4>1. Transforming</h4>

<h5>map()</h5>
<p>
Creates a new array by applying the callback to every element.
<br>
<strong>Syntax:</strong> arr.map(callback(element, index, array))
<br>
<strong>Returns:</strong> A new array of the same length
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> [1, 2, 3].map(n => n * 2) → [2, 4, 6]
<br>
<strong>Example with index:</strong> ["a", "b"].map((el, i) => el + i) → ["a0", "b1"]
<br>
<strong>Use when:</strong> transforming every element into something else — same count, new shape
</p>

<br>

<h4>2. Filtering & Finding</h4>

<h5>filter()</h5>
<p>
Creates a new array containing only the elements that pass the callback condition.
<br>
<strong>Syntax:</strong> arr.filter(callback(element, index, array))
<br>
<strong>Returns:</strong> A new array — shorter or equal in length, or an empty array if no element passes
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> [1, 2, 3, 4].filter(n => n % 2 === 0) → [2, 4]
<br>
<strong>Example with no match:</strong> [1, 2, 3].filter(n => n > 5) → []
<br>
<strong>Use when:</strong> keeping only the elements that match a condition
</p>

<br>

<h5>find()</h5>
<p>
Returns the first element that passes the callback condition.
<br>
<strong>Syntax:</strong> arr.find(callback(element, index, array))
<br>
<strong>Returns:</strong> The matching element, or undefined if no element passes
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> [1, 2, 3, 4].find(n => n > 2) → 3
<br>
<strong>Example with no match:</strong> [1, 2].find(n => n > 5) → undefined
<br>
<strong>Use when:</strong> locating an element by a condition — stops at the first match
</p>

<br>

<h5>findIndex()</h5>
<p>
Returns the index of the first element that passes the callback condition.
<br>
<strong>Syntax:</strong> arr.findIndex(callback(element, index, array))
<br>
<strong>Returns:</strong> A number — the index of the first match, or -1 if no element passes
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> [1, 2, 3, 4].findIndex(n => n > 2) → 2
<br>
<strong>Example with no match:</strong> [1, 2].findIndex(n => n > 5) → -1
<br>
<strong>Use when:</strong> locating the position of an element by a condition
</p>

<br>

<h4>3. Reducing</h4>

<h5>reduce()</h5>
<p>
Applies the callback to every element, accumulating a single result.
<br>
<strong>Syntax:</strong> arr.reduce(callback(accumulator, element, index, array), initialValue)
<br>
<strong>Returns:</strong> A single value (any type) — or throws an error on an empty array if no initial value is provided
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> [1, 2, 3, 4].reduce((acc, n) => acc + n, 0) → 10
<br>
<strong>Example with strings:</strong> ["a", "b", "c"].reduce((acc, s) => acc + s, "") → "abc"
<br>
<strong>Example building an object:</strong> [["a", 1], ["b", 2]].reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}) → { a: 1, b: 2 }
<br>
<strong>Use when:</strong> summing, grouping, building an object, or reducing an array to anything else
</p>

<br>

<h4>4. Boolean Checks</h4>

<h5>some()</h5>
<p>
Returns true if at least one element passes the callback condition.
<br>
<strong>Syntax:</strong> arr.some(callback(element, index, array))
<br>
<strong>Returns:</strong> Boolean — true if at least one element passes, false otherwise
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> [1, 2, 3, 4].some(n => n > 3) → true
<br>
<strong>Example with no match:</strong> [1, 2, 3].some(n => n > 5) → false
<br>
<strong>Use when:</strong> checking if <em>any</em> element matches a condition — stops at the first match
</p>

<br>

<h5>every()</h5>
<p>
Returns true if every element passes the callback condition.
<br>
<strong>Syntax:</strong> arr.every(callback(element, index, array))
<br>
<strong>Returns:</strong> Boolean — true if all elements pass, false if any fails
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> [2, 4, 6].every(n => n % 2 === 0) → true
<br>
<strong>Example with a failure:</strong> [2, 3, 4].every(n => n % 2 === 0) → false
<br>
<strong>Use when:</strong> checking if <em>all</em> elements match a condition — stops at the first failure
</p>

<br>

<h5>includes()</h5>
<p>
Checks whether an array contains a specific value.
<br>
<strong>Syntax:</strong> arr.includes(searchValue, startIndex)
<br>
<strong>Returns:</strong> Boolean — true if the value is found, false otherwise
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> [1, 2, 3].includes(2) → true
<br>
<strong>Example with no match:</strong> [1, 2, 3].includes(5) → false
<br>
<strong>Use when:</strong> checking if a value exists in the array
</p>

<br>

<h4>5. Adding & Removing (Mutating)</h4>

<h5>push()</h5>
<p>
Adds one or more elements to the end of an array.
<br>
<strong>Syntax:</strong> arr.push(element1, element2, ...)
<br>
<strong>Returns:</strong> The new length of the array
<br>
<strong>Mutates original:</strong> Yes
<br>
<strong>Example:</strong> [1, 2].push(3) → returns 3, array becomes [1, 2, 3]
<br>
<strong>Example with multiple elements:</strong> [1].push(2, 3, 4) → returns 4, array becomes [1, 2, 3, 4]
<br>
<strong>Use when:</strong> appending elements to the end
</p>

<br>

<h5>pop()</h5>
<p>
Removes the last element from an array.
<br>
<strong>Syntax:</strong> arr.pop()
<br>
<strong>Returns:</strong> The removed element — or undefined on an empty array
<br>
<strong>Mutates original:</strong> Yes
<br>
<strong>Example:</strong> [1, 2, 3].pop() → returns 3, array becomes [1, 2]
<br>
<strong>Example on empty array:</strong> [].pop() → returns undefined
<br>
<strong>Use when:</strong> removing the last element — stack behavior
</p>

<br>

<h5>shift()</h5>
<p>
Removes the first element from an array.
<br>
<strong>Syntax:</strong> arr.shift()
<br>
<strong>Returns:</strong> The removed element — or undefined on an empty array
<br>
<strong>Mutates original:</strong> Yes
<br>
<strong>Example:</strong> [1, 2, 3].shift() → returns 1, array becomes [2, 3]
<br>
<strong>Example on empty array:</strong> [].shift() → returns undefined
<br>
<strong>Use when:</strong> removing the first element — queue behavior
</p>

<br>

<h5>unshift()</h5>
<p>
Adds one or more elements to the beginning of an array.
<br>
<strong>Syntax:</strong> arr.unshift(element1, element2, ...)
<br>
<strong>Returns:</strong> The new length of the array
<br>
<strong>Mutates original:</strong> Yes
<br>
<strong>Example:</strong> [2, 3].unshift(1) → returns 3, array becomes [1, 2, 3]
<br>
<strong>Example with multiple elements:</strong> [3].unshift(1, 2) → returns 3, array becomes [1, 2, 3]
<br>
<strong>Use when:</strong> prepending elements to the start
</p>

<br>

<h5>splice()</h5>
<p>
Adds, removes, or replaces elements at any position.
<br>
<strong>Syntax:</strong> arr.splice(startIndex, deleteCount, ...items)
<br>
<strong>Returns:</strong> An array of removed elements — an empty array if nothing was removed
<br>
<strong>Mutates original:</strong> Yes
<br>
<strong>Example — remove:</strong> [1, 2, 3, 4].splice(1, 2) → returns [2, 3], array becomes [1, 4]
<br>
<strong>Example — insert:</strong> [1, 4].splice(1, 0, 2, 3) → returns [], array becomes [1, 2, 3, 4]
<br>
<strong>Example — replace:</strong> [1, 2, 3].splice(1, 1, "x") → returns [2], array becomes [1, "x", 3]
<br>
<strong>Use when:</strong> inserting, removing, or replacing elements at a specific index
</p>
<p>
<strong>Splice at a glance:</strong> remove → <strong>splice(start, count)</strong> · insert → <strong>splice(start, 0, ...items)</strong> · replace → <strong>splice(start, count, ...items)</strong>
</p>

<br>

<h4>6. Iterating</h4>

<h5>forEach()</h5>
<p>
Executes the callback for each element — for side effects only.
<br>
<strong>Syntax:</strong> arr.forEach(callback(element, index, array))
<br>
<strong>Returns:</strong> undefined — always, regardless of what the callback returns
<br>
<strong>Mutates original:</strong> No (but the callback can)
<br>
<strong>Example:</strong> [1, 2, 3].forEach(n => console.log(n)) → logs 1, 2, 3
<br>
<strong>Example with index:</strong> ["a", "b"].forEach((el, i) => console.log(el, i)) → logs "a 0", "b 1"
<br>
<strong>Use when:</strong> performing a side effect for every element — DOM updates, logging, mutations
</p>

<br>

<h4>7. Ordering</h4>

<h5>sort()</h5>
<p>
Sorts the array in place.
<br>
<strong>Syntax:</strong> arr.sort(compareFn)
<br>
<strong>Returns:</strong> The same array, sorted
<br>
<strong>Mutates original:</strong> Yes
<br>
<strong>Example — default (sorts as strings):</strong> [3, 1, 2].sort() → array becomes [1, 2, 3]
<br>
<strong>Example — ascending (numeric):</strong> [10, 2, 5].sort((a, b) => a - b) → array becomes [2, 5, 10]
<br>
<strong>Example — descending:</strong> [10, 2, 5].sort((a, b) => b - a) → array becomes [10, 5, 2]
<br>
<strong>Use when:</strong> sorting in place — pass a compare function for numbers
</p>
<br>
<p>
<strong>Sort at a glance:</strong>
<br>
<strong>default</strong> — converts everything to strings and sorts character by character
<br>
<strong>ascending (numeric)</strong> — <strong>(a, b) => a - b</strong>, smallest to largest
<br>
<strong>descending (numeric)</strong> — <strong>(a, b) => b - a</strong>, largest to smallest
</p>

<br>

<h5>reverse()</h5>
<p>
Reverses the array in place.
<br>
<strong>Syntax:</strong> arr.reverse()
<br>
<strong>Returns:</strong> The same array, reversed
<br>
<strong>Mutates original:</strong> Yes
<br>
<strong>Example:</strong> [1, 2, 3].reverse() → array becomes [3, 2, 1]
<br>
<strong>Example on strings:</strong> ["a", "b", "c"].reverse() → array becomes ["c", "b", "a"]
<br>
<strong>Use when:</strong> reversing in place
</p>

<br>

<h4>8. Extracting</h4>

<h5>slice()</h5>
<p>
Extracts a section of an array and returns it as a new array.
<br>
<strong>Syntax:</strong> arr.slice(startIndex, endIndex)
<br>
<strong>Returns:</strong> A new array — empty if the range is invalid
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> [1, 2, 3, 4].slice(1, 3) → [2, 3]
<br>
<strong>Example with negative index:</strong> [1, 2, 3, 4].slice(-2) → [3, 4]
<br>
<strong>Use when:</strong> extracting a portion by position; supports negative indexes
</p>

<br>

<h5>concat()</h5>
<p>
Joins two or more arrays into a new array.
<br>
<strong>Syntax:</strong> arr.concat(arr1, arr2, ...)
<br>
<strong>Returns:</strong> A new array
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> [1, 2].concat([3, 4]) → [1, 2, 3, 4]
<br>
<strong>Example with values:</strong> [1].concat(2, [3, 4]) → [1, 2, 3, 4]
<br>
<strong>Use when:</strong> combining arrays without modifying either original
</p>

<br>

<h5>at()</h5>
<p>
Returns the element at a given index; supports negative indexes.
<br>
<strong>Syntax:</strong> arr.at(index)
<br>
<strong>Returns:</strong> The element — or undefined if the index is out of range
<br>
<strong>Mutates original:</strong> No
<br>
<strong>Example:</strong> [10, 20, 30].at(0) → 10
<br>
<strong>Example with negative index:</strong> [10, 20, 30].at(-1) → 30
<br>
<strong>Use when:</strong> accessing an element from the end with negative indexes
</p>

<br>




</article>`;
};

export default arrayMethods;
