import { getProfile, updateProfile } from "../api/profiles/index.mjs";

import { load } from "../storage/index.mjs";

export async function setUpdateProfileFormListener() {
  const form = document.querySelector("#editProfile");

  if (form) {
    const { name, email } = load("profile");
    form.name.value = name;
    form.email.value = email;

    const button = form.querySelector("button");
    button.disabled = true;

    const profile = await getProfile(name);

    form.bio.value = profile.data.bio;
    form.avatar.value = profile.data.avatar.url;
    form.banner.value = profile.data.banner.url;

    button.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      profile.name = name;
      profile.email = email;
      profile.avatar = { url: profile.avatar };
      profile.banner = { url: profile.banner };

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
