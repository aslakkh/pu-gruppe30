import React, { Component } from 'react'
import { ref } from '../../config/constants'
import firebase from 'firebase';
import Sidebar from './Sidebar'

//unused
/*function getCourses(props){
  const that = props;
    const userUid = firebase.auth().currentUser.uid;
    ref.child('users/'+userUid+'/courses').once("value").then(function(snapshot){
      snapshot.forEach(function(data){
        that.emner.push(data.key)

    })})
    


}*/

//unused
/*
function loadedDone(props){

}*/

export default class Courses extends Component {
constructor(props) {
  super(props);
  console.log("Component Courses receives the following props: ");
  console.log(this.props.courses);
  this.state=({
    courses: this.props.courses,
    emner: ["tma","bull"]
  })
};


componentWillReceiveProps(nextProps){
  console.log("willReceiveProps: ");
  console.log(nextProps.courses);
  this.setState({
    courses: nextProps.courses
  });
}


componentWillMount(){
    
  

}

componentDidMount(){
  
}
	render (){
/*        if(!this.state.done) {
        return (<div className="chatapp">Loading...</div>);
    }*/
		return (
			<Sidebar courses={this.state.courses}/>





			)
	}




}