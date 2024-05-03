import * as templates from "../templates/index.mjs";
import * as listingMethods from "../api/listings/index.mjs";

let currentPage = 1;
let currentSort = "newest";

export async function viewListings(sort = "newest", page = 1) {
  const listings = await listingMethods.getListings(sort, page);
  const container = document.querySelector(".listings");

  if (container) {
    container.innerHTML = "";
    templates.renderListingTemplates(listings.data, container);
  }

  currentPage = listings.meta.currentPage;
  currentSort = sort;

  if (window.location.pathname === "/listings/" || window.location.pathname === "/") {
    document.querySelector("#prevPageButton").disabled = listings.meta.isFirstPage;
    document.querySelector("#nextPageButton").disabled = listings.meta.isLastPage;
  }
}

if (window.location.pathname === "/listings/" || window.location.pathname === "/") {
  document.querySelector("#prevPageButton").addEventListener("click", function () {
    if (currentPage > 1) {
      viewListings(currentSort, currentPage - 1);
      window.scrollTo(0, 0);
    }
  });

  document.querySelector("#nextPageButton").addEventListener("click", function () {
    viewListings(currentSort, currentPage + 1);
    window.scrollTo(0, 0);
  });

  document.querySelector("#selection").addEventListener("change", function () {
    viewListings(this.value, 1);
  });

  viewListings(document.querySelector("#selection").value, 1);
}
