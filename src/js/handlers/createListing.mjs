import { createListing } from "../api/listings/index.mjs";

export function setCreateListingFormListener() {
  const form = document.querySelector("#createListing");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      let listing = Object.fromEntries(formData.entries());

      listing.media = [];
      for (let i = 1; i <= 5; i++) {
        if (listing[`mediaUrl${i}`] && listing[`mediaAlt${i}`]) {
          listing.media.push({ url: listing[`mediaUrl${i}`], alt: listing[`mediaAlt${i}`] });
          delete listing[`mediaUrl${i}`];
          delete listing[`mediaAlt${i}`];
        }
      }

      try {
        const newListing = await createListing(listing);

        window.location.href = `/src/listing/?title=${newListing.data.title}&id=${newListing.data.id}`;
      } catch (error) {
        alert(error.message);
      }
    });
  }
}
