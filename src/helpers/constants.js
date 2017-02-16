/**
 * Created by jan on 16.02.2017.
 */

import Firebase from 'firebase';


const config = {
    apiKey: "AIzaSyCGT9CHqqN1PtviEyWZ-Nup3Hgt5xkWVIY",
    authDomain: "pu-gruppe30.firebaseapp.com",
    databaseURL: "https://pu-gruppe30.firebaseio.com"
};

Firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;