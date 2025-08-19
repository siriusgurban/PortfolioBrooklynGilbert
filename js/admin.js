"use strict";

import { firebaseConfig } from "./firebase.js";

// Import the functions you need from the SDKs you need
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

import { getData, setData, convert } from "./handlers.js";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let porte = {
  hero: {
    title: "Hello, I’m Brooklyn Gilbert",
    text: "I'm a Freelance UI/UX Designer and Developer based in London, England. I strives to build immersive and beautiful web applications through carefully crafted code and user-centric design.",
    experience: 2019,
    projects: 100,
    clients: 58,
  },
  about: {
    title: "I am Professional User Experience Designer",
    textTwo:
      "I design and develop services for customers specializing creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences. ",
    textTwo:
      "I design and develop services for customers specializing creating stylish, modern websites, web services.",
  },
  process: {
    title: "Work Process",
    textOne:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu, varius eget velit non, laoreet imperdiet orci. Mauris ultrices eget lorem ac vestibulum. Suspendis imperdiet,",
    textTwo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu, varius eget velit non.",
    process_card: [
      {
        title: "1. Research",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu.",
      },
      {
        title: "2. Analyze",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu.",
      },
      {
        title: "3. Design",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu.",
      },
      {
        title: "4. Launch",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu.",
      },
    ],
  },
};

// -----------------------------------Toasty-Start--------------------------------------------

const toastLiveExample = document.getElementById("liveToast");
const liveToastError = document.getElementById("liveToastError");

// -----------------------------------Toasty-Start--------------------------------------------
// -----------------------------------Hero-Start--------------------------------------------
const heroInput = document.querySelector("#heroInput");
const heroTextarea = document.querySelector("#heroTextarea");
const heroSubmit = document.querySelector("#heroSubmit");

heroSubmit.addEventListener("click", async (e) => {
  e.preventDefault();

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

function addData(col, object) {
  const dataRef = ref(db, col);
  push(dataRef, object);

  console.log("worked");
}

async function heroInner() {
  const data = await getData("hero");

  console.log(data, "data");

  heroInput.value = data?.title;
  heroTextarea.value = data?.text;
}
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
  aboutInput.value = data?.title;
  aboutTextareaOne.value = data?.textOne;
  aboutTextareaTwo.value = data?.textTwo;
}
aboutWrite();

// -----------------------------------About-End--------------------------------------------
// -----------------------------------Process-Start--------------------------------------------

const processInput = document.querySelector("#processInput");
const processTextareaOne = document.querySelector("#processTextareaOne");
const processTextareaTwo = document.querySelector("#processTextareaTwo");
const processSubmit = document.querySelector("#processSubmit");
const processCardImage = document.querySelector("#processCardImage");
const processCardInput = document.querySelector("#processCardInput");
const processCardTextarea = document.querySelector("#processCardTextarea");
const processCardImage1 = document.querySelector("#processCardImage1");
const processCardInput1 = document.querySelector("#processCardInput1");
const processCardTextarea1 = document.querySelector("#processCardTextarea1");
const processCard = document.querySelector("#processCard");
const deleteCardBtn = document.querySelector("#deleteCardBtn");

const processEditBtn = document.querySelector("#processEditBtn");

processSubmit.addEventListener("click", async (e) => {
  e.preventDefault();

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

  let objRight = {
    img: processCardImage1.value
      ? processCardImage1.value
      : "./assets/image/process/notes.png",
    title: processCardInput1.value,
    text: processCardTextarea1.value,
  };

  console.log(objRight, "objRight");

  try {
    if (
      processCardInput1.value.trim().length === 0 &&
      processCardTextarea1.value.trim().length === 0
    ) {
      return bootstrap.Toast.getOrCreateInstance(liveToastError).show();
    }
    addData("process/" + "right", objRight);
    await processWrite();
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
  } catch (error) {
    console.log(error);
  }
});

async function processWrite() {
  const dataLeft = await getData("process/" + "left");
  processInput.value = dataLeft?.title;
  processTextareaOne.value = dataLeft?.textOne;
  processTextareaTwo.value = dataLeft?.textTwo;

  const dataRight = await getData("process/right");

  let data = convert(dataRight);
  console.log(data, "data");
  processCard.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem";
    card.id = item.id;

    card.innerHTML = `
    <div>
      <img src="${item.img ? item.img : "../image/process/notes.png"}" width="50" height="50" class="mx-auto" />

      <button class="btn btn-danger delete-btn">Delete</button>
    </div>
    <div class="card-body">
      <input type="text" class="form-control processCardInput" value="${item.title}" />
      <textarea class="form-control processCardTextarea">${item.text}</textarea>
    </div>
  `;

    card
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteCard(item.id));
    processCard.appendChild(card);
  });
}

async function deleteCard(id) {
  await remove(ref(db, "process/right/" + id));
  processWrite();
}

// function inputProcessDisable() {
//   const processFormInput = document.querySelectorAll("input");
//   const processFormText = document.querySelectorAll("textarea");

//   processFormInput.forEach((item) => {
//     item.disabled ? (item.disabled = true) : (item.disabled = false);
//   });
//   processFormText.forEach((item) => {
//     item.disabled ? (item.disabled = true) : (item.disabled = false);
//   });
// }

// processEditBtn.addEventListener("click", () => {
//   inputProcessDisable();
// });

processWrite();

// -----------------------------------Process-End--------------------------------------------
