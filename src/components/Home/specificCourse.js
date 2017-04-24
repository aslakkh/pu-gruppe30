import React, {Component} from 'react';
import TabView from './TabView'

export default class SpecificCourse extends Component {
	constructor(props){
		super(props);
		this.state = ({
			courseID: this.props.courseID,
			points: undefined,
			course: this.props.course

		})


	}


	componentWillReceiveProps(nextProps){
		console.log("specificCourse: " + nextProps.courseID);
		this.setState({
			courseID: nextProps.courseID,
			course: nextProps.course
		})
	}



	render(){
		return(

		<div>
			<TabView course={this.state.course} emne={this.state.courseID} />
		</div>)}






}