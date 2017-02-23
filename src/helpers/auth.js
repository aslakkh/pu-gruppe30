import { ref, firebaseAuth } from '../config/constants'
import firebase from 'firebase';



export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => console.log('Oops', error))
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

export function saveCourse (course){
  const userUid = firebase.auth().currentUser.uid;
  var usersRef = ref.child('users/'+userUid+"/courses/"+course);

  usersRef.update({
    active: true

  });
}

 export function loadCourse(){
    console.log("const");
    var emner =[]
  let that = this;
    const userUid = firebase.auth().currentUser.uid;
    ref.child('users/'+userUid+'/courses').once("value", function(snapshot){
      snapshot.forEach(function(data){
        console.log(data.val(),data.key)
        emner.push(data.key);

    })});
  return(emner);

  

}
  export function getCourse(user){
    let emner = []
    const userUid = user;
    ref.child('users/'+userUid+'/courses').once("value",function(snapshot){
      snapshot.forEach(function(data){
        emner.push(data.key)
    })})
    return(emner)

  }