var express = require('express');
var router = express.Router();

//Defind any sub-router of our API
//Users
var usersRouter = require("./users");
router.use("/users", usersRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
