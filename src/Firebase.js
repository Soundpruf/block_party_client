import Firebase from 'firebase'

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyChcTl-VSSvXeG1pymeTYlQb_mfi6jz2VA",
    authDomain: "thrive-app-neural.firebaseapp.com",
    databaseURL: "https://thrive-app-neural.firebaseio.com",
    projectId: "thrive-app-neural",
    storageBucket: "thrive-app-neural.appspot.com",
    messagingSenderId: "786349530257"
  }

  Firebase.initializeApp(config)

  export default Firebase