// Pages
import home from "./home.js";
// ---Javascript
import whatIsJavascript from "./pages/javascript/what-is-javascipt.js";
import notFound from "./notFound.js";
import closure from "./pages/javascript/closure.js";
import formSubmission from "./pages/javascript/form-submission.js";
import stateManagement from "./pages/javascript/stateManagment.js";

// ---Projects
import form from "./pages/projects/single-view-form.js";
import multiStepsForm from "./pages/projects/multi-steps-form.js";
import carConfigurator from "./pages/projects/car-configurator.js";

//--- Browser Storage
import clientsideStorage from "./pages/browser-storage/clientsideStorage.js";
import whatIsApi from "./pages/browser-storage/whatIsApi.js";
import storageQuotaPersistence from "./pages/browser-storage/storageQuotaPersistence.js";
import indexedDB from "./pages/browser-storage/indexedDB.js";
//

const router = () => {
  const currentRoute = window.location.hash;

  // Home
  if (
    currentRoute === "#/home" ||
    currentRoute === "" ||
    currentRoute === "#/"
  ) {
    home();
  }
  // Javascript
  else if (currentRoute === "#/javascript/what-is-javascript") {
    whatIsJavascript();
  } else if (currentRoute === "#/javascript/closure") {
    closure();
  } else if (currentRoute === "#/javascript/form-submission") {
    formSubmission();
  } else if (currentRoute === "#/javascript/state-management") {
    stateManagement();
  }
  // Projects
  else if (currentRoute === "#/projects/form") {
    form();
  } else if (currentRoute === "#/projects/multi-steps-form") {
    multiStepsForm();
  } else if (currentRoute === "#/projects/car-configurator") {
    carConfigurator();
  }
  // Browser Storage
  else if (currentRoute === "#/browserStorage/client-side-storage") {
    clientsideStorage();
  } else if (currentRoute === "#/browserStorage/what-is-api") {
    whatIsApi();
  } else if (currentRoute === "#/browserStorage/storage-quota-persistence") {
    storageQuotaPersistence();
  } else if (currentRoute === "#/browserStorage/indexedDB") {
    indexedDB();
  }

  // Not Found
  else {
    notFound();
  }
};

export default router;
