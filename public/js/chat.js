const socket = io()

socket.on("message", (message) => {
    console.log(message)
})
document.querySelector("#Form-message").addEventListener("submit", (event) => {
    event.preventDefault()
    var message = event.target.elements.message.value
    socket.emit("sendMessage", message)
})