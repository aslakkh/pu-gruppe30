/**
 * Created by jan on 02.03.2017.
 */
import React, { Component } from 'react';
import {Tabs, Tab, DropdownButton, MenuItem} from 'react-bootstrap'
import StopWatch from './Stopwatch'
import SessionPlanner from './../SessionPlanner/SessionPlanner'
import CircularProgress from './../Courses/CircularProgress'
import Results from './../Courses/Results'
import './../Courses/results.css'

export default class TabView extends Component{
    constructor(props){
        super(props);
        this.state=({
            course: props.course,
            emne: props.emne,
            view: "Daily Goals",
        });
        this.handleDropdownClick = this.handleDropdownClick.bind(this);

    }
    handleSelect(key){
        this.setState({
            key:key

        })
    }

    handleDropdownClick(view) {
        this.setState({view: view})
    }

    render(){
        return(
            <Tabs activeKey={this.state.key} unmountOnExit={true} defaultActiveKey={"session"} onSelect={this.handleSelect} id="montlyweeklyselecter">
                <Tab eventKey={"session"} title="Session"><StopWatch course={this.state.course} emne={this.state.emne}/> </Tab>
                <Tab eventKey={"planSession"} title={"Plan Session"}><SessionPlanner course={this.state.emne}/></Tab>
                <Tab eventKey={"goals"} title={"Goals"}>
                    <CircularProgress courseID={this.state.emne} course={this.state.course}/>
                </Tab>
                <Tab eventKey="5" title="Past Goals">
                    <DropdownButton className="info-dropdown" bsStyle="primary" title={this.state.view} key={0} id={0}>
                        <MenuItem eventKey="1" onClick={() => this.handleDropdownClick('Daily Goals')}>Daily Goals</MenuItem>
                        <MenuItem eventKey="2" onClick={() => this.handleDropdownClick('Weekly Goals')}>Weekly Goals</MenuItem>
                        <MenuItem eventKey="3" onClick={() => this.handleDropdownClick('Monthly Goals')}>Monthly Goals</MenuItem>
                    </DropdownButton>
                    <Results courseID={this.state.emne} course={this.state.course} view={this.state.view}/>
                </Tab>
            </Tabs>
        )
    }

}