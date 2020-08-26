const path = require("path")
const http = require("http")
const express = require("express")
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectorypath = path.join(__dirname, "../public")

app.use(express.static(publicDirectorypath))

io.on("connection", (socket) => {
    console.log("New website connection")

    socket.emit("message", "Welcome!")
    socket.broadcast.emit("message", "A new user has joined")

    socket.on("sendMessage", (message) => {
        io.emit("message", message)
    })
    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat")
    })





})
server.listen(port, () => `Server running on port ${port} 🔥`);