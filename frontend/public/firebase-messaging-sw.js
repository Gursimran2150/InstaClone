// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );

// const firebaseConfig = {
//   apiKey: "AIzaSyBNUH6ctFIA54DsV8Ua1Ryhr4l4B6UXbKQ",
//   authDomain: "insta-clone-55b51.firebaseapp.com",
//   projectId: "insta-clone-55b51",
//   storageBucket: "insta-clone-55b51.appspot.com",
//   messagingSenderId: "525670175364",
//   appId: "1:525670175364:web:96516f3c38ad24e54628d1",
//   measurementId: "G-0BQ54PE61W",
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
