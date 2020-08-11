const socket = io()

// Client receiving message event
socket.on('message', (welcomeMessage) =>{
    console.log(welcomeMessage)
})

const broadcastForm = document.querySelector('#message-form')
broadcastForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const broadcastMessage = e.target.elements.message.value
    // Client emits broadcast message event
    socket.emit('sendMessage', broadcastMessage)
})