import { load } from "../storage/index.mjs";
import { authFetch } from "../api/authFetch.mjs";

export async function fetchUserListings() {
  try {
    const { name } = load("profle");

    const response = await authFetch(`https://api.noroff.dev/api/v1/auction/profiles/${name}/listings`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user listings: ${response.status}`);
    }

    const listings = await response.json();

    const listingContainer = document.querySelector("listing-container");
    listings.forEach((listing) => {
      const listingHtml = createHtml(listing);
      listingContainer.appendChild(listingHtml);
    });

    return listings;
  } catch (error) {
    alert(error.message);
  }
}

fetchUserListings();
