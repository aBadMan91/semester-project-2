import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";
const method = "delete";

export async function removeListing(id) {
  if (!id) {
    throw new Error("Delete listing requires a listing ID");
  }

  const updateListingUrl = `${API_AUCTION_URL}${action}/${id}`;

  const response = await authFetch(updateListingUrl, {
    method,
  });

  if (!response.ok) {
    throw new Error(`An error occurred while deleting the listing: ${response.status}`);
  }

  return await response.json();
}
