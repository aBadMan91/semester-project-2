import { API_HOST_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_HOST_URL + action;
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

  const responseData = await response.json();
  const { accessToken, ...data } = responseData.data;

  storage.save("token", accessToken);

  storage.save("profile", data);

  window.location.href = "/profile/";
}

export async function logout() {
  storage.remove("token");

  storage.remove("profile");

  window.location.href = "/";
}

export function requireLogin() {
  const token = storage.load("token");

  if (!token) {
    throw new Error("Not logged in");
  }
}
