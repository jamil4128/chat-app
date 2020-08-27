const path = require("path")
const http = require("http")
const express = require("express")
const socketio = require("socket.io")
const Filter = require("bad-words")

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

    socket.on("sendMessage", (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback("Profinity is not allowed")
        }
        io.emit("message", message)
        callback()

    })
    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat")
    })
    socket.on("sendLocation", (position, callback) => {
        io.emit("locationMessage", `https://www.google.com/maps?q=${position.lat},${position.long}`)
        callback()
    })






})
server.listen(port, () => `Server running on port ${port} 🔥`);