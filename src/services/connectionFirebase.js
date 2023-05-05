//biblioteca do firebase
import firebase from "firebase/compat/app";
//autenticação de email e senha
import "firebase/compat/auth";
//trabalha com o banco de dados criado pelo firebase
import "firebase/compat/database";

let firebaseConfig = {
  apiKey: "AIzaSyBw9WqkqnMCerCCumZ2K9xUkZIiNSs5a9M",
  authDomain: "bdcurlycosmeticos.firebaseapp.com",
  projectId: "bdcurlycosmeticos",
  storageBucket: "bdcurlycosmeticos.appspot.com",
  messagingSenderId: "161533554663",
  databaseURL: 'https://bdcurlycosmeticos-default-rtdb.firebaseio.com/',
  appId: "1:161533554663:web:6d6d9ba70e228619b4d742",
};

if (!firebase.apps.lenght) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
