export function listingTemplate(listingData) {
  const listing = document.createElement("div");
  listing.classList.add("listing", "col-md-4");

  const link = document.createElement("a");
  link.classList.add("card", "my-4");
  link.href = `/listing/?title=${listingData.title}&id=${listingData.id}`;
  link.style.textDecoration = "none";
  link.style.height = "400px";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.innerText = `${listingData.title}`;
  title.style.textDecoration = "underline";

  const text1 = document.createElement("p");
  text1.classList.add("card-text");
  text1.innerText = `By seller: ${listingData.seller.name}`;

  const startDateText = document.createElement("p");
  startDateText.classList.add("card-text");
  const startDate = new Date(listingData.created);
  const startOptions = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  const formattedStartDate = startDate.toLocaleString(undefined, startOptions);
  startDateText.innerText = `Listing Created: ${formattedStartDate}`;

  const endDateText = document.createElement("p");
  endDateText.classList.add("card-text");
  const endDate = new Date(listingData.endsAt);
  const endOptions = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  const formattedEndDate = endDate.toLocaleString(undefined, endOptions);
  endDateText.innerText = `Listing ending: ${formattedEndDate}`;

  cardBody.append(title, text1, startDateText, endDateText);

  if (listingData.media && listingData.media.length > 0) {
    const img = document.createElement("img");
    img.src = listingData.media[0].url;
    img.alt = `Image from ${listingData.title}`;
    img.classList.add("card-img-top");
    img.style.objectFit = "cover";
    img.style.height = "200px";
    link.prepend(img);
  }

  link.append(cardBody);
  listing.append(link);

  return listing;
}

export function renderListingTemplate(listingData, parent) {
  parent.append(listingTemplate(listingData));
}

export function renderListingTemplates(listingDataList, parent) {
  parent.append(...listingDataList.map(listingTemplate));
}
