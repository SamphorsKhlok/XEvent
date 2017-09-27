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

var firebase = require("firebase-admin");
var serviceAccount = require("../mwap-79e5b-firebase-adminsdk-5pfjo-999e5a0990.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://mwap-79e5b.firebaseio.com"
});

var dummyData = {
  userID: "EWtTUdnjROgI3eAz1cqP64l59O93",
  name: "Natnael G",
  email: "nat@gmail.com",
  address: {
    street: "1000 North 4th",
    city: "Fairfield",
    State: "IA",
    zipcode: "52557",
  },
  dob: "05/15/1992",
  skill: "PHP, JAVA, Joomla",
  education: "BSc computer",
  bio: "I have a dream",
  enabled: 1,
  role: 1
}
//role -> admin:2 , regular user, 1:

//get all users
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

// check if admin
router.get('/isadmin/:uid', (req, res) => {
  console.log("Get user using ID : " + req.params.uid);
  User.isAdmin(req.params.uid)
    .then(r => {
      if (r == true) { // if array is not empty
        console.log('checkAdmin..?'+ r);
        res.json({
          isAdmin: true
        });
      } else {
        res.json({
          isAdmin: false
        });
      }
    })
    .catch(err => {
      //
    });
})

//Add new user 
router.post('/add', urlparser,
  // check token first
  (req, res, next) => {
    firebase.auth().verifyIdToken(req.body.fbToken)
      .then(function (decodedToken) {
        console.log(decodedToken.uid);
        return next();
      }).catch(function (error) {
        res.json({
          // invalid token
          status: 'An internal problem has occured. Please Try Again.'
        });
      });
  }, // add to db
  (req, res) => {
    const newUser = new User(req.body.fData);
    console.log("User being pushed in Database :" + newUser);
    newUser.add().then(() => {
      res.json({
        status: 1,
        userData: newUser
      });
    })
  }
)

//update user  info
router.post('/update', urlparser,
  // check token
  (req, res, next) => {
    //console.log('update invoked.'+ req.body.fbToken);
    firebase.auth().verifyIdToken(req.body.fbToken)
      .then((decodedToken) => {
        console.log(decodedToken.uid)
        return next();
      }).catch((error) => {
        console.log('Invalid Token');
        res.json({
          status: 'An internal problem has occured. Please Try Again.'
        });
      });
  },
  //update db
  (req, res) => {
    const newUser = new User(req.body.formData);
    newUser.update().then(() => {
        res.json({
          status: 1
        });
      })
      .catch(err => console.log("Update Err " + err))
  }
)

module.exports = router;

/*
firebase.auth().verifyIdToken(idToken)
.then(function(decodedToken) {
  var uid = decodedToken.uid;
  console.log(decodedToken.uid)
}).catch(function(error) {
  // Handle error
}); */