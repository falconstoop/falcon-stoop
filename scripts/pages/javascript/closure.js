//
const root = document.getElementById("root");
//

const closure = () => {
  root.innerHTML = `
<article class="content">
<h2>CLOSURE</h2>

<div class="blockquote-wrapper">
<blockquote>
    <p>
    "Absorb what is useful, discard what is useless, add what is specifically your own." 
    </p>
    <footer>— Bruce Lee 🥋 —</footer>
    <p class="quote-twist">
     I absorbed from Courses and from my own errors. I discarded the noise. The backpack became specifically my own.
    </p>
</blockquote>
</div>


</article>
`;
};

export default closure;
