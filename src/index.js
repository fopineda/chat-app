const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

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
io.on('connect', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', ({ username, room }, callback) => {
        // create user object with passed in arguments, either return error or user
        const { error, user } = addUser({ id: socket.id, username, room })

        // if error exists then pass it onto the callback
        if (error) {
            return callback(error)
        }

        // allows to join a room
        socket.join(user.room)
        // Server emitting message event
        socket.emit('message', generateMessage('Robot', `Welcome ${user.username}!`))
        // Server emitting message to everyone in a particular room except that single socket (new user) 
        socket.broadcast.to(user.room).emit('message', generateMessage('Robot', `${user.username} has entered the chat...`))

        // Server emitting room data (everyone in room)
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        // successful join so call the callback()
        callback()
    })


    // Server receiving broadcast message event
    socket.on('sendMessage', (broadcastMessage, callback) => {
        // get user by their socket id
        const user = getUser(socket.id)

        // checks if profanity is used in broadcast message
        const filter = new Filter()
        if (filter.isProfane(broadcastMessage)){
            return callback('Profanity is not allowed...')
        }
        // Server emitting broadcast message event as message event (everyone in room)
        io.to(user.room).emit('message', generateMessage(user.username, broadcastMessage))
        callback()
    })

    // Server receiving location event
    socket.on('sendLocation', (coords, callback) => {
        // get user by their socket id
        const user = getUser(socket.id)


        // Server emitting location message event (everyone in room)
        io.to(user.room).emit('locationMessage', generateMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    // Event for when get socket get disconnected
    socket.on('disconnect', () => {
        // removing user by their socket id
        const user = removeUser(socket.id)

        // if there was a user, then emit message event to everyone in that room only
        if (user) {
            // Server emitting message event (everyone in room)
            io.to(user.room).emit('message', generateMessage('Robot', `${user.username} has left the chat...`))
            // Server emitting room data (everyone in room)
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }        
    })


})





server.listen(port, () => {
    console.log('Server has successfully started on port: '+ port)
})