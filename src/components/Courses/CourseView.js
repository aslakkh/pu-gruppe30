import React, { Component } from 'react';
import {Tab, MenuItem, Row, Col, Nav, NavItem, NavDropdown} from 'react-bootstrap';



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
                                Daily Content
                            </Tab.Pane>
                            <Tab.Pane eventKey={3}>
                                Weekly content
                            </Tab.Pane>
                            <Tab.Pane eventKey={4}>
                                Monthly content
                            </Tab.Pane>
                            <Tab.Pane eventKey={5}>
                                <h3>Total time spent: {formattedSeconds(this.state.time)}</h3>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}