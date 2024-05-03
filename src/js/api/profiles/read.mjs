import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";

export async function getProfiles() {
  const updateProfileUrl = `${API_AUCTION_URL}${action}`;

  const response = await authFetch(updateProfileUrl);

  return await response.json();
}

export async function getProfile(name) {
  if (!name) {
    throw new Error("Get profile requires a name");
  }

  const getProfileUrl = `${API_AUCTION_URL}${action}/${name}`;

  const response = await authFetch(getProfileUrl);

  return await response.json();
}
