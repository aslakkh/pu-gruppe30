import React, { Component } from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import ManageCourses from './ManageCourses'
import CoursesList from './CoursesList'
import firebase from 'firebase';
import {getUserUid} from '../../helpers/auth'


/*
    Dashboard for Professor 
    Renders Tab with CoursesList and ManageCourses
*/

export default class ProfessorDashboard extends Component {

    constructor(props){
        super(props);
        this.state={
            
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

  


    render () {
        return (
            <Tabs defaultActiveKey={0} id="dashboardTab">
                <Tab eventKey={0} title="My Courses"><CoursesList courses={this.state.courses}/></Tab>
                <Tab eventKey={1} title="Manage All Courses"><ManageCourses/></Tab>
            </Tabs>
        )
    }
}