const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

// configure web server and socket
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000 


// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup static directory to serve (html, css, images, js)
app.use(express.static(publicDirectoryPath))


// Event for when socket gets new connection
io.on('connect', (socket) =>{
    console.log('New WebSocket connection')

    // Server emitting message event
    let welcomeMessage = "Welcome!"
    socket.emit('message', welcomeMessage)
    // Server emitting message to everyone except that single socket (new user)
    socket.broadcast.emit('message', 'New user has joined chat...')

    // Server receiving broadcast message event
    socket.on('sendMessage', (broadcastMessage) => {
        // Server emitting broadcast message event as message event (everyone)
        io.emit('message', broadcastMessage)
    })

    // Event for when get socket get disconnected
    socket.on('disconnect', () => {
        io.emit('message', 'User has left chat...')
    })
})

server.listen(port, () => {
    console.log('Server has successfully started on port: '+ port)
})