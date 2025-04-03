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

/****************************************************/
/****** Handling Active Nav Link                  ***/
/****************************************************/
const linkEl = document.querySelectorAll(".nav-list-item");
const logoEl = document.getElementById("logo-img");
const homeEl = document.querySelector(".home");
const servciesEl = document.querySelector(".services");
const worksEl = document.querySelector(".works");
const locationsEl = document.querySelector(".locations");
const contactEl = document.querySelector(".contact");
const contactHomeBtn = document.getElementById("contact__home-btn");
const whatWeCanDoBtn = document.getElementById("what-we-can-do-btn");
const seeOurWorksBtn = document.getElementById("see-our-works-btn");
const findOurStoresBtn1 = document.getElementById("find-our-stores-btn-1");
const findOurStoresBtn2 = document.getElementById("find-our-stores-btn-2");
const questionsForUsBtn = document.getElementById("questions-for-us-btn");

console.log("HOme: ", homeEl);

linkEl.forEach((link) => {
  link.addEventListener("click", () => {
    // remove previously active link
    document.querySelector(".link--active").classList.remove("link--active");

    if (link === logoEl) {
      homeEl.classList.add("link--active");
      console.log("HOme: ", homeEl);
    } else {
      // add "link--active" class to newly selected link
      link.classList.add("link--active");
      document.querySelector(".sidebar").style.display = "none";
    }
  });
});

// WHEN USER CLICK ACTION BUTTONS
//////////////////////////////////////////////////////////////////////////////
function addActiveLink(el) {
  // remove previously active link
  document.querySelector(".link--active").classList.remove("link--active");
  el.classList.add("link--active");
}
contactHomeBtn.addEventListener("click", () => {
  addActiveLink(homeEl);
});
whatWeCanDoBtn.addEventListener("click", () => {
  addActiveLink(servciesEl);
});
seeOurWorksBtn.addEventListener("click", () => {
  addActiveLink(worksEl);
});
findOurStoresBtn1.addEventListener("click", () => {
  addActiveLink(locationsEl);
});
findOurStoresBtn2.addEventListener("click", () => {
  addActiveLink(locationsEl);
});
questionsForUsBtn.addEventListener("click", () => {
  addActiveLink(contactEl);
});

/****************************************************/
/****** Handling Hide/Show Sidebar                ***/
/****************************************************/
const sidebarHideBtn = document.getElementById("sidebar__hide-btn");
const sidebarShowBtn = document.getElementById("sidebar__show-btn");
sidebarShowBtn.addEventListener("click", () => {
  document.querySelector(".sidebar").style.display = "flex";
});
sidebarHideBtn.addEventListener("click", () => {
  document.querySelector(".sidebar").style.display = "none";
});
