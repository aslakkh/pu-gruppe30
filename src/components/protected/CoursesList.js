import React, { Component } from 'react'
import Course from './Course'
import {Tab,NavItem, Nav, Col,Row, Button} from 'react-bootstrap'
import {getCourse, getCourses, getUserUid} from '../../helpers/auth'
import { ref } from '../../config/constants'
import firebase from 'firebase';
import Sidebar from './Sidebar'
import './CoursesList';


/*      Component for displaying a users courses   

Returns header and courses as ul
Renders upon change in DB

TODO: Styling
Could probably be split into a Course-component for each courses
*/ 

//http://stackoverflow.com/questions/40494787/get-user-object-properties-from-firebase-in-react

export default class CoursesList extends Component {

	constructor(props) {
		super(props);
		this.state={
			courses: [] 
		}
	}

	componentDidMount(){
		//should be implemented in auth.js
		var self = this;
		var userUid = getUserUid(); //gets userid of user currently logged in

        //following code gets users courses from firebase and updates the components state
        //Should maybe be implemented in a function in auth.js
		const coursesRef = firebase.database().ref().child("users/"+userUid+"/courses");
		coursesRef.on('value', snap => {
			self.setState({
				courses: snap.val() //sets courses to whatever is at users/userUid/courses in database
			});
		});
	}



    //Component renders a header, followed by the keys of json object retrieved from firebase mapped to list
	render(){
		return(
			<div>
				<h4>My courses</h4>
				<ul>
					{Object.keys(this.state.courses).map((key) => {
						return <div key={key}>{key}</div>;
					})} 
				</ul>
			</div>
		);
		
	}

}


