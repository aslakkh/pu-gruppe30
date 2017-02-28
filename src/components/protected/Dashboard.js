import React, { Component } from 'react'
import CoursesList from './CoursesList'
import AddCourse from './AddCourse'
import {getCourse } from '../../helpers/auth'
import './Dashboard.css'

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
    	<div className="Dashboard">
        <h4>My courses</h4>
        <CoursesList />
       	<AddCourse />
      </div>
    )
  }
}