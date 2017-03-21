import React, { Component } from 'react'
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import './ManageCourses.css'


/* 
    ManageCourses displays all courses in database
    Professor can add new courses and remove courses permanently from database
    Professor can add courses to "my courses"
*/
export default class ManageCourses extends Component{


    constructor(props){
        super(props);
        console.log(this.props.courses);
        this.state = {
            courses: this.props.courses,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            courses: nextProps.courses
        })
    }



    render(){
        if(this.state.courses === null || this.state.courses === undefined){
            return(
                <h4>No courses in database</h4>
            )
        }
        return(
            <div>
                <h4>Manage Courses is working!</h4>
                <ListGroup>
                    {Object.keys(this.state.courses).map((key) => {
                        return <ListGroupItem key={key} className="CoursesList">
                            {key}
                        <Button>Add to My Courses</Button>
                        <Button>Delete</Button>
                        </ListGroupItem>
                    })}
                    
                </ListGroup>
            </div>
        );
    }
}