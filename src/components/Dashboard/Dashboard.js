import React, { Component } from 'react'
import CoursesList from './CoursesList'
import AddCourse from './AddCourse'
import AddCourseModal from './AddCourseModal'
import {Button} from 'react-bootstrap'
import './Dashboard.css'

export default class Dashboard extends Component {

  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.state = {
      showModal: false,
    }
  }

  closeModal(){
        this.setState({ showModal: false });
    }


  handleModal(){
        this.setState({
            showModal: true,
        })
    }

  render () {
    return (
    	<div className="Dashboard">
        <h4>My courses</h4>
        <CoursesList courses={this.props.courses}/>
        <Button onClick={this.handleModal}>Add new course</Button>
{/*       	<AddCourse courses/>*/}
        <AddCourseModal showModal={this.state.showModal} closeModal={this.closeModal.bind(this)}/>
      </div>
    )
  }
}