import React, {Component} from 'react';
import Stopwatch from './Stopwatch'

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
		 <Stopwatch course={this.state.course} emne={this.state.courseID} />
		
		

		</div>)}






}