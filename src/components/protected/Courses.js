import React, { Component } from 'react'
import Course from './Course'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import {getCourse } from '../../helpers/auth'
import { ref } from '../../config/constants'
import firebase from 'firebase';


export default class Courses extends Component {
constructor(props) {
  super(props);
  this.state={
  	course: 'potet',
  	extra: 'ting'

  }

};



componentWillMount(){
	console.log("tester")

}

componentDidMount(){
	  console.log("const")
  const userUid = firebase.auth().currentUser.uid;
  ref.child('users/'+userUid).once("value", function(snapshot){
  	snapshot.forEach(function(data){
  		console.log(data.val(),data.key)
  		this.setState = {
  			course : data.val().course,
  			extra: data.val().extra

  		}

  	})});
}
	render (){
		return (
			<h1>hello</h1>




			)
	}




}