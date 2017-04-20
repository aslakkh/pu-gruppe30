import React, { Component } from 'react'
import CoursesList from './CoursesList'
import AddCourseModal from './AddCourseModal'
import {Button} from 'react-bootstrap'

const styles = {
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
  }
}

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
    	<div style={styles.dashboard}>
        <h4>My courses</h4>
        <CoursesList courses={this.props.courses}/>
        <Button onClick={this.handleModal} bsStyle="primary"><b>Add new course</b></Button>
        <AddCourseModal showModal={this.state.showModal} closeModal={this.closeModal.bind(this)}/>
      </div>
    )
  }
}