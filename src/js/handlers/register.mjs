import { register } from "../api/auth/register.mjs";

export function setRegisterFormListener() {
  const form = document.querySelector("#registerForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      try {
        await register(profile);
      } catch (error) {
        alert(error.message);
      }
    });
  }
}
