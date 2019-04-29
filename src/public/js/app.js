var socket = io();

socket.emit('join' , {username: 'username', room: 'room1'})

socket.on('connect', function () {
    console.log('Sucesfully connected to socket.io server');
});

socket.on('updateUsers', (users) => {
    var ol = $('<ol></ol>');
    users.forEach(function (user){
      ol.append(jQuery('<li></li>').text(user.username));
    });
    jQuery('#users').html(ol);
});

socket.on('newMessage', (message) => {
    var ol = $('#messages');
    ol.append(jQuery('<li></li>').text(message.user + ': ' + message.text));
});

// Send new message to server
$('#btn-send').click(function() {
    var inputMessage = $('#message');

    socket.emit('createMessage', {
        text: inputMessage.val()
    }, function() {
        inputMessage.val('');
    });
});
