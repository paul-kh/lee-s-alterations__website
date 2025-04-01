import { STORE__LOCATIONS, GALLERY__IMAGES, SERVICES } from "./data.js";

/************************************************/
/****** Handling IMAGE GALLERY SHOWING        ***/
/************************************************/
const galleryEl = document.getElementById("gallery");
const modalPopup = document.getElementById("modal-popup");
const selectedImg = document.getElementById("selectedImg");

const imageIndexes = [1, 2, 3, 4, 5];
const selectedIndex = null;

imageIndexes.forEach((i) => {
  const img = document.createElement("img");
  img.src = `./assets/images/gallery/gallery-${i}.jpg`;
  img.alt = `Image of gallery picture ${i}`;
  img.classList.add("gallery-image");

  // add each image to gallery
  galleryEl.appendChild(img);

  // handle modal-popup
  img.addEventListener("click", () => {
    // bring the hidden modal to cover entire page when click on any image
    modalPopup.style.transform = "translateY(0)";

    // show selected image in the modal
    selectedImg.src = `./assets/images/gallery/gallery-${i}.jpg`;
    selectedImg.alt = `Image of gallery picture ${i}`;
  });
});

// Close modal when click on modal

modalPopup.addEventListener("click", () => {
  // hide the modal all the way to the top of page
  modalPopup.style.transform = "translateY(-100%)";

  // reset source and alt of selected image
  selectedImg.src = "";
  selectedImg.alt = "";
});

/****************************************************/
/****** Handling STORE LOCATIONS on user's click  ***/
/****************************************************/
const locationList = document.getElementById("location-list");
const mapContainer = document.getElementById("map-container");

// Show locations
STORE__LOCATIONS.forEach((store) => {
  const locationContainer = document.createElement("div");
  locationContainer.id = store.id;
  locationContainer.classList.add("location");
  locationContainer.innerHTML = `
    <h2 class="heading--tertiary"> ${store.location} </h2>
    <p> ${store.address}</p>
    <p> ${store.phone}</p>
    `;
  locationList.appendChild(locationContainer);
});

// Show first store in the store list when page load:
const firstStore = STORE__LOCATIONS[0];
const storeLocationEls = document.querySelectorAll(".location");
mapContainer.innerHTML = `
    ${firstStore.mapHtml} 
    <img src="${firstStore.imageUrl}" alt="Building picture of the store at ${firstStore.location}" />`;

// set first store to active/selected
storeLocationEls[0].classList.add("location--selected");

// Handle location click
storeLocationEls.forEach((el) => {
  el.addEventListener("click", () => {
    // remove previously selected location
    document
      .querySelector(".location--selected")
      .classList.remove("location--selected");

    // add "location--selected" class to the clicked element/location
    el.classList.add("location--selected");

    // Loop to find store that has same ID as the ID of clicked location
    let selectedStore = [];
    STORE__LOCATIONS.forEach((store) => {
      if (store.id == el.id) {
        selectedStore = store;
        return;
      }
    });

    // Show map and building picture of the selected store on the webpage
    mapContainer.innerHTML = `
        ${selectedStore.mapHtml} 
        <img src="${selectedStore.imageUrl}" alt="Building picture of the store at ${selectedStore.location}" />
        `;
  });
});
