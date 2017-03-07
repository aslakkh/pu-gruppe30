import React, {Component} from 'react';
import Stopwatch from './Stopwatch'
import TabView from './TabView'

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
			<TabView course={this.state.course} emne={this.state.courseID} />
		</div>)}






}