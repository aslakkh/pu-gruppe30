/**
 * Created by jan on 02.03.2017.
 */
import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import StopWatch from './Stopwatch'
import SessionPlanner from './../SessionPlanner/SessionPlanner'
import CourseView from './../Courses/CourseView'
import PastGoals from './../Courses/PastGoals'





export default class TabView extends Component{
    constructor(props){
        super(props);
        this.state=({
            course: props.course,
            emne: props.emne
        })
    }
    handleSelect(key){
        this.setState({
            key:key

        })
    }

    render(){
        return(
            <Tabs activeKey={this.state.key} unmountOnExit={true} defaultActiveKey={"session"} onSelect={this.handleSelect} id="montlyweeklyselecter">
                <Tab eventKey={"session"} title="Session"><StopWatch course={this.state.course} emne={this.state.emne}/> </Tab>
                <Tab eventKey={"planSession"} title={"Plan Session"}><SessionPlanner course={this.state.emne}/></Tab>
                <Tab eventKey={"goals"} title={"Goals"}><CourseView courseID={this.state.emne} course={this.state.course}/></Tab>
                <Tab eventKey={2} title="Past goals">
                    <Tabs id="type-goals">
                        <Tab eventKey="1" title="Daily goals">
                            <PastGoals view="Daily"  courseID={this.state.emne} course={this.state.course}/>
                        </Tab>
                        <Tab eventKey="2" title="Weekly goals">
                            <PastGoals view="Weekly"  courseID={this.state.emne} course={this.state.course}/>
                        </Tab>
                        <Tab eventKey="3" title="Monthly goals">
                            <PastGoals view="Monthly"  courseID={this.state.emne} course={this.state.course}/>
                        </Tab>
                    </Tabs>
                </Tab>
            </Tabs>
        )
}

}