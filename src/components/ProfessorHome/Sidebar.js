import React, { Component } from 'react'
import {Tab,NavItem, Nav, Col,Row} from 'react-bootstrap'
import AddMessage from './AddMessage'
import MessageList from './MessageList'
import Statistics from './Statistics'
import SetTime from './SetTime'
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'

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
      courses: this.props.courses,
		}
  this.handleRoute = this.handleRoute.bind(this)
};

componentWillReceiveProps(nextProps){
  this.setState({
    courses: nextProps.courses
  });
}
    //matches URl (match.params.id) to course
    handleRoute({match}){
        return(
            <div>
                <AddMessage courseID={match.params.id}/>
                <MessageList courseID={match.params.id}/>
                <SetTime courseID={match.params.id} />
                <Statistics courseID={match.params.id}/>
            </div>
        )
    }
    
componentWillMount(){
}
	render (){

    if(this.state.courses === undefined || this.state.courses === null){ //checks if props are loaded
      return(
        <h4>No courses</h4>
      );
    }
    else{
      return (
          <Router>
              <div>
                  <Tab.Container id="left-tabs" >
                      <Row className="clearfix">
                          <Col sm={3}>
                              <Nav bsStyle="pills" className="navbar navbar-inverse" stacked >
                                  {Object.keys(this.state.courses).map((emne,i) =>


                                          <NavItem key={i} eventKey={i} className="navbar-link">
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