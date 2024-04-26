import * as listeners from "./handlers/index.mjs";

export default function router() {
  const path = location.pathname;

  switch (path) {
    case "/src/profile/login/":
    case "/src/profile/login/index.html":
      listeners.setLoginFormListener();
      break;
    case "/src/profile/register/":
    case "/src/profile/register/index.html":
      listeners.setRegisterFormListener();
      break;
    case "/src/listing/create/":
    case "/src/listing/create/index.html":
      listeners.setCreateListingFormListener();
      break;
    case "/src/listing/edit/":
    case "/src/listing/edit/index.html":
      listeners.setUpdateListingFormListener();
      break;
    case "/src/profile/edit/":
    case "/src/profile/edit/index.html":
      listeners.setUpdateProfileFormListener();
      break;
  }

  listeners.setLogoutButtonListener();
}
