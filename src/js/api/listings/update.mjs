import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";
const method = "put";

export async function updateListing(listingData) {
  if (!listingData) {
    throw new Error("Update listing requires a listing id");
  }

  if (listingData.tags) {
    listingData.tags = listingData.tags.split(",").map((tag) => tag.trim());
  } else {
    delete listingData.tags;
  }

  const updateListingUrl = `${API_AUCTION_URL}${action}/${listingData.id}`;

  const response = await authFetch(updateListingUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listingData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update listing: ${response.status}`);
  }

  return await response.json();
}
