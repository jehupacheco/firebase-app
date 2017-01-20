import firebase from 'firebase';
import _ from 'lodash';

const config = {
  apiKey: "AIzaSyC7D23RnSKOWs2p6BsGJ2lmV8opwcu-G8g",
  authDomain: "friendlychat-6e266.firebaseapp.com",
  databaseURL: "https://friendlychat-6e266.firebaseio.com",
  storageBucket: "friendlychat-6e266.appspot.com",
  messagingSenderId: "449990955430"
};

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth =  firebaseApp.auth();
const firebaseDatabase =  firebaseApp.database();
const firebaseStorage =  firebaseApp.storage();

let authUser = null;
let onAuthChange = () => {};

export const logIn = (credentials, resolveCallback, rejectCallback) => {
  firebaseAuth
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(resolveCallback, rejectCallback);
}

export const logOut = () => {
  firebaseAuth.signOut();
}

export const loggedIn = () => {
  return authUser !== null;
}

export const setOnAuthChange = (onChange) => {
  onAuthChange = onChange;
}

export const listenToRoute = (route, callback, once = false, event = 'value') => {
  const routeRef = firebaseDatabase.ref(route);
  let handler;

  if (event === 'value') {
    handler = (snapshot) => {
      let acm = [];
      _.transform(snapshot.val(), function(result, value, key) {
        if (value) {
          value.id = key;
          result.push(value);
        }
      }, acm);

      callback(acm);
    }
  } else {
    handler = (snapshot) => {
      callback(snapshot.val());
    }
  }

  if (once) {
    routeRef.once(event, handler);
  } else {
    routeRef.on(event, handler);
  }
}

export const setData = (route, data) => {
  firebaseDatabase.ref(route).set(data);
}

export const insertData = (route, child, data) => {
  const key = firebaseDatabase.ref().child(child).push().key;
  firebaseDatabase.ref(`${route}/${key}`).set(data);
}

export const uploadFile = (file, filename, callback = (() => {})) => {
  const storageRef = firebaseStorage.ref();
  const fileRef = storageRef.child(filename);

  fileRef.put(file).then((snapshot) => {
    callback(snapshot.downloadURL);
  })
}

firebaseAuth.onAuthStateChanged((user) => {
  authUser = user;
  onAuthChange(loggedIn());
});