import React, { Component } from 'react'
import Course from './Course'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import { ref } from '../../config/constants'
import firebase from 'firebase';
import getCourse from '../index'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import SpecificCourse from './specificCourse'
import { LinkContainer } from 'react-router-bootstrap';
function TestEmner(props){
	let emner = props.emner;

	let course = emner.map((emne,i) =>
        
        <NavItem eventKey={emne} className="navbar-link" key={i} >
            <Link to={"/Courses/"+emne}>{emne}</Link>
        </NavItem>
        

			)
	let info = emner.map((emne,i) =>
		<Tab.Pane eventKey={emne} key={i}>
            <h1>{emne}</h1>
            <SpecificCourse emne={emne}/>
          </Tab.Pane>
 
		)

	return(

	<Tab.Container id="left-tabs" defaultActiveKey={0} style={{border: 'black', marginleft: '0px'}}>
    <Row className="clearfix">
      <Col sm={2}>
        <Nav bsStyle="pills" className="navbar navbar-inverse" stacked>
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
  this.emner=[]
  this.state=({emner:["hehe"]})
};


componentWillMount(){
  const that = this;
    const userUid = firebase.auth().currentUser.uid;
    ref.child('users/'+userUid+'/courses').once("value",function(snapshot){
      snapshot.forEach(function(data){
        that.emner.push(data.key)
        that.setState({})
    })})

}
	render (){
		return (


		<TestEmner emner ={this.emner}/>




			)
	}




}