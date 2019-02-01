app.factory('userFactory', ['$http', 'env', ($http, env) => {
  const getUser = () => $http({
    url: `${env.SERVICE_URL}getUser`,
    method: 'GET'
  }).then(response => response.data, (err) => {
    console.error(err);
  });

  return {
    getUser
  };
}]);
