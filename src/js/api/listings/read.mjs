import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";

export async function getListings(sort = "newest", page = 1, query = null) {
  let updateListingUrl = `${API_AUCTION_URL}${action}?limit=30&page=${page}&_seller=true&_bids=true`;

  if (sort === "newest") {
    updateListingUrl += "&sort=updated&sortOrder=desc";
  } else if (sort === "oldest") {
    updateListingUrl += "&sort=updated&sortOrder=asc";
  }

  if (query) {
    updateListingUrl += `&search?q=${query}`;
  }

  const response = await authFetch(updateListingUrl);

  return await response.json();
}

export async function getListing(id) {
  if (!id) {
    throw new Error("Get listing requires id");
  }

  const getListingUrl = `${API_AUCTION_URL}${action}/${id}?_seller=true&_active=true`;

  const response = await authFetch(getListingUrl);

  return await response.json();
}
