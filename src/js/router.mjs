import * as listeners from "./handlers/index.mjs";

export default function router() {
  const path = location.pathname;

  switch (path) {
    case "/profile/login/":
    case "/profile/login/index.html":
      listeners.setLoginFormListener();
      break;
    case "/profile/register/":
    case "/profile/register/index.html":
      listeners.setRegisterFormListener();
      break;
    case "/listing/create/":
    case "/listing/create/index.html":
      listeners.setCreateListingFormListener();
      break;
    case "/listing/edit/":
    case "/listing/edit/index.html":
      listeners.setUpdateListingFormListener();
      break;
    case "/profile/edit/":
    case "/profile/edit/index.html":
      listeners.setUpdateProfileFormListener();
      break;
  }

  listeners.setLogoutButtonListener();
}
