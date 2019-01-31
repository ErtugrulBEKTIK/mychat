const app = angular.module('my-chat', []);

app.value('env', {
  SERVICE_URL: 'http://localhost:3000/'
});
