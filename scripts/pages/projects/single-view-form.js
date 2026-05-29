//
const root = document.getElementById("root");
//
const form = () => {
  root.innerHTML = `
<article class="content">

<h2>Single-View Form</h2>

<div class="blockquote-wrapper">
<blockquote>
    <p>"I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times." </p>
    <footer>— Bruce Lee 🥋 —</footer>
    <p class="quote-twist">
     You have no idea how many times I tore this form down and built it back up — until it had nothing left to teach me. 
     <br>
     While others were busy building their tenth app, I was still here. Still learning. Still rebuilding.
    </p>
</blockquote>
</div>


</article>
  `;
};

export default form;
