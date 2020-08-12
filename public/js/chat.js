const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $locationButton = document.querySelector('#send-location')



// Client receiving message event
socket.on('message', (welcomeMessage) =>{
    console.log(welcomeMessage)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled', 'disabled')
    const broadcastMessage = e.target.elements.message.value
    // Client emits broadcast message event
    socket.emit('sendMessage', broadcastMessage, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
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
    $locationButton.setAttribute('disabled', 'disabled')
    // Client emitting location event
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation',  {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared!')
            $locationButton.removeAttribute('disabled')
        })
    })
})