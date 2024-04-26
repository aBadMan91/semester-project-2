import * as templates from "../templates/index.mjs";
import * as listingMethods from "../api/listings/index.mjs";

export async function searchListings(searchTerm = null) {
  if (!searchTerm) {
    const urlParams = new URLSearchParams(window.location.search);
    searchTerm = urlParams.get("search");
  }

  const listings = await listingMethods.getListings();

  if (listings && Array.isArray(listings.data)) {
    let filteredListings = listings.data;

    if (searchTerm) {
      filteredListings = listings.data.filter((listing) => listing.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    const container = document.querySelector("#listing");

    if (container) {
      container.innerHTML = "";
      templates.renderListingTemplates(filteredListings, container);
    }
  }
}

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = searchInput.value;
    window.location.href = `/src/listings/?search=${encodeURIComponent(searchTerm)}`;
  });
}

if (searchInput) {
  searchInput.addEventListener("input", function () {
    searchListings(this.value);
  });
}

searchListings();
