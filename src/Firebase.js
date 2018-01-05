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

  const Storage = _Firebase.app().storage("gs://thrive-app-neural.appspot.com")
  
  
  export const Firebase = _Firebase
  export const StorageRef = Storage.ref()
  export const MusicRef = StorageRef.child('/music')
  export const PhotoRef =  StorageRef.child('/photos')
  
  