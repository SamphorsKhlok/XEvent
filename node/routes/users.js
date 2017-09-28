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
var firebase = require(path.join(appRootDir, '/routes/firebase'));

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

// get user by ID
router.get('/:uid', (req, res) => {
  console.log("Get user using ID : " + req.params.uid);
  User.get(req.params.uid)
    .then(data => {
      console.log('Returned user data ...');
      console.log(JSON.parse(data));
      res.json({
        userData: data
      });
    })
    .catch(err => {
      res.json({
        userData: []
      });
    });
})

//get all users
router.get('/list/:start/:perpage', function (req, res, next) {
  console.log("Get users starting from : " + req.params.start);
  User.listUsers(req.params.start, req.params.perpage)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.json(err));
});

// check if admin
router.get('/isadmin/:uid', (req, res) => {
  console.log("Get user using ID : " + req.params.uid);
  User.isAdmin(req.params.uid)
    .then(r => {
      if (r == true) { // if array is not empty
        console.log('checkAdmin..?' + r);
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
  firebase.verifyToken, // add to db
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
  // middleware to check token
  firebase.verifyToken,
  //if token verified, update db
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

//update user  role, performed by admin user
// posted data in req body -> formData, fbToken
router.post('/changerole', urlparser,
  firebase.verifyToken, // verify token
  //check Admin privelege
  (req, res, next) => {
    User.isAdmin(req.body.formData.userID)
      .then(r => {
        if (r == true) {
          console.log('checkAdmin..?' + r);
          return next();
        } else {
          console.log('unauthorized access');
          return false;
        }
      })
  },
  //if token verified and is admin, update db
  (req, res) => {
    User.changeRole(req.body.formData)
      .then(() => {
        res.json({
          status: 1
        });
      })
      .catch(err => console.log("Role Update Err " + err))
  }
)

// enable or disable user, performed by admin user
// posted data in req body -> formData, fbToken
router.post('/changeaccess', urlparser,
  firebase.verifyToken, // verify token
  //check Admin privelege
  (req, res, next) => {
    User.isAdmin(req.body.formData.userID)
      .then(r => {
        if (r == true) {
          console.log('checkAdmin..?' + r);
          return next();
        } else {
          console.log('unauthorized access');
          return false;
        }
      })
  },
  //if token verified and is admin, update db
  (req, res) => {
    User.changeAccess(req.body.formData)
      .then(() => {
        res.json({
          status: 1
        });
      })
      .catch(err => console.log("Access Level Update Err " + err))
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