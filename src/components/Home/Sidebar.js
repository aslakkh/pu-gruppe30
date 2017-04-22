import React, { Component } from 'react'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import SpecificCourse from './specificCourse'

/*Maps the courses to make the sidebar and the site for the specific courses
*
*
* Changes:
* Change the way SpecificCourse is called, so you only load the course you are viewing.
*
* */




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
    handleSelect(key){
        this.setState({
            key:key

        })

    }



componentWillMount(){
}
	render (){

    if(this.state.courses === undefined){ //checks if props are loaded
      return(
        <h4>ingenting</h4>
      );
    }
    else{
      return (

            <Tab.Container id="left-tabs" defaultActiveKey={(Object.keys(this.state.courses)[0])} activeKey={this.state.key}>
                <Row className="clearfix">
                <Col sm={3}>
                <Nav bsStyle="pills" className="navbar navbar-inverse" stacked>
                    {Object.keys(this.state.courses).map((emne,i) =>

                    <NavItem eventKey={emne} className="navbar-link" key={i} onSelect={this.setState({key:emne})} >
                        {emne}
                    </NavItem>


                    )}
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content animation>
                    {Object.keys(this.state.courses).map((emne,i) =>
                    <Tab.Pane eventKey={emne} key={i}>
                        <h1>{emne}</h1>
                        <SpecificCourse courseID={emne} course={this.state.courses[emne]}/>
                    </Tab.Pane>

                    )}
                </Tab.Content>
                </Col>
                </Row>
                </Tab.Container>









			)
    }
		
	}




}