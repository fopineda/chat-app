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

let count = 0

// Server listening for an event from the client (auto done)
// event for when socket gets new connection
io.on('connect', (socket) =>{
    console.log('New WebSocket connection')

    // Server emitting an event for the Client to listen
    socket.emit('countUpdated', count)

    // Server listening for an event from the client
    socket.on('increment', () => {
        count++
        // emits to that single connection
        // socket.emit('countUpdated', count)
        // emits to all connection
        io.emit('countUpdated', count)
    })
})

server.listen(port, () => {
    console.log('Server has successfully started on port: '+ port)
})