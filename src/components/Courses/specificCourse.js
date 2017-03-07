import React, {Component} from 'react';
import Stopwatch from './Stopwatch'

export default class SpecificCourse extends Component {
	constructor(props){
		super(props);
		this.state = ({
			courseID:props.courseID,
			points: undefined,
			course: props.course,
			totalTime: props.time

		})
	}

	render(){
		return(

		<div>
			hallo
		</div>)}






}