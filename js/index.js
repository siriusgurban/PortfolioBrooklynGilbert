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

import { getData, convert } from "./handlers.js";

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

async function getYear() {
  let data = await fetch("https://api.github.com/users/siriusgurban");
  let res = await data.json();
  let year = new Date(res.created_at).getFullYear();
  let currentYear = new Date().getFullYear();
  let experience = currentYear - year;

  heroStatExperience.innerHTML = `
    <h4>${experience} Y.</h4>
    <span>Experience</span>
  `;
}

// getYear()

async function getRepos() {
  let data = await fetch("https://api.github.com/users/siriusgurban/repos");
  let res = await data.json();
  heroStatProject.innerHTML = `
    <h4>${res.length}+</h4>
    <span>Project Completed</span>
  `;

  console.log(res.length, "res");
}

// getRepos();

async function getFollowers() {
  let data = await fetch("https://api.github.com/users/siriusgurban/followers");

  let res = await data.json();
  console.log(res.length, "followers");
  heroStatClient.innerHTML = `
    <h4>${res.length}</h4>
    <span>Happy Client</span>
  `;
}

// getFollowers();

// -----------------------------------Hero-End--------------------------------------------
// -----------------------------------About-Start--------------------------------------------

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

  convertedData.map((item, index) => {
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
  convertedData = convert(data);

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


const contactInfo = document.querySelector("#contactInfo")

async function contactInfoWrite() {
  let data = await getData("info")

  console.log(data, "data");
  


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
                  </a>`
}

contactInfoWrite()

// -----------------------------------Contact-End--------------------------------------------