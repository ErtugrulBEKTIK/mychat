app.controller('chatController', ['$scope', 'chatFactory', ($scope, chatFactory) => {
  $scope.onlineList = [];
  $scope.roomList = [];
  $scope.activeTab = 1;
  $scope.chatClicked = false;
  $scope.chatName = '';
  $scope.roomId = '';
  $scope.message = '';
  $scope.messages = [];

  // Socket.io event handling.

  const socket = io.connect('http://localhost:3000');
  socket.on('onlineList', (users) => {
    $scope.onlineList = users;
    $scope.$apply();
  });

  socket.on('roomList', (rooms) => {
    $scope.roomList = rooms;
    $scope.$apply();
  });

  // Angular methods

  $scope.switchRoom = (room) => {
    $scope.chatName = room.name;
    $scope.roomId = room.id;
    $scope.chatClicked = true;

    chatFactory.getMessages(room.id).then((data) => {
      console.log(data);
      $scope.messages = data;
    });
  };

  $scope.newMessage = () => {
    socket.emit('newMessage', {
      message: $scope.message,
      roomId: $scope.roomId,
    });
    $scope.message = '';
  };

  $scope.newRoom = () => {
    // let randomName = Math.random().toString(36).substring(7);

    const roomName = window.prompt('Enter room name');
    if (roomName !== '' && roomName !== null) {
      socket.emit('newRoom', roomName);
    }
  };

  $scope.changeTab = (tab) => {
    $scope.activeTab = tab;
  };
}]);
