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

    // socket.emit("countUpdated", count)

    // socket.on("Increment", () => {
    //     count++
    //     io.emit("countUpdated", count)
    // })

    socket.emit("message", "Welcome!")
    socket.on("sendMessage", (message) => {
        io.emit("message", message)
    })



})
server.listen(port, () => `Server running on port ${port} 🔥`);