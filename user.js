let Users = []
function addUsers(id, username, meetingid) {
    let user = { id, username, meetingid }
    Users.push(user)
    return user
}
function getUser(id) {
    return Users.find(user => user.id === id)
}

function userList(meetingid){
    return Users.filter(user => user.meetingid===meetingid).map(user=>user.username)
}
function displayMessage(username, message) {
    let date = Date.now()
    return { username, message, date }
}
function removeUser(id){
    let removeIndex = Users.findIndex(user => user.id === id)
    Users.splice(removeIndex, 1)
}

module.exports = { addUsers, getUser, displayMessage, userList, removeUser}