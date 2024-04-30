import "/src/scss/styles.scss";
import { load } from "../storage/index.mjs";
import { authFetch } from "../api/authFetch.mjs";

export async function fetchUserBids() {
  try {
    const { name } = load("profile");

    const response = await authFetch(`https://v2.api.noroff.dev/auction/profiles/${name}/bids?_listings=true`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user listings: ${response.status}`);
    }

    const listings = await response.json();
    console.log(listings);

    const listingContainer = document.querySelector("#listing");
    listings.data.forEach((listing) => {
      const listingHtml = viewUserBidsHtml(listing);
      listingContainer.appendChild(listingHtml);
    });

    return listings.data;
  } catch (error) {
    alert(error.message);
  }
}

fetchUserBids();

function viewUserBidsHtml(bid) {
  const listingContainer = document.createElement("div");
  listingContainer.classList.add("listing");

  const link = document.createElement("a");
  link.classList.add("card", "my-4");
  link.href = `/listing/?title=${bid.listing.title}&id=${bid.listing.id}`;
  link.style.textDecoration = "none";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h2");
  title.classList.add("card-title", "h5");
  title.innerText = `${bid.listing.title}`;
  title.style.textDecoration = "underline";

  const bidAmount = document.createElement("p");
  bidAmount.classList.add("card-bid");
  bidAmount.innerText = `You bid ${bid.amount} credits.`;

  cardBody.appendChild(title);
  cardBody.appendChild(bidAmount);
  link.appendChild(cardBody);
  listingContainer.appendChild(link);

  return listingContainer;
}
