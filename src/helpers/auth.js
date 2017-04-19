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
    let monthlyRef = ref.child('users/'+userUid+"/courses/" + course + "/goals/monthlyGoal/");
    let weeklyRef = ref.child('users/'+userUid+"/courses/" + course + "/goals/weeklyGoal/");
    let dailyRef = ref.child('users/'+userUid+"/courses/" + course + "/goals/dailyGoal/");

    usersRef.child(course).update({
        active: true
    });

    monthlyRef.update({
        active: true,
        timeSet: 0,
        value: 0,
        timeSpent: 0

    });

    weeklyRef.update({
        active: true,
        timeSet: 0,
        value: 0,
        timeSpent: 0
    });

    dailyRef.update({
        active: true,
        timeSet: 0,
        value: 0,
        timeSpent: 0
    });

    let goalRef = ref.child('users/'+userUid+"/courses/" + course + "/oldGoals/daily/1");
    goalRef.update({
        goal: 0,
        timeSet: 0,
        timeSpent: 0,
    });

    goalRef = ref.child('users/'+userUid+"/courses/" + course + "/oldGoals/weekly/1");
    goalRef.update({
        goal: 0,
        timeSet: 0,
        timeSpent: 0,
    });

    goalRef = ref.child('users/'+userUid+"/courses/" + course + "/oldGoals/monthly/1");
    goalRef.update({
        goal: 0,
        timeSet: 0,
        timeSpent: 0,
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


export function saveGoal(course, goal) {
    const userUid = firebase.auth().currentUser.uid;
    let courseRef = ref.child('users/'+userUid+'/courses/'+course);
    courseRef.update({
        goal:goal
    });
}
export function saveGoal2(view, course, seconds, date) {
    const userUid = firebase.auth().currentUser.uid;
    let courseRef = ref.child('users/'+userUid+'/courses/'+course + '/goals/' + view);
    courseRef.update({
        value:seconds,
        timeSet:date
    });
}


// saves goal and links seconds elapsed to a specific goal
//daily/monthly, weekly goal functions as active goal. Need a method that checks if goal expired
export function saveGoal3(goalType, course, goalInSeconds, secondsElapsed=null) {
    const userUid = firebase.auth().currentUser.uid;
    const timeRef = ref.child('users/'+userUid+'/courses/'+ course +'/goals/'+ '/goalRegister/' +  Date.now());
    timeRef.set({
        goalType: goalType,
        goalInSeconds: goalInSeconds,
        secondsElapsed: secondsElapsed
    });
}

export function saveExpiredGoal(goalType, timeCreated, course, goalInSeconds, secondsSpent) {
    const userUid = firebase.auth().currentUser.uid;
    console.log("halloiluken")
    console.log('users/'+userUid+'/courses/'+ course + '/oldGoals/' + goalType + "/" + timeCreated)
    const goalRef = ref.child('users/'+userUid+'/courses/'+ course + '/oldGoals/' + goalType + "/" + timeCreated);
    goalRef.set({
        goal: goalInSeconds,
        timeSet: timeCreated,
        timeSpent: secondsSpent
    });
}

export function saveProgress(course, view, timeSpent) {
    const userUid = firebase.auth().currentUser.uid;
    const goalRef = ref.child('users/'+userUid+'/courses/'+ course +'/goals/'+ view);
    goalRef.update({
        timeSpent: timeSpent
    });

}

/*
 export function gg(course, goalType, dateNow) {
 const userUid = firebase.auth().currentUser.uid;
 var goalRef = ref.child('users/'+userUid+"/courses/" + course +'/goals/'+ '/goalRegister/');
 var s;
 ratingRef.on("value", function (data) {
 s = data.val().weekly;
 });
 return s;
 }
 */

export function activateGoal(type, course, boolean) {
    const userUid = firebase.auth().currentUser.uid;
    let courseRef = ref.child('users/'+userUid+'/courses/'+course + '/goals/' + type);
    courseRef.update({
        active: boolean
    });
}

export function test(course){
    //const userUid = firebase.auth().currentUser.uid;
    //firebase.database().ref(userUid).once();
    var s;
    let coursesRef = ref.child("/courses/" + course + "/weekly");
    coursesRef.on("value", function(snapshot){
        s = snapshot.val();
    });
    return s;
}

export function getSec(course) {
    var ratingRef = firebase.database().ref("courses/" + course);
    var s;
    ratingRef.on("value", function (data) {
        s = data.val().weekly;
    });
    return s;
}

export function isGoalActive(course, view) {
    const userUid = firebase.auth().currentUser.uid;
    let out = 0;
    let coursesRef = ref.child('users/'+userUid+'/courses/' + course + "/goals/" + view + "/active/");
    coursesRef.on("value", function(snapshot){
        out = snapshot.val();
    });
    return out;
}


export function removeOldGoal(course, type, key) {
    const userUid = firebase.auth().currentUser.uid;
    let oldGoalRef = ref.child('users/'+userUid+'/courses/'+course + '/oldGoals/' + type + "/");
    console.log(oldGoalRef);
    oldGoalRef.child(key).remove();
}
