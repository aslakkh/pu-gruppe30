import React, { Component } from 'react'
import Course from './Course'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import {getCourse } from '../../helpers/auth'
import { ref } from '../../config/constants'
import firebase from 'firebase';
import Sidebar from './Sidebar'

export default class Courses extends Component {
constructor(props) {
  super(props);
  this.state={
  	course: 'potet',
  	extra: 'ting'

  }

};



componentWillMount(){
	console.log("tester")

}

componentDidMount(){
}
	render (){
		return (
			<Sidebar/>




			)
	}




}