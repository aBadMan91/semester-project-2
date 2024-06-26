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
  link.href = `/listing/?title=${listing.title}&id=${listing.id}`;
  link.style.textDecoration = "none";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h2");
  title.classList.add("card-title", "h5");
  title.innerText = `${listing.title}`;
  title.style.textDecoration = "underline";

  const startDateText = document.createElement("p");
  startDateText.classList.add("card-text");
  const startDate = new Date(listing.created);
  const startOptions = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  const formattedStartDate = startDate.toLocaleString(undefined, startOptions);
  startDateText.innerText = `Created: ${formattedStartDate}`;

  const endDateText = document.createElement("p");
  endDateText.classList.add("card-text");
  const endDate = new Date(listing.endsAt);
  const endOptions = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  const formattedEndDate = endDate.toLocaleString(undefined, endOptions);
  endDateText.innerText = `Ending: ${formattedEndDate}`;

  const editButton = document.createElement("button");
  editButton.classList.add("btn", "btn-success");
  editButton.innerText = "Edit listing";
  editButton.onclick = function (event) {
    event.preventDefault();
    window.location.href = `/listing/edit/?id=${listing.id}`;
  };
  editButton.classList.add("edit-button");

  cardBody.append(title, startDateText, endDateText, editButton);
  link.appendChild(cardBody);
  listingContainer.appendChild(link);

  return listingContainer;
}
