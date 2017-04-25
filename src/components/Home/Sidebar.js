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

///TODO: Try updating index to match new routes





class Test extends Component{
    constructor(props){
        super(props);
        this.state={
            emne: this.props.emne,
            courses: this.props.courses,
        }
    }
    render()
    {
        return(
        <h4>{this.state.emne}</h4>
    )
}
}




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
    console.log("SIDEBAAAAAAR");
    console.log(nextProps.courses);
  this.setState({
    courses: nextProps.courses
  });
}
    handleSelect(key){
        this.setState({
            key:key

        })

    }





    handleRoute = ({match}) => {
        console.log("handleroute " + match.params.id);
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
        <Router 
        >
            <div>
                {/*<Link to={"IT1111"}>
                    <Button>IT1111</Button>
                </Link>
                <Link to={"IT1273"}>
                    <Button>IT1273</Button>
                </Link>*/}
                
                    <Tab.Container id="left-tabs" activeKey={this.state.key} onSelect={this.handleSelect}>
                        <Row className="clearfix">
                            <Col sm={3}>
                                <Nav bsStyle="pills" className="navbar navbar-inverse" stacked>
                                    {Object.keys(this.state.courses).map((emne,i) =>
                                    
                                        
                                            <NavItem eventKey={emne} className="navbar-link" key={i}  >
                                                <Link to={"/"+emne} key={i}>
                                                {emne}
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
                    
                    {/*<Route path="/:id" render={this.handleRoute} />*/}
            </div>
            
          
        </Router>
    









			)
    }
		
	}




}