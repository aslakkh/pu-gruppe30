import React, { Component } from 'react'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import SpecificCourse from './specificCourse'

/*Maps the courses to make the sidebar and the site for the specific courses */
function TestEmner(props){

	let course = Object.keys(props.courses).map((emne,i) =>
        
        <NavItem eventKey={emne} className="navbar-link" key={i} >
            {emne}
        </NavItem>
        

			)
	let info = Object.keys(props.courses).map((emne,i) =>
		<Tab.Pane eventKey={emne} key={i}>
            <h1>{emne}</h1>
            <SpecificCourse courseID={emne} course={props.courses[emne]}/>
    </Tab.Pane>
 
		)

	return(

	<Tab.Container id="left-tabs" defaultActiveKey={0} style={{border: 'white', marginleft: '0px'}}>
    <Row className="clearfix">
      <Col sm={3}>
        <Nav bsStyle="pills" className="navbar navbar-inverse" stacked>
        {course}
        </Nav>
      </Col>
            <Col sm={9}>
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
  this.state={
			
			courses: this.props.courses
		}
  
};

componentWillReceiveProps(nextProps){
  this.setState({
    courses: nextProps.courses
  });
}

componentWillMount(){
  /*const that = this;
    const userUid = firebase.auth().currentUser.uid;
    ref.child('users/'+userUid+'/courses').once("value",function(snapshot){
      snapshot.forEach(function(data){
        that.emner.push(data.key)
        that.setState({})
    })})*/

}
	render (){

    if(this.state.courses === undefined || this.state.courses === null){ //checks if props are loaded
      return(
        <h4>ingenting</h4>
      );
    }
    else{
      return (
		    <TestEmner courses={this.state.courses}/>
			)
    }
		
	}




}