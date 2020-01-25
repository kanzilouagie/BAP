import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBp-YtQZ2cfJ8YKmyDRYqjac7L-swEhCQw",
  authDomain: "think-pink-acd52.firebaseapp.com",
  databaseURL: "https://think-pink-acd52.firebaseio.com",
  projectId: "think-pink-acd52",
  storageBucket: "think-pink-acd52.appspot.com",
  messagingSenderId: "1060455588055",
  appId: "1:1060455588055:web:6ccf8307172e87be731092"
};

const fire = firebase.initializeApp(config);
export default fire;