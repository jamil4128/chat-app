const socket = io()

socket.on("message", (message) => {
    console.log(message)
})

document.querySelector("#Form-message").addEventListener("submit", (event) => {
    event.preventDefault()
    var message = event.target.elements.message.value
    socket.emit("sendMessage", message, (error) => {
        if (error) {
            return console.log((error))
        }
        console.log("Message deleivered")
    })
})

document.querySelector("#send-location").addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Location is not supported by your browser")
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("sendLocation", {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, () => {
            console.log("Location shared!")
        })

    })
})