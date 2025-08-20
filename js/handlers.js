import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
import { ref, get, set, push   } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function getData(col) {
  try {
    const dataRef = ref(db, col);
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}


export function setData(col, obj) {
  const dataRef = ref(db, col);
  set(dataRef, obj);
}

export function addData(col, object) {
  const dataRef = ref(db, col);
  push(dataRef, object);
}


export function convert(data) {
  if (!data) {
    return [];
  }

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