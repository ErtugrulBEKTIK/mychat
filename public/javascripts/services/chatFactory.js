app.factory('chatFactory', ['$http', 'env', ($http, env) => {
  const getMessages = (roomId) => $http({
      url: `${env.SERVICE_URL}messages/list`,
      method: 'GET',
      params: {
        roomId
      }
    }).then(response => response.data, (err) => {
      console.error(err);
  });

  return {
    getMessages
  };
}]);
