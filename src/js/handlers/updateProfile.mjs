import { getProfile, updateProfile } from "../api/profiles/index.mjs";

import { load } from "../storage/index.mjs";

export async function setUpdateProfileFormListener() {
  const form = document.querySelector("#editProfile");

  if (form) {
    const { name, email, bio, avatar, banner } = load("profile");
    form.name.value = name;
    form.email.value = email;

    const button = form.querySelector("button");
    button.disabled = true;

    form.bio.value = bio;
    form.avatar.value = avatar.url;
    form.banner.value = banner.url;

    button.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      profile.name = name;
      profile.email = email;

      updateProfile(profile)
        .then(() => {
          alert("Profile has been updated");
          window.location.href = "/profile/";
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }
}
