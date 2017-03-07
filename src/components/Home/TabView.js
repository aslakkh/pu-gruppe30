/**
 * Created by jan on 02.03.2017.
 */
import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import StopWatch from './Stopwatch'
import SessionPlanner from './../SessionPlanner/SessionPlanner'





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
            </Tabs>
        )
}

}