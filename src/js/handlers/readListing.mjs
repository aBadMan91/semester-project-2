import { API_AUCTION_URL } from "../api/constants.mjs";
import { getListing } from "../api/listings/read.mjs";
import { placeBid } from "../api/listings/bid.mjs";

const listingContainer = document.querySelector(".container");
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const title = params.get("title");

document.title = title;

const url = `${API_AUCTION_URL}/listings/${id}?_seller=true&_bids=true`;
console.log(url);

async function viewListing() {
  const listingData = await getListing(id);
  console.log(listingData);

  createListingHtml(listingData);
}

viewListing();

export function createListingHtml(listing) {
  if (listing.data.media) {
    listing.data.media.forEach((media) => {
      const img = document.createElement("img");
      img.src = media.url;
      img.alt = media.alt;
      img.classList.add("img-fluid");
      listingContainer.appendChild(img);
    });
  }

  const listingContent = document.createElement("div");
  listingContent.classList.add("listing-content");
  listingContainer.appendChild(listingContent);

  const heading = document.createElement("h1");
  heading.textContent = `${listing.data.title}`;
  listingContent.appendChild(heading);

  const seller = document.createElement("p");
  seller.innerText = `Seller: ${listing.data.seller.name}`;
  listingContent.appendChild(seller);

  const startDateHeading = document.createElement("h2");
  const startDate = new Date(listing.data.created);
  const startOptions = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  const formattedStartDate = startDate.toLocaleString(undefined, startOptions);
  startDateHeading.textContent = `Listing created: ${formattedStartDate}`;
  listingContent.appendChild(startDateHeading);

  const endDateHeading = document.createElement("h2");
  const endDate = new Date(listing.data.endsAt);
  const endOptions = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  const formattedEndDate = endDate.toLocaleString(undefined, endOptions);
  endDateHeading.textContent = `Listing ending: ${formattedEndDate}`;
  listingContent.appendChild(endDateHeading);

  const bids = document.createElement("p");
  bids.textContent = `Number of bids: ${listing.data._count.bids}`;
  listingContent.appendChild(bids);

  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.min = "0";
  bidInput.placeholder = "Enter your bid";
  bidInput.classList.add("form-control");
  listingContent.appendChild(bidInput);

  const bidButton = document.createElement("button");
  bidButton.classList.add("btn", "btn-primary");
  bidButton.innerText = "Bid Now";

  bidButton.addEventListener("click", async () => {
    const bidAmount = Number(bidInput.value);
    if (isNaN(bidAmount) || bidAmount < 0) {
      alert("Please enter a valid bid amount greater than 0");
      return;
    }

    try {
      await placeBid(listing.data.id, bidAmount);
      alert(`Bid placed successfully for listing: ${listing.data.title}, your bid amount: ${bidAmount}`);
    } catch (error) {
      alert("An error occurred while placing your bid. Please try again.");
    }

    bidInput.value = "";
  });

  listingContent.appendChild(bidButton);

  const body = document.createElement("p");
  body.innerText = listing.data.description;
  listingContent.appendChild(body);
}
