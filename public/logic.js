const listView = document.getElementById("listView");
const msgBox = document.getElementById("msgBox");
const socket = io();

window.onload = async function(){
  socket.on("load messages", (savedMessages) =>{
    listView.innerText = "";
    savedMessages.forEach(msg => {
        const li = document.createElement("li");
        li.textContent = msg;
        listView.appendChild(li);
    });
  });

  socket.on("message added", (msg) =>{
    const li = document.createElement("li");
    li.textContent = msg;
    listView.appendChild(li);
  });
};

async function send(e){
  e.preventDefault();
  const msg = msgBox.value.trim();
  if(msg === ""){
    alert("Empty Message");
    return;
  }
  socket.emit("new message", msg);
  msgBox.value = "";
}