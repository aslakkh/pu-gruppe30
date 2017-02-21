import React, { Component } from 'react'
import Course from './Course'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import {getCourse } from '../../helpers/auth'
import { ref } from '../../config/constants'
import firebase from 'firebase';


function TestEmner(props){
	const emner = props.emner;
	console.log(emner)
	const course = emner.map((emne,i) =>
			<li key={i}>{emne}</li>

			)
	return(<ul>{course}</ul>





		)


}

export default class Courses extends Component {
constructor(props) {
  super(props);
  this.state={courses:[]};
  this.emner =getCourse()
};


/*componentWillMount(){
	console.log("const")
	let that = this;
  	const userUid = firebase.auth().currentUser.uid;
  	ref.child('users/'+userUid+'/courses').once("value", function(snapshot){
  		snapshot.forEach(function(data){
  			console.log(data.val(),data.key)
  			that.emner.push(data.key);

  	})});
};


componentDidMount(){
		console.log("const")
	let that = this;
  	const userUid = firebase.auth().currentUser.uid;
  	ref.child('users/'+userUid+'/courses').once("value", function(snapshot){
  		snapshot.forEach(function(data){
  			console.log(data.val(),data.key)
  			that.emner.push(data.key);

  	})});
  	this.setState({courses:"hei"})
}*/
	render (){
		return (
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
            Tab 2 content {this.emner}
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>




			)
	}




}