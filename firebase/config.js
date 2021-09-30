import * as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import config from '../config';

const firebaseConfig = {
  apiKey: config.API_APIKEY,
  authDomain: config.API_AUTHDOMAIN,
  projectId: config.API_PROJECTID,
  storageBucket: config.API_STORAGEBUCKET,
  messagingSenderId: config.API_MESSAGINGSENDERID,
  appId: config.API_APPID
};

let app;
if (firebase.apps.length === 0 ) {
  app = firebase.initializeApp(firebaseConfig)
}else {
  app = firebase.app();
}

 

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db,auth,storage };