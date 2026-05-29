//
import router from "./scripts/router.js";
//

window.addEventListener("hashchange", () => {
  window.scrollTo({ top: 0, behavior: "instant" });
  router();
});

window.addEventListener("DOMContentLoaded", router);
