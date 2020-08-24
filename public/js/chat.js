const socket = io()
socket.on("countUpdated", (count) => {
    console.log("Count is updated", count)
})

document.querySelector("#increment").addEventListener("click", () => {
    console.log("Clicked")
    socket.emit("Increment")
})