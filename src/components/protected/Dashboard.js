import React, { Component } from 'react'
import Course from './Course'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import {getCourse } from '../../helpers/auth'
export default class Dashboard extends Component {

  constructor(props){
    super();
    this.getCoursesDisp = this.getCoursesDisp.bind(this);
  }

getCoursesDisp(){
	const cour = getCourse();
	console.log(cour);

}



  render () {
    return (
    	<div>
      <div>
  <Tab.Container id="left-tabs-example" defaultActiveKey="first" style={{border: 'none', marginleft: '0px'}}>
    <Row className="clearfix">
      <Col sm={2}>
        <Nav bsStyle="pills" stacked>
          <NavItem eventKey="first">
            Tab 1
          </NavItem>
          <NavItem eventKey="second">
            Tab 2
          </NavItem>
        </Nav>
      </Col>
      <Col sm={10}>
        <Tab.Content animation>
          <Tab.Pane eventKey="first">
            Tab 1 content
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            Tab 2 content
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
  </div>
       	<Course />
      </div>
    )
  }
}