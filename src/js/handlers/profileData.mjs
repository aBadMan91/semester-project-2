import { getProfile } from "../api/profiles/index.mjs";
import { load } from "../storage/index.mjs";

export async function fetchProfileData() {
  const { name } = load("profile");
  const profile = await getProfile(name);

  const profileContainer = document.querySelector("profile-container");
  const profileHtml = createProfileHtml(profile);
  profileContainer.appendChild(profileHtml);

  return profile;
}

fetchProfileData();

export function createProfileHtml(profile) {
  const profileContainer = document.createElement("div");
  profileContainer.classList.add("profileCard");

  const card = document.createElement("div");
  card.classList.add("card");
}
