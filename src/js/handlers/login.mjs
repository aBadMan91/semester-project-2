import { login } from "../api/auth/authentication.mjs";

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      try {
        await login(profile);
      } catch (error) {
        alert(error.message);
      }
    });
  }
}
