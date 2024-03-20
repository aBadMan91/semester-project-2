import { API_AUCTION_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_AUCTION_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  const { accessToken, ...user } = await response.json();

  storage.saveToken("token", accessToken);

  storage.save("profile", user);

  window.location.href = "/profile/";
}

export async function logout() {
  storage.remove("token");

  storage.remove("profile");

  window.location.href = "/";
}
