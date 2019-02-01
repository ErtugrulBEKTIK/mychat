app.controller('chatController', ['$scope', 'chatFactory', 'userFactory', ($scope, chatFactory, userFactory) => {
  // initialization

  function init() {
    userFactory.getUser().then((user) => {
      $scope.user = user;
      console.log(user);
    });
  }
  init();

  // Angular variables

  $scope.onlineList = [];
  $scope.roomList = [];
  $scope.activeTab = 1;
  $scope.chatClicked = false;
  $scope.loadingMessages = false;
  $scope.chatName = '';
  $scope.roomId = '';
  $scope.message = '';
  $scope.messages = [];
  $scope.user = {};

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

  socket.on('receiveMessage', (data) => {
    $scope.messages.push({
      userId: data.userId,
      username: data.username,
      message: data.message,
    });
  });

  // Angular methods

  $scope.switchRoom = (room) => {
    $scope.chatName = room.name;
    $scope.roomId = room.id;
    $scope.chatClicked = true;
    $scope.loadingMessages = true;

    chatFactory.getMessages(room.id).then((data) => {
      $scope.messages = data;
      $scope.loadingMessages = false;
    });
  };

  $scope.newMessage = () => {
    if ($scope.message.trim() !== '') {
      socket.emit('newMessage', {
        message: $scope.message,
        roomId: $scope.roomId,
      });

      $scope.messages.push({
        userId: $scope.user._id,
        username: `${$scope.user.name} ${$scope.user.surname}`,
        message: $scope.message,
      });

      $scope.message = '';
    }
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
