var socket=io()
// get detail on URL
const urlParams = new URLSearchParams(location.search);
const [key, value] = urlParams
let username = key[1]
let meetingid = value[1]
document.getElementById('meetingid').innerHTML =`Welcome To Meeting ID - ${meetingid}`
// Join Room 
socket.emit('joinRoom', { username, meetingid })
 
// Show Messages from Server
socket.on('message',user=>{
    let messageBox=document.querySelectorAll('.chat-right')[1]
    let div=document.createElement('div')
    let attr=document.createAttribute('class')
    attr.value = 'chat-box'
    div.setAttributeNode(attr)
    div.innerHTML=`
    <p class="chat-username">${user.username}</p><small class="time">${new Date().toLocaleTimeString(user.date)}</small>
        <hr class="my-0">
       <p class="chat-message">${user.message}</p>
`
    messageBox.appendChild(div)
    messageBox.scrollTop=messageBox.scrollHeight 

})
// Get Current User List 
socket.on('userList',userlist=>{
    document.querySelectorAll('.chat-right')[0].innerText=''
    let userBox = document.querySelectorAll('.chat-right')[0]
    for(user of userlist){
    let  li = document.createElement('li')
        li.innerHTML = user
        userBox.append(li)
    }
    
    
})
// Leave Chat Room
document.getElementById('leave-chat').addEventListener('click',function(){
    console.log('clicked');
    socket.disconnect()
    history.back()
})
// Get Messages from DOM
document.querySelector('.send-btn').addEventListener('click',function(){
    let message=document.getElementById('message').value
    socket.emit('sendMessage',message)
    document.querySelector('#message').value=''
    document.querySelector('#message').focus()
    
})
