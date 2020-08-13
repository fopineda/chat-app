const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $locationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')


// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options (for URL query string)
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true }) 

// Client receiving message event
socket.on('message', (message) =>{
    console.log(message) // TODO: Remove
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:m a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

// Client receiving location message event
socket.on('locationMessage', (message) => {
    console.log(message) // TODO: Remove
    const html = Mustache.render(locationMessageTemplate, {
        username: message.username,
        url: message.text,
        createdAt:moment(message.createdAt).format('h:m a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html

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

// Client emitting join event
socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        // Global location to send to home page
        location.href = '/'
    }
})