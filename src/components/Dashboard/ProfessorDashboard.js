import React, { Component } from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import ManageCourses from './ManageCourses'
import CoursesList from './CoursesList'


export default class ProfessorDashboard extends Component {
/*
    TODO:
    - improve MyCourses-view
    - add link in all list elements in mycoursesview
*/

    render () {
        return (
            <Tabs defaultActiveKey={0} id="dashboardTab">
                <Tab eventKey={0} title="My Courses"><CoursesList courses={this.props.courses}/></Tab>
                <Tab eventKey={1} title="Manage All Courses"><ManageCourses/></Tab>
            </Tabs>
        )
    }
}