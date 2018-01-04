import React, {Component} from 'react'
import { Card } from 'semantic-ui-react'
import {Firebase} from '../Firebase'
import Axios from 'axios'


const Storage = Firebase.app().storage("gs://thrive-app-neural.appspot.com")
const StorageRef = Storage.ref()
const musicRef = StorageRef.child('/music')

console.log(Storage)
console.log(StorageRef)
console.log(musicRef)
export default class Browse extends Component {
    state = {}

    render() {
       
        return (
            <Card.Group itemsPerRow={4}>
                <Card color='red'  />
                <Card color='orange'  />
                <Card color='yellow'  />
                <Card color='olive'  />
                <Card color='green'  />
                <Card color='teal'  />
                <Card color='blue'  />
                <Card color='violet'  />
                <Card color='purple'  />
                <Card color='pink'  />
                <Card color='brown'  />
                <Card color='grey'  />
            </Card.Group>
        )
    }
}

// This could potentially pull all the files I need for the  browse featured

// const functions = require('firebase-functions');
// const gcs = require('@google-cloud/storage')();

// // on file upload to google cloud storage
// exports.fileUploaded = functions.storage.object().onChange(event => {

//   const object = event.data; // the object that was just uploaded
//   const bucket = gcs.bucket(object.bucket);
//   const signedUrlConfig = { action: 'read', expires: '03-17-2025' }; // this is a signed url configuration object

//   var fileURLs = []; // array to hold all file urls 

//   // just for example. ideally you should get this from the object that is uploaded for this to be a better function :)
//   // so that you can calculate the size of the folder it's uploaded to, and do something with it etc.
//   const folderPath = "a/path/you/want/its/folder/size/calculated";

//   bucket.getFiles({ prefix: folderPath }, function(err, files) {
//     // files = array of file objects
//     // not the contents of these files, we're not downloading the files. 

//     files.forEach(function(file) {
//       file.getSignedUrl(config, function(err, fileURL) {
//         console.log(fileURL);
//         fileURLs.push(fileURL);
//       });
//     });

//   });

// });