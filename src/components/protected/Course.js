import React, { Component } from 'react'
import { saveCourse,getCourse } from '../../helpers/auth'
import Tabs from '../tabs'
export default class Course extends Component {
	constructor(props){
		super();
		this.handleAdd = this.handleAdd.bind(this);


	}
	handleAdd = (e) => {
		e.preventDefault();
		saveCourse("ELSYS")
		console.log("hei")
		getCourse();


	} 

  render () {
    return (
      <div>
      <Tabs course={"hello"} extra="heihei"/>
        Course. This is a protected route. You can only see this if you're authed.
        <button className="btn btn-primary btn-lg" onClick={this.handleAdd}>legg til emne</button>
      </div>
    )
  }
}