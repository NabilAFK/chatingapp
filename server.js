const express = require('express');
const app=express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let { addUsers, getUser, displayMessage, userList, removeUser}=require('./user')
app.use(express.static(__dirname+"/public"))


io.on('connection', (socket) => {
    // Current User
    socket.on('joinRoom', currentUser => {
        addUsers(socket.id,currentUser.username,currentUser.meetingid)
        socket.join(currentUser.meetingid)
        socket.emit('message', displayMessage('Boot','Welcome To Chatting World'))
        
        socket.broadcast.to(currentUser.meetingid).emit('message', displayMessage('Boot', `${currentUser.username} Has Join The Chat`))
        
        // Show All Active User
        io.to(currentUser.meetingid).emit('userList', userList(currentUser.meetingid))

        // Disconnected User
        socket.on('disconnect', () => {
            let user = getUser(socket.id)
            removeUser(socket.id)
            // Show All Active User
            io.to(currentUser.meetingid).emit('userList', userList(currentUser.meetingid))
            io.emit('message', displayMessage('Boot', `${user.username} has left the chat room`))
        })
    })
    // Message send 
    socket.on('sendMessage',message=>{
        let user = getUser(socket.id)
        io.to(user.meetingid).emit('message', displayMessage(user.username, message))
    })

    
});

app.get('/main',function(req,res){
    res.sendFile(__dirname+"/public/main.html")
})


server.listen(3000,()=>{
    console.log(`Server run on port : 3000`);
});