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



  </article>
  `;
};

export default whatIsApi;
