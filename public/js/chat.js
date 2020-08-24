const socket = io()
// socket.on("countUpdated", (count) => {
//     console.log("Count is updated", count)
// })

// document.querySelector("#increment").addEventListener("click", () => {
//     console.log("Clicked")
//     socket.emit("Increment")
// })

socket.on("message", (message) => {
    console.log(message)
})
document.querySelector("#Form-message").addEventListener("submit", (event) => {
    event.preventDefault()
    var message = event.target.elements.message.value
    socket.emit("sendMessage", message)
})