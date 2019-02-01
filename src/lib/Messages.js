const shortid = require('shortid');
const _ = require('lodash');
const redisClient = require('../redisClient');
function Messages() {
  this.client = redisClient.getClient();
}

module.exports = new Messages();

Messages.prototype.upsert = function ({ roomId, message, username, userId }) {
  this.client.hset(
    `messages:${roomId}`,
    shortid.generate(),
    JSON.stringify({
      username,
      userId,
      message,
      when: Date.now()
    }),
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
};


Messages.prototype.list = function (roomId, callback) {
  const messageList = [];
  this.client.hgetall(`messages:${roomId}`, (err, messages) => {
    if (err) {
      console.log(err);
      return callback([]);
    }

    for (const message in messages) {
      messageList.push(JSON.parse(messages[message]));
    }
    return callback(_.orderBy(messageList, 'when', 'asc'));
  });
};

