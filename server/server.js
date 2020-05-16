const http = require("http");
const express = require("express");
const socketio = require("socket.io")

const app = express();

const clientPath = `${__dirname}/../client`;
console.log("serving static files from: ", clientPath)

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let players = null;

io.on("connection", (sock) => {
    sock.emit("chat", "hello from the server");

    sock.on("chat", (msg) => {
        io.emit("chat", msg);
    })
});

server.on("error", (err) => {
    console.log("Server error: ", err);
});

server.listen(8080, () => {
    console.log("new http connection");
});