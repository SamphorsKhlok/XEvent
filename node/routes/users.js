var express = require('express');
var path = require('path');
var router = express.Router();
var appRootDir = require('app-root-dir').get();
var bodyParser = require('body-parser');
const parser = bodyParser.urlencoded({
  extended: false
})
var urlparser = bodyParser.urlencoded({
  extended: false
})

var User = require(path.join(appRootDir, '/services/userservice'));

var dummyData = {
  userID: "u001",
  email: "u1@gmail.com",
  address: {
    street: "1000 North",
    city: "Fairfield",
    State: "IA",
    zipcode: "52557",
  },
  dob: "05/15/1991",
  skill: "PHP, JAVA",
  education: "BSc computer",
  bio: "I have a dream",
  enabled: 1,
  role: 1
}
//role -> admin:2 , regular user, 1:

//get all user
router.get('/', function (req, res, next) {
  User.get()
    .then(data => {
      res.json(JSON.stringify(data))
    })
    .catch(err => res.json(err));
});

// get user by ID
router.get('/:uid', (req, res) => {

  console.log("Get user using ID : " + req.params.uid);
  User.get(req.params.uid)
    .then(data => {
      console.log("data length is " + data.length);
      if (data.length) { // if array is not empty
        console.log(JSON.parse(data));
        res.json({
          userData: data
        });
      } else {
        console.log("requested user not found " + JSON.parse(data));
        res.json({
          userData: []
        });

      }
    })
    .catch(err => {
      res.json({
        userData: []
      });
    });
})

//Add new user 
router.post('/add', urlparser, (req, res) => {
  const newUser = new User(req.body);
  console.log("User being pushed in Database :" + newUser);

  newUser.add().then(() => {
    res.json({
      status: 1,
      userData: newUser
    });
  })
})

//update user  info
router.post('/update', urlparser, (req, res) => {
  const newUser = new User(req.body);
  newUser.update().then(() => {
    res.json({
      status: 1
    });
  })
})

module.exports = router;