import { getListing, updateListing, removeListing } from "../api/listings/index.mjs";

export async function updateListingFormListener() {
  const form = document.querySelector("#editListing");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (form) {
    const button = form.querySelector("button");
    const deleteButton = document.querySelector("#deleteListing");

    button.disabled = true;

    const listing = await getListing(id);

    form.title.value = listing.title;
    form.body.value = listing.body;
    form.tags.value = listing.tags;
    form.media.value = listing.media;

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

    deleteButton.addEventListener("click", async () => {
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
