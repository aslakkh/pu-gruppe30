
export function auth (email, pw) {
    return true;
}

export function privilige(user, auth0) {
    return true;
}

export function logout () {
    return true;
}

export function login (email, pw) {
    return true;
}

export function saveUser (user) {
    return true;
}

export function saveCourse (course){
    return true;
}

//add course to courses/course
//for now sets all points to 7.5
export function addCourseToRoot(course){
    return true;
}

//check for existing course at root 
export function courseExistsAtRoot(course){
    return true;
}

export function getCourse(){
    return true;
}

//Function for getting all courses of a student (not fully implemented, see componentDidMount() in Courses.js)
export function getCourses(){
    return true;
}



export function getUserUid(){
    return true;
}

//function for removing course from user
export function removeCourse(course){
    return true;
}

export function removeCourseFromRoot(course){
    return true;
}

//function for setting a courses child 'active' to false
export function disableCourse(course){
    return true;
}

export function loadCourse(){
    return true;
}

export function planSession(course, date, goal){
    return true;
}


export function saveGoal(course, goal) {
    return true;
}
export function saveGoal2(view, course, seconds, date) {
    return true;
}


// saves goal and links seconds elapsed to a specific goal
//daily/monthly, weekly goal functions as active goal. Need a method that checks if goal expired
export function saveGoal3(goalType, course, goalInSeconds, secondsElapsed=null) {
    return true;
}

export function saveExpiredGoal(goalType, timeCreated, course, goalInSeconds, secondsSpent) {
    return true;
}

export function saveProgress(course, view, timeSpent) {
    return true;

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
    return true;
}

export function test(course){
    return true;
}

export function getSec(course) {
    return true;
}

export function isGoalActive(course, view) {
    return true;
}