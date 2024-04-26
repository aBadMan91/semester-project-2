import "/src/scss/styles.scss";
import { load } from "../storage/index.mjs";
import { authFetch } from "../api/authFetch.mjs";

export async function fetchUserWins() {
  try {
    const { name } = load("profile");

    const response = await authFetch(`https://v2.api.noroff.dev/auction/profiles/${name}/wins?_seller=true&_bids=true`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user listings: ${response.status}`);
    }

    const listings = await response.json();
    console.log(listings);

    const listingContainer = document.querySelector("#listing");

    if (listings.data.length === 0) {
      listingContainer.innerHTML = "You have no winning bids yet.";
    } else {
      listings.data.forEach((listing) => {
        const listingHtml = viewUserWinsHtml(listing);
        listingContainer.appendChild(listingHtml);
      });
    }

    return listings.data;
  } catch (error) {
    alert(error.message);
  }
}

fetchUserWins();

function viewUserWinsHtml(bid) {
  const listingContainer = document.createElement("div");
  listingContainer.classList.add("listing");

  const link = document.createElement("a");
  link.classList.add("card", "my-4");
  link.href = `/listing/?title=${bid.listing.title}&id=${bid.listing.id}`;
  link.style.textDecoration = "none";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.innerText = `${bid.listing.title}`;
  title.style.textDecoration = "underline";

  const bidAmount = document.createElement("p");
  bidAmount.classList.add("card-bid");
  bidAmount.innerText = `Your bid ${bid.amount} credits.`;

  cardBody.appendChild(title);
  cardBody.appendChild(bidAmount);
  link.appendChild(cardBody);
  listingContainer.appendChild(link);

  return listingContainer;
}
