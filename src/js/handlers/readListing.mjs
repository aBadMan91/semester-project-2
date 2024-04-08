import { API_AUCTION_URL } from "../api/constants.mjs";
import { getListing } from "../api/listings/read.mjs";

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

  createListingHtml(listingData);
}

viewListing();
