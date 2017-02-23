import React, {Component} from 'react';
import { ref } from '../../config/constants'
import firebase from 'firebase';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import Stopwatch from './Stopwatch'


export default class SpecificCourse extends Component {
	constructor(props){
		super(props);
		this.state = ({
			emne:props.emne,
			points: undefined

		})
		this.extra= []


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
    const userUid = firebase.auth().currentUser.uid;
    ref.child('users/'+userUid+'/courses/'+this.props.emne+'/time').once("value").then(function(snapshot){
      snapshot.forEach(function(data){
      	console.log(data.val())
        that.extra.push(data.val())

    })})
    


}




	render(){
		return(

		<div>
			{this.state.points}
			{this.state.time}
			{this.extra}
		 <Stopwatch />

		</div>)}






}