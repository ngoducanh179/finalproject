import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAycCdA7pKq-wc99V0ATcLN7no4g3T8S3g",
    authDomain: "tomfit-7dacb.firebaseapp.com",
    projectId: "tomfit-7dacb",
    storageBucket: "tomfit-7dacb.appspot.com",
    messagingSenderId: "618261074583",
    appId: "1:618261074583:web:53f9d2b0ea07cc67098fd2",
    measurementId: "G-1CYMK2DVDB"
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };