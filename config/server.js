module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS')
  },
});


// const firebase = require("firebase");

// const config = {
//     firebase: {
//         apiKey: "AIzaSyDrZpLnEWCzbAB2iXM1uizR8J9Z8iP414c",
//         authDomain: "amigao-fcm.firebaseapp.com",
//         projectId: "amigao-fcm",
//         storageBucket: "amigao-fcm.appspot.com",
//         messagingSenderId: "139473613556",
//         appId: "1:139473613556:web:84143a5ba3fc3381bea4a1",
//         measurementId: "G-DW9N8LQLDQ"
//     },
// };
// firebase.initializeApp(config);
