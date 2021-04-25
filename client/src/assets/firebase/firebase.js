import firebase from "firebase/app";
import "firebase/storage";
// const firebaseConfig = {
//     apiKey: "AIzaSyAycCdA7pKq-wc99V0ATcLN7no4g3T8S3g",
//     authDomain: "tomfit-7dacb.firebaseapp.com",
//     projectId: "tomfit-7dacb",
//     storageBucket: "tomfit-7dacb.appspot.com",
//     messagingSenderId: "618261074583",
//     appId: "1:618261074583:web:17344966e3265f5e098fd2",
//     measurementId: "G-BFLYQ5QTPX"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyC8s-Z9JuoTV9DIAj93Pm5Ly7Z6nZ3FxlQ",
  authDomain: "fir-ec66c.firebaseapp.com",
  projectId: "fir-ec66c",
  storageBucket: "fir-ec66c.appspot.com",
  messagingSenderId: "598065620070",
  appId: "1:598065620070:web:a4029415fc24361d3cb9a7",
  measurementId: "G-WYZP7XD31W"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };