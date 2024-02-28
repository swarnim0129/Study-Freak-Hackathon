let video;
let canvas;
let nameInput;

function init() {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    nameInput = document.getElementById("name");

    // Set the background color of the canvas
    canvas.style.backgroundColor = "#ffffff"; // Set to white or any desired color

    // Open webcam access
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.log("Webcam access error", error);
            alert("Cannot access webcam");
        });
}

// Function to capture photo
function capture() {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";
}

function register() {
    const name = nameInput.value;
    const photo = dataURItoBlob(canvas.toDataURL());

    if (!name || !photo) {
        alert("Name and photo required");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo, `${name}.jpg`);

    fetch("/register", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Data successfully registered");
                window.location.href = "/face";
            } else {
                alert("Sorry, registration failed");
            }
        })
        .catch(error => {
            console.log("Error", error);
        });
}

function login() {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const photo = dataURItoBlob(canvas.toDataURL());

    if (!photo) {
        alert("Photo required");
        return;
    }

    const formData = new FormData();
    formData.append("photo", photo, "login.jpg");

    fetch("/login", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                alert("Login success");
                // Redirecting to the desired page
                // window.location.href = `/success?user_name=${nameInput.value}`;
                window.location.href="/home"
            } else {
                alert("Login failed, please try again");
            }
        })
        .catch(error => {
            console.log("Error", error);
        });
}

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

init();
