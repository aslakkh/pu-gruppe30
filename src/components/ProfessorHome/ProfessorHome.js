/**
 * Created by jan on 18/03/2017.
 */
import React, { Component } from 'react'
import Sidebar from './Sidebar'

export default class ProfessorHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: this.props.courses

        };
    }

    getData(){

    }

    castCommentToFirebase(){

    }

    render() {
        return (
            <Sidebar courses={this.state.courses}/>

        )
    }

}