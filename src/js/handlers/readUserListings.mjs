import "/src/scss/styles.scss";
import { load } from "../storage/index.mjs";
import { authFetch } from "../api/authFetch.mjs";

export async function fetchUserListings() {
  try {
    const { name } = load("profile");

    const response = await authFetch(`https://v2.api.noroff.dev/auction/profiles/${name}/listings`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user listings: ${response.status}`);
    }

    const listings = await response.json();
    console.log(listings);

    const listingContainer = document.querySelector("#listing");
    listings.data.forEach((listing) => {
      const listingHtml = viewUserListingsHtml(listing);
      listingContainer.appendChild(listingHtml);
    });

    return listings.data;
  } catch (error) {
    alert(error.message);
  }
}

fetchUserListings();

function viewUserListingsHtml(listing) {
  const listingContainer = document.createElement("div");
  listingContainer.classList.add("listing");

  const link = document.createElement("a");
  link.classList.add("card", "my-4");
  link.href = `/src/listing/?title=${listing.title}&id=${listing.id}`;
  link.style.textDecoration = "none";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.innerText = `${listing.title}`;
  title.style.textDecoration = "underline";

  const editButton = document.createElement("button");
  editButton.classList.add("btn", "btn-primary");
  editButton.innerText = "Edit listing";
  editButton.onclick = function (event) {
    event.preventDefault();
    window.location.href = `/src/listing/edit/?id=${listing.id}`;
  };
  editButton.classList.add("edit-button");

  cardBody.appendChild(title);
  cardBody.appendChild(editButton);
  link.appendChild(cardBody);
  listingContainer.appendChild(link);

  return listingContainer;
}
