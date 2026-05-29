//
const root = document.getElementById("root");

//

const notFound = () => {
  root.innerHTML = `
  <div class="not-found-container">
  <h2 class="not-found-text">Page Not Found</h2>
    <a href="#/" class="not-found-link">
  Return Home Page
  </a>
  </div>
`;
};

export default notFound;
