import React, { Component } from 'react'
import Course from './Course'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import {getCourse } from '../../helpers/auth'
import { ref } from '../../config/constants'
import firebase from 'firebase';
import Sidebar from './Sidebar'

export default class Courses extends Component {
constructor(props) {
  super(props);
  this.emner=[];
};




componentWillMount(){
      console.log("const");
  let that = this;
    const userUid = firebase.auth().currentUser.uid;
    ref.child('users/'+userUid+'/courses').once("value", function(snapshot){
      snapshot.forEach(function(data){
        console.log(data.val(),data.key)
        that.emner.push(data.key);

    })});
    this
}
	render (){
		return (
			<Sidebar emner={this.emner}/>




			)
	}




}