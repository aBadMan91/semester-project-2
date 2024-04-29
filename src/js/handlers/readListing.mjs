import { API_AUCTION_URL } from "../api/constants.mjs";
import { getListing } from "../api/listings/read.mjs";
import { placeBid } from "../api/listings/bid.mjs";

const listingContainer = document.querySelector("#listing-container");
listingContainer.classList.add("d-flex", "flex-column", "justify-content-center");
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const title = params.get("title");

document.title = "Northern Auction" + " | " + " " + title;

const url = `${API_AUCTION_URL}/listings/${id}?_seller=true&_bids=true`;
console.log(url);

async function viewListing() {
  const listingData = await getListing(id);
  console.log(listingData);

  createListingHtml(listingData);
}

viewListing();

export function createListingHtml(listing) {
  const mainImageContainer = document.createElement("div");
  mainImageContainer.classList.add("d-flex", "align-items-center", "col-md-8", "mx-auto");

  const mainImage = document.createElement("img");
  mainImage.classList.add("img-fluid");
  mainImage.style.borderRadius = "0.25rem";
  mainImageContainer.appendChild(mainImage);

  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.classList.add("d-flex", "justify-content-center");

  if (listing.data.media) {
    listing.data.media.forEach((media, index) => {
      if (index === 0) {
        mainImage.src = media.url;
        return;
      }

      const img = document.createElement("img");
      img.src = media.url;
      img.alt = media.alt;
      img.classList.add("img-thumbnail", "my-2");
      img.style.cursor = "pointer";
      img.style.maxWidth = "200px";
      img.addEventListener("click", function () {
        const oldMainImageSrc = mainImage.src;
        mainImage.src = this.src;
        this.src = oldMainImageSrc;
      });
      thumbnailContainer.appendChild(img);
    });
  }

  listingContainer.appendChild(mainImageContainer);
  listingContainer.appendChild(thumbnailContainer);

  const listingContent = document.createElement("div");
  listingContent.classList.add("listing-content", "col-md-8", "mx-auto");
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

  const bidInputDiv = document.createElement("div");
  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.min = "0";
  bidInput.placeholder = "Enter your bid";
  bidInput.classList.add("form-control-sm", "my-2");
  bidInputDiv.appendChild(bidInput);
  listingContent.appendChild(bidInputDiv);

  const bidButtonDiv = document.createElement("div");
  const bidButton = document.createElement("button");
  bidButton.classList.add("btn", "btn-primary", "mb-4");
  bidButton.innerText = "Bid Now";
  bidButtonDiv.appendChild(bidButton);
  listingContent.appendChild(bidButtonDiv);

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
      alert(error.message);
    }

    bidInput.value = "";
  });

  const body = document.createElement("p");
  body.innerText = listing.data.description;
  listingContent.appendChild(body);
}
