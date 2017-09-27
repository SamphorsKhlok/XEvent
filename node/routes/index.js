var express = require('express');
var router = express.Router();
/*
var admin = require("firebase-admin");

var serviceAccount = require("../mwap-79e5b-firebase-adminsdk-5pfjo-999e5a0990.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mwap-79e5b.firebaseio.com"
});*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  /*
  var idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJiNDcyNGMzOWQyMjJlNDhlMGE4ZTIwMTNkOTUxNjI0ZTZlZDRjNjUifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXdhcC03OWU1YiIsIm5hbWUiOiJOYXRpIEciLCJwaWN0dXJlIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9qYW5lLXEtdXNlci9wcm9maWxlLmpwZyIsImF1ZCI6Im13YXAtNzllNWIiLCJhdXRoX3RpbWUiOjE1MDY0NjQ2NDQsInVzZXJfaWQiOiJFV3RUVWRualJPZ0kzZUF6MWNxUDY0bDU5TzkzIiwic3ViIjoiRVd0VFVkbmpST2dJM2VBejFjcVA2NGw1OU85MyIsImlhdCI6MTUwNjQ3ODk0NywiZXhwIjoxNTA2NDgyNTQ3LCJlbWFpbCI6InN0dWRlbnRldGhpb3BpYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNjIzMDI1MzQ3MjI5MTAwNzQ1OCJdLCJlbWFpbCI6WyJzdHVkZW50ZXRoaW9waWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.b10c7q6ISq4MKYuxIriVCcOAhy-QWihkiuZcc4-ARSENpyIzf4jKdlbjjaDb6MNe3zt9XJtp1I5Q97gzpBIaXr4FwakBtt3cfROOd21YfMdFqYzDUJE9Qc2FuyOGfOL4JnKbdxBqwWrak8zISBJzAlHcN2KHl2rWsKY3cay9A1F0aXKinLdWstTIZNFyg9p7mO0XO4LgS_I722xPxuVygsIuJS81Fj0uixEHxkznq-cgK-Pufgt62x7xErCapTiMNPHoJb-VaPUw-wrAGmhyuYpq9PDNkPTNF42Joa-HQAMPkjXRpHbIoKgrkKEslWbtUXMQHcI6hoZZCwkUVtNuuA';
  
  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    console.log(decodedToken.uid)
  }).catch(function(error) {
    // Handle error
  });*/
  
});

module.exports = router;
