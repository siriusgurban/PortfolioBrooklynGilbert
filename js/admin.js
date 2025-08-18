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

import { getData, setData } from "./handlers.js";

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
  const heroRef = ref(db, col);
  push(heroRef, object);

  console.log("worked");
}

function convert(data) {
  let obj = Object.entries(data);
  let ArrData = obj.map((i) => {
    return [
      {
        id: i[0],
        ...i[1],
      },
    ];
  });
  return ArrData.flat();
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
