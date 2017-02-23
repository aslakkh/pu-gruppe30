import React, { Component } from 'react'
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import { getUserUid, removeCourse} from '../../helpers/auth'
import firebase from 'firebase'
import './CoursesList.css'


/*      Component for displaying a users courses   

Returns courses as ListGroup
Renders upon change in DB

TODO: 
FIX ERROR REMOVING LAST ELEMENT IN LIST / LOADING A USER WITH NO COURSES
FIX WARNING MESSAGE ON LOAD AFTER VIEWING COURSES
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

	//handles click
	handleClick(key){
		removeCourse(key);
	}



    //Component renders a header, followed by the keys of json object retrieved from firebase mapped to list
	render(){
		

		
		return(
			<div>
					
					<ListGroup >
							{Object.keys(this.state.courses).map((key) => {
								return <ListGroupItem key={key} className="CoursesList"> 
										{key} 
										<Button bsStyle="danger" onClick={() => this.handleClick(key)}>Delete</Button>
										</ListGroupItem>;
							})} 
					</ListGroup>
			</div>
		);
		
	}

}


