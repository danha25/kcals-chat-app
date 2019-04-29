var socket = io();
var username;
var selectedUser = undefined;

socket.on('connect', function () {
    console.log('Sucesfully connected to socket.io server');
    username = $.urlParam('username');
    const room = $.urlParam('room');
    socket.emit('login', { username, room });
});

socket.on('updateChannels', (channels) => {
    console.log(channels);
    var ul = $('#channels').empty();
    channels.forEach(function (channel) {
        ul.append($('<li></li>').text(channel));
    });
});

socket.on('updateUsers', (users) => {
    var ul = $('#users').empty();
    users.forEach(function (user) {
        ul.append(
            jQuery('<li></li>')
                .attr('id', user.username)
                .text(user.username)
                .click(function() {
                    removeHighlight('users');
                    $(this).addClass('my-highlight');

                    selectedUser = user.username;
                    socket.emit('fetchDirectMessages', user.username, function(messages) {
                        updateMessages(messages);
                    });
                })
        );
    });
});

socket.on('newMessage', (message) => {
    if(selectedUser == message.from || username == message.from) {
        var ol = $('#messages');
        ol.append(jQuery('<li></li>').text(message.from + ': ' + message.text));
    } else {
        $(`#${message.from}`).append('*');
    }
   
});

// Send new message to server
$('#btn-send').click(function () {
    var inputMessage = $('#message');

    if(selectedUser) {
        socket.emit('createDirectMessage', {
            to: selectedUser,
            text: inputMessage.val()
        }, function () {
            inputMessage.val('');
        });
    } else {
        socket.emit('createMessage', {
            text: inputMessage.val()
        }, function () {
            inputMessage.val('');
        });
    }
});

function updateMessages(messages) {
    var ul = $('#messages').empty();
    messages.forEach(function (message) {
        ul.append(jQuery('<li></li>').text(`${message.from}: ${message.text}`));
    });
}

function removeHighlight(listId) {
    const listItems = $(`#${listId} li`);
    listItems.each(function(index, li) {
        $(li).removeClass('my-highlight');
    })
}