import React, { Component } from 'react'
import Course from './Course'
import AddCourse from './AddCourse'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import {getCourse } from '../../helpers/auth'
export default class Dashboard extends Component {

  constructor(props){
    super();
    this.getCoursesDisp = this.getCoursesDisp.bind(this);
  }

getCoursesDisp(){
	const cour = getCourse();
	console.log(cour);

}



  render () {
    return (
    	<div>
       	<AddCourse />
      </div>
    )
  }
}