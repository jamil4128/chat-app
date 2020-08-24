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

io.on("connection", () => {
    console.log("New website connection")
})
server.listen(port, () => `Server running on port ${port} 🔥`);