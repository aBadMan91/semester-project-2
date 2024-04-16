import { load } from "../storage/index.mjs";
import { authFetch } from "../api/authFetch.mjs";

export async function fetchUserListings() {
  try {
    const { name } = load("profle");

    const response = await authFetch(`https://api.noroff.dev/api/v1/auction/profiles/${name}/listings`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user listings: ${response.status}`);
    }

    const listings = await response.json();

    const listingContainer = document.querySelector("#listing-container");
    listings.forEach((listing) => {
      const listingHtml = createHtml(listing);
      listingContainer.appendChild(listingHtml);
    });

    return listings;
  } catch (error) {
    alert(error.message);
  }
}

fetchUserListings();

function createHtml(listings) {
  const listingContainer = document.createElement("div");
  listingContainer.classList.add("listing");

  const link = document.createElement("a");
  link.classList.add("card", "my-4");
  link.href = `/listing/?title=${listings.data.title}&id=${listings.data.id}`;
  link.style.textDecoration = "none";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.innerText = `${listings.data.title}`;
  title.style.textDecoration = "underline";

  const editButton = document.createElement("button");
  editButton.classList.add("btn", "btn-primary");
  editButton.innerText = "Edit listing";
  editButton.onclick = function (event) {
    event.preventDefault();
    window.location.href = `/listing/edit/?id=${listings.data.id}`;
  };
  editButton.classList.add("edit-button");

  cardBody.appendChild(title);
  cardBody.appendChild(editButton);
  link.appendChild(cardBody);
  listingContainer.appendChild(link);

  return listingContainer;
}
