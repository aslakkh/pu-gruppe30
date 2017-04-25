import React, { Component } from 'react'
import { Tab,NavItem, Nav, Col,Row, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import TabView from './TabView'
import SpecificCourse from './specificCourse'
import StopWatch from './Stopwatch'
import SessionPlanner from './../SessionPlanner/SessionPlanner'
import CircularProgress from './../Courses/CircularProgress'
import PlannedSession from './PlannedSession'
import CourseInformation from './../Courses/CourseInformation'
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
  this.handleSelect = this.handleSelect.bind(this);
  this.handleRoute = this.handleRoute.bind(this);
  this.state={
			
			courses: this.props.courses
		}

};

componentWillReceiveProps(nextProps){
  this.setState({
    courses: nextProps.courses
  });
}
    //handles select for TAB
    handleSelect(key){
        this.setState({
            key:key

        })

    }


    //gets url parameter (match) and returns TabView with props corresponding to url parameter
    handleRoute ({match}) {
        return(
            <TabView emne={match.params.id} course={this.state.courses[match.params.id]}/>
            
        )
    }

	render (){
    if(this.state.courses === undefined){ //checks if props are loaded
      return(
        <h4>ingenting</h4>
      );
    }
    else{
        return (
        <Router>
            <div>
                <Tab.Container id="left-tabs" activeKey={this.state.key} onSelect={this.handleSelect}>
                    <Row className="clearfix">
                        <Col sm={3}>
                            <Nav bsStyle="pills" className="navbar navbar-inverse" stacked>
                                {Object.keys(this.state.courses).map((emne,i) =>
                                
                                    
                                        <NavItem eventKey={i} key={i} className="navbar-link"   >
                                            <Link to={"/"+emne} key={i}>
                                                <div style={{marginTop: '-0.3em', fontSize:'1.5em',marginBottom: '-0.3em', color:'darkgrey'}}>
                                                    {emne}
                                                </div>
                                            </Link>
                                        </NavItem>
                                )}
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content animation>

                                <Route path="/:id" render={this.handleRoute} />
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                    
            </div>
            
          
        </Router>
    









			)
    }
		
	}




}