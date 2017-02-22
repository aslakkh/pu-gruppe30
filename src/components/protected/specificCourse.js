import React, {Component} from 'react';
import { ref } from '../../config/constants'
import firebase from 'firebase';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import StopWatch from './StopWatch';



export default class SpecificCourse extends Component {
	constructor(props){
		super(props);
		this.state = ({
			emne:props.emne,
			points: undefined

		})


	}

componentWillMount(){
	  const that = this;
    ref.child('courses/'+that.props.emne+"/").once("value",function(snapshot){
      snapshot.forEach(function(data){
      	var newState ={};
      	newState[data.key] = data.val();
      	that.setState(newState)
    })})
    console.log("hello" +this.state.points)



}
	render(){
		return(

		<div>hello{this.state.emne} {this.state.points}
		<StopWatch/>



		</div>)}






}