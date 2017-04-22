import React, { Component } from 'react'
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import {disableCourse, courseExistsAtRoot} from '../../helpers/auth'
import {CourseWarning} from '../various/CourseWarning'
import {styles} from './CoursesListStyles.js'


/*      Component for displaying a users courses   

Returns courses as ListGroup
Renders upon change in DB

TODO: 
- Ask for confirmation on Delete
- Submit with enter
- Add courses in chronological order?
- ()
Could probably be split into a Course-component for each courses
*/ 

//http://stackoverflow.com/questions/40494787/get-user-object-properties-from-firebase-in-react

export default class CoursesList extends Component {

	constructor(props) {
		super(props);
		this.state={
			
			courses: this.props.courses
		}
	}

	componentDidMount(){
		//should be implemented in auth.js
		/*var self = this;
		var userUid = getUserUid(); //gets userid of user currently logged in

        //following code gets users courses from firebase and updates the components state
        //Should maybe be implemented in a function in auth.js
		self.firebaseRef = firebase.database().ref().child("users/"+userUid+"/courses");
		self.firebaseRef.orderByChild("active").equalTo(true).on('value', snap => {
			console.log(snap.val());
			self.setState({
				
				courses: snap.val() //sets courses to whatever is at users/userUid/courses in database
			});
		});*/
		
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			courses: nextProps.courses
		});

}

	componentWillUnmount(){

		//this.firebaseRef.off('value');
	}

	//handles click
	handleClick(key){
		return true;
	}



    //Component renders a header, followed by the keys of json object retrieved from firebase mapped to list
	render(){
		
		if(this.state.courses === undefined || this.state.courses === null){
			return(
				<h5>You have no active courses. Add a course below.</h5>
			);
		}
		else{
			return(
				<ListGroup>
						{Object.keys(this.state.courses).map((key) => {
							
							return <ListGroupItem key={key} /*className="CoursesList"*/ style={styles.coursesList}> 
								<div style={styles.listElement}>{key}</div>
								<Button bsStyle="danger" onClick={() => this.handleClick(key)}>Delete</Button>
								</ListGroupItem>
			
							
						})} 
				</ListGroup>
		);
		}
	}

}


