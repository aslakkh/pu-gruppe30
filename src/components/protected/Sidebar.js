import React, { Component } from 'react'
import Course from './Course'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import { ref } from '../../config/constants'
import firebase from 'firebase';
import getCourse from '../index'


function TestEmner(props){
	const emner = props.emner;
	console.log(emner)

	const course = emner.map((emne,i) =>
        <NavItem eventKey={i}>
            {emne}
            {console.log(i)}
        </NavItem>

			)
	const info = emner.map((emne,i) =>
		<Tab.Pane eventKey={i}>
            Tab 1 content
          </Tab.Pane>

		)

	return(

	<Tab.Container id="left-tabs-example"defaultActiveKey={0} style={{border: 'none', marginleft: '0px'}}>
    <Row className="clearfix">
      <Col sm={2}>
        <Nav bsStyle="pills" stacked>
        {course}
        </Nav>
      </Col>
            <Col sm={10}>
        <Tab.Content animation>
        	{info}
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>





		)


};



export default class Courses extends Component {
constructor(props) {
  super(props);
};


componentWillMount(){

}
	render (){
		return (


		<TestEmner emner ={["test","hallo"]}/>




			)
	}




}