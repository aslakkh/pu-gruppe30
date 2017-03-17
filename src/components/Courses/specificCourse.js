
import React, {Component} from 'react';
import Stopwatch from './Stopwatch'
import 'bootstrap/dist/css/bootstrap.css'
import {ProgressBar} from 'react-bootstrap'

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