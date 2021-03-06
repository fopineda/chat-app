const users = []

const addUser = ({ id, username, room }) => {
    // clean the data
    // username = username.trim().toLowerCase()
    // room = room.trim().toLowerCase()

    // validate data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username.trim().toLowerCase() === username.trim().toLowerCase()
    })

    // validate username
    if (existingUser || username.trim().toLowerCase() === "rosie") {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}


const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id == id
    })

    // remove and return user being removed
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}


const getUser = (id) => {
    // finds user and returns either the user or undefined (if not found)
    return users.find( user => user.id == id)

}

const getUsersInRoom = (room) => {
    // return list of users in parameter room
    // room = room.trim().toLowerCase()
    return users.filter(user => room == user.room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}