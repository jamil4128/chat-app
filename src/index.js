const path = require("path")
const http = require("http")
const express = require("express")
const socketio = require("socket.io")
const Filter = require("bad-words")
const { generateMessage, generateUrl } = require("./utils/message")
const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/user")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectorypath = path.join(__dirname, "../public")

app.use(express.static(publicDirectorypath))

io.on("connection", (socket) => {
    console.log("New website connection")


    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage("Admin", 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage("Admin", `${user.username} has joined!`))
        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id)
        if (user) {
            const filter = new Filter()
            if (filter.isProfane(message)) {
                return callback("Profinity is not allowed")
            }
            io.to(user.room).emit("message", generateMessage(user.username, message))
            callback()
        }

    })
    socket.on("disconnect", () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit("message", generateMessage("Admin", `${user.username} has left the chat`))
            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }


    })
    socket.on("sendLocation", (position, callback) => {
        const user = getUser(socket.id)
        if (user) {
            io.to(user.room).emit("locationMessage", generateUrl(user.username, `https://www.google.com/maps?q=${position.lat},${position.long}`))
            callback()
        }
    })


})
server.listen(port, () => `Server running on port ${port} 🔥`);