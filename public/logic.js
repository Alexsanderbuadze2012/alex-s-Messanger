window.onload = async function() {
  const listView = document.getElementById("listView");

  const res = await fetch("/messages"); // Fetch all saved messages
  const savedMessages = await res.json();

  savedMessages.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = msg;
    li.style.fontSize = "40px";
    li.style.color = "white";
    listView.appendChild(li);
  });
};

async function send(e){
    e.preventDefault();
    const msgBox = document.getElementById("Msg").value;
    const listView = document.getElementById("listView");
    const res = await fetch("/check",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({message : msgBox})
    });

    const message = await res.text();

  const li = document.createElement("li");
  li.textContent = message;
  li.style.fontSize = "40px";
  li.style.color = "white";

  // ✅ Append to listView
  listView.appendChild(li);
}