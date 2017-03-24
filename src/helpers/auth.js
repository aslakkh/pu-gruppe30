import { ref, firebaseAuth } from '../config/constants'
import firebase from 'firebase';



export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => console.log('Oops', error))
}

export function privilige(user, auth0) {
    console.log(user.uid);
    console.log(auth0);
    return ref.child(`users/${user.uid}/info`)
        .update({
        privilege: auth0
        })
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
  const userUid = getUserUid();
  let usersRef = ref.child('users/'+userUid+"/courses/");

  usersRef.child(course).update({
    active: true,
    time: 0,
    goal: 0
  });
}

//add course to courses/course
//for now sets all points to 7.5
export function addCourseToRoot(course){
  var courseRef = ref.child('courses/');
  courseRef.child(course).update({
    points: 7.5,
    weekly: 36000,
  })
}

//check for existing course at root 
export function courseExistsAtRoot(course){
  var courseRef = ref.child('courses/');
  var courseExists;
  courseRef.once('value', function(snapshot) {
    courseExists = snapshot.hasChild(course);
  });
  return courseExists;
}

export function getCourse(){
  const userUid = firebase.auth().currentUser.uid;
  this.firebase.database().ref(userUid).once();
  return firebase.database().ref(userUid).on("value", function(snapshot) {
    console.log(snapshot.val());
    });
}

//Function for getting all courses of a student (not fully implemented, see componentDidMount() in Courses.js)
export function getCourses(){
  const userUid = firebase.auth().currentUser.uid;
  //firebase.database().ref(userUid).once();
  return firebase.database().ref(userUid).child('courses').on("value", snap => {
    snap.val();
  });
}

export function saveGoal(course, goal) {
    const userUid = firebase.auth().currentUser.uid;
    let courseRef = ref.child('users/'+userUid+'/courses/'+course);
    courseRef.update({
        goal:goal
    });
}

export function getGoal(course) {
    const userUid = firebase.auth().currentUser.uid;
    console.log(userUid)
}


    export function getUserUid(){
  const userUid = firebase.auth().currentUser.uid;
  return userUid;
}

//function for removing course from user
export function removeCourse(course){
  const userUid = getUserUid();
  var userRef = ref.child('users/'+userUid+'/courses/');
  userRef.child(course).remove();
}

export function removeCourseFromRoot(course){
  var courseRef = ref.child('courses');
  courseRef.child(course).remove();
}

//function for setting a courses child 'active' to false
export function disableCourse(course){
  const userUid = getUserUid();
  var userRef = ref.child('users/'+userUid+'/courses/');
  userRef.child(course).update({
    active: false
  });
}

 export function loadCourse(){
    console.log("const");
    var emner =[]
    const userUid = firebase.auth().currentUser.uid;
    ref.child('users/'+userUid+'/courses').once("value", function(snapshot){
      snapshot.forEach(function(data){
        console.log(data.val(),data.key)
        emner.push(data.key);

    })});
  return(emner);
}

  export function planSession(course, date, goal){
    const userUid = getUserUid();
    var userRef = ref.child('users/'+userUid+'/courses/'+course+'/planned-sessions/');
    userRef.child(date).update({
      goal: goal,
    });
  }

