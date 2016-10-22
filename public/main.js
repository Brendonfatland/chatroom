$(document).ready(function() {
  var socket = io(); // Connect to server and allow you to connect and recive messages
  var input = $('input');
  var messages = $('#messages'); // adds message to js to be manipulated.
  var userlist = $('#userlist');
  var activeUser = $("#activeUsers"); // Targets element in index.html useable to connect to server.

  var userName = prompt('What is your name?') ;

  var addMessage = function (message) {
		messages.append('<div>' + message + '</div>');
	};
  var addUser = function (user) {
		userlist.append('<div>' + user + '</div>');
	};

	var getUsers = function (users) {
		userlist.empty();
		users.forEach(function(user){
			addUser(user);
		});
	};

	socket.emit('login', userName);

  input.on('keydown', function(event) {
		if (event.keyCode != 13) {
			return;
		}

        var message = userName + ': ' + input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });

    socket.on('message', addMessage);
  	socket.on('new user', addUser);
  	socket.on('get users', getUsers);
  });






		var message = userName + ': ' + input.val();
