import { API_HOST_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_HOST_URL + action;

  if (!profile.bio) {
    delete profile.bio;
  }

  if (!profile.avatar || !profile.avatar.url || !profile.avatar.alt) {
    delete profile.avatar;
  }

  const body = JSON.stringify(profile);

  const response = await fetch(registerURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  if (!response.ok) {
    throw new Error(`Register failed: ${response.status}`);
  }

  const result = await response.json();

  result.bio = result.bio || "Default Bio";
  result.avatar = result.avatar || { url: "https://picsum.photos/id/26/4209/2769", alt: "Default Alt Text" };

  window.location.href = "/profile/login/";

  return result;
}
