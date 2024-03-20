import { createListing } from "../api/listings/index.mjs";

export function setCreateListingFormListener() {
  const form = document.querySelector("#createListing");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const listing = Object.fromEntries(formData.entries());

      try {
        const newListing = await createListing(listing);

        window.location.href = `/listing/?id=${newListing.id}`;
      } catch (error) {
        alert(error.message);
      }
    });
  }
}
