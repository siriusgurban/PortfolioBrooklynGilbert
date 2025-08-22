"use strict";

import { firebaseConfig } from "./firebase.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

import {
  remove,
  ref,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

import { getData, setData, convert, addData } from "./handlers.js";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// -----------------------------------Toasty-Start--------------------------------------------

const toastLiveExample = document.getElementById("liveToast");
const liveToastError = document.getElementById("liveToastError");

// -----------------------------------Toasty-Start--------------------------------------------
// -----------------------------------Hero-Start--------------------------------------------
const heroInput = document.querySelector("#heroInput");
const heroTextarea = document.querySelector("#heroTextarea");
const heroSubmit = document.querySelector("#heroSubmit");
const heroEdit = document.querySelector("#heroEdit");

heroSubmit.addEventListener("click", async (e) => {
  e.preventDefault();

  heroSubmit.setAttribute("disabled", "");
  heroEdit.removeAttribute("disabled");

  let obj = {
    title: heroInput.value,
    text: heroTextarea.value,
  };

  try {
    setData("hero/", obj);
    await heroInner();
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
  } catch (error) {
    console.log(error);
  }
});

async function heroInner() {
  const data = await getData("hero");

  heroSubmit.setAttribute("disabled", "");
  heroEdit.removeAttribute("disabled");

  heroInput.setAttribute("disabled", "");
  heroTextarea.setAttribute("disabled", "");

  heroInput.value = data?.title;
  heroTextarea.value = data?.text;
}

heroEdit.addEventListener("click", (e) => {
  e.preventDefault();

  heroSubmit.removeAttribute("disabled");
  heroEdit.setAttribute("disabled", "");

  heroInput.removeAttribute("disabled");
  heroTextarea.removeAttribute("disabled");
});

heroInner();

// -----------------------------------Hero-End--------------------------------------------
// -----------------------------------About-Start--------------------------------------------

const aboutInput = document.querySelector("#aboutInput");
const aboutTextareaOne = document.querySelector("#aboutTextareaOne");
const aboutTextareaTwo = document.querySelector("#aboutTextareaTwo");
const aboutSubmit = document.querySelector("#aboutSubmit");

aboutSubmit.addEventListener("click", async (e) => {
  e.preventDefault();

  let obj = {
    title: aboutInput.value,
    textOne: aboutTextareaOne.value,
    textTwo: aboutTextareaTwo.value,
  };

  try {
    setData("about/", obj);
    await aboutWrite();
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
  } catch (error) {
    console.log(error);
  }
});

async function aboutWrite() {
  const data = await getData("about");

  aboutSubmit.setAttribute("disabled", "");
  aboutEdit.removeAttribute("disabled");

  aboutInput.setAttribute("disabled", "");
  aboutTextareaOne.setAttribute("disabled", "");
  aboutTextareaTwo.setAttribute("disabled", "");

  aboutInput.value = data?.title;
  aboutTextareaOne.value = data?.textOne;
  aboutTextareaTwo.value = data?.textTwo;
}

aboutEdit.addEventListener("click", (e) => {
  e.preventDefault();
  aboutSubmit.removeAttribute("disabled");
  aboutEdit.setAttribute("disabled", "");

  aboutInput.removeAttribute("disabled");
  aboutTextareaOne.removeAttribute("disabled");
  aboutTextareaTwo.removeAttribute("disabled");
});

aboutWrite();

// -----------------------------------About-End--------------------------------------------
// -----------------------------------Process-Start--------------------------------------------

const processInput = document.querySelector("#processInput");
const processTextareaOne = document.querySelector("#processTextareaOne");
const processTextareaTwo = document.querySelector("#processTextareaTwo");
const processSubmit = document.querySelector("#processSubmit");
const processCardSubmit = document.querySelector("#processCardSubmit");
const processCardImage = document.querySelector("#processCardImage");
const processCardInput = document.querySelector("#processCardInput");
const processCardTextarea = document.querySelector("#processCardTextarea");
const processCard = document.querySelector("#processCard");
const processEdit = document.querySelector("#processEdit");

processSubmit.addEventListener("click", async (e) => {
  e.preventDefault();

  processInput.setAttribute("disabled", "");
  processTextareaOne.setAttribute("disabled", "");
  processTextareaTwo.setAttribute("disabled", "");

  let obj = {
    title: processInput.value,
    textOne: processTextareaOne.value,
    textTwo: processTextareaTwo.value,
  };

  try {
    setData("process/" + "left", obj);
    await processWrite();
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
  } catch (error) {
    console.log(error);
  }
});

// --------------------------------------------------------------------

processCardSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  let objRight = {
    img: processCardImage.value
      ? processCardImage.value
      : "https://img.freepik.com/premium-vector/business-analyst-icon-vector-image-can-be-used-diversity_120816-49197.jpg",
    title: processCardInput.value,
    text: processCardTextarea.value,
  };

  try {
    if (
      processCardInput.value.trim().length === 0 &&
      processCardTextarea.value.trim().length === 0
    ) {
      return bootstrap.Toast.getOrCreateInstance(liveToastError).show();
    }
    addData("process/" + "right", objRight);
    await processWrite();
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    processCardImage.value = "";
    processCardInput.value = "";
    processCardTextarea.value = "";
  } catch (error) {
    console.log(error);
  }

  processCardWrite();
});

async function processWrite() {
  const dataLeft = await getData("process/" + "left");

  processInput.setAttribute("disabled", "");
  processTextareaOne.setAttribute("disabled", "");
  processTextareaTwo.setAttribute("disabled", "");

  processSubmit.setAttribute("disabled", "");
  processEdit.removeAttribute("disabled");
  processInput.value = dataLeft?.title;
  processTextareaOne.value = dataLeft?.textOne;
  processTextareaTwo.value = dataLeft?.textTwo;
}

let deleteProcessId = null;

async function processCardWrite() {
  const dataRight = await getData("process/right");
  let data = convert(dataRight);
  processCard.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card pt-2 pb-2 d-flex flex-column ";
    card.style.width = "18rem";
    card.id = item.id;

    card.innerHTML = `
      <div class="d-flex justify-content-center"><img src="${item.img}" width="50" height="50" /></div>
      <div class="card-body">
        <div class="form-control processCardInput">${item.title}</div>
        <div class="form-control processCardTextarea">${item.text}</div>
      </div>
      <button class="btn btn-danger delete-btn dlt w-50 mx-auto" data-id="${item.id}">Delete</button>
    `;

    card.querySelector(".dlt").addEventListener("click", (e) => {
      deleteProcessId = e.target.getAttribute("data-id");
      const modal = new bootstrap.Modal(document.getElementById("deleteModal"));
      modal.show();
    });

    processCard.appendChild(card);
  });
}

document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", async () => {
    if (deleteProcessId) {
      await remove(ref(db, "process/right/" + deleteProcessId));
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deleteModal")
      );
      modal.hide();
      processCardWrite();
      deleteProcessId = null;
    }
  });

processEdit.addEventListener("click", (e) => {
  e.preventDefault();
  processSubmit.removeAttribute("disabled");
  processEdit.setAttribute("disabled", "");

  processInput.removeAttribute("disabled");
  processTextareaOne.removeAttribute("disabled");
  processTextareaTwo.removeAttribute("disabled");
});

processCardWrite();

processWrite();

// -----------------------------------Process-End--------------------------------------------
// -----------------------------------Portfolio-Start--------------------------------------------

const portfolioImage = document.querySelector("#portfolioImage");
const portfolioSubInput = document.querySelector("#portfolioSubInput");
const portfolioTitleInput = document.querySelector("#portfolioTitleInput");
const portfolioTextarea = document.querySelector("#portfolioTextarea");
const portfolioLinkInput = document.querySelector("#portfolioLinkInput");
const portfolioSubmit = document.querySelector("#portfolioSubmit");
const portfolioCard = document.querySelector("#portfolioCard");

const cloudName = "da9pxl3o7"; // e.g. "dmoabc123"
const uploadPreset = "Portfolio";

portfolioSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  if (
    portfolioSubInput.value.trim().length === 0 &&
    portfolioTitleInput.value.trim().length === 0 &&
    portfolioTextarea.value.trim().length === 0 &&
    portfolioLinkInput.value.trim().length === 0
  ) {
    return bootstrap.Toast.getOrCreateInstance(liveToastError).show();
  }

  try {
    portfolioSubmit.setAttribute("disabled", "");

    const file = portfolioImage.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadRes.json();
    console.log("Cloudinary Upload:", uploadData);

    let obj = {
      image: uploadData.secure_url
        ? uploadData.secure_url
        : "https://placehold.co/420x240",

      sub: portfolioSubInput.value,
      title: portfolioTitleInput.value,
      text: portfolioTextarea.value,
      link: portfolioLinkInput.value,
    };

    await addData("portfolio/", obj);

    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();

    portfolioImage.value = "";
    portfolioSubInput.value = "";
    portfolioTitleInput.value = "";
    portfolioTextarea.value = "";
    portfolioLinkInput.value = "";
  } catch (error) {
    console.error("Error saving portfolio:", error);
  } finally {
    portfolioSubmit.removeAttribute("disabled");
  }

  writePortfolioCard();
});

let deleteCardId = null;

async function writePortfolioCard() {
  const dataRight = await getData("portfolio");
  let data = convert(dataRight);
  portfolioCard.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card pt-2 pb-2 d-flex flex-column ";
    card.style.width = "18rem";
    card.id = item.id;

    card.innerHTML = `
      <img src="${item.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h6 class="card-title">${item.sub}</h6>
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.text}</p>
        <button class="btn btn-danger delete-btn dlt-btn w-50 mx-auto" data-id="${item.id}">Delete</button>
      </div>
    `;

    card.querySelector(".dlt-btn").addEventListener("click", (e) => {
      deleteId = e.target.getAttribute("data-id");
      const modal = new bootstrap.Modal(document.getElementById("deleteModal"));
      modal.show();
    });

    portfolioCard.appendChild(card);
  });
}

document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", async () => {
    if (deleteId) {
      await remove(ref(db, "portfolio/" + deleteId));
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deleteModal")
      );
      modal.hide();
      writePortfolioCard();
      deleteCardId = null;
    }
  });

writePortfolioCard();

// -----------------------------------Portfolio-End--------------------------------------------
// -----------------------------------Contact-Start--------------------------------------------

const contactAddress = document.querySelector("#contactAddress");
const contactEmail = document.querySelector("#contactEmail");
const contactPhone = document.querySelector("#contactPhone");
const contactSubmit = document.querySelector("#contactSubmit");
const contactEdit = document.querySelector("#contactEdit");

contactSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  contactSubmit.setAttribute("disabled", "");
  contactEdit.removeAttribute("disabled");

  contactAddress.setAttribute("disabled", "");
  contactEmail.setAttribute("disabled", "");
  contactPhone.setAttribute("disabled", "");

  let obj = {
    address: contactAddress.value,
    email: contactEmail.value,
    phone: contactPhone.value,
  };
  try {
    setData("info/", obj);
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
  } catch (error) {
    console.log(error);
  }
});

async function writeInfoHtml() {
  const data = await getData("info/");

  contactSubmit.setAttribute("disabled", "");
  contactEdit.removeAttribute("disabled");

  contactAddress.setAttribute("disabled", "");
  contactEmail.setAttribute("disabled", "");
  contactPhone.setAttribute("disabled", "");

  contactAddress.value = data.address;
  contactEmail.value = data.email;
  contactPhone.value = data.phone;
}

contactEdit.addEventListener("click", (e) => {
  e.preventDefault();
  contactSubmit.removeAttribute("disabled");
  contactEdit.setAttribute("disabled", "");

  contactAddress.removeAttribute("disabled");
  contactEmail.removeAttribute("disabled");
  contactPhone.removeAttribute("disabled");
});

writeInfoHtml();

// ------------------------------------------------------------------

const tbody = document.querySelector("tbody");

let deleteId = null; // store the id for deletion
const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

// Event delegation for delete buttons
tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteId = e.target.getAttribute("data-id"); // save id
    deleteModal.show(); // open modal
  }
});

// Handle confirm delete
confirmDeleteBtn.addEventListener("click", async () => {
  if (deleteId) {
    await remove(ref(db, "contact/" + deleteId));
    deleteId = null; // reset
    deleteModal.hide(); // close modal
    writeContactTable(); // refresh table
  }
});

async function writeContactTable() {
  tbody.innerHTML = ""; // clear
  const data = await getData("contact/");
  let convertedDataContact = convert(data);

  if (!convertedDataContact.length) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center">No data available</td></tr>`;
    return;
  }

  convertedDataContact.reverse().forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.location === undefined ? "No location" : item.location}</td>
        <td>${item.budget}</td>
        <td>${item.subject}</td>
        <td>${item.message}</td>
        <td>
          <button class="btn btn-danger delete-btn w-50 mx-auto" data-id="${
            item.id
          }">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

writeContactTable();

// -----------------------------------Contact-End--------------------------------------------
