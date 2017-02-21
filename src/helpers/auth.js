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

  export function getCourse(){
    const userUid = firebase.auth().currentUser.uid;
    this.firebase.database().ref(userUid).once()
    return firebase.database().ref(userUid).on("value", function(snapshot) {
      console.log(snapshot.val());


    });



  

}