import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCGT9CHqqN1PtviEyWZ-Nup3Hgt5xkWVIY",
    authDomain: "pu-gruppe30.firebaseapp.com",
    databaseURL: "https://pu-gruppe30.firebaseio.com"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;