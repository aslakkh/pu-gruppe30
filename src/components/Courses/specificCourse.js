
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'

export default class SpecificCourse extends Component {
    constructor(props){
        super(props);
        this.state = ({
            courseID:props.courseID,
            points: undefined,
            course: props.course
        })
    }

    render(){
        return(
			<div>
			</div>)}






}