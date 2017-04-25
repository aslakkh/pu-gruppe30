/**
 * Created by jan on 02.03.2017.
 */
import React, { Component } from 'react';
import {Tabs, Tab, DropdownButton, MenuItem, Button} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import StopWatch from './Stopwatch'
import SessionPlanner from './../SessionPlanner/SessionPlanner'
import CircularProgress from './../Courses/CircularProgress'
import CourseInformation from './../Courses/CourseInformation'
import Results from './../Courses/Results'
import {styles} from './TabViewStyles.js'
import './../Courses/results.css'

/*
Renders the tab-menu on the top, and calls
 */


export default class TabView extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state=({
            course: props.course,
            emne: props.emne,
            view: "Daily Goals",
            activeButton: 0,
        });
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        console.log("kurs")
        console.log(this.props.course)

    }

    componentWillReceiveProps(nextProps){
        var tempActiveButton;
        tempActiveButton = (nextProps.emne === this.state.emne) ? this.state.activeButton : 0; //reset active button when switching course
        this.state=({
            course: nextProps.course,
            emne: nextProps.emne,
            activeButton: tempActiveButton,
        })
    }
    handleSelect(key){
        this.setState({
            key:key

        })
    }

    handleDropdownClick(view) {
        this.setState({view: view})
    }

    handleRoute = ({match}) => {
        console.log("TABVIEW handleroute " + match.params.id);
        if(match.params.id === "session"){
            return(
                <StopWatch course={this.state.course} emne={this.state.emne}/>
            )
        }
        else{
            return null;
        }
    }

    handleClick(buttonNumber){
        this.setState({
            activeButton: buttonNumber,
        })
    }

    render(){
        if(this.state.course === undefined || this.state.course === null){
            return(
                <div>
                    <h4>Loading</h4>
                </div>
            )
        }
        else{
            return(
                <Router>
                    <div>
                        <div style={styles.TabWrapper}>
                            <Link to={"/"+this.state.emne+"/session"}> 
                                <Button onClick={() => this.handleClick(1)} active={this.state.activeButton === 1} bsStyle="primary" style={styles.SingleTab}>Session</Button>
                            </Link>
                            <Link to={"/"+this.state.emne+"/plan-session"}><Button onClick={() => this.handleClick(2)} active={this.state.activeButton === 2} bsStyle="primary" style={styles.SingleTab}>Plan session</Button></Link>
                            <Link to={"/"+this.state.emne+"/goals"}> <Button onClick={() => this.handleClick(3)} active={this.state.activeButton === 3} bsStyle="primary" style={styles.SingleTab}>Goals</Button></Link>
                            <Link to={"/"+this.state.emne+"/past-goals"}> <Button onClick={() => this.handleClick(4)} active={this.state.activeButton === 4} bsStyle="primary" style={styles.SingleTab}>Past goals</Button></Link>
                            <Link to={"/"+this.state.emne+"/messages"}> <Button onClick={() => this.handleClick(5)} active={this.state.activeButton === 5} bsStyle="primary" style={styles.SingleTab}>Messages</Button></Link>
                        </div>

                        {/*<Tabs activeKey={this.state.key} unmountOnExit={true} defaultActiveKey={"session"} onSelect={this.handleSelect} id="montlyweeklyselecter">
                            <Tab eventKey={"session"} title="Session">
                                <Link to={"/"+this.state.emne+"/session"}> Hey</Link>
                                
                            </Tab>
                            <Tab eventKey={"planSession"} title={"Plan Session"}>
                                <Link to={"/"+this.state.emne+"/plan-session"}> Hey</Link>
                               
                            </Tab>
                            <Tab eventKey={"goals"} title={"Goals"}>
                                <Link to={"/"+this.state.emne+"/goals"}> Hey</Link>
                                
                            </Tab>
                            <Tab eventKey="5" title="Past Goals">
                                <DropdownButton className="info-dropdown" bsStyle="primary" title={this.state.view} key={0} id={0}>
                                    <MenuItem eventKey="1" onClick={() => this.handleDropdownClick('Daily Goals')}>Daily Goals</MenuItem>
                                    <MenuItem eventKey="2" onClick={() => this.handleDropdownClick('Weekly Goals')}>Weekly Goals</MenuItem>
                                    <MenuItem eventKey="3" onClick={() => this.handleDropdownClick('Monthly Goals')}>Monthly Goals</MenuItem>
                                </DropdownButton>
                                <Link to={"/"+this.state.emne+"/past-goals"}> Hey</Link>
                                
                            </Tab>
                            <Tab eventKey={"Message"} title="Messages">
                                <Link to={"/"+this.state.emne+"/messages"}> Hey</Link>
                                
                            </Tab>
                        </Tabs>*/}

                        <hr/>
                        
                        <div style={styles.ContentWrapper}>
                            <Route path={"/"+this.state.emne+"/session"} render={() => <StopWatch course={this.state.course} emne={this.state.emne}/>} />
                            <Route path={"/"+this.state.emne+"/plan-session"} render={() => <SessionPlanner course={this.state.emne}/>} />
                            <Route path={"/"+this.state.emne+"/goals"} render={() => <CircularProgress courseID={this.state.emne} course={this.state.course}/>} />
                            <Route path={"/"+this.state.emne+"/past-goals"} render={() => <Results courseID={this.state.emne} course={this.state.course} view={this.state.view}/>} />
                            <Route path={"/"+this.state.emne+"/messages"} render={() => <CourseInformation courseID={this.state.emne}/>} />
                        </div>
                    </div>
                </Router>
            )

        }
        
    }

}