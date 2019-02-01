const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if (!req.user) {
    res.render('index', { title: 'Express' });
  } else {
    res.redirect('/chat');
  }
});

router.get('/getUser', (req, res) => {
  res.json(req.user);
});

module.exports = router;
