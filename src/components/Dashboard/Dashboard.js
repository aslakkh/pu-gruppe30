import React, { Component } from 'react'
import CoursesList from './CoursesList'
import AddCourse from './AddCourse'
import './Dashboard.css'

export default class Dashboard extends Component {



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