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

  

</article>
  `;
};

export default clientsideStorage;
