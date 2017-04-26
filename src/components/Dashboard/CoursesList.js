import React, { Component } from 'react'
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import {disableCourse} from '../../helpers/auth'
import {styles} from './CoursesListStyles.js'


/*      Component for displaying a users courses   

Returns courses as ListGroup
Renders upon change in DB

*/ 


export default class CoursesList extends Component {

	constructor(props) {
		super(props);
		this.state={
			courses: this.props.courses
		}
	}


	componentWillReceiveProps(nextProps){
		this.setState({
				courses: nextProps.courses,
			});
		
}



	handleClick(key){
		disableCourse(key); //sets "active" to false in database
	}



    //Component renders a header, followed by the keys of json object retrieved from firebase mapped to list
	render(){
		if(this.state.courses === undefined || this.state.courses === null){
			return(
				<h5>You have no active courses. Add a course above.</h5>
			);
		}
		else{
			return(
				<ListGroup>
						{Object.keys(this.state.courses).map((key) => {
							return (
								<ListGroupItem key={key} style={styles.coursesList}> 
									<div style={styles.listElement}>{key}</div>
									<Button bsStyle="danger" onClick={() => this.handleClick(key)}>Delete</Button>
								</ListGroupItem>
							);
								
						})} 
				</ListGroup>
		);
		}
	}

}


