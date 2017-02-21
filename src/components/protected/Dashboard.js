import React, { Component } from 'react'
import Course from './Course'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import {getCourse } from '../../helpers/auth'
var Global = require('react-global');

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
       	<Course />
        {console.log(Global.get('FOO'))}
      </div>
    )
  }
}