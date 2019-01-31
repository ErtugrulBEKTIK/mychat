const redisClient = require('../redisClient');
function Rooms() {
  this.client = redisClient.getClient();
}

module.exports = new Rooms();

Rooms.prototype.upsert = function (roomName) {
  this.client.hset(
    'rooms',
    roomName,
    JSON.stringify({
      roomName,
      when: Date.now()
    }),
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
};

Rooms.prototype.list = function (callback) {
  const roomList = [];
  this.client.hgetall('rooms', (err, rooms) => {
    if (err) {
      console.log(err);
      return callback([]);
    }

    for (const room in rooms) {
      roomList.push(JSON.parse(rooms[room]));
    }
    return callback(roomList);
  });
};

