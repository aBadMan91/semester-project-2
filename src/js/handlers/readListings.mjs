import * as templates from "../templates/index.mjs";
import * as listingMethods from "../api/listings/index.mjs";

export async function viewListings(sort = "newest") {
  const listings = await listingMethods.getListings(sort);
  console.log(listings);
  const container = document.querySelector(".listings");

  if (container) {
    container.innerHTML = "";
    templates.renderListingTemplates(listings.data, container);
  }
}

if (window.location.pathname === "/src/listings/") {
  document.querySelector("#selection").addEventListener("change", function () {
    viewListings(this.value);
  });

  viewListings(document.querySelector("#selection").value);
}
