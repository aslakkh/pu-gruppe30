/**
 * Created by anderssalvesen on 07.03.2017.
 */

import React, { Component } from 'react';
import {Tab, MenuItem, Row, Col, Nav, NavItem, NavDropdown, ProgressBar} from 'react-bootstrap';
import Progress from 'react-progressbar';

const formattedSeconds = ((sec) => //formats to hh:mm:ss
Math.floor (sec/3600)+ ':' + Math.floor(sec / 60) + '.' + ('0' + sec % 60).slice(-2))

export  default class CourseView extends Component {


    constructor(props){
        super(props);
        this.state = {
            courses: this.props.courses,
            course: this.props.course,
            time: this.props.course.time,
            goal: this.props.goal
        }
    }


    componentWillReceiveProps(nextProps){
        this.setState({
            course: nextProps.course
        });
        console.log(nextProps.course)
    }

    componentWillMount(){
        this.setState ({
            course: this.props.course
        });
    }

    setProgressColor(goal){
        if(this.state.time > (goal)/1.6){
            return("success")
        }
        else if (this.state.time > (goal)/2.8){
            return("warning")

        }
        else{
            return("danger")
        }
    }


    render() {
        return (
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey={2}>
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavDropdown eventKey={1} title="Course" id="coursesTab">
                                {Object.keys(this.state.courses).map((key) => {
                                    return <MenuItem key={key} className="CoursesList">
                                        {key}
                                    </MenuItem>
                                })}
                            </NavDropdown>
                            <NavItem eventKey={2}>Day</NavItem>
                            <NavItem eventKey={3}>Week</NavItem>
                            <NavItem eventKey={4}>Month</NavItem>
                            <NavItem eventKey={5}>Total</NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>

                            <Tab.Pane eventKey={2}>
                                <h3 >Daily progress:</h3>
                                <h1 className="progressbar">
                                    <ProgressBar now={this.state.time} bsStyle={this.setProgressColor(this.state.goal)} label={formattedSeconds(this.state.time)} max={200}/>
                                </h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey={3}>
                                <h3 >Weekly progress:</h3>
                                <h1 className="progressbar">
                                    <ProgressBar now={this.state.time} bsStyle={this.setProgressColor(this.state.goal)} label={formattedSeconds(this.state.time)} max={200}/>
                                </h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey={4}>
                                <h3 >Monthly progress:</h3>
                                <h1 className="progressbar">
                                    <ProgressBar now={this.state.time} bsStyle={this.setProgressColor(this.state.goal)} label={formattedSeconds(this.state.time)} max={200}/>
                                </h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey={5}>
                                <h3>Total progress:</h3>
                                <h1 className="progressbar">
                                    <ProgressBar now={this.state.time} bsStyle={this.setProgressColor(this.state.goal)} label={formattedSeconds(this.state.time)} max={200}/>
                                </h1>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}