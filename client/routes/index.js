var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var faker = require('faker');
var moment = require('moment');

var config = {
  apiKey: "AIzaSyC7D23RnSKOWs2p6BsGJ2lmV8opwcu-G8g",
  authDomain: "friendlychat-6e266.firebaseapp.com",
  databaseURL: "https://friendlychat-6e266.firebaseio.com",
  storageBucket: "friendlychat-6e266.appspot.com",
  messagingSenderId: "449990955430"
};

var firebaseApp = firebase.initializeApp(config);
var database = firebase.database();

firebase.auth().signInWithEmailAndPassword('test@map.com', 'maptest').catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
});

setInterval(function(){
  var commentData = {
    message: faker.fake('{{hacker.phrase}}'),
    state: 'pending',
    user: faker.fake('{{internet.userName}}'),
    createdAt: moment().unix(),
  };

  var commentKey = firebase.database().ref().child('comments').push().key;
  var updates = {};
  updates['/comments/' + commentKey] = commentData;

  database.ref().update(updates);

  console.log(commentData);
}, 2000)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name: firebaseApp.name, });
});

module.exports = router;
