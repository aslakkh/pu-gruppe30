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
    return firebaseAuth().signOut();

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

//sets the teachers recommended time for course to time
export function setRecommendedTime(course, time){
    var courseRef = ref.child('courses/');
    courseRef.child(course).update({
        weekly: time,
    })
    
}

//check for existing course at root
export function courseExistsAtRoot(course){
    var courseRef = ref.child('courses/');
    var courseExists;
    courseRef.once('value', function(snapshot) {
        courseExists = snapshot.hasChild(course);
        console.log(courseExists);
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

export function getUserUid(){
    const userUid = firebase.auth().currentUser.uid;
    return userUid;
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

export function planSession(course, date, goal){
    const userUid = getUserUid();
    var userRef = ref.child('users/'+userUid+'/courses/'+course+'/plannedSessions/');
    userRef.child(date).update({
        goal: goal,
    });
}

export function setGoal(view, course, seconds, date) {
    const userUid = firebase.auth().currentUser.uid;
    let courseRef = ref.child('users/'+userUid+'/courses/'+ course + '/goals/' + view);
    courseRef.update({
        value:seconds,
        timeSet:date
    });
}

export function saveExpiredGoal(goalType, timeCreated, course, goalInSeconds, secondsSpent) {
    const userUid = firebase.auth().currentUser.uid;
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

export function activateGoal(type, course, boolean) {
    const userUid = firebase.auth().currentUser.uid;
    let courseRef = ref.child('users/'+userUid+'/courses/'+course + '/goals/' + type);
    courseRef.update({
        active: boolean
    });
}

export function test(course){
    var s;
    let coursesRef = ref.child("/courses/" + course + "/weekly");
    coursesRef.on("value", function(snapshot){
        s = snapshot.val();
    });
    return s;
}
export function addSession(date,courseID,minSelected, hourSelected){
    const userUid = firebase.auth().currentUser.uid;
    const variabel = new Date(date);
    variabel.setMilliseconds(Math.random()*1000);
    const timeRef = ref.child('users/'+userUid+'/courses/'+courseID+'/sessions/'+ variabel.getTime());
    timeRef.set({time:(minSelected * 60) + (hourSelected * 3600),desc: "secondsPlanned"});
    return true;
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
    oldGoalRef.child(key).remove();
}

