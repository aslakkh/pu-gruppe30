import React, { Component } from 'react'
import Course from './Course'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import {getCourse } from '../../helpers/auth'
import { ref } from '../../config/constants'
import firebase from 'firebase';
import Sidebar from './Sidebar'

function getCourses(props){
  const that = props;
    const userUid = firebase.auth().currentUser.uid;
    ref.child('users/'+userUid+'/courses').once("value").then(function(snapshot){
      snapshot.forEach(function(data){
        that.emner.push(data.key)

    })})
    


}
function loadedDone(props){

}

export default class Courses extends Component {
constructor(props) {
  super(props);
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