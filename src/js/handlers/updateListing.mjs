import { getListing, updateListing, removeListing } from "../api/listings/index.mjs";

export async function setUpdateListingFormListener() {
  const form = document.querySelector("#editListing");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (form) {
    const button = form.querySelector("button");
    const deleteButton = document.querySelector("#deleteListing");

    button.disabled = true;

    const listing = await getListing(id);
    console.log(listing);

    form.title.value = listing.data.title;
    form.description.value = listing.data.description;
    form.tags.value = listing.data.tags;

    listing.data.media.forEach((mediaItem, index) => {
      const urlInput = document.querySelector(`#mediaUrl${index + 1}`);
      const altInput = document.querySelector(`#mediaAlt${index + 1}`);

      if (urlInput && altInput) {
        urlInput.value = mediaItem.url;
        altInput.value = mediaItem.alt;
      }
    });

    button.disabled = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const listing = Object.fromEntries(formData.entries());
      listing.id = id;

      try {
        await updateListing(listing);
        alert("Listing has been updated");
        window.location.href = "/profile/";
      } catch (error) {
        alert(error.message);
      }
    });

    deleteButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const confirmation = window.confirm("Are you sure you want to delete this listing?");
      if (confirmation) {
        try {
          await removeListing(id);
          alert("Listing has been deleted");
          window.location.href = "/profile/";
        } catch (error) {
          alert(error.message);
        }
      }
    });
  }
}
