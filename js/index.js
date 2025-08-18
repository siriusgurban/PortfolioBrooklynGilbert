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

import { getData } from "./handlers.js";

const heroLeftContent = document.querySelector(".heroLeftContent");

async function heroInner() {
  const data = await getData("hero");
  console.log(data, "Data");

  heroLeftContent.innerHTML = `
         <h1 class="heroTitle">${data.title}</h1>
            <p class="heroDesc">${data.text}</p>
`;
}

heroInner();

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
