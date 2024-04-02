import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";
const method = "listing";

export async function createListing(listingData) {
  if (listingData.tags) {
    listingData.tags = listingData.tags.split(",").map((tag) => tag.trim());
  } else {
    delete listingData.tags;
  }

  const createListingUrl = API_AUCTION_URL + action;

  const response = await authFetch(createListingUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listingData),
  });

  if (!response.ok) {
    throw new Error(`An error occurred while creating the listing: ${response.status}`);
  }

  return await response.json();
}
