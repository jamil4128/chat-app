const socket = io()
//elements
const $messageForm = document.querySelector("#Form-message")
const $messageFormInput = $messageForm.querySelector("input")
const $messageFormButton = $messageForm.querySelector("button")
const $sendLocationButton = document.querySelector("#send-location")
const $messages = document.querySelector("#messages")


//templates
const messageTemplate = document.querySelector("#message-template").innerHTML
const urlTemplate = document.querySelector("#url-template").innerHTML
socket.on("message", (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format("h:mm:ss a")
    })

    $messages.insertAdjacentHTML("beforeend", html)
})

socket.on("locationMessage", (message) => {
    console.log(message)
    const html = Mustache.render(urlTemplate, {
        url: message.text,
        createdAt: moment(message.createdAt).format("h:mm:ss a")
    })
    $messages.insertAdjacentHTML("beforeend", html)

})

$messageForm.addEventListener("submit", (event) => {
    event.preventDefault()

    $messageFormButton.setAttribute("disabled", "disabled")

    var message = event.target.elements.message.value

    socket.emit("sendMessage", message, (error) => {
        $messageFormButton.removeAttribute("disabled")
        $messageFormInput.value = ""
        $messageFormInput.focus()

        if (error) {
            return console.log((error))
        }
        console.log("Message deleivered")
    })
})

$sendLocationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Location is not supported by your browser")
    }
    $sendLocationButton.setAttribute("disabled", "disabled")
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("sendLocation", {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute("disabled")
            console.log("Location shared!")
        })

    })
})

