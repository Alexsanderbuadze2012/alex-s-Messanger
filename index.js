const express = require("express");
const path = require("path");
const http = require("http");
const {Server} = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

const messages = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) =>{
    console.log("A user connected");

    socket.emit("load messages", messages);

    // Listen for a new message from a client
    socket.on("new message", (msg) => {
        if (msg && msg.trim() !== "") {
            messages.push(msg);
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