import React, { Component } from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import ManageCourses from './ManageCourses'
import CoursesList from './CoursesList'


/*
    Dashboard for Professor 
    Renders Tab with CoursesList and ManageCourses
*/

export default class ProfessorDashboard extends Component {


    render () {
        return (
            <Tabs defaultActiveKey={0} id="dashboardTab">
                <Tab eventKey={0} title="My Courses"><CoursesList courses={this.props.courses}/></Tab>
                <Tab eventKey={1} title="Manage All Courses"><ManageCourses/></Tab>
            </Tabs>
        )
    }
}