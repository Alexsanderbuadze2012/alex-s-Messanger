const express = require("express");
const path = require("path");
const https = require("https");
const {Server} = require("socket.io");
const fs = require("fs-extra");
const app = express();
const server = https.createServer({
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
  minVersion: "TLSv1.2"
}, app);
const io = new Server(server);
const PORT = 3000;

let messages = [];
const messagesFile = path.join(__dirname, "messages.json");
if (fs.existsSync(messagesFile)) {
  messages = fs.readJsonSync(messagesFile);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) =>{
    console.log("A user connected");

    socket.emit("load messages", messages);

    // Listen for a new message from a client
    socket.on("new message", (msg) => {
        if (msg && msg.trim() !== "") {
            messages.push(msg);
            fs.writeJsonSync(messagesFile, messages);
            io.emit("message added", msg); // Send to all clients
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(PORT, () =>{
    console.log("Server listening on port:" + PORT);
});