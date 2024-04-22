import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";
const method = "post";

export async function placeBid(listingId, bidAmount) {
  const placeBidUrl = API_AUCTION_URL + `${action}/${listingId}/bids`;

  const response = await authFetch(placeBidUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: bidAmount }),
  });

  if (!response.ok) {
    throw new Error(`An error occurred while placing the bid: ${response.status}`);
  }

  return await response.json();
}
