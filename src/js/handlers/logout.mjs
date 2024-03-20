import { logout } from "../api/auth/authentication.mjs";

export function setLogoutButtonListener() {
  const button = document.querySelector("#logoutButton");

  if (button) {
    button.addEventListener("click", async (event) => {
      event.preventDefault();

      try {
        await logout();
      } catch (error) {
        alert(error.message);
      }
    });
  }
}
