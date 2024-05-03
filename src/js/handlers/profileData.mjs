import { getProfile } from "../api/profiles/index.mjs";
import { load } from "../storage/index.mjs";

export async function fetchProfileData() {
  const { name } = load("profile");
  const profile = await getProfile(name);

  const profileContainer = document.querySelector("#profile-container");
  const profileHtml = createProfileHtml(profile);
  if (window.location.pathname === "/profile/") {
    profileContainer.appendChild(profileHtml);
  }

  return profile;
}

if (window.location.pathname === "/profile/") {
  fetchProfileData();
}

export function createProfileHtml(profile) {
  const profileContainer = document.createElement("div");
  profileContainer.classList.add("profileCard", "col-md-9");

  const card = document.createElement("div");
  card.classList.add("card", "border-0");
  card.style.backgroundColor = "inherit";

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = profile.data.avatar.url;
  img.alt = "Profile picture";
  img.style.borderRadius = "0.25rem";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "text-center");

  const name = document.createElement("h5");
  name.classList.add("card-title", "text-white", "fw-bold");
  name.textContent = profile.data.name;

  const email = document.createElement("p");
  email.classList.add("card-title", "text-white", "fst-italic");
  email.textContent = profile.data.email;

  const bio = document.createElement("p");
  bio.classList.add("card-text", "text-white");
  bio.textContent = profile.data.bio;

  const credits = document.createElement("p");
  credits.classList.add("card-text", "text-white", "fst-italic");
  credits.innerHTML = "Credits:" + " " + profile.data.credits;

  cardBody.append(name, email, bio, credits);
  card.append(img, cardBody);
  profileContainer.appendChild(card);

  return profileContainer;
}
