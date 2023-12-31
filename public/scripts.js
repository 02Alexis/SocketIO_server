const socket = io()

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function() {
    socket.emit('use:message', {
        message: message.value,
        username: username.value
    });
});

message.addEventListener('keypress', function() {
    socket.emit('use:typing', username.value);
});

socket.on('use:message', function(data){
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('use:typing', function(data){
    actions.innerHTML = `<p>
    <em>${data} is typing a message</em>
    </p>`
});