const users = []

//addUser

const addUser = ({ id, username, room }) => {
    //trim the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate the data

    if (!username || !room) {
        return {
            error: "username or room is not defined"
        }
    }

    //check data

    const exists = users.find((user) => user.username === username && user.room === room)
    if (exists) {
        return {
            error: "username already in use"
        }
    }

    //add user to Users
    const user = { id, username, room }
    users.push(user)
    return { user }
}

// RemoveUser

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}


//getUser
const getUser = (id) => {
    return users.find((user) => user.id === id)
}

//getUsersInRoom

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

//export this function

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}

