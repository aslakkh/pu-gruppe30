import React, { Component } from 'react'
import CoursesList from './CoursesList'
import AddCourseModal from './AddCourseModal'
import {Button} from 'react-bootstrap'
import firebase from 'firebase';
import {getUserUid} from '../../helpers/auth'

const styles = {
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
  }
};

/*
  Dashboard for students
  Renders a div containing CoursesList, Button for adding course, and a AddCourseModal controlled by button
*/

export default class Dashboard extends Component {

  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.state = {
      showModal: false,
    }
  }

  componentDidMount(){
    let courseRef = firebase.database().ref();
    let userUid = getUserUid();
    courseRef.child('users/'+userUid+'/courses').orderByChild('active').equalTo(true).on('value', snap => {
      this.setState({
        courses: snap.val()
      });

    })
  }

  componentWillUnmount(){
    let courseRef = firebase.database().ref();
    let userUid = getUserUid();
    courseRef.child('users/'+userUid+'/courses').orderByChild('active').equalTo(true).off();
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
        <CoursesList courses={this.state.courses}/>
        <Button onClick={this.handleModal} bsStyle="primary"><b>Add new course</b></Button>
        <AddCourseModal showModal={this.state.showModal} closeModal={this.closeModal.bind(this)}/>
      </div>
    )
  }
}