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

// };

// request.onsuccess = function (event) {
//   db = event.target.result;

//   // Handle form submission and store data in the database
//   function done() {
//     const fname = document.getElementById("fname").value;
//     const uname = document.getElementById("uname").value;
//     const email = document.getElementById("email").value;
//     const pnum = document.getElementById("pnum").value;

//     // console.log("Full Name: " + fname);
//     // console.log("Username: " + uname);
//     // console.log("Email: " + email);
//     // console.log("Phone Number: " + pnum);

//     // Create a transaction and specify which object store to use
//     const transaction = db.transaction(["users"], "readwrite");
//     const objectStore = transaction.objectStore("users");

//     // Create an object to represent the new user data
//     const newUser = {
//       fname: fname,
//       uname: uname,
//       email: email,
//       pnum: pnum,
//     };

//     // Add the user data to the object store
//     const request = objectStore.add(newUser);

//     request.onsuccess = function (event) {
//       console.log("Data added to the database successfully.");
//       // You can add additional logic here, such as clearing the form.
//     };

//     request.onerror = function (event) {
//       console.error("Error adding data to the database.");
//     };
//   }
//   b1 = document.getElementById("submit");
//   b1.addEventListener("click", done);
// };
function verify(){
  var uname = document.getElementById("uname");
  var pass = document.getElementById("pass");
  var email1=document.getElementById("email1");
  var cartItems =  [];
  var item = {
    username : uname.value,
    password : pass.value,
    email : email1.value,
  };
  cartItems.push(item);
  console.log(cartItems);
  localStorage.setItem('Signupitems', JSON.stringify(cartItems));
  location.replace("/loginpage");
  }