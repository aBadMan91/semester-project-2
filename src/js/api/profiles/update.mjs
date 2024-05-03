import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

export async function updateProfile(profileData) {
  if (!profileData.name) {
    throw new Error("Update profile requires a name");
  }

  const updateProfileUrl = `${API_AUCTION_URL}${action}/${profileData.name}`;

  const response = await authFetch(updateProfileUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  return await response.json();
}
