// Pages
import home from "./home.js";
import mastery from "./pages/mastery.js";
// ---Javascript
import whatIsJavascript from "./pages/javascript/what-is-javascipt.js";
import notFound from "./notFound.js";
import closure from "./pages/javascript/closure.js";
import formSubmission from "./pages/javascript/form-submission.js";
import stateManagement from "./pages/javascript/stateManagment.js";
import async from "./pages/javascript/async.js";

// ---Projects
import form from "./pages/projects/single-view-form.js";
import multiStepsForm from "./pages/projects/multi-steps-form.js";
import carConfigurator from "./pages/projects/car-configurator.js";
import loanApplicationPortal from "./pages/projects/loan-application-portal.js";

//--- Browser Storage
import clientsideStorage from "./pages/browser-storage/clientsideStorage.js";
import whatIsApi from "./pages/browser-storage/whatIsApi.js";
import storageQuotaPersistence from "./pages/browser-storage/storageQuotaPersistence.js";
import indexedDB from "./pages/browser-storage/indexedDB.js";
//

// --- CSS
import dashboardDesign from "./pages/css/dashboardLayout.js";
import mobileNavDrawer from "./pages/css/mobileNavToggle.js";

const router = () => {
  const currentRoute = window.location.hash;

  // Home
  if (
    currentRoute === "#/home" ||
    currentRoute === "" ||
    currentRoute === "#/"
  ) {
    home();
  } else if (currentRoute === "#/mastery") {
    mastery();
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
  } else if (currentRoute === "#/javascript/async") {
    async();
  }
  // Projects
  else if (currentRoute === "#/projects/form") {
    form();
  } else if (currentRoute === "#/projects/multi-steps-form") {
    multiStepsForm();
  } else if (currentRoute === "#/projects/car-configurator") {
    carConfigurator();
  } else if (currentRoute === "#/projects/loan-application-portal") {
    loanApplicationPortal();
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

  // css
  else if (currentRoute === "#/css/mobile-nav-toggle") {
    mobileNavDrawer();
  } else if (currentRoute === "#/css/dashboard-layout") {
    dashboardDesign();
  }

  // Not Found
  else {
    notFound();
  }
};

export default router;
