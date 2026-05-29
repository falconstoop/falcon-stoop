//
const root = document.getElementById("root");
//
const whatIsJavascript = () => {
  root.innerHTML = `
    <article class="content">
  <h2>What Is JavaScript?</h2>

  <div class="blockquote-wrapper">
<blockquote>
    <p>"If you know the enemy and know yourself, you need not fear the result of a hundred battles." </p>
    <footer>— Sun Tzu ⚔️ —</footer>
    <p class="quote-twist">
     The browser is not magic. It's three engines, one thread, and a pipeline of pixels. 
     <br>
     Know them, and you know JavaScript...
    </p>
</blockquote>
</div>
  
</article>
  `;
};

export default whatIsJavascript;
