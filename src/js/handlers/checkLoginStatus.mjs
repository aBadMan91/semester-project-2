import { requireLogin } from "../api/auth/authentication.mjs";

try {
  requireLogin();
  if (window.location.pathname === "/") {
    window.location.href = "/listings/";
  }
} catch (error) {
  if (window.location.pathname === "/listings/") {
    window.location.href = "/";
  } else if (window.location.pathname === "/profile/" || window.location.pathname === "/listing/create/") {
    window.location.href = "/profile/login/";
  }
}
