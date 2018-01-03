import _Firebase from 'firebase'

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyChcTl-VSSvXeG1pymeTYlQb_mfi6jz2VA",
    authDomain: "thrive-app-neural.firebaseapp.com",
    databaseURL: "https://thrive-app-neural.firebaseio.com",
    projectId: "thrive-app-neural",
    storageBucket: "thrive-app-neural.appspot.com",
    messagingSenderId: "786349530257"
  }

  _Firebase.initializeApp(config)
  
  export const Firebase = _Firebase