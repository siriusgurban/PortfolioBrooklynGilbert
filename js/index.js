"use strict";

import { firebaseConfig } from "./firebase.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  set,
  remove,
  update,
  ref,
  push,
  onValue,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

import { getData, convert, addData } from "./handlers.js";

const heroLeftContent = document.querySelector(".heroLeftContent");

async function heroWrite() {
  const data = await getData("hero");
  console.log(data, "Data");

  heroLeftContent.innerHTML = `
         <h1 class="heroTitle">${data.title}</h1>
            <p class="heroDesc">${data.text}</p>
                <a href="./index.html#contact" class="heroBtn">Say Hello!</a>
  `;
}

heroWrite();

const heroStatExperience = document.querySelector("#heroStatExperience");
const heroStatProject = document.querySelector("#heroStatProject");
const heroStatClient = document.querySelector("#heroStatClient");

async function getFromGitHub() {
  let data = await fetch("https://api.github.com/users/siriusgurban");
  let res = await data.json();

  let year = new Date(res.created_at).getFullYear();
  let currentYear = new Date().getFullYear();
  let experience = currentYear - year;

  heroStatExperience.innerHTML = `
    <h4>${experience} Y.</h4>
    <span>Experience</span>
  `;

  heroStatProject.innerHTML = `
    <h4>${res.public_repos}+</h4>
    <span>Project Completed</span>
  `;

  heroStatClient.innerHTML = `
    <h4>${res.followers}+</h4>
    <span>Project Completed</span>
  `;
}

// getFromGitHub();


const aboutTitle = document.querySelector(".aboutTitle");
const aboutText = document.querySelector(".aboutText");

async function aboutWrite() {
  const data = await getData("about");

  aboutTitle.innerHTML = `${data?.title}`;
  aboutText.innerHTML = `<div class="aboutText">
                <p>
                 ${data?.textOne}
                </p>
                <p>
                  ${data?.textTwo}
                </p>
              </div>`;
}

aboutWrite();

// -----------------------------------About-End--------------------------------------------
// -----------------------------------Process-Start--------------------------------------------

const processTitle = document.querySelector(".processTitle");
const processDesc = document.querySelector(".processDesc");
const processDescSub = document.querySelector("#processDescSub");
const processRight = document.querySelector(".processRight");

async function processWrite() {
  const data = await getData("process/left");

  processTitle.innerHTML = `${data?.title}`;
  processDesc.innerHTML = `${data?.textOne}`;
  processDescSub.innerHTML = `${data?.textTwo}`;

  const dataRight = await getData("process/right");
  let convertedData = convert(dataRight);

  console.log(convertedData, "dataRight");

  convertedData.reverse().map((item, index) => {
    processRight.innerHTML += `<div class="processItem">
                <div class="processImage">
                  <img src="${item.img}" alt="notes" />

                </div>
                <div>
                  <h5>${index + 1}. ${item.title}</h5>
                  <p>
                    ${item.text}
                  </p>
                </div>
   </div>
  `;
  });
}

processWrite();

// -----------------------------------Process-End--------------------------------------------

// -----------------------------------Portfolio-Start--------------------------------------------

const portfolioContent = document.querySelector(".portfolioContent");
const portfolioBtn = document.querySelector(".portfolioBtn");

let convertedData = [];
let visibleCount = 4; // how many to show initially

async function portfolioWrite() {
  const data = await getData("portfolio");
  convertedData = convert(data).reverse();
  renderPortfolio();
}

function renderPortfolio() {
  portfolioContent.innerHTML = "";

  // show only up to visibleCount
  convertedData.slice(0, visibleCount).forEach((item) => {
    portfolioContent.innerHTML += `
      <div class="portfolioCard">
        <img src="${item.image}" alt="portfolio" />
        <div class="portfolioCardInfo">
          <p class="cardSubtitle">${item.sub}</p>
          <h5 class="cardTitle">${item.title}</h5>
          <p class="cardDesc">${item.text}</p>
          <div class="cardBtn">
            <a href="${item.link}" target="_blank">Go Project</a>
          </div>
        </div>
      </div>
    `;
  });

  // hide button if all are shown
  if (visibleCount >= convertedData.length) {
    portfolioBtn.style.display = "none";
  } else {
    portfolioBtn.style.display = "flex";
  }
}

portfolioBtn.addEventListener("click", () => {
  visibleCount += 4;
  renderPortfolio();
});

portfolioWrite();

// -----------------------------------Portfolio-End--------------------------------------------

// -----------------------------------Contact-Start--------------------------------------------

const contactInfo = document.querySelector("#contactInfo");

async function contactInfoWrite() {
  let data = await getData("info");

  contactInfo.innerHTML = `<a
                    class="contactCard"
                    target="_blank"
                    href="https://www.google.com/maps/search/${data.address}"
                  >
                    <div class="contactImage">
                      <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <div class="contactInfo">
                      <span>Address:</span>
                      <span>${data.address}</span>
                    </div>
                  </a>
                  <a class="contactCard" href="mailto:${data.email}">
                    <div class="contactImage">
                      <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div class="contactInfo">
                      <span>My Email:</span>
                      <span>${data.email}</span>
                    </div>
                  </a>
                  <a class="contactCard" href="tel:${data.phone}">
                    <div class="contactImage">
                      <i class="fa-solid fa-phone"></i>
                    </div>
                    <div class="contactInfo">
                      <span>Call Me Now:</span>
                      <span>${data.phone}</span>
                    </div>
                  </a>`;
}

contactInfoWrite();

// ------------------------------------------------------------------------

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect values
  const name = document.getElementById("contactFormName");
  const email = document.getElementById("contactFormEmail");
  const location = document.getElementById("contactFormLocation");
  const budget = document.getElementById("contactFormBudget");
  const subject = document.getElementById("contactFormSubject");
  const message = document.getElementById("contactFormMessage");

  let isValid = true;

  // Clear old errors
  form.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  form.querySelectorAll("input, textarea").forEach((el) => {
    el.style.borderBottom = "1px solid #ccc";
  });

  // Validation rules
  if (name.value.trim().length < 4) {
    setError(name, "Name must be at least 4 characters");
    isValid = false;
  }

  if (!validateEmail(email.value)) {
    setError(email, "Please enter a valid email");
    isValid = false;
  }

  if (!budget.value || isNaN(budget.value)) {
    setError(budget, "Budget must be a number");
    isValid = false;
  }

  if (subject.value.trim().length < 1) {
    setError(subject, "Subject is required");
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    setError(message, "Message must be at least 10 characters");
    isValid = false;
  }

  if (!isValid) return;

  // If all valid → create object
  const formData = {
    name: name.value.trim(),
    email: email.value.trim(),
    location: location.value.trim() || null,
    budget: Number(budget.value),
    subject: subject.value.trim(),
    message: message.value.trim(),
  };

  addData("contact", formData);

  // Clear form
  form.reset();
  form.querySelectorAll("input, textarea").forEach((el) => {
    el.style.borderBottom = "1px solid #ccc";
  });

});

function setError(element, message) {
  element.style.borderBottom = "1px solid red";
  element.nextElementSibling.textContent = message;
  element.nextElementSibling.style.color = "red";
  element.nextElementSibling.style.fontSize = "12px";
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

// -----------------------------------Contact-End--------------------------------------------
