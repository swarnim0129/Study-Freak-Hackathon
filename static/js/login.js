// // const sign_in_btn = document.querySelector("#sign-in-btn");
// // const sign_up_btn = document.querySelector("#sign-up-btn");
// // const container = document.querySelector(".container");

// // sign_up_btn.addEventListener("click", () => {
// //   container.classList.add("sign-up-mode");
// // });

// // sign_in_btn.addEventListener("click", () => {
// //   container.classList.remove("sign-up-mode");
// // });

// //----------------------------------------------------------------------------------------------------------------------------------------------------------------
// // Open a database or create one if it doesn't exist
// const request = indexedDB.open("MyDatabase", 1);

// let db;

// request.onupgradeneeded = function (event) {
//   // Create an object store (like a table) to store your data
//   db = event.target.result;
//   const objectStore = db.createObjectStore("users", {
//     keyPath: "id",
//     autoIncrement: true,
//   });

//   // Define the structure of the data to be stored
//   objectStore.createIndex("fname", "fname", { unique: false });
//   objectStore.createIndex("uname", "uname", { unique: true });
//   objectStore.createIndex("email", "email", { unique: true });
//   objectStore.createIndex("pnum", "pnum", { unique: false });
//   //   objectStore.createIndex("gender", "gender", { unique: false });
// };

// request.onsuccess = function (event) {
//   db = event.target.result;

//   // Fetch data from the database
//   function fetchData() {
//     const transaction = db.transaction(["users"], "readonly");
//     const objectStore = transaction.objectStore("users");
//     const request = objectStore.getAll();

//     request.onsuccess = function (event) {
//       const users = event.target.result;
//       if (users.length > 0) {
//         // Do something with the fetched data
//         users.forEach(function (user) {
//           console.log("Full Name: " + user.fname);
//           console.log("Username: " + user.uname);
//           console.log("Email: " + user.email);
//           console.log("Phone Number: " + user.pnum);
//           // console.log("Gender: " + user.gender);
//           console.log("------------");
//         });
//       } else {
//         console.log("No data found in the database.");
//       }
//     };

//     request.onerror = function (event) {
//       console.error("Error fetching data from the database.");
//     };
//   }

//   const fetchButton = document.getElementById("fetch-data-button");
//   fetchButton.addEventListener("click", fetchData);
// };

function login(){
  console.log("HEllo")
  var username1 = document.getElementById('username');
  var pass = document.getElementById('pass');
  // console.log(username1, pass);
  var cartItems = localStorage.getItem('Signupitems');
  if (cartItems){
    cartItems = JSON.parse(cartItems);
    for(var i=0; i < cartItems.length; i++){
      var items = cartItems[i];
      if(items.username == username1.value && items.password == pass.value){
        alert("login successfull")
       location.replace("/home")
       
    }
    else{
      alert("Invalid username or password")
    }
  }
}
}