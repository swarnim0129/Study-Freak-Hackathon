// // b1 = document.getElementById("fy1_eng");
// // b1.addEventListener( "click",() => { document.getElementById("display_n_yr1").setAttribute("src", "/media/onlieform.pdf");});
// b1 = document.getElementById("fy1_bsc");
// b1.addEventListener( "click",display(value) => { document.getElementById("display_n_yr1").setAttribute("src", "https://drive.google.com/file/d/13Ly3UGliqpjMIK9xElIZ6A24GfYyTvTS/view");});
// b1 = document.getElementById("fy1_bms");
// b1.addEventListener( "click",() => { document.getElementById("display_n_yr1").setAttribute("src", "/media/onlieform.pdf");});
// b1 = document.getElementById("fy1_egm");
// b1.addEventListener( "click",() => { document.getElementById("display_n_yr1").setAttribute("src", "/media/onlieform.pdf");});
// b1 = document.getElementById("fy1_ami");
// b1.addEventListener( "click",() => { document.getElementById("display_n_yr1").setAttribute("src", "/media/onlieform.pdf");});
// b1 = document.getElementById("fy1_bec");
// b1.addEventListener( "click",() => { document.getElementById("display_n_yr1").setAttribute("src", "/media/onlieform.pdf");});
// b1 = document.getElementById("fy1_wpd");
// b1.addEventListener( "click",() => { document.getElementById("display_n_yr1").setAttribute("src", "/media/onlieform.pdf");});
// b1 = document.getElementById("fy1_bcc");
// b1.addEventListener( "click",() => { document.getElementById("display_n_yr1").setAttribute("src", "/media/onlieform.pdf");});
// b1 = document.getElementById("fy1_pci");
// b1.addEventListener( "click",() => { document.getElementById("display_n_yr1").setAttribute("src", "/media/onlieform.pdf");});
// b1 = document.getElementById("fy1_cph");
// b1.addEventListener( "click",() => { document.getElementById("display_n_yr1").setAttribute("src", "/media/onlieform.pdf");});

function display(value, name) {
  // console.log(value)
  if (name != undefined) {
    document.getElementById("professor").innerHTML = `Professor :- `;
    document.getElementById("professorn").innerHTML = `Name of professor`;
    document.getElementById("display_n_yr1").setAttribute("src", value);
  }
  else{
    document.getElementById("professor").innerHTML = ``;
    document.getElementById("professorn").innerHTML = ``;
    document.getElementById("display_n_yr1").setAttribute("src", value);
  }
  
}
let carticon = document.querySelector("#nav-cart");
let cart = document.querySelector(".cart");
let cartclose = document.querySelector("#close-cart");

carticon.onclick = () => {
  cart.classList.add("active");
};

cartclose.onclick = () => {
  cart.classList.remove("active");
};
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};


const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatcontainer = document.querySelector(".chat-container");

let userText = null;

const createElement =(html,className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat",className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

const showtypingdot = () => {
  const html=`  <div class="chat-content">
                <div class="chat-details">
                  <img src="./image/logomyapp.png" alt="sys-img">
                <div class="typing-animation">
                  <div class="typing-dot"style="--delay:0.2s"></div>
                  <div class="typing-dot"style="--delay:0.3s"></div>
                  <div class="typing-dot"style="--delay:0.4s"></div>
                </div>
                </div>
              </div>`
  const outgoingChatDiv = createElement(html,"incoming")
  chatcontainer.appendChild(outgoingChatDiv);
  getChatResponse();
}
const handleOutgoingChat = () => {
  userText= chatInput.value.trim();
  // console.log(userText);
  const html=`<div class="chat-content">
              <div class="chat-details">
              <img src="./image/default-profile.png" alt="user-img">
              <p>${userText}</p>
              </div>
            </div>`
  const outgoingChatDiv = createElement(html,"outgoing")
  chatcontainer.appendChild(outgoingChatDiv);
  setTimeout(showtypingdot,500);
}

sendButton.addEventListener("click",handleOutgoingChat);
const API_KEY = "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"

const getChatResponse = async () => {
  const API_URL = " https://api.openai.com/v1/completions";

  const requestOptions ={
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body:JSON.stringify(
      {
        model: "gpt-3.5-turbo",
        prompt: userText,
        max_tokens: 2048,
        temperature: 0.2,
        top_p:1,
        n:1,
        stop: null
      }
    )
  }
  try{
    const response= await(await fetch(API_URL,requestOptions)).JSON();
    console.log(response);
  }catch(err){
    console.log(err);
  }
}