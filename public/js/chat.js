const socket = io()

// Client listening for an event from the server
socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count)
})

document.querySelector('#increment').addEventListener('click', () =>{
    console.log('click')
    
    // Client emitting an event for the server to listen
    // every time a client clicks it emits an event
    socket.emit('increment')
})