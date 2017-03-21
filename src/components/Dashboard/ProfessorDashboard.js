import React, { Component } from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import ManageCourses from './ManageCourses'
import CoursesList from './CoursesList'

import firebase from 'firebase';

export default class ProfessorDashboard extends Component {
/*
    TAB-view: "my courses" and "manage all courses"
    allow professor to add and delete courses in manage-courses, as well as add courses to his/her courseslist
    TODO:
    - add courses to professor and to courses
    - let professor choose a course already in database to be assigned to
*/



    componentDidMount(){
    }

    




    render () {
        return (
            <div>
                <h4>Professor dashboard working</h4>
                <Tabs defaultActiveKey={0} id="dashboardTab">
                    <Tab eventKey={0} title="My Courses"><CoursesList courses={this.props.courses}/></Tab>
                    <Tab eventKey={1} title="Manage All Courses"><ManageCourses/></Tab>
                </Tabs>
            </div>
        )
    }
}