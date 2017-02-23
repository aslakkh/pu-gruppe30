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
  //console.log("courses" + props.courses)
  this.emner=[];
  this.state=({
    emner: ["tma","bull"]
  })
};




componentWillMount(){
  const that = this;
    const userUid = firebase.auth().currentUser.uid;
    ref.child('users/'+userUid+'/courses').once("value").then(function(snapshot){
      snapshot.forEach(function(data){
        that.emner.push(data.key)

    })})

}

componentDidMount(){
  //console.log(this.props.courses+" yo")
}
	render (){
/*        if(!this.state.done) {
        return (<div className="chatapp">Loading...</div>);
    }*/
		return (
			<Sidebar emner={this.emner}/>





			)
	}




}