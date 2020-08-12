const socket = io()

// Client receiving message event
socket.on('message', (welcomeMessage) =>{
    console.log(welcomeMessage)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const broadcastMessage = e.target.elements.message.value
    // Client emits broadcast message event
    socket.emit('sendMessage', broadcastMessage, (error) => {
        if (error){
            return console.log(error)
        }
        console.log('Delivered!')
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser...')
    }
    // Client emitting location event
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation',  {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared!')
        })
    })
})