import * as templates from "../templates/index.mjs";
import * as listingMethods from "../api/listings/index.mjs";

export async function viewListings(sort = "newest") {
  const listings = await listingMethods.getListing(sort);
  const container = document.querySelector("#listings");

  if (container) container.innerHTML = "";
  templates.renderListingTemplates(listings, container);
}

if (window.location.pathname === "/listings/") {
  document.querySelector("#selection").addEventListener("change", function () {
    viewListings(this.value);
  });

  viewListings(document.querySelector("#selection").value);
}
