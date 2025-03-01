// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, getDocs, doc,addDoc  ,collection,deleteDoc,getDoc,updateDoc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
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
let container = document.querySelector("#container")

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;

   // to empty input filed function

    function toEmptyinputFiled(){
       title = document.querySelector("#title").value = '';
       description = document.querySelector("#description").value = '';
   };
       // to add data from user click 
    try {
        const docRef = await addDoc(collection(db, "users"), {
         title:title,
         description:description
        });
        // console.log("Document written with ID: ", docRef.id);
      
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      renderData()
      container.innerHTML = `<p>Data Added Suceessfully</p>`
       toEmptyinputFiled()
  });



  // render data on screen 

 async function renderData(){
   
    try {


     const docRef = await getDocs(collection(db,'users'));

      let html = ""
      let table = document.querySelector("table");

     docRef.forEach(element => {
         const userData = element.data();
         const docid = element.id; // jese he data database sa aye ga os ke aik id hoge jise docId kha ta hi
        //  console.log(globalArray);
          html+= `
          <tr>
          <td>${userData.title}</td>
          <td>${userData.description}</td>
           <td> <button id="delbtn" onclick="deletMethod('${docid}')">Delete</button></td>
           <td> <button id="delbtn" onclick="UpdatedtMethod('${docid}')">UPDate</button></td>
           </tr>
       `
     });
   
     table.innerHTML = html
      
    } catch (error) {
        console.log(error)
    }
     
     
}

// delet data 
window.deletMethod = async function(docid){
  container.innerHTML = ''

  const docRef = doc(db,'users',docid);
  await deleteDoc(docRef)
  renderData()
  container.innerHTML = `<p>Data Delet Suceessfully.</p>`

}

// updated data from form 
window.UpdatedtMethod =  async function(id){
   try {
    const docRef = await  getDoc(doc(db,'users',id))
    const currentUser = docRef.data();

    console.log(currentUser) // object is return from db is obj ma title or desction hai ;

      document.querySelector("#title").value = currentUser.title;
      document.querySelector("#description").value =currentUser.description;

      let sumbitbtn = document.querySelector('.sumbit');
       let btn = document.querySelector(".updatedbtn");

       btn.classList.add('show');
      sumbitbtn.classList.add('hide');

      btn.addEventListener('click', async()=>{
          const newtilte = document.querySelector("#title").value;
          const newdescription = document.querySelector("#description").value;

          if(newtilte !== null && newdescription !== null){
              await updateDoc(doc(db,'users',id),{
                   title:newtilte,
                   description:newdescription
              });
              
              renderData()
      container.innerHTML = ` <p>Data Updated  Suceessfully/<p>`

              sumbitbtn.classList.remove('hide');
              btn.classList.remove('show');

          }
          
      })

   } catch (error) {
     console.log(error)
   }
}


renderData()
