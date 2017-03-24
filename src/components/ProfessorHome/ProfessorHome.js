/**
 * Created by jan on 18/03/2017.
 */
import React, { Component } from 'react'
import Sidebar from './Sidebar'

/*
* "Start"-site for the professor.
 */

export default class ProfessorHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: this.props.courses

        };
    }


    render() {
        return (
            <Sidebar courses={this.state.courses}/>

        )
    }

}