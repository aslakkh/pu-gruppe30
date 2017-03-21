import React, { Component } from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import ManageCourses from './ManageCourses'

import firebase from 'firebase';

export default class ProfessorDashboard extends Component {
/*
    TAB-view: "my courses" and "manage all courses"
    allow professor to add and delete courses in manage-courses, as well as add courses to his/her courseslist
    TODO:
    - add courses to professor and to courses
    - let professor choose a course already in database to be assigned to
*/

    constructor(props){
        super(props);
        this.state={
            courses: null,
        }
    }


    componentDidMount(){
        let that = this;
        let coursesRef = firebase.database().ref().child('courses/');
        coursesRef.on('value', snap => {
            that.setState({
                courses: snap.val(),
            });
        });
    }

    componentWillUnMount(){
        let that = this;
        let coursesRef = firebase.database().ref().child('courses/');
        coursesRef.off();
    }




    render () {
        return (
            <div>
                <h4>Professor dashboard working</h4>
                <Tabs defaultActiveKey={0} id="dashboardTab">
                    <Tab eventKey={0} title="My Courses">My courses</Tab>
                    <Tab eventKey={1} title="Manage All Courses"><ManageCourses courses={this.state.courses}/></Tab>
                </Tabs>
            </div>
        )
    }
}