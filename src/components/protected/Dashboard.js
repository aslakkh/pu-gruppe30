import React, { Component } from 'react'
import CoursesList from './CoursesList'
import AddCourse from './AddCourse'
import {getCourse } from '../../helpers/auth'
import './Dashboard.css'

export default class Dashboard extends Component {

  constructor(props){
    super(props);
    this.getCoursesDisp = this.getCoursesDisp.bind(this);
  }

getCoursesDisp(){
	const cour = getCourse();

}



  render () {
    return (
    	<div className="Dashboard">
        <h4>My courses</h4>
        <CoursesList courses={this.props.courses}/>
       	<AddCourse />
      </div>
    )
  }
}