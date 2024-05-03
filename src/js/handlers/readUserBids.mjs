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

  const endDateText = document.createElement("p");
  endDateText.classList.add("card-text");
  const endDate = new Date(bid.listing.endsAt);
  const endOptions = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  const ended = new Date();
  let endDateTextContent;
  if (endDate < ended) {
    const endedDate = endDate.toLocaleString(undefined, endOptions);
    endDateTextContent = `Ended: ${endedDate}`;
  } else {
    const endingDate = endDate.toLocaleString(undefined, endOptions);
    endDateTextContent = `Listing ending: ${endingDate}`;
  }

  endDateText.innerText = endDateTextContent;

  const bidAmount = document.createElement("p");
  bidAmount.classList.add("card-bid");
  bidAmount.innerText = `You bid ${bid.amount} credits.`;

  cardBody.append(title, endDateText, bidAmount);
  link.appendChild(cardBody);
  listingContainer.appendChild(link);

  return listingContainer;
}
