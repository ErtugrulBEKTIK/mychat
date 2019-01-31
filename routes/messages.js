const express = require('express');
const router = express.Router();

// Libs
const Messages = require('../src/lib/Messages');

router.get('/list', (req, res) => {
  Messages.list(req.query.roomId, (messages) => {
    res.json(messages);
  });
});

module.exports = router;
