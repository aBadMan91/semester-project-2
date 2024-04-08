import { logout } from "../api/auth/authentication.mjs";

export function setLogoutButtonListener() {
  const button = document.querySelector("#logoutButton");

  if (button) {
    button.addEventListener("click", async (event) => {
      event.preventDefault();

      const confirmation = confirm("Are you sure you want to log out?");

      if (confirmation) {
        try {
          await logout();
        } catch (error) {
          alert(error.message);
        }
      }
    });
  }
}
