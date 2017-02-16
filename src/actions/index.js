/**
 * Created by jan on 16.02.2017.
 */

import Firebase from 'firebase';


const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';

const config = {
    apiKey: "AIzaSyCGT9CHqqN1PtviEyWZ-Nup3Hgt5xkWVIY",
    authDomain: "pu-gruppe30.firebaseapp.com",
    databaseURL: "https://pu-gruppe30.firebaseio.com"
};

Firebase.initializeApp(config);