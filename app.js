// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, getDocs, doc,addDoc  ,collection } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
// Ensure you're using "firebase-firestore.js" for Firestore functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXYM-7HGOsL7quY45U6Sdg7YFz3QiMya4",
  authDomain: "smit-todo-70cc9.firebaseapp.com",
  projectId: "smit-todo-70cc9",
  storageBucket: "smit-todo-70cc9.appspot.com", // Corrected the storage bucket URL
  messagingSenderId: "73542219569",
  appId: "1:73542219569:web:d08488d443afcbb09d2210"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// console.log(db);

const form = document.getElementById('userForm');
let globalArray =[]

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;


    function toEmptyinputFiled(){
       title = document.querySelector("#title").value = '';
       description = document.querySelector("#description").value = '';
   }
    // console.log("Title:", title);
    // console.log("Description:", description);
    // alert("Form Submitted Successfully!");

    try {
        const docRef = await addDoc(collection(db, "users"), {
         title:title,
         description:description
        });
        console.log("Document written with ID: ", docRef.id);
      
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      renderData()
       toEmptyinputFiled()
  });

 async function renderData(){
   
    try {
     const docRef = await getDocs(collection(db,'users'));

      let html = ""
      let table = document.querySelector("table");
      globalArray.length = 0;
     docRef.forEach(element => {
        //  console.log(element.data());

         const userData = element.data();
         globalArray.push(userData);
        //  console.log(globalArray);
     });
     globalArray.forEach((res)=>{
      html+= `
      
      <tr>
      <td>${res.title}</td>
      <td>${res.description}</td>
       </tr>
   `
     })
     table.innerHTML = html
      
    } catch (error) {
        console.log(error)
    }
     
     
}

renderData()