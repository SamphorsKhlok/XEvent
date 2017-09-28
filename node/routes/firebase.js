var firebase = require("firebase-admin");
var serviceAccount = require("../mwap-79e5b-firebase-adminsdk-5pfjo-999e5a0990.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://mwap-79e5b.firebaseio.com"
});

module.exports = {
    verifyToken : (req, res, next) => {
        firebase.auth().verifyIdToken(req.body.fbToken)
          .then(function (decodedToken) {
            console.log('decoded user id: '+decodedToken.uid);
            // check if user token id is similar to passed id from form
            if (decodedToken.uid === req.body.formData.userID)
              return next();
            else
              return false;
          }).catch(function (error) {
            res.json({
              // invalid token
              status: 'An internal problem has occured. Please Try Again.'
            });
          });
      }
}