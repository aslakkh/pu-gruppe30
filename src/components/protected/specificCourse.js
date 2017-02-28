import React, {Component} from 'react';
import { ref } from '../../config/constants'
import firebase from 'firebase';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import Stopwatch from './Stopwatch'
import Progress from 'react-progressbar';
const formattedSeconds = (sec) =>
Math.floor(sec / 60) +
':' +
('0' + sec % 60).slice(-2)

function getFromFirebase(){

}

export default class SpecificCourse extends Component {
	constructor(props){
		super(props);
		this.state = ({
			emne:props.emne,
			points: undefined,
			time: undefined

		})
		this.extra= []


	}

  componentWillUnmount(){

  }

componentDidMount(){
	const that = this;
	/*
	  
    ref.child('courses/'+that.props.emne+"/").once("value",function(snapshot){
      snapshot.forEach(function(data){
      	var newState ={};
      	newState[data.key] = data.val();
      	that.setState(newState)
    })})
	*/
    const userUid = firebase.auth().currentUser.uid;
    //console.log(userUid)

	//
    ref.child('users/'+userUid+'/courses/'+this.props.emne).on("value", function(snapshot){
      snapshot.forEach(function(data){
      	if (data.key === "time"){
      	that.setState({
      		time: data.val()
      	})}
    })})
    
	

}




	render(){
		return(

		<div>
		 <Stopwatch time={this.state.time} emne={this.state.emne} />
		
		

		</div>)}






}