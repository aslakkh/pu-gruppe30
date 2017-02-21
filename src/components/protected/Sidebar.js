import React, { Component } from 'react'
import Course from './Course'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import { ref } from '../../config/constants'
import firebase from 'firebase';
import getCourse from '../index'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'


function TestEmner(props){
	let emner = props.emner;

	let course = emner.map((emne,i) =>
        <NavItem  eventKey={i} key={i} >
            <div  className="navbar-link">{emne}</div>
        </NavItem>

			)
	let info = emner.map((emne,i) =>
		<Tab.Pane eventKey={i} key={i}>
            {emne} Stuff goes here
          </Tab.Pane>
 
		)

	return(

	<Tab.Container id="left-tabs-example" defaultActiveKey={0} style={{border: 'black', marginleft: '0px'}}>
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
        console.log(data.val(),data.key)
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