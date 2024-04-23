import * as templates from "../templates/index.mjs";
import * as listingMethods from "../api/listings/index.mjs";

export async function searchListings(searchTerm) {
  const listings = await listingMethods.getListings();

  if (listings && Array.isArray(listings.data)) {
    const filteredListings = listings.data.filter((listing) => listing.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
    window.location.href = `/listings/?search=${encodeURIComponent(searchTerm)}`;
  });
}

if (searchInput) {
  searchInput.addEventListener("input", function () {
    searchListings(this.value);
  });
}
